export interface EducationRecord {
  institution: string;
  degree: string;
  department: string;
  period: string;
  expectedGraduation: string;
  gpa: string;
  location: string;
  verifiedStatus: string;
  coursework: string[];
}

export const educationData: EducationRecord = {
  institution: 'Gnanamani College of Technology',
  degree: 'Bachelor of Engineering (B.E.)',
  department: 'Computer Science and Engineering',
  period: '2023 — 2027',
  expectedGraduation: 'May 2027',
  gpa: '7.2 / 10.0',
  location: 'Namakkal, Tamil Nadu, India',
  verifiedStatus: 'Active Undergraduate Degree',
  coursework: [
    'Data Structures & Algorithms',
    'Operating Systems & Kernel Concepts',
    'Computer Networks & Protocols (TCP/IP)',
    'Database Management Systems (DBMS / SQL)',
    'Object-Oriented Programming (Java / Python)',
    'Software Engineering & System Architecture',
    'Web Technologies & Application Security Basics'
  ]
};

