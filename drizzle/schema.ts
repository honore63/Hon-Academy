import { decimal, int, mysqlEnum, mysqlTable, text, timestamp, varchar, json } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

// ─── USERS ───────────────────────────────────────────────────────────────────
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  username: varchar("username", { length: 100 }).unique(),
  password: varchar("password", { length: 255 }),
  firstName: varchar("firstName", { length: 100 }),
  lastName: varchar("lastName", { length: 100 }),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  gender: mysqlEnum("gender", ["male", "female", "other"]),
  dateOfBirth: timestamp("dateOfBirth"),
  nationalId: varchar("nationalId", { length: 30 }),
  address: text("address"),
  profilePicture: varchar("profilePicture", { length: 500 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "student", "teacher", "admin"]).default("user").notNull(),
  status: mysqlEnum("status", ["active", "inactive", "on_leave"]).default("active").notNull(),
  staffCode: varchar("staffCode", { length: 20 }).unique(),
  admissionNumber: varchar("admissionNumber", { length: 20 }).unique(),
  qualification: varchar("qualification", { length: 100 }),
  subjectSpecialty: varchar("subjectSpecialty", { length: 100 }),
  dateEmployed: timestamp("dateEmployed"),
  bio: text("bio"),
  avatarUrl: varchar("avatarUrl", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── ACADEMIC YEARS ──────────────────────────────────────────────────────────
export const academicYears = mysqlTable("academicYears", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  isActive: int("isActive").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AcademicYear = typeof academicYears.$inferSelect;

// ─── TERMS ───────────────────────────────────────────────────────────────────
export const terms = mysqlTable("terms", {
  id: int("id").autoincrement().primaryKey(),
  academicYearId: int("academicYearId").notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  isActive: int("isActive").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Term = typeof terms.$inferSelect;

// ─── CLASSES ─────────────────────────────────────────────────────────────────
export const classes = mysqlTable("classes", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  level: varchar("level", { length: 50 }).notNull(),
  section: varchar("section", { length: 10 }),
  capacity: int("capacity").default(40),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Class = typeof classes.$inferSelect;

// ─── STREAMS ─────────────────────────────────────────────────────────────────
export const streams = mysqlTable("streams", {
  id: int("id").autoincrement().primaryKey(),
  classId: int("classId").notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Stream = typeof streams.$inferSelect;

// ─── SUBJECTS ────────────────────────────────────────────────────────────────
export const subjects = mysqlTable("subjects", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  code: varchar("code", { length: 20 }).notNull().unique(),
  description: text("description"),
  level: varchar("level", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Subject = typeof subjects.$inferSelect;

// ─── CLASS SUBJECTS (which subjects are taught in which class) ───────────────
export const classSubjects = mysqlTable("classSubjects", {
  id: int("id").autoincrement().primaryKey(),
  classId: int("classId").notNull(),
  subjectId: int("subjectId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ClassSubject = typeof classSubjects.$inferSelect;

// ─── TEACHER SUBJECTS ────────────────────────────────────────────────────────
export const teacherSubjects = mysqlTable("teacherSubjects", {
  id: int("id").autoincrement().primaryKey(),
  teacherId: int("teacherId").notNull(),
  subjectId: int("subjectId").notNull(),
  classId: int("classId").notNull(),
  academicYearId: int("academicYearId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TeacherSubject = typeof teacherSubjects.$inferSelect;

// ─── CLASS TEACHERS ──────────────────────────────────────────────────────────
export const classTeachers = mysqlTable("classTeachers", {
  id: int("id").autoincrement().primaryKey(),
  teacherId: int("teacherId").notNull(),
  classId: int("classId").notNull(),
  academicYearId: int("academicYearId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ClassTeacher = typeof classTeachers.$inferSelect;

// ─── STUDENT CLASSES ─────────────────────────────────────────────────────────
export const studentClasses = mysqlTable("studentClasses", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("studentId").notNull(),
  classId: int("classId").notNull(),
  academicYearId: int("academicYearId").notNull(),
  streamId: int("streamId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type StudentClass = typeof studentClasses.$inferSelect;

// ─── EXAMS ───────────────────────────────────────────────────────────────────
export const exams = mysqlTable("exams", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  termId: int("termId").notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  totalMarks: int("totalMarks").default(100).notNull(),
  passingMarks: int("passingMarks").default(50).notNull(),
  startDate: timestamp("startDate"),
  endDate: timestamp("endDate"),
  isActive: int("isActive").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Exam = typeof exams.$inferSelect;

// ─── MARKS ───────────────────────────────────────────────────────────────────
export const marks = mysqlTable("marks", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("studentId").notNull(),
  examId: int("examId").notNull(),
  subjectId: int("subjectId").notNull(),
  classId: int("classId").notNull(),
  marksObtained: decimal("marksObtained", { precision: 5, scale: 2 }).notNull(),
  grade: varchar("grade", { length: 5 }),
  remarks: varchar("remarks", { length: 100 }),
  enteredBy: int("enteredBy").notNull(),
  status: mysqlEnum("status", ["draft", "submitted", "approved", "locked"]).default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Mark = typeof marks.$inferSelect;

// ─── GRADING SYSTEM ──────────────────────────────────────────────────────────
export const gradingSystem = mysqlTable("gradingSystem", {
  id: int("id").autoincrement().primaryKey(),
  grade: varchar("grade", { length: 5 }).notNull(),
  minMarks: decimal("minMarks", { precision: 5, scale: 2 }).notNull(),
  maxMarks: decimal("maxMarks", { precision: 5, scale: 2 }).notNull(),
  points: int("points").notNull(),
  description: varchar("description", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GradingSystem = typeof gradingSystem.$inferSelect;

// ─── ATTENDANCE ──────────────────────────────────────────────────────────────
export const attendance = mysqlTable("attendance", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("studentId").notNull(),
  classId: int("classId").notNull(),
  date: timestamp("date").notNull(),
  status: mysqlEnum("status", ["present", "absent", "late", "excused"]).notNull(),
  recordedBy: int("recordedBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Attendance = typeof attendance.$inferSelect;

// ─── TIMETABLE ───────────────────────────────────────────────────────────────
export const timetable = mysqlTable("timetable", {
  id: int("id").autoincrement().primaryKey(),
  classId: int("classId").notNull(),
  subjectId: int("subjectId").notNull(),
  teacherId: int("teacherId").notNull(),
  dayOfWeek: varchar("dayOfWeek", { length: 10 }).notNull(),
  startTime: varchar("startTime", { length: 5 }).notNull(),
  endTime: varchar("endTime", { length: 5 }).notNull(),
  room: varchar("room", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Timetable = typeof timetable.$inferSelect;

// ─── ANNOUNCEMENTS ───────────────────────────────────────────────────────────
export const announcements = mysqlTable("announcements", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 50 }).default("General"),
  targetRole: mysqlEnum("targetRole", ["all", "student", "teacher", "admin"]).default("all").notNull(),
  targetClassId: int("targetClassId"),
  createdBy: int("createdBy").notNull(),
  isActive: int("isActive").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Announcement = typeof announcements.$inferSelect;

// ─── COURSES (Legacy - keep for compatibility) ───────────────────────────────
export const courses = mysqlTable("courses", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  subject: varchar("subject", { length: 100 }).notNull(),
  gradeLevel: varchar("gradeLevel", { length: 50 }).notNull(),
  instructorId: int("instructorId").notNull(),
  duration: int("duration"),
  enrollmentCount: int("enrollmentCount").default(0).notNull(),
  isPublished: int("isPublished").default(0).notNull(),
  isFeatured: int("isFeatured").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;

// ─── LESSONS (Legacy) ────────────────────────────────────────────────────────
export const lessons = mysqlTable("lessons", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  content: text("content"),
  videoUrl: varchar("videoUrl", { length: 500 }),
  duration: int("duration"),
  order: int("order").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = typeof lessons.$inferInsert;

// ─── ENROLLMENTS (Legacy) ────────────────────────────────────────────────────
export const enrollments = mysqlTable("enrollments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  courseId: int("courseId").notNull(),
  enrolledAt: timestamp("enrolledAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  progress: decimal("progress", { precision: 5, scale: 2 }).default("0.00").notNull(),
});

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = typeof enrollments.$inferInsert;

// ─── LESSON PROGRESS (Legacy) ────────────────────────────────────────────────
export const lessonProgress = mysqlTable("lessonProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  lessonId: int("lessonId").notNull(),
  isCompleted: int("isCompleted").default(0).notNull(),
  watchedDuration: int("watchedDuration").default(0).notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LessonProgress = typeof lessonProgress.$inferSelect;
export type InsertLessonProgress = typeof lessonProgress.$inferInsert;

// ─── REPORTS ─────────────────────────────────────────────────────────────────
export const reports = mysqlTable("reports", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("studentId").notNull(),
  examId: int("examId").notNull(),
  classId: int("classId").notNull(),
  totalMarks: decimal("totalMarks", { precision: 7, scale: 2 }),
  average: decimal("average", { precision: 5, scale: 2 }),
  rank: int("rank"),
  overallGrade: varchar("overallGrade", { length: 5 }),
  comments: text("comments"),
  generatedBy: int("generatedBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Report = typeof reports.$inferSelect;

// ─── RELATIONS ───────────────────────────────────────────────────────────────
export const usersRelations = relations(users, ({ many }) => ({
  courses: many(courses),
  enrollments: many(enrollments),
  lessonProgress: many(lessonProgress),
  teacherSubjects: many(teacherSubjects),
  classTeachers: many(classTeachers),
  enteredMarks: many(marks),
  recordedAttendance: many(attendance),
  announcements: many(announcements),
}));

export const academicYearsRelations = relations(academicYears, ({ many }) => ({
  terms: many(terms),
  teacherSubjects: many(teacherSubjects),
  classTeachers: many(classTeachers),
  studentClasses: many(studentClasses),
}));

export const termsRelations = relations(terms, ({ one, many }) => ({
  academicYear: one(academicYears, {
    fields: [terms.academicYearId],
    references: [academicYears.id],
  }),
  exams: many(exams),
}));

export const classesRelations = relations(classes, ({ many }) => ({
  streams: many(streams),
  classSubjects: many(classSubjects),
  teacherSubjects: many(teacherSubjects),
  classTeachers: many(classTeachers),
  studentClasses: many(studentClasses),
  marks: many(marks),
  attendance: many(attendance),
  timetable: many(timetable),
}));

export const streamsRelations = relations(streams, ({ one }) => ({
  class: one(classes, {
    fields: [streams.classId],
    references: [classes.id],
  }),
}));

export const subjectsRelations = relations(subjects, ({ many }) => ({
  classSubjects: many(classSubjects),
  teacherSubjects: many(teacherSubjects),
  marks: many(marks),
  timetable: many(timetable),
}));

export const classSubjectsRelations = relations(classSubjects, ({ one }) => ({
  class: one(classes, {
    fields: [classSubjects.classId],
    references: [classes.id],
  }),
  subject: one(subjects, {
    fields: [classSubjects.subjectId],
    references: [subjects.id],
  }),
}));

export const teacherSubjectsRelations = relations(teacherSubjects, ({ one }) => ({
  teacher: one(users, {
    fields: [teacherSubjects.teacherId],
    references: [users.id],
  }),
  subject: one(subjects, {
    fields: [teacherSubjects.subjectId],
    references: [subjects.id],
  }),
  class: one(classes, {
    fields: [teacherSubjects.classId],
    references: [classes.id],
  }),
  academicYear: one(academicYears, {
    fields: [teacherSubjects.academicYearId],
    references: [academicYears.id],
  }),
}));

export const classTeachersRelations = relations(classTeachers, ({ one }) => ({
  teacher: one(users, {
    fields: [classTeachers.teacherId],
    references: [users.id],
  }),
  class: one(classes, {
    fields: [classTeachers.classId],
    references: [classes.id],
  }),
  academicYear: one(academicYears, {
    fields: [classTeachers.academicYearId],
    references: [academicYears.id],
  }),
}));

export const studentClassesRelations = relations(studentClasses, ({ one }) => ({
  student: one(users, {
    fields: [studentClasses.studentId],
    references: [users.id],
  }),
  class: one(classes, {
    fields: [studentClasses.classId],
    references: [classes.id],
  }),
  stream: one(streams, {
    fields: [studentClasses.streamId],
    references: [streams.id],
  }),
  academicYear: one(academicYears, {
    fields: [studentClasses.academicYearId],
    references: [academicYears.id],
  }),
}));

export const examsRelations = relations(exams, ({ one, many }) => ({
  term: one(terms, {
    fields: [exams.termId],
    references: [terms.id],
  }),
  marks: many(marks),
  reports: many(reports),
}));

export const marksRelations = relations(marks, ({ one }) => ({
  student: one(users, {
    fields: [marks.studentId],
    references: [users.id],
  }),
  exam: one(exams, {
    fields: [marks.examId],
    references: [exams.id],
  }),
  subject: one(subjects, {
    fields: [marks.subjectId],
    references: [subjects.id],
  }),
  class: one(classes, {
    fields: [marks.classId],
    references: [classes.id],
  }),
  enteredByUser: one(users, {
    fields: [marks.enteredBy],
    references: [users.id],
  }),
}));

export const attendanceRelations = relations(attendance, ({ one }) => ({
  student: one(users, {
    fields: [attendance.studentId],
    references: [users.id],
  }),
  class: one(classes, {
    fields: [attendance.classId],
    references: [classes.id],
  }),
  recordedByUser: one(users, {
    fields: [attendance.recordedBy],
    references: [users.id],
  }),
}));

export const timetableRelations = relations(timetable, ({ one }) => ({
  class: one(classes, {
    fields: [timetable.classId],
    references: [classes.id],
  }),
  subject: one(subjects, {
    fields: [timetable.subjectId],
    references: [subjects.id],
  }),
  teacher: one(users, {
    fields: [timetable.teacherId],
    references: [users.id],
  }),
}));

export const announcementsRelations = relations(announcements, ({ one }) => ({
  creator: one(users, {
    fields: [announcements.createdBy],
    references: [users.id],
  }),
}));

export const reportsRelations = relations(reports, ({ one }) => ({
  student: one(users, {
    fields: [reports.studentId],
    references: [users.id],
  }),
  exam: one(exams, {
    fields: [reports.examId],
    references: [exams.id],
  }),
  class: one(classes, {
    fields: [reports.classId],
    references: [classes.id],
  }),
  generatedByUser: one(users, {
    fields: [reports.generatedBy],
    references: [users.id],
  }),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  instructor: one(users, {
    fields: [courses.instructorId],
    references: [users.id],
  }),
  lessons: many(lessons),
  enrollments: many(enrollments),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  course: one(courses, {
    fields: [lessons.courseId],
    references: [courses.id],
  }),
  progress: many(lessonProgress),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(users, {
    fields: [enrollments.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [enrollments.courseId],
    references: [courses.id],
  }),
}));

export const lessonProgressRelations = relations(lessonProgress, ({ one }) => ({
  user: one(users, {
    fields: [lessonProgress.userId],
    references: [users.id],
  }),
  lesson: one(lessons, {
    fields: [lessonProgress.lessonId],
    references: [lessons.id],
  }),
}));
