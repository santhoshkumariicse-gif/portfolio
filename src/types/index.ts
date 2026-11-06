export type ProjectStatus = 'Completed' | 'In development' | 'Prototype' | 'Learning project';

export type VisitorPath = 'general' | 'recruiter' | 'developer';

export type ArchitectureType = 
  | 'rda' 
  | 'hr-suite' 
  | 'recall-ai' 
  | 'sec-test' 
  | 'py-automation' 
  | 'ctf-matrix';

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  status: ProjectStatus;
  isConceptual: boolean;
  featured: boolean;
  order: number;
  tagline: string;
  problem: string;
  solution: string;
  technologies: string[];
  evidenceNote: string;
  demoUrl?: string;
  repoUrl?: string;
  architectureType: ArchitectureType;
}

export interface SkillCategory {
  id: string;
  number: string;
  title: string;
  description: string;
  items: string[];
  iconType: 'programming' | 'web' | 'security' | 'workflow' | 'ai-security';
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface EducationInfo {
  institution: string;
  degree: string;
  expectedGraduation: string;
  gpa: string;
  location: string;
  coursework: string[];
}

export interface InternshipInfo {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  timezone: string;
  github: string;
  linkedin: string;
}

export interface ResumeMetadata {
  version: string;
  lastUpdated: string;
  atsCompliant: boolean;
  targetRoles: string[];
}

export interface PersonalProfile {
  name: string;
  headline: string;
  bio: string[];
  education: EducationInfo;
  internships: InternshipInfo[];
  contact: ContactInfo;
  resumeMetadata: ResumeMetadata;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  category: 'Security' | 'Programming' | 'Web' | 'Academic';
  description: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  category: 'Competition' | 'Leadership' | 'Academic';
  summary: string;
}

export interface ContentValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    totalProjects: number;
    totalSkills: number;
    totalArticles: number;
    totalCertifications: number;
    totalAchievements: number;
    totalExperience: number;
  };
}
