import { DETAILED_HIGHWAY_MILESTONES, MilestoneProjectItem, MilestoneInternshipItem } from './HighwayMilestones';

export interface PortfolioSection {
  index: number;              // 0 to 6
  sectionNumber: string;      // "01" to "07"
  id: string;                 // 'about', 'education', 'skills', 'projects', 'experience', 'interests', 'contact'
  km: number;                 // Highway KM coordinate
  progress: number;           // 0.0 to 1.0 along the spline
  title: string;              // Professional Section Title
  subtitle: string;           // Descriptive Subtitle
  codeName: string;           // Professional Category Identifier
  accentColor: string;        // Hex Accent Color
  tagline: string;
  statBadge: { label: string; value: string };
  bulletPoints: string[];
  skillsCategories?: { category: string; skills: string[] }[];
  projects?: MilestoneProjectItem[];
  internships?: MilestoneInternshipItem[];
  contactInfo?: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
}

const skillsMilestone = DETAILED_HIGHWAY_MILESTONES.find((m) => m.id === 'km-3')!;
const projMilestones = DETAILED_HIGHWAY_MILESTONES.filter((m) => m.category === 'project');
const expMilestone = DETAILED_HIGHWAY_MILESTONES.find((m) => m.id === 'km-5')!;

export const PORTFOLIO_SECTIONS: PortfolioSection[] = [
  // ── 01. About Me ──────────────────────────────────────────────────
  {
    index: 0,
    sectionNumber: '01',
    id: 'about',
    km: 1.0,
    progress: 1.0 / 7.0,
    title: 'About Santhosh',
    subtitle: 'Computer Science Student & Security Enthusiast',
    codeName: 'OVERVIEW // PROFILE',
    accentColor: '#39FF88',
    tagline: 'Computer Science Engineering undergraduate with hands-on exposure to vulnerability assessment, web application security testing, and Python tooling.',
    statBadge: { label: 'ACADEMIC STANDING', value: 'GPA: 7.2' },
    bulletPoints: [
      'B.E. Computer Science & Engineering candidate at Gnanamani College of Technology, Namakkal (May 2027).',
      'Verified Academic Performance: GPA 7.2 / 10.0 with strong foundations in networking and operating systems.',
      'Core technical focus: Application vulnerability assessment (OWASP Top 10), Python automation, and defensive security hygiene.',
      'Active candidate for entry-level cybersecurity positions, junior software development, and security internships.'
    ]
  },

  // ── 02. Education ─────────────────────────────────────────────────
  {
    index: 1,
    sectionNumber: '02',
    id: 'education',
    km: 2.0,
    progress: 2.0 / 7.0,
    title: 'Academic Foundations',
    subtitle: 'B.E. in Computer Science & Engineering',
    codeName: 'ACADEMIC // CREDENTIALS',
    accentColor: '#00BFA5',
    tagline: 'Rigorous coursework in ethical hacking, networking protocols, and systems programming at Gnanamani College of Technology.',
    statBadge: { label: 'EXPECTED DEGREE', value: 'B.E. CSE (2027)' },
    bulletPoints: [
      'Institution: Gnanamani College of Technology, Namakkal, Tamil Nadu, India.',
      'Major: Computer Science and Engineering | Current GPA: 7.2 / 10.0.',
      'Ethical Hacking & Penetration Testing: Practical vulnerability identification, exploitation principles, and defense mechanisms.',
      'Computer Networks: Protocol stack analysis (TCP/IP, UDP, DNS, HTTP/S), packet flow, and network security foundations.',
      'Operating Systems: Process scheduling, memory virtualization, Linux terminal administration, and Windows internals.'
    ]
  },

  // ── 03. Skills ────────────────────────────────────────────────────
  {
    index: 2,
    sectionNumber: '03',
    id: 'skills',
    km: 3.0,
    progress: 3.0 / 7.0,
    title: 'Technical Competencies',
    subtitle: 'Demonstrated Engineering & Security Skills',
    codeName: 'COMPETENCY // MATRIX',
    accentColor: '#00E676',
    tagline: 'Verified technical proficiencies across programming languages, security assessment concepts, and systems.',
    statBadge: { label: 'SPECIALIZATION', value: 'SECURITY & DEV' },
    bulletPoints: [
      'Programming: Python for automation, script writing, and tooling; Java and C for core algorithmic foundations.',
      'Application Security: Practical understanding of SQL Injection, Cross-Site Scripting (XSS), and Broken Authentication flaws.',
      'Vulnerability Assessment: Manual auditing techniques and lab-tested identification across vulnerable endpoints.',
      'Platforms & Tooling: Linux CLI administration, Windows system configuration, Git version control, and GitHub workflows.'
    ],
    skillsCategories: skillsMilestone.skillsCategories
  },

  // ── 04. Projects ──────────────────────────────────────────────────
  {
    index: 3,
    sectionNumber: '04',
    id: 'projects',
    km: 4.0,
    progress: 4.0 / 7.0,
    title: 'Featured Projects',
    subtitle: 'Production & Prototype Architectures',
    codeName: 'ENGINEERING // CASE STUDIES',
    accentColor: '#39FF88',
    tagline: 'Practical software solutions engineered with React, TypeScript, Python FastAPI, and PostgreSQL.',
    statBadge: { label: 'VERIFIED BUILDS', value: '3 PLATFORMS' },
    bulletPoints: [
      'LorryBook / RDA: Logistics management and driver queue tracking platform with automated trip scheduling and geofenced triggers.',
      'NexusATS: Applicant tracking system engineered with automated resume parsing and blind demographic screening to mitigate bias.',
      'Recall AI: Collegiate hackathon AI prototype combining vector retrieval (RAG), citation validation, and automated source synthesis.'
    ],
    projects: projMilestones.map((p) => p.projectDetails!).filter(Boolean)
  },

  // ── 05. Experience ────────────────────────────────────────────────
  {
    index: 4,
    sectionNumber: '05',
    id: 'experience',
    km: 5.1,
    progress: 5.1 / 7.0,
    title: 'Work Experience',
    subtitle: 'Software Development Internships',
    codeName: 'INDUSTRY // TENURE',
    accentColor: '#00BFA5',
    tagline: 'Verified software engineering and scripting internships at Cybernaut (Karur) and ELITA (Bangalore).',
    statBadge: { label: 'VERIFIED ROLES', value: '2 INTERNSHIPS' },
    bulletPoints: [
      'Cybernaut (Karur, Tamil Nadu) — Python Developer Intern (July 2024 – Present): Developed and optimized modular Python scripts, resolved runtime logic bottlenecks, and adhered to clean code principles applicable to automated tooling.',
      'ELITA (Bangalore, Karnataka) — Web & App Development Intern (July 2025 – August 2025): Created reusable UI components cutting sprint build times by ~25%, and integrated client-server data flows with defensive error handling.'
    ],
    internships: expMilestone.internships
  },

  // ── 06. Interests ─────────────────────────────────────────────────
  {
    index: 5,
    sectionNumber: '06',
    id: 'interests',
    km: 6.0,
    progress: 6.0 / 7.0,
    title: 'Security Labs & Interests',
    subtitle: 'Hands-on CTFs & Collegiate Involvement',
    codeName: 'SECURITY // LABS & CTF',
    accentColor: '#00E676',
    tagline: 'Hands-on security testing in lab environments, Capture The Flag competitions, and cybersecurity research.',
    statBadge: { label: 'CAMPUS ROLE', value: 'CYBER CLUB' },
    bulletPoints: [
      'Hands-on Lab Exploration: Practiced vulnerability identification and mitigation against OWASP Top 10 vulnerabilities in lab environments.',
      'Capture The Flag (CTF): Active competitor in collegiate CTF challenges covering web challenges, cryptography basics, and reverse engineering.',
      'Cybersecurity Club Member: Gnanamani College of Technology (August 2022 – May 2024). Organized peer technical sessions on safe web development.',
      'Personal Research Interests: Threat analysis, offensive/defensive tooling, API security, and Python security automation.',
      'Languages: English (Professional Working Proficiency), Tamil (Native).'
    ]
  },

  // ── 07. Contact ───────────────────────────────────────────────────
  {
    index: 6,
    sectionNumber: '07',
    id: 'contact',
    km: 7.0,
    progress: 1.0,
    title: 'Connect & Inquire',
    subtitle: 'Direct Communication Channels',
    codeName: 'DISPATCH // GET IN TOUCH',
    accentColor: '#39FF88',
    tagline: 'Currently open to entry-level cybersecurity roles, software development opportunities, and security internships.',
    statBadge: { label: 'WORK STATUS', value: 'AVAILABLE' },
    bulletPoints: [
      'Email: santhoshkumar160706@gmail.com',
      'Phone: +91 9345402493',
      'Location: Namakkal, Tamil Nadu, India',
      'LinkedIn: linkedin.com/in/santhosh-kumar-8681612a4/',
      'GitHub: github.com/santhoshkumariicse-gif/',
      'Portfolio: santhoshkumariicse-gif.github.io/portfolio/'
    ],
    contactInfo: {
      email: 'santhoshkumar160706@gmail.com',
      phone: '+91 9345402493',
      location: 'Namakkal, Tamil Nadu, India',
      linkedin: 'https://linkedin.com/in/santhosh-kumar-8681612a4/',
      github: 'https://github.com/santhoshkumariicse-gif/',
      portfolio: 'https://santhoshkumariicse-gif.github.io/portfolio/'
    }
  }
];

export function getSectionByIndex(index: number): PortfolioSection {
  const clamped = Math.max(0, Math.min(index, PORTFOLIO_SECTIONS.length - 1));
  return PORTFOLIO_SECTIONS[clamped];
}
