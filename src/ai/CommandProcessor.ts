import { PortfolioKnowledgeBase } from './PortfolioKnowledgeBase';

export interface CommandResult {
  text: string;
  action?: {
    type: 'navigate_zone' | 'navigate_section' | 'toggle_view' | 'open_modal' | 'set_mode';
    target: string;
  };
}

export class CommandProcessor {
  static process(input: string): CommandResult {
    const raw = input.trim().toLowerCase();

    // 0. Wake Words & Greetings
    if (raw === 'hey san' || raw === 'hello san' || raw === 'hi san' || raw === 'hey san ai' || raw === 'hello' || raw === 'hi') {
      return {
        text: `Greetings! SAN AI online and monitoring Aethelgard Island telemetry. How may I assist your exploration today? You can command me to navigate to any zone, inspect projects, or start a guided tour.`
      };
    }

    // 1. Navigation Modes (Guided Tour, Free Roam, Orbit)
    if (raw.includes('start guided tour') || raw.includes('guided tour') || raw.includes('take a tour') || raw.includes('cinematic tour') || raw.includes('flythrough')) {
      return {
        text: `Initiating guided cinematic flight. Sit back as I pilot you across the 5 core regions of Aethelgard Island.`,
        action: { type: 'set_mode', target: 'guided-tour' }
      };
    }

    if (raw.includes('enter free roam') || raw.includes('free roam') || raw.includes('wasd') || raw.includes('walk around') || raw.includes('explore freely')) {
      return {
        text: `Switching to Free Roam mode. Use WASD keys or the virtual analog joystick on mobile to explore, and press [E] near monuments to inspect them.`,
        action: { type: 'set_mode', target: 'free-roam' }
      };
    }

    if (raw.includes('orbit mode') || raw.includes('orbit') || raw.includes('tactical view') || raw.includes('birds eye')) {
      return {
        text: `Restoring Orbit mode. You have full 360-degree panoramic controls of the island.`,
        action: { type: 'set_mode', target: 'orbit' }
      };
    }

    if (raw.includes('return home') || raw.includes('go home') || raw.includes('reset view') || raw.includes('home')) {
      return {
        text: `Returning to Origin Coast overview.`,
        action: { type: 'navigate_zone', target: 'origin-coast' }
      };
    }

    // 2. Specific Project Inquiries & Deep Dives
    if (raw.includes('lorrybook') || raw.includes('rda')) {
      const details = PortfolioKnowledgeBase.getProjectByName('lorrybook') || '';
      return {
        text: `Targeting LorryBook / RDA in Project City. ${details}`,
        action: { type: 'open_modal', target: 'rda-lorrybook' }
      };
    }

    if (raw.includes('nexus') || raw.includes('ats') || raw.includes('recruitment')) {
      const details = PortfolioKnowledgeBase.getProjectByName('nexusats') || '';
      return {
        text: `Targeting NexusATS in Project City. ${details}`,
        action: { type: 'open_modal', target: 'nexusats' }
      };
    }

    if (raw.includes('recall') || raw.includes('hackathon')) {
      const details = PortfolioKnowledgeBase.getProjectByName('recall') || '';
      return {
        text: `Targeting Recall AI in Project City. ${details}`,
        action: { type: 'open_modal', target: 'recall-ai' }
      };
    }

    if (raw.includes('cybersecurity') && (raw.includes('project') || raw.includes('fort') || raw.includes('defense'))) {
      const details = PortfolioKnowledgeBase.getProjectByName('cybernaut') || '';
      return {
        text: `Targeting Cybernaut Defense Fort in Project City. ${details}`,
        action: { type: 'open_modal', target: 'cybernaut-defense' }
      };
    }

    // 3. Zone Navigation Commands
    if (raw.includes('origin') || raw.includes('coast') || raw.includes('education') || raw.includes('college') || raw.includes('study') || raw.includes('gnanamani')) {
      return {
        text: `Navigating to Zone 01: Origin Coast. Here are Santhosh's academic foundations at Gnanamani College of Technology (B.E. CSE, GPA 7.2/10) and his roots in Karaikal.`,
        action: { type: 'navigate_zone', target: 'origin-coast' }
      };
    }

    if (raw.includes('skill') || raw.includes('arsenal') || raw.includes('technolog') || raw.includes('forest') || raw.includes('stack')) {
      return {
        text: `Accessing Zone 02: The Skill Forest. ${PortfolioKnowledgeBase.getSkillsSummary()}`,
        action: { type: 'navigate_zone', target: 'skill-forest' }
      };
    }

    if (raw.includes('project') || raw.includes('mission') || raw.includes('city') || raw.includes('work') || raw.includes('software')) {
      return {
        text: `Opening Zone 03: Project City. ${PortfolioKnowledgeBase.getProjectsSummary()}`,
        action: { type: 'navigate_zone', target: 'project-city' }
      };
    }

    if (raw.includes('experience') || raw.includes('internship') || raw.includes('mountain') || raw.includes('achievement') || raw.includes('certification') || raw.includes('cybernaut') || raw.includes('elita')) {
      return {
        text: `Ascending Zone 04: Experience Mountain. ${PortfolioKnowledgeBase.getExperienceSummary()}`,
        action: { type: 'navigate_zone', target: 'exp-mountain' }
      };
    }

    if (raw.includes('resume') || raw.includes('cv') || raw.includes('download')) {
      return {
        text: `Accessing Santhosh's verified ATS-compliant software engineering resume at Contact Beacon. You can preview or download it directly.`,
        action: { type: 'open_modal', target: 'contact-beacon-resume' }
      };
    }

    if (raw.includes('contact') || raw.includes('beacon') || raw.includes('email') || raw.includes('hire') || raw.includes('phone') || raw.includes('linkedin') || raw.includes('message')) {
      return {
        text: `Activating Zone 05: Contact Beacon. ${PortfolioKnowledgeBase.getContactInfo()}`,
        action: { type: 'navigate_zone', target: 'contact-beacon' }
      };
    }

    // 4. View Switching (3D Highway vs 3D Universe vs 2D Classic Portfolio)
    if (raw.includes('highway') || raw.includes('road of santhosh') || raw.includes('highway mode')) {
      return {
        text: `Engaging THE ROAD OF SANTHOSH. Entering the 3D cinematic highway across KM 0 to KM 7.`,
        action: { type: 'toggle_view', target: 'highway' }
      };
    }

    if (raw.includes('autopilot') || raw.includes('cruise')) {
      return {
        text: `Enabling SAN AI Autopilot Cruise. Sit back and enjoy the cinematic road journey.`,
        action: { type: 'set_mode', target: 'autopilot' }
      };
    }

    if (raw.includes('manual drive') || raw.includes('manual mode')) {
      return {
        text: `Engaging Manual Driving mode. Use W/S or mouse wheel to accelerate and brake, and A/D to steer.`,
        action: { type: 'set_mode', target: 'manual' }
      };
    }

    const kmMatch = raw.match(/km\s*([0-7])/i) || raw.match(/kilometer\s*([0-7])/i);
    if (kmMatch) {
      const targetKm = parseInt(kmMatch[1], 10);
      return {
        text: `Autopilot targeting KM ${targetKm}. Navigating now along the highway.`,
        action: { type: 'navigate_zone', target: `km-${targetKm}` }
      };
    }

    if (raw.includes('classic') || raw.includes('2d') || raw.includes('standard') || raw.includes('html') || raw.includes('simple view')) {
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

    // 5. Identity Queries
    if (raw.includes('who are you') || raw.includes('what are you') || raw.includes('san ai')) {
      return {
        text: `I am SAN AI, Santhosh Kumar's JARVIS-inspired portfolio copilot and digital guide. I can pilot you through the 3D Developer Universe, summarize his software projects, or provide verified academic and internship credentials.`
      };
    }

    if (raw.includes('who is santhosh') || raw.includes('introduce') || raw.includes('about santhosh') || raw.includes('summary') || raw.includes('tell me about')) {
      return {
        text: PortfolioKnowledgeBase.getProfileSummary()
      };
    }

    if (raw.includes('gpa') || raw.includes('marks') || raw.includes('grade')) {
      return {
        text: `Santhosh maintains a verified cumulative GPA of 7.2 / 10.0 in Computer Science and Engineering at Gnanamani College of Technology, Namakkal (2023–2027).`
      };
    }

    // 6. Fallback Guided Response
    return {
      text: `Command received: "${input}". Try commanding: "Start guided tour", "Enter free roam", "Show skills", "Explain LorryBook", "Show achievements", or "Contact Santhosh".`
    };
  }
}
