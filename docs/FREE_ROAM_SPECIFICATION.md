# PROMPT 12 — FREE ROAM & GUIDED CINEMATIC TOUR SPECIFICATION

## 1. Overview & Exploration Philosophy
**SAN AI — THE DEVELOPER UNIVERSE** features three distinct modes of world navigation:
1. **Orbit Mode (Default/Tactical)**: Orbital panoramic view using damping controls, allowing the visitor to rotate around Aethelgard Island and click on holographic POI beacons to inspect individual zones.
2. **Free Roam Mode (Player-Controlled)**: Direct third-person character control using WASD/Arrow keys, Shift to sprint, and an on-screen virtual analog joystick on mobile and touch devices. Includes collision bounding, dynamic height projection matching the 5 island terrain elevations, and interactive proximity prompts (`[PRESS E OR TAP TO INSPECT]`).
3. **Guided Cinematic Tour (Automated Spline)**: A hands-free, high-fidelity flythrough traversing the five core narrative zones along a smooth cubic spline with custom narration, automated waypoint durations, and playback controls (Prev, Next, Play/Pause, Exit).

---

## 2. Free Roam Architecture

### Input Handling
- **Keyboard**:
  - `W` / `ArrowUp`: Forward thrust along camera yaw.
  - `S` / `ArrowDown`: Backward thrust along camera yaw.
  - `A` / `ArrowLeft`: Strafe left perpendicular to forward vector.
  - `D` / `ArrowRight`: Strafe right perpendicular to forward vector.
  - `Shift` (Hold): Sprint multiplier ($1.9\times$ normal move speed).
  - `E` / Enter: Action key to inspect nearby POI within interaction threshold ($R \le 18$ units).
- **Mobile Touch / Virtual Joystick**:
  - `src/components/universe/VirtualJoystick.tsx` implements a touch-enabled dynamic thumbstick anchored on the lower left of the viewport.
  - Converts pointer touch deltas into normalized directional vectors $[-1, 1]$.
  - Touch action button (`[E]`) triggers modal inspection when near an interactive zone.

### Movement Physics & Terrain Elevation
Located in `src/components/universe/FreeRoamController.tsx`:
- Base movement speed: $26.0\text{ units/s}$, Sprint speed: $50.0\text{ units/s}$.
- Damping / Inertia: Velocity smoothly decays with delta dampening (`Math.exp(-8 * delta)`).
- Island Perimeter Clamping: Restricts avatar positions to $X \in [-135, 135]$, $Z \in [-155, 125]$ to prevent falling off the archipelago.
- Dynamic Height Clamping (`getTerrainHeight(x, z)`):
  - **Zone 01 (Origin Coast)**: $Z > 50 \implies Y = 1.5$ (Beach shelf)
  - **Zone 02 (Skill Forest)**: $Z \in [-10, 50] \implies Y = 5.0$ (Highlands plateau)
  - **Zone 03 (Project City)**: $Z \in [-60, -10]$ & $X > 25 \implies Y = 8.0$ (Cyber concrete foundation)
  - **Zone 04 (Experience Mountain)**: $Z \in [-110, -60]$ & $X < 0 \implies Y = 24.0$ (Summit ridge)
  - **Zone 05 (Contact Beacon)**: $Z \le -110 \implies Y = 36.0$ (Oceanic lighthouse cliff)
  - Natural interpolation slopes smoothly between elevation steps.

### Third-Person Camera Follower
- The camera follows behind the player avatar:
  - Target offset: `(player.x - sin(rot)*18, player.y + 9, player.z - cos(rot)*18)`
  - Smooth lerp factor: `alpha = 1 - exp(-6.5 * delta)`
  - Camera looks directly at player head level (`player.y + 2.0`).

### POI Proximity Triggering
- Distance to each of the 5 canonical zones (`Origin Coast`, `Skill Forest`, `Project City`, `Experience Mountain`, `Contact Beacon`) is computed every frame.
- When distance drops below $18.0\text{ units}$, `UniverseStage` displays an amber HUD prompt:
  ```
  NEARBY: [ZONE NAME] • PRESS [E] OR TAP TO INSPECT
  ```
- Triggering `E` halts avatar movement and surfaces the zone's dedicated modal without losing player world position.

---

## 3. Guided Cinematic Tour Architecture

Located in `src/components/universe/GuidedTourController.tsx`:
- 5 Sequential Keyframe Waypoints:
  1. **Waypoint 1: Origin Coast**: Camera at `(0, 18, 95)` looking at `(0, 1.5, 75)` — Narrates origins, B.E. CSE at Gnanamani College of Technology, Karaikal roots.
  2. **Waypoint 2: Skill Forest**: Camera at `(-45, 26, 45)` looking at `(-40, 6, 20)` — Narrates 7 technology crystal branches (Frontend, Backend, AI, Cloud, etc.).
  3. **Waypoint 3: Project City**: Camera at `(65, 30, -15)` looking at `(45, 10, -35)` — Narrates enterprise software architectures (LorryBook, NexusATS, Recall AI, Cybernaut Defense).
  4. **Waypoint 4: Experience Mountain**: Camera at `(-65, 42, -65)` looking at `(-50, 26, -85)` — Narrates Cybernaut Technologies & ELITA Technology internships, certifications, and CTF challenges.
  5. **Waypoint 5: Contact Beacon**: Camera at `(0, 52, -90)` looking at `(0, 36, -135)` — Highlights the oceanic beacon, resume transmission, and direct contact avenues.
- Waypoint Dwell Duration: 8.5 seconds per zone with smooth ease-in-out camera transitions.
- Tour HUD Controls:
  - Timeline progress bar showing active step $[1/5]$ to $[5/5]$.
  - `[< Previous]` and `[Next >]` buttons for instant waypoint hopping.
  - `[Pause / Resume]` to freeze camera at current panoramic vantage point.
  - `[Exit Tour]` to seamlessly revert back to Orbit or Free Roam mode.

---

## 4. Mode Synchronization & State Management
- `UniverseStage.tsx` coordinates `mode: 'orbit' | 'free-roam' | 'guided-tour'`.
- Entering Free Roam initializes player coordinates at Origin Coast (`[0, 1.5, 75]`).
- Exiting Free Roam restores OrbitControls with smooth target damping.
- Tour transitions update the active zone in `useSanAI()` so SAN AI vocalizes zone greetings at each destination.
