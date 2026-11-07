import { PersonalProfile } from '../types';

export const personalProfileData: PersonalProfile = {
  name: 'Santhosh Kumar M',
  profession: 'Cybersecurity Enthusiast | Computer Science Engineering Student',
  headline: 'Cybersecurity-focused Computer Science Engineering student',
  tagline: 'Cybersecurity-focused Computer Science Engineering student interested in cybersecurity research, web application security, vulnerability assessment and software development.',
  department: 'Computer Science and Engineering',
  photoUrl: `${import.meta.env.BASE_URL}assets/profile/santhosh-profile-formal.jpg`,
  interests: [
    'Cybersecurity Research',
    'Web Application Security',
    'Vulnerability Assessment',
    'CTF Challenges',
    'Software Development',
    'Python Automation'
  ],
  bio: [
    "I'm Santhosh Kumar M, a cybersecurity-focused Computer Science Engineering student from Gnanamani College of Technology, Namakkal (Expected Graduation: May 2027, GPA: 7.2).",
    'I have hands-on experience with Python scripting, web fundamentals, vulnerability assessment concepts, and CTF challenges in learning environments.',
    'I am looking for entry-level cybersecurity, internship, or SOC analyst roles where I can contribute to secure software practices, automated testing, and security research.'
  ],
  education: {
    institution: 'Gnanamani College of Technology',
    degree: 'B.E. in Computer Science & Engineering',
    expectedGraduation: 'May 2027',
    gpa: '7.2 / 10',
    location: 'Namakkal, India',
    coursework: [
      'Ethical Hacking and Penetration Testing',
      'Computer Networks',
      'Operating Systems'
    ]
  },
  internships: [
    {
      company: 'Cybernaut',
      role: 'Python Developer Intern',
      period: 'July 2024 – Present',
      location: 'Karur, Tamil Nadu',
      summary: 'Developed and maintained Python scripts with a focus on clean, efficient, and readable code. Debugged applications and resolved logical and runtime errors. Gained exposure to writing maintainable code practices relevant to security tooling and automation.'
    },
    {
      company: 'ELITA',
      role: 'Web and App Development Intern',
      period: 'July 2025 – August 2025',
      location: 'Bangalore, India',
      summary: 'Created reusable UI components, cutting development time for new pages by ~25%. Learned fundamentals of client-server interaction and common web application structures. Gained awareness of common web security issues through development exposure.'
    }
  ],
  contact: {
    email: 'santhoshkumar160706@gmail.com',
    phone: '+91 9345402493',
    location: 'Namakkal, India',
    timezone: 'IST (UTC+05:30)',
    github: 'https://github.com/santhoshkumariicse-gif',
    linkedin: 'https://linkedin.com/in/santhosh-kumar-8681612a4/'
  },
  resumeMetadata: {
    version: '2026.11',
    lastUpdated: 'November 2026',
    atsCompliant: true,
    targetRoles: [
      'Entry-Level Cybersecurity Analyst',
      'SOC Analyst Trainee',
      'Python Developer Intern',
      'Software Developer Intern',
      'Web Application Security Intern'
    ]
  }
};
