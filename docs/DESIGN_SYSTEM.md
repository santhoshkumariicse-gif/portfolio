# Design System: Green + Black JARVIS Core
**Project:** Santhosh Kumar M — Professional Portfolio  
**Architecture:** 3D Universe Homepage × 3D Highway Portfolio  
**Design Standard:** Anti-Slop Discipline // Recruiter-First Information Architecture  

---

## 1. Color Palette & 60-30-10 Distribution

The portfolio enforces a strict **60-30-10 color hierarchy** to prevent visual fatigue, eliminate generic AI neon glow soup, and guarantee WCAG 2.2 AA accessibility contrast across all screens.

```
┌────────────────────────────────────────────────────────┐
│  60% DEEP SPACE BLACK (#030806, #07120D)               │
│  Base background, 3D world fog, asphalt, canvas body   │
├────────────────────────────────────────┬───────────────┤
│  30% DARK EMERALD SURFACES             │ 10% EMERALD   │
│  (#0A1710, #0F2117)                    │ HIGHLIGHTS    │
│  Cards, panels, headers, borders       │ Active state, │
│                                        │ badges, CTAs  │
└────────────────────────────────────────┴───────────────┘
```

### Palette Tokens

| Token | Hex Value | Role | Usage |
| :--- | :--- | :--- | :--- |
| `color-bg-primary` | `#030806` | Primary Canvas | 3D space background, highway asphalt, body root. |
| `color-bg-secondary` | `#07120D` | Secondary Surface | Card outer backgrounds, HUD headers, modal backings. |
| `color-surface` | `#0A1710` | Interactive Surface | Sub-cards, technology tags, active selection panels. |
| `color-primary-green` | `#00E676` | Primary Accent | Main CTA buttons, active milestone nodes, key highlights. |
| `color-holographic-green` | `#39FF88` | Secondary Accent | Subtitles, status indicators, animated progress bars. |
| `color-secondary-teal` | `#00BFA5` | Tertiary Accent | Orbital planetary rings, technical badge borders. |
| `color-text-primary` | `#E7F5EC` | Primary Text | Headings, card titles, verified credentials (4.5:1+ contrast). |
| `color-text-secondary` | `#91A99A` | Secondary Text | Descriptions, dates, metadata labels. |
| `color-border-subtle` | `rgba(255, 255, 255, 0.10)` | Surface Structure | Clean structural borders without fluorescent distraction. |
| `color-border-active` | `rgba(0, 230, 118, 0.35)` | Active Border | Active section indicators, focused cards. |

---

## 2. Typography Hierarchy

To eliminate the common AI antipattern of rendering every string in uppercase monospace, the typography strictly separates human communication from machine telemetry:

| Layer | Font Family | Size / Leading | Weight | Role & Application |
| :--- | :--- | :--- | :--- | :--- |
| **Display Heading** | `Inter`, sans-serif | `48px–72px` / `1.0` | `Black (900)` | Developer Name on Universe Hero. |
| **Section Title** | `Inter`, sans-serif | `16px–24px` / `1.2` | `Bold (700)` | Section titles (e.g. "About Santhosh", "Featured Projects"). |
| **Body Prose** | `Inter`, sans-serif | `12px–14px` / `1.6` | `Regular (400)` | Descriptions, bullet points, bios, project details. |
| **Telemetry / Code** | `JetBrains Mono`, mono | `10px–12px` / `1.4` | `Bold (700)` | Section indices (`01 / 07`), KM odometer, dates, tech chips. |
| **Micro Badges** | `JetBrains Mono`, mono | `9px–10px` / `1.2` | `Bold (700)` | Status pills, GPA metrics, degrees, coordinates. |

---

## 3. Spatial Layout & Layout Rules

1. **Unobstructed Viewports**:
   - The active section presentation card is docked at `ml-0 sm:ml-4 lg:ml-8` with a restrained width (`max-w-md lg:max-w-lg`).
   - This guarantees that 3D billboards (including Santhosh's authentic photograph at KM 1) remain clearly visible and unoccluded.
2. **Responsive Max Heights**:
   - Desktop: `max-h-[64vh]` with custom smooth scrollbars.
   - Mobile: `max-h-[52vh]` to prevent overlap with top headers or bottom navigation docks.
3. **Z-Index Layering**:
   - Layer 0: Three.js 3D WebGL Canvas (`z-0`).
   - Layer 10: Vignette and subtle atmospheric overlays (`z-10`).
   - Layer 20: 3D Billboards & Spatial anchors.
   - Layer 30: HUD Navigation Dock, Header, and Section Presentation Card (`z-30`).

---

## 4. Component Design & Anti-Slop Rules

1. **Restraint Over Excess**:
   - **No Glow Everywhere**: Glow is capped at 1–2 focal elements per screen (e.g., active section pip, primary CTA button). All sub-cards and pills stay matte.
   - **No Perpetual Line Clutter**: Decorative SVG lines across full viewports are avoided; only subtle concentric planetary rings (opacity `< 18%`) are allowed.
   - **No Meaningless Jargon**: Tech names are direct, descriptive, and human-friendly (e.g., "About Santhosh" instead of "SEC-01 // PERSONAL_DOSSIER").
2. **Tactile Interaction**:
   - Hover states provide immediate, subtle feedback (`scale(1.02)` and border transition) without jitter or layout shifts.
   - Active controls indicate current status through fill color and clear text labels.

---

## 5. Motion & Animation Principles

1. **Purpose-Driven Movement**:
   - Camera movement along the Catmull-Rom spline occurs only during navigation between sections.
   - Camera damping factor of `4.2` ensures smooth, cinematic glide without nausea or disorientation.
2. **Transition Locks**:
   - `isTransitioning` state locks out rapid duplicate clicks during flight, ensuring the camera completes its arrival before the next section can be triggered.
3. **Accessibility**:
   - Fully respects `prefers-reduced-motion`: animation damping times collapse to instant transitions for visitors with vestibular sensitivities.
