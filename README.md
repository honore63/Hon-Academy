# HonE-Learning Platform

A modern Learning Management System (LMS) built for schools and institutions in Rwanda. This platform provides curriculum-aligned digital learning resources, grade tracking, and educational content management.

## Features

### For Students
- Browse and enroll in courses organized by subjects and grade levels
- Access video lessons and track learning progress
- View marks and academic performance
- Access digital library of books and resources
- Receive announcements and updates

### For Teachers
- Manage courses and lessons
- Track student enrollments and progress
- View course analytics
- Create and publish educational content

### For Administrators
- Manage users (students, teachers, admins)
- Approve and feature courses
- Create and manage announcements
- View platform statistics
- System settings and moderation tools

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML5, Bootstrap 5, Font Awesome, Custom JavaScript |
| Backend | Node.js, Express, tRPC |
| Database | MySQL with Drizzle ORM |
| Auth | OAuth (via Manus SDK), JWT (jose) |
| Build | Vite, esbuild, pnpm |
| Styling | Tailwind CSS, Custom CSS |

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **pnpm** (v10.4.1+)
- **MySQL** database server

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd "E learning Project"
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL=mysql://username:password@localhost:3306/school_elearning
```

### 4. Set up the database

Push the schema to your database:

```bash
pnpm db:push
```

### 5. Start the development server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000` (default Vite port).

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build production bundle to `dist/` |
| `pnpm start` | Start production server |
| `pnpm check` | Run TypeScript type checking |
| `pnpm format` | Format code with Prettier |
| `pnpm test` | Run tests with Vitest |
| `pnpm db:push` | Generate and apply database migrations |

## Project Structure

```
E learning Project/
├── client/                 # Frontend HTML pages
│   ├── index.html          # Landing page
│   ├── courses.html        # Course catalog
│   ├── course-detail.html  # Individual course view
│   ├── lesson-viewer.html  # Lesson playback
│   ├── student-dashboard.html
│   ├── teacher-dashboard.html
│   ├── admin-dashboard.html
│   ├── css/                # Stylesheets
│   └── js/                 # Client-side scripts
├── server/                 # Backend API
│   ├── _core/              # Core server utilities
│   ├── routers.ts          # tRPC route definitions
│   ├── storage.ts          # Data access layer
│   └── db.ts               # Database connection
├── shared/                 # Shared types and constants
├── drizzle/                # Database schema & migrations
├── references/             # Integration documentation
└── patches/                # Package patches
```

## Database Schema

The platform manages the following core entities:

- **users** - Students, teachers, and administrators with role-based access
- **courses** - Educational courses with titles, descriptions, and metadata
- **lessons** - Individual lessons within courses (video, content)
- **enrollments** - Student course enrollments with progress tracking
- **lesson_progress** - Per-lesson completion and watch time
- **announcements** - School-wide announcements and notifications
- **books** - Digital library resources (PDFs, videos, documents)

## User Roles

| Role | Permissions |
|------|-------------|
| **Student** | Browse courses, enroll, watch lessons, view marks |
| **Teacher** | Create/manage courses and lessons, view analytics |
| **Admin** | Full access to all platform features and settings |

## Deployment

### Production Build

```bash
pnpm build
pnpm start
```

The production server runs from the `dist/` directory with `NODE_ENV=production`.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Rwanda Education Board (REB)
- Ministry of Education, Rwanda
- Smart Africa Initiative
