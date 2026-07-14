import { z } from "zod";
import { router, protectedProcedure } from "./trpc";
import * as db from "../db";

const requireStudent = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.user.role !== "student") {
    throw new Error("Access denied: Students only");
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});

export const studentRouter = router({
  // ─── Dashboard ───────────────────────────────────────────────────────
  dashboard: requireStudent.query(async ({ ctx }) => {
    const activeYear = await db.getActiveAcademicYear();
    if (!activeYear) return { profile: null, classInfo: null, subjects: [], recentMarks: [], announcements: [] };

    const profile = await db.getUserById(ctx.user.id);
    const classInfo = await db.getStudentClass(ctx.user.id, activeYear.id);
    const marks = await db.getMarksByStudent(ctx.user.id);
    const announcements = await db.getActiveAnnouncements("student", classInfo?.class?.id);

    return {
      profile,
      classInfo,
      recentMarks: marks.slice(0, 10),
      announcements: announcements.slice(0, 5),
    };
  }),

  // ─── Profile ─────────────────────────────────────────────────────────
  profile: requireStudent.query(({ ctx }) => db.getUserById(ctx.user.id)),

  updateProfile: requireStudent
    .input(z.object({
      phone: z.string().optional(),
      address: z.string().optional(),
      email: z.string().optional(),
    }))
    .mutation(({ input, ctx }) => db.updateUser(ctx.user.id, input)),

  // ─── My Class ────────────────────────────────────────────────────────
  myClass: requireStudent.query(async ({ ctx }) => {
    const activeYear = await db.getActiveAcademicYear();
    if (!activeYear) return null;
    return db.getStudentClass(ctx.user.id, activeYear.id);
  }),

  // ─── My Subjects ─────────────────────────────────────────────────────
  mySubjects: requireStudent.query(async ({ ctx }) => {
    const activeYear = await db.getActiveAcademicYear();
    if (!activeYear) return [];
    const classInfo = await db.getStudentClass(ctx.user.id, activeYear.id);
    if (!classInfo) return [];
    return db.getSubjectsByClass(classInfo.class.id);
  }),

  // ─── My Marks ────────────────────────────────────────────────────────
  myMarks: requireStudent
    .input(z.object({ termId: z.number().optional() }))
    .query(({ input, ctx }) => db.getMarksByStudent(ctx.user.id, input.termId)),

  // ─── My Attendance ───────────────────────────────────────────────────
  myAttendance: requireStudent.query(({ ctx }) => db.getAttendanceByStudent(ctx.user.id)),

  attendanceStats: requireStudent.query(async ({ ctx }) => {
    const activeYear = await db.getActiveAcademicYear();
    if (!activeYear) return { present: 0, absent: 0, late: 0, excused: 0, total: 0 };
    const classInfo = await db.getStudentClass(ctx.user.id, activeYear.id);
    if (!classInfo) return { present: 0, absent: 0, late: 0, excused: 0, total: 0 };
    return db.getAttendanceStats(ctx.user.id, classInfo.class.id);
  }),

  // ─── My Timetable ────────────────────────────────────────────────────
  myTimetable: requireStudent.query(async ({ ctx }) => {
    const activeYear = await db.getActiveAcademicYear();
    if (!activeYear) return [];
    const classInfo = await db.getStudentClass(ctx.user.id, activeYear.id);
    if (!classInfo) return [];
    return db.getTimetableByClass(classInfo.class.id);
  }),

  // ─── My Reports ──────────────────────────────────────────────────────
  myReports: requireStudent.query(({ ctx }) => db.getReportsByStudent(ctx.user.id)),

  // ─── Announcements ───────────────────────────────────────────────────
  announcements: requireStudent.query(async ({ ctx }) => {
    const activeYear = await db.getActiveAcademicYear();
    const classInfo = activeYear ? await db.getStudentClass(ctx.user.id, activeYear.id) : null;
    return db.getActiveAnnouncements("student", classInfo?.class?.id);
  }),
});
