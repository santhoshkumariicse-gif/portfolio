import { SkillCategory } from '../types';

export const skillsData: SkillCategory[] = [
  {
    id: 'programming',
    number: '01',
    title: 'Programming & Logic',
    description: 'Developing clean, maintainable logic with strong emphasis on structured file handling and algorithm efficiency.',
    items: ['Python 3', 'Scripting & Automation', 'Data Structures', 'Regular Expressions', 'File I/O Handling'],
    iconType: 'programming'
  },
  {
    id: 'web-architecture',
    number: '02',
    title: 'Web & UI Systems',
    description: 'Engineering semantic, responsive interfaces with strict adherence to accessibility, clean layout rhythm, and zero bloat.',
    items: ['HTML5 Semantic Markup', 'Modern CSS3 & Grid/Flexbox', 'Client-Server Communication', 'RESTful API Integration', 'Responsive Design'],
    iconType: 'web'
  },
  {
    id: 'security-engineering',
    number: '03',
    title: 'Security & Assessment',
    description: 'Identifying application weaknesses in controlled environments and formulating robust defensive architectures.',
    items: ['Web App Vulnerability Testing', 'OWASP Top 10 Mitigation', 'SQLi & XSS Inspection', 'Ethical Hacking Fundamentals', 'Network Reconnaissance'],
    iconType: 'security'
  },
  {
    id: 'workflow-tooling',
    number: '04',
    title: 'Workflow & Engineering Tooling',
    description: 'Managing source versioning, technical documentation, testing harnesses, and terminal development pipelines.',
    items: ['Git & Version Control', 'Linux / Bash CLI', 'VS Code Environment', 'Burp Suite / OWASP ZAP', 'GitHub Actions CI/CD'],
    iconType: 'workflow'
  },
  {
    id: 'ai-security',
    number: '05',
    title: 'AI Systems & LLM Security',
    description: 'Studying emerging adversarial threat surfaces in AI-enabled applications, prompt injection defenses, and agentic workflows.',
    items: ['Prompt Injection Defense', 'OWASP Top 10 for LLMs', 'Agentic ReAct Workflows', 'Vector Retrieval Principles', 'Guardrail Sanitization'],
    iconType: 'ai-security'
  }
];

