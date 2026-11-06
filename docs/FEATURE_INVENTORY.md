# Portfolio V3: Complete Feature & Component Inventory

This document provides a line-by-line, component-by-component inventory of every section, interactive behavior, SVG schematic, canvas feature, and motion effect present across the portfolio.

---

## 1. Section-by-Section Feature Inventory

### Section 00: Navigation & Masthead
- **Component**: `Navbar.tsx` & `MobileNavigation.tsx` (Legacy: lines 1629–1646 in `index.legacy.html`).
- **Features**:
  - Skip to content link (`.skip-link` pointing to `#main-content`).
  - Monogram brand mark (`SK` badge with electric lime border).
  - Primary navigation links:
    - Work (`#projects`)
    - About (`#about`)
    - Toolkit (`#skills`)
    - Experience (`#experience`)
    - Process (`#process`)
    - AI Systems (`#ai-engineering`)
    - Contact (`#contact`)
  - Active section tracking via `IntersectionObserver` with sliding underline indicator.
  - Mobile hamburger toggle button with `aria-expanded` and `aria-controls`.
  - Accessible mobile drawer with sliding entrance, backdrop blur, Escape key listener, and body scroll lock.
  - Direct "Get in touch" mailto CTA button.

### Section 01: Hero & System Visualization
- **Component**: `HeroSection.tsx` & `SystemVisualization.tsx` (Legacy: lines 1649–1693 in `index.legacy.html`).
- **Features**:
  - Kicker tag: `Computer Science · Defensive Security`.
  - Cinematic typography reveal: Headline split into overflow-hidden lines with staggered vertical mask reveal (`Building digital things` / `that work.`).
  - Professional summary bio.
  - Dual primary CTAs: `Explore projects` (anchor scroll to `#projects`) and `Contact me` (anchor scroll to `#contact`).
  - Verified social anchors: LinkedIn profile and GitHub profile.
  - Status indicator strip: `Open to opportunities · Namakkal, Tamil Nadu, India`.
  - **Signature Interactive Visualization**:
    - Central coordinator hub (`SYS_CORE`) connected to ingress, traffic analyzer, cryptographic vault, and inspection probes.
    - Interactive node selection with real-time coordinate and telemetry updates.
    - Continuous animated data packet flows along connection traces.

### Section 02: Selected Work & Case Studies
- **Component**: `ProjectCard.tsx` & `ProjectSchematic.tsx` (Legacy: lines 1695–1880 in `index.legacy.html`).
- **Features**:
  - 6 comprehensive project case studies:
    1. *RDA / LorryBook Fleet & Driver Platform* (Prototype / Conceptual Schema)
    2. *HR Recruitment Management Suite* (In development / Conceptual Schema)
    3. *Recall AI Contextual Knowledge Assistant* (Prototype / Conceptual Schema)
    4. *Web Application Security Testing* (Learning Project / Practice Verified)
    5. *Python Security Automation Scripts* (Completed / Practice Verified)
    6. *CTF Challenge Practice & Labs* (Learning Project / Practice Verified)
  - Interactive problem/solution case study disclosure toggle.
  - Technology taxonomy chips.
  - Evidence integrity notice on every card distinguishing prototypes from verified work.
  - Bespoke inline vector engineering schematics with animated signal pulses.

### Section 03: About Me & Academic Profile
- **Component**: `AboutSection.tsx` (Legacy: lines 1882–1904 in `index.legacy.html`).
- **Features**:
  - Editorial personal statement detailing defensive security philosophy.
  - Structured academic facts table:
    - Location: Namakkal, Tamil Nadu, India
    - Degree: B.E. Computer Science & Engineering
    - College: Gnanamani College of Technology
    - Graduation: May 2027
    - GPA: 7.2 / 10

### Section 04: Technical Toolkit
- **Component**: `SkillsSection.tsx` (Legacy: lines 1906–1947 in `index.legacy.html`).
- **Features**:
  - 5 technical categories with custom SVG illustrations:
    1. *Programming & Logic* (Python, scripting, regex, file I/O)
    2. *Web & UI Systems* (Semantic HTML5, CSS3 Grid/Flexbox, REST APIs)
    3. *Security & Assessment* (Web vulnerability testing, SQLi, XSS, ethical hacking)
    4. *Workflow & Engineering Tooling* (Git, Linux CLI, VS Code, Burp Suite, GitHub Actions)
    5. *AI Systems & LLM Security* (Prompt injection defense, OWASP Top 10 for LLMs, ReAct loops)
  - Zero misleading proficiency percentages or fake metric bars.

### Section 05: Experience Timeline
- **Component**: `ExperienceTimeline.tsx` (Legacy: lines 1949–1990 in `index.legacy.html`).
- **Features**:
  - Progressive drawing vertical spine line (`scaleY: 0 -> 1`) triggered via scroll viewport intersection.
  - Milestone indicator nodes with glowing lime accents.
  - Verified entries:
    - *Cybernaut* — Python Developer Intern (Jul 2024–Present)
    - *ELITA* — Web & App Dev Intern (Jul–Aug 2025)
    - *Gnanamani Cybersecurity Club* — Member & CTF Competitor (Aug 2022–May 2024)
    - *Gnanamani College of Technology* — B.E. Degree (Expected May 2027)

### Section 06: Engineering Process
- **Component**: `EngineeringProcess.tsx` (Legacy: lines 1992–2030 in `index.legacy.html`).
- **Features**:
  - 5-step problem-solving sequence:
    1. *Deconstruct & Understand*
    2. *Architect & Plan*
    3. *Implement Incrementally*
    4. *Verify & Audit*
    5. *Deliver & Document*
  - Responsive 5-column layout on desktop, stacked on mobile.

### Section 07: AI Systems & LLM Security
- **Component**: `AIEngineeringSection.tsx` (Legacy: lines 2032–2150 in `index.legacy.html`).
- **Features**:
  - Multi-tab navigation:
    - *Tab 01*: Agentic ReAct Architecture & Vector RAG Pipeline Schematic
    - *Tab 02*: OWASP Top 10 for LLMs Defensive Matrix
    - *Tab 03*: CyberCopilot Sandbox Simulator (Interactive Demo)
  - Explicit disclaimer: `[IN-BROWSER DEMO SIMULATION ONLY: No external LLM inference, zero data leakage]`.
  - Preset test scenarios: Test prompt injection, query tech stack, query education.

### Section 08: High-Contrast Contact
- **Component**: `ContactSection.tsx` (Legacy: lines 2152–2200 in `index.legacy.html`).
- **Features**:
  - Direct mailto link: `santhoshkumar160706@gmail.com`.
  - Tactile clipboard copy button with instant visual feedback (`✓ Copied!`) and polite `aria-live` announcement.
  - Phone link: `+91 9345402493`.
  - LinkedIn and GitHub profile shortcuts.

### Section 09: Site Footer & Progress Indicator
- **Components**: `Footer.tsx` & `ScrollProgress.tsx`.
- **Features**:
  - Smooth reading progress indicator pinned to top viewport edge.
  - Copyright and engineering craftsmanship disclosure.
  - Back-to-top smooth scroll anchor.

---

## 2. SVG Vector Systems Inventory

| SVG Component | Location | Subject Matter | Interactive Features |
| :--- | :--- | :--- | :--- |
| `HeroSystemArchitecture` | `src/svgs/HeroSystemArchitecture.tsx` | Central security coordinator + 7 satellite nodes | Node clicking, hover highlights, data packet animation along links |
| `CybersecurityWorkflowSvg` | `src/svgs/CybersecurityWorkflowSvg.tsx` | Ingress $\rightarrow$ Sanitize $\rightarrow$ SQLi/XSS $\rightarrow$ Verified Sink | Flowing signal packet, dual inspection branches |
| `PythonAutomationSvg` | `src/svgs/PythonAutomationSvg.tsx` | Log collection $\rightarrow$ Regex parse $\rightarrow$ Classify $\rightarrow$ Alert | Moving packet, alert webhook vs archive splits |
| `AIAgentArchitectureSvg` | `src/svgs/AIAgentArchitectureSvg.tsx` | Input $\rightarrow$ ReAct Planner $\rightarrow$ Vector RAG $\rightarrow$ Guardrail | Packet flow, dual RAG/tool calling branches |
| `RdaArchitectureSvg` | `src/svgs/RdaArchitectureSvg.tsx` | Dispatch $\rightarrow$ Driver match $\rightarrow$ Geofence GPS $\rightarrow$ POD | Conceptual label, proximity queue flow |
| `HrSuiteArchitectureSvg` | `src/svgs/HrSuiteArchitectureSvg.tsx` | Resume ingest $\rightarrow$ Skill parser $\rightarrow$ PII masking $\rightarrow$ Triage | Conceptual label, anonymization split |
| `RecallAiArchitectureSvg` | `src/svgs/RecallAiArchitectureSvg.tsx` | Doc ingest $\rightarrow$ Chunk & embed $\rightarrow$ Vector index $\rightarrow$ Synthesis | Conceptual label, token overlap flow |
| `CtfMatrixSvg` | `src/svgs/CtfMatrixSvg.tsx` | Recon $\rightarrow$ Crypto $\rightarrow$ Exploit $\rightarrow$ Flag validation | Orbiting packet, diamond topology |
| `SkillCategorySvgs` | `src/svgs/SkillCategorySvgs.tsx` | 5 category technical glyphs | Consistent stroke widths, currentColor inheritance |

---

## 3. Motion & Animation Inventory

1. **Page & Section Reveals**: Staggered `opacity: 0 -> 1` and `y: 16 -> 0` via `framer-motion` (`whileInView`, `viewport={{ once: true }}`).
2. **Typography Line Reveals**: CSS and Framer Motion line wrappers with `overflow: hidden` and `translateY(100% -> 0)`.
3. **Data Packet Loops**: SVG circle elements animating along predefined coordinate paths using `repeat: Infinity, ease: 'linear'`.
4. **Drawing Timeline Line**: SVG/div spine line animating `scaleY: 0 -> 1` with editorial ease `[0.16, 1, 0.3, 1]`.
5. **Reduced Motion**: All continuous loops and positional shifts are fully neutralized when `prefers-reduced-motion: reduce` is active via `useReducedMotion()`.

