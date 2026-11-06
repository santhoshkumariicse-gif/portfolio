export interface EngineeringLog {
  id: string;
  date: string;
  tag: string;
  title: string;
  details: string;
}

export interface RoadmapItem {
  stage: 'in_progress' | 'planned' | 'completed';
  title: string;
  focusArea: string;
  target: string;
}

export const commandCenterData = {
  status: {
    state: 'NOMINAL',
    availability: 'Open to Internship & Full-time Roles',
    location: 'Namakkal, Tamil Nadu, India',
    timezone: 'IST (UTC+05:30)',
    currentInternship: 'Python Developer Intern @ Cybernaut (Jul 2024–Present)',
    degree: 'B.E. Computer Science, GCT (Graduating May 2027, GPA: 7.2/10)'
  },
  focusAreas: [
    {
      title: 'Defensive Security & Threat Triage',
      desc: 'Hands-on practice analyzing HTTP request vectors, identifying SQLi/XSS vulnerabilities in sandboxed lab environments (DVWA, PortSwigger), and applying OWASP Top 10 defenses.'
    },
    {
      title: 'Python Tooling & Backend Automation',
      desc: 'Developing automated log parsers, structured regex file triage daemons, and RESTful APIs using Python 3, FastAPI, and PostgreSQL.'
    },
    {
      title: 'AI System Guardrails & Prompt Defenses',
      desc: 'Studying emerging LLM guardrail architectures, input normalization against prompt injection (OWASP LLM-01), and constrained ReAct agent workflows.'
    }
  ],
  engineeringLogs: [
    {
      id: 'log-04',
      date: 'OCT 2024',
      tag: 'SECURITY LABS',
      title: 'PortSwigger Web Security Academy Labs',
      details: 'Completed exercises evaluating reflected XSS, blind SQL injection parameter tampering, and session cookie validation defenses in controlled environments.'
    },
    {
      id: 'log-03',
      date: 'AUG 2024',
      tag: 'AI EXPLORATION',
      title: 'Recall AI Semantic Chunking Prototype',
      details: 'Drafted architecture notes and Python prototype script for overlapping document tokenization and cosine similarity vector retrieval.'
    },
    {
      id: 'log-02',
      date: 'JUL 2024',
      tag: 'INTERNSHIP',
      title: 'Cybernaut Developer Internship Onboarding',
      details: 'Began building Python automation scripts, handling structured log files, and streamlining backend verification routines.'
    },
    {
      id: 'log-01',
      date: 'MAY 2024',
      tag: 'ACADEMIC / CTF',
      title: 'GCT Cybersecurity Club Workshops',
      details: 'Participated in peer workshops on network reconnaissance (Nmap), packet inspection (Wireshark), and encoding/decoding challenges.'
    }
  ] as EngineeringLog[],
  roadmap: [
    {
      stage: 'in_progress',
      title: 'Network Packet Analysis & Wireshark Triage',
      focusArea: 'Defensive SOC',
      target: 'Q1-Q2 2025'
    },
    {
      stage: 'in_progress',
      title: 'Linux Kernel & System Hardening Audits',
      focusArea: 'Systems Security',
      target: 'Q2 2025'
    },
    {
      stage: 'planned',
      title: 'Docker & Container Isolation Sandboxing',
      focusArea: 'DevSecOps',
      target: 'Q3 2025'
    },
    {
      stage: 'planned',
      title: 'Security Certification Exam Preparation (Security+)',
      focusArea: 'Industry Credential',
      target: '2026'
    }
  ] as RoadmapItem[]
};

