import { z } from "zod";
import { router, adminProcedure } from "./trpc";
import * as db from "../db";

export const adminRouter = router({
  // ─── Teacher Management ──────────────────────────────────────────────
  teachers: router({
    list: adminProcedure.query(() => db.getAllTeachers()),

    search: adminProcedure
      .input(z.object({ query: z.string() }))
      .query(({ input }) => db.searchTeachers(input.query)),

    getById: adminProcedure
      .input(z.number())
      .query(({ input }) => db.getUserById(input)),

    create: adminProcedure
      .input(z.object({
        firstName: z.string(),
        lastName: z.string(),
        gender: z.enum(["male", "female", "other"]).optional(),
        dateOfBirth: z.date().optional(),
        nationalId: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        address: z.string().optional(),
        qualification: z.string().optional(),
        dateEmployed: z.date().optional(),
        profilePicture: z.string().optional(),
        username: z.string().optional(),
        password: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const staffCode = await db.generateStaffCode();
        const name = `${input.firstName} ${input.lastName}`;
        const openId = `teacher_${staffCode}_${Date.now()}`;
        const userId = await db.createUser({
          openId,
          staffCode,
          name,
          firstName: input.firstName,
          lastName: input.lastName,
          gender: input.gender,
          dateOfBirth: input.dateOfBirth,
          nationalId: input.nationalId,
          phone: input.phone,
          email: input.email,
          address: input.address,
          qualification: input.qualification,
          dateEmployed: input.dateEmployed,
          profilePicture: input.profilePicture,
          username: input.username || staffCode.toLowerCase(),
          password: input.password,
          role: "teacher",
          status: "active",
          avatarUrl: input.profilePicture,
        });
        return { success: true, userId, staffCode };
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        data: z.object({
          firstName: z.string().optional(),
          lastName: z.string().optional(),
          gender: z.enum(["male", "female", "other"]).optional(),
          dateOfBirth: z.date().optional(),
          nationalId: z.string().optional(),
          phone: z.string().optional(),
          email: z.string().optional(),
          address: z.string().optional(),
          qualification: z.string().optional(),
          profilePicture: z.string().optional(),
          status: z.enum(["active", "inactive", "on_leave"]).optional(),
        }),
      }))
      .mutation(({ input }) => {
        const updateData: any = { ...input.data };
        if (input.data.firstName || input.data.lastName) {
          const existing = db.getUserById(input.id);
          updateData.name = `${input.data.firstName || (existing as any)?.firstName || ""} ${input.data.lastName || (existing as any)?.lastName || ""}`.trim();
        }
        return db.updateUser(input.id, updateData);
      }),

    updateStatus: adminProcedure
      .input(z.object({ id: z.number(), status: z.enum(["active", "inactive", "on_leave"]) }))
      .mutation(({ input }) => db.updateUserStatus(input.id, input.status)),

    delete: adminProcedure
      .input(z.number())
      .mutation(({ input }) => db.deleteUser(input)),
  }),

  // ─── Teacher Assignments ─────────────────────────────────────────────
  teacherAssignments: router({
    getByTeacher: adminProcedure
      .input(z.object({ teacherId: z.number(), academicYearId: z.number().optional() }))
      .query(({ input }) => db.getTeacherAssignments(input.teacherId, input.academicYearId)),

    assign: adminProcedure
      .input(z.object({
        teacherId: z.number(),
        subjectId: z.number(),
        classId: z.number(),
        academicYearId: z.number(),
      }))
      .mutation(({ input }) => db.assignTeacherSubject(input)),

    remove: adminProcedure
      .input(z.number())
      .mutation(({ input }) => db.removeTeacherSubject(input)),
  }),

  // ─── Class Teachers ──────────────────────────────────────────────────
  classTeachers: router({
    list: adminProcedure
      .input(z.object({ academicYearId: z.number().optional() }))
      .query(({ input }) => db.getClassTeachers(input.academicYearId)),

    assign: adminProcedure
      .input(z.object({
        teacherId: z.number(),
        classId: z.number(),
        academicYearId: z.number(),
      }))
      .mutation(({ input }) => db.assignClassTeacher(input)),

    remove: adminProcedure
      .input(z.number())
      .mutation(({ input }) => db.removeClassTeacher(input)),

    getByClass: adminProcedure
      .input(z.object({ classId: z.number(), academicYearId: z.number() }))
      .query(({ input }) => db.getClassTeacherForClass(input.classId, input.academicYearId)),
  }),

  // ─── Student Management ──────────────────────────────────────────────
  students: router({
    list: adminProcedure.query(() => db.getAllStudents()),

    search: adminProcedure
      .input(z.object({ query: z.string() }))
      .query(({ input }) => db.searchStudents(input.query)),

    getById: adminProcedure
      .input(z.number())
      .query(({ input }) => db.getUserById(input)),

    create: adminProcedure
      .input(z.object({
        firstName: z.string(),
        lastName: z.string(),
        gender: z.enum(["male", "female", "other"]).optional(),
        dateOfBirth: z.date().optional(),
        nationalId: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        address: z.string().optional(),
        classId: z.number(),
        academicYearId: z.number(),
        streamId: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const admissionNumber = await db.generateAdmissionNumber();
        const name = `${input.firstName} ${input.lastName}`;
        const openId = `student_${admissionNumber}_${Date.now()}`;
        const userId = await db.createUser({
          openId,
          admissionNumber,
          name,
          firstName: input.firstName,
          lastName: input.lastName,
          gender: input.gender,
          dateOfBirth: input.dateOfBirth,
          nationalId: input.nationalId,
          phone: input.phone,
          email: input.email,
          address: input.address,
          role: "student",
          status: "active",
        });
        if (userId) {
          await db.assignStudentToClass({
            studentId: userId as number,
            classId: input.classId,
            academicYearId: input.academicYearId,
            streamId: input.streamId,
          });
        }
        return { success: true, userId, admissionNumber };
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        data: z.object({
          firstName: z.string().optional(),
          lastName: z.string().optional(),
          gender: z.enum(["male", "female", "other"]).optional(),
          dateOfBirth: z.date().optional(),
          nationalId: z.string().optional(),
          phone: z.string().optional(),
          email: z.string().optional(),
          address: z.string().optional(),
        }),
      }))
      .mutation(({ input }) => db.updateUser(input.id, input.data)),

    transfer: adminProcedure
      .input(z.object({
        studentId: z.number(),
        fromClassId: z.number(),
        toClassId: z.number(),
        academicYearId: z.number(),
      }))
      .mutation(({ input }) => db.transferStudent(input.studentId, input.fromClassId, input.toClassId, input.academicYearId)),

    promote: adminProcedure
      .input(z.object({
        studentIds: z.array(z.number()),
        toClassId: z.number(),
        academicYearId: z.number(),
      }))
      .mutation(({ input }) => db.promoteStudents(input.studentIds, input.toClassId, input.academicYearId)),

    delete: adminProcedure
      .input(z.number())
      .mutation(({ input }) => db.deleteUser(input)),

    getByClass: adminProcedure
      .input(z.object({ classId: z.number(), academicYearId: z.number().optional() }))
      .query(({ input }) => db.getStudentsByClass(input.classId, input.academicYearId)),
  }),

  // ─── Academic Years ──────────────────────────────────────────────────
  academicYears: router({
    list: adminProcedure.query(() => db.getAcademicYears()),

    active: adminProcedure.query(() => db.getActiveAcademicYear()),

    create: adminProcedure
      .input(z.object({
        name: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        isActive: z.boolean().optional(),
      }))
      .mutation(({ input }) => db.createAcademicYear({ ...input, isActive: input.isActive ? 1 : 0 })),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        data: z.object({
          name: z.string().optional(),
          startDate: z.date().optional(),
          endDate: z.date().optional(),
          isActive: z.number().optional(),
        }),
      }))
      .mutation(({ input }) => db.updateAcademicYear(input.id, input.data)),
  }),

  // ─── Terms ───────────────────────────────────────────────────────────
  terms: router({
    list: adminProcedure
      .input(z.object({ academicYearId: z.number() }))
      .query(({ input }) => db.getTermsByYear(input.academicYearId)),

    active: adminProcedure.query(() => db.getActiveTerm()),

    create: adminProcedure
      .input(z.object({
        academicYearId: z.number(),
        name: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        isActive: z.boolean().optional(),
      }))
      .mutation(({ input }) => db.createTerm({ ...input, isActive: input.isActive ? 1 : 0 })),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        data: z.object({
          name: z.string().optional(),
          startDate: z.date().optional(),
          endDate: z.date().optional(),
          isActive: z.number().optional(),
        }),
      }))
      .mutation(({ input }) => db.updateTerm(input.id, input.data)),
  }),

  // ─── Classes ─────────────────────────────────────────────────────────
  classes: router({
    list: adminProcedure.query(() => db.getClasses()),

    create: adminProcedure
      .input(z.object({
        name: z.string(),
        level: z.string(),
        section: z.string().optional(),
        capacity: z.number().optional(),
      }))
      .mutation(({ input }) => db.createClass(input)),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        data: z.object({
          name: z.string().optional(),
          level: z.string().optional(),
          section: z.string().optional(),
          capacity: z.number().optional(),
        }),
      }))
      .mutation(({ input }) => db.updateClass(input.id, input.data)),

    delete: adminProcedure
      .input(z.number())
      .mutation(({ input }) => db.deleteClass(input)),

    streams: adminProcedure
      .input(z.number())
      .query(({ input }) => db.getStreamsByClass(input)),

    createStream: adminProcedure
      .input(z.object({ classId: z.number(), name: z.string() }))
      .mutation(({ input }) => db.createStream(input)),
  }),

  // ─── Subjects ────────────────────────────────────────────────────────
  subjects: router({
    list: adminProcedure.query(() => db.getSubjects()),

    getById: adminProcedure
      .input(z.number())
      .query(({ input }) => db.getSubjectById(input)),

    create: adminProcedure
      .input(z.object({
        name: z.string(),
        code: z.string(),
        description: z.string().optional(),
        level: z.string().optional(),
      }))
      .mutation(({ input }) => db.createSubject(input)),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        data: z.object({
          name: z.string().optional(),
          code: z.string().optional(),
          description: z.string().optional(),
          level: z.string().optional(),
        }),
      }))
      .mutation(({ input }) => db.updateSubject(input.id, input.data)),

    delete: adminProcedure
      .input(z.number())
      .mutation(({ input }) => db.deleteSubject(input)),

    getByClass: adminProcedure
      .input(z.number())
      .query(({ input }) => db.getSubjectsByClass(input)),

    assignToClass: adminProcedure
      .input(z.object({ classId: z.number(), subjectId: z.number() }))
      .mutation(({ input }) => db.assignSubjectToClass(input.classId, input.subjectId)),

    removeFromClass: adminProcedure
      .input(z.object({ classId: z.number(), subjectId: z.number() }))
      .mutation(({ input }) => db.removeSubjectFromClass(input.classId, input.subjectId)),
  }),

  // ─── Exams ───────────────────────────────────────────────────────────
  exams: router({
    list: adminProcedure
      .input(z.object({ termId: z.number().optional() }))
      .query(({ input }) => db.getExams(input.termId)),

    getById: adminProcedure
      .input(z.number())
      .query(({ input }) => db.getExamById(input)),

    create: adminProcedure
      .input(z.object({
        name: z.string(),
        termId: z.number(),
        type: z.string(),
        totalMarks: z.number().optional(),
        passingMarks: z.number().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      }))
      .mutation(({ input }) => db.createExam(input)),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        data: z.object({
          name: z.string().optional(),
          type: z.string().optional(),
          totalMarks: z.number().optional(),
          passingMarks: z.number().optional(),
          isActive: z.number().optional(),
        }),
      }))
      .mutation(({ input }) => db.updateExam(input.id, input.data)),
  }),

  // ─── Marks Management ────────────────────────────────────────────────
  marks: router({
    getByExam: adminProcedure
      .input(z.object({ examId: z.number(), classId: z.number().optional(), subjectId: z.number().optional() }))
      .query(({ input }) => db.getMarksByExam(input.examId, input.classId, input.subjectId)),

    updateStatus: adminProcedure
      .input(z.object({ id: z.number(), status: z.enum(["draft", "submitted", "approved", "locked"]) }))
      .mutation(({ input }) => db.updateMarkStatus(input.id, input.status)),

    bulkUpdateStatus: adminProcedure
      .input(z.object({ ids: z.array(z.number()), status: z.enum(["draft", "submitted", "approved", "locked"]) }))
      .mutation(({ input }) => db.bulkUpdateMarkStatus(input.ids, input.status)),
  }),

  // ─── Grading System ──────────────────────────────────────────────────
  grading: router({
    list: adminProcedure.query(() => db.getGradingSystem()),

    create: adminProcedure
      .input(z.object({
        grade: z.string(),
        minMarks: z.number(),
        maxMarks: z.number(),
        points: z.number(),
        description: z.string().optional(),
      }))
      .mutation(({ input }) => db.createGrade(input)),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        data: z.object({
          grade: z.string().optional(),
          minMarks: z.number().optional(),
          maxMarks: z.number().optional(),
          points: z.number().optional(),
          description: z.string().optional(),
        }),
      }))
      .mutation(({ input }) => db.updateGrade(input.id, input.data)),

    delete: adminProcedure
      .input(z.number())
      .mutation(({ input }) => db.deleteGrade(input)),
  }),

  // ─── Reports ─────────────────────────────────────────────────────────
  reports: router({
    getByExam: adminProcedure
      .input(z.object({ examId: z.number(), classId: z.number().optional() }))
      .query(({ input }) => db.getReportsByExam(input.examId, input.classId)),

    generate: adminProcedure
      .input(z.object({
        studentId: z.number(),
        examId: z.number(),
        classId: z.number(),
      }))
      .mutation(({ input, ctx }) => db.generateStudentReport(input.studentId, input.examId, input.classId, ctx.user.id)),
  }),

  // ─── Announcements ───────────────────────────────────────────────────
  announcements: router({
    list: adminProcedure.query(() => db.getActiveAnnouncements()),

    create: adminProcedure
      .input(z.object({
        title: z.string(),
        content: z.string(),
        category: z.string().optional(),
        targetRole: z.enum(["all", "student", "teacher", "admin"]).optional(),
        targetClassId: z.number().optional(),
      }))
      .mutation(({ input, ctx }) => db.createAnnouncement({ ...input, createdBy: ctx.user.id })),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        data: z.object({
          title: z.string().optional(),
          content: z.string().optional(),
          category: z.string().optional(),
          isActive: z.number().optional(),
        }),
      }))
      .mutation(({ input }) => db.updateAnnouncement(input.id, input.data)),

    delete: adminProcedure
      .input(z.number())
      .mutation(({ input }) => db.deleteAnnouncement(input)),
  }),

  // ─── Timetable ───────────────────────────────────────────────────────
  timetable: router({
    getByClass: adminProcedure
      .input(z.number())
      .query(({ input }) => db.getTimetableByClass(input)),

    create: adminProcedure
      .input(z.object({
        classId: z.number(),
        subjectId: z.number(),
        teacherId: z.number(),
        dayOfWeek: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        room: z.string().optional(),
      }))
      .mutation(({ input }) => db.createTimetableEntry(input)),

    delete: adminProcedure
      .input(z.number())
      .mutation(({ input }) => db.deleteTimetableEntry(input)),
  }),

  // ─── Stats ───────────────────────────────────────────────────────────
  stats: adminProcedure.query(async () => {
    const [students, teachers, classes, subjectsList] = await Promise.all([
      db.getAllStudents(),
      db.getAllTeachers(),
      db.getClasses(),
      db.getSubjects(),
    ]);
    return {
      totalStudents: students.length,
      totalTeachers: teachers.length,
      totalClasses: classes.length,
      totalSubjects: subjectsList.length,
    };
  }),
});
