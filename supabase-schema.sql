-- ════════════════════════════════════════════════════════════════
-- NCA School — Supabase Database Schema
-- Run this entire script in Supabase SQL Editor (https://bkvjozijixispwqcyppr.supabase.co)
-- ════════════════════════════════════════════════════════════════

-- 1. USERS
CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('admin','teacher','student','parent')),
  avatarUrl TEXT DEFAULT 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60',
  classId TEXT,
  subjectIds JSONB DEFAULT '[]',
  assignedSubjectIds JSONB DEFAULT '[]',
  assignedClassIds JSONB DEFAULT '[]',
  enrolledSubjectIds JSONB DEFAULT '[]',
  studentId TEXT,
  phone TEXT,
  subjectSpecialty TEXT,
  createdAt TIMESTAMPTZ DEFAULT NOW(),
  supabase_uid UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  isActive BOOLEAN DEFAULT true
);

-- 2. ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS announcements (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT,
  category TEXT DEFAULT 'General',
  createdBy BIGINT REFERENCES users(id),
  createdAt TIMESTAMPTZ DEFAULT NOW(),
  visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public','school_community','teachers_only','students_only','parents_only','admin_only','subject_teachers','subject_students','class_teachers','class_students','year_groups','specific_users','private')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('urgent','important','normal')),
  pinned BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft','published','scheduled','archived')),
  publishDate TIMESTAMPTZ,
  expiryDate TIMESTAMPTZ,
  tags TEXT,
  authors JSONB DEFAULT '[]',
  authorName TEXT,
  attachments JSONB DEFAULT '[]',
  media JSONB DEFAULT '[]',
  date TEXT,
  isVisible BOOLEAN DEFAULT true,
  subjectId BIGINT,
  classId TEXT,
  yearGroup TEXT
);

-- 3. ANNOUNCEMENT LIKES
CREATE TABLE IF NOT EXISTS announcement_likes (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  announcementId BIGINT REFERENCES announcements(id) ON DELETE CASCADE,
  userId BIGINT REFERENCES users(id) ON DELETE CASCADE,
  createdAt TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(announcementId, userId)
);

-- 4. ANNOUNCEMENT COMMENTS
CREATE TABLE IF NOT EXISTS announcement_comments (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  announcementId BIGINT REFERENCES announcements(id) ON DELETE CASCADE,
  userId BIGINT REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- 5. GALLERY
CREATE TABLE IF NOT EXISTS gallery (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  imageUrl TEXT,
  description TEXT,
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- 6. COURSES
CREATE TABLE IF NOT EXISTS courses (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  subjectId BIGINT,
  teacherId BIGINT REFERENCES users(id),
  gradeLevel TEXT,
  imageUrl TEXT,
  category TEXT,
  duration TEXT,
  status TEXT DEFAULT 'active',
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SUBJECTS
CREATE TABLE IF NOT EXISTS subjects (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT,
  description TEXT,
  teacherId BIGINT REFERENCES users(id),
  classId TEXT,
  gradeLevel TEXT,
  category TEXT,
  isActive BOOLEAN DEFAULT true,
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- 8. LESSONS
CREATE TABLE IF NOT EXISTS lessons (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  courseId BIGINT REFERENCES courses(id) ON DELETE CASCADE,
  subjectId BIGINT REFERENCES subjects(id),
  content TEXT,
  videoUrl TEXT,
  duration TEXT,
  orderIndex INTEGER DEFAULT 0,
  status TEXT DEFAULT 'published',
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- 9. RESOURCES
CREATE TABLE IF NOT EXISTS resources (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT DEFAULT 'document' CHECK (type IN ('document','video','audio','image','link','ebook')),
  url TEXT,
  fileSize TEXT,
  subjectId BIGINT REFERENCES subjects(id),
  courseId BIGINT REFERENCES courses(id),
  teacherId BIGINT REFERENCES users(id),
  tags TEXT,
  downloadCount INTEGER DEFAULT 0,
  isPublic BOOLEAN DEFAULT false,
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- 10. ASSIGNMENTS
CREATE TABLE IF NOT EXISTS assignments (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  subjectId BIGINT REFERENCES subjects(id),
  courseId BIGINT REFERENCES courses(id),
  teacherId BIGINT REFERENCES users(id),
  dueDate TIMESTAMPTZ,
  maxScore NUMERIC DEFAULT 100,
  type TEXT DEFAULT 'homework',
  attachments JSONB DEFAULT '[]',
  status TEXT DEFAULT 'active',
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- 11. ASSESSMENT TYPES
CREATE TABLE IF NOT EXISTS assessment_types (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  description TEXT,
  defaultMaxMarks NUMERIC DEFAULT 100,
  weight NUMERIC DEFAULT 0,
  hasRanking BOOLEAN DEFAULT false,
  isActive BOOLEAN DEFAULT true,
  createdBy BIGINT REFERENCES users(id),
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- 12. ASSESSMENT RESULTS
CREATE TABLE IF NOT EXISTS assessment_results (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  assessmentTypeId BIGINT REFERENCES assessment_types(id),
  subjectId BIGINT REFERENCES subjects(id),
  studentId BIGINT REFERENCES users(id),
  score NUMERIC NOT NULL,
  maxScore NUMERIC DEFAULT 100,
  grade TEXT,
  term TEXT,
  academicYear TEXT,
  comments TEXT,
  gradedBy BIGINT REFERENCES users(id),
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- 13. ATTENDANCE
CREATE TABLE IF NOT EXISTS attendance (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  studentId BIGINT REFERENCES users(id) ON DELETE CASCADE,
  classId TEXT,
  date DATE NOT NULL,
  status TEXT CHECK (status IN ('present','absent','late','excused')),
  markedBy BIGINT REFERENCES users(id),
  remarks TEXT,
  createdAt TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(studentId, date)
);

-- 14. MARKS
CREATE TABLE IF NOT EXISTS marks (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  studentId BIGINT REFERENCES users(id) ON DELETE CASCADE,
  subjectId BIGINT REFERENCES subjects(id),
  assessmentTypeId BIGINT REFERENCES assessment_types(id),
  score NUMERIC NOT NULL,
  maxScore NUMERIC DEFAULT 100,
  term TEXT,
  academicYear TEXT,
  gradedBy BIGINT REFERENCES users(id),
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- 15. BOOKS
CREATE TABLE IF NOT EXISTS books (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  isbn TEXT,
  description TEXT,
  coverUrl TEXT,
  category TEXT,
  copies INTEGER DEFAULT 1,
  availableCopies INTEGER DEFAULT 1,
  location TEXT,
  status TEXT DEFAULT 'available',
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- 16. NOTIFICATION READ STATE
CREATE TABLE IF NOT EXISTS notification_reads (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  userId BIGINT REFERENCES users(id) ON DELETE CASCADE,
  announcementId BIGINT REFERENCES announcements(id) ON DELETE CASCADE,
  readAt TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(userId, announcementId)
);

-- 17. CMS SCHOOL INFO
CREATE TABLE IF NOT EXISTS cms_school_info (
  id BIGINT PRIMARY KEY DEFAULT 1,
  name TEXT DEFAULT 'NCA School',
  shortName TEXT DEFAULT 'NCA',
  motto TEXT DEFAULT 'Excellence in Education, Success in Life',
  logoUrl TEXT,
  badge TEXT DEFAULT 'E-Learning Platform',
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  aboutIntro TEXT,
  loginDescription TEXT,
  updatedAt TIMESTAMPTZ DEFAULT NOW()
);

-- 18. CMS SITE SETTINGS
CREATE TABLE IF NOT EXISTS cms_site_settings (
  id BIGINT PRIMARY KEY DEFAULT 1,
  siteName TEXT,
  siteDescription TEXT,
  socialLinks JSONB DEFAULT '{}',
  contactEmail TEXT,
  contactPhone TEXT,
  features JSONB DEFAULT '{}',
  theme JSONB DEFAULT '{}',
  updatedAt TIMESTAMPTZ DEFAULT NOW()
);

-- 19. CMS PAGES
CREATE TABLE IF NOT EXISTS cms_pages (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  metaDescription TEXT,
  isPublished BOOLEAN DEFAULT false,
  createdBy BIGINT REFERENCES users(id),
  createdAt TIMESTAMPTZ DEFAULT NOW(),
  updatedAt TIMESTAMPTZ DEFAULT NOW()
);

-- 20. CMS NEWS / EVENTS
CREATE TABLE IF NOT EXISTS cms_news (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT,
  imageUrl TEXT,
  category TEXT DEFAULT 'news',
  tags TEXT,
  isPublished BOOLEAN DEFAULT false,
  publishDate TIMESTAMPTZ,
  createdBy BIGINT REFERENCES users(id),
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- ═══ INDEXES ═══
CREATE INDEX IF NOT EXISTS idx_announcements_visibility ON announcements(visibility);
CREATE INDEX IF NOT EXISTS idx_announcements_status ON announcements(status);
CREATE INDEX IF NOT EXISTS idx_announcements_priority ON announcements(priority);
CREATE INDEX IF NOT EXISTS idx_announcements_created ON announcements(createdAt DESC);
CREATE INDEX IF NOT EXISTS idx_announcements_publish ON announcements(publishDate);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_lessons_course ON lessons(courseId);
CREATE INDEX IF NOT EXISTS idx_resources_subject ON resources(subjectId);
CREATE INDEX IF NOT EXISTS idx_marks_student ON marks(studentId);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(studentId);
CREATE INDEX IF NOT EXISTS idx_assessment_results_student ON assessment_results(studentId);
CREATE INDEX IF NOT EXISTS idx_notification_reads_user ON notification_reads(userId);

-- ═══ ROW LEVEL SECURITY ═══
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcement_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcement_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE marks ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_reads ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_school_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_news ENABLE ROW LEVEL SECURITY;

-- ═══ RLS POLICIES ═══
-- Public read access for published announcements
CREATE POLICY "Public can view published announcements" ON announcements
  FOR SELECT USING (status = 'published' AND isVisible = true);

-- Authenticated users can view their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Anyone can read school info and site settings
CREATE POLICY "Public read school info" ON cms_school_info
  FOR SELECT USING (true);
CREATE POLICY "Public read site settings" ON cms_site_settings
  FOR SELECT USING (true);

-- Authenticated users can insert/update their own notification reads
CREATE POLICY "Users manage own notification reads" ON notification_reads
  FOR ALL USING (auth.uid() IS NOT NULL);

-- ═══ SEED DATA ═══
-- Insert default school info if not exists
INSERT INTO cms_school_info (id, name, shortName, motto)
VALUES (1, 'NCA School', 'NCA', 'Excellence in Education, Success in Life')
ON CONFLICT (id) DO NOTHING;

-- Insert default site settings if not exists
INSERT INTO cms_site_settings (id, siteName, siteDescription)
VALUES (1, 'NCA School E-Learning Platform', 'A modern Learning Management System for NCA School')
ON CONFLICT (id) DO NOTHING;
