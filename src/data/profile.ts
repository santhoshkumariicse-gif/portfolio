import { PersonalProfile } from '../types';

export const personalProfileData: PersonalProfile = {
  name: 'Santhosh Kumar M',
  profession: 'Computer Science Engineering Student | Aspiring Software Developer',
  headline: 'Computer Science Engineering Student · Aspiring Software Developer',
  tagline: 'Building Ideas Into Practical Digital Solutions.',
  department: 'Computer Science and Engineering',
  photoUrl: `${import.meta.env.BASE_URL}images/santhosh-kumar.jpg`,
  interests: [
    'Full-Stack Development',
    'Android Application Development',
    'Artificial Intelligence',
    'Software Engineering',
    'UI/UX Design',
    'Cybersecurity'
  ],
  bio: [
    "I'm Santhosh Kumar M, a Computer Science Engineering student passionate about building practical software solutions. I enjoy developing applications, exploring emerging technologies, solving real-world problems, and continuously improving my engineering skills.",
    'Currently pursuing my Bachelor of Engineering in Computer Science & Engineering at Gnanamani College of Technology, where I focus on software architecture, clean system logic, and secure application development.',
    'My hands-on experience includes developing full-stack platforms such as the LorryBook / RDA driver booking platform and NexusATS applicant tracking system, building Android applications, and participating in hackathon AI prototypes like Recall AI.'
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
      'Object-Oriented Programming (Java / Python)',
      'Software Engineering Principles',
      'Web Technologies & Application Security'
    ]
  },
  internships: [
    {
      company: 'Cybernaut',
      role: 'Python Developer Intern',
      period: 'Jul 2024 – Present',
      location: 'Remote / India',
      summary: 'Developing automated log analysis pipelines, verification scripts, and routine data processing utilities in Python.'
    },
    {
      company: 'ELITA',
      role: 'Web & App Development Intern',
      period: 'Jul 2025 – Aug 2025',
      location: 'Namakkal, India',
      summary: 'Constructed responsive user interface layouts, handled client-side state, and implemented accessible web standards.'
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
      'Software Developer Intern',
      'Full-Stack Developer Intern',
      'Python Backend Developer Intern',
      'Android Developer Trainee',
      'Security Operations & Defensive Engineer'
    ]
  }
};
