import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { adminRouter } from "./adminRouter";
import { teacherRouter } from "./teacherRouter";
import { studentRouter } from "./studentRouter";

export const appRouter = router({
  system: systemRouter,

  // ─── Auth ────────────────────────────────────────────────────────────
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Admin Portal ────────────────────────────────────────────────────
  admin: adminRouter,

  // ─── Teacher Portal ──────────────────────────────────────────────────
  teacher: teacherRouter,

  // ─── Student Portal ──────────────────────────────────────────────────
  student: studentRouter,

  // ─── Public Course Catalog ───────────────────────────────────────────
  courses: router({
    list: publicProcedure
      .input(z.object({
        subject: z.string().optional(),
        gradeLevel: z.string().optional(),
        search: z.string().optional(),
      }))
      .query(({ input }) => db.getCourses(input)),

    featured: publicProcedure.query(() => db.getFeaturedCourses()),

    byId: publicProcedure
      .input(z.number())
      .query(({ input }) => db.getCourseById(input)),

    enrolled: protectedProcedure.query(({ ctx }) => db.getEnrolledCourses(ctx.user.id)),

    enroll: protectedProcedure
      .input(z.number())
      .mutation(async ({ input: courseId, ctx }) => {
        const success = await db.enrollInCourse(ctx.user.id, courseId);
        if (!success) throw new Error("Failed to enroll in course");
        return { success: true };
      }),

    stats: publicProcedure.query(() => db.getPlatformStats()),
  }),

  // ─── Lessons ─────────────────────────────────────────────────────────
  lessons: router({
    byCourse: publicProcedure
      .input(z.number())
      .query(({ input }) => db.getLessonsByCourse(input)),

    byId: publicProcedure
      .input(z.number())
      .query(({ input }) => db.getLessonById(input)),

    progress: protectedProcedure
      .input(z.number())
      .query(({ input: lessonId, ctx }) => db.getLessonProgress(ctx.user.id, lessonId)),

    updateProgress: protectedProcedure
      .input(z.object({
        lessonId: z.number(),
        isCompleted: z.boolean(),
        watchedDuration: z.number(),
      }))
      .mutation(async ({ input, ctx }) => {
        const success = await db.updateLessonProgress(
          ctx.user.id, input.lessonId, input.isCompleted, input.watchedDuration
        );
        if (!success) throw new Error("Failed to update lesson progress");
        return { success: true };
      }),
  }),

  // ─── Public Announcements ────────────────────────────────────────────
  announcements: router({
    list: publicProcedure.query(() => db.getActiveAnnouncements()),
  }),

  // ─── Public Stats ────────────────────────────────────────────────────
  stats: router({
    platform: publicProcedure.query(() => db.getPlatformStats()),
  }),
});

export type AppRouter = typeof appRouter;
