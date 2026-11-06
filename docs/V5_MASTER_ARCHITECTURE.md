# Portfolio V5: Master Architecture & Platform Topography

## 1. Architectural Philosophy
Portfolio V5 transforms the portfolio into an interactive engineering platform, combining rigorous defensive security principles, recruiter conversion telemetry, live public repository fetching, an in-browser deterministic developer terminal, an ATS-structured printable resume suite, a technical markdown knowledge base, and Progressive Web App (PWA) offline capabilities.

---

## 2. Platform Component Topography

```
src/
├── App.tsx                     # Master Coordinator & Scroll Routing
├── main.tsx                    # React 18 Root & MotionProvider Wrapper
├── index.css                   # Tailwind Base & Custom Theme Tokens
├── types/                      # TypeScript Global Interface Definitions
│   └── index.ts
├── data/                       # Strongly-Typed Centralized Content Schemas
│   ├── commandCenter.ts        # Telemetry, focus domains, engineering logs, roadmap
│   ├── projects.ts             # 6 verified/prototype project case studies
│   ├── skills.ts               # Categorized engineering toolkit
│   ├── experience.ts           # Internship chronology and education
│   ├── process.ts              # 5-step problem solving discipline
│   └── blogArticles.ts         # Technical study notes & articles
│
├── components/                 # Reusable Presentation & Interactive Widgets
│   ├── Navbar.tsx              # Sticky desktop and mobile navigation header
│   ├── MobileNavigation.tsx    # Accessible spring-damped mobile drawer
│   ├── HeroSection.tsx         # Headline, recruiter fast-facts & CTA array
│   ├── SystemVisualization.tsx # Interactive Hero security mesh housing
│   ├── DeveloperCommandCenter.tsx # [V5] Live telemetry, focus & engineering logs
│   ├── ProjectCard.tsx         # Project case study cards with deep dive triggers
│   ├── ProjectDetailModal.tsx  # Full architectural modal dialog
│   ├── ProjectSchematic.tsx    # Router for 9 bespoke SVG blueprints
│   ├── GitHubActivitySection.tsx  # [V5] Live GitHub public API fetcher + cache
│   ├── AboutSection.tsx        # Personal narrative and academic facts table
│   ├── SkillsSection.tsx       # Toolkit bento grid with custom category SVGs
│   ├── ExperienceTimeline.tsx  # Drawing vertical timeline with milestone markers
│   ├── EngineeringProcess.tsx  # 5-step structured problem-solving discipline
│   ├── InsideTheSystemsLab.tsx # [V4] Interactive 4-domain architecture laboratory
│   ├── InteractiveTerminalV2.tsx # [V5] Sandboxed CLI shell with command history
│   ├── TechnicalBlogSection.tsx   # [V5] Technical writing & study notes
│   ├── AIEngineeringSection.tsx   # Dual-mode AI architecture & OWASP simulator
│   ├── CareerResumeCenter.tsx     # [V5] ATS-styled printable resume sheet
│   ├── ContactSection.tsx      # Direct email, telephone, socials & copy button
│   ├── SectionDivider.tsx      # [V4] Architectural crosshair markers & coordinates
│   └── Footer.tsx              # Site attribution & status telemetry
│
├── motion/                     # Framer Motion Modular Library
│   ├── motionConfig.ts         # Durations, easing tokens, and stagger curves
│   ├── MotionProvider.tsx      # Reduced-motion context provider
│   ├── RevealSection.tsx       # Viewport-aware scroll entrance container
│   ├── StaggerContainer.tsx    # Coordinated stagger transitions
│   ├── StaggerItem.tsx         # Stagger child item reveal
│   ├── AnimatedText.tsx        # Word-by-word typography reveal
│   ├── AnimatedSVGPath.tsx     # Vector stroke length drawing
│   ├── MotionButton.tsx        # Tactile hover and tap feedback button
│   ├── PageTransition.tsx      # Smooth opacity and scale transition wrapper
│   └── ScrollProgress.tsx      # Hairline lime scroll reading bar
│
├── svgs/                       # Custom Inline SVG Illustration System
│   ├── HeroSystemArchitecture.tsx      # SecurityNetworkSVG
│   ├── CybersecurityWorkflowSvg.tsx    # CyberAttackFlowSVG
│   ├── PythonAutomationSvg.tsx         # PythonAutomationSVG
│   ├── NeuralArchitectureSVG.tsx       # NeuralArchitectureSVG
│   ├── RAGPipelineSVG.tsx              # RAGPipelineSVG
│   ├── AIAgentArchitectureSvg.tsx      # AgentWorkflowSVG
│   ├── HrSuiteArchitectureSvg.tsx      # RecruitmentArchitectureSVG
│   ├── RdaArchitectureSvg.tsx          # DriverBookingArchitectureSVG
│   ├── RecallAiArchitectureSvg.tsx     # RecallSystemSVG
│   ├── CtfMatrixSvg.tsx                # Practical CTF lab matrix
│   └── SkillCategorySvgs.tsx           # Category icons
│
└── public/                     # Static Web Assets
    ├── 404.html                # GitHub Pages SPA single-page redirect fallback
    ├── manifest.json           # Web App Manifest for PWA installation
    ├── sw.js                   # Lightweight service worker with asset caching
    ├── robots.txt              # Search engine crawler policies
    └── sitemap.xml             # Canonical XML sitemap
```

