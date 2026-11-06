# FORENSIC AUDIT: EXISTING PORTFOLIO PROJECT
**Project**: Santhosh Kumar M — Portfolio & Technical Showcase
**Target Evolution**: THE ROAD OF SANTHOSH — Powered by SAN AI (Cinematic 3D Highway)

---

## 1. Environment & Architecture Overview
- **Repository Location**: `D:\portfolio\portfolio-main` (Git remote: `https://github.com/santhoshkumariicse-gif/portfolio.git`, branch `main`).
- **Core Framework**: React 18.3.1, TypeScript 5.7.2, Vite 6.1.0/6.4.5.
- **3D & Animation Stack**: Three.js 0.187.0, `@react-three/fiber` 8.18.0, `@react-three/drei` 9.122.0, Framer Motion 12.4.7, Lucide React 1.16.0.
- **Styling**: Tailwind CSS 3.4.19 with custom CSS design tokens (`#0A0B09` deep black, `#131512` surface, `#C7FF45` electric lime, deep crimson accents, `#00E5FF` holographic cyan).
- **Deployment Strategy**: Dual-hosting:
  - Direct branch deployment to GitHub Pages (`base: '/portfolio/'`).
  - Pre-build synchronization (`scripts/setup-build.cjs` and `scripts/sync-dist.cjs`) that populates the repository root with bundle assets.

---

## 2. Component & Feature Inventory
1. **Classic 2D Portfolio View**:
   - `HeroSection.tsx`: Interactive SVG system architecture mesh, verified headline, verified photo `images/santhosh-kumar.jpg`.
   - `AboutSection.tsx`: Personal background, Karaikal roots, Gnanamani College of Technology details.
   - `EducationSection.tsx`: B.E. CSE (2023–2027), GPA 7.2 / 10, coursework.
   - `SkillsSection.tsx`: 7 categorized engineering skill groupings.
   - `ProjectsSection.tsx`: 6 verified/conceptual case studies (LorryBook/RDA, NexusATS, Recall AI, Web App Security Lab, Python Automation, CTF Practice).
   - `ExperienceSection.tsx`: Cybernaut Technologies & ELITA Technology internships.
   - `InsideTheSystemsLab.tsx`: Interactive architecture visualizer (ReAct loop, RAG pipeline, Attention matrix).
   - `ContactSection.tsx`: Transmission form, verified email (`santhoshkumar160706@gmail.com`), phone, GitHub, LinkedIn.
2. **Interactive 3D Engine & SAN AI Systems**:
   - `UniverseCanvas.tsx` & `UniverseStage.tsx`: WebGL rendering stage with camera controls.
   - `SanAIProvider.tsx`: Context provider managing assistant states (`idle`, `listening`, `processing`, `speaking`, `navigation`, `error`).
   - `AICore.tsx`: Concentric animated SVG rings and holographic core pulsing.
   - `AIConversationPanel.tsx`: Speech-to-text, speech-to-speech, text command input terminal.
   - `SoundFX.ts`: Web Audio API tone synthesis engine (100% offline, zero audio asset latency).

---

## 3. Reusable Assets for THE ROAD OF SANTHOSH
- `SoundFX.ts`: High-tech UI clicks, engine hum, and mode-switch audio effects.
- `SanAIProvider.tsx`: Extensible state machine and speech synthesis/recognition pipelines.
- `AICore.tsx`: Concentric animated holographic rings matching the futuristic JARVIS theme.
- Data layer in `src/data/`: 100% verified academic and technical records.
- Rollup code-splitting in `vite.config.ts`: Separates Three.js (`752 kB`), Fiber (`298 kB`), Motion (`146 kB`), and core application code.

---

## 4. Risks & Architectural Directives
1. **Single Authoritative Navigation State**:
   - In highway navigation, multiple input sources (mouse wheel, W/S keys, Arrow keys, touch swipe, virtual joystick, and SAN AI autopilot) must feed into one single authoritative progress value ($t \in [0, 1]$ corresponding to KM 0 to KM 7). They must never compete or cause stutter.
2. **Hardware Constraints (Intel i5-1334U with Integrated Graphics)**:
   - Target 60 FPS by utilizing procedural road geometry, instanced light poles, distance-based culling, and minimal post-processing passes.
3. **Preservation of Dual-Mode Fallback**:
   - Recruiters who need immediate, low-bandwidth text scanning must always be able to click "Classic Portfolio" to view the comprehensive 2D HTML resume.

