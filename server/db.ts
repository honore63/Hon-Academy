import { and, eq, like, desc, asc, sql, count, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  users, courses, lessons, enrollments, lessonProgress, announcements,
  academicYears, terms, classes, streams, subjects, classSubjects,
  teacherSubjects, classTeachers, studentClasses, exams, marks,
  gradingSystem, attendance, timetable, reports,
  type InsertUser, type User
} from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ═══════════════════════════════════════════════════════════════════════════════
// USER MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required");
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};

  const fields = ["name", "email", "loginMethod", "firstName", "lastName", "phone", "gender", "address", "bio", "avatarUrl", "subjectSpecialty", "staffCode", "admissionNumber", "qualification", "status"] as const;
  for (const f of fields) {
    if (user[f] !== undefined) {
      (values as any)[f] = user[f];
      updateSet[f] = user[f];
    }
  }
  if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
  if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0];
}

export async function getUsersByRole(role: string) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(users).where(eq(users.role, role as any));
}

export async function getAllTeachers() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(users).where(eq(users.role, "teacher"));
}

export async function getAllStudents() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(users).where(eq(users.role, "student"));
}

export async function searchTeachers(query: string) {
  const db = await getDb();
  if (!db) return [];
  const pattern = `%${query}%`;
  return await db.select().from(users).where(
    and(eq(users.role, "teacher"), sql`(${users.staffCode} LIKE ${pattern} OR ${users.firstName} LIKE ${pattern} OR ${users.lastName} LIKE ${pattern} OR ${users.email} LIKE ${pattern} OR ${users.phone} LIKE ${pattern})`)
  );
}

export async function searchStudents(query: string) {
  const db = await getDb();
  if (!db) return [];
  const pattern = `%${query}%`;
  return await db.select().from(users).where(
    and(eq(users.role, "student"), sql`(${users.admissionNumber} LIKE ${pattern} OR ${users.firstName} LIKE ${pattern} OR ${users.lastName} LIKE ${pattern} OR ${users.email} LIKE ${pattern})`)
  );
}

export async function createUser(userData: InsertUser) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(users).values(userData);
  return result[0]?.insertId;
}

export async function updateUser(id: number, data: Partial<InsertUser>) {
  const db = await getDb();
  if (!db) return false;
  await db.update(users).set(data).where(eq(users.id, id));
  return true;
}

export async function deleteUser(id: number) {
  const db = await getDb();
  if (!db) return false;
  await db.delete(users).where(eq(users.id, id));
  return true;
}

export async function updateUserStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) return false;
  await db.update(users).set({ status: status as any }).where(eq(users.id, id));
  return true;
}

export async function generateStaffCode(): Promise<string> {
  const db = await getDb();
  if (!db) return "T001";
  const result = await db.select({ count: count() }).from(users).where(eq(users.role, "teacher"));
  const num = (result[0]?.count || 0) + 1;
  return `T${String(num).padStart(3, "0")}`;
}

export async function generateAdmissionNumber(): Promise<string> {
  const db = await getDb();
  if (!db) return "STU001";
  const result = await db.select({ count: count() }).from(users).where(eq(users.role, "student"));
  const num = (result[0]?.count || 0) + 1;
  return `STU${String(num).padStart(3, "0")}`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ACADEMIC YEARS & TERMS
// ═══════════════════════════════════════════════════════════════════════════════

export async function getAcademicYears() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(academicYears).orderBy(desc(academicYears.startDate));
}

export async function getActiveAcademicYear() {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(academicYears).where(eq(academicYears.isActive, 1)).limit(1);
  return result[0];
}

export async function createAcademicYear(data: { name: string; startDate: Date; endDate: Date; isActive?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (data.isActive) {
    await db.update(academicYears).set({ isActive: 0 });
  }
  const result = await db.insert(academicYears).values(data);
  return result[0]?.insertId;
}

export async function updateAcademicYear(id: number, data: Partial<{ name: string; startDate: Date; endDate: Date; isActive: number }>) {
  const db = await getDb();
  if (!db) return false;
  if (data.isActive === 1) {
    await db.update(academicYears).set({ isActive: 0 });
  }
  await db.update(academicYears).set(data).where(eq(academicYears.id, id));
  return true;
}

export async function getTermsByYear(yearId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(terms).where(eq(terms.academicYearId, yearId));
}

export async function getActiveTerm() {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(terms).where(eq(terms.isActive, 1)).limit(1);
  return result[0];
}

export async function createTerm(data: { academicYearId: number; name: string; startDate: Date; endDate: Date; isActive?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (data.isActive) {
    await db.update(terms).set({ isActive: 0 }).where(eq(terms.academicYearId, data.academicYearId));
  }
  const result = await db.insert(terms).values(data);
  return result[0]?.insertId;
}

export async function updateTerm(id: number, data: Partial<{ name: string; startDate: Date; endDate: Date; isActive: number }>) {
  const db = await getDb();
  if (!db) return false;
  await db.update(terms).set(data).where(eq(terms.id, id));
  return true;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CLASSES & STREAMS
// ═══════════════════════════════════════════════════════════════════════════════

export async function getClasses() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(classes).orderBy(asc(classes.name));
}

export async function createClass(data: { name: string; level: string; section?: string; capacity?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(classes).values(data);
  return result[0]?.insertId;
}

export async function updateClass(id: number, data: Partial<{ name: string; level: string; section: string; capacity: number }>) {
  const db = await getDb();
  if (!db) return false;
  await db.update(classes).set(data).where(eq(classes.id, id));
  return true;
}

export async function deleteClass(id: number) {
  const db = await getDb();
  if (!db) return false;
  await db.delete(classes).where(eq(classes.id, id));
  return true;
}

export async function getStreamsByClass(classId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(streams).where(eq(streams.classId, classId));
}

export async function createStream(data: { classId: number; name: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(streams).values(data);
  return result[0]?.insertId;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUBJECTS
// ═══════════════════════════════════════════════════════════════════════════════

export async function getSubjects() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(subjects).orderBy(asc(subjects.name));
}

export async function getSubjectById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(subjects).where(eq(subjects.id, id)).limit(1);
  return result[0];
}

export async function createSubject(data: { name: string; code: string; description?: string; level?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(subjects).values(data);
  return result[0]?.insertId;
}

export async function updateSubject(id: number, data: Partial<{ name: string; code: string; description: string; level: string }>) {
  const db = await getDb();
  if (!db) return false;
  await db.update(subjects).set(data).where(eq(subjects.id, id));
  return true;
}

export async function deleteSubject(id: number) {
  const db = await getDb();
  if (!db) return false;
  await db.delete(subjects).where(eq(subjects.id, id));
  return true;
}

export async function getSubjectsByClass(classId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select({ subject: subjects }).from(classSubjects).where(eq(classSubjects.classId, classId)).innerJoin(subjects, eq(classSubjects.subjectId, subjects.id));
}

export async function assignSubjectToClass(classId: number, subjectId: number) {
  const db = await getDb();
  if (!db) return false;
  await db.insert(classSubjects).values({ classId, subjectId });
  return true;
}

export async function removeSubjectFromClass(classId: number, subjectId: number) {
  const db = await getDb();
  if (!db) return false;
  await db.delete(classSubjects).where(and(eq(classSubjects.classId, classId), eq(classSubjects.subjectId, subjectId)));
  return true;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEACHER ASSIGNMENTS
// ═══════════════════════════════════════════════════════════════════════════════

export async function getTeacherAssignments(teacherId: number, academicYearId?: number) {
  const db = await getDb();
  if (!db) return [];
  let conditions = [eq(teacherSubjects.teacherId, teacherId)];
  if (academicYearId) conditions.push(eq(teacherSubjects.academicYearId, academicYearId));
  return await db.select({
    teacherSubject: teacherSubjects,
    subject: subjects,
    class: classes,
  }).from(teacherSubjects)
    .innerJoin(subjects, eq(teacherSubjects.subjectId, subjects.id))
    .innerJoin(classes, eq(teacherSubjects.classId, classes.id))
    .where(and(...conditions));
}

export async function assignTeacherSubject(data: { teacherId: number; subjectId: number; classId: number; academicYearId: number }) {
  const db = await getDb();
  if (!db) return false;
  await db.insert(teacherSubjects).values(data);
  return true;
}

export async function removeTeacherSubject(id: number) {
  const db = await getDb();
  if (!db) return false;
  await db.delete(teacherSubjects).where(eq(teacherSubjects.id, id));
  return true;
}

export async function getClassTeachers(academicYearId?: number) {
  const db = await getDb();
  if (!db) return [];
  let conditions = academicYearId ? [eq(classTeachers.academicYearId, academicYearId)] : [];
  return await db.select({
    classTeacher: classTeachers,
    teacher: users,
    class: classes,
  }).from(classTeachers)
    .innerJoin(users, eq(classTeachers.teacherId, users.id))
    .innerJoin(classes, eq(classTeachers.classId, classes.id))
    .where(conditions.length ? and(...conditions) : sql`1=1`);
}

export async function assignClassTeacher(data: { teacherId: number; classId: number; academicYearId: number }) {
  const db = await getDb();
  if (!db) return false;
  await db.delete(classTeachers).where(and(eq(classTeachers.classId, data.classId), eq(classTeachers.academicYearId, data.academicYearId)));
  await db.insert(classTeachers).values(data);
  return true;
}

export async function removeClassTeacher(id: number) {
  const db = await getDb();
  if (!db) return false;
  await db.delete(classTeachers).where(eq(classTeachers.id, id));
  return true;
}

export async function getClassTeacherForClass(classId: number, academicYearId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select({ classTeacher: classTeachers, teacher: users })
    .from(classTeachers)
    .innerJoin(users, eq(classTeachers.teacherId, users.id))
    .where(and(eq(classTeachers.classId, classId), eq(classTeachers.academicYearId, academicYearId)))
    .limit(1);
  return result[0];
}

export async function isClassTeacher(teacherId: number, classId: number, academicYearId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  const result = await db.select({ count: count() }).from(classTeachers)
    .where(and(eq(classTeachers.teacherId, teacherId), eq(classTeachers.classId, classId), eq(classTeachers.academicYearId, academicYearId)));
  return (result[0]?.count || 0) > 0;
}

// ═══════════════════════════════════════════════════════════════════════════════
// STUDENT CLASS ASSIGNMENTS
// ═══════════════════════════════════════════════════════════════════════════════

export async function getStudentsByClass(classId: number, academicYearId?: number) {
  const db = await getDb();
  if (!db) return [];
  let conditions = [eq(studentClasses.classId, classId)];
  if (academicYearId) conditions.push(eq(studentClasses.academicYearId, academicYearId));
  return await db.select({ student: users, studentClass: studentClasses })
    .from(studentClasses)
    .innerJoin(users, eq(studentClasses.studentId, users.id))
    .where(and(...conditions));
}

export async function assignStudentToClass(data: { studentId: number; classId: number; academicYearId: number; streamId?: number }) {
  const db = await getDb();
  if (!db) return false;
  await db.insert(studentClasses).values(data);
  return true;
}

export async function transferStudent(studentId: number, fromClassId: number, toClassId: number, academicYearId: number) {
  const db = await getDb();
  if (!db) return false;
  await db.delete(studentClasses).where(and(eq(studentClasses.studentId, studentId), eq(studentClasses.classId, fromClassId), eq(studentClasses.academicYearId, academicYearId)));
  await db.insert(studentClasses).values({ studentId, classId: toClassId, academicYearId });
  return true;
}

export async function promoteStudents(studentIds: number[], toClassId: number, academicYearId: number) {
  const db = await getDb();
  if (!db) return false;
  for (const studentId of studentIds) {
    await db.insert(studentClasses).values({ studentId, classId: toClassId, academicYearId });
  }
  return true;
}

export async function getStudentClass(studentId: number, academicYearId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select({ studentClass: studentClasses, class: classes })
    .from(studentClasses)
    .innerJoin(classes, eq(studentClasses.classId, classes.id))
    .where(and(eq(studentClasses.studentId, studentId), eq(studentClasses.academicYearId, academicYearId)))
    .limit(1);
  return result[0];
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXAMS
// ═══════════════════════════════════════════════════════════════════════════════

export async function getExams(termId?: number) {
  const db = await getDb();
  if (!db) return [];
  let conditions = termId ? [eq(exams.termId, termId)] : [];
  return await db.select().from(exams).where(conditions.length ? and(...conditions) : sql`1=1`).orderBy(desc(exams.createdAt));
}

export async function getExamById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(exams).where(eq(exams.id, id)).limit(1);
  return result[0];
}

export async function createExam(data: { name: string; termId: number; type: string; totalMarks?: number; passingMarks?: number; startDate?: Date; endDate?: Date }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(exams).values(data);
  return result[0]?.insertId;
}

export async function updateExam(id: number, data: Partial<{ name: string; type: string; totalMarks: number; passingMarks: number; isActive: number }>) {
  const db = await getDb();
  if (!db) return false;
  await db.update(exams).set(data).where(eq(exams.id, id));
  return true;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MARKS
// ═══════════════════════════════════════════════════════════════════════════════

export async function getMarksByExam(examId: number, classId?: number, subjectId?: number) {
  const db = await getDb();
  if (!db) return [];
  let conditions = [eq(marks.examId, examId)];
  if (classId) conditions.push(eq(marks.classId, classId));
  if (subjectId) conditions.push(eq(marks.subjectId, subjectId));
  return await db.select({
    mark: marks,
    student: users,
    subject: subjects,
  }).from(marks)
    .innerJoin(users, eq(marks.studentId, users.id))
    .innerJoin(subjects, eq(marks.subjectId, subjects.id))
    .where(and(...conditions));
}

export async function getMarksByStudent(studentId: number, termId?: number) {
  const db = await getDb();
  if (!db) return [];
  let conditions = [eq(marks.studentId, studentId)];
  if (termId) {
    const termExams = await db.select().from(exams).where(eq(exams.termId, termId));
    const examIds = termExams.map(e => e.id);
    if (examIds.length) conditions.push(sql`${marks.examId} IN (${sql.join(examIds.map(id => sql`${id}`), sql`, `)})`);
  }
  return await db.select({
    mark: marks,
    subject: subjects,
    exam: exams,
  }).from(marks)
    .innerJoin(subjects, eq(marks.subjectId, subjects.id))
    .innerJoin(exams, eq(marks.examId, exams.id))
    .where(and(...conditions));
}

export async function enterMark(data: { studentId: number; examId: number; subjectId: number; classId: number; marksObtained: number; enteredBy: number }) {
  const db = await getDb();
  if (!db) return false;
  const existing = await db.select().from(marks).where(
    and(eq(marks.studentId, data.studentId), eq(marks.examId, data.examId), eq(marks.subjectId, data.subjectId))
  ).limit(1);

  if (existing.length) {
    await db.update(marks).set({ marksObtained: data.marksObtained, status: "draft", enteredBy: data.enteredBy }).where(eq(marks.id, existing[0].id));
  } else {
    await db.insert(marks).values(data);
  }
  return true;
}

export async function updateMarkStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) return false;
  await db.update(marks).set({ status: status as any }).where(eq(marks.id, id));
  return true;
}

export async function bulkUpdateMarkStatus(ids: number[], status: string) {
  const db = await getDb();
  if (!db) return false;
  for (const id of ids) {
    await db.update(marks).set({ status: status as any }).where(eq(marks.id, id));
  }
  return true;
}

// ═══════════════════════════════════════════════════════════════════════════════
// GRADING SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

export async function getGradingSystem() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(gradingSystem).orderBy(asc(gradingSystem.minMarks));
}

export async function createGrade(data: { grade: string; minMarks: number; maxMarks: number; points: number; description?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(gradingSystem).values(data);
  return result[0]?.insertId;
}

export async function updateGrade(id: number, data: Partial<{ grade: string; minMarks: number; maxMarks: number; points: number; description: string }>) {
  const db = await getDb();
  if (!db) return false;
  await db.update(gradingSystem).set(data).where(eq(gradingSystem.id, id));
  return true;
}

export async function deleteGrade(id: number) {
  const db = await getDb();
  if (!db) return false;
  await db.delete(gradingSystem).where(eq(gradingSystem.id, id));
  return true;
}

export async function calculateGrade(marksObtained: number): Promise<{ grade: string; points: number } | null> {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(gradingSystem).where(
    and(gte(gradingSystem.maxMarks, marksObtained), lte(gradingSystem.minMarks, marksObtained))
  ).limit(1);
  return result[0] ? { grade: result[0].grade, points: result[0].points } : null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ATTENDANCE
// ═══════════════════════════════════════════════════════════════════════════════

export async function getAttendanceByClass(classId: number, date: string) {
  const db = await getDb();
  if (!db) return [];
  return await db.select({
    attendance: attendance,
    student: users,
  }).from(attendance)
    .innerJoin(users, eq(attendance.studentId, users.id))
    .where(and(eq(attendance.classId, classId), sql`DATE(${attendance.date}) = ${date}`));
}

export async function getAttendanceByStudent(studentId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(attendance).where(eq(attendance.studentId, studentId)).orderBy(desc(attendance.date));
}

export async function recordAttendance(data: { studentId: number; classId: number; date: Date; status: string; recordedBy: number }) {
  const db = await getDb();
  if (!db) return false;
  const existing = await db.select().from(attendance).where(
    and(eq(attendance.studentId, data.studentId), eq(attendance.classId, data.classId), sql`DATE(${attendance.date}) = DATE(${data.date})`)
  ).limit(1);

  if (existing.length) {
    await db.update(attendance).set({ status: data.status as any }).where(eq(attendance.id, existing[0].id));
  } else {
    await db.insert(attendance).values(data);
  }
  return true;
}

export async function bulkRecordAttendance(records: { studentId: number; classId: number; date: Date; status: string; recordedBy: number }[]) {
  const db = await getDb();
  if (!db) return false;
  for (const record of records) {
    await recordAttendance(record);
  }
  return true;
}

export async function getAttendanceStats(studentId: number, classId: number) {
  const db = await getDb();
  if (!db) return { present: 0, absent: 0, late: 0, excused: 0, total: 0 };
  const result = await db.select({
    status: attendance.status,
    count: count(),
  }).from(attendance).where(and(eq(attendance.studentId, studentId), eq(attendance.classId, classId))).groupBy(attendance.status);

  const stats = { present: 0, absent: 0, late: 0, excused: 0, total: 0 };
  for (const r of result) {
    stats[r.status as keyof typeof stats] = r.count;
    stats.total += r.count;
  }
  return stats;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TIMETABLE
// ═══════════════════════════════════════════════════════════════════════════════

export async function getTimetableByClass(classId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select({
    timetable: timetable,
    subject: subjects,
    teacher: users,
  }).from(timetable)
    .innerJoin(subjects, eq(timetable.subjectId, subjects.id))
    .innerJoin(users, eq(timetable.teacherId, users.id))
    .where(eq(timetable.classId, classId));
}

export async function getTimetableByTeacher(teacherId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select({
    timetable: timetable,
    subject: subjects,
    class: classes,
  }).from(timetable)
    .innerJoin(subjects, eq(timetable.subjectId, subjects.id))
    .innerJoin(classes, eq(timetable.classId, classes.id))
    .where(eq(timetable.teacherId, teacherId));
}

export async function createTimetableEntry(data: { classId: number; subjectId: number; teacherId: number; dayOfWeek: string; startTime: string; endTime: string; room?: string }) {
  const db = await getDb();
  if (!db) return false;
  await db.insert(timetable).values(data);
  return true;
}

export async function deleteTimetableEntry(id: number) {
  const db = await getDb();
  if (!db) return false;
  await db.delete(timetable).where(eq(timetable.id, id));
  return true;
}

// ═══════════════════════════════════════════════════════════════════════════════
// REPORTS
// ═══════════════════════════════════════════════════════════════════════════════

export async function generateStudentReport(studentId: number, examId: number, classId: number, generatedBy: number) {
  const db = await getDb();
  if (!db) return null;

  const studentMarks = await db.select().from(marks).where(
    and(eq(marks.studentId, studentId), eq(marks.examId, examId), eq(marks.classId, classId))
  );

  if (!studentMarks.length) return null;

  const totalMarks = studentMarks.reduce((sum, m) => sum + Number(m.marksObtained), 0);
  const average = totalMarks / studentMarks.length;

  const existing = await db.select().from(reports).where(
    and(eq(reports.studentId, studentId), eq(reports.examId, examId))
  ).limit(1);

  const reportData = {
    studentId, examId, classId,
    totalMarks: totalMarks.toString(),
    average: average.toString(),
    generatedBy,
  };

  if (existing.length) {
    await db.update(reports).set(reportData).where(eq(reports.id, existing[0].id));
    return existing[0].id;
  } else {
    const result = await db.insert(reports).values(reportData);
    return result[0]?.insertId;
  }
}

export async function getReportsByExam(examId: number, classId?: number) {
  const db = await getDb();
  if (!db) return [];
  let conditions = [eq(reports.examId, examId)];
  if (classId) conditions.push(eq(reports.classId, classId));
  return await db.select({
    report: reports,
    student: users,
  }).from(reports)
    .innerJoin(users, eq(reports.studentId, users.id))
    .where(and(...conditions))
    .orderBy(asc(reports.rank));
}

export async function getReportsByStudent(studentId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select({
    report: reports,
    exam: exams,
  }).from(reports)
    .innerJoin(exams, eq(reports.examId, exams.id))
    .where(eq(reports.studentId, studentId))
    .orderBy(desc(reports.createdAt));
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANNOUNCEMENTS
// ═══════════════════════════════════════════════════════════════════════════════

export async function getActiveAnnouncements(targetRole?: string, targetClassId?: number) {
  const db = await getDb();
  if (!db) return [];
  let conditions = [eq(announcements.isActive, 1)];
  if (targetRole && targetRole !== "all") conditions.push(sql`(${announcements.targetRole} = 'all' OR ${announcements.targetRole} = ${targetRole})`);
  if (targetClassId) conditions.push(sql`(${announcements.targetClassId} IS NULL OR ${announcements.targetClassId} = ${targetClassId})`);
  return await db.select().from(announcements).where(and(...conditions)).orderBy(desc(announcements.createdAt));
}

export async function createAnnouncement(data: { title: string; content: string; category?: string; targetRole?: string; targetClassId?: number; createdBy: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(announcements).values(data);
  return result[0]?.insertId;
}

export async function updateAnnouncement(id: number, data: Partial<{ title: string; content: string; category: string; isActive: number }>) {
  const db = await getDb();
  if (!db) return false;
  await db.update(announcements).set(data).where(eq(announcements.id, id));
  return true;
}

export async function deleteAnnouncement(id: number) {
  const db = await getDb();
  if (!db) return false;
  await db.delete(announcements).where(eq(announcements.id, id));
  return true;
}

// ═══════════════════════════════════════════════════════════════════════════════
// COURSES (Legacy)
// ═══════════════════════════════════════════════════════════════════════════════

export async function getCourses(filters?: { subject?: string; gradeLevel?: string; search?: string }) {
  const db = await getDb();
  if (!db) return [];
  let conditions = [eq(courses.isPublished, 1)];
  if (filters?.subject) conditions.push(eq(courses.subject, filters.subject));
  if (filters?.gradeLevel) conditions.push(eq(courses.gradeLevel, filters.gradeLevel));
  if (filters?.search) conditions.push(like(courses.title, `%${filters.search}%`));
  const result = await db.select({ course: courses, instructor: users }).from(courses).leftJoin(users, eq(courses.instructorId, users.id)).where(and(...conditions));
  return result.map(r => ({ ...r.course, instructorName: r.instructor?.name || "Unknown" }));
}

export async function getCourseById(courseId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select({ course: courses, instructor: users }).from(courses).leftJoin(users, eq(courses.instructorId, users.id)).where(eq(courses.id, courseId)).limit(1);
  if (!result[0]) return undefined;
  return { ...result[0].course, instructorName: result[0].instructor?.name || "Unknown", instructorBio: result[0].instructor?.bio, instructorAvatar: result[0].instructor?.avatarUrl };
}

export async function getFeaturedCourses() {
  const db = await getDb();
  if (!db) return [];
  const result = await db.select({ course: courses, instructor: users }).from(courses).leftJoin(users, eq(courses.instructorId, users.id)).where(and(eq(courses.isPublished, 1), eq(courses.isFeatured, 1))).limit(6);
  return result.map(r => ({ ...r.course, instructorName: r.instructor?.name || "Unknown" }));
}

export async function getEnrolledCourses(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select({ course: courses, enrollment: enrollments }).from(enrollments).where(eq(enrollments.userId, userId)).innerJoin(courses, eq(enrollments.courseId, courses.id));
}

export async function enrollInCourse(userId: number, courseId: number) {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.insert(enrollments).values({ userId, courseId });
    return true;
  } catch { return false; }
}

export async function getLessonsByCourse(courseId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(lessons).where(eq(lessons.courseId, courseId)).orderBy(lessons.order);
}

export async function getLessonById(lessonId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(lessons).where(eq(lessons.id, lessonId)).limit(1);
  return result[0];
}

export async function getLessonProgress(userId: number, lessonId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(lessonProgress).where(and(eq(lessonProgress.userId, userId), eq(lessonProgress.lessonId, lessonId))).limit(1);
  return result[0];
}

export async function updateLessonProgress(userId: number, lessonId: number, isCompleted: boolean, watchedDuration: number) {
  const db = await getDb();
  if (!db) return false;
  const existing = await getLessonProgress(userId, lessonId);
  if (existing) {
    await db.update(lessonProgress).set({ isCompleted: isCompleted ? 1 : 0, watchedDuration, completedAt: isCompleted ? new Date() : null }).where(eq(lessonProgress.id, existing.id));
  } else {
    await db.insert(lessonProgress).values({ userId, lessonId, isCompleted: isCompleted ? 1 : 0, watchedDuration, completedAt: isCompleted ? new Date() : null });
  }
  return true;
}

export async function getPlatformStats() {
  const db = await getDb();
  if (!db) return { totalStudents: 0, totalCourses: 0, totalInstructors: 0 };
  const studentCount = await db.select({ count: count() }).from(users).where(eq(users.role, "student"));
  const courseCount = await db.select({ count: count() }).from(courses).where(eq(courses.isPublished, 1));
  const instructorCount = await db.select({ count: count() }).from(users).where(eq(users.role, "teacher"));
  return { totalStudents: studentCount[0]?.count || 0, totalCourses: courseCount[0]?.count || 0, totalInstructors: instructorCount[0]?.count || 0 };
}
