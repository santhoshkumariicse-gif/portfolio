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

export interface HighwayMilestoneData {
  id: string;
  km: number;
  progress: number;
  title: string;
  subtitle: string;
  codeName: string;
  accentColor: string;
  category: 'origin' | 'profile' | 'education' | 'skills' | 'project' | 'experience' | 'rest-stop' | 'destination';
  imageAsset: string;
  secondaryImage?: string;
  tagline: string;
  statBadge: { label: string; value: string };
  bulletPoints: string[];
  narration: string;
  interactiveModalType?: 'about' | 'education' | 'skills' | 'projects' | 'experience' | 'resume' | 'terminal';
  projectDetails?: MilestoneProjectItem;
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
    subtitle: 'Act 00 // System Ingress & Departure',
    codeName: 'SAN-PORTAL-00',
    accentColor: '#FF1E40',
    category: 'origin',
    imageAsset: getAsset('assets/illustrations/anime-coder-4k-workstation.jpg'),
    secondaryImage: getAsset('assets/ai-interface/san-ai-keynote-telemetry.jpg'),
    tagline: 'Enter the Developer Universe of Santhosh Kumar M.',
    statBadge: { label: 'SPEEDWAY', value: '7.0 KM' },
    bulletPoints: [
      'Full-Stack Developer & AI Systems Engineer',
      'Dual Driving Modes: Cinematic Autopilot & Manual WASD/Touch Controls',
      'Real-Time JARVIS HUD with SAN AI Copilot Telemetry'
    ],
    narration: 'System online. Welcome to the Road of Santhosh. Ingressing at KM 0. Prepare for acceleration.',
    interactiveModalType: 'about',
    side: 'overhead',
    billboardSize: [22, 10]
  },

  // ── KM 1: About Santhosh (Authentic Suit Photo) ───────────────────
  {
    id: 'km-1',
    km: 1.0,
    progress: 1.0 / 7.0,
    title: 'SANTHOSH KUMAR M',
    subtitle: 'Act 01 // Identity, Roots & Engineering Philosophy',
    codeName: 'SAN-BIO-01',
    accentColor: '#FF1E40',
    category: 'profile',
    imageAsset: getAsset('assets/profile/santhosh-profile-formal.jpg'),
    tagline: 'Practical engineering mindset rooted in Karaikal, built for enterprise impact.',
    statBadge: { label: 'VERIFIED', value: 'B.E. CSE' },
    bulletPoints: [
      'Santhosh Kumar M — Full-Stack Developer & AI Systems Specialist',
      'Bachelor of Engineering in CSE at Gnanamani College of Technology (GPA 7.2 / 10)',
      'Practical engineering roots in Karaikal, Tamil Nadu, India',
      'Specialized in building resilient web architectures, autonomous AI pipelines, and defensive security systems'
    ],
    narration: 'Arriving at KM 1: Santhosh Kumar M. Verified computer science engineer specializing in scalable full-stack web and autonomous AI architectures.',
    interactiveModalType: 'about',
    side: 'left',
    billboardSize: [12, 16],
    lateralOffset: -13.0
  },

  // ── KM 2: Academic Overpass ──────────────────────────────────────
  {
    id: 'km-2',
    km: 2.0,
    progress: 2.0 / 7.0,
    title: 'ACADEMIC OVERPASS',
    subtitle: 'Act 02 // Computer Science & Engineering Foundation',
    codeName: 'SAN-EDU-02',
    accentColor: '#00E5FF',
    category: 'education',
    imageAsset: getAsset('assets/illustrations/anime-coder-neon-looking-back.jpg'),
    tagline: 'Gnanamani College of Technology & Nirmala R.C. Higher Secondary School',
    statBadge: { label: 'ACADEMIC GPA', value: '7.2 / 10' },
    bulletPoints: [
      'Gnanamani College of Technology, Namakkal — B.E. Computer Science & Engineering (2023–2027) | First Class (7.2 CGPA)',
      'Nirmala R.C. Higher Secondary School — Higher Secondary Certificate (HSC: 67.5%)',
      'Nirmala R.C. Higher Secondary School — Secondary School Leaving Certificate (SSLC: 69.4%)',
      'Core Competencies: Data Structures, Analysis of Algorithms, Database Management, Operating Systems, Computer Networks'
    ],
    narration: 'Passing KM 2: Academic Overpass. Bachelor of Engineering in Computer Science with verified 7.2 GPA and strong algorithmic foundations.',
    interactiveModalType: 'education',
    side: 'right',
    billboardSize: [18, 10],
    lateralOffset: 13.5
  },

  // ── KM 3: Skills Junction (Direction Signboards) ──────────────────
  {
    id: 'km-3',
    km: 3.0,
    progress: 3.0 / 7.0,
    title: 'SKILLS JUNCTION',
    subtitle: 'Act 03 // Multi-Lane Technology Direction Signs',
    codeName: 'SAN-SKILLS-03',
    accentColor: '#FFB347',
    category: 'skills',
    imageAsset: getAsset('assets/backgrounds/curved-workstation-reference.jpg'),
    tagline: 'Overhead highway signboards directing traffic across 7 technical disciplines.',
    statBadge: { label: 'TECH ARSENAL', value: '25+ TOOLS' },
    bulletPoints: [
      'Lane 1 (Languages): Python, JavaScript (ES6+), TypeScript, Java, C, C++, SQL',
      'Lane 2 (Frontend): React 18, Next.js, Three.js, React Three Fiber, Tailwind CSS, HTML5, CSS3',
      'Lane 3 (Backend): Node.js, Express.js, FastAPI, REST APIs, Microservices Architecture',
      'Lane 4 (Databases): PostgreSQL, MongoDB, MySQL, Redis, Vector Databases (Pinecone/Qdrant)',
      'Lane 5 (Mobile): Android Application Development, Java/Kotlin, XML Layouts',
      'Lane 6 (Developer Tools): Git, GitHub, Docker, Postman, Linux/Bash, Vite, VS Code',
      'Lane 7 (AI & ML): LLM Integration, LangChain, RAG Pipelines, Prompt Engineering'
    ],
    narration: 'Approaching KM 3: Skills Junction. Multi-lane technology direction signs across full-stack languages, backend microservices, and AI pipelines.',
    interactiveModalType: 'skills',
    side: 'overhead',
    billboardSize: [22, 11]
  },

  // ── KM 4A: Project Highway — LorryBook / RDA ──────────────────────
  {
    id: 'km-4a',
    km: 4.0,
    progress: 3.85 / 7.0,
    title: 'LORRYBOOK / RDA',
    subtitle: 'Project 01 // Logistics Geofenced Route & Driver Platform',
    codeName: 'SAN-PROJ-RDA',
    accentColor: '#FF1E40',
    category: 'project',
    imageAsset: getAsset('assets/projects/systems-lab-optical-bus.jpg'),
    tagline: 'Full-stack logistics management platform for freight tracking, queue dispatch, and geofencing.',
    statBadge: { label: 'DOMAIN', value: 'LOGISTICS' },
    bulletPoints: [
      'Built reactive frontend dashboards with real-time lorry driver queue status and route assignments',
      'Engineered REST API endpoints for driver dispatch verification and automated trip logging',
      'Integrated geofencing triggers to automatically record gate arrival and departure timestamps',
      'Optimized SQL queries for fast fleet history lookups and bill of lading reconciliation'
    ],
    narration: 'Approaching Project Billboard 4A: LorryBook and RDA Logistics. End-to-end freight queue and route dispatch architecture.',
    interactiveModalType: 'projects',
    projectDetails: {
      id: 'rda-lorrybook',
      name: 'LorryBook / RDA Logistics',
      badge: 'Full-Stack Fleet Logistics',
      desc: 'Enterprise transport booking and driver queue platform with real-time dispatch and trip logging.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'REST API'],
      githubUrl: 'https://github.com/santhoshkumariicse-gif/portfolio',
      demoUrl: 'https://santhoshkumariicse-gif.github.io/portfolio',
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

  // ── KM 4B: Project Highway — NexusATS ─────────────────────────────
  {
    id: 'km-4b',
    km: 4.3,
    progress: 4.3 / 7.0,
    title: 'NEXUS ATS',
    subtitle: 'Project 02 // Intelligent Resume Parsing & Blind Hiring Engine',
    codeName: 'SAN-PROJ-ATS',
    accentColor: '#00E5FF',
    category: 'project',
    imageAsset: getAsset('assets/ai-interface/avatar-wireframe-diagnostics.jpg'),
    tagline: 'Modern Applicant Tracking System designed for objective talent screening and structured evaluations.',
    statBadge: { label: 'DOMAIN', value: 'HR TECH' },
    bulletPoints: [
      'Automated resume parsing engine extracting candidate skills, experience duration, and education',
      'Blind-review screening mode masking candidate demographic data to eliminate unconscious bias',
      'Stage-gate recruitment pipeline: Applied -> Screening -> Technical -> Final Decision',
      'Role-based access control for interviewers, hiring managers, and HR administrators'
    ],
    narration: 'Approaching Project Billboard 4B: NexusATS. Objective talent screening and automated resume parsing engine.',
    interactiveModalType: 'projects',
    projectDetails: {
      id: 'nexusats',
      name: 'NexusATS',
      badge: 'Applicant Tracking System',
      desc: 'Modern applicant tracking and resume screening system with blind evaluation pipelines.',
      tags: ['TypeScript', 'React', 'FastAPI', 'PostgreSQL', 'Tailwind CSS'],
      githubUrl: 'https://github.com/santhoshkumariicse-gif/portfolio',
      demoUrl: 'https://santhoshkumariicse-gif.github.io/portfolio',
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

  // ── KM 4C: Project Highway — Recall AI ────────────────────────────
  {
    id: 'km-4c',
    km: 4.7,
    progress: 4.7 / 7.0,
    title: 'RECALL AI',
    subtitle: 'Project 03 // Autonomous Multi-Agent RAG Orchestrator',
    codeName: 'SAN-PROJ-RAG',
    accentColor: '#FF1E40',
    category: 'project',
    imageAsset: getAsset('assets/projects/ai-brain-neural-architecture.jpg'),
    tagline: 'Intelligent multi-agent document analysis and vector memory retrieval prototype.',
    statBadge: { label: 'DOMAIN', value: 'GEN AI' },
    bulletPoints: [
      'Developed during collegiate AI hackathon for rapid retrieval over dense technical repositories',
      'Retrieval-Augmented Generation (RAG) architecture chunking and indexing PDFs into vector stores',
      'Autonomous ReAct feedback loop validating model citations against ground-truth source chunks',
      'FastAPI asynchronous backend with streaming LLM completions and caching'
    ],
    narration: 'Approaching Project Billboard 4C: Recall AI. Hackathon-tested autonomous multi-agent RAG orchestrator with vector memory.',
    interactiveModalType: 'projects',
    projectDetails: {
      id: 'recall-ai',
      name: 'Recall AI',
      badge: 'Agentic RAG Engine',
      desc: 'Autonomous multi-agent document analysis engine with Pinecone/Qdrant vector retrieval and citation validation.',
      tags: ['Python', 'FastAPI', 'LangChain', 'OpenAI', 'Pinecone', 'React'],
      githubUrl: 'https://github.com/santhoshkumariicse-gif/portfolio',
      demoUrl: 'https://santhoshkumariicse-gif.github.io/portfolio',
      image: getAsset('assets/projects/ai-brain-neural-architecture.jpg'),
      features: [
        'Hierarchical document vector chunking',
        'Hallucination prevention citation verifier',
        'Multi-agent debate consensus protocol'
      ]
    },
    side: 'left',
    billboardSize: [16, 10],
    lateralOffset: -13.5
  },

  // ── KM 5: Experience Toll Gate ────────────────────────────────────
  {
    id: 'km-5',
    km: 5.0,
    progress: 5.1 / 7.0,
    title: 'EXPERIENCE TOLL GATE',
    subtitle: 'Act 05 // Verified Internships & Professional Milestones',
    codeName: 'SAN-EXP-05',
    accentColor: '#FFB347',
    category: 'experience',
    imageAsset: getAsset('assets/cybersecurity/cyber-soc-threat-command.jpg'),
    tagline: 'Practical engineering internships at Cybernaut and ELITA delivering real features.',
    statBadge: { label: 'INDUSTRY', value: '2 FIRMS' },
    bulletPoints: [
      'Cybernaut — Python Developer Intern (Jul 2024 – Present) | Automation scripts, data parsing, and test harnesses',
      'ELITA — Web & App Developer Intern (Jul 2025 – Aug 2025) | Responsive frontend modules and RESTful endpoints',
      'Collegiate Hackathons: Developed and presented Recall AI multi-agent prototype',
      'Certifications: Python Development, Full-Stack Fundamentals, Cybersecurity Foundations'
    ],
    narration: 'Crossing KM 5: Experience Toll Gate. Software engineering internships at Cybernaut and ELITA delivering real production features.',
    interactiveModalType: 'experience',
    side: 'right',
    billboardSize: [18, 11],
    lateralOffset: 13.5
  },

  // ── KM 6: Rest Stop Sanctuary ────────────────────────────────────
  {
    id: 'km-6',
    km: 6.0,
    progress: 6.0 / 7.0,
    title: 'REST STOP SANCTUARY',
    subtitle: 'Act 06 // Hobbies, Interests & Continuous Learning',
    codeName: 'SAN-REST-06',
    accentColor: '#00E5FF',
    category: 'rest-stop',
    imageAsset: getAsset('assets/illustrations/anime-coder-sunset-cat.jpg'),
    secondaryImage: getAsset('assets/illustrations/anime-coder-purple-study.jpg'),
    tagline: 'Creative reflection, late-night coding sanctuaries & continuous learning.',
    statBadge: { label: 'FOCUS', value: 'FLOW STATE' },
    bulletPoints: [
      'Hobbies: Exploring emerging open-source AI tools, building weekend side prototypes, and reading engineering blogs',
      'Currently Learning: Advanced Three.js shaders, WebGL performance tuning, and Distributed Systems with Go',
      'Passionate about clean code, ergonomic user interfaces, and robust software architecture',
      'Music & Lo-Fi: Companion playlists for sustained deep-focus problem-solving sessions'
    ],
    narration: 'Arriving at KM 6: Rest Stop Sanctuary. Deep focus, creative explorations, and continuous technological craftsmanship.',
    interactiveModalType: 'terminal',
    side: 'left',
    billboardSize: [18, 11],
    lateralOffset: -13.5
  },

  // ── KM 7: Destination City (Hire Me) ─────────────────────────────
  {
    id: 'km-7',
    km: 7.0,
    progress: 7.0 / 7.0,
    title: 'DESTINATION: HIRE ME',
    subtitle: 'Act 07 // Mission Control, Resume Download & Contact Beacon',
    codeName: 'SAN-HIRE-07',
    accentColor: '#FF1E40',
    category: 'destination',
    imageAsset: getAsset('assets/backgrounds/jarvis-holographic-lab.jpg'),
    secondaryImage: getAsset('assets/profile/santhosh-profile-formal.jpg'),
    tagline: 'Ready for high-impact software engineering roles. Let us build the future together.',
    statBadge: { label: 'STATUS', value: 'AVAILABLE' },
    bulletPoints: [
      'Available for Full-Time Software Engineer, Full-Stack Developer, and AI Systems roles',
      'Verified ATS Resume download and engineering credentials ready for review',
      'Direct Contact: santhoshkumariicse@gmail.com | LinkedIn: /in/santhosh-kumar-m',
      'GitHub Repositories: https://github.com/santhoshkumariicse-gif'
    ],
    narration: 'Destination reached: KM 7 Mission Control. Santhosh Kumar M is available for software engineering roles. All systems ready for hire.',
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
