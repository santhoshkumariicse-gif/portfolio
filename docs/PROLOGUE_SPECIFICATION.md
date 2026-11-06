# PROLOGUE SPECIFICATION: SPACE-TO-PLANET OPENING — SAN AI

**Project**: SAN AI — THE DEVELOPER UNIVERSE  
**Scene**: Space Prologue (Deep Space Ingress)  
**Components**: `src/components/universe/PrologueScene.tsx`, `src/components/universe/PrologueOverlay.tsx`  
**Coordinates**: `[0, 100, 0]`  
**Initial Camera**: `[0, 160, 200]` ➔ Ingress Descent: `[0, 25, 115]`  

---

## 1. Cinematic Narrative Arc

The Prologue serves as the atmospheric gateway into Santhosh Kumar M's universe, executing in 7 choreographed beats:

1. **Dark Space**: Obsidian void background (`#060705`) representing infinite possibility.
2. **Stars Awaken**: 2,500 procedural stars twinkle into visibility across a spherical 280-meter field.
3. **Camera Traversal**: Camera slowly drifts downward and inward through the cosmos.
4. **The Digital Earth / Cyber Planet**: Glowing digital planet appears, ringed with cyan continental wireframes (`#00E5FF`) and orbital lime telemetry rings (`#C7FF45`).
5. **SAN AI Telemetry Lock**: Orbital ingress coordinates are established (`LAT: 10.9254° N`, `LONG: 79.8380° E`).
6. **Title Sequence Unrolling**:
   - Primary: **SANTHOSH KUMAR M**
   - Subtitle: **ASPIRING SOFTWARE DEVELOPER**
   - Tagline: *"Exploring ideas. Engineering possibilities."*
7. **Interactive Ingress Options**:
   - **Begin Journey**: Initiates immediate camera descent into Act 1: Origin Coast.
   - **Guided Tour**: Starts the automated scenic flythrough of all 5 island zones.
   - **Free Roam**: Unlocks manual WASD / touch orbit navigation.
   - **Simple Portfolio**: Instantly transitions to the traditional 2D HTML/React portfolio.

---

## 2. Technical & Performance Standards

- **No Forced Waiting**: Visitors can click "Skip Intro" or any action button immediately.
- **Zero Audio Autoplay**: Sound effects and voice synthesis remain muted until visitor explicitly enables audio.
- **Framer Motion + Three.js**: Synchronized React Three Fiber procedural rendering with GPU-accelerated CSS letterbox overlays.
- **Performance Budget**: Entire space prologue renders in **under 4ms per frame** on Intel Iris Xe graphics.

