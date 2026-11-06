# Motion System & Creative Engineering Specification — The Developer Chronicles

## 1. Principles

Motion in "THE DEVELOPER CHRONICLES" is purposeful, cinematic, and disciplined. It is engineered to support storytelling hierarchy, character narrative, and tactile feedback.
It strictly prohibits unconstrained continuous canvas loops, heavy particle clouds, fake terminal animations, and scroll-jacking.

All animations have a specific technical purpose, clean easing curves, and a definite settling point. Idle animations suspend execution to guarantee 60–120 FPS performance and zero CPU drain on mid-range hardware.

---

## 2. Centralized Motion Tokens

Defined in CSS custom properties, JS constants, and `src/design-system/tokens.ts`:
- `--ease-editorial`: `cubic-bezier(0.16, 1, 0.3, 1)` — for smooth typographic reveals and chapter masks.
- `--ease-spring`: `cubic-bezier(0.2, 0.8, 0.2, 1)` — for tactile micro-interactions and button elevations.
- `--ease-sharp`: `cubic-bezier(0.4, 0, 0.2, 1)` — for state toggles and modal transitions.
- `--duration-fast`: `180ms` — for hover, focus, and pointer micro-feedback.
- `--duration-base`: `300ms` — for cards, borders, and disclosure transitions.
- `--duration-reveal`: `700ms` — for section and heading entrance animations.
- `--duration-draw`: `1100ms` — for timeline and circuit trace drawing sequences.

---

## 3. The Six Chapter Motion Orchestration

| Chapter | Component | Motion Characteristics | Avatar Expression & Staging |
| :--- | :--- | :--- | :--- |
| **CH_01: The Beginning** | `CinematicHero.tsx` | Parallax circuit paths (`x/y` subtle translation), light dust drift (8 particles), typographic mask unrolling. | `idle` pose with subtle 4.5s vertical oscillation (`y: 0 -> -6 -> 0`). |
| **CH_02: The Origin** | `AboutSection.tsx` | Staggered academic fact reveals, CAD blueprint vector scan lines. | `thinking` pose with dialogue speech bubble slide-up. |
| **CH_03: The Arsenal** | `SkillTree.tsx` | Holographic node scale pulse on hover, animated SVG circuit paths connecting disciplines. | `exploring` pose interacting with floating holographic node. |
| **CH_04: The Missions** | `MissionsSection.tsx` | Tactical radar crosshair rotation, expandable mission schematic height morphing. | `coding` pose seated at glowing dual-monitor workstation. |
| **CH_05: The Evolution** | `StoryTimeline.tsx` | Progressively drawn vertical gradient spine (`scaleY: 0 -> 1`), milestone beacon pulse. | `achievement` celebratory pose with milestone starburst. |
| **CH_06: The Next Chapter**| `ContactFinale.tsx` | Constellation horizon scanning, interactive copy feedback transitions. | `future` pose turned 3/4 towards the horizon. |

---

## 4. Desktop Precision Custom Cursor

- **Targeting**: Automatically active only on devices with fine pointer tracking (`window.matchMedia('(pointer: fine)')`), completely bypassed on touch devices.
- **Physics**: Dual-layer system:
  - Inner reticle dot: ultra-responsive spring (`stiffness: 600, damping: 40, mass: 0.1`).
  - Outer trailing cyber ring: smooth trailing spring (`stiffness: 350, damping: 25, mass: 0.2`).
- **Interactive Morphing**: When hovering over links (`<a>`), buttons (`<button>`), or inputs, the outer ring smoothly expands (`24px -> 40px`) with a soft `#C7FF45` background wash while the center dot collapses.
- **Lifecycle & Memory**: Automatically unbinds `mousemove`, `mouseover`, and `mouseleave` listeners upon component unmount.

---

## 5. Reduced Motion & Accessibility

Strictly adheres to `prefers-reduced-motion: reduce`:
- Smooth scrolling falls back to immediate jump.
- Avatar floating oscillations are suspended.
- Background cyber dust particles are disabled.
- Custom cursor is completely disabled in favor of native OS pointer.
- All chapter headings, cards, and dialogue bubbles render immediately (`transform: none`, `opacity: 1`).
- Preserves 100% of interactive links, buttons, and content accessibility.
