# TECHNICAL ARCHITECTURE: THE ROAD OF SANTHOSH × SAN AI
**Cinematic 3D Highway Portfolio with JARVIS-Inspired AI Interface**

---

## 1. System Vision
**THE ROAD OF SANTHOSH** reimagines the developer portfolio as an endless futuristic highway spanning **KM 0 to KM 7**. The user drives or cruises on autopilot along an asphalt highway illuminated by crimson and amber holographic guide markers, passing 3D milestone structures and billboards that present verified software engineering achievements.

---

## 2. Highway Milestone Blueprint (KM 0 — KM 7)

```
[KM 0.0] === START POINT: Holographic Neon Welcome Gantry & Identity Brief
   │
[KM 1.0] === ABOUT ME: Karaikal Coastal Origin, Philosophy & Personal Dossier
   │
[KM 2.0] === EDUCATION: Gnanamani College of Technology, B.E. CSE, 7.2 GPA
   │
[KM 3.0] === SKILLS JUNCTION: 7 Radial Overhead Gantries (Full-Stack, AI, Mobile)
   │
[KM 4.0] === PROJECT HIGHWAY: 3D Billboards for LorryBook, NexusATS, Recall AI
   │
[KM 5.0] === EXPERIENCE TOLL GATE: Cybernaut & ELITA Internship Checkpoints
   │
[KM 6.0] === REST STOP: Systems Lab, Terminal Simulator & Technical Articles
   │
[KM 7.0] === DESTINATION: Contact Terminal, ATS Resume Transmission & Dispatch
```

---

## 3. Mathematical & 3D Road Architecture

### Spline Geometry (`THREE.CatmullRomCurve3`):
- Defined across 8 key spatial knots in world coordinates $(X, Y, Z)$:
  - $P_0$ (KM 0): `(0, 0, 0)`
  - $P_1$ (KM 1): `(0, 0, -200)`
  - $P_2$ (KM 2): `(25, 2, -450)` (gentle curved incline)
  - $P_3$ (KM 3): `(40, 5, -750)` (Skills junction bridge)
  - $P_4$ (KM 4): `(10, 8, -1100)` (Project Highway straightaway)
  - $P_5$ (KM 5): `(-25, 5, -1450)` (Experience toll approach)
  - $P_6$ (KM 6): `(-10, 2, -1800)` (Rest stop observation plateau)
  - $P_7$ (KM 7): `(0, 0, -2200)` (Destination beacon terminal)
- Curve Type: Centripetal Catmull-Rom with tension $0.25$ for gentle banking.
- Total Road Length: $2,200\text{ world units}$ ($\approx 314.3\text{ units per KM}$).

### Road Extrusion & Mesh:
- Road width: $14.0\text{ units}$ (3 lanes: left shoulder, center cruising lane, right passing lane).
- Surface Material: Deep charcoal asphalt (`#0C0D0B`) with subtle roughness and metallic sheen.
- Road Markings:
  - White solid edge lines (`#E2E8F0`).
  - Dashed amber center dividing dashes (`#FFB347`).
  - Guardrail barriers with retroreflective crimson studs (`#FF3366`).
  - Instanced highway light poles every 40 units casting directional cones.

---

## 4. Single Authoritative Navigation State Machine

Located in `src/components/highway/HighwayStateContext.tsx`:
```typescript
interface HighwayNavigationState {
  progress: number;       // 0.0 to 1.0 along CatmullRom curve
  currentKM: number;      // progress * 7.0 (0.00 km to 7.00 km)
  speed: number;          // Current virtual velocity in km/h (0 to 140 km/h)
  targetKM: number | null;// When navigating to a specific milestone
  mode: 'manual' | 'autopilot';
  isMuted: boolean;
  activeBillboardId: string | null;
}
```

### Input Fusion (Zero Stutter):
- **Mouse Wheel**: Adds delta to target velocity.
- **Keyboard (W / Up)**: Accelerates forward ($a = +35\text{ km/h/s}$).
- **Keyboard (S / Down)**: Brakes / reverses ($a = -45\text{ km/h/s}$).
- **Keyboard (A / D / Left / Right)**: Subtle lane steering offset ($\pm 3.5\text{ units}$).
- **Touch Swipe (Mobile)**: Vertical drag controls speed and forward progression.
- **SAN AI / Roadmap Click**: Sets `targetKM`; autopilot smooth-damps progress to target with cubic ease-in-out curve.

---

## 5. Camera Follow Rig
- The camera follows behind the virtual vehicle / traveler position:
  - $\vec{P}_{\text{cam}} = \vec{P}(t) - \vec{T}(t) \cdot 18.0 + \vec{U}(t) \cdot 5.5$
  - Where $\vec{T}(t)$ is the road tangent vector and $\vec{U}(t)$ is the up normal vector.
  - Camera `lookAt` focuses $25\text{ units}$ ahead along the tangent: $\vec{P}(t) + \vec{T}(t) \cdot 25.0$.
  - Damping: Smooth exponential lerp eliminates jitter.

---

## 6. HUD Specification (JARVIS Design)
- **Top Left**: SAN AI status widget (IDLE, CRUISE, AUTOPILOT, NAVIGATING) with animated concentric SVG rings.
- **Top Right**: KM Marker (`KM 0.00 / 7.00`), active chapter title, and mode badge (`[MANUAL]` / `[AUTOPILOT]`).
- **Bottom Center**:
  - Speedometer readout (`000 KM/H`).
  - Interactive roadmap milestone scrub bar (KM 0 to KM 7 clickable checkpoints).
  - Audio mute toggle and Classic 2D view switcher.

