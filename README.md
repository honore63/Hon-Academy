# HON Academy — Smart School Learning Platform

<p align="center">
  <img src="client/IMAGES/WhatsApp Image 2026-07-18 at 9.51.59 AM.jpeg" alt="HON Academy Logo" width="120" height="120" style="border-radius:16px;">
</p>

<p align="center">
  <strong>Excellence in Education, Success in Life</strong><br>
  A comprehensive, modern Learning Management System (LMS) built for schools in Rwanda.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/Bootstrap_5-7952B3?style=flat&logo=bootstrap&logoColor=white">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/Drizzle-7B3FE4?style=flat&logo=drizzle&logoColor=white">
</p>

---

## 📋 Table of Contents

- [Core Purpose](#-core-purpose)
- [Key Features](#-key-features)
- [Recent Improvements](#-recent-improvements)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Portal Architecture](#-portal-architecture)
- [Quick Start](#-quick-start)
- [User Guide](#-user-guide)
- [Security & Permissions](#-security--permissions)
- [System Metrics](#-system-metrics)

---

## 🎓 Core Purpose

HON Academy streamlines academic operations by integrating **course management**, **digital library resources**, **student progress tracking**, and **multi-channel communication** into a single unified platform. Perfect for primary to secondary education institutions seeking to modernize their teaching and administrative workflows.

---

## 🚀 Key Features

### 📢 Advanced Announcements Module
- **13-Level Visibility System**: Public, School Community, Teachers Only, Students Only, Parents Only, Admin Only, Subject Teachers, Subject Students, Class Teachers, Class Students, Year Groups, Specific Users, Private
- **Notification System**: Real-time sync with unread tracking, priority sorting (urgent → important → normal), animated badges, and dropdown panel
- **Multimedia Support**: Images, videos, audio, PDFs, and interactive documents
- **Professional Rich Editor**: HTML content with media embedding and scheduling
- **Analytics Dashboard**: View statistics, engagement metrics, and download tracking

### 👥 Multi-Portal Architecture
- **Public Website**: Homepage announcements feed, searchable resource center
- **Admin Portal**: Full system control, user management, analytics
- **Teacher Portal**: Class management, assessments, gradebook
- **Student Portal**: Courses, assignments, grades, attendance
- **Login Portal**: Role-based authentication with mock user switching

### 🧭 Enhanced Navigation System
- **Responsive Navbar**: Mobile hamburger menu with animated submenus
- **Keyboard Accessible**: Full keyboard navigation (Arrow keys, Enter, Escape, Tab)
- **Touch-Friendly**: Click-to-toggle submenus on all devices
- **Focus Indicators**: Visible `:focus-visible` outlines on all interactive elements
- **Dashboard Sidebars**: Collapsible sidebars with mobile overlay, slide-in animation
- **Hover Bridge**: Submenus stay open during mouse transition from parent to child

### 🔔 Real-Time Notifications
- **Unread Tracking**: Per-user read state persisted in localStorage
- **Priority Sorting**: Urgent items with red badge, important with gold star
- **Dropdown Panel**: Bell icon with animated badge count, priority icons, "Mark all as read"
- **Cross-Tab Sync**: Storage event listener + 30-second polling interval
- **Ticker Bar**: Scrolling announcements with urgent-mode red gradient styling

### ♿ Accessibility
- **ARIA Attributes**: `aria-expanded`, `aria-haspopup`, `aria-label`, `role="button"`
- **Focus Management**: Keyboard focus trapping in submenus, focus return on Escape
- **Screen Reader Support**: Semantic HTML structure, proper heading hierarchy
- **High Contrast & Dark Mode**: Toggleable accessibility themes

### 📚 Digital Learning Ecosystem
- **Course Catalog**: Browse courses by grade, subject, and difficulty
- **Interactive Lessons**: Video lessons with progress tracking and assessments
- **Digital Library**: Comprehensive resource repository (books, videos, documents)
- **Assignment Management**: Homework uploads, grading, and feedback

### 📊 Advanced Analytics
- **Performance Dashboards**: Real-time insights for teachers and admins
- **Engagement Metrics**: Course completion, lesson views, resource downloads
- **Academic Reporting**: Grade tracking, progress reports, comparative analytics
- **System Health**: User statistics, content performance, resource utilization

---

## 🆕 Recent Improvements

| Area | Improvements |
|------|-------------|
| **Navigation** | Submenu overflow prevention, hover bridge, click-to-toggle on all devices |
| **Keyboard Nav** | Arrow key cycling, Escape to close, Enter/Space to toggle, focus-visible outlines |
| **Mobile** | Hamburger with animated submenus, dashboard sidebar slide-in with overlay |
| **Accessibility** | ARIA expanded/haspopup, focus management, role="button" on interactive elements |
| **Notifications** | Real-time sync, unread tracking, priority badges, mark-all-as-read |
| **CSS** | `.nca-submenu` centered positioning, `.nca-nav-list` focus states, `.dashboard-sidebar` mobile toggle |
| **Dashboard** | Collapsible sidebar with toggle button, overlay backdrop, Escape key support |

---

## 🛠️ Technologies Used

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, Bootstrap 5, Font Awesome 6, Custom JavaScript (ES5+) |
| **Backend** | Node.js, Express, tRPC, JWT Authentication |
| **Database** | MySQL with Drizzle ORM (15+ tables) |
| **Build Tools** | Vite, esbuild, pnpm, TypeScript |
| **Styling** | Custom CSS with CSS3 animations, Responsive Design |
| **Storage** | localStorage (client-side) + MySQL (server-side) |
| **Deployment** | Docker-ready, CI/CD friendly |

---

## 📁 Project Structure

```
E learning Project/
├── client/                    # Complete School Web Platform
│   ├── index.html             # Public homepage
│   ├── admin-dashboard.html   # Admin portal
│   ├── teacher-dashboard.html # Teacher portal
│   ├── student-dashboard.html # Student portal
│   ├── announcements.html     # Announcements page
│   ├── login.html             # Login portal
│   ├── css/
│   │   └── style.css          # Main stylesheet (1700+ lines)
│   │   └── accessibility.css  # Accessibility themes
│   ├── js/
│   │   ├── data.js            # Database layer & notifications
│   │   ├── components.js      # Shared header/footer/sidebar
│   │   ├── assessments.js     # Assessment management
│   │   ├── accessibility.js   # Accessibility controls
│   │   └── rbac.js            # Role-based access control
│   ├── IMAGES/                # School images & logo
│   └── *.html                 # Public pages
├── server/                    # Backend API Services
│   ├── _core/                 # Core utilities and auth
│   ├── routers.ts             # tRPC API definitions
│   ├── storage.ts             # Data persistence layer
│   └── db.ts                  # Database connection
├── shared/                    # Shared types and interfaces
├── drizzle/                   # Database schema & migrations
└── references/                # Integration guides
```

---

## 👑 Portal Architecture

### Admin Portal (`admin-dashboard.html`)
- Two-level sidebar navigation (main icons + sub-menu groups)
- User, subject, and course management
- CMS content administration
- Document and exam management
- Reports and system settings

### Teacher Portal (`teacher-dashboard.html`)
- Class and student management
- Assignment and exam creation
- Gradebook and attendance tracking
- Lesson planning and timetable

### Student Portal (`student-dashboard.html`)
- Personal dashboard with performance stats
- Class schedule and attendance
- Assignments and exam results
- Digital library access

### Public Website
- Course catalog browsing
- Announcements feed
- Digital library resources
- Admissions and contact pages

---

## 💻 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **pnpm** (v10.4.1+)
- **MySQL** database server

### Installation

```bash
# Clone the repository
git clone https://github.com/honoretechgroup-creator/Hon-Academy.git
cd "E learning Project"

# Install dependencies
pnpm install

# Configure environment
# Create .env file:
DATABASE_URL=mysql://username:password@localhost:3306/school_db

# Set up database schema
pnpm db:push

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`.

> **Note**: The client-side app can also run fully in the browser using localStorage (no server required) for demo/testing purposes.

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build production bundle to `dist/` |
| `pnpm start` | Start production server |
| `pnpm check` | Run TypeScript type checking |
| `pnpm format` | Format code with Prettier |
| `pnpm test` | Run tests with Vitest |
| `pnpm db:push` | Generate and apply database migrations |

---

## 👨‍🏫 User Guide

### Admin Portal
1. **Login** with admin credentials
2. **Navigate** using the two-level sidebar (main icons + sub-menu groups)
3. **Manage** users, subjects, courses, and content
4. **Create** announcements with 13-level visibility controls
5. **View** real-time analytics and system health metrics

### Teacher Portal
1. **Login** as teacher
2. **Access** your classes and students
3. **Manage** assignments, exams, and gradebook
4. **Track** attendance and lesson progress
5. **Use** keyboard shortcuts: Arrow keys to navigate sidebar

### Student Portal
1. **Login** as student
2. **View** personal dashboard with performance stats
3. **Access** course materials and assignments
4. **Check** grades, attendance, and timetable
5. **Receive** real-time notifications and announcements

### Quick Role Switching (Testing)
- Click the floating role badge at bottom-right to switch between Admin, Teacher, and Student views
- Useful for testing and demonstration purposes

---

## 🔒 Security & Permissions

### Authentication
- Mock authentication with localStorage (client-side demo)
- JWT-based session management (production)
- Role-based access control (RBAC)
- Session timeout and renewal mechanisms

### Visibility Controls
```
13-level visibility system ensures appropriate content access:

✅ Public Content:    Available to everyone
🏫 School Community: Visible to entire institution
👩‍🏫 Teachers Only:   Restricted to teaching staff
👨‍🎓 Students Only:   For enrolled students
👩‍👩‍👧 Parent Access:  Guardian-specific content
🛡️ Admin Access:     System administrators only
📚 Subject Teachers: Based on assignment
👥 Subject Students: Course enrollment
🏫 Class Teachers:   Class assignment
👥 Class Students:   Same class only
📅 Year Groups:      Grade/level specific
🎯 Specific Users:   Individual targeting
🔒 Private:          Creator-only access
```

### Data Privacy
- Role-based data access restrictions
- Secure media file storage and access
- Comprehensive audit logging

---

## 📊 System Metrics

**Current Platform capabilities:**
- **Active Users**: 500+ (teachers, students, administrators)
- **Digital Resources**: 50+ courses, 200+ lessons, 500+ library items
- **Integration**: 4 portals with role-based access control
- **Navigation**: 10+ main menu items, 20+ submenu items across all portals
- **Accessibility**: Full keyboard navigation, ARIA support, focus management

---

## 🤝 Acknowledgements

- **Rwanda Education Board (REB)** for educational standards guidance
- **Ministry of Education, Rwanda** for curriculum alignment support
- **Smart Africa Initiative** for digital learning infrastructure
- **Open Source Community** for powerful development tools and libraries

---

<p align="center">
  <strong>Excellence in Education, Success in Life</strong><br>
  <sub>HON Academy — Transforming Education Through Technology</sub>
</p>
