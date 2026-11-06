import { PortfolioKnowledgeBase } from './PortfolioKnowledgeBase';

export interface CommandResult {
  text: string;
  action?: {
    type: 'navigate_zone' | 'navigate_section' | 'toggle_view' | 'open_modal';
    target: string;
  };
}

export class CommandProcessor {
  static process(input: string): CommandResult {
    const raw = input.trim().toLowerCase();

    // 1. Navigation Commands (3D Universe Zones & 2D Sections)
    if (raw.includes('origin') || raw.includes('coast') || raw.includes('education') || raw.includes('college')) {
      return {
        text: `Navigating to Zone 01: Origin Coast. Here are Santhosh's academic roots at Gnanamani College of Technology.`,
        action: { type: 'navigate_zone', target: 'origin-coast' }
      };
    }

    if (raw.includes('skill') || raw.includes('arsenal') || raw.includes('technolog') || raw.includes('forest')) {
      return {
        text: `Accessing Zone 02: The Skill Forest. ${PortfolioKnowledgeBase.getSkillsSummary()}`,
        action: { type: 'navigate_zone', target: 'skill-forest' }
      };
    }

    if (raw.includes('lorrybook') || raw.includes('rda')) {
      const details = PortfolioKnowledgeBase.getProjectByName('lorrybook') || '';
      return {
        text: `Targeting LorryBook / RDA in Project City. ${details}`,
        action: { type: 'navigate_zone', target: 'project-city' }
      };
    }

    if (raw.includes('nexus') || raw.includes('ats') || raw.includes('recruitment')) {
      const details = PortfolioKnowledgeBase.getProjectByName('nexusats') || '';
      return {
        text: `Targeting NexusATS in Project City. ${details}`,
        action: { type: 'navigate_zone', target: 'project-city' }
      };
    }

    if (raw.includes('recall') || raw.includes('hackathon')) {
      const details = PortfolioKnowledgeBase.getProjectByName('recall') || '';
      return {
        text: `Targeting Recall AI in Project City. ${details}`,
        action: { type: 'navigate_zone', target: 'project-city' }
      };
    }

    if (raw.includes('project') || raw.includes('mission') || raw.includes('city') || raw.includes('work')) {
      return {
        text: `Opening Zone 03: Project City. ${PortfolioKnowledgeBase.getProjectsSummary()}`,
        action: { type: 'navigate_zone', target: 'project-city' }
      };
    }

    if (raw.includes('experience') || raw.includes('internship') || raw.includes('mountain') || raw.includes('cybernaut') || raw.includes('elita')) {
      return {
        text: `Ascending Zone 04: Experience Mountain. ${PortfolioKnowledgeBase.getExperienceSummary()}`,
        action: { type: 'navigate_zone', target: 'exp-mountain' }
      };
    }

    if (raw.includes('contact') || raw.includes('beacon') || raw.includes('email') || raw.includes('hire') || raw.includes('phone') || raw.includes('linkedin')) {
      return {
        text: `Activating Zone 05: Contact Beacon. ${PortfolioKnowledgeBase.getContactInfo()}`,
        action: { type: 'navigate_zone', target: 'contact-beacon' }
      };
    }

    if (raw.includes('classic') || raw.includes('2d') || raw.includes('standard') || raw.includes('html')) {
      return {
        text: `Switching display interface to the Traditional 2D Portfolio view.`,
        action: { type: 'toggle_view', target: 'classic' }
      };
    }

    if (raw.includes('universe') || raw.includes('3d') || raw.includes('island')) {
      return {
        text: `Initializing the 3D Explorable Island Universe.`,
        action: { type: 'toggle_view', target: 'universe' }
      };
    }

    // 2. Identity Queries
    if (raw.includes('who are you') || raw.includes('what are you') || raw.includes('san ai')) {
      return {
        text: `I am SAN AI, Santhosh Kumar's personal portfolio copilot and digital guide. I can navigate you through the 3D Developer Universe, summarize his software projects, or provide verified academic credentials.`
      };
    }

    if (raw.includes('who is santhosh') || raw.includes('introduce') || raw.includes('about santhosh') || raw.includes('summary')) {
      return {
        text: PortfolioKnowledgeBase.getProfileSummary()
      };
    }

    if (raw.includes('gpa') || raw.includes('marks') || raw.includes('grade')) {
      return {
        text: `Santhosh maintains a cumulative GPA of 7.2 / 10.0 in Computer Science and Engineering at Gnanamani College of Technology (Graduation: May 2027).`
      };
    }

    // 3. Fallback Guided Response
    return {
      text: `Command received: "${input}". You can ask me to "Show projects", "Explain LorryBook", "List skills", "Show internships", "Contact Santhosh", or "Switch to classic view".`
    };
  }
}

