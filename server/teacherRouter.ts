import { z } from "zod";
import { router, protectedProcedure } from "./trpc";
import * as db from "../db";

const requireTeacher = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.user.role !== "teacher") {
    throw new Error("Access denied: Teachers only");
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});

export const teacherRouter = router({
  // ─── Dashboard ───────────────────────────────────────────────────────
  dashboard: requireTeacher.query(async ({ ctx }) => {
    const activeYear = await db.getActiveAcademicYear();
    if (!activeYear) return { assignments: [], classTeacher: null, classes: [], subjects: [] };

    const assignments = await db.getTeacherAssignments(ctx.user.id, activeYear.id);
    const classTeachers = await db.getClassTeachers(activeYear.id);
    const classTeacherEntry = classTeachers.find(ct => ct.teacher.id === ctx.user.id);

    const classes = assignments.map(a => ({ id: a.class.id, name: a.class.name }));
    const subjects = [...new Map(assignments.map(a => [a.subject.id, { id: a.subject.id, name: a.subject.name }])).values()];

    return {
      assignments,
      classTeacher: classTeacherEntry || null,
      classes,
      subjects,
    };
  }),

  // ─── Profile ─────────────────────────────────────────────────────────
  profile: requireTeacher.query(({ ctx }) => db.getUserById(ctx.user.id)),

  updateProfile: requireTeacher
    .input(z.object({
      phone: z.string().optional(),
      address: z.string().optional(),
      bio: z.string().optional(),
      profilePicture: z.string().optional(),
    }))
    .mutation(({ input, ctx }) => db.updateUser(ctx.user.id, input)),

  // ─── Classes (only assigned) ─────────────────────────────────────────
  myClasses: requireTeacher.query(async ({ ctx }) => {
    const activeYear = await db.getActiveAcademicYear();
    if (!activeYear) return [];
    const assignments = await db.getTeacherAssignments(ctx.user.id, activeYear.id);
    const uniqueClasses = [...new Map(assignments.map(a => [a.class.id, a.class])).values()];
    return uniqueClasses;
  }),

  // ─── Subjects (only assigned) ────────────────────────────────────────
  mySubjects: requireTeacher.query(async ({ ctx }) => {
    const activeYear = await db.getActiveAcademicYear();
    if (!activeYear) return [];
    const assignments = await db.getTeacherAssignments(ctx.user.id, activeYear.id);
    const uniqueSubjects = [...new Map(assignments.map(a => [a.subject.id, a.subject])).values()];
    return uniqueSubjects;
  }),

  // ─── Students by Class (only assigned classes) ───────────────────────
  studentsByClass: requireTeacher
    .input(z.object({ classId: z.number() }))
    .query(async ({ input, ctx }) => {
      const activeYear = await db.getActiveAcademicYear();
      if (!activeYear) return [];

      const assignments = await db.getTeacherAssignments(ctx.user.id, activeYear.id);
      const assignedClassIds = assignments.map(a => a.class.id);

      if (!assignedClassIds.includes(input.classId)) {
        throw new Error("Access denied: You are not assigned to this class");
      }

      return db.getStudentsByClass(input.classId, activeYear.id);
    }),

  // ─── Marks ───────────────────────────────────────────────────────────
  getMarks: requireTeacher
    .input(z.object({
      examId: z.number(),
      classId: z.number(),
      subjectId: z.number(),
    }))
    .query(async ({ input, ctx }) => {
      const activeYear = await db.getActiveAcademicYear();
      if (!activeYear) return [];

      const assignments = await db.getTeacherAssignments(ctx.user.id, activeYear.id);
      const hasAccess = assignments.some(a => a.class.id === input.classId && a.subject.id === input.subjectId);

      if (!hasAccess) {
        throw new Error("Access denied: You do not teach this subject in this class");
      }

      return db.getMarksByExam(input.examId, input.classId, input.subjectId);
    }),

  enterMark: requireTeacher
    .input(z.object({
      studentId: z.number(),
      examId: z.number(),
      subjectId: z.number(),
      classId: z.number(),
      marksObtained: z.number(),
    }))
    .mutation(async ({ input, ctx }) => {
      const activeYear = await db.getActiveAcademicYear();
      if (!activeYear) throw new Error("No active academic year");

      const assignments = await db.getTeacherAssignments(ctx.user.id, activeYear.id);
      const hasAccess = assignments.some(a => a.class.id === input.classId && a.subject.id === input.subjectId);

      if (!hasAccess) {
        throw new Error("Access denied: You do not teach this subject in this class");
      }

      return db.enterMark({ ...input, enteredBy: ctx.user.id });
    }),

  submitMarks: requireTeacher
    .input(z.object({
      examId: z.number(),
      classId: z.number(),
      subjectId: z.number(),
    }))
    .mutation(async ({ input, ctx }) => {
      const activeYear = await db.getActiveAcademicYear();
      if (!activeYear) throw new Error("No active academic year");

      const assignments = await db.getTeacherAssignments(ctx.user.id, activeYear.id);
      const hasAccess = assignments.some(a => a.class.id === input.classId && a.subject.id === input.subjectId);

      if (!hasAccess) {
        throw new Error("Access denied");
      }

      const marksData = await db.getMarksByExam(input.examId, input.classId, input.subjectId);
      const markIds = marksData.map(m => m.mark.id);
      return db.bulkUpdateMarkStatus(markIds, "submitted");
    }),

  // ─── Attendance (Class Teacher only) ─────────────────────────────────
  recordAttendance: requireTeacher
    .input(z.object({
      classId: z.number(),
      date: z.date(),
      records: z.array(z.object({
        studentId: z.number(),
        status: z.enum(["present", "absent", "late", "excused"]),
      })),
    }))
    .mutation(async ({ input, ctx }) => {
      const activeYear = await db.getActiveAcademicYear();
      if (!activeYear) throw new Error("No active academic year");

      const isClassTeacher = await db.isClassTeacher(ctx.user.id, input.classId, activeYear.id);
      if (!isClassTeacher) {
        throw new Error("Access denied: Only the Class Teacher can record attendance");
      }

      const records = input.records.map(r => ({
        ...r,
        classId: input.classId,
        date: input.date,
        recordedBy: ctx.user.id,
      }));

      return db.bulkRecordAttendance(records);
    }),

  getAttendance: requireTeacher
    .input(z.object({ classId: z.number(), date: z.string() }))
    .query(async ({ input, ctx }) => {
      const activeYear = await db.getActiveAcademicYear();
      if (!activeYear) return [];

      const isClassTeacher = await db.isClassTeacher(ctx.user.id, input.classId, activeYear.id);
      const assignments = await db.getTeacherAssignments(ctx.user.id, activeYear.id);
      const hasClassAccess = isClassTeacher || assignments.some(a => a.class.id === input.classId);

      if (!hasClassAccess) {
        throw new Error("Access denied");
      }

      return db.getAttendanceByClass(input.classId, input.date);
    }),

  // ─── Report Cards (Class Teacher only) ───────────────────────────────
  generateReport: requireTeacher
    .input(z.object({
      studentId: z.number(),
      examId: z.number(),
      classId: z.number(),
    }))
    .mutation(async ({ input, ctx }) => {
      const activeYear = await db.getActiveAcademicYear();
      if (!activeYear) throw new Error("No active academic year");

      const isClassTeacher = await db.isClassTeacher(ctx.user.id, input.classId, activeYear.id);
      if (!isClassTeacher) {
        throw new Error("Access denied: Only the Class Teacher can generate report cards");
      }

      return db.generateStudentReport(input.studentId, input.examId, input.classId, ctx.user.id);
    }),

  getReports: requireTeacher
    .input(z.object({ examId: z.number(), classId: z.number() }))
    .query(async ({ input, ctx }) => {
      const activeYear = await db.getActiveAcademicYear();
      if (!activeYear) return [];

      const isClassTeacher = await db.isClassTeacher(ctx.user.id, input.classId, activeYear.id);
      if (!isClassTeacher) {
        throw new Error("Access denied: Only the Class Teacher can view report cards");
      }

      return db.getReportsByExam(input.examId, input.classId);
    }),

  // ─── Timetable ───────────────────────────────────────────────────────
  myTimetable: requireTeacher.query(({ ctx }) => db.getTimetableByTeacher(ctx.user.id)),

  // ─── Announcements ───────────────────────────────────────────────────
  announcements: requireTeacher.query(async ({ ctx }) => {
    const activeYear = await db.getActiveAcademicYear();
    const assignments = activeYear ? await db.getTeacherAssignments(ctx.user.id, activeYear.id) : [];
    const classIds = assignments.map(a => a.class.id);
    return db.getActiveAnnouncements("teacher", classIds[0]);
  }),
});
