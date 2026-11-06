export interface GraphNode {
  id: string;
  name: string;
  category: 'languages' | 'backend' | 'security' | 'frontend' | 'tools';
  description: string;
  projectsUsedIn: string[];
  x: number;
  y: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  relation: string;
}

export const graphNodesData: GraphNode[] = [
  // Languages
  {
    id: 'python',
    name: 'Python 3',
    category: 'languages',
    description: 'Primary backend and automation language used for log ingestion, FastAPI prototypes, and security tooling.',
    projectsUsedIn: ['Python Security Automation Scripts', 'HR Recruitment Suite', 'RDA / LorryBook'],
    x: 200,
    y: 100
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'languages',
    description: 'Strictly typed application development for dependable client-side state architecture and design systems.',
    projectsUsedIn: ['Portfolio V7 Platform', 'ELITA Web UI Intern Modules'],
    x: 600,
    y: 100
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'languages',
    description: 'Relational data querying, schema migrations, and parameterized database interaction.',
    projectsUsedIn: ['Web Security Testing Lab', 'RDA PostgreSQL Ledger'],
    x: 320,
    y: 220
  },

  // Backend
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'backend',
    description: 'Asynchronous Python web framework with Pydantic schema validation and OpenAPI generation.',
    projectsUsedIn: ['RDA / LorryBook Dispatch', 'HR Recruitment Suite API'],
    x: 200,
    y: 200
  },
  {
    id: 'regex',
    name: 'Regex Engine',
    category: 'backend',
    description: 'High-speed pattern compilation for authentication syslog triage and skill taxonomy extraction.',
    projectsUsedIn: ['Python Security Automation Scripts', 'HR Candidate Screening'],
    x: 80,
    y: 140
  },

  // Security
  {
    id: 'owasp',
    name: 'OWASP Top 10',
    category: 'security',
    description: 'Defensive web security framework focusing on injection, broken authentication, and security headers.',
    projectsUsedIn: ['Web Security Testing Lab', 'Portfolio Security Hardening'],
    x: 420,
    y: 60
  },
  {
    id: 'sqli-defense',
    name: 'SQLi Defense',
    category: 'security',
    description: 'Architectural enforcement of parameterized queries and prepared statements over fragile string concatenation.',
    projectsUsedIn: ['PortSwigger Lab Audits', 'FastAPI DB Bound Queries'],
    x: 380,
    y: 160
  },
  {
    id: 'xss-mitigation',
    name: 'XSS Encoding',
    category: 'security',
    description: 'Context-aware output encoding and strict Content Security Policy directives to neutralize reflected and stored XSS.',
    projectsUsedIn: ['Portfolio V7 CSP Hardening', 'Web Application Security Lab'],
    x: 500,
    y: 160
  },
  {
    id: 'burp-suite',
    name: 'Burp Suite / ZAP',
    category: 'security',
    description: 'Local intercepting proxy for analyzing HTTP request/response pipelines and parameter tamper vulnerabilities.',
    projectsUsedIn: ['Web Security Testing Lab', 'CTF Reconnaissance'],
    x: 320,
    y: 40
  },

  // Frontend
  {
    id: 'react',
    name: 'React 18',
    category: 'frontend',
    description: 'Component-driven user interface architecture with selective lazy-loading and accessible ARIA state management.',
    projectsUsedIn: ['Portfolio V7 Platform', 'ELITA Web Intern Tasks'],
    x: 600,
    y: 200
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    description: 'Utility-first layout and technical styling with custom token design systems and zero-overhead output.',
    projectsUsedIn: ['Portfolio V7 Platform'],
    x: 720,
    y: 180
  },

  // Tools
  {
    id: 'linux-cli',
    name: 'Linux / Bash',
    category: 'tools',
    description: 'POSIX command-line administration, process inspection, file permissions, and syslog review.',
    projectsUsedIn: ['Cybernaut Python Tooling', 'CTF Challenge Practice'],
    x: 100,
    y: 60
  },
  {
    id: 'git-actions',
    name: 'GitHub Actions CI',
    category: 'tools',
    description: 'Automated static deployment workflows, dependency vulnerability audits, and type-check gates.',
    projectsUsedIn: ['Portfolio GitHub Pages CI/CD'],
    x: 720,
    y: 80
  }
];

export const graphEdgesData: GraphEdge[] = [
  { source: 'python', target: 'fastapi', relation: 'Framework' },
  { source: 'python', target: 'regex', relation: 'Module' },
  { source: 'python', target: 'linux-cli', relation: 'Environment' },
  { source: 'fastapi', target: 'sql', relation: 'Data Access' },
  { source: 'fastapi', target: 'sqli-defense', relation: 'Security' },
  { source: 'owasp', target: 'sqli-defense', relation: 'Guideline' },
  { source: 'owasp', target: 'xss-mitigation', relation: 'Guideline' },
  { source: 'burp-suite', target: 'owasp', relation: 'Testing Tool' },
  { source: 'sql', target: 'sqli-defense', relation: 'Mitigation' },
  { source: 'typescript', target: 'react', relation: 'Type Safety' },
  { source: 'react', target: 'tailwind', relation: 'Styling' },
  { source: 'react', target: 'xss-mitigation', relation: 'Safe Rendering' },
  { source: 'typescript', target: 'git-actions', relation: 'CI Gate' },
  { source: 'fastapi', target: 'react', relation: 'REST API' }
];

