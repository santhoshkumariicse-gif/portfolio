# Motion System & Creative Engineering Specification

## 1. Principles

Motion in this portfolio is purposeful, disciplined, and engineered to support content hierarchy, technical clarity, and tactile feedback.
It strictly prohibits generic templates, floating particles, neon orbs, fake terminal animations, scroll-jacking, and unnecessary libraries.

All animations have a specific technical purpose, clean easing curves, and a definite stopping point. Idle animations suspend execution to guarantee 60–120 FPS performance and zero CPU drain.

---

## 2. Centralized Motion Tokens

Defined in CSS custom properties and JS constants:
- `--ease-editorial`: `cubic-bezier(0.16, 1, 0.3, 1)` — for smooth typographic reveals and masks.
- `--ease-spring`: `cubic-bezier(0.2, 0.8, 0.2, 1)` — for tactile micro-interactions and button elevations.
- `--ease-sharp`: `cubic-bezier(0.4, 0, 0.2, 1)` — for state toggles and transitions.
- `--duration-fast`: `180ms` — for hover, focus, and pointer micro-feedback.
- `--duration-base`: `300ms` — for cards, borders, and disclosure transitions.
- `--duration-reveal`: `700ms` — for section and heading entrance animations.
- `--duration-draw`: `1100ms` — for timeline and circuit trace drawing sequences.

---

## 3. Core Implemented Interactions

### 1. Interactive Hero Network (Signature Interaction)
- **Engine**: High-DPI Canvas (`<canvas id="hero-network-canvas">`) rendered with physical pixel-ratio scaling (`window.devicePixelRatio`).
- **Topology**: Represents a multi-node security architecture (Core Coordinator, Ingress, Analyzer, Vault Encryption, Dispatch Gateway, and inspection probes).
- **Initial Entrance Sequence**:
  - Progressive drawing of connecting circuit paths (`0 -> 1` progress over 950ms).
  - Staggered node reveals with single-cycle targeting rings.
  - Scene settles into a static state once initialized.
- **Pointer Interaction**:
  - Fine pointer tracking computes relative canvas coordinates.
  - Proximity deflection: nodes within pointer radius gently deflect with spring dampening (`spring = 0.08`, `damping = 0.78`, max displacement 11px).
  - Hover illumination: nearest node highlights in electric lime `#C7FF45`, displaying telemetry labels and coordinates in real-time (`COORD: [x, y]` and `ID // ACTIVE LINK`).
  - Restrained 3D perspective tilt (max 3.5°) on the bezel housing with spring restoration on pointer leave.
- **Performance & Idle Management**:
  - The `requestAnimationFrame` loop automatically halts when movement settles (`velocity < 0.05px`).
  - `IntersectionObserver` halts all canvas loops when the hero scrolls out of view.
  - Page `visibilitychange` suspends execution when the tab is backgrounded.

### 2. Cinematic Typography Reveals
- **Headline Masking**:
  - Uses CSS line wrappers with `overflow: hidden`.
  - Heading lines reveal with staggered `translateY(105% -> 0)` and `opacity: 0 -> 1` using `--ease-editorial`.
  - Accessible via full `aria-label` on the parent `<h1>`.
- **Supporting Copy & Actions**:
  - Kicker line draws with `scaleX(0 -> 1)`.
  - Paragraph copy and CTA buttons enter with short, non-blocking fade transitions (380ms delay) so visitors never wait for content.

### 3. Projects — Technical Depth & Schematics
- **Bespoke Vector Schematics**:
  - Inline SVG blueprints for each verified project area:
    1. *Web Application Security Testing*: Input filtering, SQLi / XSS inspection sink, and pass path.
    2. *Python Security Automation*: Log polling, regex triage pipeline, and automated alert dispatch.
    3. *CTF Challenge Practice*: Diamond reconnaissance matrix, cryptographic cipher blocks, and flag validation.
- **Micro-interactions**:
  - Project numbers (`01 / 03`) translate right by 4px on hover.
  - Schematics illuminate trace lines and scale node markers upon card hover.
  - Native accessible `<details>` disclosure with styled lime borders.

### 4. Experience Timeline — Drawing Spine Line
- Progressive vertical drawing line (`.timeline-progress-line`) that transforms `scaleY(0 -> 1)` via `IntersectionObserver` when entering view.
- Timeline items enter with staggered opacity and position adjustments.
- Milestone nodes feature electric-lime markers.

### 5. Navigation & Tactile Micro-Interactions
- Sliding underline indicator on nav links (`transform: scaleX(0 -> 1)` with `transform-origin` awareness).
- Active section highlighting linked to page scrolling.
- Accessible mobile drawer with `aria-expanded` and Escape key dismissal.
- Tactile copy-email button with instant clipboard feedback (`✓ Copied!` state).
- Directional arrow shifts (`↗` shifts `3px, -3px`) on hover/focus.

---

## 4. Reduced Motion & Accessibility

- Strictly respects `prefers-reduced-motion: reduce`:
  - Disables smooth scrolling.
  - Cancels canvas physics loops, rendering a crisp static network graph immediately.
  - Immediately reveals all headline lines, cards, and timeline spines (`transform: none`, `opacity: 1`).
  - Preserves 100% of links, buttons, and content readability.
