export interface ProjectDemoDetail {
  id: string;
  title: string;
  category: string;
  status: 'Production Tool' | 'Lab Study' | 'In Development' | 'Conceptual Schema';
  tagline: string;
  targetUsers: string[];
  problem: string;
  solution: string;
  techStack: string[];
  designTradeoffs: string[];
  knownLimitations: string[];
  futureRoadmap: string[];
  interactiveDemoType: 'log-triage' | 'sql-parameter' | 'resume-parse' | 'lorry-book';
  repoUrl?: string;
}

export const projectDemosData: ProjectDemoDetail[] = [
  {
    id: 'python-security-automation',
    title: 'Python Security Log Triage Daemon',
    category: 'Security Tooling · Automation',
    status: 'Production Tool',
    tagline: 'High-throughput auth log watcher utilizing precompiled regular expressions and threshold alerting.',
    targetUsers: [
      'Linux System Administrators monitoring SSH/auth logs',
      'Junior SOC Analysts triaging repeated brute-force probes',
      'DevOps Engineers requiring lightweight log alerting without heavy SIEM overhead'
    ],
    problem: 'Manual log inspection during high-concurrency brute-force attacks results in delayed remediation and alert fatigue.',
    solution: 'Constructed a streaming Python daemon utilizing memory-efficient non-blocking file tailing, precompiled regex parsing, and a sliding-window counter tracking failed login spikes.',
    techStack: ['Python 3.11', 're (Regex Module)', 'POSIX File Descriptors', 'JSON Reporter'],
    designTradeoffs: [
      'Chose pure Python standard library over third-party frameworks to ensure zero external dependency footprint on hardened servers.',
      'Adopted an in-memory sliding window deque rather than disk-backed database for microsecond-level triage latency.'
    ],
    knownLimitations: [
      'Current daemon runs as a single-node script; multi-host cluster aggregation requires centralized syslog forwarding.',
      'Does not natively parse binary systemd journal files without python-systemd bindings.'
    ],
    futureRoadmap: [
      'Implement asynchronous POSIX inotify bindings for lower CPU polling overhead.',
      'Add structured webhook dispatch for Slack and Discord alerts.'
    ],
    interactiveDemoType: 'log-triage',
    repoUrl: 'https://github.com/santhoshkumariicse-gif'
  },
  {
    id: 'web-sec-testing',
    title: 'Web Application Security Testing Lab',
    category: 'Defensive Security · Assessment',
    status: 'Lab Study',
    tagline: 'Hands-on penetration audits documenting defensive mitigations across OWASP Top 10 vulnerabilities.',
    targetUsers: [
      'Application Security Trainees studying injection countermeasures',
      'Web Developers seeking secure coding patterns for SQL and XSS',
      'Penetration Testing Students preparing for security certifications'
    ],
    problem: 'Web applications frequently harbor latent injection flaws due to dynamic string concatenation in queries and unescaped HTML reflection sinks.',
    solution: 'Conducted rigorous vulnerability assessments in isolated lab environments (DVWA, PortSwigger), authoring defensive parameterization checklists and Content Security Policy blueprints.',
    techStack: ['Burp Suite Community', 'OWASP ZAP', 'HTTP/1.1 Inspection', 'Parameterized SQL', 'CSP v3'],
    designTradeoffs: [
      'Strictly segregated all testing into local, permissioned lab environments rather than live public assets.',
      'Emphasized deterministic architectural mitigations (prepared statements) over fragile heuristic regex filters.'
    ],
    knownLimitations: [
      'Evaluations focus on standard web application layers; hardware and kernel exploit surfaces are out of scope.',
      'Automated scanners miss complex business logic flaws requiring manual request sequencing.'
    ],
    futureRoadmap: [
      'Publish reproducible Docker-compose lab environments for peer security club workshops.',
      'Expand audit documentation to cover OAuth 2.0 and JWT authorization bypass vectors.'
    ],
    interactiveDemoType: 'sql-parameter',
    repoUrl: 'https://github.com/santhoshkumariicse-gif'
  },
  {
    id: 'hr-recruitment-suite',
    title: 'NexusATS — Recruitment & Applicant Tracking System',
    category: 'Workflow Automation · Parsing Pipeline',
    status: 'In Development',
    tagline: 'Structured candidate parsing workflow extracting technical taxonomies and sanitizing personal identifiers.',
    targetUsers: [
      'Technical Recruiters processing high-volume intake batches',
      'Hiring Managers requiring blind candidate reviews to mitigate bias',
      'Human Resources Coordinators managing multi-stage technical screens'
    ],
    problem: 'Manual screening of diverse resume formats introduces cognitive recruiter fatigue and inconsistent skill scoring.',
    solution: 'Engineered a multi-stage parser validating input resumes against standardized JSON schemas, extracting keyword taxonomies, and masking identifiable demographic fields.',
    techStack: ['Python 3', 'FastAPI', 'JSON Schema Validation', 'Regex Taxonomies', 'SQLite'],
    designTradeoffs: [
      'Implemented strict schema validation rejecting malformed documents before extraction logic executes.',
      'Separated sensitive personal metadata into an encrypted identifier lookup table.'
    ],
    knownLimitations: [
      'Complex multi-column or graphical resumes without OCR require pre-conversion into structured text.',
      'Currently operates as a local API service before cloud container deployment.'
    ],
    futureRoadmap: [
      'Implement PDF table extraction using pdfplumber.',
      'Integrate automated stage notification hooks via SMTP.'
    ],
    interactiveDemoType: 'resume-parse',
    repoUrl: 'https://github.com/santhoshkumariicse-gif'
  },
  {
    id: 'rda-lorrybook',
    title: 'RDA / LorryBook Logistics Platform [Conceptual Schema]',
    category: 'Logistics Architecture · Booking Dispatch',
    status: 'Conceptual Schema',
    tagline: 'Event-driven freight allocation architecture modeling geofenced trip telemetry and driver dispatch queues.',
    targetUsers: [
      'Regional Logistics Coordinators matching freight loads to available truck drivers',
      'Commercial Fleet Operators needing verified route arrival milestones',
      'Independent Truck Drivers receiving verified digital proof of delivery'
    ],
    problem: 'Regional truck dispatch suffers from fragmented phone coordination, unverified route delays, and physical paper proof-of-delivery losses.',
    solution: 'Designed an event-driven architecture combining geofenced location telemetry, driver availability queues, and digital proof-of-delivery receipts using FastAPI and PostgreSQL models.',
    techStack: ['FastAPI', 'PostgreSQL Schema', 'Geodesic Math', 'Leaflet', 'REST APIs'],
    designTradeoffs: [
      'Designed for eventual consistency across trip state events to tolerate intermittent driver cellular connectivity.',
      'Decoupled telemetry ingress from financial ledger reconciliation to isolate high-throughput GPS pings.'
    ],
    knownLimitations: [
      'Architecture exists as verified schema and prototype data models; not yet deployed to a public cloud cluster.',
      'Live GPS map rendering relies on mock simulated coordinate streams in test environments.'
    ],
    futureRoadmap: [
      'Implement real-time WebSocket driver location broadcasts.',
      'Deploy PostgreSQL database with PostGIS geospatial indexing.'
    ],
    interactiveDemoType: 'lorry-book',
    repoUrl: 'https://github.com/santhoshkumariicse-gif'
  }
];

