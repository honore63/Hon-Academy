(function () {
  "use strict";
  if (window.__honAssessmentLoaded) return;
  window.__honAssessmentLoaded = true;

  /* ==================================================================
     Hon Academy — Assessment Management & Dynamic Report Engine
     Extends window.db with AssessmentType, Assessment, AssessmentResult,
     grade calculator, dynamic report builder, and A4 PDF export.
     ================================================================== */

  /* ---- CONSTANTS ---- */
  var GRADE_BOUNDARIES = [
    { min: 85, max: 100, grade: "A", remark: "Excellent" },
    { min: 70, max: 84,  grade: "B", remark: "Very Good" },
    { min: 55, max: 69,  grade: "C", remark: "Good" },
    { min: 40, max: 54,  grade: "D", remark: "Satisfactory" },
    { min: 0,  max: 39,  grade: "F", remark: "Needs Improvement" }
  ];

  var ACADEMIC_YEARS = ["2024", "2025", "2026", "2027", "2028"];
  var TERMS = ["Term 1", "Term 2", "Term 3"];

  var STORAGE_TYPES  = "hon_assessment_types";
  var STORAGE_ASMTS  = "hon_assessments";
  var STORAGE_RESULTS= "hon_assessment_results";

  /* ---- SEED DATA ---- */
  var DEFAULT_ASSESSMENT_TYPES = [
    { id: 1,  name: "Weekly Test",            slug: "weekly-test",       defaultMaxMarks: 20,  weight: 5,  category: "test",       isActive: true, layoutTemplate: "standard", hasRanking: false, hasAttendance: false, hasComments: true,  createdAt: "2026-01-01" },
    { id: 2,  name: "Monthly Test",           slug: "monthly-test",      defaultMaxMarks: 30,  weight: 10, category: "test",       isActive: true, layoutTemplate: "standard", hasRanking: false, hasAttendance: false, hasComments: true,  createdAt: "2026-01-01" },
    { id: 3,  name: "Mid-Term Test",          slug: "mid-term-test",     defaultMaxMarks: 50,  weight: 20, category: "exam",       isActive: true, layoutTemplate: "standard", hasRanking: true,  hasAttendance: true,  hasComments: true,  createdAt: "2026-01-01" },
    { id: 4,  name: "End-of-Term Examination",slug: "end-of-term-exam",  defaultMaxMarks: 100, weight: 40, category: "exam",       isActive: true, layoutTemplate: "full",      hasRanking: true,  hasAttendance: true,  hasComments: true,  createdAt: "2026-01-01" },
    { id: 5,  name: "End of Unit Assessment", slug: "end-of-unit",       defaultMaxMarks: 30,  weight: 10, category: "test",       isActive: true, layoutTemplate: "standard", hasRanking: false, hasAttendance: false, hasComments: true,  createdAt: "2026-01-01" },
    { id: 6,  name: "Continuous Assessment",  slug: "continuous-assessment", defaultMaxMarks: 100, weight: 30, category: "ca",     isActive: true, layoutTemplate: "cumulative",hasRanking: true,  hasAttendance: false, hasComments: true,  createdAt: "2026-01-01" },
    { id: 7,  name: "Project-Based Assessment", slug: "project-based",   defaultMaxMarks: 100, weight: 25, category: "project",    isActive: true, layoutTemplate: "project",   hasRanking: true,  hasAttendance: false, hasComments: true,  createdAt: "2026-01-01" },
    { id: 8,  name: "Practical Assessment",   slug: "practical",         defaultMaxMarks: 50,  weight: 15, category: "practical",  isActive: true, layoutTemplate: "simple",    hasRanking: false, hasAttendance: false, hasComments: true,  createdAt: "2026-01-01" },
    { id: 9,  name: "Homework",               slug: "homework",          defaultMaxMarks: 10,  weight: 3,  category: "assignment", isActive: true, layoutTemplate: "simple",    hasRanking: false, hasAttendance: false, hasComments: true,  createdAt: "2026-01-01" },
    { id: 10, name: "Class Exercise",         slug: "class-exercise",    defaultMaxMarks: 15,  weight: 5,  category: "assignment", isActive: true, layoutTemplate: "simple",    hasRanking: false, hasAttendance: false, hasComments: true,  createdAt: "2026-01-01" },
    { id: 11, name: "Oral Assessment",        slug: "oral",              defaultMaxMarks: 20,  weight: 5,  category: "oral",       isActive: true, layoutTemplate: "simple",    hasRanking: false, hasAttendance: false, hasComments: true,  createdAt: "2026-01-01" }
  ];

  /* ---- SEED ASSESSMENTS (optional — to demonstrate structure) ---- */
  var DEFAULT_ASSESSMENTS = [];

  var DEFAULT_ASSESSMENT_RESULTS = [];

  /* ---- STORAGE HELPERS ---- */
  function loadArr(key, fallback) {
    try {
      var d = localStorage.getItem(key);
      return d ? JSON.parse(d) : (fallback || []).slice();
    } catch (e) { return (fallback || []).slice(); }
  }
  function saveArr(key, arr) {
    try { localStorage.setItem(key, JSON.stringify(arr)); } catch (e) {}
  }

  /* ---- ID GENERATOR ---- */
  function nextId(arr) {
    return arr.length ? Math.max.apply(Math, arr.map(function(x){return x.id||0})) + 1 : 1;
  }

  /* ---- GRADE CALCULATOR ---- */
  function calculateGrade(score, maxMarks, boundaries) {
    var pct = maxMarks > 0 ? (score / maxMarks) * 100 : 0;
    var bounds = boundaries || GRADE_BOUNDARIES;
    for (var i = 0; i < bounds.length; i++) {
      var b = bounds[i];
      if (pct >= b.min && pct <= b.max) {
        return { percentage: Math.round(pct), grade: b.grade, remark: b.remark };
      }
    }
    return { percentage: Math.round(pct), grade: "F", remark: "Needs Improvement" };
  }

  /* ---- RANKING HELPER ---- */
  function assignRanks(results, assessmentId, sortKey) {
    sortKey = sortKey || "percentage";
    var filtered = results.filter(function(r){ return r.assessmentId === assessmentId; });
    filtered.sort(function(a, b){ return (b[sortKey] || 0) - (a[sortKey] || 0); });
    filtered.forEach(function(r, idx){ r.rank = idx + 1; });
    return results;
  }

  /* ---- VALIDATION ---- */
  function validateScore(score, maxMarks) {
    var s = Number(score);
    if (isNaN(s) || s < 0) return { valid: false, message: "Score cannot be negative or invalid" };
    if (s > maxMarks) return { valid: false, message: "Score cannot exceed " + maxMarks };
    return { valid: true, score: s };
  }

  /* ================================================================
     DB EXTENSION — attach to window.db
     ================================================================ */
  function extendDb() {
    if (!window.db) return;

    var db = window.db;

    /* ----- Assessment Type CRUD ----- */
    db.AssessmentType = {};
    var atProto = db.AssessmentType;
    atProto._data = null;
    atProto._ensure = function () {
      if (!atProto._data) atProto._data = loadArr(STORAGE_TYPES, DEFAULT_ASSESSMENT_TYPES);
      return atProto._data;
    };
    atProto._save = function () { saveArr(STORAGE_TYPES, atProto._data); };
    atProto.getList = function () { return atProto._ensure().filter(function(t){ return t.isActive !== false; }); };
    atProto.getAll = function () { return atProto._ensure(); };
    atProto.getById = function (id) {
      return atProto._ensure().filter(function(t){ return t.id === Number(id); })[0] || null;
    };
    atProto.create = function (data) {
      var arr = atProto._ensure();
      var item = { id: nextId(arr), isActive: true, createdAt: new Date().toISOString(), layoutTemplate: data.layoutTemplate || "standard", hasRanking: data.hasRanking === true, hasAttendance: data.hasAttendance === true, hasComments: data.hasComments !== false };
      for (var k in data) { if (data.hasOwnProperty(k)) item[k] = data[k]; }
      arr.push(item);
      atProto._save();
      return item;
    };
    atProto.update = function (id, updates) {
      var arr = atProto._ensure();
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === Number(id)) {
          for (var k in updates) { if (updates.hasOwnProperty(k)) arr[i][k] = updates[k]; }
          atProto._save();
          return arr[i];
        }
      }
      return null;
    };
    atProto.remove = function (id) {
      var arr = atProto._ensure();
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === Number(id)) {
          arr[i].isActive = false;
          atProto._save();
          return true;
        }
      }
      return false;
    };
    atProto.deletePermanent = function (id) {
      var arr = atProto._ensure();
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === Number(id)) { arr.splice(i, 1); atProto._save(); return true; }
      }
      return false;
    };

    /* ----- Assessment CRUD ----- */
    db.Assessment = {};
    var aProto = db.Assessment;
    aProto._data = null;
    aProto._ensure = function () {
      if (!aProto._data) aProto._data = loadArr(STORAGE_ASMTS, DEFAULT_ASSESSMENTS);
      return aProto._data;
    };
    aProto._save = function () { saveArr(STORAGE_ASMTS, aProto._data); };
    aProto.getList = function () { return aProto._ensure(); };
    aProto.getById = function (id) {
      return aProto._ensure().filter(function(a){ return a.id === Number(id); })[0] || null;
    };
    aProto.getByClassAndSubject = function (classId, subjectId, term) {
      return aProto._ensure().filter(function(a){
        return a.classId === Number(classId) && a.subjectId === Number(subjectId) &&
          (!term || a.term === term);
      });
    };
    aProto.getByStudent = function (studentId) {
      var results = db.AssessmentResult.getByStudent(studentId);
      var ids = {};
      results.forEach(function(r){ ids[r.assessmentId] = true; });
      var out = [];
      aProto._ensure().forEach(function(a){
        if (ids[a.id]) out.push(a);
      });
      return out;
    };
    aProto.isDuplicate = function (assessmentTypeId, classId, subjectId, name, term, academicYear) {
      return aProto._ensure().filter(function(a){
        return a.assessmentTypeId === Number(assessmentTypeId) &&
          a.classId === Number(classId) &&
          a.subjectId === Number(subjectId) &&
          a.name === name &&
          a.term === term &&
          a.academicYear === academicYear;
      }).length > 0;
    };
    aProto.create = function (data) {
      var arr = aProto._ensure();
      if (!data.isDuplicateAllowed && data.assessmentTypeId && data.classId && data.subjectId && data.name && data.term) {
        if (aProto.isDuplicate(data.assessmentTypeId, data.classId, data.subjectId, data.name, data.term, data.academicYear)) {
          return { error: "An assessment with the same type, class, subject, and name already exists for this term. Enable duplicate creation to proceed." };
        }
      }
      var item = { id: nextId(arr), status: "draft", createdAt: new Date().toISOString(), createdBy: 0 };
      for (var k in data) { if (data.hasOwnProperty(k)) item[k] = data[k]; }
      arr.push(item);
      aProto._save();
      return item;
    };
    aProto.update = function (id, updates) {
      var arr = aProto._ensure();
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === Number(id)) {
          for (var k in updates) { if (updates.hasOwnProperty(k)) arr[i][k] = updates[k]; }
          aProto._save();
          return arr[i];
        }
      }
      return null;
    };
    aProto.remove = function (id) {
      var arr = aProto._ensure();
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === Number(id)) { arr.splice(i, 1); aProto._save(); return true; }
      }
      return false;
    };
    aProto.getStats = function () {
      var arr = aProto._ensure();
      var total = arr.length;
      var byStatus = {}; var byType = {}; var bySubject = {};
      arr.forEach(function(a){
        byStatus[a.status] = (byStatus[a.status]||0) + 1;
        byType[a.assessmentTypeId] = (byType[a.assessmentTypeId]||0) + 1;
        bySubject[a.subjectId] = (bySubject[a.subjectId]||0) + 1;
      });
      return { total: total, byStatus: byStatus, byType: byType, bySubject: bySubject };
    };

    /* ----- Assessment Result CRUD ----- */
    db.AssessmentResult = {};
    var rProto = db.AssessmentResult;
    rProto._data = null;
    rProto._ensure = function () {
      if (!rProto._data) rProto._data = loadArr(STORAGE_RESULTS, DEFAULT_ASSESSMENT_RESULTS);
      return rProto._data;
    };
    rProto._save = function () { saveArr(STORAGE_RESULTS, rProto._data); };
    rProto.getList = function () { return rProto._ensure(); };
    rProto.getById = function (id) {
      return rProto._ensure().filter(function(r){ return r.id === Number(id); })[0] || null;
    };
    rProto.getByAssessment = function (assessmentId) {
      return rProto._ensure().filter(function(r){ return r.assessmentId === Number(assessmentId); });
    };
    rProto.getByStudent = function (studentId) {
      return rProto._ensure().filter(function(r){ return r.studentId === Number(studentId); });
    };
    rProto.getByAssessmentAndStudent = function (assessmentId, studentId) {
      return rProto._ensure().filter(function(r){
        return r.assessmentId === Number(assessmentId) && r.studentId === Number(studentId);
      })[0] || null;
    };
    rProto.record = function (assessmentId, studentId, score, maxMarks, comment, boundaries) {
      var v = validateScore(score, maxMarks);
      if (!v.valid) return { error: v.message };
      var g = calculateGrade(v.score, maxMarks, boundaries);
      var existing = rProto.getByAssessmentAndStudent(assessmentId, studentId);
      var result;
      if (existing) {
        existing.score = v.score;
        existing.percentage = g.percentage;
        existing.grade = g.grade;
        existing.comment = comment !== undefined ? comment : existing.comment;
        existing.submittedAt = new Date().toISOString();
        result = existing;
      } else {
        result = {
          id: nextId(rProto._ensure()),
          assessmentId: Number(assessmentId),
          studentId: Number(studentId),
          score: v.score,
          percentage: g.percentage,
          grade: g.grade,
          remark: g.remark,
          comment: comment || "",
          rank: null,
          submittedAt: new Date().toISOString()
        };
        rProto._ensure().push(result);
      }
      rProto._save();
      // auto-assign ranks if assessment type allows
      var asmt = db.Assessment.getById(assessmentId);
      if (asmt) {
        var at = db.AssessmentType.getById(asmt.assessmentTypeId);
        if (at && at.hasRanking) assignRanks(rProto._ensure(), assessmentId);
      }
      return result;
    };
    rProto.batchRecord = function (assessmentId, entries, maxMarks) {
      var results = [];
      var errors = [];
      var asmt = db.Assessment.getById(assessmentId);
      var at = asmt ? db.AssessmentType.getById(asmt.assessmentTypeId) : null;
      var boundaries = null; // use default
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        var r = rProto.record(assessmentId, e.studentId, e.score, maxMarks || 100, e.comment || "", boundaries);
        if (r.error) { errors.push({ studentId: e.studentId, error: r.error }); }
        else { results.push(r); }
      }
      if (at && at.hasRanking) assignRanks(rProto._ensure(), assessmentId);
      rProto._save();
      // signal update
      try { window.dispatchEvent(new CustomEvent("hon:assessment-update", { detail: { assessmentId: assessmentId } })); } catch (ex) {}
      return { results: results, errors: errors };
    };
    rProto.remove = function (id) {
      var arr = rProto._ensure();
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === Number(id)) { arr.splice(i, 1); rProto._save(); return true; }
      }
      return false;
    };
    rProto.removeByAssessment = function (assessmentId) {
      var arr = rProto._ensure();
      var count = arr.length;
      for (var i = arr.length-1; i >= 0; i--) {
        if (arr[i].assessmentId === Number(assessmentId)) arr.splice(i, 1);
      }
      if (arr.length !== count) rProto._save();
      return count - arr.length;
    };

    /* ================================================================
       REPORT ENGINE — dynamic layout per assessment type
       ================================================================ */

    function getStudentDetail(studentId) {
      var user = db.getUser(studentId);
      if (!user) return null;
      var student = null;
      try {
        if (window.dbExt && window.dbExt.getStudent) student = window.dbExt.getStudent(studentId);
      } catch(e) {}
      if (!student) {
        student = { id: user.id, fullName: user.name, studentId: user.studentId || ("HON-" + user.id), classId: user.classId || 0, gender: user.gender || "", admissionNo: user.admissionNo || "", parentName: user.parentName || "", parentPhone: user.parentPhone || "", parentEmail: user.parentEmail || "" };
      }
      return student;
    }

    function getClassName(classId) {
      try {
        if (db.getClass) {
          var c = db.getClass(classId);
          if (c) return c.name;
        }
      } catch(e) {}
      return "Class " + classId;
    }

    function getSchoolInfo() {
      try {
        if (db.getSchoolInfo) {
          var info = db.getSchoolInfo();
          if (info) return info;
        }
        var s = db.getSiteSettings();
        if (s) {
          return {
            name: s.schoolName || "Hon Academy",
            shortName: s.shortName || "HON-ACADEMY",
            motto: s.motto || "Excellence in education, Success in Life",
            address: s.address || "Kigali, Rwanda",
            phone: s.phone || "+250 791 684 429",
            email: s.email || "info@hon-academy.rw",
            logoUrl: s.logoUrl || ""
          };
        }
      } catch(e) {}
      return { name: "Hon Academy", shortName: "HON-ACADEMY", motto: "Excellence in education, Success in Life", address: "Kigali, Rwanda", phone: "+250 791 684 429", email: "info@hon-academy.rw", logoUrl: "IMAGES/WhatsApp Image 2026-07-18 at 9.51.59 AM.jpeg" };
    }

    /* ---- Build report HTML (A4 layout) ---- */
    function buildReportHTML(assessmentId, studentId) {
      var assessment = db.Assessment.getById(assessmentId);
      if (!assessment) return "<p>Assessment not found.</p>";
      var asmtType = db.AssessmentType.getById(assessment.assessmentTypeId);
      if (!asmtType) return "<p>Assessment type not found.</p>";
      var result = db.AssessmentResult.getByAssessmentAndStudent(assessmentId, studentId);
      var student = getStudentDetail(studentId);
      if (!student) return "<p>Student not found.</p>";
      var subject = db.getSubject(assessment.subjectId);
      var classInfo = { name: getClassName(assessment.classId) };
      var teacher = db.getUser(assessment.teacherId);
      var school = getSchoolInfo();

      var g = result ? calculateGrade(result.score, assessment.maxMarks) : null;
      var studentName = student.fullName || student.name || "Unknown";
      var studentIdDisplay = student.studentId || ("HON-" + student.id);
      var className = classInfo.name;
      var subjectName = subject ? subject.title : "Subject #" + assessment.subjectId;
      var teacherName = teacher ? teacher.name : "Teacher";
      var assessmentDate = assessment.date || "N/A";
      var academicYear = assessment.academicYear || "2026";
      var term = assessment.term || "Term 1";
      var qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=HON-VRFY-" + studentId + "-" + assessmentId;
      var logoHtml = school.logoUrl ? '<img src="' + school.logoUrl + '" alt="School Logo" style="height:70px;">' : '<div style="width:70px;height:70px;background:#1e3a8a;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:28px;">H</div>';

      var template = asmtType.layoutTemplate || "standard";
      var contentHtml = "";

      if (template === "simple") {
        contentHtml = buildSimpleLayout(assessment, asmtType, result, student, subject, g, studentName, studentIdDisplay, className, subjectName, teacherName, assessmentDate, academicYear, term);
      } else if (template === "project") {
        contentHtml = buildProjectLayout(assessment, asmtType, result, student, subject, g, studentName, studentIdDisplay, className, subjectName, teacherName, assessmentDate, academicYear, term);
      } else if (template === "cumulative") {
        contentHtml = buildCumulativeLayout(assessment, asmtType, result, student, subject, g, studentName, studentIdDisplay, className, subjectName, teacherName, assessmentDate, academicYear, term);
      } else {
        contentHtml = buildStandardLayout(assessment, asmtType, result, student, subject, g, studentName, studentIdDisplay, className, subjectName, teacherName, assessmentDate, academicYear, term);
      }

      var now = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

      return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Assessment Report - ' + studentName + '</title>' +
        '<style>' + getReportCSS() + '</style></head><body>' +
        '<div class="report-page">' +
          '<div class="report-header">' +
            '<div class="header-logo">' + logoHtml + '</div>' +
            '<div class="header-text">' +
              '<h1>' + school.name + '</h1>' +
              '<p class="motto">' + school.motto + '</p>' +
              '<p class="school-info">' + school.address + ' | ' + school.phone + ' | ' + school.email + '</p>' +
            '</div>' +
          '</div>' +
          '<hr>' +
          '<h2 class="report-title">' + asmtType.name + ' — Assessment Report</h2>' +
          contentHtml +
          '<div class="signatures">' +
            '<div class="sig-line"><span class="sig-label">Class Teacher</span><span class="sig-space">_________________________</span></div>' +
            '<div class="sig-line"><span class="sig-label">Head Teacher</span><span class="sig-space">_________________________</span></div>' +
            '<div class="sig-line"><span class="sig-label">Parent / Guardian</span><span class="sig-space">_________________________</span></div>' +
          '</div>' +
          '<div class="report-footer">' +
            '<div class="stamp-placeholder">[ School Stamp ]</div>' +
            '<div class="qr-section"><img src="' + qrUrl + '" alt="Verification QR" style="width:80px;height:80px;"><br><small>Scan to verify</small></div>' +
            '<div class="gen-info">Generated: ' + now + '<br>Page <span class="page-num"></span></div>' +
          '</div>' +
        '</div>' +
        '<script>document.querySelector(".page-num").textContent=1;<' + '/script>' +
        '</body></html>';
    }

    function buildStandardLayout(assessment, asmtType, result, student, subject, g, studentName, studentIdDisplay, className, subjectName, teacherName, assessmentDate, academicYear, term) {
      return '<div class="student-info"><table class="info-table"><tr><td><strong>Student:</strong> ' + studentName + '</td><td><strong>Class:</strong> ' + className + '</td></tr>' +
        '<tr><td><strong>Student ID:</strong> ' + studentIdDisplay + '</td><td><strong>Subject:</strong> ' + subjectName + '</td></tr>' +
        '<tr><td><strong>Assessment:</strong> ' + (assessment.name || asmtType.name) + '</td><td><strong>Date:</strong> ' + assessmentDate + '</td></tr>' +
        '<tr><td><strong>Term:</strong> ' + term + '</td><td><strong>Academic Year:</strong> ' + academicYear + '</td></tr></table></div>' +
        '<div class="results-section"><table class="results-table"><thead><tr><th>Score</th><th>Max</th><th>Percentage</th><th>Grade</th><th>Remark</th></tr></thead><tbody>' +
        '<tr class="result-row"><td>' + (result ? result.score : "—") + '</td><td>' + assessment.maxMarks + '</td><td>' + (g ? g.percentage + "%" : "—") + '</td><td class="grade-cell">' + (g ? g.grade : "—") + '</td><td>' + (g ? g.remark : "—") + '</td></tr>' +
        '</tbody></table></div>' +
        (result && result.rank ? '<p><strong>Rank:</strong> ' + result.rank + '</p>' : '') +
        (asmtType.hasComments ? '<div class="comments"><h3>Teacher\'s Comments</h3><p>' + (result && result.comment ? result.comment : "No comments.") + '</p></div>' : '') +
        (assessment.remarks ? '<div class="remarks"><h3>Assessment Remarks</h3><p>' + assessment.remarks + '</p></div>' : '');
    }

    function buildSimpleLayout(assessment, asmtType, result, student, subject, g, studentName, studentIdDisplay, className, subjectName, teacherName, assessmentDate, academicYear, term) {
      return '<div class="student-info"><table class="info-table"><tr><td><strong>Student:</strong> ' + studentName + '</td><td><strong>Subject:</strong> ' + subjectName + '</td></tr>' +
        '<tr><td><strong>Date:</strong> ' + assessmentDate + '</td><td><strong>Type:</strong> ' + asmtType.name + '</td></tr></table></div>' +
        '<div class="results-section"><table class="results-table"><thead><tr><th>Score</th><th>Max</th><th>Percentage</th><th>Grade</th></tr></thead><tbody>' +
        '<tr class="result-row"><td>' + (result ? result.score : "—") + '</td><td>' + assessment.maxMarks + '</td><td>' + (g ? g.percentage + "%" : "—") + '</td><td class="grade-cell">' + (g ? g.grade : "—") + '</td></tr>' +
        '</tbody></table></div>' +
        (asmtType.hasComments ? '<div class="comments"><h3>Comments</h3><p>' + (result && result.comment ? result.comment : "No comments.") + '</p></div>' : '');
    }

    function buildProjectLayout(assessment, asmtType, result, student, subject, g, studentName, studentIdDisplay, className, subjectName, teacherName, assessmentDate, academicYear, term) {
      return buildStandardLayout(assessment, asmtType, result, student, subject, g, studentName, studentIdDisplay, className, subjectName, teacherName, assessmentDate, academicYear, term).replace("</tbody></table>", '<tr><th>Criteria</th><th>Score</th></tr><tr><td>Research & Content</td><td>' + (result ? Math.round(result.score * 0.3) : "—") + '</td></tr><tr><td>Presentation</td><td>' + (result ? Math.round(result.score * 0.3) : "—") + '</td></tr><tr><td>Innovation</td><td>' + (result ? Math.round(result.score * 0.2) : "—") + '</td></tr><tr><td>Effort</td><td>' + (result ? Math.round(result.score * 0.2) : "—") + '</td></tr></tbody></table>');
    }

    function buildCumulativeLayout(assessment, asmtType, result, student, subject, g, studentName, studentIdDisplay, className, subjectName, teacherName, assessmentDate, academicYear, term) {
      var all = db.AssessmentResult.getByStudent(studentId);
      var totalPct = 0; var count = 0;
      all.forEach(function(r){
        var a = db.Assessment.getById(r.assessmentId);
        if (a && a.term === term && a.academicYear === academicYear) {
          totalPct += r.percentage || 0; count++;
        }
      });
      var avgPct = count > 0 ? Math.round(totalPct / count) : 0;
      var overallGrade = calculateGrade(avgPct, 100).grade;
      return buildStandardLayout(assessment, asmtType, result, student, subject, g, studentName, studentIdDisplay, className, subjectName, teacherName, assessmentDate, academicYear, term) +
        '<div class="cumulative"><h3>Cumulative Performance (' + term + ')</h3>' +
        '<table class="results-table"><tr><th>Assessments Taken</th><td>' + count + '</td></tr>' +
        '<tr><th>Average Percentage</th><td>' + avgPct + '%</td></tr>' +
        '<tr><th>Overall Grade</th><td class="grade-cell">' + overallGrade + '</td></tr></table></div>';
    }

    /* ---- CSS for A4 report ---- */
    function getReportCSS() {
      return '@page { size: A4; margin: 12mm; } ' +
        '@media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } } ' +
        '* { box-sizing: border-box; } ' +
        'body { font-family: "Segoe UI", Roboto, Arial, sans-serif; width: 210mm; margin: 0 auto; padding: 10mm 12mm; background: #fff; color: #111; } ' +
        '.report-page { max-width: 190mm; margin: 0 auto; } ' +
        '.report-header { display: flex; align-items: center; gap: 18px; margin-bottom: 6px; } ' +
        '.header-logo { flex-shrink: 0; } ' +
        '.header-text h1 { margin: 0 0 2px; font-size: 22px; color: #1e3a8a; } ' +
        '.motto { margin: 0; font-style: italic; color: #475569; font-size: 13px; } ' +
        '.school-info { margin: 4px 0 0; font-size: 11px; color: #64748b; } ' +
        'hr { border: none; border-top: 2px solid #1e3a8a; margin: 8px 0 12px; } ' +
        '.report-title { text-align: center; font-size: 17px; color: #1e3a8a; margin: 6px 0 14px; text-transform: uppercase; letter-spacing: 1px; } ' +
        'table { width: 100%; border-collapse: collapse; margin: 8px 0; } ' +
        'table.info-table td { padding: 5px 10px; font-size: 13px; border: none; } ' +
        'table.results-table { border: 1px solid #cbd5e1; } ' +
        'table.results-table th { background: #1e3a8a; color: #fff; padding: 8px 10px; text-align: left; font-size: 13px; } ' +
        'table.results-table td { padding: 7px 10px; border: 1px solid #e2e8f0; font-size: 13px; } ' +
        '.result-row td { font-weight: 700; font-size: 15px; } ' +
        '.grade-cell { font-weight: 700; color: #1e3a8a; font-size: 16px; } ' +
        '.comments, .remarks, .cumulative { margin: 14px 0; } ' +
        '.comments h3, .remarks h3, .cumulative h3 { font-size: 14px; color: #1e3a8a; margin: 0 0 6px; } ' +
        '.comments p, .remarks p { font-size: 13px; line-height: 1.6; color: #334155; } ' +
        '.signatures { display: flex; flex-wrap: wrap; justify-content: space-between; margin: 28px 0 20px; } ' +
        '.sig-line { display: flex; flex-direction: column; align-items: center; min-width: 140px; } ' +
        '.sig-label { font-size: 12px; color: #64748b; margin-bottom: 4px; } ' +
        '.sig-space { font-size: 14px; letter-spacing: 2px; color: #333; } ' +
        '.report-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 12px; margin-top: 10px; } ' +
        '.stamp-placeholder { border: 1px dashed #94a3b8; padding: 8px 16px; font-size: 12px; color: #94a3b8; border-radius: 6px; } ' +
        '.qr-section { text-align: center; } ' +
        '.qr-section small { font-size: 9px; color: #94a3b8; } ' +
        '.gen-info { font-size: 10px; color: #94a3b8; text-align: right; } ' +
        '.page-num { font-weight: 700; }';
    }

    /* ---- PDF Export (print-based) ---- */
    function exportReportPDF(assessmentId, studentId) {
      var html = buildReportHTML(assessmentId, studentId);
      var w = window.open('', '_blank');
      w.document.write(html);
      w.document.close();
      w.focus();
      setTimeout(function(){ w.print(); }, 400);
    }

    /* ---- Multi-student batch export ---- */
    function exportBatchPDFs(assessmentId, studentIds) {
      studentIds.forEach(function(sid, idx){
        setTimeout(function(){
          exportReportPDF(assessmentId, sid);
        }, idx * 300);
      });
    }

    /* ---- Get assessment results with student info for display ---- */
    function getAssessmentResultsWithDetails(assessmentId) {
      var results = db.AssessmentResult.getByAssessment(assessmentId);
      var assessment = db.Assessment.getById(assessmentId);
      var maxMarks = assessment ? assessment.maxMarks : 100;
      return results.map(function(r){
        var student = getStudentDetail(r.studentId);
        var g = calculateGrade(r.score, maxMarks);
        return {
          id: r.id,
          studentId: r.studentId,
          studentName: student ? (student.fullName || student.name) : "Unknown",
          studentIdDisplay: student ? (student.studentId || "HON-" + student.id) : "",
          score: r.score,
          maxMarks: maxMarks,
          percentage: g.percentage,
          grade: g.grade,
          remark: g.remark,
          comment: r.comment || "",
          rank: r.rank,
          submittedAt: r.submittedAt
        };
      });
    }

    /* ---- Export functions on db ---- */
    db.Assessment.Report = {
      buildHTML: buildReportHTML,
      exportPDF: exportReportPDF,
      exportBatch: exportBatchPDFs,
      getResultsWithDetails: getAssessmentResultsWithDetails,
      getSchoolInfo: getSchoolInfo,
      getStudentDetail: getStudentDetail,
      getClassName: getClassName,
      calculateGrade: calculateGrade,
      getGradeBoundaries: function(){ return GRADE_BOUNDARIES; }
    };
  }

  /* ================================================================
     INIT
     ================================================================ */
  function init() {
    if (window.db) {
      extendDb();
    } else {
      var check = setInterval(function(){
        if (window.db) {
          clearInterval(check);
          extendDb();
        }
      }, 50);
      setTimeout(function(){ clearInterval(check); }, 5000);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
