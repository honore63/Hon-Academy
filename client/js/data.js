// Standalone Database Layer for HonE-Learning Platform

(function () {
  const DEFAULT_USERS = [
    {
      id: 1,
      name: "Alice Smith",
      email: "alice@hon-academy.rw",
      password: "student2026",
      role: "student",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      bio: "Primary/Secondary student at HON-ACADEMY. Excited to study Science and Languages!",
      subjectSpecialty: "",
      studentId: "HON-2026-001",
      createdAt: new Date("2026-06-15").toISOString()
    },
    {
      id: 2,
      name: "Dr. Robert Carter",
      email: "carter@hon-academy.rw",
      password: "teacher123",
      role: "teacher",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
      bio: "Certified Science & Mathematics Instructor at HON-ACADEMY.",
      subjectSpecialty: "Mathematics & Sciences",
      createdAt: new Date("2026-05-10").toISOString()
    },
    {
      id: 4,
      name: "Jean Paul Mugisha",
      email: "mugisha@hon-academy.rw",
      password: "teacher123",
      role: "teacher",
      avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
      bio: "Languages and Social Education teacher.",
      subjectSpecialty: "Languages & Humanities",
      createdAt: new Date("2026-06-01").toISOString()
    },
    {
      id: 3,
      name: "Sarah Connor",
      email: "admin@hon-academy.rw",
      password: "admin2026",
      role: "admin",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      bio: "HON-ACADEMY System Administrator.",
      subjectSpecialty: "",
      createdAt: new Date("2026-01-01").toISOString()
    }
  ];

  const DEFAULT_SUBJECTS = [
    // ════════════════════════════════════════════════════════════════
    // PRIMARY EDUCATION (P1–P6)
    // ════════════════════════════════════════════════════════════════
    { id: 1, title: "Kinyarwanda", level: "Primary", category: "languages", description: "Imyandiko, Ikibonezamvugo n'ubuvanganzo nyarwanda byo mu mashuri abanza.", code: "KIN-PRI" },
    { id: 2, title: "English", level: "Primary", category: "languages", description: "Primary English grammar, reading comprehension, and spoken communication skills.", code: "ENG-PRI" },
    { id: 3, title: "French", level: "Primary", category: "languages", description: "Introduction aux bases de la langue française pour l'école primaire.", code: "FRE-PRI" },
    { id: 4, title: "Mathematics", level: "Primary", category: "sciences", description: "Primary mathematics including arithmetic, fractions, shapes, and basic measurements.", code: "MAT-PRI" },
    { id: 5, title: "Science and Elementary Technology (SET)", level: "Primary", category: "sciences", description: "Introduction to natural science, plants, animals, energy, and simple digital computing tools.", code: "SET-PRI" },
    { id: 6, title: "Social and Religious Studies (SRS)", level: "Primary", category: "humanities", description: "Civics, Rwandan values, historical facts, and character-building guidelines.", code: "SRE-PRI" },
    { id: 7, title: "Creative Arts", level: "Primary", category: "arts", description: "Basic drawing, crafting, and creative artistic expressions.", code: "CRA-PRI" },
    { id: 8, title: "Physical Education and Sports (PES)", level: "Primary", category: "sports", description: "Physical fitness, team sports rules, and health.", code: "PES-PRI" },
    { id: 9, title: "Information and Communication Technology (ICT)", level: "Primary", category: "sciences", description: "Introduction to computer basics, keyboarding, and simple digital tools.", code: "ICT-PRI" },

    // ════════════════════════════════════════════════════════════════
    // LOWER SECONDARY (S1–S3)
    // ════════════════════════════════════════════════════════════════
    { id: 10, title: "English", level: "Lower Secondary", category: "languages", description: "English grammar, comprehension, essay writing, and oral communication.", code: "ENG-LS" },
    { id: 11, title: "Kinyarwanda", level: "Lower Secondary", category: "languages", description: "Imyandiko n'umuco w'ikinyarwanda mu mashuri yisumbuye.", code: "KIN-LS" },
    { id: 12, title: "French", level: "Lower Secondary", category: "languages", description: "Grammaire française, compréhension et expression écrite.", code: "FRE-LS" },
    { id: 13, title: "Kiswahili", level: "Lower Secondary", category: "languages", description: "Kiswahili language for East African integration and communication.", code: "KIS-LS" },
    { id: 14, title: "Mathematics", level: "Lower Secondary", category: "sciences", description: "Algebra, geometry, statistics, and problem-solving.", code: "MAT-LS" },
    { id: 15, title: "Biology", level: "Lower Secondary", category: "sciences", description: "Cell biology, human body systems, plants, and ecosystems.", code: "BIO-LS" },
    { id: 16, title: "Chemistry", level: "Lower Secondary", category: "sciences", description: "Elements, compounds, chemical reactions, and laboratory skills.", code: "CHE-LS" },
    { id: 17, title: "Physics", level: "Lower Secondary", category: "sciences", description: "Forces, energy, light, sound, electricity, and magnetism.", code: "PHY-LS" },
    { id: 18, title: "Geography", level: "Lower Secondary", category: "humanities", description: "Physical features, climate, mapping, and natural resources of Rwanda.", code: "GEO-LS" },
    { id: 19, title: "History", level: "Lower Secondary", category: "humanities", description: "Rwandan history, national unity, integration, and world civilizations.", code: "HIS-LS" },
    { id: 20, title: "Entrepreneurship", level: "Lower Secondary", category: "business", description: "Introduction to business concepts, planning, and economic principles.", code: "ENT-LS" },
    { id: 21, title: "Computer Science (ICT)", level: "Lower Secondary", category: "sciences", description: "Computer hardware, algorithms, coding basics, and web fundamentals.", code: "ICT-LS" },
    { id: 22, title: "Literature in English", level: "Lower Secondary", category: "languages", description: "Analysis of novels, poetry, and drama in English.", code: "LIT-LS" },
    { id: 23, title: "Creative Arts", level: "Lower Secondary", category: "arts", description: "Visual arts, music, drama, and creative expression.", code: "CRA-LS" },
    { id: 24, title: "Physical Education and Sports (PES)", level: "Lower Secondary", category: "sports", description: "Fitness training, team sports, and health education.", code: "PES-LS" },
    { id: 25, title: "Religious Education", level: "Lower Secondary", category: "humanities", description: "Religious, moral, and ethical education methodologies.", code: "RE-LS" },

    // ════════════════════════════════════════════════════════════════
    // UPPER SECONDARY (S4–S6) — SCIENCE SUBJECTS
    // ════════════════════════════════════════════════════════════════
    { id: 26, title: "Mathematics", level: "Upper Secondary", category: "science", description: "Advanced algebra, trigonometry, coordinate geometry, calculus, and statistics.", code: "MAT-US" },
    { id: 27, title: "Physics", level: "Upper Secondary", category: "science", description: "Newtonian mechanics, thermodynamics, light waves, electricity, and electromagnetism.", code: "PHY-US" },
    { id: 28, title: "Chemistry", level: "Upper Secondary", category: "science", description: "Organic and inorganic chemistry, periodic table, compounds, and lab techniques.", code: "CHE-US" },
    { id: 29, title: "Biology", level: "Upper Secondary", category: "science", description: "Genetics, plant physiology, human anatomy, ecology, and molecular biology.", code: "BIO-US" },
    { id: 30, title: "Computer Science", level: "Upper Secondary", category: "science", description: "Programming, algorithms, data structures, networking, and software engineering.", code: "CS-US" },

    // ════════════════════════════════════════════════════════════════
    // UPPER SECONDARY (S4–S6) — HUMANITIES SUBJECTS
    // ════════════════════════════════════════════════════════════════
    { id: 31, title: "History", level: "Upper Secondary", category: "humanities", description: "Rwanda and world history, colonization, independence, and modern governance.", code: "HIS-US" },
    { id: 32, title: "Geography", level: "Upper Secondary", category: "humanities", description: "Physical geography, cartography,人口地理, environmental management, and GIS.", code: "GEO-US" },
    { id: 33, title: "Economics", level: "Upper Secondary", category: "humanities", description: "Microeconomics, macroeconomics, trade, development, and economic policy.", code: "ECO-US" },
    { id: 34, title: "Literature in English", level: "Upper Secondary", category: "humanities", description: "Advanced literary analysis, criticism, and creative writing.", code: "LIT-US" },
    { id: 35, title: "Kinyarwanda", level: "Upper Secondary", category: "humanities", description: "Imibereho y'ikinyarwanda, ubuvanganzo n'ibyivugo.", code: "KIN-US" },
    { id: 36, title: "French", level: "Upper Secondary", category: "humanities", description: "Littérature et civilisation françaises, expression écrite et orale.", code: "FRE-US" },

    // ════════════════════════════════════════════════════════════════
    // UPPER SECONDARY (S4–S6) — LANGUAGES
    // ════════════════════════════════════════════════════════════════
    { id: 37, title: "English", level: "Upper Secondary", category: "languages", description: "Advanced English language skills, literature, and communication.", code: "ENG-US" },
    { id: 38, title: "Kiswahili", level: "Upper Secondary", category: "languages", description: "Kiswahili language proficiency for East African communication.", code: "KIS-US" },

    // ════════════════════════════════════════════════════════════════
    // UPPER SECONDARY (S4–S6) — BUSINESS & ECONOMICS
    // ════════════════════════════════════════════════════════════════
    { id: 39, title: "Entrepreneurship", level: "Upper Secondary", category: "business", description: "Business planning, financial management, and market analysis.", code: "ENT-US" },
    { id: 40, title: "Accounting", level: "Upper Secondary", category: "business", description: "Financial tracking, bookkeeping, auditing, and business accounting.", code: "ACC-US" },

    // ════════════════════════════════════════════════════════════════
    // UPPER SECONDARY (S4–S6) — ARTS
    // ════════════════════════════════════════════════════════════════
    { id: 41, title: "Fine Arts", level: "Upper Secondary", category: "arts", description: "Visual arts, painting, sculpting, and art history.", code: "ART-US" },
    { id: 42, title: "Music", level: "Upper Secondary", category: "arts", description: "Music theory, vocal harmony, composition, and instrumental practice.", code: "MUS-US" },
    { id: 43, title: "Performing Arts", level: "Upper Secondary", category: "arts", description: "Drama, theater production, dance, and stage performance.", code: "PER-US" },
    { id: 44, title: "Creative Arts", level: "Upper Secondary", category: "arts", description: "Mixed media, digital art, and creative design.", code: "CRA-US" },

    // ════════════════════════════════════════════════════════════════
    // UPPER SECONDARY (S4–S6) — COMMON SUBJECTS
    // ════════════════════════════════════════════════════════════════
    { id: 45, title: "General Studies and Communication Skills (GSCS)", level: "Upper Secondary", category: "common", description: "General knowledge, critical thinking, communication, and civic education.", code: "GSC-US" },
    { id: 46, title: "Physical Education and Sports (PES)", level: "Upper Secondary", category: "common", description: "Fitness, health, sports management, and physical well-being.", code: "PES-US" },

    // ════════════════════════════════════════════════════════════════
    // TVET (TECHNICAL AND VOCATIONAL EDUCATION)
    // ════════════════════════════════════════════════════════════════
    { id: 47, title: "Building Construction", level: "TVET", category: "engineering", description: "Masonry, construction materials, structural design, and building techniques.", code: "BLD-TVET" },
    { id: 48, title: "Electrical Technology", level: "TVET", category: "engineering", description: "Wiring, circuits, electrical systems, and power distribution.", code: "ELE-TVET" },
    { id: 49, title: "Electronics", level: "TVET", category: "engineering", description: "Electronic components, soldering, circuit boards, and device repair.", code: "ELN-TVET" },
    { id: 50, title: "Plumbing", level: "TVET", category: "engineering", description: "Water systems, pipe fitting, sanitation, and drainage.", code: "PLU-TVET" },
    { id: 51, title: "Welding", level: "TVET", category: "engineering", description: "Metal fabrication, arc welding, and joining techniques.", code: "WEL-TVET" },
    { id: 52, title: "Mechanical Engineering", level: "TVET", category: "engineering", description: "Mechanics, machine operation, maintenance, and manufacturing.", code: "MEC-TVET" },
    { id: 53, title: "Automobile Technology", level: "TVET", category: "engineering", description: "Vehicle mechanics, engine repair, diagnostics, and maintenance.", code: "AUT-TVET" },
    { id: 54, title: "Food and Beverage Operations", level: "TVET", category: "hospitality", description: "Service management, food safety, and hospitality industry operations.", code: "FBO-TVET" },
    { id: 55, title: "Culinary Arts", level: "TVET", category: "hospitality", description: "Professional cooking, food preparation, and kitchen management.", code: "CUL-TVET" },
    { id: 56, title: "Hospitality", level: "TVET", category: "hospitality", description: "Hotel management, guest services, and tourism operations.", code: "HOS-TVET" },
    { id: 57, title: "Tourism", level: "TVET", category: "hospitality", description: "Tour guiding, travel operations, cultural heritage, and eco-tourism.", code: "TOU-TVET" },
    { id: 58, title: "Fashion Design", level: "TVET", category: "creative", description: "Clothing design, patterns, textiles, and fashion trends.", code: "FAS-TVET" },
    { id: 59, title: "Tailoring", level: "TVET", category: "creative", description: "Garment cutting, sewing, finishing, and alteration.", code: "TAI-TVET" },
    { id: 60, title: "Hairdressing", level: "TVET", category: "creative", description: "Cosmetology, salon management, hair care, and beauty services.", code: "HAI-TVET" },
    { id: 61, title: "Agriculture", level: "TVET", category: "agriculture", description: "Crop production, modern farming, irrigation, and agribusiness.", code: "AGR-TVET" },
    { id: 62, title: "Animal Husbandry", level: "TVET", category: "agriculture", description: "Livestock rearing, veterinary care basics, and farm management.", code: "ANI-TVET" },
    { id: 63, title: "Networking", level: "TVET", category: "ict", description: "Computer networks, routing, switching, and IT infrastructure.", code: "NET-TVET" },
    { id: 64, title: "Software Development", level: "TVET", category: "ict", description: "Programming, app building, web development, and software engineering.", code: "SFW-TVET" },
    { id: 65, title: "Graphic Design", level: "TVET", category: "ict", description: "Digital art, branding, visual media, and print design.", code: "GRP-TVET" },
    { id: 66, title: "Multimedia", level: "TVET", category: "ict", description: "Video editing, animation, digital content creation, and motion graphics.", code: "MUL-TVET" },
    { id: 67, title: "Accounting", level: "TVET", category: "business", description: "Financial tracking, bookkeeping, and business accounting.", code: "ACC-TVET" },
    { id: 68, title: "Secretarial Studies", level: "TVET", category: "business", description: "Office administration, business communication, and record keeping.", code: "SEC-TVET" }
  ];

  // ════════════════════════════════════════════════════════════════
  // UPPER SECONDARY COMBINATIONS
  // ════════════════════════════════════════════════════════════════
  const DEFAULT_COMBINATIONS = [
    // Science Combinations
    { id: 1, name: "MPC", fullName: "Mathematics, Physics, Computer Science", stream: "science", description: "For students interested in engineering, computer science, and technology fields.", subjects: ["Mathematics", "Physics", "Computer Science"] },
    { id: 2, name: "PCM", fullName: "Physics, Chemistry, Mathematics", stream: "science", description: "The classic science combination for medicine, engineering, and research.", subjects: ["Physics", "Chemistry", "Mathematics"] },
    { id: 3, name: "PCB", fullName: "Physics, Chemistry, Biology", stream: "science", description: "Ideal for medical, pharmaceutical, and biomedical science careers.", subjects: ["Physics", "Chemistry", "Biology"] },
    { id: 4, name: "MCB", fullName: "Mathematics, Chemistry, Biology", stream: "science", description: "For students pursuing biochemistry, environmental science, and related fields.", subjects: ["Mathematics", "Chemistry", "Biology"] },
    { id: 5, name: "MPG", fullName: "Mathematics, Physics, Geography", stream: "science", description: "For careers in geophysics, surveying, urban planning, and meteorology.", subjects: ["Mathematics", "Physics", "Geography"] },

    // Humanities Combinations
    { id: 6, name: "HEG", fullName: "History, Economics, Geography", stream: "humanities", description: "For students interested in social sciences, governance, and development.", subjects: ["History", "Economics", "Geography"] },
    { id: 7, name: "HGL", fullName: "History, Geography, Literature", stream: "humanities", description: "Ideal for journalism, education, and cultural studies careers.", subjects: ["History", "Geography", "Literature in English"] },
    { id: 8, name: "HEL", fullName: "History, Economics, Literature", stream: "humanities", description: "For careers in law, public administration, and international relations.", subjects: ["History", "Economics", "Literature in English"] },
    { id: 9, name: "LEG", fullName: "Literature, Economics, Geography", stream: "humanities", description: "For students pursuing media, communication, and social development.", subjects: ["Literature in English", "Economics", "Geography"] }
  ];

  const DEFAULT_LESSONS = [
    // SET Primary Lessons
    {
      id: 1,
      subjectId: 5,
      title: "Introduction to Plants and Soil",
      description: "Learn about the core parts of a plant (roots, stem, leaves) and how different soil types support crops.",
      objectives: "Understand how plants grow; identify sandy, clayey, and loamy soils; learn watering methods.",
      videoUrl: "https://www.youtube.com/embed/8kK2zwjRV0M",
      pdfNotes: "SET_P4_Plants_and_Soils.pdf",
      assignments: "Draw and label a plant diagram. State 2 properties of loamy soil.",
      quiz: [
        { q: "Which part of the plant absorbs water from soil?", options: ["Leaves", "Roots", "Flowers", "Stem"], correct: 1 },
        { q: "Which soil is best for growing crops?", options: ["Sandy soil", "Clay soil", "Loamy soil", "Rock soil"], correct: 2 }
      ],
      teacherId: 2,
      date: "2026-07-01",
      gradeClass: "Primary 4"
    },
    {
      id: 2,
      subjectId: 5,
      title: "Basic Water Conservation",
      description: "Understand the water cycle and explore simple methods to harvest rainwater at home and at school.",
      objectives: "Explain evaporation, condensation, and precipitation; identify rainwater storage techniques.",
      videoUrl: "https://www.youtube.com/embed/7D5b8LzH2v0",
      pdfNotes: "SET_P4_Water_Conservation.pdf",
      assignments: "Explain three simple ways to save water in your household.",
      quiz: [
        { q: "What is evaporation?", options: ["Water turning into ice", "Water turning into vapor", "Rain falling down", "Plants drinking water"], correct: 1 },
        { q: "Rainwater harvesting helps to conserve water. (True or False)", options: ["True", "False"], correct: 0 }
      ],
      teacherId: 2,
      date: "2026-07-03",
      gradeClass: "Primary 4"
    },

    // Lower Secondary Mathematics Lessons
    {
      id: 3,
      subjectId: 14,
      title: "Quadratic Equations: Factorization",
      description: "Step-by-step instructions on solving quadratic algebraic expressions of form ax² + bx + c = 0.",
      objectives: "Factorize quadratics; identify roots of equation; graph parabolic arcs.",
      videoUrl: "https://www.youtube.com/embed/grnP3mDuRIA",
      pdfNotes: "Math_S3_Quadratic_Factorization.pdf",
      assignments: "Solve: x² - 5x + 6 = 0, and x² - 9 = 0.",
      quiz: [
        { q: "What are the roots of x² - 5x + 6 = 0?", options: ["x=2, x=3", "x=-2, x=-3", "x=1, x=6", "x=-1, x=-6"], correct: 0 },
        { q: "A quadratic equation always has degree of:", options: ["1", "2", "3", "4"], correct: 1 }
      ],
      teacherId: 2,
      date: "2026-07-04",
      gradeClass: "Senior 3"
    },

    // Lower Secondary Physics Lessons
    {
      id: 4,
      subjectId: 17,
      title: "Newton's First Law of Motion",
      description: "Concept of Inertia and explaining how objects react to external unbalanced forces.",
      objectives: "Define Inertia; state Newton's First Law; calculate net balanced forces.",
      videoUrl: "https://www.youtube.com/embed/kKKM8Y-u7ds",
      pdfNotes: "Physics_S4_Inertia_Forces.pdf",
      assignments: "State Newton's first law and describe an experiment showing inertia.",
      quiz: [
        { q: "What is inertia?", options: ["Resistance to change in motion", "Speed of moving objects", "Gravitational constant", "Friction coefficient"], correct: 0 },
        { q: "If net force acting on a body is zero, the body:", options: ["Must be at rest", "Must accelerate", "Stays in its current state of motion", "Stops instantly"], correct: 2 }
      ],
      teacherId: 2,
      date: "2026-07-05",
      gradeClass: "Senior 4"
    }
  ];

  const DEFAULT_BOOKS = [
    { id: 1, subjectId: 5, title: "REB Primary 4 SET Textbook", fileName: "P4_SET_Textbook_REB.pdf", fileType: "PDF", uploadedBy: 2, uploadedAt: "2026-07-01T08:00:00Z" },
    { id: 2, subjectId: 5, title: "SET Soil Types & Vegetation slides", fileName: "Soil_Types_Presentation.pptx", fileType: "PPT", uploadedBy: 2, uploadedAt: "2026-07-02T10:15:00Z" },
    { id: 3, subjectId: 14, title: "Secondary S3 Advanced Math Book", fileName: "S3_Mathematics_Guide.pdf", fileType: "PDF", uploadedBy: 2, uploadedAt: "2026-07-02T14:00:00Z" },
    { id: 4, subjectId: 17, title: "Newtonian Physics Reference Notes", fileName: "S4_Physics_Forces_Review.docx", fileType: "Word", uploadedBy: 2, uploadedAt: "2026-07-03T09:00:00Z" }
  ];

  const DEFAULT_MARKS = [
    // Pre-seeded marks for Alice (userId: 1)
    { id: 1, userId: 1, subjectId: 5, continuousAssessment: 26, assignment: 18, exam: 42, average: 86, position: 2 },
    { id: 2, userId: 1, subjectId: 14, continuousAssessment: 22, assignment: 15, exam: 38, average: 75, position: 5 },
    { id: 3, userId: 1, subjectId: 17, continuousAssessment: 28, assignment: 17, exam: 45, average: 90, position: 1 }
  ];

  const DEFAULT_ANNOUNCEMENTS = [
    { id: 1, title: "Welcome to HON-ACADEMY!", content: "Welcome all teachers and students to our HON-ACADEMY platform. Explore subjects and view lessons.", category: "News", createdBy: 3, createdAt: "2026-07-01T08:00:00Z" },
    { id: 2, title: "Term 2 Mid-Exam Timetable", content: "The midterm exams for Primary 4-6 and Senior 1-4 will commence on July 15th. Please check subject lists.", category: "Timetable", createdBy: 3, createdAt: "2026-07-07T09:00:00Z" },
    { id: 3, title: "Parent-Teacher Committee Meeting", content: "HON-ACADEMY Parent-Teacher Association meeting will be held in the main assembly hall this Friday at 2:00 PM.", category: "Meetings", createdBy: 3, createdAt: "2026-07-08T10:30:00Z" }
  ];

  const DEFAULT_GALLERY = [
    { id: 1, title: "HON-ACADEMY Campus", imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop", description: "A view of the main campus blocks at HON-ACADEMY.", createdAt: "2026-06-01" },
    { id: 2, title: "SET Lab Experiments", imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop", description: "Primary students participating in experimental soil tests in the science lab.", createdAt: "2026-06-05" },
    { id: 3, title: "Sports Day Tournament", imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop", description: "Secondary students competing in football and tracks events during sports week.", createdAt: "2026-06-10" }
  ];

  // Helper local storage wrappers
  function getOrInit(key, defaults) {
    const data = localStorage.getItem(key);
    if (data === null) {
      localStorage.setItem(key, JSON.stringify(defaults));
      return defaults;
    }
    const parsedData = JSON.parse(data);
    // Auto-merge new seed data if defaults have expanded (e.g. new subjects added)
    if (Array.isArray(parsedData) && parsedData.length < defaults.length) {
       const newItems = defaults.filter(d => !parsedData.find(pd => pd.id === d.id));
       if (newItems.length > 0) {
         const merged = [...parsedData, ...newItems];
         localStorage.setItem(key, JSON.stringify(merged));
         return merged;
       }
    }
    return parsedData;
  }

  function save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // --- Database APIs ---
  const db = {
    // Users
    getUsers: () => getOrInit("db_users", DEFAULT_USERS),
    getUser: (id) => db.getUsers().find(u => u.id === Number(id)),
    createUser: (userData) => {
      const users = db.getUsers();
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      const newUser = { id: newId, createdAt: new Date().toISOString(), ...userData };
      users.push(newUser);
      save("db_users", users);
      return newUser;
    },
    updateUser: (id, updates) => {
      const users = db.getUsers();
      const index = users.findIndex(u => u.id === Number(id));
      if (index !== -1) {
        users[index] = { ...users[index], ...updates };
        save("db_users", users);
        return users[index];
      }
      return null;
    },
    deleteUser: (id) => {
      let users = db.getUsers();
      users = users.filter(u => u.id !== Number(id));
      save("db_users", users);
    },

    // Subjects (HonE-Learning Platform Levels)
    getSubjects: () => getOrInit("db_subjects", DEFAULT_SUBJECTS),
    getSubject: (id) => db.getSubjects().find(s => s.id === Number(id)),
    getCombinations: () => getOrInit("db_combinations", DEFAULT_COMBINATIONS),
    getCombination: (id) => db.getCombinations().find(c => c.id === Number(id)),
    createCombination: (comboData) => {
      const combos = db.getCombinations();
      const newId = combos.length > 0 ? Math.max(...combos.map(c => c.id)) + 1 : 1;
      const newCombo = { id: newId, ...comboData };
      combos.push(newCombo);
      save("db_combinations", combos);
      return newCombo;
    },
    updateCombination: (id, updates) => {
      const combos = db.getCombinations();
      const index = combos.findIndex(c => c.id === Number(id));
      if (index !== -1) {
        combos[index] = { ...combos[index], ...updates };
        save("db_combinations", combos);
        return combos[index];
      }
      return null;
    },
    deleteCombination: (id) => {
      let combos = db.getCombinations();
      combos = combos.filter(c => c.id !== Number(id));
      save("db_combinations", combos);
    },
    createSubject: (subjData) => {
      const subjects = db.getSubjects();
      const newId = subjects.length > 0 ? Math.max(...subjects.map(s => s.id)) + 1 : 1;
      const newSubj = { id: newId, ...subjData };
      subjects.push(newSubj);
      save("db_subjects", subjects);
      return newSubj;
    },
    updateSubject: (id, updates) => {
      const subjects = db.getSubjects();
      const index = subjects.findIndex(s => s.id === Number(id));
      if (index !== -1) {
        subjects[index] = { ...subjects[index], ...updates };
        save("db_subjects", subjects);
        return subjects[index];
      }
      return null;
    },
    deleteSubject: (id) => {
      let subjects = db.getSubjects();
      subjects = subjects.filter(s => s.id !== Number(id));
      save("db_subjects", subjects);
      
      // Cascade delete lessons and books
      let lessons = db.getAllLessons().filter(l => l.subjectId !== Number(id));
      save("db_lessons", lessons);
      let books = db.getAllBooks().filter(b => b.subjectId !== Number(id));
      save("db_books", books);
    },

    // Lessons
    getAllLessons: () => getOrInit("db_lessons", DEFAULT_LESSONS),
    getLessonsBySubject: (subjectId) => {
      return db.getAllLessons()
        .filter(l => l.subjectId === Number(subjectId));
    },
    getLesson: (id) => db.getAllLessons().find(l => l.id === Number(id)),
    createLesson: (lessonData) => {
      const lessons = db.getAllLessons();
      const newId = lessons.length > 0 ? Math.max(...lessons.map(l => l.id)) + 1 : 1;
      const newLesson = { id: newId, ...lessonData };
      lessons.push(newLesson);
      save("db_lessons", lessons);
      return newLesson;
    },
    updateLesson: (id, updates) => {
      const lessons = db.getAllLessons();
      const index = lessons.findIndex(l => l.id === Number(id));
      if (index !== -1) {
        lessons[index] = { ...lessons[index], ...updates };
        save("db_lessons", lessons);
        return lessons[index];
      }
      return null;
    },
    deleteLesson: (id) => {
      let lessons = db.getAllLessons();
      lessons = lessons.filter(l => l.id !== Number(id));
      save("db_lessons", lessons);
    },

    // Books and notes sharing
    getAllBooks: () => getOrInit("db_books", DEFAULT_BOOKS),
    getBooksBySubject: (subjectId) => {
      return db.getAllBooks().filter(b => b.subjectId === Number(subjectId));
    },
    createBook: (bookData) => {
      const books = db.getAllBooks();
      const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
      const newBook = { id: newId, uploadedAt: new Date().toISOString(), ...bookData };
      books.push(newBook);
      save("db_books", books);
      return newBook;
    },
    deleteBook: (id) => {
      let books = db.getAllBooks();
      books = books.filter(b => b.id !== Number(id));
      save("db_books", books);
    },

    // Student Marks
    getMarks: () => {
      const raw = getOrInit("db_marks", DEFAULT_MARKS);
      return raw.map(m => ({
        ...m,
        studentId: m.studentId || m.userId,
        userId: m.userId || m.studentId
      }));
    },
    getStudentMarks: (studentId) => {
      const marks = db.getMarks().filter(m => Number(m.userId) === Number(studentId));
      return marks.map(m => {
        const subject = db.getSubject(m.subjectId);
        return {
          ...m,
          subjectTitle: subject ? subject.title : "TBD",
          subjectLevel: subject ? subject.level : "Primary"
        };
      });
    },
    getStudentSubjectMarks: (studentId, subjectId) => {
      return db.getMarks().find(m => Number(m.userId) === Number(studentId) && Number(m.subjectId) === Number(subjectId)) || {
        userId: Number(studentId),
        studentId: Number(studentId),
        subjectId: Number(subjectId),
        continuousAssessment: 0,
        assignment: 0,
        exam: 0,
        average: 0,
        position: null
      };
    },
    saveStudentMarks: (studentId, subjectId, ca, assignment, exam) => {
      const marks = db.getMarks();
      const index = marks.findIndex(m => Number(m.userId) === Number(studentId) && Number(m.subjectId) === Number(subjectId));

      const average = Math.round((Number(ca) + Number(assignment) + Number(exam)));
      const updates = {
        userId: Number(studentId),
        studentId: Number(studentId),
        subjectId: Number(subjectId),
        continuousAssessment: Number(ca),
        assignment: Number(assignment),
        exam: Number(exam),
        average: average
      };

      if (index !== -1) {
        marks[index] = { ...marks[index], ...updates };
      } else {
        const newId = marks.length > 0 ? Math.max(...marks.map(m => m.id)) + 1 : 1;
        marks.push({ id: newId, ...updates });
      }

      save("db_marks", marks);
      db.recalculatePositions(subjectId);
    },
    addMark: (markData) => {
      return db.saveStudentMarks(
        markData.studentId || markData.userId,
        markData.subjectId,
        markData.ca !== undefined ? markData.ca : markData.continuousAssessment,
        markData.assignment,
        markData.exam
      );
    },
    recalculatePositions: (subjectId) => {
      const marks = db.getMarks();
      const subjectMarks = marks.filter(m => Number(m.subjectId) === Number(subjectId));
      subjectMarks.sort((a, b) => b.average - a.average);
      
      subjectMarks.forEach((m, idx) => {
        const globalIdx = marks.findIndex(gm => gm.id === m.id);
        if (globalIdx !== -1) {
          marks[globalIdx].position = idx + 1;
        }
      });
      save("db_marks", marks);
    },

    // Announcements
    getAnnouncements: () => getOrInit("db_announcements", DEFAULT_ANNOUNCEMENTS),
    createAnnouncement: (annData) => {
      const anns = db.getAnnouncements();
      const newId = anns.length > 0 ? Math.max(...anns.map(a => a.id)) + 1 : 1;
      const newAnn = {
        id: newId,
        createdAt: new Date().toISOString(),
        ...annData
      };
      anns.unshift(newAnn);
      save("db_announcements", anns);
      return newAnn;
    },
    deleteAnnouncement: (id) => {
      let anns = db.getAnnouncements();
      anns = anns.filter(a => a.id !== Number(id));
      save("db_announcements", anns);
    },

    // School Gallery
    getGallery: () => getOrInit("db_gallery", DEFAULT_GALLERY),
    createGalleryItem: (itemData) => {
      const gallery = db.getGallery();
      const newId = gallery.length > 0 ? Math.max(...gallery.map(g => g.id)) + 1 : 1;
      const newItem = { id: newId, createdAt: new Date().toISOString().split("T")[0], ...itemData };
      gallery.unshift(newItem);
      save("db_gallery", gallery);
      return newItem;
    },

    // Lesson Viewer Tracker
    getLessonProgresses: () => getOrInit("db_lesson_progress", []),
    getLessonProgress: (userId, lessonId) => {
      return db.getLessonProgresses().find(lp => lp.userId === Number(userId) && lp.lessonId === Number(lessonId)) || {
        userId: Number(userId),
        lessonId: Number(lessonId),
        isCompleted: 0
      };
    },
    updateLessonProgress: (userId, lessonId, isCompleted) => {
      const progresses = db.getLessonProgresses();
      const index = progresses.findIndex(lp => lp.userId === Number(userId) && lp.lessonId === Number(lessonId));
      if (index !== -1) {
        progresses[index].isCompleted = isCompleted ? 1 : 0;
        progresses[index].updatedAt = new Date().toISOString();
      } else {
        const newId = progresses.length > 0 ? Math.max(...progresses.map(p => p.id)) + 1 : 1;
        progresses.push({
          id: newId,
          userId: Number(userId),
          lessonId: Number(lessonId),
          isCompleted: isCompleted ? 1 : 0,
          updatedAt: new Date().toISOString()
        });
      }
      save("db_lesson_progress", progresses);
    },

    // Session
    getCurrentUser: () => {
      const user = localStorage.getItem("current_user");
      return user ? JSON.parse(user) : null;
    },
    setCurrentUser: (user) => {
      if (user === null) {
        localStorage.removeItem("current_user");
      } else {
        localStorage.setItem("current_user", JSON.stringify(user));
      }
      window.dispatchEvent(new Event("auth_change"));
    },
    logout: () => {
      db.setCurrentUser(null);
    },

    // Credential-based Login (all roles)
    login: (email, password) => {
      const users = db.getUsers();
      const lEmail = email.toLowerCase().trim();
      // Try any user with matching email + password
      const matchedUser = users.find(
        u => u.email.toLowerCase() === lEmail && u.password === password
      );
      if (matchedUser) {
        db.setCurrentUser(matchedUser);
        return { success: true, user: matchedUser };
      }
      // Student fallback: match by email only if student has no password set
      const studentNoPass = users.find(
        u => u.email.toLowerCase() === lEmail
          && u.role === 'student'
          && (!u.password || u.password === '')
      );
      if (studentNoPass) {
        db.setCurrentUser(studentNoPass);
        return { success: true, user: studentNoPass };
      }
      return { success: false, error: 'Invalid email or password. Please check your credentials.' };
    },

    // Aliases so portal/legacy calls still work
    getLessons: () => db.getAllLessons(),
    getBooks: () => db.getAllBooks(),
    addUser: (userData) => db.createUser(userData),
    addBook: (bookData) => db.createBook(bookData),
    addSubject: (data) => db.createSubject(data),
    addAnnouncement: (data) => db.createAnnouncement(data),

    // ─── Document Management System ──────────────────────────────────────────
    DOCUMENT_CATEGORIES: [
      'Lesson Plans','Schemes of Work','Notes','Assignments','Examinations',
      'Marking Guides','Report Cards','Timetables','School Policies','Circulars',
      'Meeting Minutes','Student Records','Academic Reports','Administrative Documents','Other Resources'
    ],
    SUPPORTED_EXTENSIONS: ['.pdf','.doc','.docx','.xls','.xlsx','.ppt','.pptx','.jpg','.jpeg','.png','.zip','.txt'],

    // Documents
    getAllDocuments: () => getOrInit('db_documents', []),
    getDocument: (id) => db.getAllDocuments().find(d => d.id === Number(id)),
    createDocument: (data) => {
      const docs = db.getAllDocuments();
      const newId = docs.length > 0 ? Math.max(...docs.map(d => d.id)) + 1 : 1;
      const doc = {
        id: newId, version: 1, downloads: 0, status: 'active',
        visibility: 'private',
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        ...data
      };
      docs.push(doc);
      save('db_documents', docs);
      db.addAuditLog({ action: 'upload', targetType: 'document', targetId: doc.id, details: `Uploaded "${doc.title}"` });
      return doc;
    },
    updateDocument: (id, updates) => {
      const docs = db.getAllDocuments();
      const idx = docs.findIndex(d => d.id === Number(id));
      if (idx === -1) return null;
      docs[idx] = { ...docs[idx], ...updates, updatedAt: new Date().toISOString() };
      save('db_documents', docs);
      db.addAuditLog({ action: 'update', targetType: 'document', targetId: Number(id), details: `Updated "${docs[idx].title}"` });
      return docs[idx];
    },
    deleteDocument: (id) => {
      let docs = db.getAllDocuments();
      const doc = docs.find(d => d.id === Number(id));
      docs = docs.filter(d => d.id !== Number(id));
      save('db_documents', docs);
      // Move to recycle bin
      const bin = db.getRecycleBin();
      if (doc) { doc.deletedAt = new Date().toISOString(); bin.push(doc); }
      save('db_recycle_bin', bin);
      db.addAuditLog({ action: 'delete', targetType: 'document', targetId: Number(id), details: `Deleted "${doc?.title}"` });
    },
    replaceDocument: (id, newData) => {
      const docs = db.getAllDocuments();
      const idx = docs.findIndex(d => d.id === Number(id));
      if (idx === -1) return null;
      // Store current version in version history
      const versions = db.getDocumentVersions();
      versions.push({ ...docs[idx], archivedAt: new Date().toISOString() });
      save('db_document_versions', versions);
      // Bump version and apply updates
      docs[idx] = { ...docs[idx], ...newData, version: (docs[idx].version || 1) + 1, updatedAt: new Date().toISOString() };
      save('db_documents', docs);
      db.addAuditLog({ action: 'replace', targetType: 'document', targetId: Number(id), details: `Replaced "${docs[idx].title}" (v${docs[idx].version})` });
      return docs[idx];
    },

    // Document Versions
    getDocumentVersions: () => getOrInit('db_document_versions', []),
    getVersionsForDocument: (docId) => db.getDocumentVersions().filter(v => v.id === Number(docId)),

    // Document Sharing
    shareDocument: (id, shareWith) => {
      return db.updateDocument(id, { visibility: 'shared', sharedWith: shareWith });
    },

    // Archive / Restore
    archiveDocument: (id) => db.updateDocument(id, { status: 'archived' }),
    restoreDocument: (id) => db.updateDocument(id, { status: 'active' }),
    getArchivedDocuments: () => db.getAllDocuments().filter(d => d.status === 'archived'),

    // Recycle Bin
    getRecycleBin: () => getOrInit('db_recycle_bin', []),
    restoreFromRecycleBin: (id) => {
      let bin = db.getRecycleBin();
      const doc = bin.find(d => d.id === Number(id));
      bin = bin.filter(d => d.id !== Number(id));
      save('db_recycle_bin', bin);
      if (doc) {
        delete doc.deletedAt;
        doc.status = 'active';
        const docs = db.getAllDocuments();
        docs.push(doc);
        save('db_documents', docs);
        db.addAuditLog({ action: 'restore', targetType: 'document', targetId: Number(id), details: `Restored "${doc.title}" from recycle bin` });
      }
    },
    emptyRecycleBin: () => {
      save('db_recycle_bin', []);
      db.addAuditLog({ action: 'empty_recycle_bin', targetType: 'system', targetId: 0, details: 'Emptied recycle bin' });
    },

    // Download Tracking
    logDocumentDownload: (docId, userId) => {
      const stats = db.getDownloadStats();
      stats.push({ docId: Number(docId), userId: Number(userId), downloadedAt: new Date().toISOString() });
      save('db_download_stats', stats);
      const docs = db.getAllDocuments();
      const doc = docs.find(d => d.id === Number(docId));
      if (doc) { doc.downloads = (doc.downloads || 0) + 1; }
      save('db_documents', docs);
      db.addAuditLog({ action: 'download', targetType: 'document', targetId: Number(docId), details: `Downloaded "${doc?.title}"` });
    },
    getDownloadStats: () => getOrInit('db_download_stats', []),
    getDocumentDownloadCount: (docId) => db.getDownloadStats().filter(s => s.docId === Number(docId)).length,

    // Folders
    getFolders: () => getOrInit('db_folders', []),
    createFolder: (data) => {
      const folders = db.getFolders();
      const newId = folders.length > 0 ? Math.max(...folders.map(f => f.id)) + 1 : 1;
      const folder = { id: newId, createdAt: new Date().toISOString(), ...data };
      folders.push(folder);
      save('db_folders', folders);
      return folder;
    },
    updateFolder: (id, updates) => {
      const folders = db.getFolders();
      const idx = folders.findIndex(f => f.id === Number(id));
      if (idx === -1) return null;
      folders[idx] = { ...folders[idx], ...updates };
      save('db_folders', folders);
      return folders[idx];
    },
    deleteFolder: (id) => {
      let folders = db.getFolders();
      folders = folders.filter(f => f.id !== Number(id));
      save('db_folders', folders);
    },
    getDocumentsInFolder: (folderId) => db.getAllDocuments().filter(d => d.folderId === Number(folderId)),

    // Audit Log
    getAuditLog: () => getOrInit('db_audit_log', [
      { id: 1, action: 'upload', targetType: 'document', targetId: 1, details: 'Uploaded "Student Admission Form 2026"', uploadedBy: 'Admin', timestamp: new Date(Date.now() - 86400000).toISOString() },
      { id: 2, action: 'download', targetType: 'document', targetId: 2, details: 'Downloaded "Fee Structure 2026"', uploadedBy: 'Teacher', timestamp: new Date(Date.now() - 43200000).toISOString() },
      { id: 3, action: 'login', targetType: 'user', targetId: 1, details: 'Admin login from 192.168.1.1', uploadedBy: 'System', timestamp: new Date(Date.now() - 21600000).toISOString() },
      { id: 4, action: 'create', targetType: 'user', targetId: 5, details: 'Created new student account: John Doe', uploadedBy: 'Admin', timestamp: new Date(Date.now() - 10800000).toISOString() },
      { id: 5, action: 'update', targetType: 'document', targetId: 3, details: 'Updated "School Calendar 2026"', uploadedBy: 'Teacher', timestamp: new Date(Date.now() - 3600000).toISOString() }
    ]),
    addAuditLog: (entry) => {
      const log = db.getAuditLog();
      const newId = log.length > 0 ? Math.max(...log.map(l => l.id)) + 1 : 1;
      log.unshift({ id: newId, timestamp: new Date().toISOString(), ...entry });
      save('db_audit_log', log);
    },
    getAuditLogForDocument: (docId) => db.getAuditLog().filter(l => l.targetId === Number(docId)),
    clearAuditLog: () => { save('db_audit_log', []); },

    // Document Search
    searchDocuments: (query) => {
      const docs = db.getAllDocuments().filter(d => d.status !== 'deleted');
      if (!query || !query.trim()) return docs;
      const q = query.toLowerCase();
      return docs.filter(d =>
        (d.title || '').toLowerCase().includes(q) ||
        (d.description || '').toLowerCase().includes(q) ||
        (d.category || '').toLowerCase().includes(q) ||
        (d.uploadedBy || '').toLowerCase().includes(q) ||
        (d.fileName || '').toLowerCase().includes(q)
      );
    },

    // ─── Public Resources System ─────────────────────────────────────────────
    RESOURCE_CATEGORIES: [
      'Admission Forms','School Prospectus','School Calendar','School Rules & Regulations',
      'Fee Structure','Holiday Schedule','Public Notices','Examination Timetables',
      'Application Forms','Academic Policies','Learning Resources','Newsletters',
      'Annual Reports','School Magazine','Strategic Plan','School Brochures','Other Resources'
    ],
    RESOURCE_FILE_TYPES: {
      documents:['pdf','doc','docx','xls','xlsx','ppt','pptx','txt'],
      images:['jpg','jpeg','png','svg','webp'],
      videos:['mp4','mov','webm'],
      audio:['mp3','wav','ogg'],
      archives:['zip','rar']
    },
    VISIBILITY_OPTIONS: ['public','internal','teacher-only','student-only'],
    DOWNLOAD_OPTIONS: ['preview-only','preview-download','download-only','private'],

    // ─── Resource Categories ─────────────────────────────────────────────────
    getResourceCategories: () => {
      const defaults = db.RESOURCE_CATEGORIES;
      const custom = getOrInit('db_resource_categories', []);
      return [...defaults, ...custom.filter(c => !defaults.includes(c))];
    },
    addResourceCategory: (name) => {
      const cats = getOrInit('db_resource_categories', []);
      if (!cats.includes(name)) { cats.push(name); save('db_resource_categories', cats); }
    },
    removeResourceCategory: (name) => {
      if (db.RESOURCE_CATEGORIES.includes(name)) return;
      let cats = getOrInit('db_resource_categories', []);
      cats = cats.filter(c => c !== name);
      save('db_resource_categories', cats);
    },

    // ─── Resources CRUD ──────────────────────────────────────────────────────
    getAllResources: () => getOrInit('db_resources', []),
    getResource: (id) => db.getAllResources().find(r => r.id === Number(id)),
    getPublicResources: () => db.getAllResources().filter(r => r.visibility === 'public' && r.status !== 'archived'),
    createResource: (data) => {
      const resources = db.getAllResources();
      const newId = resources.length > 0 ? Math.max(...resources.map(r => r.id)) + 1 : 1;
      const resource = {
        id: newId, views: 0, downloads: 0, version: 1,
        featured: false, pinned: false, status: 'active',
        downloadsEnabled: true, previewEnabled: true,
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        ...data
      };
      resources.push(resource);
      save('db_resources', resources);
      db.logResourceAction('upload', resource.id, `Uploaded "${resource.title}"`);
      return resource;
    },
    updateResource: (id, updates) => {
      const resources = db.getAllResources();
      const idx = resources.findIndex(r => r.id === Number(id));
      if (idx === -1) return null;
      resources[idx] = { ...resources[idx], ...updates, updatedAt: new Date().toISOString() };
      save('db_resources', resources);
      db.logResourceAction('update', id, `Updated "${resources[idx].title}"`);
      return resources[idx];
    },
    deleteResource: (id) => {
      let resources = db.getAllResources();
      const resource = resources.find(r => r.id === Number(id));
      resources = resources.filter(r => r.id !== Number(id));
      save('db_resources', resources);
      db.logResourceAction('delete', id, `Deleted "${resource?.title}"`);
    },
    replaceResource: (id, newData) => {
      const resources = db.getAllResources();
      const idx = resources.findIndex(r => r.id === Number(id));
      if (idx === -1) return null;
      resources[idx] = {
        ...resources[idx], ...newData,
        version: (resources[idx].version || 1) + 1,
        updatedAt: new Date().toISOString()
      };
      save('db_resources', resources);
      db.logResourceAction('replace', id, `Replaced "${resources[idx].title}" (v${resources[idx].version})`);
      return resources[idx];
    },
    archiveResource: (id) => db.updateResource(id, { status: 'archived' }),
    restoreResource: (id) => db.updateResource(id, { status: 'active' }),
    getArchivedResources: () => db.getAllResources().filter(r => r.status === 'archived'),

    // ─── Featured / Pinned ───────────────────────────────────────────────────
    toggleFeatured: (id) => {
      const r = db.getResource(id);
      if (!r) return null;
      return db.updateResource(id, { featured: !r.featured });
    },
    togglePinned: (id) => {
      const r = db.getResource(id);
      if (!r) return null;
      return db.updateResource(id, { pinned: !r.pinned });
    },
    getFeaturedResources: () => db.getAllResources().filter(r => r.featured && r.status !== 'archived'),
    getPinnedResources: () => db.getAllResources().filter(r => r.pinned && r.status !== 'archived'),

    // ─── View / Download Tracking ────────────────────────────────────────────
    logResourceView: (id) => {
      const resources = db.getAllResources();
      const idx = resources.findIndex(r => r.id === Number(id));
      if (idx !== -1) { resources[idx].views = (resources[idx].views || 0) + 1; save('db_resources', resources); }
    },
    logResourceDownload: (id) => {
      const resources = db.getAllResources();
      const idx = resources.findIndex(r => r.id === Number(id));
      if (idx !== -1) { resources[idx].downloads = (resources[idx].downloads || 0) + 1; save('db_resources', resources); }
      db.logResourceAction('download', id, `Downloaded resource #${id}`);
    },
    getMostViewedResources: (limit = 6) => {
      return db.getAllResources().filter(r => r.status !== 'archived').sort((a,b) => (b.views||0) - (a.views||0)).slice(0, limit);
    },
    getMostDownloadedResources: (limit = 6) => {
      return db.getAllResources().filter(r => r.status !== 'archived').sort((a,b) => (b.downloads||0) - (a.downloads||0)).slice(0, limit);
    },
    getRecentResources: (limit = 8) => {
      return db.getAllResources().filter(r => r.status !== 'archived').sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit);
    },

    // ─── Resource Search ─────────────────────────────────────────────────────
    searchResources: (query, filters = {}) => {
      let resources = db.getAllResources().filter(r => r.status !== 'archived');
      if (filters.visibility) resources = resources.filter(r => r.visibility === filters.visibility);
      else resources = resources.filter(r => r.visibility === 'public');
      if (filters.category) resources = resources.filter(r => r.category === filters.category);
      if (filters.fileType) {
        const ft = filters.fileType.toLowerCase();
        resources = resources.filter(r => (r.fileType || '').toLowerCase() === ft);
      }
      if (filters.fileGroup) {
        const group = filters.fileGroup;
        const types = db.RESOURCE_FILE_TYPES[group] || [];
        resources = resources.filter(r => types.includes((r.fileType||'').toLowerCase()));
      }
      if (query && query.trim()) {
        const q = query.toLowerCase();
        resources = resources.filter(r =>
          (r.title || '').toLowerCase().includes(q) ||
          (r.description || '').toLowerCase().includes(q) ||
          (r.category || '').toLowerCase().includes(q)
        );
      }
      const sort = filters.sort || 'newest';
      const sorters = {
        newest: (a,b) => new Date(b.createdAt) - new Date(a.createdAt),
        oldest: (a,b) => new Date(a.createdAt) - new Date(b.createdAt),
        downloads: (a,b) => (b.downloads||0) - (a.downloads||0),
        views: (a,b) => (b.views||0) - (a.views||0),
        alpha: (a,b) => (a.title||'').localeCompare(b.title||'')
      };
      resources.sort(sorters[sort] || sorters.newest);
      return resources;
    },

    // ─── Resource Audit Log ──────────────────────────────────────────────────
    getResourceAuditLog: () => getOrInit('db_resource_audit', []),
    logResourceAction: (action, targetId, details) => {
      const log = db.getResourceAuditLog();
      const newId = log.length > 0 ? Math.max(...log.map(l => l.id)) + 1 : 1;
      log.unshift({ id: newId, action, targetId: Number(targetId), details, timestamp: new Date().toISOString() });
      save('db_resource_audit', log);
    },

    // ─── Resource Stats ──────────────────────────────────────────────────────
    getResourceStats: () => {
      const resources = db.getAllResources().filter(r => r.status !== 'archived');
      const publicResources = resources.filter(r => r.visibility === 'public');
      return {
        total: resources.length,
        public: publicResources.length,
        internal: resources.filter(r => r.visibility === 'internal').length,
        teacherOnly: resources.filter(r => r.visibility === 'teacher-only').length,
        studentOnly: resources.filter(r => r.visibility === 'student-only').length,
        featured: resources.filter(r => r.featured).length,
        totalViews: resources.reduce((sum, r) => sum + (r.views || 0), 0),
        totalDownloads: resources.reduce((sum, r) => sum + (r.downloads || 0), 0),
        categories: [...new Set(resources.map(r => r.category).filter(Boolean))].length,
        archived: db.getAllResources().filter(r => r.status === 'archived').length
      };
    },

    // ─── Resource Sampling (for demos) ──────────────────────────────────────
    ensureSampleResources: () => {
      const existing = db.getAllResources();
      if (existing.length > 0) return;
      const samples = [
        { title:'2026 Admission Form', description:'Application form for the 2026 academic year. Download, fill, and submit to the school office.', category:'Admission Forms', fileType:'pdf', fileSize:'245 KB', fileName:'admission-form-2026.pdf', visibility:'public', featured:true, previewEnabled:true, downloadsEnabled:true, uploadedBy:'Administrator', duration:'' },
        { title:'School Prospectus 2025-2026', description:'Comprehensive guide to our school, including academic programs, facilities, extracurricular activities, and admission procedures.', category:'School Prospectus', fileType:'pdf', fileSize:'3.2 MB', fileName:'prospectus-2025-2026.pdf', visibility:'public', featured:true, previewEnabled:true, downloadsEnabled:true, uploadedBy:'Administrator', duration:'' },
        { title:'Academic Calendar 2026', description:'Official school calendar for the 2026 academic year, including term dates, holidays, and examination periods.', category:'School Calendar', fileType:'pdf', fileSize:'180 KB', fileName:'academic-calendar-2026.pdf', visibility:'public', featured:true, previewEnabled:true, downloadsEnabled:true, uploadedBy:'Administrator', duration:'' },
        { title:'School Rules & Code of Conduct', description:'Official rules, regulations, and code of conduct for all students.', category:'School Rules & Regulations', fileType:'pdf', fileSize:'420 KB', fileName:'school-rules-2026.pdf', visibility:'public', previewEnabled:true, downloadsEnabled:true, uploadedBy:'Administrator', duration:'' },
        { title:'Fee Structure 2026', description:'Detailed breakdown of school fees for all grade levels.', category:'Fee Structure', fileType:'xlsx', fileSize:'95 KB', fileName:'fee-structure-2026.xlsx', visibility:'public', previewEnabled:true, downloadsEnabled:true, uploadedBy:'Administrator', duration:'' },
        { title:'School Newsletter - Term 1 2026', description:'Quarterly newsletter featuring school news, student achievements, and upcoming events.', category:'Newsletters', fileType:'pdf', fileSize:'4.5 MB', fileName:'newsletter-term1-2026.pdf', visibility:'public', previewEnabled:true, downloadsEnabled:true, uploadedBy:'Administrator', duration:'' },
        { title:'School Magazine 2025', description:'Annual school magazine showcasing student creativity and academic highlights.', category:'School Magazine', fileType:'pdf', fileSize:'8.5 MB', fileName:'school-magazine-2025.pdf', visibility:'public', featured:true, previewEnabled:true, downloadsEnabled:true, uploadedBy:'Administrator', duration:'' },
        { title:'School Brochure', description:'Beautifully designed brochure highlighting our school\'s strengths and facilities.', category:'School Brochures', fileType:'pdf', fileSize:'3.8 MB', fileName:'school-brochure.pdf', visibility:'public', featured:true, previewEnabled:true, downloadsEnabled:true, uploadedBy:'Administrator', duration:'' },
        { title:'Campus Tour Video', description:'A guided video tour of our school campus.', category:'Learning Resources', fileType:'mp4', fileSize:'45 MB', fileName:'campus-tour.mp4', visibility:'public', featured:true, previewEnabled:true, downloadsEnabled:true, uploadedBy:'Administrator', duration:'4:32' },
        { title:'School Anthem', description:'Official school anthem audio recording.', category:'School Brochures', fileType:'mp3', fileSize:'3.2 MB', fileName:'school-anthem.mp3', visibility:'public', previewEnabled:true, downloadsEnabled:true, uploadedBy:'Administrator', duration:'1:45' },
        { title:'Strategic Plan 2024-2028', description:'Five-year strategic plan outlining the school\'s development roadmap.', category:'Strategic Plan', fileType:'pdf', fileSize:'1.3 MB', fileName:'strategic-plan-2024-2028.pdf', visibility:'public', previewEnabled:true, downloadsEnabled:true, uploadedBy:'Administrator', duration:'' },
        { title:'STEM Club Presentation', description:'Presentation slides from the STEM Club\'s award-winning science fair project.', category:'Learning Resources', fileType:'pptx', fileSize:'2.8 MB', fileName:'stem-club-presentation.pptx', visibility:'public', previewEnabled:true, downloadsEnabled:true, uploadedBy:'Administrator', duration:'' },
        { title:'Annual Report 2025', description:'Official annual report detailing the school\'s performance for the previous year.', category:'Annual Reports', fileType:'pdf', fileSize:'2.1 MB', fileName:'annual-report-2025.pdf', visibility:'public', previewEnabled:true, downloadsEnabled:true, uploadedBy:'Administrator', duration:'' },
        { title:'End of Year Exam Timetable', description:'Official timetable for end-of-year examinations.', category:'Examination Timetables', fileType:'pdf', fileSize:'210 KB', fileName:'exam-timetable-term3-2026.pdf', visibility:'public', previewEnabled:true, downloadsEnabled:true, uploadedBy:'Administrator', duration:'' },
        { title:'Academic Policies Handbook', description:'Comprehensive guide to academic policies, grading system, and promotion requirements.', category:'Academic Policies', fileType:'pdf', fileSize:'1.8 MB', fileName:'academic-policies-handbook.pdf', visibility:'public', featured:true, previewEnabled:true, downloadsEnabled:true, uploadedBy:'Administrator', duration:'' },
        { title:'Graduation Ceremony Photos', description:'Photo collection from the 2025 graduation ceremony.', category:'Learning Resources', fileType:'zip', fileSize:'15 MB', fileName:'graduation-photos-2025.zip', visibility:'public', previewEnabled:false, downloadsEnabled:true, uploadedBy:'Administrator', duration:'' },
        { title:'Sports Day Results 2025', description:'Complete results from the 2025 annual Sports Day competition.', category:'Public Notices', fileType:'xlsx', fileSize:'350 KB', fileName:'sports-day-results-2025.xlsx', visibility:'public', previewEnabled:true, downloadsEnabled:true, uploadedBy:'Administrator', duration:'' },
        { title:'General Application Form', description:'Standard application form for new student admissions and transfer requests.', category:'Application Forms', fileType:'docx', fileSize:'180 KB', fileName:'general-application-form.docx', visibility:'public', previewEnabled:true, downloadsEnabled:true, uploadedBy:'Administrator', duration:'' },
        { title:'Holiday Schedule 2026', description:'Complete listing of all school holidays for the 2026 academic year.', category:'Holiday Schedule', fileType:'pdf', fileSize:'150 KB', fileName:'holiday-schedule-2026.pdf', visibility:'public', previewEnabled:true, downloadsEnabled:true, uploadedBy:'Administrator', duration:'' },
        { title:'Parent-Teacher Conference Schedule', description:'Schedule for upcoming Parent-Teacher Association conferences.', category:'Public Notices', fileType:'pdf', fileSize:'120 KB', fileName:'pta-schedule-term2.pdf', visibility:'public', previewEnabled:true, downloadsEnabled:true, uploadedBy:'Administrator', duration:'' }
      ];
      samples.forEach((s, i) => {
        const r = { id: i + 1, views: Math.floor(Math.random() * 200) + 20, downloads: Math.floor(Math.random() * 80) + 10, version: 1, status:'active', pinned: false, createdAt: new Date(Date.now() - Math.random() * 60 * 86400000).toISOString(), updatedAt: new Date().toISOString(), ...s };
        existing.push(r);
      });
      save('db_resources', existing);
    },

    // ─── CMS: School Information ──────────────────────────────────────────────
    DEFAULT_SCHOOL_INFO: {
      name: 'HON-ACADEMY',
      shortName: 'HON-ACADEMY',
      motto: 'Excellence in Education, Success in Life.',
      established: '2018',
      badge: 'Rwanda Education Board Compliant',
      logoUrl: '',
      address: 'KG 7 Avenue, Kigali, Rwanda',
      phone: '+250 791 684 429',
      email: 'info@hon-academy.rw',
      website: 'https://hon-academy.rw',
      officeHours: 'Mon - Fri: 08:00 AM - 05:00 PM | Sat: 08:00 AM - 12:00 PM',
      heroTitle: 'Welcome to HON-ACADEMY',
      heroSubtitle: 'Excellence in Education \u2022 Innovation \u2022 Leadership',
      heroDescription: 'At HON-ACADEMY, we believe education is the foundation for a brighter future. We are committed to nurturing learners who are academically excellent, morally responsible, technologically skilled, and globally competitive. Through innovative teaching, modern learning environments, and dedicated educators, we empower every learner to discover their potential and become confident leaders capable of making meaningful contributions to society.',
      heroImage: '',
      aboutIntro: 'HON-ACADEMY is dedicated to providing quality education that inspires excellence, creativity, leadership, and lifelong learning. Our mission is to develop responsible citizens equipped with knowledge, practical skills, and strong moral values to thrive in a rapidly changing world.',
      schoolHistory: 'HON-ACADEMY was established to provide accessible, innovative, and high-quality education that transforms lives and prepares learners to become responsible global citizens. Since our founding, we have grown into a comprehensive institution offering Primary, Lower Secondary, Upper Secondary, and TVET education, serving hundreds of learners with dedicated teachers and modern facilities.',
      vision: 'To become a nationally and internationally recognized institution of excellence that empowers learners through quality education, innovation, leadership, and lifelong learning.',
      mission: 'To provide inclusive, learner-centered education that integrates academic excellence, technology, moral values, and practical skills, enabling every learner to become a responsible citizen and lifelong contributor to society.',
      coreValues: 'Excellence: We strive for the highest standards in all academic and co-curricular activities. Integrity: We uphold honesty, transparency, and ethical conduct. Respect: We treat every individual with dignity and consideration. Responsibility: We take ownership of our actions and commitments. Innovation: We embrace creativity, technology, and progressive teaching methods. Accountability: We are answerable to our students, parents, and community. Teamwork: We collaborate effectively for shared success. Discipline: We maintain order, self-control, and focus. Service: We contribute positively to our community and society. Lifelong Learning: We encourage continuous personal and professional growth.',
      principalMessage: 'Welcome to HON-ACADEMY.\n\nWe believe education transforms lives. Our dedicated teachers, supportive community, and modern learning environment ensure every learner develops academically, socially, morally, and spiritually.\n\nWe invite you to join our growing family and experience excellence in education.',
      facilities: ['Modern Classrooms', 'ICT Laboratory', 'Science Laboratories', 'Library', 'Sports Grounds', 'Innovation Hub', 'Administration Block'],
      loginDescription: 'Access your personalized portal. Choose your role below to sign in. Secure authentication ensures each user only accesses information and features relevant to their role.',
      contactIntro: 'Have a question or need assistance? Reach out to us and we will get back to you as soon as possible.',
      announcementsIntro: 'Stay updated with the latest school news, academic announcements, competitions, events, and community activities.',
      galleryIntro: 'Explore moments from our school \u2014 academic activities, classroom learning, laboratory sessions, sports, clubs, graduation, and community service.',
      teachersIntro: 'Meet the dedicated educators shaping the future of our students. Our qualified and passionate teachers are committed to student success.',
      booksIntro: 'Browse and download textbooks, study guides, past papers, and digital learning materials for all levels.',
      admissionsContent: 'Admissions are open for learners passionate about quality education and personal growth. At HON-ACADEMY, we welcome students who are eager to learn, grow, and contribute to our vibrant school community. Our admission process is designed to be straightforward and supportive.',
      admissionRequirements: ['Completed Application Form', 'Birth Certificate', 'Passport Photograph', 'Previous Academic Report', 'Parent/Guardian Information'],
      admissionProcess: ['Submit Application', 'Upload Required Documents', 'Application Review', 'Interview/Assessment (if applicable)', 'Adadmission Decision', 'Student Registration'],
      whyStudyHere: ['Competence-Based Curriculum', 'Modern ICT Integration', 'Highly Qualified Teachers', 'Safe Learning Environment', 'Co-curricular Activities', 'Career Guidance'],
      academicOverview: 'HON-ACADEMY follows Rwanda\u2019s Competence-Based Curriculum, promoting knowledge, skills, innovation, and values across all educational levels.',
      teachingMethodology: ['Student-Centered Learning', 'Inquiry-Based Learning', 'Project-Based Learning', 'Practical Experiments', 'ICT Integration', 'Continuous Assessment'],
      visionLong: 'To become a nationally and internationally recognized institution of excellence that empowers learners through quality education, innovation, leadership, and lifelong learning.',
      missionLong: 'To provide inclusive, learner-centered education that integrates academic excellence, technology, moral values, and practical skills, enabling every learner to become a responsible citizen and lifelong contributor to society.',
      storyLong: 'HON-ACADEMY was established to provide accessible, innovative, and high-quality education that transforms lives and prepares learners to become responsible global citizens. Our institution was founded on the belief that every child deserves access to quality education regardless of their background. Through dedicated teachers, modern facilities, and a commitment to innovation, we have created a learning environment where students thrive academically, socially, and morally. Today, HON-ACADEMY stands as a beacon of educational excellence, offering comprehensive programs from Primary through TVET, preparing learners for the challenges and opportunities of the modern world.',
      principalBio: 'The Principal of HON-ACADEMY leads with a vision of academic excellence and holistic student development, ensuring every learner receives the support and guidance needed to succeed.',
      newsletterDescription: 'Subscribe to receive school news, announcements, and updates directly to your inbox.',
      footerTagline: 'Preparing learners today for tomorrow\u2019s opportunities through quality education, technology, and character development.',
      copyrightText: '\u00a9 2026 HON-ACADEMY. All Rights Reserved.'
    },

    getSchoolInfo: () => {
      const info = localStorage.getItem('cms_school_info');
      if (!info) { save('cms_school_info', db.DEFAULT_SCHOOL_INFO); return db.DEFAULT_SCHOOL_INFO; }
      return JSON.parse(info);
    },
    updateSchoolInfo: (updates) => {
      const info = db.getSchoolInfo();
      const updated = { ...info, ...updates };
      save('cms_school_info', updated);
      return updated;
    },

    // ─── CMS: News / Articles ────────────────────────────────────────────────
    getNews: () => getOrInit('cms_news', []),
    getPublishedNews: () => db.getNews().filter(n => n.status === 'published'),
    getPendingNews: () => db.getNews().filter(n => n.status === 'pending'),
    getNewsArticle: (id) => db.getNews().find(n => n.id === Number(id)),
    createNews: (data) => {
      const news = db.getNews();
      const newId = news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1;
      const article = { id: newId, views: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), ...data };
      news.push(article);
      save('cms_news', news);
      return article;
    },
    updateNews: (id, updates) => {
      const news = db.getNews();
      const idx = news.findIndex(n => n.id === Number(id));
      if (idx === -1) return null;
      news[idx] = { ...news[idx], ...updates, updatedAt: new Date().toISOString() };
      save('cms_news', news);
      return news[idx];
    },
    deleteNews: (id) => {
      let news = db.getNews();
      news = news.filter(n => n.id !== Number(id));
      save('cms_news', news);
    },
    approveNews: (id) => db.updateNews(id, { status: 'published' }),
    rejectNews: (id) => db.updateNews(id, { status: 'draft' }),
    getRecentNews: (limit = 4) => db.getPublishedNews().sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit),

    // ─── CMS: Events ─────────────────────────────────────────────────────────
    getEvents: () => getOrInit('cms_events', []),
    getPublishedEvents: () => db.getEvents().filter(e => e.status === 'published'),
    getPendingEvents: () => db.getEvents().filter(e => e.status === 'pending'),
    getEvent: (id) => db.getEvents().find(e => e.id === Number(id)),
    createEvent: (data) => {
      const events = db.getEvents();
      const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
      const event = { id: newId, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), ...data };
      events.push(event);
      save('cms_events', events);
      return event;
    },
    updateEvent: (id, updates) => {
      const events = db.getEvents();
      const idx = events.findIndex(e => e.id === Number(id));
      if (idx === -1) return null;
      events[idx] = { ...events[idx], ...updates, updatedAt: new Date().toISOString() };
      save('cms_events', events);
      return events[idx];
    },
    deleteEvent: (id) => {
      let events = db.getEvents();
      events = events.filter(e => e.id !== Number(id));
      save('cms_events', events);
    },
    approveEvent: (id) => db.updateEvent(id, { status: 'published' }),
    getUpcomingEvents: (limit = 4) => db.getPublishedEvents().filter(e => new Date(e.date) >= new Date()).sort((a,b) => new Date(a.date) - new Date(b.date)).slice(0, limit),

    // ─── CMS: Testimonials ───────────────────────────────────────────────────
    getTestimonials: () => getOrInit('cms_testimonials', []),
    getPublishedTestimonials: () => db.getTestimonials().filter(t => t.status === 'published'),
    createTestimonial: (data) => {
      const testimonials = db.getTestimonials();
      const newId = testimonials.length > 0 ? Math.max(...testimonials.map(t => t.id)) + 1 : 1;
      testimonials.push({ id: newId, createdAt: new Date().toISOString(), status: 'published', ...data });
      save('cms_testimonials', testimonials);
      return testimonials;
    },
    updateTestimonial: (id, updates) => {
      const testimonials = db.getTestimonials();
      const idx = testimonials.findIndex(t => t.id === Number(id));
      if (idx === -1) return null;
      testimonials[idx] = { ...testimonials[idx], ...updates };
      save('cms_testimonials', testimonials);
      return testimonials[idx];
    },
    deleteTestimonial: (id) => {
      let testimonials = db.getTestimonials();
      testimonials = testimonials.filter(t => t.id !== Number(id));
      save('cms_testimonials', testimonials);
    },

    // ─── CMS: Partners ────────────────────────────────────────────────────────
    getPartners: () => getOrInit('cms_partners', []),
    createPartner: (data) => {
      const partners = db.getPartners();
      const newId = partners.length > 0 ? Math.max(...partners.map(p => p.id)) + 1 : 1;
      partners.push({ id: newId, order: partners.length + 1, createdAt: new Date().toISOString(), ...data });
      save('cms_partners', partners);
      return partners;
    },
    updatePartner: (id, updates) => {
      const partners = db.getPartners();
      const idx = partners.findIndex(p => p.id === Number(id));
      if (idx === -1) return null;
      partners[idx] = { ...partners[idx], ...updates };
      save('cms_partners', partners);
      return partners[idx];
    },
    deletePartner: (id) => {
      let partners = db.getPartners();
      partners = partners.filter(p => p.id !== Number(id));
      save('cms_partners', partners);
    },

    // ─── CMS: Featured Programs ────────────────────────────────────────────────
    getFeaturedPrograms: () => getOrInit('cms_programs', []),
    createProgram: (data) => {
      const programs = db.getFeaturedPrograms();
      const newId = programs.length > 0 ? Math.max(...programs.map(p => p.id)) + 1 : 1;
      programs.push({ id: newId, createdAt: new Date().toISOString(), ...data });
      save('cms_programs', programs);
      return programs;
    },
    updateProgram: (id, updates) => {
      const programs = db.getFeaturedPrograms();
      const idx = programs.findIndex(p => p.id === Number(id));
      if (idx === -1) return null;
      programs[idx] = { ...programs[idx], ...updates };
      save('cms_programs', programs);
      return programs[idx];
    },
    deleteProgram: (id) => {
      let programs = db.getFeaturedPrograms();
      programs = programs.filter(p => p.id !== Number(id));
      save('cms_programs', programs);
    },

    // ─── CMS: Leadership Team ─────────────────────────────────────────────────
    getLeadership: () => getOrInit('cms_leadership', []),
    createLeader: (data) => {
      const leaders = db.getLeadership();
      const newId = leaders.length > 0 ? Math.max(...leaders.map(l => l.id)) + 1 : 1;
      leaders.push({ id: newId, createdAt: new Date().toISOString(), ...data });
      save('cms_leadership', leaders);
      return leaders;
    },
    updateLeader: (id, updates) => {
      const leaders = db.getLeadership();
      const idx = leaders.findIndex(l => l.id === Number(id));
      if (idx === -1) return null;
      leaders[idx] = { ...leaders[idx], ...updates };
      save('cms_leadership', leaders);
      return leaders[idx];
    },
    deleteLeader: (id) => {
      let leaders = db.getLeadership();
      leaders = leaders.filter(l => l.id !== Number(id));
      save('cms_leadership', leaders);
    },

    // ─── CMS: Site Settings ──────────────────────────────────────────────────
    getSiteSettings: () => {
      const settings = localStorage.getItem('cms_site_settings');
      const defaults = {
        announcementBar: true, approvalWorkflow: false, maintenanceMode: false,
        officeHours: 'Mon - Fri: 08:00 AM - 05:00 PM | Sat: 08:00 AM - 12:00 PM',
        contactIntro: 'Have a question or need assistance? Reach out to us and we will get back to you as soon as possible.',
        socialLinks: {
          github: 'https://github.com/honore63',
          facebook: 'https://facebook.com/honacademyrw',
          twitter: 'https://twitter.com/THonore78575',
          youtube: 'https://www.youtube.com/@TuyishimeHonore-qt9hd',
          linkedin: 'https://www.linkedin.com/in/tuyishime-honore-5a57762a1',
          instagram: 'https://instagram.com/honacademyrw',
          whatsapp: '+250791684429'
        },
        trustBadges: ['REB Certified', 'Secure & Private', 'Rwanda Compliant']
      };
      if (!settings) { save('cms_site_settings', defaults); return defaults; }
      return { ...defaults, ...JSON.parse(settings) };
    },
    updateSiteSettings: (updates) => {
      const settings = db.getSiteSettings();
      const updated = { ...settings, ...updates };
      save('cms_site_settings', updated);
      return updated;
    },
    // ─── CMS: Newsletter Subscriptions ──────────────────────────────────────
    getNewsletterEmails: () => JSON.parse(localStorage.getItem('cms_newsletter_emails') || '[]'),
    subscribeNewsletter: (email) => {
      const emails = db.getNewsletterEmails();
      if (emails.includes(email)) return false;
      emails.push(email);
      localStorage.setItem('cms_newsletter_emails', JSON.stringify(emails));
      return true;
    },

    // ─── CMS: Gallery Categories (for photo gallery) ─────────────────────────
    getGalleryCategories: () => getOrInit('cms_gallery_categories', ['Academic Activities','Classroom Learning','Laboratory Sessions','ICT Learning','Sports','Clubs','Graduation','Community Service','School Trips']),

    // ─── CMS: Homepage Data Aggregator ──────────────────────────────────────
    getHomepageData: () => {
      const schoolInfo = db.getSchoolInfo();
      const users = db.getUsers();
      const subjects = db.getSubjects();
      const resources = db.getPublicResources();
      return {
        school: schoolInfo,
        stats: {
          students: users.filter(u => u.role === 'student').length * 15 + 100,
          teachers: users.filter(u => u.role === 'teacher').length + 3,
          subjects: subjects.length,
          resources: resources.length,
          downloads: resources.reduce((sum, r) => sum + (r.downloads || 0), 0)
        },
        featuredSubjects: subjects.slice(0, 3).map(s => ({
          ...s,
          lessonsCount: db.getLessonsBySubject(s.id).length,
          badgeColor: s.level === 'Primary' ? 'bg-success' : 'bg-primary'
        })),
        recentNews: db.getRecentNews(3),
        upcomingEvents: db.getUpcomingEvents(3),
        testimonials: db.getPublishedTestimonials(),
        partners: db.getPartners(),
        featuredTeachers: users.filter(u => u.role === 'teacher').slice(0, 2),
        latestAnnouncements: db.getAnnouncements().slice(0, 3),
        featuredBooks: db.getBooks().slice(0, 3)
      };
    }
  };

  window.db = db;
})();
