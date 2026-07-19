// ════════════════════════════════════════════════════════════════════════
//  HON-ACADEMY — Centralized Role-Based Access Control (RBAC) Engine
//  ---------------------------------------------------------------
//  This module EXTENDS the existing client-side architecture. It does NOT
//  remove or change any existing functionality. It provides:
//    • Role constants and a role hierarchy
//    • A page-level guard() that protects portals (replaces ad-hoc checks)
//    • Per-record authorization helpers (canAccessStudent / canAccessSubject)
//    • Scope-aware data accessors (viewableStudents / viewableSubjects /
//      viewableMarks) that automatically filter by the authenticated user
//
//  NOTE: In the current static (localStorage) deployment, enforcement is
//  client-side. The same rules defined here are intended to be mirrored by
//  Supabase Row-Level Security during the planned data-layer migration.
// ════════════════════════════════════════════════════════════════════════
(function () {
  "use strict";

  const ROLES = { ADMIN: "admin", TEACHER: "teacher", STUDENT: "student" };

  // Higher number = more privilege. Used for "at least" comparisons.
  const ROLE_RANK = { admin: 3, teacher: 2, student: 1 };

  function safeDb() {
    return (typeof window !== "undefined" && window.db) ? window.db : null;
  }

  function getCurrentUser() {
    const db = safeDb();
    try { return db ? db.getCurrentUser() : null; } catch (e) { return null; }
  }

  function currentUserId() {
    const u = getCurrentUser();
    return u ? u.id : null;
  }

  function currentRole() {
    const u = getCurrentUser();
    return u ? u.role : null;
  }

  // Normalize a value/array into a Number[] of ids, ignoring empties/nulls.
  function toIdArray(value) {
    if (value === null || value === undefined) return [];
    const arr = Array.isArray(value) ? value : [value];
    return arr
      .filter(function (v) { return v !== null && v !== undefined && v !== ""; })
      .map(function (v) { return Number(v); });
  }

  // ── Page-level guard ────────────────────────────────────────────────────
  // allowedRoles: string or string[]. Returns true if access allowed.
  // If denied, redirects to 403 (or custom url) and returns false.
  function guard(allowedRoles, redirectUrl) {
    const user = getCurrentUser();
    const allowed = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    if (!user || allowed.indexOf(user.role) === -1) {
      window.location.href = redirectUrl || "403.html";
      return false;
    }
    return true;
  }

  // ── Role comparison helpers ─────────────────────────────────────────────
  function hasAtLeastRole(minRole) {
    const role = currentRole();
    if (!role) return false;
    return (ROLE_RANK[role] || 0) >= (ROLE_RANK[minRole] || 0);
  }

  function isAdmin() { return currentRole() === ROLES.ADMIN; }
  function isTeacher() { return currentRole() === ROLES.TEACHER; }
  function isStudent() { return currentRole() === ROLES.STUDENT; }

  // ── Per-record authorization ─────────────────────────────────────────────
  // Can the current viewer read/write a specific student's data?
  function canAccessStudent(studentId) {
    const user = getCurrentUser();
    if (!user) return false;
    if (user.role === ROLES.ADMIN) return true;
    if (user.role === ROLES.STUDENT) return Number(user.id) === Number(studentId);
    if (user.role === ROLES.TEACHER) {
      const db = safeDb();
      const student = db ? db.getUser(studentId) : null;
      if (!student) return false;
      const assigned = toIdArray(user.assignedClassIds);
      // No class assignments configured yet → fall back to legacy "see all"
      // behaviour so existing teacher workflows are not broken. Once an
      // admin sets assignedClassIds, strict isolation applies.
      if (assigned.length === 0) return true;
      return student.classId != null && assigned.indexOf(Number(student.classId)) !== -1;
    }
    return false;
  }

  // Can the current viewer access a specific subject?
  function canAccessSubject(subjectId) {
    const user = getCurrentUser();
    if (!user) return false;
    if (user.role === ROLES.ADMIN) return true;
    if (user.role === ROLES.STUDENT) {
      const enrolled = toIdArray(user.subjectIds);
      if (enrolled.length === 0) return true; // legacy: no enrollment set
      return enrolled.indexOf(Number(subjectId)) !== -1;
    }
    if (user.role === ROLES.TEACHER) {
      const assigned = toIdArray(user.assignedSubjectIds);
      if (assigned.length === 0) return true; // legacy: no assignment set
      return assigned.indexOf(Number(subjectId)) !== -1;
    }
    return false;
  }

  // Deny access (used when a manual URL/ID tamper is detected).
  function deny(redirectUrl) {
    window.location.href = redirectUrl || "403.html";
  }

  // ── Scope-aware data accessors ───────────────────────────────────────────
  // These return ONLY the records the current user is authorized to see.
  function viewableStudents() {
    const user = getCurrentUser();
    if (!user) return [];
    const db = safeDb();
    const all = db ? db.getUsers().filter(function (u) { return u.role === ROLES.STUDENT; }) : [];
    if (user.role === ROLES.ADMIN) return all;
    if (user.role === ROLES.STUDENT) return all.filter(function (s) { return Number(s.id) === Number(user.id); });
    if (user.role === ROLES.TEACHER) {
      const assigned = toIdArray(user.assignedClassIds);
      if (assigned.length === 0) return all; // backward-compatible default
      return all.filter(function (s) { return s.classId != null && assigned.indexOf(Number(s.classId)) !== -1; });
    }
    return [];
  }

  function viewableSubjects() {
    const user = getCurrentUser();
    if (!user) return [];
    const db = safeDb();
    const all = db ? db.getSubjects() : [];
    if (user.role === ROLES.ADMIN) return all;
    if (user.role === ROLES.STUDENT) {
      const enrolled = toIdArray(user.subjectIds);
      return enrolled.length ? all.filter(function (s) { return enrolled.indexOf(s.id) !== -1; }) : all;
    }
    if (user.role === ROLES.TEACHER) {
      const assigned = toIdArray(user.assignedSubjectIds);
      return assigned.length ? all.filter(function (s) { return assigned.indexOf(s.id) !== -1; }) : all;
    }
    return [];
  }

  function viewableMarks() {
    const user = getCurrentUser();
    if (!user) return [];
    const db = safeDb();
    const all = db ? db.getMarks() : [];
    if (user.role === ROLES.ADMIN) return all;
    if (user.role === ROLES.STUDENT) {
      return all.filter(function (m) { return Number(m.studentId) === Number(user.id); });
    }
    if (user.role === ROLES.TEACHER) {
      const students = viewableStudents().map(function (s) { return Number(s.id); });
      const subjects = viewableSubjects().map(function (s) { return s.id; });
      return all.filter(function (m) {
        return students.indexOf(Number(m.studentId)) !== -1 && subjects.indexOf(Number(m.subjectId)) !== -1;
      });
    }
    return [];
  }

  function viewableAnnouncements() {
    const user = getCurrentUser();
    if (!user) return [];
    const db = safeDb();
    const all = db ? db.getAnnouncements() : [];
    if (user.role === ROLES.ADMIN) return all;
    return all.filter(function (a) {
      const t = (a.target || "school").toLowerCase();
      if (t === "school" || t === "all") return true;
      if (t === "student" && user.role === ROLES.STUDENT) return true;
      if (t === "teacher" && user.role === ROLES.TEACHER) return true;
      if (a.targetIds && a.targetIds.length) {
        return a.targetIds.indexOf(Number(user.id)) !== -1;
      }
      return false;
    });
  }

  window.rbac = {
    ROLES: ROLES,
    ROLE_RANK: ROLE_RANK,
    getCurrentUser: getCurrentUser,
    currentUserId: currentUserId,
    currentRole: currentRole,
    hasAtLeastRole: hasAtLeastRole,
    isAdmin: isAdmin,
    isTeacher: isTeacher,
    isStudent: isStudent,
    guard: guard,
    canAccessStudent: canAccessStudent,
    canAccessSubject: canAccessSubject,
    deny: deny,
    viewableStudents: viewableStudents,
    viewableSubjects: viewableSubjects,
    viewableMarks: viewableMarks,
    viewableAnnouncements: viewableAnnouncements
  };
})();
