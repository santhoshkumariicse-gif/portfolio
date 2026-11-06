import { SkillCategory } from '../types';

export const skillsData: SkillCategory[] = [
  {
    id: 'programming-languages',
    number: '01',
    title: 'Programming Languages',
    description: 'Core languages for algorithm implementation, structured problem solving, and object-oriented systems.',
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C / C++ fundamentals'],
    iconType: 'programming'
  },
  {
    id: 'frontend-development',
    number: '02',
    title: 'Frontend Development',
    description: 'Building responsive, accessible, high-performance interfaces with modern component architectures and micro-interactions.',
    items: ['React', 'HTML5 Semantic Markup', 'Modern CSS3', 'Tailwind CSS', 'Vite & Bundling', 'Responsive UI/UX'],
    iconType: 'frontend'
  },
  {
    id: 'backend-development',
    number: '03',
    title: 'Backend Development',
    description: 'Designing reliable server architectures, RESTful API endpoints, request validation, and event handling.',
    items: ['Node.js & Express', 'FastAPI & Flask (Python)', 'REST API Design', 'Input Sanitization', 'Authentication Patterns'],
    iconType: 'backend'
  },
  {
    id: 'mobile-development',
    number: '04',
    title: 'Mobile Application Development',
    description: 'Engineering native and modern mobile application layouts, state management, and device integration.',
    items: ['Android Development', 'Java / Kotlin Basics', 'XML Layouts', 'Mobile App Architecture', 'API Client Integration'],
    iconType: 'mobile'
  },
  {
    id: 'databases',
    number: '05',
    title: 'Databases & Data Modeling',
    description: 'Structuring relational schemas, indexed queries, and document storage for persistent data integrity.',
    items: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Query Optimization', 'Data Validation'],
    iconType: 'database'
  },
  {
    id: 'development-tools',
    number: '06',
    title: 'Development Tools & DevOps',
    description: 'Command line environments, source version control, testing harnesses, and automated build pipelines.',
    items: ['Git & GitHub', 'Linux / Bash CLI', 'VS Code Environment', 'Postman API Testing', 'GitHub Actions CI/CD'],
    iconType: 'tools'
  },
  {
    id: 'ai-emerging',
    number: '07',
    title: 'AI & Emerging Technologies',
    description: 'Applying generative AI tooling, vector embeddings, prompt engineering, and defensive cybersecurity principles.',
    items: ['AI-Assisted Development', 'OpenAI API & LLM Integrations', 'Prompt Engineering', 'OWASP Top 10 Web Security', 'Defensive Hardening'],
    iconType: 'ai-emerging'
  }
];

