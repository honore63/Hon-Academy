// ══════════════════════════════════════════════════════════════
//  HonE-Learning Platform — Database Extension
//  Adds: Classes, Students (enhanced), Resources, Categories,
//        Import History, Bookmarks, Activity Logs
// ══════════════════════════════════════════════════════════════

(function () {
  // ── helpers ──────────────────────────────────────────────────
  function getOrInit(key, defaults) {
    const raw = localStorage.getItem(key);
    if (raw === null) { localStorage.setItem(key, JSON.stringify(defaults)); return defaults; }
    try { return JSON.parse(raw); } catch { return defaults; }
  }
  function save(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  function nextId(arr) { 
    // Fallback logic. Usually returns UUID now to match Supabase architecture.
    return generateUUID();
  }

  // ── Default Data ──────────────────────────────────────────────
  const DEFAULT_CLASSES = [
    { id: 1, name: "P1", level: "Primary", stream: null, capacity: 40, createdAt: "2026-01-01" },
    { id: 2, name: "P2", level: "Primary", stream: null, capacity: 40, createdAt: "2026-01-01" },
    { id: 3, name: "P3", level: "Primary", stream: null, capacity: 40, createdAt: "2026-01-01" },
    { id: 4, name: "P4", level: "Primary", stream: null, capacity: 45, createdAt: "2026-01-01" },
    { id: 5, name: "P5", level: "Primary", stream: null, capacity: 45, createdAt: "2026-01-01" },
    { id: 6, name: "P6", level: "Primary", stream: null, capacity: 45, createdAt: "2026-01-01" },
    { id: 7, name: "S1", level: "Secondary", stream: null, capacity: 50, createdAt: "2026-01-01" },
    { id: 8, name: "S2", level: "Secondary", stream: null, capacity: 50, createdAt: "2026-01-01" },
    { id: 9, name: "S3", level: "Secondary", stream: null, capacity: 50, createdAt: "2026-01-01" },
    { id: 10, name: "S4", level: "Secondary", stream: null, capacity: 50, createdAt: "2026-01-01" },
    { id: 11, name: "S5", level: "Secondary", stream: null, capacity: 45, createdAt: "2026-01-01" },
    { id: 12, name: "S6", level: "Secondary", stream: null, capacity: 45, createdAt: "2026-01-01" }
  ];

  const DEFAULT_STUDENTS = [
    { id: 1, studentId: "HON-2026-001", fullName: "Alice Smith",      gender: "Female", dob: "2015-03-12", classId: 4, admissionNo: "ADM001", parentName: "Mary Smith",     parentPhone: "+250781001001", parentEmail: "mary@email.com",   address: "Kigali, Rwanda",   avatarUrl: "", status: "Active", createdAt: "2026-01-10", importBatch: null },
    { id: 2, studentId: "HON-2026-002", fullName: "Jean Claude Habimana", gender: "Male", dob: "2014-07-20", classId: 5, admissionNo: "ADM002", parentName: "Paul Habimana", parentPhone: "+250782002002", parentEmail: "paul@email.com",   address: "Musanze, Rwanda",  avatarUrl: "", status: "Active", createdAt: "2026-01-10", importBatch: null },
    { id: 3, studentId: "HON-2026-003", fullName: "Diane Uwase",       gender: "Female", dob: "2013-11-05", classId: 6, admissionNo: "ADM003", parentName: "Agnes Uwase",   parentPhone: "+250783003003", parentEmail: "agnes@email.com",  address: "Huye, Rwanda",     avatarUrl: "", status: "Active", createdAt: "2026-01-11", importBatch: null },
    { id: 4, studentId: "HON-2026-004", fullName: "Eric Mugabo",       gender: "Male",   dob: "2012-04-18", classId: 7, admissionNo: "ADM004", parentName: "Chris Mugabo",  parentPhone: "+250784004004", parentEmail: "chris@email.com",  address: "Rubavu, Rwanda",   avatarUrl: "", status: "Active", createdAt: "2026-01-12", importBatch: null },
    { id: 5, studentId: "HON-2026-005", fullName: "Grace Ineza",       gender: "Female", dob: "2011-09-30", classId: 8, admissionNo: "ADM005", parentName: "Rose Ineza",    parentPhone: "+250785005005", parentEmail: "rose@email.com",   address: "Kigali, Rwanda",   avatarUrl: "", status: "Active", createdAt: "2026-01-13", importBatch: null }
  ];

  const DEFAULT_RESOURCE_CATEGORIES = [
    { id: 1, name: "Books",              icon: "fa-book",             color: "#3b82f6" },
    { id: 2, name: "Notes",              icon: "fa-sticky-note",      color: "#10b981" },
    { id: 3, name: "Assignments",        icon: "fa-pen-to-square",    color: "#f59e0b" },
    { id: 4, name: "Past Papers",        icon: "fa-file-alt",         color: "#8b5cf6" },
    { id: 5, name: "Tutorials",          icon: "fa-graduation-cap",   color: "#ec4899" },
    { id: 6, name: "Lesson Plans",       icon: "fa-calendar-days",    color: "#06b6d4" },
    { id: 7, name: "Presentations",      icon: "fa-file-powerpoint",  color: "#f97316" },
    { id: 8, name: "Videos",             icon: "fa-circle-play",      color: "#ef4444" },
    { id: 9, name: "Audio Lessons",      icon: "fa-headphones",       color: "#84cc16" },
    { id: 10, name: "Worksheets",        icon: "fa-clipboard-list",   color: "#6366f1" },
    { id: 11, name: "Lab Manuals",       icon: "fa-flask",            color: "#14b8a6" },
    { id: 12, name: "Examinations",      icon: "fa-file-circle-check","color": "#dc2626" },
    { id: 13, name: "Practice Qs",       icon: "fa-circle-question",  color: "#7c3aed" },
    { id: 14, name: "Research Papers",   icon: "fa-microscope",       color: "#0891b2" },
    { id: 15, name: "Other",             icon: "fa-folder",           color: "#64748b" }
  ];

  const DEFAULT_RESOURCES = [
    {
      id: 1, title: "REB Primary 4 SET Textbook", description: "Official Rwanda Education Board textbook for Science & Elementary Technology — Primary 4.",
      categoryId: 1, subjectId: 5, gradeClasses: ["P4"], teacherId: 2, author: "REB", language: "English",
      tags: ["science","primary","textbook"], fileType: "PDF", fileName: "P4_SET_Textbook_REB.pdf",
      fileSize: 4200000, fileUrl: "", thumbnailUrl: "", coverUrl: "",
      visibility: "Students", downloadAllowed: true, status: "Published",
      version: "2026.1", publicationDate: "2026-07-01",
      views: 87, downloads: 52, uploadedBy: 2, uploadedAt: "2026-07-01T08:00:00Z"
    },
    {
      id: 2, title: "Soil Types & Vegetation Slides", description: "Interactive PowerPoint presentation on soil classification and vegetation types for Primary students.",
      categoryId: 7, subjectId: 5, gradeClasses: ["P4","P5"], teacherId: 2, author: "Dr. R. Carter", language: "English",
      tags: ["soil","science","presentation"], fileType: "PPT", fileName: "Soil_Types_Presentation.pptx",
      fileSize: 2800000, fileUrl: "", thumbnailUrl: "", coverUrl: "",
      visibility: "Students", downloadAllowed: true, status: "Published",
      version: "1.0", publicationDate: "2026-07-02",
      views: 64, downloads: 35, uploadedBy: 2, uploadedAt: "2026-07-02T10:15:00Z"
    },
    {
      id: 3, title: "S3 Advanced Mathematics Guide", description: "Comprehensive secondary mathematics study guide covering algebra, quadratics, and calculus intro.",
      categoryId: 1, subjectId: 14, gradeClasses: ["S3"], teacherId: 2, author: "Dr. R. Carter", language: "English",
      tags: ["math","secondary","algebra"], fileType: "PDF", fileName: "S3_Mathematics_Guide.pdf",
      fileSize: 6100000, fileUrl: "", thumbnailUrl: "", coverUrl: "",
      visibility: "Students", downloadAllowed: true, status: "Published",
      version: "2026.1", publicationDate: "2026-07-02",
      views: 112, downloads: 78, uploadedBy: 2, uploadedAt: "2026-07-02T14:00:00Z"
    },
    {
      id: 4, title: "Newtonian Physics Reference Notes", description: "Detailed reference notes on Newton's Laws, forces, and motion for S4 Physics students.",
      categoryId: 2, subjectId: 17, gradeClasses: ["S4"], teacherId: 2, author: "Dr. R. Carter", language: "English",
      tags: ["physics","newton","secondary"], fileType: "Word", fileName: "S4_Physics_Forces_Review.docx",
      fileSize: 1500000, fileUrl: "", thumbnailUrl: "", coverUrl: "",
      visibility: "Students", downloadAllowed: true, status: "Published",
      version: "1.0", publicationDate: "2026-07-03",
      views: 95, downloads: 61, uploadedBy: 2, uploadedAt: "2026-07-03T09:00:00Z"
    }
  ];

  const DEFAULT_IMPORT_HISTORY = [];
  const DEFAULT_BOOKMARKS = [];
  const DEFAULT_ACTIVITY_LOGS = [];

  // ── Extended DB APIs ──────────────────────────────────────────
  const dbExt = {

    // ── CLASSES ─────────────────────────────────────────────────
    getClasses: () => getOrInit("dbx_classes", DEFAULT_CLASSES),
    getClass: (id) => dbExt.getClasses().find(c => String(c.id) === String(id)),
    createClass: (data) => {
      const classes = dbExt.getClasses();
      if (classes.find(c => c.name.toLowerCase() === data.name.toLowerCase())) {
        return { error: "Class already exists" };
      }
      const newClass = { id: nextId(classes), createdAt: new Date().toISOString().split("T")[0], ...data };
      classes.push(newClass);
      save("dbx_classes", classes);
      return newClass;
    },
    updateClass: (id, updates) => {
      const classes = dbExt.getClasses();
      const idx = classes.findIndex(c => String(c.id) === String(id));
      if (idx !== -1) { classes[idx] = { ...classes[idx], ...updates }; save("dbx_classes", classes); return classes[idx]; }
      return null;
    },
    deleteClass: (id) => {
      let classes = dbExt.getClasses().filter(c => String(c.id) !== String(id));
      save("dbx_classes", classes);
    },
    getStudentCountByClass: (classId) => dbExt.getStudents().filter(s => String(s.classId) === String(classId)).length,

    // ── STUDENTS (enhanced) ──────────────────────────────────────
    getStudents: () => getOrInit("dbx_students", DEFAULT_STUDENTS),
    getStudent: (id) => dbExt.getStudents().find(s => String(s.id) === String(id)),
    getStudentsByClass: (classId) => dbExt.getStudents().filter(s => String(s.classId) === String(classId)),
    createStudent: (data) => {
      const students = dbExt.getStudents();
      // Auto-generate Student ID if not provided
      if (!data.studentId) {
        const yr = new Date().getFullYear();
        data.studentId = `HON-${yr}-${String(nextId(students)).padStart(3, "0")}`;
      }
      // Check duplicate
      if (students.find(s => s.studentId === data.studentId)) {
        return { error: `Duplicate student ID: ${data.studentId}` };
      }
      const student = { id: nextId(students), status: "Active", createdAt: new Date().toISOString().split("T")[0], importBatch: null, avatarUrl: "", ...data };
      students.push(student);
      save("dbx_students", students);
      dbExt.logActivity("student_created", `Student ${student.fullName} registered`);
      return student;
    },
    updateStudent: (id, updates) => {
      const students = dbExt.getStudents();
      const idx = students.findIndex(s => String(s.id) === String(id));
      if (idx !== -1) { students[idx] = { ...students[idx], ...updates }; save("dbx_students", students); return students[idx]; }
      return null;
    },
    deleteStudent: (id) => {
      let students = dbExt.getStudents().filter(s => String(s.id) !== String(id));
      save("dbx_students", students);
    },
    bulkDeleteStudents: (ids) => {
      const idSet = new Set(ids.map(String));
      let students = dbExt.getStudents().filter(s => !idSet.has(String(s.id)));
      save("dbx_students", students);
    },
    bulkImportStudents: (rows, classId, batchName) => {
      const students = dbExt.getStudents();
      const batchId = `BATCH-${Date.now()}`;
      const results = { imported: 0, duplicates: 0, invalid: 0, errors: [] };
      const newStudents = [];

      rows.forEach((row, i) => {
        if (!row.fullName || row.fullName.trim() === "") {
          results.invalid++;
          results.errors.push({ row: i + 1, reason: "Empty name" });
          return;
        }
        // Check duplicate name+class
        if (students.find(s => s.fullName.toLowerCase() === row.fullName.toLowerCase() && s.classId === Number(classId))) {
          results.duplicates++;
          results.errors.push({ row: i + 1, reason: `Duplicate: ${row.fullName}` });
          return;
        }
        const yr = new Date().getFullYear();
        const newId = nextId([...students, ...newStudents]);
        const student = {
          id: newId,
          studentId: row.studentId || `HON-${yr}-${String(newId).padStart(3, "0")}`,
          fullName: row.fullName.trim(),
          gender: row.gender || "",
          dob: row.dob || "",
          classId: Number(classId),
          admissionNo: row.admissionNo || "",
          parentName: row.parentName || "",
          parentPhone: row.parentPhone || "",
          parentEmail: row.parentEmail || "",
          address: row.address || "",
          avatarUrl: "",
          status: "Active",
          createdAt: new Date().toISOString().split("T")[0],
          importBatch: batchId
        };
        newStudents.push(student);
        students.push(student);
        results.imported++;
      });

      save("dbx_students", students);

      // Record history
      const history = dbExt.getImportHistory();
      history.unshift({
        id: nextId(history),
        batchId, batchName: batchName || `Import ${new Date().toLocaleDateString()}`,
        imported: results.imported, duplicates: results.duplicates, invalid: results.invalid,
        classId: Number(classId), studentIds: newStudents.map(s => s.id),
        createdAt: new Date().toISOString()
      });
      save("dbx_import_history", history);
      dbExt.logActivity("bulk_import", `Imported ${results.imported} students`);
      return results;
    },
    undoLastImport: () => {
      const history = dbExt.getImportHistory();
      if (history.length === 0) return { error: "No import to undo" };
      const last = history[0];
      const idSet = new Set(last.studentIds.map(Number));
      let students = dbExt.getStudents().filter(s => !idSet.has(s.id));
      save("dbx_students", students);
      history.shift();
      save("dbx_import_history", history);
      return { removed: last.imported };
    },
    searchStudents: (query, classId, status) => {
      let students = dbExt.getStudents();
      if (classId) students = students.filter(s => s.classId === Number(classId));
      if (status) students = students.filter(s => s.status === status);
      if (query) {
        const q = query.toLowerCase();
        students = students.filter(s =>
          s.fullName.toLowerCase().includes(q) ||
          s.studentId.toLowerCase().includes(q) ||
          (s.parentName || "").toLowerCase().includes(q)
        );
      }
      return students;
    },

    // ── IMPORT HISTORY ────────────────────────────────────────────
    getImportHistory: () => getOrInit("dbx_import_history", DEFAULT_IMPORT_HISTORY),

    // ── RESOURCES ─────────────────────────────────────────────────
    getResources: () => getOrInit("dbx_resources", DEFAULT_RESOURCES),
    getResource: (id) => dbExt.getResources().find(r => String(r.id) === String(id)),
    createResource: (data) => {
      const resources = dbExt.getResources();
      const resource = {
        id: nextId(resources),
        views: 0, downloads: 0,
        uploadedAt: new Date().toISOString(),
        status: "Published",
        ...data
      };
      resources.unshift(resource);
      save("dbx_resources", resources);
      dbExt.logActivity("resource_uploaded", `Resource "${resource.title}" uploaded`);
      return resource;
    },
    updateResource: (id, updates) => {
      const resources = dbExt.getResources();
      const idx = resources.findIndex(r => String(r.id) === String(id));
      if (idx !== -1) { resources[idx] = { ...resources[idx], ...updates }; save("dbx_resources", resources); return resources[idx]; }
      return null;
    },
    deleteResource: (id) => {
      let resources = dbExt.getResources().filter(r => String(r.id) !== String(id));
      save("dbx_resources", resources);
    },
    incrementResourceView: (id) => {
      const resources = dbExt.getResources();
      const idx = resources.findIndex(r => String(r.id) === String(id));
      if (idx !== -1) { resources[idx].views = (resources[idx].views || 0) + 1; save("dbx_resources", resources); }
    },
    incrementResourceDownload: (id) => {
      const resources = dbExt.getResources();
      const idx = resources.findIndex(r => String(r.id) === String(id));
      if (idx !== -1) { resources[idx].downloads = (resources[idx].downloads || 0) + 1; save("dbx_resources", resources); }
    },
    searchResources: (query, categoryId, fileType, classFilter) => {
      let resources = dbExt.getResources();
      if (categoryId) resources = resources.filter(r => r.categoryId === Number(categoryId));
      if (fileType)   resources = resources.filter(r => r.fileType === fileType);
      if (classFilter) resources = resources.filter(r => (r.gradeClasses || []).includes(classFilter));
      if (query) {
        const q = query.toLowerCase();
        resources = resources.filter(r =>
          r.title.toLowerCase().includes(q) ||
          (r.description || "").toLowerCase().includes(q) ||
          (r.tags || []).some(t => t.toLowerCase().includes(q)) ||
          (r.author || "").toLowerCase().includes(q)
        );
      }
      return resources;
    },
    getResourceStats: () => {
      const resources = dbExt.getResources();
      return {
        total: resources.length,
        books:  resources.filter(r => r.categoryId === 1).length,
        videos: resources.filter(r => r.categoryId === 8).length,
        docs:   resources.filter(r => ["PDF","Word"].includes(r.fileType)).length,
        totalViews: resources.reduce((sum, r) => sum + (r.views || 0), 0),
        totalDownloads: resources.reduce((sum, r) => sum + (r.downloads || 0), 0),
        totalSize: resources.reduce((sum, r) => sum + (r.fileSize || 0), 0),
        topDownloaded: [...resources].sort((a,b) => (b.downloads||0) - (a.downloads||0)).slice(0,5),
        topViewed:     [...resources].sort((a,b) => (b.views||0)     - (a.views||0)).slice(0,5),
        recent:        [...resources].sort((a,b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)).slice(0,5)
      };
    },

    // ── RESOURCE CATEGORIES ──────────────────────────────────────
    getResourceCategories: () => getOrInit("dbx_resource_categories", DEFAULT_RESOURCE_CATEGORIES),

    // ── BOOKMARKS ─────────────────────────────────────────────────
    getBookmarks: (userId) => getOrInit("dbx_bookmarks", DEFAULT_BOOKMARKS).filter(b => b.userId === Number(userId)),
    addBookmark: (userId, resourceId) => {
      const bookmarks = getOrInit("dbx_bookmarks", DEFAULT_BOOKMARKS);
      if (!bookmarks.find(b => b.userId === Number(userId) && b.resourceId === Number(resourceId))) {
        bookmarks.push({ id: nextId(bookmarks), userId: Number(userId), resourceId: Number(resourceId), createdAt: new Date().toISOString() });
        save("dbx_bookmarks", bookmarks);
      }
    },
    removeBookmark: (userId, resourceId) => {
      const bookmarks = getOrInit("dbx_bookmarks", DEFAULT_BOOKMARKS).filter(
        b => !(b.userId === Number(userId) && b.resourceId === Number(resourceId))
      );
      save("dbx_bookmarks", bookmarks);
    },
    isBookmarked: (userId, resourceId) => {
      return !!getOrInit("dbx_bookmarks", DEFAULT_BOOKMARKS).find(b => b.userId === Number(userId) && b.resourceId === Number(resourceId));
    },

    // ── ACTIVITY LOG ─────────────────────────────────────────────
    logActivity: (type, message) => {
      const logs = getOrInit("dbx_activity_logs", DEFAULT_ACTIVITY_LOGS);
      logs.unshift({ id: nextId(logs), type, message, createdAt: new Date().toISOString() });
      if (logs.length > 200) logs.length = 200; // cap
      save("dbx_activity_logs", logs);
    },
    getActivityLogs: (limit = 20) => getOrInit("dbx_activity_logs", DEFAULT_ACTIVITY_LOGS).slice(0, limit),

    // ── CSV UTILITIES ─────────────────────────────────────────────
    generateCSVTemplate: () => {
      const headers = ["Full Names","Student ID","Gender","Date of Birth","Parent Name","Parent Phone","Parent Email","Address","Admission Number"];
      const example = ["John Doe","","Male","2015-05-20","Jane Doe","+250781000000","jane@email.com","Kigali",""];
      return [headers.join(","), example.join(",")].join("\n");
    },
    parseCSV: (text) => {
      const lines = text.trim().split("\n");
      if (lines.length < 2) return [];
      const headers = lines[0].split(",").map(h => h.trim().replace(/"/g, ""));
      const headerMap = {
        "full names": "fullName", "fullnames": "fullName", "name": "fullName", "full name": "fullName",
        "student id": "studentId", "studentid": "studentId", "id": "studentId",
        "gender": "gender", "sex": "gender",
        "date of birth": "dob", "dob": "dob", "birthdate": "dob", "birthday": "dob",
        "parent name": "parentName", "guardian name": "parentName", "parent/guardian": "parentName",
        "parent phone": "parentPhone", "phone": "parentPhone", "contact": "parentPhone",
        "parent email": "parentEmail", "email": "parentEmail",
        "address": "address", "location": "address",
        "admission number": "admissionNo", "admission no": "admissionNo", "admno": "admissionNo"
      };
      const mappedHeaders = headers.map(h => headerMap[h.toLowerCase()] || h.toLowerCase());
      return lines.slice(1).map(line => {
        const values = line.split(",").map(v => v.trim().replace(/"/g, ""));
        const row = {};
        mappedHeaders.forEach((key, i) => { row[key] = values[i] || ""; });
        return row;
      }).filter(row => Object.values(row).some(v => v !== ""));
    },

    exportTableToCSV: (tableIdOrSelector, filename = "Export_Data") => {
      const table = document.querySelector(tableIdOrSelector);
      if (!table) return;
      
      let csv = [];
      const rows = table.querySelectorAll("tr");
      
      for (let i = 0; i < rows.length; i++) {
        let row = [], cols = rows[i].querySelectorAll("td, th");
        let skip = false;
        for (let j = 0; j < cols.length; j++) {
          if (cols[j].innerText.includes('Export') || cols[j].innerText.includes('Generate') && cols[j].querySelector('button')) continue;
          if (cols[j].innerText.trim() === 'Actions' && cols[j].tagName === 'TH') continue;
          let data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, " ").trim();
          data = data.replace(/"/g, '""');
          row.push('"' + data + '"');
        }
        if (!skip && row.length > 0) csv.push(row.join(","));
      }

      const csvData = new Blob([csv.join("\n")], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(csvData);
      link.download = filename + ".csv";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    // ── STORAGE UTIL ──────────────────────────────────────────────
    getStorageInfo: () => {
      const resources = dbExt.getResources();
      const used = resources.reduce((sum, r) => sum + (r.fileSize || 0), 0);
      const max = 1024 * 1024 * 1024; // 1GB conceptual limit
      return { used, max, percent: Math.round((used / max) * 100) };
    },
    formatBytes: (bytes) => {
      if (bytes === 0) return "0 B";
      const k = 1024;
      const sizes = ["B","KB","MB","GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    }
  };

  // Merge into global window.dbExt
  window.dbExt = dbExt;

  // Also patch into window.db for convenience
  if (window.db) {
    Object.assign(window.db, {
      // expose frequently accessed ones directly
      getClasses: dbExt.getClasses,
      getClass: dbExt.getClass,
      createClass: dbExt.createClass,
      getStudentsEnhanced: dbExt.getStudents,
      getResources: dbExt.getResources,
      getResourceCategories: dbExt.getResourceCategories
    });
  }
})();
