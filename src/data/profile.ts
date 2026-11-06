import { PersonalProfile } from '../types';

export const personalProfileData: PersonalProfile = {
  name: 'Santhosh Kumar M',
  headline: 'Computer Science Engineering Student · Defensive Security & Python Tooling',
  bio: [
    'I focus on understanding how software systems communicate, identifying vulnerabilities in controlled lab sandboxes, and building reliable, defensible web and automation applications.',
    'Currently interning as a Python Developer at Cybernaut, creating automated server log triage pipelines and structured verification scripts.',
    'Seeking technical internship opportunities in SOC operations, defensive security, or software development.'
  ],
  education: {
    institution: 'Gnanamani College of Technology',
    degree: 'B.E. in Computer Science & Engineering',
    expectedGraduation: 'May 2027',
    gpa: '7.2 / 10',
    location: 'Namakkal, Tamil Nadu, India',
    coursework: [
      'Data Structures & Algorithms',
      'Operating Systems',
      'Computer Networks & Protocols',
      'Database Management Systems',
      'Information & Network Security',
      'Object-Oriented Programming (Python/Java)'
    ]
  },
  internships: [
    {
      company: 'Cybernaut',
      role: 'Python Developer Intern',
      period: 'Jul 2024 – Present',
      location: 'Remote / India',
      summary: 'Automating server log triage, regex authentication monitoring, and data verification scripts.'
    },
    {
      company: 'ELITA',
      role: 'Web & App Development Intern',
      period: 'Jul 2025 – Aug 2025',
      location: 'Namakkal, India',
      summary: 'Built responsive UI layouts and focused on client-side state handling and WCAG accessibility standards.'
    }
  ],
  contact: {
    email: 'santhoshkumar160706@gmail.com',
    phone: '+91 9345402493',
    location: 'Namakkal, Tamil Nadu, India',
    timezone: 'IST (UTC+05:30)',
    github: 'https://github.com/santhoshkumariicse-gif',
    linkedin: 'https://linkedin.com/in/santhosh-kumar-8681612a4/'
  },
  resumeMetadata: {
    version: '2026.11',
    lastUpdated: 'November 2026',
    atsCompliant: true,
    targetRoles: [
      'Security Operations Center (SOC) Analyst Intern',
      'Cybersecurity Engineer Intern',
      'Python Backend Developer Intern',
      'Application Security Trainee'
    ]
  }
};
