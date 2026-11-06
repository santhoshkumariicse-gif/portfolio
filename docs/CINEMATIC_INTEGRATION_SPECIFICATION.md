# PROMPT 14 — CINEMATIC INTEGRATION & JARVIS HUD SPECIFICATION

## 1. Architectural Integration
**SAN AI — THE DEVELOPER UNIVERSE** integrates the 3D WebGL island, anime character avatar, JARVIS-style holographic assistant, voice synthesis and recognition engine, and multi-mode navigation into a unified, cinematic interface.

---

## 2. JARVIS HUD Layout Standard

The viewport interface is organized into five specialized visual quadrants designed for immediate orientation and non-overlapping control:

### 1. TOP QUADRANT — Telemetry & Chapter Navigation
- **Left Badge**: Glowing cyan status beacon with `SAN AI // UNIVERSE` telemetry.
- **Center Pillar**: Dynamic 5-segment chapter progression tracker:
  - Chapter 01: ORIGIN COAST (Academic Roots & Karaikal Shore)
  - Chapter 02: SKILL FOREST (7 Technology Crystals & Arsenal)
  - Chapter 03: PROJECT CITY (Enterprise Software Missions)
  - Chapter 04: EXPERIENCE MOUNTAIN (Internships & Milestones)
  - Chapter 05: CONTACT BEACON (Direct Dispatch & Resume Finale)
  - Interactive clickable pills allow instant warp between chapters.
- **Mode Switcher**: Triple-toggle for camera states:
  - `[Orbit]`: 360-degree orbital damping camera.
  - `[Free Roam]`: Third-person player controls with WASD and virtual touch joystick.
  - `[Tour]`: 5-waypoint automated cinematic flythrough.
- **Right Controls**:
  - Global Audio Toggle: Instant mute/unmute controlling speech synthesis and Web Audio sound effects.
  - Classic Portfolio Toggle: Seamless transition back to the high-speed 2D HTML resume.

### 2. CENTER QUADRANT — 3D Explorable World
- Rendered via React Three Fiber and Three.js at full viewport resolution with hardware acceleration.
- Framerate target: 60 FPS on desktop and modern mobile GPUs.

### 3. BOTTOM QUADRANT — Proximity Prompts & Guided Timeline
- **During Free Roam**: Proximity detection highlights nearby monuments with an animated amber toast:
  `PRESS [E] OR TAP TO INSPECT: [ZONE/POI NAME]`
- **During Guided Tour**: Timeline playback console with Previous, Next, Play/Pause, and Exit Tour controls, showing current chapter title and synopsis.
- **During Orbit Mode**: Compact fast-travel quick-bar spanning the 5 narrative zones.

### 4. RIGHT QUADRANT — Floating SAN AI Assistant
- Holographic circular AI core (`AICore.tsx`) with animated SVG arcs, rotation frequencies keyed to assistant state, and interactive expansion trigger.
- Expandable conversation terminal (`AIConversationPanel.tsx`) with real-time speech-to-text, text-to-speech halt control, and verified knowledge retrieval.

### 5. LEFT QUADRANT — Radar Minimap
- Top-down vector radar map (`WorldMinimap.tsx`) displaying island terrain contours, player coordinate marker, and interactive clickable zone beacons.

---

## 3. Web Audio Synthesis Engine (`SoundFX.ts`)

To guarantee 100% offline reliability, zero external asset network requests, and eliminate audio file 404s:
- Audio is dynamically synthesized in client RAM using the browser native `AudioContext` and harmonic oscillators.
- **Tone Presets**:
  - `playClick()`: High-tech exponential frequency decay ($1400\text{Hz} \to 400\text{Hz}$, 40ms).
  - `playHover()`: High-frequency delicate cyber tick ($1800\text{Hz}$, 30ms).
  - `playWarp()`: Ascending frequency sweep ($220\text{Hz} \to 880\text{Hz}$, 250ms).
  - `playModeSwitch()`: Dual-harmonic musical chime ($C_5 \to E_5$, 180ms).
  - `playBeaconChime()`: Resonant bell harmonic ($880\text{Hz} \to 440\text{Hz}$, 400ms).
- **Autoplay Compliance**: Sound is initialized as muted by default, respecting browser policies, and is activated upon explicit user click.

---

## 4. Visual Post-Processing & Cinematic Touches
- **Vignette Overlay**: Subtle radial gradient darkening viewport perimeters for focused cinematic depth.
- **Holographic Transition Toast**: An animated modal banner that announces upcoming vector coordinates when warping across the island archipelago.
- **Atmospheric Fog**: Exponential height fog blending terrain geometry seamlessly into the oceanic horizon.
