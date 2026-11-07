export interface MilestoneProjectItem {
  id: string;
  name: string;
  badge: string;
  desc: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  image: string;
  features: string[];
}

export interface MilestoneInternshipItem {
  company: string;
  role: string;
  location: string;
  period: string;
  responsibilities: string[];
}

export interface HighwayMilestoneData {
  id: string;
  km: number;
  progress: number;
  title: string;
  subtitle: string;
  codeName: string;
  accentColor: string;
  category: 'origin' | 'profile' | 'education' | 'skills' | 'project' | 'experience' | 'cybersecurity' | 'destination';
  imageAsset: string;
  secondaryImage?: string;
  tagline: string;
  statBadge: { label: string; value: string };
  bulletPoints: string[];
  narration: string;
  interactiveModalType?: 'about' | 'education' | 'skills' | 'projects' | 'experience' | 'cybersecurity' | 'resume' | 'terminal';
  projectDetails?: MilestoneProjectItem;
  internships?: MilestoneInternshipItem[];
  skillsCategories?: { category: string; skills: string[] }[];
  side: 'left' | 'right' | 'overhead';
  billboardSize: [number, number]; // [width, height]
  lateralOffset?: number; // Custom lateral offset from road center
}

const BASE_URL = import.meta.env.BASE_URL || '/';
const getAsset = (relativePath: string) => `${BASE_URL}${relativePath.replace(/^\//, '')}`;

export const DETAILED_HIGHWAY_MILESTONES: HighwayMilestoneData[] = [
  // ── KM 0: Welcome Gate ───────────────────────────────────────────
  {
    id: 'km-0',
    km: 0.0,
    progress: 0.0 / 7.0,
    title: 'WELCOME GATE',
    subtitle: 'System Ingress // Deep Space Speedway',
    codeName: 'SAN-PORTAL-00',
    accentColor: '#E10620',
    category: 'origin',
    imageAsset: getAsset('assets/illustrations/anime-coder-4k-workstation.jpg'),
    secondaryImage: getAsset('assets/ai-interface/san-ai-keynote-telemetry.jpg'),
    tagline: 'Santhosh Kumar M — Cybersecurity Enthusiast & Computer Science Engineering Student.',
    statBadge: { label: 'SPEEDWAY', value: '7.0 KM' },
    bulletPoints: [
      'Verified Developer & Cybersecurity Portfolio of Santhosh Kumar M',
      'Dual Driving Modes: Autopilot Cruise & Manual WASD/Touch Controls',
      'Real-Time JARVIS HUD with SAN AI Copilot Telemetry'
    ],
    narration: 'System online. Welcome to the Road of Santhosh. Ingressing at KM 0. Prepare for acceleration.',
    interactiveModalType: 'about',
    side: 'overhead',
    billboardSize: [22, 10]
  },

  // ── KM 1: About Santhosh (First Billboard - Authentic Photo) ──────
  {
    id: 'km-1',
    km: 1.0,
    progress: 1.0 / 7.0,
    title: 'SANTHOSH KUMAR M',
    subtitle: 'Cybersecurity Enthusiast | Computer Science Engineering Student',
    codeName: 'SAN-BIO-01',
    accentColor: '#FF3548',
    category: 'profile',
    imageAsset: getAsset('assets/profile/santhosh-profile-formal.jpg'),
    tagline: 'Cybersecurity-focused Computer Science Engineering student interested in cybersecurity research, web application security, vulnerability assessment and software development.',
    statBadge: { label: 'VERIFIED GPA', value: '7.2 / 10' },
    bulletPoints: [
      'Cybersecurity-focused Computer Science Engineering student interested in cybersecurity research, web application security, vulnerability assessment and software development.',
      'B.E. Computer Science and Engineering — Gnanamani College of Technology, Namakkal',
      'Expected Graduation: May 2027 | GPA: 7.2 / 10.0',
      'Location: Namakkal, India | Seeking entry-level cybersecurity, internship, or SOC analyst roles'
    ],
    narration: 'Arriving at KM 1: Santhosh Kumar M. Cybersecurity-focused Computer Science Engineering student from Gnanamani College of Technology.',
    interactiveModalType: 'about',
    side: 'left',
    billboardSize: [12, 16],
    lateralOffset: -13.0
  },

  // ── KM 2: Education ──────────────────────────────────────────────
  {
    id: 'km-2',
    km: 2.0,
    progress: 2.0 / 7.0,
    title: 'EDUCATION & ACADEMICS',
    subtitle: 'Bachelor of Engineering in Computer Science & Engineering',
    codeName: 'SAN-EDU-02',
    accentColor: '#E10620',
    category: 'education',
    imageAsset: getAsset('assets/illustrations/anime-coder-neon-looking-back.jpg'),
    tagline: 'Gnanamani College of Technology, Namakkal — Expected Graduation: May 2027 (GPA: 7.2)',
    statBadge: { label: 'DEGREE', value: 'B.E. CSE' },
    bulletPoints: [
      'Degree: Bachelor of Engineering (B.E.) in Computer Science and Engineering',
      'Institution: Gnanamani College of Technology, Namakkal',
      'Expected Graduation: May 2027 | Verified GPA: 7.2',
      'Relevant Coursework: Ethical Hacking and Penetration Testing',
      'Relevant Coursework: Computer Networks',
      'Relevant Coursework: Operating Systems'
    ],
    narration: 'Passing KM 2: Academic Overpass. Bachelor of Engineering in CSE with specialized coursework in Ethical Hacking, Computer Networks, and Operating Systems.',
    interactiveModalType: 'education',
    side: 'right',
    billboardSize: [18, 10],
    lateralOffset: 13.5
  },

  // ── KM 3: Technical Skills (Highway Signboards) ───────────────────
  {
    id: 'km-3',
    km: 3.0,
    progress: 3.0 / 7.0,
    title: 'TECHNICAL SKILLS JUNCTION',
    subtitle: 'Highway Direction Signboards // Core Competencies',
    codeName: 'SAN-SKILLS-03',
    accentColor: '#FF3548',
    category: 'skills',
    imageAsset: getAsset('assets/backgrounds/curved-workstation-reference.jpg'),
    tagline: 'Categorized technical signboards without fabricated percentages or subjective ratings.',
    statBadge: { label: 'DOMAINS', value: '4 AREAS' },
    bulletPoints: [
      'Programming Languages: Python, Java, C',
      'Cybersecurity Skills: Web Application Security Basics, Vulnerability Assessment Concepts, CTF Challenges, SQL Injection concepts, Cross-Site Scripting (XSS), Authentication Flaws',
      'Operating Systems: Linux (Basic), Windows',
      'Tools & Platforms: Git, Basic Command Line'
    ],
    skillsCategories: [
      {
        category: 'Programming Languages',
        skills: ['Python', 'Java', 'C']
      },
      {
        category: 'Cybersecurity Skills',
        skills: [
          'Web Application Security Basics',
          'Vulnerability Assessment Concepts',
          'CTF Challenges',
          'SQL Injection concepts',
          'Cross-Site Scripting (XSS)',
          'Authentication Flaws'
        ]
      },
      {
        category: 'Operating Systems',
        skills: ['Linux (Basic)', 'Windows']
      },
      {
        category: 'Tools & Platforms',
        skills: ['Git', 'Basic Command Line']
      }
    ],
    narration: 'Approaching KM 3: Technical Skills Junction. Multi-lane direction signboards covering Python, Java, C, Web Security, Vulnerability Assessment, Linux, and Git.',
    interactiveModalType: 'skills',
    side: 'overhead',
    billboardSize: [22, 11]
  },

  // ── KM 4A: Verified Project — LorryBook / RDA ─────────────────────
  {
    id: 'km-4a',
    km: 4.0,
    progress: 3.85 / 7.0,
    title: 'LORRYBOOK / RDA',
    subtitle: 'Verified Project // Logistics Route & Driver Queue Platform',
    codeName: 'SAN-PROJ-RDA',
    accentColor: '#E10620',
    category: 'project',
    imageAsset: getAsset('assets/projects/systems-lab-optical-bus.jpg'),
    tagline: 'Transport route logistics and driver queue platform with automated dispatch and trip logging.',
    statBadge: { label: 'STATUS', value: 'VERIFIED' },
    bulletPoints: [
      'Full-stack platform managing lorry driver queues and automated route booking schedules',
      'Engineered backend API endpoints for dispatch authorization and trip status tracking',
      'Integrated geofenced check-in triggers to record arrival and departure events',
      'Optimized database queries for fast fleet history lookups and load validation'
    ],
    narration: 'Approaching Project Billboard 4A: LorryBook and RDA Logistics. End-to-end transport booking and driver queue platform.',
    interactiveModalType: 'projects',
    projectDetails: {
      id: 'rda-lorrybook',
      name: 'LorryBook / RDA Logistics',
      badge: 'Full-Stack Fleet Platform',
      desc: 'Transport route logistics and driver queue platform with automated dispatch and trip logging.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'REST API'],
      githubUrl: 'https://github.com/santhoshkumariicse-gif/portfolio',
      demoUrl: 'https://santhoshkumariicse-gif.github.io/portfolio/',
      image: getAsset('assets/projects/systems-lab-optical-bus.jpg'),
      features: [
        'Real-time driver queue management',
        'Geofenced gate check-in triggers',
        'Automated trip sheet calculation'
      ]
    },
    side: 'left',
    billboardSize: [16, 10],
    lateralOffset: -13.5
  },

  // ── KM 4B: Verified Project — NexusATS ────────────────────────────
  {
    id: 'km-4b',
    km: 4.3,
    progress: 4.3 / 7.0,
    title: 'NEXUS ATS',
    subtitle: 'Verified Project // Resume Parsing & Blind Hiring Engine',
    codeName: 'SAN-PROJ-ATS',
    accentColor: '#FF3548',
    category: 'project',
    imageAsset: getAsset('assets/ai-interface/avatar-wireframe-diagnostics.jpg'),
    tagline: 'Modern Applicant Tracking System for structured candidate evaluation and blind screening.',
    statBadge: { label: 'STATUS', value: 'VERIFIED' },
    bulletPoints: [
      'Automated resume parsing engine extracting candidate skills, experience duration, and education',
      'Blind-review screening filter masking demographic data to eliminate unconscious bias',
      'Structured evaluation scorecards with role-based access for reviewers',
      'Full-stack architecture built with TypeScript, React, and PostgreSQL'
    ],
    narration: 'Approaching Project Billboard 4B: NexusATS. Objective talent screening and automated resume parsing engine.',
    interactiveModalType: 'projects',
    projectDetails: {
      id: 'nexusats',
      name: 'NexusATS',
      badge: 'Applicant Tracking Engine',
      desc: 'Modern applicant tracking and resume screening system with blind evaluation pipelines.',
      tags: ['TypeScript', 'React', 'FastAPI', 'PostgreSQL', 'Tailwind CSS'],
      githubUrl: 'https://github.com/santhoshkumariicse-gif/portfolio',
      demoUrl: 'https://santhoshkumariicse-gif.github.io/portfolio/',
      image: getAsset('assets/ai-interface/avatar-wireframe-diagnostics.jpg'),
      features: [
        'Automated PDF resume parser',
        'Blind demographic masking filter',
        'Custom candidate evaluation scorecards'
      ]
    },
    side: 'right',
    billboardSize: [16, 10],
    lateralOffset: 13.5
  },

  // ── KM 4C: Verified Project — Recall AI ───────────────────────────
  {
    id: 'km-4c',
    km: 4.7,
    progress: 4.7 / 7.0,
    title: 'RECALL AI',
    subtitle: 'Verified Project // Hackathon Multi-Agent RAG Prototype',
    codeName: 'SAN-PROJ-RAG',
    accentColor: '#E10620',
    category: 'project',
    imageAsset: getAsset('assets/projects/ai-brain-neural-architecture.jpg'),
    tagline: 'Intelligent multi-agent document analysis and vector memory retrieval prototype.',
    statBadge: { label: 'STATUS', value: 'VERIFIED' },
    bulletPoints: [
      'Developed during collegiate AI hackathon for rapid retrieval over dense technical documentation',
      'Retrieval-Augmented Generation (RAG) architecture chunking and indexing text into vector stores',
      'Autonomous ReAct feedback loop validating model citations against ground-truth source chunks',
      'FastAPI asynchronous backend with streaming LLM completions and caching'
    ],
    narration: 'Approaching Project Billboard 4C: Recall AI. Hackathon-tested autonomous multi-agent RAG prototype with vector memory.',
    interactiveModalType: 'projects',
    projectDetails: {
      id: 'recall-ai',
      name: 'Recall AI',
      badge: 'Agentic RAG Prototype',
      desc: 'Autonomous multi-agent document analysis engine with Pinecone/Qdrant vector retrieval and citation validation.',
      tags: ['Python', 'FastAPI', 'LangChain', 'OpenAI', 'Pinecone', 'React'],
      githubUrl: 'https://github.com/santhoshkumariicse-gif/portfolio',
      demoUrl: 'https://santhoshkumariicse-gif.github.io/portfolio/',
      image: getAsset('assets/projects/ai-brain-neural-architecture.jpg'),
      features: [
        'Hierarchical document vector chunking',
        'Citation verification mechanism',
        'Multi-agent consensus synthesis'
      ]
    },
    side: 'left',
    billboardSize: [16, 10],
    lateralOffset: -13.5
  },

  // ── KM 5: Internship Experience (Cybernaut & ELITA) ───────────────
  {
    id: 'km-5',
    km: 5.1,
    progress: 5.1 / 7.0,
    title: 'INTERNSHIP EXPERIENCE',
    subtitle: 'Professional Engineering Internships at Cybernaut & ELITA',
    codeName: 'SAN-EXP-05',
    accentColor: '#FF3548',
    category: 'experience',
    imageAsset: getAsset('assets/cybersecurity/cyber-soc-threat-command.jpg'),
    tagline: 'Verified software engineering internships at Cybernaut (Karur) and ELITA (Bangalore).',
    statBadge: { label: 'INDUSTRY', value: '2 FIRMS' },
    bulletPoints: [
      'Cybernaut (Karur, Tamil Nadu) — Python Developer Intern | July 2024 – Present',
      'Developed and maintained Python scripts with a focus on clean, efficient, and readable code.',
      'Debugged applications and resolved logical and runtime errors.',
      'Gained exposure to writing maintainable code practices relevant to security tooling and automation.',
      'ELITA (Bangalore, India) — Web and App Development Intern | July 2025 – August 2025',
      'Created reusable UI components, cutting development time for new pages by ~25%.',
      'Learned fundamentals of client-server interaction and common web application structures.',
      'Gained awareness of common web security issues through development exposure.'
    ],
    internships: [
      {
        company: 'Cybernaut',
        role: 'Python Developer Intern',
        location: 'Karur, Tamil Nadu',
        period: 'July 2024 – Present',
        responsibilities: [
          'Developed and maintained Python scripts with a focus on clean, efficient, and readable code.',
          'Debugged applications and resolved logical and runtime errors.',
          'Gained exposure to writing maintainable code practices relevant to security tooling and automation.'
        ]
      },
      {
        company: 'ELITA',
        role: 'Web and App Development Intern',
        location: 'Bangalore, India',
        period: 'July 2025 – August 2025',
        responsibilities: [
          'Created reusable UI components, cutting development time for new pages by ~25%.',
          'Learned fundamentals of client-server interaction and common web application structures.',
          'Gained awareness of common web security issues through development exposure.'
        ]
      }
    ],
    narration: 'Crossing KM 5: Internship Experience. Software engineering internships at Cybernaut (Karur) and ELITA (Bangalore) with verified contributions.',
    interactiveModalType: 'experience',
    side: 'right',
    billboardSize: [18, 11],
    lateralOffset: 13.5
  },

  // ── KM 6: Cybersecurity Practical Exposure & Involvement ─────────
  {
    id: 'km-6',
    km: 6.0,
    progress: 6.0 / 7.0,
    title: 'CYBERSECURITY LAB & INVOLVEMENT',
    subtitle: 'Practical Exposure, CTF Challenges & Cybersecurity Club',
    codeName: 'SAN-SEC-06',
    accentColor: '#E10620',
    category: 'cybersecurity',
    imageAsset: getAsset('assets/cybersecurity/cyber-soc-threat-command.jpg'),
    secondaryImage: getAsset('assets/illustrations/anime-coder-sunset-cat.jpg'),
    tagline: 'Practical exposure and lab-based learning in web security, CTFs, and secure coding practices.',
    statBadge: { label: 'SECURITY', value: 'CTF & LABS' },
    bulletPoints: [
      'Practical Exposure: Practiced web application security testing using intentionally vulnerable applications.',
      'Explored common vulnerabilities such as SQL Injection, Cross-Site Scripting (XSS), and authentication flaws in lab environments.',
      'Developed basic Python scripts useful for automation and security experimentation.',
      'Cybersecurity Club Member — Gnanamani College of Technology, Namakkal (August 2022 – May 2024)',
      'Participated in Capture The Flag (CTF) challenges focusing on web security and basic exploitation techniques.',
      'Gained hands-on exposure to vulnerability identification and security fundamentals.',
      'Actively explored ethical hacking concepts and secure system practices.',
      'Interests: Cybersecurity Research | Languages: English, Tamil'
    ],
    narration: 'Arriving at KM 6: Cybersecurity Practical Exposure and Club Involvement. CTF challenges, lab-based vulnerability assessment, and security research.',
    interactiveModalType: 'cybersecurity',
    side: 'left',
    billboardSize: [18, 11],
    lateralOffset: -13.5
  },

  // ── KM 7: Destination & Contact Billboard ────────────────────────
  {
    id: 'km-7',
    km: 7.0,
    progress: 7.0 / 7.0,
    title: 'DESTINATION: CONTACT & CONNECT',
    subtitle: 'Direct Dispatch // Resume & Recruiter Beacon',
    codeName: 'SAN-HIRE-07',
    accentColor: '#FF3548',
    category: 'destination',
    imageAsset: getAsset('assets/backgrounds/jarvis-holographic-lab.jpg'),
    secondaryImage: getAsset('assets/profile/santhosh-profile-formal.jpg'),
    tagline: 'Seeking entry-level cybersecurity, internship, or SOC analyst roles.',
    statBadge: { label: 'CONTACT', value: 'DISPATCH' },
    bulletPoints: [
      'Email: santhoshkumar160706@gmail.com',
      'Phone: +91 9345402493',
      'Location: Namakkal, India',
      'LinkedIn: linkedin.com/in/santhosh-kumar-8681612a4/',
      'GitHub: https://github.com/santhoshkumariicse-gif/',
      'Portfolio: https://santhoshkumariicse-gif.github.io/portfolio/'
    ],
    narration: 'Destination reached: KM 7 Contact Beacon. Verified contact channels open for entry-level cybersecurity, internship, or SOC analyst roles.',
    interactiveModalType: 'resume',
    side: 'overhead',
    billboardSize: [22, 12]
  }
];

export function getDetailedMilestoneByKM(km: number): HighwayMilestoneData {
  let closest = DETAILED_HIGHWAY_MILESTONES[0];
  let minDiff = Infinity;
  for (const m of DETAILED_HIGHWAY_MILESTONES) {
    const diff = Math.abs(m.km - km);
    if (diff < minDiff) {
      minDiff = diff;
      closest = m;
    }
  }
  return closest;
}
