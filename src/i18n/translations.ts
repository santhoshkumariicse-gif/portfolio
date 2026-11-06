export type SupportedLanguage = 'en' | 'ta';

export interface TranslationDictionary {
  nav: {
    command: string;
    work: string;
    labs: string;
    security: string;
    terminal: string;
    writing: string;
    docs: string;
    resume: string;
    contact: string;
  };
  hero: {
    kicker: string;
    headingLine1: string;
    headingLine2: string;
    headingLine2Accent: string;
    bio: string;
    exploreBtn: string;
    resumeBtn: string;
    contactBtn: string;
    githubLink: string;
    linkedinLink: string;
  };
  tracks: {
    general: string;
    recruiter: string;
    developer: string;
  };
  projects: {
    sectionNum: string;
    title: string;
    titleAccent: string;
    description: string;
    inspectDetails: string;
  };
  resume: {
    sectionNum: string;
    title: string;
    titleAccent: string;
    description: string;
    printBtn: string;
    copyPlainBtn: string;
    requestBtn: string;
  };
  contact: {
    sectionNum: string;
    title: string;
    titleAccent: string;
    description: string;
    copyEmail: string;
    copied: string;
  };
  common: {
    prototype: string;
    verified: string;
    close: string;
    reset: string;
  };
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    nav: {
      command: 'Command',
      work: 'Work',
      labs: 'Labs',
      security: 'Security',
      terminal: 'CLI',
      writing: 'Writing',
      docs: 'Docs',
      resume: 'Résumé',
      contact: 'Contact'
    },
    hero: {
      kicker: 'Computer Science Engineering Student · Gnanamani College of Technology',
      headingLine1: 'SANTHOSH KUMAR M',
      headingLine2: 'Building Ideas Into',
      headingLine2Accent: 'Practical Digital Solutions.',
      bio: "I'm Santhosh Kumar M, a Computer Science Engineering student passionate about building practical software solutions. I enjoy developing applications, exploring emerging technologies, solving real-world problems, and continuously improving my engineering skills.",
      exploreBtn: 'View Projects',
      resumeBtn: 'Download Resume',
      contactBtn: 'Contact Me',
      githubLink: 'GitHub',
      linkedinLink: 'LinkedIn'
    },
    tracks: {
      general: 'Complete Tour',
      recruiter: 'Recruiter Track',
      developer: 'Developer Track'
    },
    projects: {
      sectionNum: '02 / Selected Work',
      title: 'Practice becomes',
      titleAccent: 'proof.',
      description: 'Project case studies spanning logistics coordination, workflow automation, semantic recall, defensive web testing, and Python security scripts.',
      inspectDetails: 'Inspect Architecture'
    },
    resume: {
      sectionNum: 'Career // Professional Profile',
      title: 'Curriculum vitae,',
      titleAccent: 'structured.',
      description: 'Verified academic, internship, and project milestones presented in ATS-compatible typography with print and PDF generation support.',
      printBtn: 'Print / Save PDF',
      copyPlainBtn: 'Copy Plain Text',
      requestBtn: 'Request Direct Copy'
    },
    contact: {
      sectionNum: '07 / Contact',
      title: 'Let’s make something',
      titleAccent: 'useful.',
      description: 'For internship opportunities, project collaborations, or a résumé request, direct email is the most reliable way to reach me.',
      copyEmail: 'Copy Email',
      copied: 'Email Copied!'
    },
    common: {
      prototype: 'Prototype',
      verified: 'Verified',
      close: 'Close',
      reset: 'Reset'
    }
  },
  ta: {
    nav: {
      command: 'கட்டளை மையம்',
      work: 'திட்டங்கள்',
      labs: 'ஆய்வகம்',
      security: 'பாதுகாப்பு',
      terminal: 'முனையகம்',
      writing: 'கட்டுரைகள்',
      docs: 'ஆவணங்கள்',
      resume: 'விவரக்குறிப்பு',
      contact: 'தொடர்பு'
    },
    hero: {
      kicker: 'கணினி அறிவியல் · பாதுகாப்பு பொறியியல்',
      headingLine1: 'பயனுள்ள டிஜிட்டல் அமைப்புகள்',
      headingLine2: 'உருவாக்கும்',
      headingLine2Accent: 'பொறியியல்.',
      bio: 'பைத்தான் மேம்பாடு, பாதுகாப்பான இணைய கட்டமைப்பு மற்றும் பயன்பாட்டு பாதுகாப்பு தணிக்கையில் கவனம் செலுத்தும் கணினி அறிவியல் பொறியியல் மாணவர்.',
      exploreBtn: 'திட்டங்களை காண்க',
      resumeBtn: 'விவரக்குறிப்பு பதிவிறக்குக',
      contactBtn: 'தொடர்பு கொள்க',
      githubLink: 'கிட்ஹப்',
      linkedinLink: 'லிங்க்ட்இன்'
    },
    tracks: {
      general: 'முழுமையான பார்வை',
      recruiter: 'தேர்வாளர் பாதை',
      developer: 'மென்பொருள் பொறியாளர் பாதை'
    },
    projects: {
      sectionNum: '02 / தேர்ந்தெடுக்கப்பட்ட திட்டங்கள்',
      title: 'பயிற்சியே உறுதியான',
      titleAccent: 'சான்று.',
      description: 'தளவாட திட்டமிடல், பணிப்பாய்வு ஆட்டோமேஷன், இணைய பாதுகாப்பு தணிக்கை மற்றும் பைத்தான் ஸ்கிரிப்டுகள் குறித்த ஆய்வு திட்டங்கள்.',
      inspectDetails: 'கட்டமைப்பை காண்க'
    },
    resume: {
      sectionNum: 'தொழில்முறை சுயவிவரம்',
      title: 'கல்வி மற்றும் பணி அனுபவ',
      titleAccent: 'விவரக்குறிப்பு.',
      description: 'சரிபார்க்கப்பட்ட கல்வித்தகுதி, பைத்தான் மென்பொருள் பயிற்சியாளர் பணி மற்றும் தொழில்நுட்ப மைல்கற்கள்.',
      printBtn: 'அச்சிடுக / PDF சேமி',
      copyPlainBtn: 'உரையாக நகலெடு',
      requestBtn: 'நேரடி நகல் கோருக'
    },
    contact: {
      sectionNum: '07 / தொடர்பு',
      title: 'பயனுள்ளவற்றை உருவாக்குவோம்',
      titleAccent: 'இணைந்து.',
      description: 'பயிற்சி வாய்ப்புகள், திட்ட ஒத்துழைப்புகள் அல்லது விவரக்குறிப்பு கோரிக்கைகளுக்கு நேரடி மின்னஞ்சல் சிறந்த வழி.',
      copyEmail: 'மின்னஞ்சல் நகலெடு',
      copied: 'மின்னஞ்சல் நகலெடுக்கப்பட்டது!'
    },
    common: {
      prototype: 'மாதிரி வடிவம்',
      verified: 'சரிபார்க்கப்பட்டது',
      close: 'மூடுக',
      reset: 'மீட்டமை'
    }
  }
};

