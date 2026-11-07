import { DETAILED_HIGHWAY_MILESTONES, MilestoneProjectItem, MilestoneInternshipItem } from './HighwayMilestones';

export interface PortfolioSection {
  index: number;              // 0 to 6
  sectionNumber: string;      // "01" to "07"
  id: string;                 // 'about', 'education', 'skills', 'projects', 'experience', 'interests', 'contact'
  km: number;                 // Highway KM point
  progress: number;           // 0.0 to 1.0 along the spline
  title: string;              // Section Title
  subtitle: string;           // Section Subtitle
  codeName: string;           // Technical Callout
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

// Map the verified highway milestone data into the exact 7 sequential sections requested by the user:
// 1. About Me (KM 1.0)
// 2. Education (KM 2.0)
// 3. Skills (KM 3.0)
// 4. Projects (KM 4.0)
// 5. Experience (KM 5.1)
// 6. Interests (KM 6.0)
// 7. Contact (KM 7.0)

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
    title: 'ABOUT ME',
    subtitle: 'Santhosh Kumar M',
    codeName: 'SEC-01 // PERSONAL_DOSSIER',
    accentColor: '#39FF88',
    tagline: 'Cybersecurity-focused Computer Science Engineering student interested in cybersecurity research, web application security, vulnerability assessment and software development.',
    statBadge: { label: 'VERIFIED GPA', value: '7.2 / 10' },
    bulletPoints: [
      'Degree: B.E. Computer Science and Engineering — Gnanamani College of Technology, Namakkal',
      'Expected Graduation: May 2027 | Current Verified GPA: 7.2 / 10.0',
      'Location: Namakkal, Tamil Nadu, India',
      'Objective: Seeking entry-level cybersecurity, internship, or SOC analyst roles where analytical rigor and software development can protect critical infrastructure.'
    ]
  },

  // ── 02. Education ─────────────────────────────────────────────────
  {
    index: 1,
    sectionNumber: '02',
    id: 'education',
    km: 2.0,
    progress: 2.0 / 7.0,
    title: 'EDUCATION',
    subtitle: 'Bachelor of Engineering in CSE',
    codeName: 'SEC-02 // ACADEMIC_CREDENTIALS',
    accentColor: '#00BFA5',
    tagline: 'Gnanamani College of Technology, Namakkal — Expected Graduation: May 2027 (GPA: 7.2)',
    statBadge: { label: 'DEGREE', value: 'B.E. CSE' },
    bulletPoints: [
      'Institution: Gnanamani College of Technology, Namakkal, Tamil Nadu',
      'Major: Computer Science and Engineering | Graduation: May 2027 | GPA: 7.2',
      'Coursework: Ethical Hacking and Penetration Testing',
      'Coursework: Computer Networks & Protocol Analysis',
      'Coursework: Operating Systems (Linux & Windows)',
      'Coursework: Object-Oriented Programming (Python & Java)'
    ]
  },

  // ── 03. Skills ────────────────────────────────────────────────────
  {
    index: 2,
    sectionNumber: '03',
    id: 'skills',
    km: 3.0,
    progress: 3.0 / 7.0,
    title: 'TECHNICAL SKILLS',
    subtitle: 'Categorized Competencies & Tools',
    codeName: 'SEC-03 // ARSENAL_MATRIX',
    accentColor: '#00E676',
    tagline: 'Production-verified skill domains without subjective percentages or artificial metrics.',
    statBadge: { label: 'DOMAINS', value: '4 AREAS' },
    bulletPoints: [
      'Programming: Python (automation, scripting), Java, C',
      'Cybersecurity: Web Application Security Basics, Vulnerability Assessment Concepts, CTF Challenges',
      'Vulnerabilities Explored: SQL Injection (SQLi), Cross-Site Scripting (XSS), Broken Authentication',
      'Systems & Tooling: Linux (Basic CLI), Windows, Git, GitHub'
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
    title: 'PROJECTS',
    subtitle: 'Verified Engineering Platforms',
    codeName: 'SEC-04 // ENGINEERING_MISSIONS',
    accentColor: '#39FF88',
    tagline: 'Architectures engineered with modern web stacks, REST APIs, and database persistence.',
    statBadge: { label: 'PROJECTS', value: '3 MISSIONS' },
    bulletPoints: [
      'LorryBook / RDA Logistics: Transport route logistics and driver queue platform with automated dispatch and trip logging.',
      'NexusATS: Modern Applicant Tracking System with automated resume parsing and blind demographic screening.',
      'Recall AI: Collegiate hackathon autonomous multi-agent RAG prototype with vector memory and citation verification.'
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
    title: 'EXPERIENCE',
    subtitle: 'Verified Engineering Internships',
    codeName: 'SEC-05 // INDUSTRY_TENURE',
    accentColor: '#00BFA5',
    tagline: 'Hands-on software development internships at Cybernaut (Karur) and ELITA (Bangalore).',
    statBadge: { label: 'FIRMS', value: '2 INTERNSHIPS' },
    bulletPoints: [
      'Cybernaut (Karur, Tamil Nadu) — Python Developer Intern (July 2024 – Present): Developed and maintained Python scripts, resolved logical and runtime bugs, built clean maintainable code practices.',
      'ELITA (Bangalore, India) — Web and App Development Intern (July 2025 – August 2025): Created modular reusable UI components reducing page build time by ~25%, learned client-server security fundamentals.'
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
    title: 'INTERESTS & SECURITY LAB',
    subtitle: 'Practical Exposure & Campus Involvement',
    codeName: 'SEC-06 // SECURITY_LAB',
    accentColor: '#00E676',
    tagline: 'Practical vulnerability testing in lab environments, CTF challenges, and cybersecurity research.',
    statBadge: { label: 'SECURITY', value: 'CTF & RESEARCH' },
    bulletPoints: [
      'Practical Exposure: Practiced web security testing using intentionally vulnerable apps in controlled labs.',
      'Hands-on Lab Exploration: SQL Injection, Cross-Site Scripting (XSS), and authentication flaws.',
      'Cybersecurity Club Member: Gnanamani College of Technology (August 2022 – May 2024). Participated in web security CTFs.',
      'Personal Interests: Cybersecurity Research, Vulnerability Assessment, Automation Tooling.',
      'Spoken Languages: English (Professional), Tamil (Native).'
    ]
  },

  // ── 07. Contact ───────────────────────────────────────────────────
  {
    index: 6,
    sectionNumber: '07',
    id: 'contact',
    km: 7.0,
    progress: 1.0,
    title: 'CONTACT',
    subtitle: 'Direct Dispatch & Recruiter Channels',
    codeName: 'SEC-07 // DIRECT_DISPATCH',
    accentColor: '#39FF88',
    tagline: 'Seeking entry-level cybersecurity, internship, or SOC analyst roles.',
    statBadge: { label: 'STATUS', value: 'OPEN TO HIRE' },
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
