import { personalProfileData } from '../data/profile';
import { skillsData } from '../data/skills';
import { projectsData } from '../data/projects';
import { experienceData } from '../data/experience';
import { certificationsData } from '../data/certifications';

export interface KnowledgeItem {
  keywords: string[];
  response: string;
  actionTarget?: string;
}

export class PortfolioKnowledgeBase {
  static getProfileSummary(): string {
    return `Santhosh Kumar M is a Computer Science Engineering student at Gnanamani College of Technology, Namakkal (Expected graduation May 2027, GPA: 7.2/10). He is an aspiring software developer passionate about building practical software solutions across Full-Stack web development, Python automation, and Android applications.`;
  }

  static getEducationDetails(): string {
    return `Santhosh is pursuing his Bachelor of Engineering in Computer Science and Engineering at Gnanamani College of Technology, Namakkal (2023–2027, current GPA 7.2/10). His core curriculum includes Data Structures, Algorithms, Relational DBMS, Operating Systems, and Computer Networks.`;
  }

  static getSkillsSummary(): string {
    const categories = skillsData.map(c => `${c.title} (${c.items.slice(0, 3).join(', ')})`).join('; ');
    return `Santhosh has verified proficiencies across 7 core domains: ${categories}. He has zero fabricated skill percentages.`;
  }

  static getProjectsSummary(): string {
    return `Key projects include: 1) LorryBook/RDA (Acting driver and truck booking platform in FastAPI/PostgreSQL); 2) NexusATS (Candidate pipeline and resume parser); 3) Recall AI (Contextual document assistant hackathon prototype); 4) Python Security & Log Automation tooling developed during his Cybernaut internship.`;
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
    const roles = experienceData.map(e => `${e.role} at ${e.organization} (${e.period})`).join('; ');
    const certs = certificationsData.map(c => c.title).join(', ');
    return `Santhosh has verified developer experience: ${roles}. Verified certifications: ${certs}.`;
  }

  static getContactInfo(): string {
    const c = personalProfileData.contact;
    return `You can reach Santhosh directly via Email at ${c.email}, by Phone at ${c.phone}, or connect on LinkedIn (santhosh-kumar-8681612a4) and GitHub (@santhoshkumariicse-gif). Located in Namakkal, Tamil Nadu, India.`;
  }
}
