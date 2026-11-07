# Design System: Obsidian Black × Ice Grey × Racing Red
**Project:** Santhosh Kumar M — Professional Portfolio  
**Architecture:** 3D Universe Homepage × 3D Highway Portfolio  
**Visual Identity:** Precision Motorsport Telemetry & High-Performance Engineering Interface  
**Design Standard:** Anti-Slop Discipline // Recruiter-First Information Architecture  

---

## 1. Non-Negotiable Color Palette & 60-30-10 Distribution

The portfolio enforces a strict **60-30-10 color hierarchy** inspired by high-performance automotive cockpits, carbon-fiber surfaces, and precision engineering telemetry. This eliminates generic neon glow soup and ensures maximum readability and contrast (WCAG 2.2 AA).

```
┌────────────────────────────────────────────────────────┐
│  60% OBSIDIAN & CARBON BLACK                           │
│  #090B0E (Obsidian Black) · #171B20 (Carbon Black)     │
│  Base background, 3D world fog, road asphalt, body     │
├────────────────────────────────────────┬───────────────┤
│  30% ICE GREY & STEEL GREY             │ 10% RACING    │
│  #C9D0D8 (Ice Grey) · #87919D (Steel)  │ RED ACCENT    │
│  #20252C (Elevated Surface)            │ #E10620 (Red) │
│  Typography, cards, borders, markings  │ Active state  │
└────────────────────────────────────────┴───────────────┘
```

### Exact Design Tokens

| Role | Token Name | Value | Purpose & Application |
| :--- | :--- | :--- | :--- |
| **Primary Base** | Obsidian Black | `#090B0E` | Deep background, 3D universe fog, highway asphalt, page root. |
| **Secondary Surface** | Carbon Black | `#171B20` | Cards, modal backing, truss frameworks, road guardrails. |
| **Elevated Surface** | Elevated Surface | `#20252C` | Card headers, chip surfaces, overhead gantry crossbeams. |
| **Primary Text** | Pure Light | `#F2F4F7` | Hero name, card headings, modal titles, high-contrast readability. |
| **Readable Body** | Ice Grey | `#C9D0D8` | Section subtitles, body prose, descriptions, solid shoulder road lines. |
| **Telemetry Text** | Steel Grey | `#87919D` | Milestone labels, dates, secondary tags, subtle dashed road markings. |
| **Muted Minor** | Muted Grey | `#626C78` | Minor telemetry footprints, footer copyright, placeholder text. |
| **Primary Accent** | Racing Red | `#E10620` | Main CTA buttons, active milestone indicators, laser edge rails. |
| **Signal Accent** | Signal Red | `#FF3548` | Interactive hover states, pulse dots, active section numbers, pips. |
| **Deep Accent** | Deep Red | `#A9081A` | Atmospheric glow rim, shadow accents, progress gradient stops. |
| **Subtle Border** | Subtle Border | `rgba(201, 208, 216, 0.12)` | Structural card borders, grid dividers, subtle separators. |
| **Strong Border** | Strong Border | `rgba(201, 208, 216, 0.24)` | Active focus outlines, header borders. |
| **Active Border** | Active Border | `rgba(225, 6, 32, 0.75)` | Interactive focused cards, active input boundaries. |

---

## 2. Typography Hierarchy

To maintain technical credibility without excessive monospace, typography strictly separates human communication from machine telemetry:

| Layer | Font Family | Size / Leading | Weight | Role & Application |
| :--- | :--- | :--- | :--- | :--- |
| **Display Heading** | `Inter`, sans-serif | `48px–72px` / `1.0` | `Black (900)` | Developer Name on Universe Hero. |
| **Section Title** | `Inter`, sans-serif | `16px–24px` / `1.2` | `Bold (700)` | Section titles (e.g. "About Santhosh", "Featured Projects"). |
| **Body Prose** | `Inter`, sans-serif | `12px–14px` / `1.6` | `Regular (400)` | Descriptions, bullet points, bios, project details. |
| **Telemetry / Code** | `JetBrains Mono`, mono | `10px–12px` / `1.4` | `Bold (700)` | Section indices (`01 / 07`), KM odometer, dates, tech chips. |
| **Stat Badges** | `JetBrains Mono`, mono | `9px–11px` / `1.0` | `Black (900)` | Numerical metrics, verified tags (`GPA: 7.2`). |

---

## 3. Spatial Rules & Highway Composition

1. **Billboard Visibility Protection**:
   - The active information card is constrained to `max-w-md lg:max-w-lg` with responsive margins (`ml-0 sm:ml-4 lg:ml-8`).
   - The 3D milestone billboard at lateral offset `-13.0` (KM 1) is never occluded by the 2D UI card.
2. **Vertical Chromatic Containment**:
   - Card max-height is strictly clamped to `52vh` on mobile and `64vh` on desktop.
   - The Top HUD and bottom navigation controls maintain dedicated clear zones across all viewport sizes.
3. **High-CRI Authentic Portrait Lighting**:
   - The KM 1 portrait billboard features a dedicated high-CRI natural white key spotlight (`#F4FBF7`, intensity `2.8`) to preserve authentic skin tones and photograph integrity without distortion or green wash.
   - A subtle Signal Red rim light (`#FF3548`, intensity `0.6`) provides atmospheric cohesion without contaminating the face.

---

## 4. Motion Design Rules

- **Camera Paths**: Smooth Catmull-Rom spline progression (`centripetal`, tension `0.25`).
- **Accent Motion**: Controlled Racing Red glow pulses on active milestones; no perpetual spinning screen-wide reticles.
- **Button Transitions**: Mechanical scale feedback (`hover:scale-105 active:scale-95`) with smooth shadow expansions.
- **Reduced Motion**: Full support for `prefers-reduced-motion: reduce`, dropping transition durations to `0.01ms`.
