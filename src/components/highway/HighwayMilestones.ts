export interface MilestoneProjectItem {
  name: string;
  badge: string;
  desc: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
}

export interface HighwayMilestoneData {
  id: string;
  km: number;
  progress: number;
  title: string;
  subtitle: string;
  codeName: string;
  accentColor: string;
  category: 'origin' | 'profile' | 'education' | 'skills' | 'projects' | 'experience' | 'rest-stop' | 'destination';
  imageAsset: string;
  secondaryImage?: string;
  tagline: string;
  statBadge: { label: string; value: string };
  bulletPoints: string[];
  narration: string;
  interactiveModalType?: 'about' | 'education' | 'skills' | 'projects' | 'experience' | 'resume' | 'terminal';
  projects?: MilestoneProjectItem[];
  side: 'left' | 'right' | 'overhead';
  billboardSize: [number, number]; // [width, height] in 3D units
}

const BASE_URL = import.meta.env.BASE_URL || '/';
const getAsset = (relativePath: string) => `${BASE_URL}${relativePath.replace(/^\//, '')}`;

export const DETAILED_HIGHWAY_MILESTONES: HighwayMilestoneData[] = [
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
    narration: 'System online. Welcome to the Road of Santhosh. Engaging telemetry bus. Prepare for acceleration.',
    interactiveModalType: 'about',
    side: 'overhead',
    billboardSize: [22, 10]
  },
  {
    id: 'km-1',
    km: 1.0,
    progress: 1.0 / 7.0,
    title: 'ABOUT SANTHOSH',
    subtitle: 'Act 01 // Identity, Roots & Engineering Philosophy',
    codeName: 'SAN-BIO-01',
    accentColor: '#FF3366',
    category: 'profile',
    imageAsset: getAsset('assets/profile/santhosh-profile-formal.jpg'),
    tagline: 'Practical engineering mindset rooted in Karaikal, built for enterprise impact.',
    statBadge: { label: 'LOCATION', value: 'KARAIKAL / TN' },
    bulletPoints: [
      'Authentic profile & engineering philosophy',
      'Specialized in resilient full-stack systems, AI pipelines & cybersecurity',
      'Committed to writing robust, test-driven, maintainable software architectures'
    ],
    narration: 'Arriving at KM 1: About Santhosh. Verified software engineer specializing in scalable full-stack web and autonomous AI architectures.',
    interactiveModalType: 'about',
    side: 'left',
    billboardSize: [12, 15]
  },
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
    tagline: 'Gnanamani College of Technology — B.E. Computer Science & Engineering',
    statBadge: { label: 'ACADEMIC GPA', value: '7.2 / 10' },
    bulletPoints: [
      'Bachelor of Engineering in CSE (2023–2027) | First Class Standing',
      'Nirmala R.C. Higher Secondary School (HSC: 67.5% | SSLC: 69.4%)',
      'Core focus: Algorithms, Data Structures, Operating Systems, Database Internals'
    ],
    narration: 'Passing KM 2: Academic Overpass. Bachelor of Engineering in Computer Science with a strong grounding in core system fundamentals.',
    interactiveModalType: 'education',
    side: 'right',
    billboardSize: [18, 10]
  },
  {
    id: 'km-3',
    km: 3.0,
    progress: 3.0 / 7.0,
    title: 'SKILLS JUNCTION',
    subtitle: 'Act 03 // Multi-Lane Technology Arsenal',
    codeName: 'SAN-SKILLS-03',
    accentColor: '#C7FF45',
    category: 'skills',
    imageAsset: getAsset('assets/backgrounds/curved-workstation-reference.jpg'),
    tagline: 'Enterprise-grade languages, distributed backends, AI agents & security toolkits.',
    statBadge: { label: 'TECH STACK', value: '25+ TOOLS' },
    bulletPoints: [
      'Languages: Python, TypeScript, JavaScript (ES6+), Java, C, C++, SQL',
      'Frameworks: React 18, Next.js, Three.js, Node.js, Express, FastAPI, Tailwind CSS',
      'Data & AI: PostgreSQL, MongoDB, Redis, LangChain, RAG Architectures, Vector DBs'
    ],
    narration: 'Approaching KM 3: Skills Junction. Multi-stack technical arsenal across full-stack development, distributed databases, and agentic AI.',
    interactiveModalType: 'skills',
    side: 'left',
    billboardSize: [18, 11]
  },
  {
    id: 'km-4',
    km: 4.0,
    progress: 4.0 / 7.0,
    title: 'PROJECT HIGHWAY',
    subtitle: 'Act 04 // Production Software Architectures',
    codeName: 'SAN-PROJECTS-04',
    accentColor: '#FF1E40',
    category: 'projects',
    imageAsset: getAsset('assets/projects/ai-brain-neural-architecture.jpg'),
    secondaryImage: getAsset('assets/projects/systems-lab-optical-bus.jpg'),
    tagline: 'Real software built for enterprise operations, logistics & autonomous AI.',
    statBadge: { label: 'PRODUCTION', value: '4 MAJOR' },
    bulletPoints: [
      'Recall AI — Autonomous Multi-Agent RAG Orchestrator with Vector Store',
      'Inside the Systems Lab — High-Throughput Photonic Data Bus Simulator',
      'LorryBook / RDA — Geofenced Route Logistics & Driver Queue Platform',
      'NexusATS — Modern Resume Parsing & Blind Hiring Screening Engine'
    ],
    narration: 'Entering KM 4: Project Highway. Featuring production-ready AI orchestration, logistics telemetry, and reactive microservices.',
    interactiveModalType: 'projects',
    projects: [
      {
        name: 'Recall AI',
        badge: 'AI / RAG Orchestrator',
        desc: 'Autonomous multi-agent document analysis engine with Pinecone/Qdrant vector retrieval.',
        tags: ['FastAPI', 'LangChain', 'PostgreSQL', 'React', 'OpenAI'],
        githubUrl: 'https://github.com/santhoshkumariicse-gif/portfolio'
      },
      {
        name: 'Systems Lab Microservices',
        badge: 'Distributed Systems',
        desc: 'Sub-millisecond optical bus simulator and telemetry pipeline with event streaming.',
        tags: ['TypeScript', 'Three.js', 'Node.js', 'WebSockets'],
        githubUrl: 'https://github.com/santhoshkumariicse-gif/portfolio'
      }
    ],
    side: 'right',
    billboardSize: [20, 11]
  },
  {
    id: 'km-5',
    km: 5.0,
    progress: 5.0 / 7.0,
    title: 'EXPERIENCE TOLL GATE',
    subtitle: 'Act 05 // Professional Industry Internships',
    codeName: 'SAN-WORK-05',
    accentColor: '#FFB347',
    category: 'experience',
    imageAsset: getAsset('assets/cybersecurity/cyber-soc-threat-command.jpg'),
    tagline: 'Hands-on full stack development and Python automation in real industry teams.',
    statBadge: { label: 'EXPERIENCE', value: '2 FIRMS' },
    bulletPoints: [
      'Cybernaut — Full Stack Web Development Intern (May 2024 – Nov 2024)',
      'Built reactive frontend dashboards, REST APIs, and database models',
      'ELITA — Python Automation & Software Intern | Automated background jobs & scrapers'
    ],
    narration: 'Crossing KM 5: Experience Toll Gate. Software engineering internships at Cybernaut and ELITA delivering real production features.',
    interactiveModalType: 'experience',
    side: 'left',
    billboardSize: [18, 11]
  },
  {
    id: 'km-6',
    km: 6.0,
    progress: 6.0 / 7.0,
    title: 'REST STOP SANCTUARY',
    subtitle: 'Act 06 // Work-Life Harmony & Creative Coding',
    codeName: 'SAN-REST-06',
    accentColor: '#00E5FF',
    category: 'rest-stop',
    imageAsset: getAsset('assets/illustrations/anime-coder-sunset-cat.jpg'),
    secondaryImage: getAsset('assets/illustrations/anime-coder-purple-study.jpg'),
    tagline: 'Creative reflection, late-night coding sanctuaries & continuous learning.',
    statBadge: { label: 'FOCUS', value: 'LO-FI' },
    bulletPoints: [
      'Continuous open-source exploration, hackathons, and creative dev labs',
      'Music and deep-focus lo-fi development flow states',
      'Curiosity-driven engineering and architectural experimentation'
    ],
    narration: 'Arriving at KM 6: Rest Stop Sanctuary. Deep focus, creative explorations, and continuous technological craftsmanship.',
    interactiveModalType: 'terminal',
    side: 'right',
    billboardSize: [18, 11]
  },
  {
    id: 'km-7',
    km: 7.0,
    progress: 7.0 / 7.0,
    title: 'DESTINATION: HIRE ME',
    subtitle: 'Act 07 // Mission Control, Resume & Direct Dispatch',
    codeName: 'SAN-HIRE-07',
    accentColor: '#FF1E40',
    category: 'destination',
    imageAsset: getAsset('assets/backgrounds/jarvis-holographic-lab.jpg'),
    secondaryImage: getAsset('assets/profile/santhosh-profile-formal.jpg'),
    tagline: 'Ready for high-impact software engineering roles. Let us build the future.',
    statBadge: { label: 'STATUS', value: 'AVAILABLE' },
    bulletPoints: [
      'Download Verified ATS Resume & Engineering Dossier',
      'Direct contact terminal: Email, Phone, LinkedIn, GitHub',
      'Available for Full-Time Software Engineer & Full-Stack Developer roles'
    ],
    narration: 'Destination reached: KM 7 Mission Control. Santhosh Kumar M is available for software engineering roles. All systems ready for hire.',
    interactiveModalType: 'resume',
    side: 'overhead',
    billboardSize: [22, 12]
  }
];

export function getDetailedMilestoneByKM(km: number): HighwayMilestoneData {
  const rounded = Math.round(Math.max(0, Math.min(7, km)));
  return DETAILED_HIGHWAY_MILESTONES[rounded] || DETAILED_HIGHWAY_MILESTONES[0];
}

