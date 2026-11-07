import { personalProfileData } from '../data/profile';
import { projectsData } from '../data/projects';

export interface KnowledgeItem {
  keywords: string[];
  response: string;
  actionTarget?: string;
}

export class PortfolioKnowledgeBase {
  static getProfileSummary(): string {
    return `Santhosh Kumar M is a Cybersecurity-focused Computer Science Engineering student at Gnanamani College of Technology, Namakkal (Expected graduation May 2027, GPA: 7.2/10). He is interested in cybersecurity research, web application security, vulnerability assessment, and software development.`;
  }

  static getEducationDetails(): string {
    return `Santhosh is pursuing his Bachelor of Engineering in Computer Science and Engineering at Gnanamani College of Technology, Namakkal (Expected graduation May 2027, GPA: 7.2). Relevant coursework includes Ethical Hacking and Penetration Testing, Computer Networks, and Operating Systems.`;
  }

  static getSkillsSummary(): string {
    return `Santhosh's technical competencies from his verified resume include: Programming Languages (Python, Java, C); Cybersecurity (Web Application Security Basics, Vulnerability Assessment Concepts, CTF Challenges, SQL Injection concepts, Cross-Site Scripting, Authentication Flaws); Operating Systems (Linux basic, Windows); Tools & Platforms (Git, Basic Command Line).`;
  }

  static getProjectsSummary(): string {
    return `Verified real projects from his portfolio include: 1) LorryBook / RDA Logistics (freight driver queue & dispatch platform); 2) NexusATS (applicant tracking & resume screening engine); 3) Recall AI (autonomous multi-agent RAG prototype); along with practical lab exposure in web vulnerability testing and Python security automation.`;
  }

  static getProjectByName(nameQuery: string): string | null {
    const q = nameQuery.toLowerCase();
    const found = projectsData.find(
      p => p.title.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
    );
    if (!found) return null;
    return `${found.title} [Status: ${found.status}]: ${found.tagline} Problem: ${found.problem} Solution: ${found.solution} Technologies: ${found.technologies.join(', ')}.`;
  }

  static getExperienceSummary(): string {
    return `Internship Experience: 1) Python Developer Intern at Cybernaut (Karur, Tamil Nadu | July 2024 – Present) developing and maintaining clean Python scripts and security tooling automation; 2) Web and App Development Intern at ELITA (Bangalore, India | July 2025 – August 2025) creating reusable UI components improving development time by ~25%. Involvement: Cybersecurity Club Member at Gnanamani College of Technology (August 2022 – May 2024).`;
  }

  static getContactInfo(): string {
    const c = personalProfileData.contact;
    return `You can reach Santhosh directly via Email at ${c.email}, by Phone at ${c.phone}, or connect on LinkedIn (santhosh-kumar-8681612a4) and GitHub (@santhoshkumariicse-gif). Located in Namakkal, India.`;
  }
}
