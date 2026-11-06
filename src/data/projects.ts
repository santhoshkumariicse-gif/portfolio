import { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: 'rda-lorrybook',
    number: '01 / 06',
    title: 'LorryBook / RDA — Acting Driver Booking Platform',
    category: 'Logistics Architecture · Booking Dispatch',
    status: 'Prototype',
    isConceptual: true,
    featured: true,
    order: 1,
    tagline: 'On-demand truck and driver allocation platform designed for regional logistics coordination.',
    problem: 'Traditional freight and driver scheduling suffers from fragmented phone-based dispatches, lack of route verification, and delayed proof-of-delivery reconciliation.',
    solution: 'Designed an event-driven dispatch architecture combining geofenced trip telemetry, driver availability queues, and digital proof-of-delivery receipts.',
    technologies: ['Python', 'PostgreSQL', 'FastAPI', 'REST APIs', 'Leaflet / Geofencing'],
    keyFeatures: [
      'Geofenced driver availability matching queue',
      'Trip telemetry and route verification models',
      'Digital proof-of-delivery receipts reconciliation',
      'Clean role-based access for drivers, fleet managers, and operators'
    ],
    contribution: 'Architected backend data schemas in PostgreSQL, implemented FastAPI endpoint specifications, and prototyped dispatch queue logic.',
    evidenceNote: 'Conceptual architecture prototype. Core data schema and route dispatch logic drafted in repository notes; live deployment link is not yet publicly hosted.',
    repoUrl: 'https://github.com/santhoshkumariicse-gif/portfolio',
    architectureType: 'rda'
  },
  {
    id: 'hr-recruitment-suite',
    number: '02 / 06',
    title: 'NexusATS — Recruitment & Applicant Tracking System',
    category: 'Workflow Automation · Parsing Pipeline',
    status: 'In development',
    isConceptual: true,
    featured: true,
    order: 2,
    tagline: 'Candidate pipeline automation tool featuring structured resume ingestion and stage-gate triage.',
    problem: 'Manual applicant screening across technical roles leads to candidate drop-off, inconsistent scoring metrics, and recruiter bottlenecking during high-volume intake.',
    solution: 'Engineered a multi-stage resume parsing workflow extracting technical skill taxonomies, sanitizing personal identifiers for blind review, and triggering status hooks.',
    technologies: ['Python', 'FastAPI', 'SQLite / JSON Schema', 'Regex Triage', 'HTML/CSS UI'],
    keyFeatures: [
      'Structured resume data extraction and tokenization',
      'Technical skill taxonomy classification',
      'Blind review personal identifier sanitization',
      'Stage-gate interview lifecycle status transitions'
    ],
    contribution: 'Implemented resume parsing scripts in Python, modeled candidate pipeline schema in SQLite, and designed responsive web triage views.',
    evidenceNote: 'Pipeline logic and schema models designed during internship learning; currently undergoing modular refactoring before public repository release.',
    repoUrl: 'https://github.com/santhoshkumariicse-gif/portfolio',
    architectureType: 'hr-suite'
  },
  {
    id: 'recall-ai',
    number: '03 / 06',
    title: 'Recall AI — Contextual Knowledge Assistant (Hackathon Project)',
    category: 'Information Retrieval · Vector Concepts',
    status: 'Prototype',
    isConceptual: true,
    featured: true,
    order: 3,
    tagline: 'Local knowledge assistant exploring semantic chunking, vector embeddings, and contextual retrieval.',
    problem: 'Standard keyword searching fails to capture conceptual relationships across unstructured personal study notes, technical documentation, and write-ups.',
    solution: 'Constructed an offline retrieval-augmented prototype dividing documents into overlapping semantic chunks, querying embedding stores, and synthesizing context.',
    technologies: ['Python', 'Vector Retrieval Concepts', 'Semantic Embeddings', 'JSON Storage'],
    keyFeatures: [
      'Document tokenization and sliding window semantic chunking',
      'Vector similarity search prototype using local embeddings',
      'Context-aware query matching and reference synthesis',
      'Lightweight local JSON document store for offline experimentation'
    ],
    contribution: 'Built the core document segmentation script in Python, formatted embedding payloads, and tested semantic lookup queries during hackathon prototyping.',
    evidenceNote: 'Architecture exploration and local retrieval scripts built for technical study and hackathon prototyping. External API integrations remain in local sandbox.',
    repoUrl: 'https://github.com/santhoshkumariicse-gif/portfolio',
    architectureType: 'recall-ai'
  },
  {
    id: 'web-sec-testing',
    number: '04 / 06',
    title: 'Web Application Security Testing & Mitigation',
    category: 'Defensive Security · Vulnerability Assessment',
    status: 'Learning project',
    isConceptual: false,
    featured: false,
    order: 4,
    tagline: 'Controlled security evaluations studying attack surfaces across OWASP Top 10 web vulnerabilities.',
    problem: 'Web applications often deploy with subtle input validation gaps, improper session handling, and injection risks in database query constructions.',
    solution: 'Conducted targeted penetration audits against intentionally vulnerable test environments (DVWA, PortSwigger Web Security Academy) to document defensive mitigations for SQLi, XSS, and CSRF.',
    technologies: ['Burp Suite', 'OWASP ZAP', 'HTTP Inspection', 'Input Sanitization', 'SQL Injection Testing'],
    keyFeatures: [
      'Interception and manipulation of HTTP request parameters',
      'SQL injection detection and parameterized query mitigation',
      'Stored and reflected cross-site scripting (XSS) defense analysis',
      'Defensive security documentation checklists for web projects'
    ],
    contribution: 'Executed controlled lab audits, documented remediation code snippets in Python/SQL, and integrated input validation patterns into web projects.',
    evidenceNote: 'Verified hands-on practice conducted in ethical lab sandboxes. Documented defensive checklists applied to web development internship projects.',
    architectureType: 'sec-test'
  },
  {
    id: 'python-security-automation',
    number: '05 / 06',
    title: 'Python Security & Log Automation Tooling',
    category: 'Security Tooling · Log Parsing Daemon',
    status: 'Completed',
    isConceptual: false,
    featured: false,
    order: 5,
    tagline: 'Automated scripts for security monitoring, log parsing, and repeatable verification routines.',
    problem: 'Manual inspection of high-volume server authentication logs is error-prone and delays response times during brute-force or unauthorized access probes.',
    solution: 'Developed modular Python scripts utilizing regular expression triage, threshold-based alert triggers, and structured output dispatch to identify repeated authentication anomalies.',
    technologies: ['Python 3', 'Regex Engine', 'File I/O', 'CLI Automation', 'JSON/CSV Reporting'],
    keyFeatures: [
      'Automated syslog parsing and authentication event classification',
      'Threshold-based IP brute-force probe detection',
      'CSV / JSON report generation for daily operations',
      'Lightweight headless execution suitable for scheduled cron jobs'
    ],
    contribution: 'Authored and tested production log parsing routines during developer internship at Cybernaut (Jul 2024–Present).',
    evidenceNote: 'Verified developer internship contribution at Cybernaut (Jul 2024–Present) building automation and maintenance tooling.',
    architectureType: 'py-automation'
  },
  {
    id: 'ctf-challenge-practice',
    number: '06 / 06',
    title: 'CTF Challenge Practice & Cryptography Labs',
    category: 'Practical Labs · Cryptography & Recon',
    status: 'Learning project',
    isConceptual: false,
    featured: false,
    order: 6,
    tagline: 'Hands-on capture-the-flag problem-solving spanning reconnaissance, encoding, and web exploitation.',
    problem: 'Theoretical security knowledge requires fast-paced practical reasoning and rigorous edge-case investigation under competitive time constraints.',
    solution: 'Participated in collaborative security club workshops and CTF platform challenges focusing on HTTP packet analysis, cipher decoding, and perimeter reconnaissance.',
    technologies: ['Wireshark', 'Linux CLI', 'Base64/XOR Decoding', 'Nmap', 'Web Exploitation Labs'],
    keyFeatures: [
      'Network packet capture analysis using Wireshark',
      'Multi-layer encoding identification and decoding routines',
      'Port and service discovery scripting with Nmap',
      'Capture-the-flag team problem solving and strategy writeups'
    ],
    contribution: 'Active member and problem solver with Gnanamani College of Technology Cybersecurity Club (Aug 2022–May 2024).',
    evidenceNote: 'Verified member activity with Gnanamani College of Technology Cybersecurity Club (Aug 2022–May 2024).',
    architectureType: 'ctf-matrix'
  }
];
