// Standalone Database Layer for HonE-Learning Platform

(function () {
  const DEFAULT_USERS = [
    {id:1,name:"Alice Smith",email:"alice@hon-academy.rw",password:"student2026",role:"student",avatarUrl:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",bio:"Primary/Secondary student at HON-ACADEMY. Excited to study Science and Languages!",subjectSpecialty:"",studentId:"HON-2026-001",createdAt:new Date("2026-06-15").toISOString()},
    {id:2,name:"Dr. Robert Carter",email:"carter@hon-academy.rw",password:"teacher123",role:"teacher",avatarUrl:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",bio:"Certified Science & Mathematics Instructor at HON-ACADEMY.",subjectSpecialty:"Mathematics & Sciences",createdAt:new Date("2026-05-10").toISOString()},
    {id:3,name:"Sarah Connor",email:"admin@hon-academy.rw",password:"admin2026",role:"admin",avatarUrl:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",bio:"HON-ACADEMY System Administrator.",subjectSpecialty:"",createdAt:new Date("2026-01-01").toISOString()},
    {id:4,name:"Jean Paul Mugisha",email:"mugisha@hon-academy.rw",password:"teacher123",role:"teacher",avatarUrl:"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",bio:"Languages and Social Education teacher.",subjectSpecialty:"Languages & Humanities",createdAt:new Date("2026-06-01").toISOString()},
    // Administration
    {id:5,name:"Mr. Emmanuel Nsengiyumva",email:"principal@honacademy.rw",password:"admin123",role:"admin",avatarUrl:"IMAGES/IMG-20260130-WA0010.jpg",bio:"Mr. Emmanuel Nsengiyumva provides strategic leadership for HON Academy, overseeing academic excellence, school management, staff development, and learner welfare while promoting innovation and quality education.",subjectSpecialty:"Principal / Head Teacher",createdAt:new Date("2025-01-01").toISOString()},
    {id:6,name:"Ms. Alice Uwimana",email:"deputy.primary@honacademy.rw",password:"admin123",role:"admin",avatarUrl:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"Deputy Head Teacher \u2013 Primary",createdAt:new Date("2025-01-02").toISOString()},
    {id:7,name:"Mr. Patrick Habimana",email:"deputy.secondary@honacademy.rw",password:"admin123",role:"admin",avatarUrl:"https://images.unsplash.com/photo-1615109398623-88346a601842?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"Deputy Head Teacher \u2013 Secondary",createdAt:new Date("2025-01-03").toISOString()},
    {id:8,name:"Mrs. Chantal Mukamana",email:"administration@honacademy.rw",password:"admin123",role:"admin",avatarUrl:"https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"Deputy Head Teacher \u2013 Administration",createdAt:new Date("2025-01-04").toISOString()},
    {id:9,name:"Mr. Eric Niyonzima",email:"dos.primary@honacademy.rw",password:"admin123",role:"admin",avatarUrl:"https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"Director of Studies (Primary)",createdAt:new Date("2025-01-05").toISOString()},
    {id:10,name:"Ms. Diane Uwase",email:"dos.secondary@honacademy.rw",password:"admin123",role:"admin",avatarUrl:"https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"Director of Studies (Secondary)",createdAt:new Date("2025-01-06").toISOString()},
    {id:11,name:"Mr. Claude Nshimiyimana",email:"discipline@honacademy.rw",password:"admin123",role:"admin",avatarUrl:"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"Director of Discipline",createdAt:new Date("2025-01-07").toISOString()},
    {id:12,name:"Ms. Beatha Mukandayisenga",email:"counselling@honacademy.rw",password:"admin123",role:"admin",avatarUrl:"https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"Guidance & Counselling Coordinator",createdAt:new Date("2025-01-08").toISOString()},
    {id:13,name:"Mr. Jean Bosco Mugisha",email:"hr@honacademy.rw",password:"admin123",role:"admin",avatarUrl:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"Human Resource Officer",createdAt:new Date("2025-01-09").toISOString()},
    {id:14,name:"Mrs. Solange Uwamahoro",email:"bursar@honacademy.rw",password:"admin123",role:"admin",avatarUrl:"https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"School Bursar",createdAt:new Date("2025-01-10").toISOString()},
    {id:15,name:"Mr. David Iradukunda",email:"ict@honacademy.rw",password:"admin123",role:"admin",avatarUrl:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"ICT Coordinator",createdAt:new Date("2025-01-11").toISOString()},
    {id:16,name:"Ms. Grace Ingabire",email:"secretary@honacademy.rw",password:"admin123",role:"admin",avatarUrl:"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"School Secretary",createdAt:new Date("2025-01-12").toISOString()},
    // Nursery Teachers
    {id:17,name:"Ms. Claudine Uwase",email:"claudine.uwase@honacademy.rw",password:"teacher123",role:"teacher",avatarUrl:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"Nursery Teacher",createdAt:new Date("2025-02-01").toISOString()},
    {id:18,name:"Ms. Alice Mukamana",email:"alice.mukamana@honacademy.rw",password:"teacher123",role:"teacher",avatarUrl:"https://images.unsplash.com/photo-1542599741748-55820c21ec85?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"Nursery Teacher",createdAt:new Date("2025-02-02").toISOString()},
    // Primary Teachers
    {id:19,name:"Mr. Jean Pierre Ndayambaje",email:"jeanpierre@honacademy.rw",password:"teacher123",role:"teacher",avatarUrl:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"Mathematics Teacher",createdAt:new Date("2025-03-01").toISOString()},
    {id:20,name:"Ms. Diane Mukeshimana",email:"diane@honacademy.rw",password:"teacher123",role:"teacher",avatarUrl:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"English Teacher",createdAt:new Date("2025-03-02").toISOString()},
    {id:21,name:"Mr. Eric Habimana",email:"eric@honacademy.rw",password:"teacher123",role:"teacher",avatarUrl:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"Science Teacher",createdAt:new Date("2025-03-03").toISOString()},
    {id:22,name:"Ms. Solange Uwera",email:"solange@honacademy.rw",password:"teacher123",role:"teacher",avatarUrl:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"Social Studies Teacher",createdAt:new Date("2025-03-04").toISOString()},
    // Secondary Teachers
    {id:23,name:"Mr. Samuel Nkurunziza",email:"samuel@honacademy.rw",password:"teacher123",role:"teacher",avatarUrl:"https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"Mathematics Teacher",createdAt:new Date("2025-04-01").toISOString()},
    {id:24,name:"Ms. Olivia Mukantwari",email:"olivia@honacademy.rw",password:"teacher123",role:"teacher",avatarUrl:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"Biology Teacher",createdAt:new Date("2025-04-02").toISOString()},
    {id:25,name:"Mr. Gilbert Niyonzima",email:"gilbert@honacademy.rw",password:"teacher123",role:"teacher",avatarUrl:"https://images.unsplash.com/photo-1596815064285-7ed0e4776c0b?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"Physics Teacher",createdAt:new Date("2025-04-03").toISOString()},
    {id:26,name:"Ms. Sandrine Mukamana",email:"sandrine@honacademy.rw",password:"teacher123",role:"teacher",avatarUrl:"https://images.unsplash.com/photo-1554727242-741c14fa561c?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"Chemistry Teacher",createdAt:new Date("2025-04-04").toISOString()},
    {id:27,name:"Mr. Emmanuel Mugisha",email:"emmanuel.mugisha@honacademy.rw",password:"teacher123",role:"teacher",avatarUrl:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face",bio:"",subjectSpecialty:"Computer Science Teacher",createdAt:new Date("2025-04-05").toISOString()}
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
    { id: 15, title: "General Science", level: "Lower Secondary", category: "sciences", description: "Integrated science covering biology, chemistry, physics, and scientific inquiry.", code: "GSC-LS" },
    { id: 16, title: "History", level: "Lower Secondary", category: "humanities", description: "Rwandan history, national unity, integration, and world civilizations.", code: "HIS-LS" },
    { id: 17, title: "Geography", level: "Lower Secondary", category: "humanities", description: "Physical features, climate, mapping, and natural resources of Rwanda.", code: "GEO-LS" },
    { id: 18, title: "Entrepreneurship", level: "Lower Secondary", category: "business", description: "Introduction to business concepts, planning, and economic principles.", code: "ENT-LS" },
    { id: 19, title: "Information and Communication Technology (ICT)", level: "Lower Secondary", category: "sciences", description: "Computer hardware, software, algorithms, and digital literacy.", code: "ICT-LS" },
    { id: 20, title: "Religious Education", level: "Lower Secondary", category: "humanities", description: "Religious, moral, and ethical education methodologies.", code: "RE-LS" },
    { id: 21, title: "Fine Art", level: "Lower Secondary", category: "arts", description: "Visual arts, drawing, painting, and creative expression.", code: "FAR-LS" },
    { id: 22, title: "Music", level: "Lower Secondary", category: "arts", description: "Music theory, singing, and instrumental practice.", code: "MUS-LS" },
    { id: 23, title: "Physical Education", level: "Lower Secondary", category: "sports", description: "Fitness training, team sports, and health education.", code: "PED-LS" },

    // ════════════════════════════════════════════════════════════════
    // UPPER SECONDARY (S4–S6) — MATHEMATICS AND SCIENCES
    // ════════════════════════════════════════════════════════════════
    { id: 24, title: "Mathematics", level: "Upper Secondary", category: "science", description: "Advanced algebra, trigonometry, coordinate geometry, calculus, and statistics.", code: "MAT-US" },
    { id: 25, title: "Physics", level: "Upper Secondary", category: "science", description: "Newtonian mechanics, thermodynamics, light waves, electricity, and electromagnetism.", code: "PHY-US" },
    { id: 26, title: "Chemistry", level: "Upper Secondary", category: "science", description: "Organic and inorganic chemistry, periodic table, compounds, and lab techniques.", code: "CHE-US" },
    { id: 27, title: "Biology", level: "Upper Secondary", category: "science", description: "Genetics, plant physiology, human anatomy, ecology, and molecular biology.", code: "BIO-US" },
    { id: 28, title: "Computer Science", level: "Upper Secondary", category: "science", description: "Programming, algorithms, data structures, networking, and software engineering.", code: "CS-US" },

    // ════════════════════════════════════════════════════════════════
    // UPPER SECONDARY (S4–S6) — LANGUAGES
    // ════════════════════════════════════════════════════════════════
    { id: 29, title: "English", level: "Upper Secondary", category: "languages", description: "Advanced English language skills, literature, and communication.", code: "ENG-US" },
    { id: 30, title: "Kinyarwanda", level: "Upper Secondary", category: "languages", description: "Imibereho y'ikinyarwanda, ubuvanganzo n'ibyivugo.", code: "KIN-US" },
    { id: 31, title: "French", level: "Upper Secondary", category: "languages", description: "Littérature et civilisation françaises, expression écrite et orale.", code: "FRE-US" },
    { id: 32, title: "Kiswahili", level: "Upper Secondary", category: "languages", description: "Kiswahili language proficiency for East African communication.", code: "KIS-US" },
    { id: 33, title: "Literature in English", level: "Upper Secondary", category: "languages", description: "Advanced literary analysis, criticism, and creative writing.", code: "LIT-US" },

    // ════════════════════════════════════════════════════════════════
    // UPPER SECONDARY (S4–S6) — HUMANITIES
    // ════════════════════════════════════════════════════════════════
    { id: 34, title: "History", level: "Upper Secondary", category: "humanities", description: "Rwanda and world history, colonization, independence, and modern governance.", code: "HIS-US" },
    { id: 35, title: "Geography", level: "Upper Secondary", category: "humanities", description: "Physical geography, cartography, environmental management, and GIS.", code: "GEO-US" },
    { id: 36, title: "Economics", level: "Upper Secondary", category: "humanities", description: "Microeconomics, macroeconomics, trade, development, and economic policy.", code: "ECO-US" },
    { id: 37, title: "Entrepreneurship", level: "Upper Secondary", category: "humanities", description: "Business planning, financial management, and market analysis.", code: "ENT-US" },
    { id: 38, title: "Religious Education", level: "Upper Secondary", category: "humanities", description: "Religious, moral, and ethical education at advanced level.", code: "RE-US" },

    // ════════════════════════════════════════════════════════════════
    // UPPER SECONDARY (S4–S6) — ARTS
    // ════════════════════════════════════════════════════════════════
    { id: 39, title: "Fine Art", level: "Upper Secondary", category: "arts", description: "Visual arts, painting, sculpting, and art history.", code: "ART-US" },
    { id: 40, title: "Music", level: "Upper Secondary", category: "arts", description: "Music theory, vocal harmony, composition, and instrumental practice.", code: "MUS-US" },

    // ════════════════════════════════════════════════════════════════
    // UPPER SECONDARY (S4–S6) — PHYSICAL EDUCATION
    // ════════════════════════════════════════════════════════════════
    { id: 41, title: "Physical Education", level: "Upper Secondary", category: "sports", description: "Fitness, health, sports management, and physical well-being.", code: "PED-US" },

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
      subjectId: 15,
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
    { id: 4, subjectId: 25, title: "Newtonian Physics Reference Notes", fileName: "S4_Physics_Forces_Review.docx", fileType: "Word", uploadedBy: 2, uploadedAt: "2026-07-03T09:00:00Z" }
  ];

  const DEFAULT_UNITS = [
    // SET Primary
    { id: 1, subjectId: 5, title: "Plants and Soil", order: 1, description: "Understanding plant structure, soil types, and crop growth.", objectives: "Identify plant parts; differentiate soil types; explain how plants absorb nutrients." },
    { id: 2, subjectId: 5, title: "Water Conservation", order: 2, description: "The water cycle and rainwater harvesting techniques.", objectives: "Explain evaporation, condensation, precipitation; demonstrate water storage methods." },
    { id: 3, subjectId: 5, title: "Farm Animals", order: 3, description: "Common domestic animals and their uses.", objectives: "Classify farm animals by use; describe basic animal care." },
    // Mathematics Lower Secondary
    { id: 4, subjectId: 14, title: "Algebraic Expressions", order: 1, description: "Linear and quadratic expressions, factorization.", objectives: "Factorize quadratics; simplify algebraic fractions; solve linear equations." },
    { id: 5, subjectId: 14, title: "Geometry", order: 2, description: "Angles, triangles, circles, and proofs.", objectives: "Calculate angles in polygons; prove triangle congruence; apply circle theorems." },
    { id: 6, subjectId: 14, title: "Statistics", order: 3, description: "Data collection, representation, and interpretation.", objectives: "Construct frequency tables; draw bar charts and histograms; calculate mean, median, mode." },
    // Physics Lower Secondary
    { id: 7, subjectId: 15, title: "Forces and Motion", order: 1, description: "Newton's laws of motion and applications.", objectives: "State Newton's three laws; calculate force, mass, acceleration; explain inertia." },
    { id: 8, subjectId: 15, title: "Energy", order: 2, description: "Forms of energy, conservation, and transformation.", objectives: "Identify energy forms; explain conservation of energy; calculate work and power." },
    { id: 9, subjectId: 15, title: "Waves and Sound", order: 3, description: "Wave properties, sound propagation, and hearing.", objectives: "Differentiate transverse/longitudinal waves; calculate wave speed; explain echo." },
    // English
    { id: 10, subjectId: 2, title: "Grammar Fundamentals", order: 1, description: "Parts of speech, tenses, and sentence structure.", objectives: "Identify nouns, verbs, adjectives; use correct tenses; construct complex sentences." },
    { id: 11, subjectId: 2, title: "Composition Writing", order: 2, description: "Essay structure, descriptive and narrative writing.", objectives: "Plan an essay; write introductions and conclusions; use descriptive language." },
    { id: 12, subjectId: 2, title: "Comprehension", order: 3, description: "Reading and understanding passages.", objectives: "Extract main ideas; infer meaning; answer inferential questions." },
    // Kinyarwanda
    { id: 13, subjectId: 1, title: "Imibare y'Ururimi", order: 1, description: "Inyuguti, amagambo, n'imyubakire y'iyerekwa.", objectives: "Kumenya inyuguti n'amajwi; gukora interuro zinyuranye." },
    { id: 14, subjectId: 1, title: "Gusoma no Gusobanukirwa", order: 2, description: "Gusoma inyandiko no gusubiza ibibazo.", objectives: "Gusobanukirwa ibisomwa; gukurikirana ibintu; gusuzuma inyandiko." },
    // History
    { id: 15, subjectId: 34, title: "World War I", order: 1, description: "Causes, events, and consequences of WWI.", objectives: "Identify causes of WWI; describe major battles; explain the Treaty of Versailles." },
    { id: 16, subjectId: 34, title: "World War II", order: 2, description: "Global conflict, key figures, and post-war order.", objectives: "Analyze causes of WWII; evaluate impact of atomic bomb; explain UN formation." },
    { id: 17, subjectId: 34, title: "African Independence Movements", order: 3, description: "Decolonization and the rise of African nations.", objectives: "Trace independence timeline; analyze role of key leaders; evaluate challenges." },
    // Computer Science
    { id: 18, subjectId: 28, title: "Introduction to Computing", order: 1, description: "Computer hardware, software, and basic operations.", objectives: "Identify computer components; distinguish hardware/software; perform basic operations." },
    { id: 19, subjectId: 28, title: "Programming Basics", order: 2, description: "Algorithms, flowcharts, and introductory coding.", objectives: "Write simple algorithms; create flowcharts; write basic programs in Python." },
    { id: 20, subjectId: 28, title: "Internet and Networking", order: 3, description: "Network types, protocols, and safe internet use.", objectives: "Explain LAN/WAN; describe TCP/IP; practice internet safety." }
  ];

  const DEFAULT_TOPICS = [
    // Unit 1: Plants and Soil
    { id: 1, unitId: 1, title: "Parts of a Plant", order: 1, content: "Roots, stem, leaves, flowers, and their functions.", resources: [{ type: "video", url: "https://www.youtube.com/embed/8kK2zwjRV0M" }, { type: "pdf", title: "Plant Parts Diagram", url: "SET_P4_Plants_Diagram.pdf" }] },
    { id: 2, unitId: 1, title: "Soil Types", order: 2, content: "Sandy, clayey, loamy soils and their properties.", resources: [{ type: "image", url: "https://via.placeholder.com/400x200?text=Soil+Types" }] },
    // Unit 2: Water Conservation
    { id: 3, unitId: 2, title: "The Water Cycle", order: 1, content: "Evaporation, condensation, precipitation, collection.", resources: [{ type: "video", url: "https://www.youtube.com/embed/7D5b8LzH2v0" }] },
    { id: 4, unitId: 2, title: "Rainwater Harvesting", order: 2, content: "Collecting and storing rainwater for household and farm use.", resources: [{ type: "pdf", title: "Rainwater Harvesting Guide", url: "SET_Rainwater_Guide.pdf" }] },
    // Unit 4: Algebraic Expressions
    { id: 5, unitId: 4, title: "Linear Equations", order: 1, content: "Solving ax + b = c, word problems.", resources: [{ type: "video", url: "https://www.youtube.com/embed/grnP3mDuRIA" }] },
    { id: 6, unitId: 4, title: "Quadratic Factorization", order: 2, content: "Factoring ax² + bx + c = 0, finding roots.", resources: [{ type: "pdf", title: "Factorization Worksheet", url: "Math_S3_Quadratic_Factorization.pdf" }] },
    // Unit 7: Forces and Motion
    { id: 7, unitId: 7, title: "Newton's First Law", order: 1, content: "Inertia and balanced forces.", resources: [{ type: "video", url: "https://www.youtube.com/embed/kKKM8Y-u7ds" }] },
    { id: 8, unitId: 7, title: "Newton's Second Law", order: 2, content: "F=ma, calculations and experiments.", resources: [] },
    { id: 9, unitId: 7, title: "Newton's Third Law", order: 3, content: "Action-reaction pairs in everyday life.", resources: [] }
  ];

  const DEFAULT_SUBJECT_ASSIGNMENTS = [
    { id: 1, subjectId: 5, title: "Plant Diagram & Soil Properties", description: "Draw and label a plant diagram. State 2 properties of loamy soil.", dueDate: "2026-07-15", maxScore: 20, type: "homework" },
    { id: 2, subjectId: 14, title: "Quadratic Equations Problem Set", description: "Solve: x² - 5x + 6 = 0, and x² - 9 = 0. Show all working.", dueDate: "2026-07-20", maxScore: 25, type: "homework" },
    { id: 3, subjectId: 15, title: "Inertia Experiment Report", description: "State Newton's first law and describe an experiment showing inertia.", dueDate: "2026-07-22", maxScore: 30, type: "project" },
    { id: 4, subjectId: 2, title: "Descriptive Essay", description: "Write a 300-word descriptive essay about your favorite place.", dueDate: "2026-07-18", maxScore: 20, type: "essay" },
    { id: 5, subjectId: 12, title: "Python Variables Exercise", description: "Write a Python program that declares variables of different types and prints them.", dueDate: "2026-07-25", maxScore: 25, type: "programming" }
  ];

  const DEFAULT_SUBJECT_QUIZZES = [
    { id: 1, subjectId: 5, title: "Plants and Soil Quiz", questions: [
      { q: "Which part of the plant absorbs water from soil?", options: ["Leaves", "Roots", "Flowers", "Stem"], correct: 1 },
      { q: "Which soil is best for growing crops?", options: ["Sandy soil", "Clay soil", "Loamy soil", "Rock soil"], correct: 2 }
    ], timeLimit: 10, passScore: 60 },
    { id: 2, subjectId: 14, title: "Quadratic Equations Quiz", questions: [
      { q: "What are the roots of x² - 5x + 6 = 0?", options: ["x=2, x=3", "x=-2, x=-3", "x=1, x=6", "x=-1, x=-6"], correct: 0 },
      { q: "A quadratic equation always has degree of:", options: ["1", "2", "3", "4"], correct: 1 }
    ], timeLimit: 10, passScore: 60 },
    { id: 3, subjectId: 15, title: "Newton's Laws Quiz", questions: [
      { q: "What is inertia?", options: ["Resistance to change in motion", "Speed of moving objects", "Gravitational constant", "Friction coefficient"], correct: 0 },
      { q: "If net force acting on a body is zero, the body:", options: ["Must be at rest", "Must accelerate", "Stays in its current state of motion", "Stops instantly"], correct: 2 }
    ], timeLimit: 10, passScore: 60 }
  ];

  const DEFAULT_SUBJECT_PAST_PAPERS = [
    { id: 1, subjectId: 5, title: "SET Primary 4 - End of Term 1 Exam 2025", year: 2025, term: 1, fileUrl: "past_papers/SET_P4_T1_2025.pdf", type: "end_of_term" },
    { id: 2, subjectId: 5, title: "SET Primary 4 - End of Term 2 Exam 2025", year: 2025, term: 2, fileUrl: "past_papers/SET_P4_T2_2025.pdf", type: "end_of_term" },
    { id: 3, subjectId: 14, title: "Math S3 - National Examination 2024", year: 2024, term: 3, fileUrl: "past_papers/Math_S3_National_2024.pdf", type: "national" },
    { id: 4, subjectId: 25, title: "Physics S4 - End of Year Exam 2024", year: 2024, term: 3, fileUrl: "past_papers/Physics_S4_EOT_2024.pdf", type: "end_of_year" },
    { id: 5, subjectId: 10, title: "English S3 - Mock Exam 2025", year: 2025, term: 2, fileUrl: "past_papers/English_S3_Mock_2025.pdf", type: "mock" }
  ];

  const DEFAULT_COURSES = [
    // ── PRIMARY (P1–P6) ──
    { id: 1, title: "Early Literacy & Communication", subject: "English", level: "Primary", className: "P1", description: "Building foundational reading, writing, and oral communication skills for early learners.", instructorId: 20, duration: 40, enrollmentCount: 28, image: "", status: "active" },
    { id: 2, title: "Basic Numeracy Skills", subject: "Mathematics", level: "Primary", className: "P1", description: "Introduction to numbers, counting, shapes, and simple arithmetic.", instructorId: 19, duration: 40, enrollmentCount: 30, image: "", status: "active" },
    { id: 3, title: "Reading & Comprehension", subject: "English", level: "Primary", className: "P2", description: "Developing reading fluency and basic comprehension through stories.", instructorId: 20, duration: 40, enrollmentCount: 32, image: "", status: "active" },
    { id: 4, title: "Introduction to SET", subject: "Science and Elementary Technology (SET)", level: "Primary", className: "P2", description: "Exploring plants, animals, weather, and simple technology tools.", instructorId: 21, duration: 40, enrollmentCount: 30, image: "", status: "active" },
    { id: 5, title: "Grammar & Composition", subject: "English", level: "Primary", className: "P3", description: "Sentence structure, grammar rules, and basic paragraph writing.", instructorId: 20, duration: 45, enrollmentCount: 28, image: "", status: "active" },
    { id: 6, title: "Multiplication & Division", subject: "Mathematics", level: "Primary", className: "P3", description: "Mastering multiplication tables, division, and word problems.", instructorId: 19, duration: 45, enrollmentCount: 30, image: "", status: "active" },
    { id: 7, title: "Rwandan History & Culture", subject: "Social and Religious Studies (SRS)", level: "Primary", className: "P4", description: "Learning about Rwandan heritage, national symbols, and civic values.", instructorId: 22, duration: 45, enrollmentCount: 35, image: "", status: "active" },
    { id: 8, title: "Advanced SET Concepts", subject: "Science and Elementary Technology (SET)", level: "Primary", className: "P4", description: "Energy, water cycle, soil types, and basic digital tools.", instructorId: 21, duration: 45, enrollmentCount: 33, image: "", status: "active" },
    { id: 9, title: "Creative Arts & Craft", subject: "Creative Arts", level: "Primary", className: "P5", description: "Drawing, painting, modeling, and creative expression projects.", instructorId: 20, duration: 40, enrollmentCount: 30, image: "", status: "active" },
    { id: 10, title: "Fractions & Decimals", subject: "Mathematics", level: "Primary", className: "P5", description: "Understanding fractions, decimals, percentages, and their applications.", instructorId: 19, duration: 45, enrollmentCount: 32, image: "", status: "active" },
    { id: 11, title: "Essay & Composition Writing", subject: "English", level: "Primary", className: "P6", description: "Advanced writing skills including essays, letters, and creative stories.", instructorId: 20, duration: 45, enrollmentCount: 28, image: "", status: "active" },
    { id: 12, title: "Primary Leaving Exam Prep", subject: "Mathematics", level: "Primary", className: "P6", description: "Comprehensive review and exam preparation for the Primary Leaving Exam.", instructorId: 19, duration: 60, enrollmentCount: 35, image: "", status: "active" },

    // ── LOWER SECONDARY (S1–S3) ──
    { id: 13, title: "Algebra Fundamentals", subject: "Mathematics", level: "Lower Secondary", className: "S1", description: "Introduction to algebraic expressions, equations, and inequalities.", instructorId: 23, duration: 50, enrollmentCount: 40, image: "", status: "active" },
    { id: 14, title: "English Grammar & Comprehension", subject: "English", level: "Lower Secondary", className: "S1", description: "Advanced grammar, reading comprehension, and vocabulary building.", instructorId: 4, duration: 50, enrollmentCount: 38, image: "", status: "active" },
    { id: 15, title: "Introduction to General Science", subject: "General Science", level: "Lower Secondary", className: "S1", description: "Foundational concepts in biology, chemistry, and physics.", instructorId: 21, duration: 50, enrollmentCount: 42, image: "", status: "active" },
    { id: 16, title: "Rwandan & World History", subject: "History", level: "Lower Secondary", className: "S2", description: "Pre-colonial Rwanda, colonization, and world civilizations.", instructorId: 22, duration: 50, enrollmentCount: 35, image: "", status: "active" },
    { id: 17, title: "Geometry & Measurement", subject: "Mathematics", level: "Lower Secondary", className: "S2", description: "Angles, triangles, circles, area, volume, and geometric proofs.", instructorId: 23, duration: 50, enrollmentCount: 40, image: "", status: "active" },
    { id: 18, title: "Physical Geography", subject: "Geography", level: "Lower Secondary", className: "S2", description: "Map reading, climate, vegetation, and physical features of Rwanda.", instructorId: 22, duration: 50, enrollmentCount: 36, image: "", status: "active" },
    { id: 19, title: "Quadratic Equations & Functions", subject: "Mathematics", level: "Lower Secondary", className: "S3", description: "Quadratic equations, factorization, graphing, and word problems.", instructorId: 23, duration: 55, enrollmentCount: 38, image: "", status: "active" },
    { id: 20, title: "Entrepreneurship & Business", subject: "Entrepreneurship", level: "Lower Secondary", className: "S3", description: "Business planning, market research, and financial literacy.", instructorId: 4, duration: 50, enrollmentCount: 35, image: "", status: "active" },
    { id: 21, title: "Computer Programming Basics", subject: "Information and Communication Technology (ICT)", level: "Lower Secondary", className: "S3", description: "Algorithms, flowcharts, and introductory Python programming.", instructorId: 27, duration: 55, enrollmentCount: 30, image: "", status: "active" },

    // ── UPPER SECONDARY (S4–S6) ──
    { id: 22, title: "Advanced Calculus", subject: "Mathematics", level: "Upper Secondary", className: "S4", description: "Limits, derivatives, integration, and their real-world applications.", instructorId: 23, duration: 60, enrollmentCount: 25, image: "", status: "active" },
    { id: 23, title: "Newtonian Mechanics", subject: "Physics", level: "Upper Secondary", className: "S4", description: "Forces, motion, energy, and Newton's laws with practical experiments.", instructorId: 25, duration: 60, enrollmentCount: 28, image: "", status: "active" },
    { id: 24, title: "Organic Chemistry", subject: "Chemistry", level: "Upper Secondary", className: "S4", description: "Hydrocarbons, functional groups, reactions, and laboratory techniques.", instructorId: 26, duration: 60, enrollmentCount: 24, image: "", status: "active" },
    { id: 25, title: "Cell Biology & Genetics", subject: "Biology", level: "Upper Secondary", className: "S5", description: "Cell structure, DNA, genetics, heredity, and biotechnology.", instructorId: 24, duration: 60, enrollmentCount: 22, image: "", status: "active" },
    { id: 26, title: "Electromagnetism", subject: "Physics", level: "Upper Secondary", className: "S5", description: "Electric fields, circuits, magnetism, and electromagnetic induction.", instructorId: 25, duration: 60, enrollmentCount: 26, image: "", status: "active" },
    { id: 27, title: "Literature Analysis", subject: "Literature in English", level: "Upper Secondary", className: "S5", description: "Critical analysis of novels, poetry, and drama in English.", instructorId: 4, duration: 55, enrollmentCount: 20, image: "", status: "active" },
    { id: 28, title: "Macroeconomics", subject: "Economics", level: "Upper Secondary", className: "S6", description: "National income, inflation, trade, fiscal and monetary policy.", instructorId: 4, duration: 60, enrollmentCount: 18, image: "", status: "active" },
    { id: 29, title: "Data Structures & Algorithms", subject: "Computer Science", level: "Upper Secondary", className: "S6", description: "Arrays, linked lists, trees, sorting, and search algorithms.", instructorId: 27, duration: 60, enrollmentCount: 15, image: "", status: "active" },
    { id: 30, title: "National Exam Preparation", subject: "Mathematics", level: "Upper Secondary", className: "S6", description: "Comprehensive revision and past paper practice for national exams.", instructorId: 23, duration: 90, enrollmentCount: 30, image: "", status: "active" }
  ];

  const DEFAULT_MARKS = [
    // Pre-seeded marks for Alice (userId: 1)
    { id: 1, userId: 1, subjectId: 5, continuousAssessment: 26, assignment: 18, exam: 42, average: 86, position: 2 },
    { id: 2, userId: 1, subjectId: 14, continuousAssessment: 22, assignment: 15, exam: 38, average: 75, position: 5 },
    { id: 3, userId: 1, subjectId: 15, continuousAssessment: 28, assignment: 17, exam: 45, average: 90, position: 1 }
  ];

  const DEFAULT_ANNOUNCEMENTS = [
    {
      id: 1,
      title: "HON Academy Announces Term 1 Academic Opening Date",
      summary: "HON Academy is pleased to announce the official opening date for Term 1. All students, parents, and teachers are encouraged to prepare for a successful academic year.",
      content: "<p>Dear HON Academy Community,</p><p>We are excited to announce that the new academic term will officially begin on <strong>Monday, 7 September 2026</strong>.</p><p><strong>Students are reminded to:</strong></p><ul><li>Complete all holiday assignments.</li><li>Prepare required learning materials.</li><li>Report on time on the opening day.</li></ul><p>Parents are encouraged to support learners by ensuring they are ready for the new term.</p><p>We wish all learners a successful and productive academic journey.</p><p><strong>HON Academy Administration</strong></p>",
      category: "Academic Announcement",
      createdBy: 3,
      createdAt: "2026-07-17T08:00:00Z",
      visibility: "public",
      priority: "important",
      pinned: true,
      status: "published",
      publishDate: "2026-07-17T08:00:00Z",
      expiryDate: "2026-09-30T23:59:00Z",
      tags: "term-1,academic-calendar,opening-date,students,parents",
      authors: ["HON Academy Administration"],
      authorName: "HON Academy Administration",
      attachments: [
        { id: 101, name: "Term 1 Academic Calendar.pdf", type: "document", url: "https://example.com/calendars/term1-calendar-2026.pdf", size: "1.2 MB", downloadCount: 567, createdAt: "2026-07-17T08:00:00Z" }
      ],
      media: [
        { id: 201, type: "image", url: "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=800&h=400&fit=crop", title: "Academic Calendar Poster", alt: "Term 1 Academic Calendar 2026" },
        { id: 202, type: "video", url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4", title: "Welcome Back Message", poster: "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=800&h=400&fit=crop" }
      ],
      date: "2026-07-17",
      isVisible: true
    },
    {
      id: 2,
      title: "HON Academy Students Excel in Science and Mathematics Competition",
      summary: "HON Academy celebrates outstanding student performance during the recent Science and Mathematics competition.",
      content: "<p>HON Academy proudly congratulates our students who demonstrated exceptional creativity, problem-solving skills, and scientific innovation during the Science and Mathematics Competition.</p><p>The competition aimed to promote:</p><ul><li>STEM learning</li><li>Creativity</li><li>Collaboration</li><li>Critical thinking</li></ul><p>We appreciate our teachers, parents, and partners for supporting learners' success.</p>",
      category: "Achievement & Recognition",
      createdBy: 3,
      createdAt: "2026-07-15T10:00:00Z",
      visibility: "public",
      priority: "normal",
      status: "published",
      publishDate: "2026-07-15T10:00:00Z",
      expiryDate: null,
      tags: "competition,stem,achievement,students,mathematics,science",
      authors: ["Academic Department"],
      authorName: "Academic Department",
      attachments: [],
      media: [
        { id: 301, type: "image", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop", title: "Competition Winners", alt: "Students holding awards" },
        { id: 302, type: "image", url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=400&fit=crop", title: "Students Presenting Projects", alt: "Students presenting their projects" },
        { id: 303, type: "video", url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4", title: "Competition Highlights", poster: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop" },
        { id: 304, type: "audio", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", title: "Student Success Interview" }
      ],
      date: "2026-07-15",
      isVisible: true
    },
    {
      id: 3,
      title: "New Digital Library Resources Available for Students",
      summary: "New digital learning materials have been uploaded to the HON Academy Digital Library.",
      content: "<p>The ICT Department is happy to announce the availability of new digital resources designed to support teaching and learning.</p><p><strong>New resources include:</strong></p><ul><li>Mathematics revision materials</li><li>Science practical videos</li><li>E-books</li><li>Past examination papers</li><li>Interactive learning resources</li></ul><p>Students and teachers can access these materials through the Digital Library portal.</p>",
      category: "Digital Learning",
      createdBy: 3,
      createdAt: "2026-07-10T09:00:00Z",
      visibility: "school_community",
      priority: "normal",
      status: "published",
      publishDate: "2026-07-10T09:00:00Z",
      expiryDate: "2026-12-31T23:59:00Z",
      tags: "digital-library,resources,elearning,mathematics,science",
      authors: ["ICT Department"],
      authorName: "ICT Department",
      attachments: [
        { id: 401, name: "Mathematics Revision Book.pdf", type: "document", url: "https://example.com/resources/math-revision.pdf", size: "3.5 MB", downloadCount: 234, createdAt: "2026-07-10T09:00:00Z" },
        { id: 402, name: "Biology Practical Guide.pdf", type: "document", url: "https://example.com/resources/biology-practical-guide.pdf", size: "2.1 MB", downloadCount: 189, createdAt: "2026-07-10T09:00:00Z" }
      ],
      media: [
        { id: 501, type: "video", url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4", title: "Chemistry Experiment Demonstration", poster: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=400&fit=crop" },
        { id: 502, type: "audio", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", title: "Science Revision Podcast" }
      ],
      date: "2026-07-10",
      isVisible: true
    },
    {
      id: 4,
      title: "Teacher Professional Development Workshop",
      summary: "HON Academy will conduct a professional development workshop focusing on innovative teaching methods and ICT integration.",
      content: "<p>All teachers are invited to participate in a professional development workshop covering:</p><ul><li>Digital teaching strategies</li><li>Assessment improvement</li><li>Artificial Intelligence in education</li><li>Student-centered learning approaches</li></ul><p>The workshop will take place in the HON Academy ICT Laboratory.</p>",
      category: "Staff Development",
      createdBy: 3,
      createdAt: "2026-07-05T14:00:00Z",
      visibility: "teachers_only",
      priority: "important",
      status: "published",
      publishDate: "2026-07-05T14:00:00Z",
      expiryDate: "2026-07-25T23:59:00Z",
      tags: "teachers,workshop,professional-development,ict,teaching",
      authors: ["School Management"],
      authorName: "School Management",
      attachments: [
        { id: 601, name: "Workshop Program.pdf", type: "document", url: "https://example.com/workshops/program.pdf", size: "450 KB", downloadCount: 78, createdAt: "2026-07-05T14:00:00Z" }
      ],
      media: [
        { id: 701, type: "video", url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4", title: "Previous Workshop Highlights", poster: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=400&fit=crop" },
        { id: 702, type: "audio", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", title: "Trainer Introduction Audio" }
      ],
      date: "2026-07-05",
      isVisible: true
    },
    {
      id: 5,
      title: "Parent Meeting Announcement",
      summary: "HON Academy invites parents and guardians to attend the upcoming academic progress meeting.",
      content: "<p>Dear Parents and Guardians,</p><p>You are invited to attend our upcoming parent meeting where we will discuss:</p><ul><li>Student academic progress</li><li>School activities</li><li>Learner support strategies</li><li>Upcoming events</li></ul><p>Your partnership is important in helping students achieve success.</p>",
      category: "Parents & Community",
      createdBy: 3,
      createdAt: "2026-07-01T10:00:00Z",
      visibility: "parents_only",
      priority: "urgent",
      status: "published",
      publishDate: "2026-07-01T10:00:00Z",
      expiryDate: "2026-07-20T23:59:00Z",
      tags: "parents,meeting,academic-progress,community",
      authors: ["School Administration"],
      authorName: "School Administration",
      attachments: [
        { id: 801, name: "Meeting Agenda.pdf", type: "document", url: "https://example.com/meetings/parent-agenda.pdf", size: "320 KB", downloadCount: 145, createdAt: "2026-07-01T10:00:00Z" }
      ],
      media: [
        { id: 901, type: "image", url: "https://images.unsplash.com/photo-1577896851231-70acf6940ec3?w=800&h=400&fit=crop", title: "Meeting Poster", alt: "Parent Meeting Announcement" },
        { id: 902, type: "video", url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4", title: "School Activities Video", poster: "https://images.unsplash.com/photo-1577896851231-70acf6940ec3?w=800&h=400&fit=crop" }
      ],
      date: "2026-07-01",
      isVisible: true
    },
    {
      id: 6,
      title: "Remedial Program Notice",
      summary: "Parents are requested to send their children to the remedial program starting this week.",
      content: "<p>Dear Parents and Guardians,</p><p>This is to inform you that the school is organizing a <strong>Remedial Program</strong> to support students who need extra academic assistance.</p><p><strong>Program Details:</strong></p><ul><li><strong>Start Date:</strong> Monday, 14 July 2026</li><li><strong>Schedule:</strong> Monday to Friday, 2:00 PM - 4:00 PM</li><li><strong>Duration:</strong> 4 weeks</li></ul><p>Parents are kindly requested to ensure their children attend this program regularly. It is an opportunity to strengthen understanding in core subjects including Mathematics, English, and Science.</p><p>For more information, please contact the Academic Office.</p><p><strong>NCA School Administration</strong></p>",
      category: "Academic Announcement",
      createdBy: 3,
      createdAt: "2026-07-11T08:00:00Z",
      visibility: "public",
      priority: "urgent",
      pinned: true,
      status: "published",
      publishDate: "2026-07-11T08:00:00Z",
      expiryDate: "2026-08-15T23:59:00Z",
      tags: "remedial,parents,academic-support,students",
      authors: ["NCA School Administration"],
      authorName: "NCA School Administration",
      attachments: [],
      media: [],
      date: "2026-07-11",
      isVisible: true
    },
    {
      id: 7,
      title: "Welcome to NCA School E-Learning Platform!",
      summary: "Welcome all teachers and students to our new unified digital LMS platform. Explore subjects and view lessons.",
      content: "<p>Dear NCA School Community,</p><p>We are delighted to welcome you to the new <strong>NCA School E-Learning Platform</strong> — a unified digital learning management system designed to enhance teaching and learning experiences.</p><p><strong>What you can do on this platform:</strong></p><ul><li>Browse and enroll in courses</li><li>Access digital library resources</li><li>View lessons and learning materials</li><li>Track academic progress and grades</li><li>Receive announcements and notifications</li></ul><p>We encourage all teachers and students to explore the platform and make the most of the available resources.</p><p>Welcome aboard and happy learning!</p><p><strong>NCA School Administration</strong></p>",
      category: "General Announcement",
      createdBy: 3,
      createdAt: "2026-07-01T08:00:00Z",
      visibility: "public",
      priority: "normal",
      pinned: true,
      status: "published",
      publishDate: "2026-07-01T08:00:00Z",
      expiryDate: null,
      tags: "welcome,elearning,platform,students,teachers",
      authors: ["NCA School Administration"],
      authorName: "NCA School Administration",
      attachments: [],
      media: [],
      date: "2026-07-01",
      isVisible: true
    },
    {
      id: 8,
      title: "Term 2 Mid-Exam Timetable",
      summary: "The midterm exams for Primary 4-6 and Senior 1-4 will commence on July 15th. Please check subject lists.",
      content: "<p>Dear Students and Teachers,</p><p>Please be informed that the <strong>Term 2 Mid-Examinations</strong> will commence as scheduled.</p><p><strong>Exam Schedule:</strong></p><ul><li><strong>Start Date:</strong> Tuesday, 15 July 2026</li><li><strong>End Date:</strong> Friday, 25 July 2026</li><li><strong>Affected Classes:</strong> Primary 4-6 and Senior 1-4</li></ul><p>Students are advised to:</p><ul><li>Review all subjects covered this term</li><li>Prepare examination materials in advance</li><li>Arrive on time for each paper</li></ul><p>Detailed subject timetables have been posted on the notice board and are available in the student portal.</p><p><strong>NCA Academic Department</strong></p>",
      category: "Academic Announcement",
      createdBy: 3,
      createdAt: "2026-07-07T10:00:00Z",
      visibility: "public",
      priority: "important",
      pinned: false,
      status: "published",
      publishDate: "2026-07-07T10:00:00Z",
      expiryDate: "2026-07-25T23:59:00Z",
      tags: "exams,timetable,midterm,students,teachers",
      authors: ["NCA Academic Department"],
      authorName: "NCA Academic Department",
      attachments: [],
      media: [],
      date: "2026-07-07",
      isVisible: true
    },
    {
      id: 9,
      title: "Parent-Teacher Committee Meeting",
      summary: "NCA Parent-Teacher Association meeting will be held in the main assembly hall this Friday at 2:00 PM.",
      content: "<p>Dear Parents and Guardians,</p><p>You are cordially invited to the <strong>NCA Parent-Teacher Association (PTA) Meeting</strong>.</p><p><strong>Meeting Details:</strong></p><ul><li><strong>Date:</strong> Friday, 11 July 2026</li><li><strong>Time:</strong> 2:00 PM - 4:00 PM</li><li><strong>Venue:</strong> Main Assembly Hall</li></ul><p><strong>Agenda:</strong></p><ul><li>Student academic progress report</li><li>School development updates</li><li>Upcoming events and activities</li><li>Parent-teacher collaboration strategies</li></ul><p>Your attendance and participation are highly valued as we work together to support our students.</p><p><strong>NCA School Administration</strong></p>",
      category: "Parents & Community",
      createdBy: 3,
      createdAt: "2026-07-08T09:00:00Z",
      visibility: "public",
      priority: "important",
      pinned: false,
      status: "published",
      publishDate: "2026-07-08T09:00:00Z",
      expiryDate: "2026-07-12T23:59:00Z",
      tags: "parents,meeting,pta,community,teachers",
      authors: ["NCA School Administration"],
      authorName: "NCA School Administration",
      attachments: [],
      media: [],
      date: "2026-07-08",
      isVisible: true
    },
    {
      id: 10,
      title: "S1 Field Trip Permission Slip",
      summary: "All Senior 1 students must submit signed permission slips for the science field trip to the Natural History Museum by July 18th.",
      content: "<p>Dear Senior 1 Students and Parents,</p><p>We are pleased to announce a <strong>Science Field Trip</strong> to the <strong>Natural History Museum</strong> for all Senior 1 students.</p><p><strong>Trip Details:</strong></p><ul><li><strong>Date:</strong> Monday, 21 July 2026</li><li><strong>Departure:</strong> 7:00 AM sharp from school premises</li><li><strong>Return:</strong> 4:00 PM</li><li><strong>Destination:</strong> Natural History Museum</li></ul><p><strong>Important:</strong> All students must submit a signed permission slip by <strong>18 July 2026</strong>. Permission slips are available from the class teacher.</p><p>Students should bring:</p><ul><li>Notebook and pen</li><li>Packed lunch and water</li><li>Appropriate footwear</li></ul><p>For any inquiries, please contact the Science Department.</p><p><strong>NCA Science Department</strong></p>",
      category: "Event",
      createdBy: 3,
      createdAt: "2026-07-11T11:00:00Z",
      visibility: "public",
      priority: "urgent",
      pinned: false,
      status: "published",
      publishDate: "2026-07-11T11:00:00Z",
      expiryDate: "2026-07-21T23:59:00Z",
      tags: "field-trip,science,senior-1,students,permission",
      authors: ["NCA Science Department"],
      authorName: "NCA Science Department",
      attachments: [],
      media: [],
      date: "2026-07-11",
      isVisible: true
    },
    {
      id: 11,
      title: "System Maintenance Notice",
      summary: "The HON-ACADEMY platform will undergo scheduled maintenance on Saturday July 13th from 10:00 PM to 2:00 AM.",
      content: "<p>Dear NCA School Community,</p><p>Please be advised that the <strong>HON-ACADEMY E-Learning Platform</strong> will undergo scheduled maintenance.</p><p><strong>Maintenance Window:</strong></p><ul><li><strong>Date:</strong> Saturday, 13 July 2026</li><li><strong>Time:</strong> 10:00 PM - 2:00 AM (next day)</li></ul><p>During this period, some features of the platform may be temporarily unavailable. We recommend saving your work before the maintenance window begins.</p><p>We apologize for any inconvenience this may cause and appreciate your understanding as we work to improve the platform.</p><p><strong>ICT Department</strong></p>",
      category: "System Announcement",
      createdBy: 3,
      createdAt: "2026-07-09T15:00:00Z",
      visibility: "public",
      priority: "normal",
      pinned: false,
      status: "published",
      publishDate: "2026-07-09T15:00:00Z",
      expiryDate: "2026-07-14T23:59:00Z",
      tags: "maintenance,system,platform,notice",
      authors: ["ICT Department"],
      authorName: "ICT Department",
      attachments: [],
      media: [],
      date: "2026-07-09",
      isVisible: true
    }
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
    // Auto-merge genuinely new seed data (items with IDs beyond existing range).
    // Does NOT resurrect items that were intentionally deleted.
    if (Array.isArray(parsedData) && parsedData.length > 0) {
      const maxParsedId = Math.max(...parsedData.map(function(p) { return p.id != null ? Number(p.id) : 0; }), 0);
      const newItems = defaults.filter(function(d) { var id = Number(d.id); return id > 0 && id > maxParsedId && !parsedData.some(function(pd) { return Number(pd.id) === id; }); });
      if (newItems.length > 0) {
        var merged = parsedData.concat(newItems);
        localStorage.setItem(key, JSON.stringify(merged));
        return merged;
      }
    } else if (Array.isArray(parsedData) && parsedData.length === 0 && defaults.length > 0) {
      localStorage.setItem(key, JSON.stringify(defaults));
      return defaults;
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
      if (userData.email) {
        const existing = users.find(u => u.email && u.email.toLowerCase() === userData.email.toLowerCase());
        if (existing) return { error: 'A user with this email already exists.' };
      }
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      const newUser = {
        id: newId,
        createdAt: new Date().toISOString(),
        classId: null,
        subjectIds: [],
        assignedSubjectIds: [],
        assignedClassIds: [],
        ...userData
      };
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

    // ─── Digital Library - Enhanced Visibility ───────────────────────────────
    DL_VISIBILITY_OPTIONS: [
      'public','school_community','teachers_only','students_only','parents_only',
      'nursery_only','primary_only','lower_secondary_only','upper_secondary_only',
      'tvet_only','specific_class','specific_stream','specific_subject','specific_group'
    ],
    DL_LEVELS: ['Nursery','Primary','Lower Secondary','Upper Secondary','TVET'],

    // Check if current user can access a resource based on its visibility
    canAccessResource: (resource) => {
      if (!resource) return false;
      var user = window.rbac ? window.rbac.getCurrentUser() : db.getCurrentUser();
      if (!user) return resource.visibility === 'public';
      var role = user.role;
      if (role === 'admin') return true;
      var vis = resource.visibility || 'public';
      if (vis === 'public') return true;
      if (vis === 'school_community') return true;
      if (vis === 'teachers_only' && role === 'teacher') return true;
      if (vis === 'students_only' && role === 'student') return true;
      if (vis === 'parents_only' && role === 'parent') return true;
      if (vis === 'nursery_only' && resource.level === 'Nursery') return true;
      if (vis === 'primary_only' && resource.level === 'Primary') return true;
      if (vis === 'lower_secondary_only' && resource.level === 'Lower Secondary') return true;
      if (vis === 'upper_secondary_only' && resource.level === 'Upper Secondary') return true;
      if (vis === 'tvet_only' && resource.level === 'TVET') return true;
      if (vis === 'specific_class' && resource.className) {
        if (role === 'student') return user.gradeClass === resource.className;
        if (role === 'teacher') return true;
      }
      if (vis === 'specific_subject' && resource.subjectId) {
        if (role === 'student') return (user.subjectIds||[]).indexOf(Number(resource.subjectId)) !== -1;
        if (role === 'teacher') return (user.assignedSubjectIds||[]).indexOf(Number(resource.subjectId)) !== -1;
      }
      return role === 'admin';
    },

    // Get all library resources merged from all stores, with RBAC filtering
    getDigitalLibraryResources: (includeArchived) => {
      // Run schedule check first
      db.checkResourceSchedules();
      var all = [];
      // 1. From public resources system (db_resources)
      var publicRes = db.getAllResources() || [];
      var user = window.rbac ? window.rbac.getCurrentUser() : db.getCurrentUser();
      var role = user ? user.role : null;
      publicRes.forEach(function(r) {
        if (!includeArchived && r.status === 'archived') return;
        if (r.status === 'draft' && role !== 'admin') return;
        // Derive level from className if not set
        var level = r.level || '';
        if (!level && r.className) {
          if (/^N/i.test(r.className)) level = 'Nursery';
          else if (/^P\d/i.test(r.className)) level = 'Primary';
          else if (/^S[1-3]/i.test(r.className)) level = 'Lower Secondary';
          else if (/^S[4-6]/i.test(r.className)) level = 'Upper Secondary';
          else if (/^TVET/i.test(r.className)) level = 'TVET';
        }
        all.push({ store: 'db_resources', source: 'library', level: level, className: r.className || '', unitId: r.unitId || null, topicId: r.topicId || null, ...r });
      });
      // 2. From subject books (db_books)
      var books = getOrInit('db_books', []);
      var subjects = db.getSubjects();
      books.forEach(function(b) {
        if (!includeArchived && (b.status||'active') === 'archived') return;
        var subject = subjects.find(function(s) { return s.id === Number(b.subjectId); });
        var level = subject ? subject.level : '';
        var className = b.className || '';
        all.push({ store: 'db_books', source: 'subject_resource', id: 'book_'+b.id, title: b.title, description: b.description || 'Subject learning resource', category: 'Learning Resource', fileType: b.fileType || 'PDF', fileSize: b.fileSize || '~1 MB', fileName: b.fileName || 'resource.pdf', fileUrl: b.fileUrl || '', subjectId: b.subjectId, subject: subject ? subject.title : 'General', level: level, className: className, unitId: b.unitId || null, topicId: b.topicId || null, uploadedBy: b.uploadedBy || 'Teacher', uploadedAt: b.uploadedAt || '', createdAt: b.uploadedAt || new Date().toISOString(), views: b.views || 0, downloads: b.downloads || 0, visibility: b.visibility || 'school_community', status: b.status || 'active', previewEnabled: true, downloadsEnabled: true, featured: false, pinned: false });
      });
      // 3. From past papers
      var papers = getOrInit('db_subject_past_papers', []);
      papers.forEach(function(p) {
        if (!includeArchived && (p.status||'active') === 'archived') return;
        var subject = subjects.find(function(s) { return s.id === Number(p.subjectId); });
        var level = subject ? subject.level : '';
        all.push({ store: 'db_subject_past_papers', source: 'past_paper', id: 'paper_'+p.id, title: p.title, description: 'Past examination paper - Term '+(p.term||1)+' '+p.year, category: 'Past Paper', fileType: 'PDF', fileSize: '~1.5 MB', fileName: (p.title||'past_paper').replace(/\s+/g,'_')+'.pdf', fileUrl: p.fileUrl || '', subjectId: p.subjectId, subject: subject ? subject.title : 'General', level: level, className: '', unitId: null, topicId: null, uploadedBy: 'Examinations Office', uploadedAt: new Date(p.year,0,1).toISOString(), createdAt: new Date(p.year,0,1).toISOString(), views: p.views || 0, downloads: p.downloads || 0, visibility: p.visibility || 'school_community', status: p.status || 'active', previewEnabled: true, downloadsEnabled: true, featured: false, pinned: false, year: p.year, term: p.term });
      });
      return all;
    },

    // Get viewable resources for current user based on role
    getViewableDigitalLibraryResources: (includeArchived) => {
      var all = db.getDigitalLibraryResources(includeArchived);
      return all.filter(function(r) { return db.canAccessResource(r); });
    },

    // ─── Schedule Checker ────────────────────────────────────────────────────
    checkResourceSchedules: () => {
      var resources = db.getAllResources();
      var now = new Date();
      var changed = false;
      resources.forEach(function(r) {
        if (r.publishDate && r.status === 'draft') {
          if (new Date(r.publishDate) <= now) {
            r.status = 'active';
            if (!r.publishedAt) r.publishedAt = now.toISOString();
            changed = true;
          }
        }
        if (r.expiryDate && r.status === 'active') {
          if (new Date(r.expiryDate) <= now) {
            r.status = 'expired';
            if (!r.expiredAt) r.expiredAt = now.toISOString();
            changed = true;
          }
        }
      });
      if (changed) save('db_resources', resources);
    },

    // ─── Resource Search (enhanced for Digital Library) ──────────────────────
    searchDigitalLibrary: (query, filters) => {
      var resources = db.getViewableDigitalLibraryResources();
      if (query && query.trim()) {
        var q = query.toLowerCase();
        resources = resources.filter(function(r) {
          return (r.title||'').toLowerCase().includes(q) ||
                 (r.subject||'').toLowerCase().includes(q) ||
                 (r.description||'').toLowerCase().includes(q) ||
                 (r.category||'').toLowerCase().includes(q) ||
                 (r.className||'').toLowerCase().includes(q) ||
                 (r.uploadedBy||'').toLowerCase().includes(q) ||
                 (r.tags||'').toLowerCase().includes(q) ||
                 (r.keywords||'').toLowerCase().includes(q);
        });
      }
      if (filters) {
        if (filters.level) resources = resources.filter(function(r) { return (r.level||'') === filters.level; });
        if (filters.className) resources = resources.filter(function(r) { return (r.className||'') === filters.className; });
        if (filters.subject) resources = resources.filter(function(r) { return (r.subject||'') === filters.subject; });
        if (filters.subjectId) resources = resources.filter(function(r) { return Number(r.subjectId) === Number(filters.subjectId); });
        if (filters.category) resources = resources.filter(function(r) { return (r.category||'') === filters.category; });
        if (filters.fileType) resources = resources.filter(function(r) { return (r.fileType||'').toLowerCase() === filters.fileType.toLowerCase(); });
        if (filters.unitId) resources = resources.filter(function(r) { return Number(r.unitId) === Number(filters.unitId); });
        if (filters.topicId) resources = resources.filter(function(r) { return Number(r.topicId) === Number(filters.topicId); });
        if (filters.academicYear) resources = resources.filter(function(r) { return (r.year||'') === filters.academicYear || (r.academicYear||'') === filters.academicYear; });
        if (filters.term) resources = resources.filter(function(r) { return Number(r.term) === Number(filters.term); });
        if (filters.visibility) resources = resources.filter(function(r) { return (r.visibility||'') === filters.visibility; });
        if (filters.uploadedBy) resources = resources.filter(function(r) { return (r.uploadedBy||'').toLowerCase().includes(filters.uploadedBy.toLowerCase()); });
        if (filters.source) resources = resources.filter(function(r) { return r.source === filters.source; });
        if (filters.store) resources = resources.filter(function(r) { return r.store === filters.store; });
      }
      var sort = (filters && filters.sort) || 'newest';
      var sorters = {
        newest: function(a,b) { return new Date(b.createdAt||b.uploadedAt) - new Date(a.createdAt||a.uploadedAt); },
        oldest: function(a,b) { return new Date(a.createdAt||a.uploadedAt) - new Date(b.createdAt||b.uploadedAt); },
        downloads: function(a,b) { return (b.downloads||0) - (a.downloads||0); },
        views: function(a,b) { return (b.views||0) - (a.views||0); },
        alpha: function(a,b) { return (a.title||'').localeCompare(b.title||''); },
        size: function(a,b) { return ((b.fileSize||'0').replace(/[^0-9.]/g,'')||0) - ((a.fileSize||'0').replace(/[^0-9.]/g,'')||0); }
      };
      resources.sort(sorters[sort] || sorters.newest);
      return resources;
    },

    // ─── Digital Library Stats ───────────────────────────────────────────────
    getDigitalLibraryStats: () => {
      var all = db.getDigitalLibraryResources(true);
      var active = all.filter(function(r) { return r.status !== 'archived' && r.status !== 'expired'; });
      return {
        total: all.length,
        active: active.length,
        archived: all.filter(function(r) { return r.status === 'archived'; }).length,
        expired: all.filter(function(r) { return r.status === 'expired'; }).length,
        draft: all.filter(function(r) { return r.status === 'draft'; }).length,
        totalViews: all.reduce(function(s,r) { return s + (r.views||0); }, 0),
        totalDownloads: all.reduce(function(s,r) { return s + (r.downloads||0); }, 0),
        byLevel: (function() { var o={}; all.forEach(function(r) { var l=r.level||'Unknown'; o[l]=(o[l]||0)+1; }); return o; })(),
        byType: (function() { var o={}; all.forEach(function(r) { var t=r.category||'Other'; o[t]=(o[t]||0)+1; }); return o; })()
      };
    },

    // ─── Ensure Digital Library Sample Resources ───────────────────────────
    ensureDigitalLibrarySamples: () => {
      var existing = db.getAllResources();
      if (existing.length >= 20) return;
      var samples = [
        { title:'P4 Mathematics - Number Operations', description:'Comprehensive lesson notes on addition, subtraction, multiplication and division for Primary 4.', category:'Learning Resource', fileType:'pdf', fileSize:'2.4 MB', fileName:'P4_Math_Number_Operations.pdf', visibility:'public', level:'Primary', className:'P4', subjectId:4, subject:'Mathematics', unitId:null, topicId:null, featured:true, uploadedBy:'Mr. Habimana Jean', previewEnabled:true, downloadsEnabled:true },
        { title:'S2 Biology - Cell Structure & Function', description:'Detailed notes and diagrams on plant and animal cell structures for Senior 2.', category:'Learning Resource', fileType:'pdf', fileSize:'3.1 MB', fileName:'S2_Biology_Cell_Structure.pdf', visibility:'public', level:'Lower Secondary', className:'S2', subjectId:15, subject:'General Science', unitId:null, topicId:null, featured:true, uploadedBy:'Mme. Uwimana Alice', previewEnabled:true, downloadsEnabled:true },
        { title:'S5 Physics - Electromagnetism Video', description:'Video lesson covering electromagnetic induction, Faraday\'s law, and Lenz\'s law.', category:'Lesson Video', fileType:'mp4', fileSize:'48 MB', fileName:'S5_Physics_Electromagnetism.mp4', visibility:'school_community', level:'Upper Secondary', className:'S5', subjectId:25, subject:'Physics', unitId:null, topicId:null, featured:true, uploadedBy:'Dr. Ndagijimana F.', previewEnabled:true, downloadsEnabled:true },
        { title:'S4 English - Essay Writing Guide', description:'Step-by-step guide to writing argumentative, descriptive, and narrative essays.', category:'Learning Resource', fileType:'pdf', fileSize:'1.8 MB', fileName:'S4_English_Essay_Guide.pdf', visibility:'public', level:'Upper Secondary', className:'S4', subjectId:29, subject:'English', unitId:null, topicId:null, featured:false, uploadedBy:'Mr. Mugisha D.', previewEnabled:true, downloadsEnabled:true },
        { title:'P6 SET - Plants and Photosynthesis', description:'Interactive lesson on photosynthesis, plant parts, and their functions.', category:'Learning Resource', fileType:'pptx', fileSize:'2.2 MB', fileName:'P6_SET_Photosynthesis.pptx', visibility:'public', level:'Primary', className:'P6', subjectId:5, subject:'Science and Elementary Technology (SET)', unitId:null, topicId:null, featured:false, uploadedBy:'Mme. Mukamana C.', previewEnabled:true, downloadsEnabled:true },
        { title:'S3 Mathematics - Quadratic Equations', description:'Solving quadratic equations by factorization, completing square, and formula method.', category:'Lesson Notes', fileType:'pdf', fileSize:'1.5 MB', fileName:'S3_Math_Quadratic_Equations.pdf', visibility:'school_community', level:'Lower Secondary', className:'S3', subjectId:14, subject:'Mathematics', unitId:null, topicId:null, featured:false, uploadedBy:'Mr. Habimana Jean', previewEnabled:true, downloadsEnabled:true },
        { title:'TVET Plumbing - Pipe Fitting Manual', description:'Practical manual covering pipe cutting, threading, joining, and installation techniques.', category:'Practical Manual', fileType:'pdf', fileSize:'4.2 MB', fileName:'Plumbing_Pipe_Fitting_Manual.pdf', visibility:'public', level:'TVET', className:'TVET', subjectId:50, subject:'Plumbing', unitId:null, topicId:null, featured:false, uploadedBy:'Mr. Niyonzima T.', previewEnabled:true, downloadsEnabled:true },
        { title:'Nursery - Alphabet Learning Video', description:'Fun and engaging video teaching nursery children the alphabet with songs.', category:'Lesson Video', fileType:'mp4', fileSize:'25 MB', fileName:'Nursery_Alphabet_Song.mp4', visibility:'public', level:'Nursery', className:'Nursery', subjectId:null, subject:'Literacy', unitId:null, topicId:null, featured:true, uploadedBy:'Mme. Uwimana Alice', previewEnabled:true, downloadsEnabled:true },
        { title:'S6 History - World War II', description:'Comprehensive notes on causes, key events, and consequences of World War II.', category:'Learning Resource', fileType:'pdf', fileSize:'3.6 MB', fileName:'S6_History_WWII.pdf', visibility:'school_community', level:'Upper Secondary', className:'S6', subjectId:34, subject:'History', unitId:null, topicId:null, featured:false, uploadedBy:'Mr. Mugisha D.', previewEnabled:true, downloadsEnabled:true },
        { title:'S5 Chemistry - Organic Chemistry Reactions', description:'Detailed reaction mechanisms for alkanes, alkenes, alcohols, and carboxylic acids.', category:'Learning Resource', fileType:'pdf', fileSize:'2.9 MB', fileName:'S5_Chemistry_Organic_Reactions.pdf', visibility:'teachers_only', level:'Upper Secondary', className:'S5', subjectId:26, subject:'Chemistry', unitId:null, topicId:null, featured:false, uploadedBy:'Dr. Ndagijimana F.', previewEnabled:true, downloadsEnabled:true }
      ];
      samples.forEach(function(s) { db.createResource(s); });
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
      motto: 'Excellence in education, Success in Life',
      established: '2018',
      badge: 'Rwanda Education Board Compliant',
      logoUrl: 'IMAGES/WhatsApp Image 2026-07-18 at 9.51.59 AM.jpeg',
      address: 'KG 7 Avenue, Kigali, Rwanda',
      phone: '+250 791 684 429',
      email: 'info@hon-academy.rw',
      website: 'https://hon-academy.rw',
      officeHours: 'Mon - Fri: 08:00 AM - 05:00 PM | Sat: 08:00 AM - 12:00 PM',
      heroTitle: 'Welcome to HON-ACADEMY',
      heroSubtitle: 'Excellence in education \u2022 Success in Life',
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
      const parsed = JSON.parse(info);
      // Merge with defaults so every field has a fallback
      let changed = false;
      Object.keys(db.DEFAULT_SCHOOL_INFO).forEach(function(k) {
        if (parsed[k] === undefined || parsed[k] === null) {
          parsed[k] = db.DEFAULT_SCHOOL_INFO[k];
          changed = true;
        }
      });
      if (changed) save('cms_school_info', parsed);
      return parsed;
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

    // ─── CMS: News and Events ───────────────────────────────────────────────────
    getNews: () => getOrInit('cms_news', []),
    getNewsById: (id) => db.getNews().find(n => n.id === Number(id)),
    createNews: (newsData) => {
      const news = db.getNews();
      const newId = news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1;
      const newNews = { id: newId, createdAt: new Date().toISOString(), ...newsData };
      news.push(newNews);
      save('cms_news', news);
      return newNews;
    },
    updateNews: (id, updates) => {
      const news = db.getNews();
      const index = news.findIndex(n => n.id === Number(id));
      if (index !== -1) {
        news[index] = { ...news[index], ...updates };
        save('cms_news', news);
        return news[index];
      }
      return null;
    },
    deleteNews: (id) => {
      let news = db.getNews();
      news = news.filter(n => n.id !== Number(id));
      save('cms_news', news);
    },

    // ─── Enhanced Announcements Module ─────────────────────────────────────────────
    getAnnouncements: () => getOrInit('db_announcements', DEFAULT_ANNOUNCEMENTS),
    updateAnnouncement: (id, updates) => {
      const anns = db.getAnnouncements();
      const index = anns.findIndex(a => a.id === Number(id));
      if (index !== -1) {
        const oldAnn = { ...anns[index] };
        anns[index] = { ...anns[index], ...updates, updatedAt: new Date().toISOString() };
        save('db_announcements', anns);
        db.logChange('update', id, {
          changes: Object.keys(updates),
          from: { title: oldAnn.title, status: oldAnn.status },
          to: { title: anns[index].title, status: anns[index].status }
        });
        return anns[index];
      }
      return null;
    },

    deleteAnnouncement: (id) => {
      const anns = db.getAnnouncements();
      const ann = anns.find(a => a.id === Number(id));
      let annsFiltered = anns.filter(a => a.id !== Number(id));
      save('db_announcements', annsFiltered);
      db.logChange('delete', id, {
        title: ann?.title,
        category: ann?.category
      });
    },

    updateAllAnnouncements: (updates) => {
      const anns = db.getAnnouncements();
      updates.forEach(({ id, updates }) => {
        const index = anns.findIndex(a => a.id === Number(id));
        if (index !== -1) {
          anns[index] = { ...anns[index], ...updates, updatedAt: new Date().toISOString() };
        }
      });
      save('db_announcements', anns);
      db.broadcastSync('announcements_updated', {
        total: anns.length,
        updates: updates.length,
        timestamp: Date.now()
      });
    },
    getAnnouncement: (id) => db.getAnnouncements().find(a => a.id === Number(id)),
    createAnnouncement: (annData) => {
      const anns = db.getAnnouncements();
      const newId = anns.length > 0 ? Math.max(...anns.map(a => a.id)) + 1 : 1;
      const newAnn = {
        id: newId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...annData,
        status: annData.status || "draft",
        publishDate: annData.publishDate || new Date().toISOString(),
        expiryDate: annData.expiryDate || null,
        priority: annData.priority || "normal",
        attachments: annData.attachments || [],
        media: annData.media || [],
        isVisible: annData.isVisible !== false,
        views: 0,
        downloads: 0
      };
      anns.unshift(newAnn);
      save('db_announcements', anns);
      return newAnn;
    },
    updateAnnouncement: (id, updates) => {
      const anns = db.getAnnouncements();
      const index = anns.findIndex(a => a.id === Number(id));
      if (index !== -1) {
        anns[index] = { ...anns[index], ...updates, updatedAt: new Date().toISOString() };
        save('db_announcements', anns);
        return anns[index];
      }
      return null;
    },
    deleteAnnouncement: (id) => {
      let anns = db.getAnnouncements();
      anns = anns.filter(a => a.id !== Number(id));
      save('db_announcements', anns);
    },
    getPublishedAnnouncements: () => {
      const now = new Date().toISOString();
      return db.getAnnouncements()
        .filter(a => (a.status === "published" || a.status === "scheduled") &&
                     (a.publishDate ? new Date(a.publishDate) <= new Date(now) : true) &&
                     (!a.expiryDate || new Date(a.expiryDate) > new Date(now)) &&
                     a.isVisible !== false);
    },
    getVisibleAnnouncements: (user) => {
      return db.getPublishedAnnouncements()
        .filter(a => {
          if (a.visibility === "public") return true;
          if (!user) return false;
          if (a.visibility === "school_community") return true;
          if (a.visibility === "teachers_only") return user.role === "teacher" || user.role === "admin";
          if (a.visibility === "students_only") return user.role === "student";
          if (a.visibility === "parents_only") return user.role === "parent";
          if (a.visibility === "admin_only") return user.role === "admin";
          if (a.visibility === "subject_teachers") return (user.role === "admin") || (user.role === "teacher" && (!a.subjectId || (user.subjectIds||[]).includes(Number(a.subjectId))));
          if (a.visibility === "subject_students") return user.role === "student" && (!a.subjectId || (user.enrolledSubjectIds||[]).includes(Number(a.subjectId)));
          if (a.visibility === "class_teachers") return (user.role === "admin") || (user.role === "teacher" && (!a.classId || (user.assignedClassIds||[]).includes(Number(a.classId))));
          if (a.visibility === "class_students") return user.role === "student" && (!a.classId || Number(user.classId) === Number(a.classId));
          if (a.visibility === "year_group") return !a.level || String(user.level||"").toLowerCase() === String(a.level).toLowerCase();
          if (a.visibility === "specific_users") return a.viewers && a.viewers.includes(user.id);
          if (a.visibility === "private") return Number(a.createdBy) === Number(user.id);
          return false;
        })
        .sort((a, b) => {
          if (a.priority === "urgent" && b.priority !== "urgent") return -1;
          if (a.priority !== "urgent" && b.priority === "urgent") return 1;
          if (a.priority === "important" && b.priority !== "important") return -1;
          if (a.priority !== "important" && b.priority === "important") return 1;
          if (a.pinned) return -1;
          if (b.pinned) return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
    },
    getVisibleAnnouncementsSimple: (user) => {
      return db.getPublishedAnnouncements()
        .filter(a => {
          if (a.visibility === "public") return true;
          if (!user) return false;
          if (a.visibility === "school_community") return true;
          if (a.visibility === "teachers_only") return user.role === "teacher" || user.role === "admin";
          if (a.visibility === "students_only") return user.role === "student";
          if (a.visibility === "parents_only") return user.role === "parent";
          if (a.visibility === "admin_only") return user.role === "admin";
          if (a.visibility === "private") return Number(a.createdBy) === Number(user.id);
          return true;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    VISIBILITY_LABELS: {
      public: "Public",
      school_community: "School Community",
      teachers_only: "Teachers Only",
      students_only: "Students Only",
      parents_only: "Parents Only",
      admin_only: "Admin Only",
      subject_teachers: "Subject Teachers",
      subject_students: "Subject Students",
      class_teachers: "Class Teachers",
      class_students: "Class Students",
      year_group: "Year Group",
      specific_users: "Specific Users",
      private: "Private"
    },
    VISIBILITY_COLORS: {
      public: "bg-success",
      school_community: "bg-primary",
      teachers_only: "bg-info text-dark",
      students_only: "bg-warning text-dark",
      parents_only: "bg-secondary",
      admin_only: "bg-danger",
      subject_teachers: "bg-info text-dark",
      subject_students: "bg-warning text-dark",
      class_teachers: "bg-info text-dark",
      class_students: "bg-warning text-dark",
      year_group: "bg-primary",
      specific_users: "bg-dark",
      private: "bg-secondary"
    },
    logAnnouncementView: (id, userId) => {
      const anns = db.getAnnouncements();
      const ann = anns.find(a => a.id === Number(id));
      if (ann) {
        ann.views = (ann.views || 0) + 1;
        if (!ann.viewers) ann.viewers = [];
        if (!ann.viewers.includes(userId)) ann.viewers.push(userId);
        save('db_announcements', anns);
      }
    },
    getAnnouncementStats: () => {
      const anns = db.getAnnouncements();
      return {
        total: anns.length,
        published: anns.filter(a => a.status === "published").length,
        draft: anns.filter(a => a.status === "draft").length,
        urgent: anns.filter(a => a.priority === "urgent").length,
        important: anns.filter(a => a.priority === "important").length,
        pinned: anns.filter(a => a.pinned).length,
        totalViews: anns.reduce((sum, a) => sum + (a.views || 0), 0),
        totalDownloads: anns.reduce((sum, a) => sum + (a.downloads || 0), 0)
      };
    },
    getUpcomingEvents: (limit = 5) => {
      const now = new Date().toISOString();
      return db.getPublishedAnnouncements()
        .filter(a => a.category === "Events" || a.category === "Meetings")
        .sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate))
        .slice(0, limit);
    },
    getCategories: () => {
      const anns = db.getAnnouncements();
      return Array.from(new Set(anns.map(a => a.category)));
    },
    getPinnedAnnouncements: () => {
      return db.getPublishedAnnouncements().filter(a => a.pinned);
    },
    trackAnnouncementDownload: (id, userId) => {
      const anns = db.getAnnouncements();
      const ann = anns.find(a => a.id === Number(id));
      if (ann) {
        ann.downloads = (ann.downloads || 0) + 1;
        if (!ann.downloaders) ann.downloaders = [];
        if (!ann.downloaders.includes(userId)) ann.downloaders.push(userId);
        save('db_announcements', anns);
      }
    },

    // ─── Notification Management (unread tracking, sorting, real-time) ────
    _getReadMap: () => {
      try { return JSON.parse(localStorage.getItem('db_notification_read') || '{}'); } catch (e) { return {}; }
    },
    _saveReadMap: (map) => {
      localStorage.setItem('db_notification_read', JSON.stringify(map));
    },
    getNotifications: (user) => {
      const readMap = db._getReadMap();
      const userId = user ? String(user.id) : 'guest';
      const userReads = readMap[userId] || [];
      const anns = db.getVisibleAnnouncements(user);
      const sorted = anns.sort((a, b) => {
        if (a.priority === 'urgent' && b.priority !== 'urgent') return -1;
        if (a.priority !== 'urgent' && b.priority === 'urgent') return 1;
        if (a.priority === 'important' && b.priority !== 'important') return -1;
        if (a.priority !== 'important' && b.priority === 'important') return 1;
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      return sorted.map(a => {
        const isRead = userReads.includes(a.id);
        const minutesOld = (Date.now() - new Date(a.createdAt).getTime()) / 60000;
        const isNew = !isRead && minutesOld < 60;
        return { ...a, isRead, isNew, isNewOrUnread: !isRead };
      });
    },
    getUnreadCount: (user) => {
      if (!user) return 0;
      const readMap = db._getReadMap();
      const userReads = readMap[String(user.id)] || [];
      const anns = db.getVisibleAnnouncements(user);
      return anns.filter(a => !userReads.includes(a.id)).length;
    },
    markAsRead: (annId, user) => {
      if (!user) return;
      const readMap = db._getReadMap();
      const userId = String(user.id);
      if (!readMap[userId]) readMap[userId] = [];
      if (!readMap[userId].includes(annId)) readMap[userId].push(annId);
      db._saveReadMap(readMap);
      try { window.dispatchEvent(new CustomEvent('notification_read', { detail: { annId, userId } })); } catch (e) {}
    },
    markAllAsRead: (user) => {
      if (!user) return;
      const readMap = db._getReadMap();
      const userId = String(user.id);
      const anns = db.getVisibleAnnouncements(user);
      readMap[userId] = anns.map(a => a.id);
      db._saveReadMap(readMap);
      try { window.dispatchEvent(new CustomEvent('notification_read', { detail: { userId, all: true } })); } catch (e) {}
    },
    _notificationListeners: [],
    onAnnouncementChange: (callback) => {
      db._notificationListeners.push(callback);
    },
    _notifyChange: () => {
      db._notificationListeners.forEach(cb => { try { cb(); } catch (e) {} });
      try { window.dispatchEvent(new CustomEvent('announcement_change')); } catch (e) {}
    },
    initNotificationSync: () => {
      window.addEventListener('storage', (e) => {
        if (e.key === 'db_announcements' || e.key === 'db_notification_read') {
          db._notifyChange();
        }
      });
      setInterval(() => { db._notifyChange(); }, 30000);
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

    // ─── Synchronization & Event System ──────────────────────────────────────
    lastSyncTimestamps: { announcements: 0 },
    syncSubscribers: [],

    subscribeToSync: (callback) => {
      if (typeof callback === 'function') {
        db.syncSubscribers.push(callback);
        callback({ type: 'sync_init', timestamp: Date.now(), data: db.getAnnouncements() });
      }
      return () => {
        const index = db.syncSubscribers.indexOf(callback);
        if (index !== -1) db.syncSubscribers.splice(index, 1);
      };
    },

    broadcastSync: (type, data) => {
      const timestamp = Date.now();
      db.lastSyncTimestamps.announcements = timestamp;
      db.syncSubscribers.forEach(cb => {
        if (typeof cb === 'function') {
          try { cb({ type, timestamp, data, source: 'sync_service' }); } catch(e) {}
        }
      });
    },

    logChange: (action, itemId, details) => {
      const audit = { timestamp: new Date().toISOString(), action, targetId: itemId, details, userId: db.getCurrentUser()?.id || 'system' };
      const entries = db.getOrInit('db_sync_audits', []);
      entries.unshift(audit);
      if (entries.length > 1000) entries.splice(500);
      save('db_sync_audits', entries);
      db.broadcastSync('audit_change', { audit });
    },
    // ─── CMS: Contact Messages ─────────────────────────────────────────────
    getContactMessages: () => JSON.parse(localStorage.getItem('cms_contact_messages') || '[]'),
    sendMessage: (data) => {
      const msgs = db.getContactMessages();
      const newMsg = { id: Date.now(), createdAt: new Date().toISOString(), read: false, ...data };
      msgs.push(newMsg);
      localStorage.setItem('cms_contact_messages', JSON.stringify(msgs));
      return newMsg;
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
      const announcements = db.getAnnouncements();
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
        latestAnnouncements: announcements.slice(0, 3),
        allAnnouncements: announcements,
        urgentAnnouncements: announcements.filter(a => a.priority === 'urgent' || a.pinned),
        featuredEvents: announcements.filter(a => a.category === 'Events' || a.category === 'Meetings'),
        featuredBooks: db.getBooks().slice(0, 3)
      };
    },

    // ═══════════════════════════════════════════════
    // STAFF PROFILES (extended profile data)
    // ═══════════════════════════════════════════════
    DEFAULT_STAFF: [
      // Administration
      {userId:5,phone:'+250 788 100 001',qualification:'Master of Education (Educational Leadership)',specialization:'Educational Leadership & School Administration',experience:18,office:'Office of the Principal',department:'Administration',teachingLevel:'',subjects:[],isActive:true},
      {userId:6,phone:'+250 788 100 002',qualification:'Bachelor of Education (Primary Education)',specialization:'Primary Education Management',experience:14,office:'Primary Block',department:'Administration',teachingLevel:'',subjects:[],isActive:true},
      {userId:7,phone:'+250 788 100 003',qualification:'Bachelor of Science with Education',specialization:'Secondary School Administration',experience:15,office:'Secondary Block',department:'Administration',teachingLevel:'',subjects:[],isActive:true},
      {userId:8,phone:'+250 788 100 004',qualification:'Bachelor of Business Administration',specialization:'Educational Administration',experience:12,office:'Admin Office',department:'Administration',teachingLevel:'',subjects:[],isActive:true},
      {userId:9,phone:'+250 788 100 005',qualification:'Bachelor of Education',specialization:'Curriculum and Instruction',experience:11,office:'Primary Block',department:'Administration',teachingLevel:'',subjects:[],isActive:true},
      {userId:10,phone:'+250 788 100 006',qualification:'Bachelor of Education',specialization:'Secondary Curriculum Development',experience:10,office:'Secondary Block',department:'Administration',teachingLevel:'',subjects:[],isActive:true},
      {userId:11,phone:'+250 788 100 007',qualification:'Bachelor of Education',specialization:'Student Welfare & Discipline',experience:13,office:'Admin Office',department:'Administration',teachingLevel:'',subjects:[],isActive:true},
      {userId:12,phone:'+250 788 100 008',qualification:'Bachelor of Psychology',specialization:'Guidance and Counselling',experience:9,office:'Counselling Office',department:'Administration',teachingLevel:'',subjects:[],isActive:true},
      {userId:13,phone:'+250 788 100 009',qualification:'Bachelor of Human Resource Management',specialization:'Human Resource Management',experience:8,office:'Admin Office',department:'Administration',teachingLevel:'',subjects:[],isActive:true},
      {userId:14,phone:'+250 788 100 010',qualification:'Bachelor of Accounting',specialization:'Financial Management',experience:10,office:'Finance Office',department:'Administration',teachingLevel:'',subjects:[],isActive:true},
      {userId:15,phone:'+250 788 100 011',qualification:'Bachelor of Information Technology',specialization:'ICT Integration in Education',experience:7,office:'ICT Lab',department:'Administration',teachingLevel:'',subjects:[],isActive:true},
      {userId:16,phone:'+250 788 100 012',qualification:'Diploma in Office Administration',specialization:'Administrative Support',experience:8,office:'Admin Office',department:'Administration',teachingLevel:'',subjects:[],isActive:true},
      // Teachers
      {userId:2,phone:'+250 788 555 001',qualification:'PhD in Mathematics Education',specialization:'Science & Mathematics',experience:12,office:'Science Block',department:'Science',teachingLevel:'Secondary',subjects:['Mathematics','Physics'],isActive:true},
      {userId:4,phone:'+250 788 555 002',qualification:'MA in Linguistics',specialization:'Languages & Humanities',experience:8,office:'Humanities Block',department:'Languages',teachingLevel:'Secondary',subjects:['English','Kinyarwanda'],isActive:true},
      {userId:17,phone:'+250 788 200 001',qualification:'Diploma in Early Childhood Education',specialization:'Early Childhood Development',experience:6,office:'Nursery Block',department:'Nursery',teachingLevel:'Nursery',subjects:['Early Learning'],isActive:true},
      {userId:18,phone:'+250 788 200 002',qualification:'Diploma in Nursery Education',specialization:'Child Development',experience:5,office:'Nursery Block',department:'Nursery',teachingLevel:'Nursery',subjects:['Early Learning'],isActive:true},
      {userId:19,phone:'+250 788 300 001',qualification:'Bachelor of Education',specialization:'Mathematics Education',experience:9,office:'Primary Block',department:'Mathematics',teachingLevel:'Primary',subjects:['Mathematics'],isActive:true},
      {userId:20,phone:'+250 788 300 002',qualification:'Bachelor of Arts with Education',specialization:'English Language',experience:8,office:'Primary Block',department:'Languages',teachingLevel:'Primary',subjects:['English'],isActive:true},
      {userId:21,phone:'+250 788 300 003',qualification:'Bachelor of Science with Education',specialization:'Integrated Science',experience:11,office:'Primary Block',department:'Science',teachingLevel:'Primary',subjects:['Science'],isActive:true},
      {userId:22,phone:'+250 788 300 004',qualification:'Bachelor of Education',specialization:'Social Studies',experience:7,office:'Primary Block',department:'Social Studies',teachingLevel:'Primary',subjects:['Social Studies'],isActive:true},
      {userId:23,phone:'+250 788 400 001',qualification:'Bachelor of Science with Education',specialization:'Mathematics',experience:12,office:'Secondary Block',department:'Mathematics',teachingLevel:'Secondary',subjects:['Mathematics'],isActive:true},
      {userId:24,phone:'+250 788 400 002',qualification:'Bachelor of Science with Education',specialization:'Biology',experience:9,office:'Science Lab',department:'Science',teachingLevel:'Secondary',subjects:['Biology'],isActive:true},
      {userId:25,phone:'+250 788 400 003',qualification:'Bachelor of Science with Education',specialization:'Physics',experience:10,office:'Science Lab',department:'Science',teachingLevel:'Secondary',subjects:['Physics'],isActive:true},
      {userId:26,phone:'+250 788 400 004',qualification:'Bachelor of Science with Education',specialization:'Chemistry',experience:8,office:'Science Lab',department:'Science',teachingLevel:'Secondary',subjects:['Chemistry'],isActive:true},
      {userId:27,phone:'+250 788 400 005',qualification:'Bachelor of Information Technology',specialization:'Computer Science & ICT',experience:7,office:'ICT Lab',department:'ICT',teachingLevel:'Secondary',subjects:['Computer Science','ICT'],isActive:true}
    ],
    getStaffProfile: (userId) => {
      const all = db.getAllStaffProfiles();
      return all.find(s => s.userId === userId) || null;
    },
    getAllStaffProfiles: () => {
      const raw = localStorage.getItem('db_staff_profiles');
      if (!raw) { localStorage.setItem('db_staff_profiles', JSON.stringify(db.DEFAULT_STAFF)); return db.DEFAULT_STAFF; }
      const existing = JSON.parse(raw);
      // Merge with defaults so new fields are populated even if localStorage has old data
      const merged = db.DEFAULT_STAFF.map(d => {
        const e = existing.find(s => s.userId === d.userId);
        return e ? { ...d, ...e } : d;
      });
      existing.forEach(e => { if (!db.DEFAULT_STAFF.some(d => d.userId === e.userId)) merged.push(e); });
      localStorage.setItem('db_staff_profiles', JSON.stringify(merged));
      return merged;
    },
    saveStaffProfile: (profile) => {
      const all = db.getAllStaffProfiles();
      const idx = all.findIndex(s => s.userId === profile.userId);
      if (idx >= 0) all[idx] = { ...all[idx], ...profile };
      else all.push(profile);
      localStorage.setItem('db_staff_profiles', JSON.stringify(all));
      return profile;
    },
    deleteStaffProfile: (userId) => {
      let all = db.getAllStaffProfiles();
      all = all.filter(s => s.userId !== userId);
      localStorage.setItem('db_staff_profiles', JSON.stringify(all));
    },
    getAdminStaff: () => {
      const users = db.getUsers().filter(u => u.role === 'admin');
      return users.map(u => {
        const p = db.getStaffProfile(u.id);
        return { ...u, ...p };
      });
    },
    getTeachersWithProfiles: () => {
      const users = db.getUsers().filter(u => u.role === 'teacher');
      return users.map(u => {
        const p = db.getStaffProfile(u.id);
        return { ...u, ...p, teachingLevel: p?.teachingLevel || 'Primary', subjects: p?.subjects || [] };
      });
    },

    // ─── Course Content (Units, Topics, Lessons, Resources, Assignments, Quizzes, Past Papers) ───

    getSubjectUnits: (subjectId) => {
      const units = getOrInit("db_subject_units", DEFAULT_UNITS);
      return units.filter(u => Number(u.subjectId) === Number(subjectId)).sort((a,b) => a.order - b.order);
    },
    saveUnit: (unit) => {
      const units = getOrInit("db_subject_units", DEFAULT_UNITS);
      const idx = units.findIndex(u => u.id === unit.id);
      if (idx >= 0) { units[idx] = { ...units[idx], ...unit }; }
      else {
        unit.id = units.length > 0 ? Math.max(...units.map(u => u.id)) + 1 : 1;
        units.push(unit);
      }
      save("db_subject_units", units);
      return unit;
    },
    deleteUnit: (unitId) => {
      let units = getOrInit("db_subject_units", DEFAULT_UNITS);
      units = units.filter(u => u.id !== unitId);
      save("db_subject_units", units);
    },

    getUnitTopics: (unitId) => {
      const topics = getOrInit("db_subject_topics", DEFAULT_TOPICS);
      return topics.filter(t => Number(t.unitId) === Number(unitId)).sort((a,b) => a.order - b.order);
    },
    saveTopic: (topic) => {
      const topics = getOrInit("db_subject_topics", DEFAULT_TOPICS);
      const idx = topics.findIndex(t => t.id === topic.id);
      if (idx >= 0) { topics[idx] = { ...topics[idx], ...topic }; }
      else {
        topic.id = topics.length > 0 ? Math.max(...topics.map(t => t.id)) + 1 : 1;
        topics.push(topic);
      }
      save("db_subject_topics", topics);
      return topic;
    },
    deleteTopic: (topicId) => {
      let topics = getOrInit("db_subject_topics", DEFAULT_TOPICS);
      topics = topics.filter(t => t.id !== topicId);
      save("db_subject_topics", topics);
    },

    getSubjectLessons: (subjectId) => {
      const lessons = getOrInit("db_lessons", DEFAULT_LESSONS);
      return lessons.filter(l => Number(l.subjectId) === Number(subjectId));
    },
    saveLesson: (lesson) => {
      const lessons = getOrInit("db_lessons", DEFAULT_LESSONS);
      const idx = lessons.findIndex(l => l.id === lesson.id);
      if (idx >= 0) { lessons[idx] = { ...lessons[idx], ...lesson }; }
      else {
        lesson.id = lessons.length > 0 ? Math.max(...lessons.map(l => l.id)) + 1 : 1;
        lessons.push(lesson);
      }
      save("db_lessons", lessons);
      return lesson;
    },
    deleteLesson: (lessonId) => {
      let lessons = getOrInit("db_lessons", DEFAULT_LESSONS);
      lessons = lessons.filter(l => l.id !== lessonId);
      save("db_lessons", lessons);
    },

    getSubjectResources: (subjectId) => {
      const books = getOrInit("db_books", DEFAULT_BOOKS);
      return books.filter(b => Number(b.subjectId) === Number(subjectId));
    },
    saveResource: (resource) => {
      const books = getOrInit("db_books", DEFAULT_BOOKS);
      const idx = books.findIndex(b => b.id === resource.id);
      if (idx >= 0) { books[idx] = { ...books[idx], ...resource }; }
      else {
        resource.id = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
        books.push(resource);
      }
      save("db_books", books);
      return resource;
    },
    deleteResource: (resourceId) => {
      let books = getOrInit("db_books", DEFAULT_BOOKS);
      books = books.filter(b => b.id !== resourceId);
      save("db_books", books);
    },

    getSubjectAssignments: (subjectId) => {
      const assignments = getOrInit("db_subject_assignments", DEFAULT_SUBJECT_ASSIGNMENTS);
      return assignments.filter(a => Number(a.subjectId) === Number(subjectId));
    },
    saveAssignment: (assignment) => {
      const assignments = getOrInit("db_subject_assignments", DEFAULT_SUBJECT_ASSIGNMENTS);
      const idx = assignments.findIndex(a => a.id === assignment.id);
      if (idx >= 0) { assignments[idx] = { ...assignments[idx], ...assignment }; }
      else {
        assignment.id = assignments.length > 0 ? Math.max(...assignments.map(a => a.id)) + 1 : 1;
        assignments.push(assignment);
      }
      save("db_subject_assignments", assignments);
      return assignment;
    },
    deleteAssignment: (assignmentId) => {
      let assignments = getOrInit("db_subject_assignments", DEFAULT_SUBJECT_ASSIGNMENTS);
      assignments = assignments.filter(a => a.id !== assignmentId);
      save("db_subject_assignments", assignments);
    },

    getSubjectQuizzes: (subjectId) => {
      const quizzes = getOrInit("db_subject_quizzes", DEFAULT_SUBJECT_QUIZZES);
      return quizzes.filter(q => Number(q.subjectId) === Number(subjectId));
    },
    saveQuiz: (quiz) => {
      const quizzes = getOrInit("db_subject_quizzes", DEFAULT_SUBJECT_QUIZZES);
      const idx = quizzes.findIndex(q => q.id === quiz.id);
      if (idx >= 0) { quizzes[idx] = { ...quizzes[idx], ...quiz }; }
      else {
        quiz.id = quizzes.length > 0 ? Math.max(...quizzes.map(q => q.id)) + 1 : 1;
        quizzes.push(quiz);
      }
      save("db_subject_quizzes", quizzes);
      return quiz;
    },
    deleteQuiz: (quizId) => {
      let quizzes = getOrInit("db_subject_quizzes", DEFAULT_SUBJECT_QUIZZES);
      quizzes = quizzes.filter(q => q.id !== quizId);
      save("db_subject_quizzes", quizzes);
    },

    getSubjectPastPapers: (subjectId) => {
      const papers = getOrInit("db_subject_past_papers", DEFAULT_SUBJECT_PAST_PAPERS);
      return papers.filter(p => Number(p.subjectId) === Number(subjectId)).sort((a,b) => b.year - a.year);
    },
    savePastPaper: (paper) => {
      const papers = getOrInit("db_subject_past_papers", DEFAULT_SUBJECT_PAST_PAPERS);
      const idx = papers.findIndex(p => p.id === paper.id);
      if (idx >= 0) { papers[idx] = { ...papers[idx], ...paper }; }
      else {
        paper.id = papers.length > 0 ? Math.max(...papers.map(p => p.id)) + 1 : 1;
        papers.push(paper);
      }
      save("db_subject_past_papers", papers);
      return paper;
    },
    deletePastPaper: (paperId) => {
      let papers = getOrInit("db_subject_past_papers", DEFAULT_SUBJECT_PAST_PAPERS);
      papers = papers.filter(p => p.id !== paperId);
      save("db_subject_past_papers", papers);
    },

    getSubjectTeachers: (subjectId) => {
      const subject = db.getSubject(subjectId);
      if (!subject) return [];
      const subjectName = subject.name;
      const teachers = db.getTeachersWithProfiles();
      return teachers.filter(t => t.subjects && t.subjects.some(s => s.toLowerCase() === subjectName.toLowerCase()));
    },

    getSubjectContent: (subjectId) => {
      return {
        subject: db.getSubject(subjectId),
        units: db.getSubjectUnits(subjectId),
        lessons: db.getSubjectLessons(subjectId),
        resources: db.getSubjectResources(subjectId),
        assignments: db.getSubjectAssignments(subjectId),
        quizzes: db.getSubjectQuizzes(subjectId),
        pastPapers: db.getSubjectPastPapers(subjectId),
        teachers: db.getSubjectTeachers(subjectId)
      };
    },

    // ─── Courses ───
    getCourses: () => getOrInit("db_courses", DEFAULT_COURSES),
    getCourse: (id) => db.getCourses().find(c => c.id === Number(id)),
    addCourse: (data) => {
      const courses = db.getCourses();
      const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
      courses.push({ id: newId, ...data, enrollmentCount: 0, status: "active" });
      save("db_courses", courses);
      return newId;
    },
    saveCourse: (id, data) => {
      const courses = db.getCourses();
      const idx = courses.findIndex(c => c.id === Number(id));
      if (idx >= 0) { courses[idx] = { ...courses[idx], ...data }; save("db_courses", courses); }
    },
    deleteCourse: (id) => {
      let courses = db.getCourses();
      courses = courses.filter(c => c.id !== Number(id));
      save("db_courses", courses);
    },
    getCourseSyllabus: (course) => {
      var subject = course.subject || 'General';
      var templates = {
        'Mathematics': ['Numbers and Operations', 'Algebraic Thinking', 'Geometry and Measurement', 'Data and Statistics', 'Problem Solving Strategies'],
        'English': ['Reading Comprehension', 'Grammar and Punctuation', 'Vocabulary Building', 'Writing Skills', 'Speaking and Listening'],
        'Science': ['Scientific Inquiry', 'Core Concepts', 'Experiments and Labs', 'Real-World Applications', 'Review and Assessment'],
        'History': ['Introduction to Key Events', 'Causes and Effects', 'Primary Sources Analysis', 'Historical Perspectives', 'Connections to Today']
      };
      var topics = templates[subject] || ['Introduction', 'Core Concepts', 'Practical Applications', 'Review and Practice', 'Assessment'];
      return topics.map(function(t, i) {
        return { week: i + 1, topic: t, description: 'Explore ' + t.toLowerCase() + ' related to ' + (course.title || 'this course') + '.' };
      });
    },
    generateCourseDownload: (course) => {
      var lines = [];
      lines.push('═══════════════════════════════════════════');
      lines.push('  COURSE OUTLINE - HON-ACADEMY');
      lines.push('═══════════════════════════════════════════');
      lines.push('');
      lines.push('Title:       ' + (course.title || ''));
      lines.push('Subject:     ' + (course.subject || ''));
      lines.push('Level:       ' + (course.level || ''));
      lines.push('Class:       ' + (course.className || ''));
      lines.push('Duration:    ' + (course.duration || 0) + ' min per lesson');
      lines.push('');
      lines.push('Description:');
      lines.push('  ' + (course.description || ''));
      lines.push('');
      lines.push('Syllabus:');
      var syllabus = db.getCourseSyllabus(course);
      syllabus.forEach(function(s) {
        lines.push('  Week ' + s.week + ': ' + s.topic + ' - ' + s.description);
      });
      lines.push('');
      lines.push('───────────────────────────────────────────');
      lines.push('  Generated by HON-ACADEMY E-Learning Portal');
      lines.push('  ' + new Date().toISOString().slice(0,10));
      lines.push('═══════════════════════════════════════════');
      return lines.join('\n');
    },

    // ── Resource Download Tracking ──
    logResourceDownload: (resourceId, resourceType, subjectId, userId) => {
      var logs = getOrInit("db_resource_downloads", []);
      logs.push({ resourceId: Number(resourceId), resourceType: resourceType, subjectId: Number(subjectId), userId: Number(userId), downloadedAt: new Date().toISOString() });
      save("db_resource_downloads", logs);
    },
    getResourceDownloadCount: (resourceId, resourceType) => {
      var logs = getOrInit("db_resource_downloads", []);
      return logs.filter(function(l) { return Number(l.resourceId) === Number(resourceId) && l.resourceType === resourceType; }).length;
    },
    getTopDownloadedResources: (limit) => {
      limit = limit || 10;
      var logs = getOrInit("db_resource_downloads", []);
      var counts = {};
      logs.forEach(function(l) {
        var key = l.resourceType + '_' + l.resourceId;
        counts[key] = (counts[key] || 0) + 1;
      });
      var sorted = Object.keys(counts).map(function(k) {
        var parts = k.split('_');
        return { resourceType: parts.slice(0,-1).join('_'), resourceId: Number(parts[parts.length-1]), count: counts[k] };
      }).sort(function(a,b) { return b.count - a.count; });
      return sorted.slice(0, limit);
    },
    getDownloadLogs: (resourceId, resourceType) => {
      var logs = getOrInit("db_resource_downloads", []);
      return logs.filter(function(l) { return Number(l.resourceId) === Number(resourceId) && l.resourceType === resourceType; });
    }
  };

  // Force-update existing user avatars from seed data (overrides cached ui-avatars.com URLs)
  (function migrateAvatars() {
    var raw = localStorage.getItem('db_users');
    if (!raw) return;
    var users = JSON.parse(raw);
    var changed = false;
    for (var i = 0; i < DEFAULT_USERS.length; i++) {
      var seed = DEFAULT_USERS[i];
      if (seed.avatarUrl && seed.avatarUrl.indexOf('ui-avatars.com') === -1) {
        var existing = users.find(function(u) { return u.id === seed.id; });
        if (existing && existing.avatarUrl !== seed.avatarUrl) {
          existing.avatarUrl = seed.avatarUrl;
          changed = true;
        }
      }
    }
    if (changed) localStorage.setItem('db_users', JSON.stringify(users));
  })();

  window.db = db;
  try { db.initNotificationSync(); } catch (e) {}
})();
