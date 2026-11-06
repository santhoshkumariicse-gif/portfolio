export type JourneyCategory = 'all' | 'internship' | 'education' | 'security' | 'achievement';
export type JourneyStatus = 'completed' | 'in-progress' | 'planned';

export interface JourneyMilestone {
  id: string;
  year: string;
  month?: string;
  title: string;
  organization: string;
  category: 'internship' | 'education' | 'security' | 'achievement';
  status: JourneyStatus;
  summary: string;
  skills: string[];
  evidence?: string;
}

export const journeyMilestonesData: JourneyMilestone[] = [
  {
    id: 'm-2027-graduation',
    year: '2027',
    month: 'MAY',
    title: 'B.E. Computer Science & Engineering Graduation',
    organization: 'Gnanamani College of Technology',
    category: 'education',
    status: 'planned',
    summary: 'Expected graduation with Bachelor of Engineering degree in Computer Science and Engineering. Target career trajectory: Defensive Security, SOC Operations, or Python Backend Development.',
    skills: ['Operating Systems', 'Computer Networks', 'DBMS', 'Information Security'],
    evidence: 'Current CGPA: 7.2 / 10'
  },
  {
    id: 'm-2025-elita',
    year: '2025',
    month: 'JUL — AUG',
    title: 'Web & App Development Intern',
    organization: 'ELITA',
    category: 'internship',
    status: 'completed',
    summary: 'Engineered responsive client-side UI layouts, evaluated client-server data flows, and implemented accessible WCAG standards for web interfaces.',
    skills: ['HTML5', 'Modern CSS3', 'JavaScript', 'Responsive UI', 'Accessibility'],
    evidence: 'Completed Developer Internship'
  },
  {
    id: 'm-2024-cybernaut',
    year: '2024',
    month: 'JUL — PRESENT',
    title: 'Python Developer Intern',
    organization: 'Cybernaut Technologies',
    category: 'internship',
    status: 'in-progress',
    summary: 'Developing automated server log triage scripts, regex-based authentication anomaly detection routines, and scheduled maintenance automation.',
    skills: ['Python 3', 'Regex Engine', 'Log Triage', 'Automation Scripting', 'File I/O'],
    evidence: 'Active Internship Engagement'
  },
  {
    id: 'm-2024-portswigger',
    year: '2023',
    month: 'DEC',
    title: 'Web Security Assessment Laboratory Training',
    organization: 'PortSwigger Web Security Academy & Lab Sandboxes',
    category: 'security',
    status: 'completed',
    summary: 'Completed controlled ethical hacking laboratories auditing SQL injection (in-band, error-based), Cross-Site Scripting (Reflected/DOM), and parameter tampering.',
    skills: ['Burp Suite', 'OWASP Top 10', 'SQLi Mitigation', 'XSS Encoding'],
    evidence: 'Lab Write-Ups & Verification Notes'
  },
  {
    id: 'm-2023-ctf',
    year: '2023',
    month: 'OCT',
    title: 'Inter-College CTF Competition Participant',
    organization: 'Regional Engineering Cybersecurity Meet',
    category: 'achievement',
    status: 'completed',
    summary: 'Participated in competitive capture-the-flag tracks focusing on network packet analysis with Wireshark and multi-layer cryptographic decoding (Base64/XOR).',
    skills: ['Wireshark', 'Cipher Decoding', 'Reconnaissance', 'Linux Tools'],
    evidence: 'Club Workshop Participation'
  },
  {
    id: 'm-2022-cyber-club',
    year: '2022',
    month: 'AUG — MAY 2024',
    title: 'Cybersecurity Club Active Member & Peer Lead',
    organization: 'Gnanamani College of Technology',
    category: 'security',
    status: 'completed',
    summary: 'Coordinated student study circles analyzing emerging cybersecurity threats, defensive programming, and Linux operating system administration.',
    skills: ['Linux CLI', 'Networking Handshakes', 'Defensive Programming', 'Peer Workshops'],
    evidence: 'Verified Academic Club Record'
  },
  {
    id: 'm-2023-admission',
    year: '2023',
    month: 'AUG',
    title: 'Enrolled in B.E. Computer Science & Engineering',
    organization: 'Gnanamani College of Technology',
    category: 'education',
    status: 'completed',
    summary: 'Commenced undergraduate engineering curriculum focusing on foundational computer science theory, algorithms, and systems programming.',
    skills: ['Python Fundamentals', 'C Programming', 'Discrete Mathematics'],
    evidence: 'Institutional Enrollment'
  }
];

