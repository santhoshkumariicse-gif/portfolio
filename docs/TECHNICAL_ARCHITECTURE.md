# TECHNICAL ARCHITECTURE — SAN AI: THE DEVELOPER UNIVERSE

**Project**: SAN AI — THE DEVELOPER UNIVERSE  
**Architect**: Principal Software Architect & Creative Technologist  
**Version**: 1.0.0  
**Target Stack**: React 18 · TypeScript 5.7 · Vite 6 · Three.js · React Three Fiber · Drei · GSAP · Framer Motion

---

## 1. High-Level System Architecture

The architecture is built around a **Dual-Mode Presentation Pipeline**:
1. **3D Open-World Universe (`Universe3D`)**: An interactive 3D WebGL island rendered via React Three Fiber, featuring 5 regional zones, an anime developer avatar, procedural environment shaders, and a HUD overlay.
2. **Traditional 2D Portfolio (`ClassicView`)**: The full, verified HTML/React portfolio with all 6 narrative chapters, accessible instantly on low-spec hardware, mobile touchscreens, or upon user request.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          APPLICATION ROOT                              │
├────────────────────────────────┬───────────────────────────────────────┤
│    SAN AI Core Provider        │   Mode Controller (3D World / 2D)     │
│   (Local Knowledge Base)       │  (Auto-detection & Manual Switch)     │
├────────────────────────────────┴───────────────────────────────────────┤
│                                                                        │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │                    HEADS-UP DISPLAY (HUD)                    │     │
│   │  [Top] Chapter / Zone Banner    [Right] SAN AI Orb & Panel   │     │
│   │  [Left] Minimap & Fast-Travel   [Bottom] Joystick & Prompts  │     │
│   └──────────────────────────────────────────────────────────────┘     │
│                                │                                       │
│   ┌────────────────────────────┴─────────────────────────────┐         │
│   │                                                          │         │
│   ▼                                                          ▼         │
│ ┌───────────────────────────┐             ┌──────────────────────────┐ │
│ │ 3D UNIVERSE CANVAS (R3F)  │             │ TRADITIONAL 2D PORTFOLIO │ │
│ │ • Prologue (Space)        │             │ • Cinematic Hero (CH_01) │ │
│ │ • Zone 1: Origin Coast    │   TOGGLE    │ • About & Origin (CH_02) │ │
│ │ • Zone 2: Skill Forest    │ ◄─────────► │ • Skill Tree (CH_03)     │ │
│ │ • Zone 3: Project City    │             │ • Missions (CH_04)       │ │
│ │ • Zone 4: Exp Mountain    │             │ • Evolution (CH_05)      │ │
│ │ • Zone 5: Contact Beacon  │             │ • Contact Finale (CH_06) │ │
│ └───────────────────────────┘             └──────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Connected 3D Island World Coordinate System

The world is a single, interconnected, low-poly island positioned on a continuous coordinate plane:

| Zone | World Center `[X, Y, Z]` | Environment Archetype | Narrative Focus |
| :--- | :--- | :--- | :--- |
| **Prologue (Space)** | `[0, 150, 0]` | Deep space, starfield nebula, orbital approach. | Gateway opening & mode selection. |
| **Zone 01: Origin Coast** | `[0, 0, 80]` | Karaikal-inspired shoreline, sunrise, palm trees, study desk. | Early foundations, Gnanamani College. |
| **Zone 02: Skill Forest** | `[-70, 5, 20]` | Bioluminescent trees, floating tech crystals, glowing monuments. | 7 Skill domains & verified proficiencies. |
| **Zone 03: Project City** | `[60, 8, -30]` | Cyberpunk neon architecture, holographic billboards. | Real software projects (RDA, ATS, Recall). |
| **Zone 04: Experience Mountain** | `[-40, 25, -90]` | Ascending mountain path, rope bridges, observation decks. | Internships (Cybernaut, ELITA), certifications. |
| **Zone 05: Contact Beacon** | `[10, 35, -140]` | High-altitude ocean overlook, holographic lighthouse. | Direct communication & future horizons. |

---

## 3. SAN AI Holographic Core Architecture

SAN AI functions as an autonomous, in-world personal guide modeled after an advanced JARVIS interface:

```
┌────────────────────────────────────────────────────────┐
│                   SAN AI ARCHITECTURE                  │
├────────────────────────────────────────────────────────┤
│  1. AICoreVisual (Animated SVG Concentric HUD Rings)   │
│  2. State Machine:                                     │
│     IDLE ➔ LISTENING ➔ PROCESSING ➔ SPEAKING ➔ ERROR   │
│  3. Local Command Engine:                              │
│     "Introduce Santhosh" ➔ Origin Coast Camera Path    │
│     "Show Skills"        ➔ Skill Forest Highlight      │
│     "Open LorryBook"     ➔ Project City Mission Modal  │
│  4. Knowledge Base Pipeline:                           │
│     Direct read from verified data (profile, projects) │
│  5. Speech Synthesis / Recognition Abstraction:        │
│     Native Web Speech API with seamless text fallback  │
└────────────────────────────────────────────────────────┘
```

### Safety & Privacy Boundaries:
- **Zero Automatic Microphone Prompts**: The microphone is accessed only after explicit user interaction with the mic button.
- **Zero API Key Leakage**: The command engine runs 100% client-side via local semantic pattern matching. No external LLM key is hardcoded.

---

## 4. Navigation & Exploration Systems

1. **Guided Cinematic Tour**:
   - Automated camera tracks choreographed with GSAP / R3F `camera.position.lerp()`.
   - Automatic triggers for SAN AI voice/text narration as points of interest enter proximity.
   - Interactive play, pause, rewind, and zone-jump controls.
2. **Free Roam Mode**:
   - Desktop: WASD / Arrow keys for planar movement, mouse drag for orbit/pan look.
   - Mobile: Virtual on-screen joystick + touch drag camera rotation.
   - Boundary & Elevation Clamping: Raycaster height-snapping to the low-poly terrain mesh.
   - Proximity Interaction: Press `E` on keyboard or tap on mobile when near an interactive object.

---

## 5. Performance Budget & GPU Guardrails

Target hardware is an **Intel Core i5-1334U with Intel Iris Xe Graphics** and mid-range mobile smartphones:

1. **Polygon Ceiling**:
   - Island terrain: < 12,000 polygons.
   - Buildings and props: < 25,000 polygons combined.
   - Character avatar: < 8,000 polygons (or crisp 2D billboard sprite fallback).
   - **Total scene budget: < 50,000 triangles**.
2. **Draw Call Optimization**:
   - Use `THREE.InstancedMesh` for repeated vegetation (palms, glowing crystals, streetlights).
   - Merge static zone geometries where appropriate.
   - Target draw calls: **< 65 draw calls per frame**.
3. **Frameloop Management**:
   - During modal inspection or static dialog, switch R3F `frameloop="demand"` to pause rendering and eliminate GPU idle drain.
   - Resume `frameloop="always"` only during active movement or camera transitions.
4. **Memory Cleanup Protocol**:
   - Geometries, materials, and textures must register explicit `.dispose()` calls within `useEffect` cleanup hooks.
