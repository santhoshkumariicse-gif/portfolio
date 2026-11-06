# Portfolio V6: Architectural Review & Platform Topology

## 1. Executive Summary
Portfolio V6 transitions the codebase into an advanced digital engineering platform. It establishes a centralized design token system (`src/design-system/`), an accessible global Command Palette (`Ctrl+K` / `Cmd+K`), a sandboxed educational Cybersecurity Playground, an interactive REST API lifecycle simulator, and a structured Engineering Documentation Center.

---

## 2. Component Boundaries & Modularity

| Layer | Responsibility | Primary Modules |
| :--- | :--- | :--- |
| **Design System** | Centralized theme tokens & primitives | `src/design-system/tokens.ts`, `Badge`, `SectionHeading`, `StatusIndicator`, `Container` |
| **Navigation & Search** | Global search and keyboard command indexing | `src/components/CommandPalette.tsx`, `Navbar.tsx`, `MobileNavigation.tsx` |
| **Interactive Labs** | Educational simulated environments | `InsideTheSystemsLab.tsx`, `CybersecurityPlayground.tsx`, `ApiEngineeringLab.tsx`, `InteractiveTerminalV2.tsx` |
| **Engineering Docs** | Architectural standards & guidelines | `src/components/EngineeringDocCenter.tsx`, `src/data/blogArticles.ts` |
| **Case Studies** | Evidence-based project presentation | `src/components/ProjectCard.tsx`, `ProjectDetailModal.tsx`, `src/svgs/` |
| **Motion Foundation** | Hardware-accelerated transitions & a11y | `src/motion/` (`useAppMotion`, `useReducedMotion`) |

---

## 3. Strict Architectural Guarantees
1. **Zero External Shell Execution**: All interactive terminal commands and security payload tests are evaluated by deterministic, pure client-side string parsers.
2. **Zero Insecure DOM Injection**: User-provided strings in the XSS playground and search inputs are sanitized and rendered using React JSX text interpolation.
3. **Responsive Viewport Reflow**: Tested cleanly across 320px–1920px viewports without horizontal scrolling.

