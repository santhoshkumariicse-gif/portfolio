# Portfolio V4: System Architecture & Component Hierarchy

## 1. Topography & Component Tree

```
App.tsx (MotionProvider Context)
├── ScrollProgress.tsx (Hairline lime scroll tracking)
├── Navbar.tsx (Sticky desktop & mobile header)
├── MobileNavigation.tsx (Spring-damped drawer menu with Esc key listener)
├── PageTransition.tsx (Viewport opacity & scale container)
│   ├── HeroSection.tsx
│   │   ├── Editorial Headline & Recruiter Fast-Facts Strip
│   │   ├── Action CTA Array (Explore, Request Résumé, Contact)
│   │   └── SystemVisualization.tsx (Interactive Security Mesh)
│   │
│   ├── SectionDivider.tsx (Architectural crosshairs & coordinates)
│   ├── ProjectsSection (ProjectCard.tsx × 6)
│   │   └── ProjectSchematic.tsx (Inline custom SVG blueprints)
│   │
│   ├── SectionDivider.tsx
│   ├── AboutSection.tsx (Academic credentials & responsive facts table)
│   │
│   ├── SectionDivider.tsx
│   ├── SkillsSection.tsx (Verified toolkit bento grid + custom SVG category icons)
│   │
│   ├── SectionDivider.tsx
│   ├── ExperienceTimeline.tsx (Animated vertical drawing spine + milestones)
│   │
│   ├── SectionDivider.tsx
│   ├── EngineeringProcess.tsx (5-step structured problem-solving discipline)
│   │
│   ├── SectionDivider.tsx
│   ├── InsideTheSystemsLab.tsx ("Inside the Systems" Interactive Lab)
│   │   ├── 4 Domain Switchers: Cyber, AI, Backend, Automation
│   │   ├── Interactive SVG Stage Flow
│   │   └── Real-time Telemetry & Protocol Inspector
│   │
│   ├── SectionDivider.tsx
│   ├── AIEngineeringSection.tsx
│   │   ├── 3 Architectural Blueprints (ReAct, RAG Pipeline, Neural Core)
│   │   ├── OWASP Top 10 for LLMs Vulnerability Matrix
│   │   └── CyberCopilot In-Browser Simulation
│   │
│   ├── SectionDivider.tsx
│   └── ContactSection.tsx (Direct mailto, tactile Copy Email button, phone, socials)
│
├── ProjectDetailModal.tsx (Deep dive case study dialog)
└── Footer.tsx (Site summary & attribution)
```

---

## 2. Shared Libraries & Subsystems
- **Motion System** (`src/motion/`): `MotionProvider`, `RevealSection`, `StaggerContainer`, `StaggerItem`, `AnimatedText`, `AnimatedSVGPath`, `MotionButton`, `ScrollProgress`, and `motionConfig.ts`.
- **SVG Illustration Engine** (`src/svgs/`): 9 custom SVGs with standard SVG geometry and semantic accessibility metadata.
- **Data Schemas** (`src/data/`): Strongly typed data modules for projects, skills, experience, and methodology.

