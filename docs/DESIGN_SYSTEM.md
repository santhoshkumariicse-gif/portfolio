# DESIGN SYSTEM SPECIFICATION — SAN AI: THE DEVELOPER UNIVERSE

**Project**: SAN AI — THE DEVELOPER UNIVERSE  
**Lead Designer**: Principal Interface Designer & Creative Technologist  
**Version**: 2.0.0  
**Design Tokens**: `src/design-system/hudTokens.ts`  
**Components**: `src/components/hud/`  

---

## 1. Visual Identity & Design Philosophy

The visual language of **SAN AI — THE DEVELOPER UNIVERSE** marries high-end tactical aerospace telemetry, futuristic holographic interfaces, and deep atmospheric anime environments. It establishes a unified aesthetic that connects both the **3D Open-World Island** and the **Classic 2D Portfolio**.

### Core Tenets:
1. **Purposeful Holography**: Holographic elements (cyan, lime, crimson) denote interactive systems, data nodes, and active telemetry rather than decorative clutter.
2. **Atmospheric Obsidian Void**: The base canvas is grounded in deep obsidian blacks (`#0A0B09`, `#060705`) to maximize contrast and eliminate eye strain.
3. **No Copyrighted Imagery**: All circular HUD rings, reticles, and waveforms are custom procedural SVG vector designs; zero copy of copyrighted Iron Man / Marvel graphics.
4. **Instant Dual-Mode Utility**: The interface seamlessly works both as a 3D HUD overlay and as standard DOM components.

---

## 2. Color Palette & Chromatic Tokens

| Token Name | Hex / Value | Usage & Significance |
| :--- | :--- | :--- |
| **Void Obsidian** | `#0A0B09` | Universal deep backdrop; space void; canvas background. |
| **Glass Surface** | `rgba(13, 16, 14, 0.88)` | HUD information panels and dialogue containers. |
| **Holo Cyan** | `#00E5FF` | SAN AI Core, skill nodes, system diagnostics, links. |
| **Cyber Lime** | `#C7FF45` | Primary interaction accent, active indicators, verified milestones. |
| **Neon Crimson** | `#FF3358` | Mission Control, project directives, tactical alerts. |
| **Golden Amber** | `#FFB347` | Origin Coast sunrise, academic foundations, processing states. |
| **Primary Text** | `#F0F0E9` | Headlines, verified claims, primary readable body. |
| **Secondary Text**| `#9BA195` | Descriptive subtext, academic details, documentation. |
| **Muted Text** | `#585F53` | Telemetry coordinates, micro-timestamps, disabled labels. |

---

## 3. Typography Architecture

- **Telemetry & Monospace**: `JetBrains Mono, SFMono-Regular, Menlo, monospace`
  - Used for zone coordinates (`[0, 1.5, 75]`), AI state tags (`STATE: IDLE`), button labels, and code snippets.
- **Editorial & Content**: `Inter, -apple-system, sans-serif`
  - Used for personal narratives, project problem/solution breakdowns, and dialogue paragraphs.
- **Academic & Editorial Emphasis**: `Newsreader, Georgia, serif` (Italic)
  - Used selectively for personal quotes and foundational philosophy.

---

## 4. Master HUD Components Catalog

### 1. `HoloButton` (`src/components/hud/HoloButton.tsx`)
- Tactile holographic button featuring 4 corner reticle brackets.
- Three color variants: `cyan`, `lime`, `crimson`.
- Dynamic hover scanline wash and active spring compression.

### 2. `CircularAICoreControl` (`src/components/hud/CircularAICoreControl.tsx`)
- Concentric SVG rings with rotating tick marks (`animate-[spin_12s_linear_infinite]`).
- Central pulsing energy orb displaying live assistant state (`idle`, `listening`, `processing`, `speaking`, `error`).
- Tap/click expands the SAN AI conversation panel.

### 3. `HoloInfoPanel` (`src/components/hud/HoloInfoPanel.tsx`)
- Semi-transparent glassmorphic card with top signal gradient edge.
- Reticle corner marks, telemetry status footer, and close action.
- Used for in-world point-of-interest inspections and skill details.

### 4. `HoloLoadingScreen` (`src/components/hud/HoloLoadingScreen.tsx`)
- Futuristic boot screen verifying WebGL 2.0, terrain streaming, and knowledge base readiness.
- Progress bar and diagnostic checklist.

### 5. `HoloChapterNav` (`src/components/hud/HoloChapterNav.tsx`)
- Floating chapter/zone fast-travel navigation pill.

### 6. `WorldMinimap` (`src/components/universe/WorldMinimap.tsx`)
- Interactive circular top-down SVG radar HUD.
- Live radar sweep rings, island landmass outline, zone blips with active ping animation.

---

## 5. Animation Tokens & Accessibility

1. **Telemetry Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` for smooth mathematical reveals.
2. **Spring Easing**: `cubic-bezier(0.2, 0.8, 0.2, 1)` for micro-interactions and button elevation.
3. **WCAG 2.1 AA Compliance**:
   - Contrast ratio of `#F0F0E9` on `#0A0B09` is **17.8:1** (exceeds 4.5:1 requirement).
   - All interactive controls feature visible high-contrast focus rings.
   - Screen-reader landmarks (`role="button"`, `role="region"`, `aria-label`).
   - `prefers-reduced-motion` suppresses all continuous orbital spins and pulsing glows.
