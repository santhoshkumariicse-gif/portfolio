# SCENE SPECIFICATIONS & ENVIRONMENTAL ASSETS — SAN AI

**Project**: SAN AI — THE DEVELOPER UNIVERSE  
**Lead Environmental Artist**: Senior 3D World Designer & Creative Director  
**Engine**: Three.js / React Three Fiber / Drei  
**Performance Budget**: 60 FPS Locked on Intel Iris Xe / Mobile GPU  

---

## 1. Global World Lighting & Atmosphere

```typescript
export const WORLD_ATMOSPHERE = {
  fog: {
    color: '#0A0B09',
    near: 40,
    far: 240
  },
  sunLight: {
    color: '#FFF4E0',
    intensity: 1.1,
    position: [60, 80, 100] as [number, number, number]
  },
  ambientLight: {
    color: '#1A1E18',
    intensity: 0.65
  },
  hemisphereLight: {
    skyColor: '#1B241C',
    groundColor: '#0A0B09',
    intensity: 0.4
  }
};
```

---

## 2. Zone Lighting & Material Specifications

### **Prologue (Space Gateway)**
- **Coordinates**: `[0, 150, 0]`
- **Lighting**: Point light in center of glowing planet; 1,200 particle procedural starfield.
- **Key Assets**:
  - `SpaceStarfield`: Instanced points geometry.
  - `HoloPlanet`: Sphere geometry with animated fresnel shader ring (`#00E5FF`).
  - `PrologueCameraRig`: GSAP-driven descent spline.

### **Zone 01: Origin Coast**
- **Coordinates**: `[0, 0, 80]`
- **Lighting**: Directional sunrise light with warm amber rim (`#FFB347`), low angle (`Y: 15`).
- **Materials**:
  - Sand Terrain: `MeshStandardMaterial` (`color: #D2B58A`, `roughness: 0.9`).
  - Ocean Water: Stylized low-poly flat-shaded plane with sin/cos wave displacement shader.
  - Palm Trees: Instanced low-poly trunks (`#4A3728`) and stylized geometric fronds (`#2D5A27`).
- **Interactive Landmark**: Developer Study Desk with glowing terminal screen displaying Santhosh's verified Gnanamani College credentials and profile photo.

### **Zone 02: Skill Forest**
- **Coordinates**: `[-70, 5, 20]`
- **Lighting**: Cool teal ambient (`#082026`) with localized point lights from floating crystals.
- **Materials**:
  - Forest Floor: Deep moss green (`#122014`, `roughness: 0.95`).
  - Floating Crystals: Polyhedron geometry with emissive cyan (`#00E5FF`, `emissiveIntensity: 1.8`) and gentle hovering animation (`Math.sin(clock.elapsedTime)`).
  - Fireflies: Lightweight instanced point sprites with soft oscillating opacity.
- **Interactive Landmark**: 7 Technology Monoliths with proximity trigger rings.

### **Zone 03: Project City**
- **Coordinates**: `[60, 8, -30]`
- **Lighting**: High-contrast dark cyberpunk night with intense neon crimson (`#FF3358`) and cyber lime (`#C7FF45`) edge illumination.
- **Materials**:
  - Building Facades: Matte obsidian blocks (`#101210`, `roughness: 0.3`, `metalness: 0.8`).
  - Neon Trim: Emissive lines and floating holographic billboards.
- **Interactive Buildings**:
  - *LorryBook / RDA Tower*: Logistics distribution hub with dynamic route telemetry beacon.
  - *NexusATS Center*: Candidate parsing gateway with glowing stage gates.
  - *Recall AI Archive*: Cognitive data cube with pulsing retrieval matrices.

### **Zone 04: Experience Mountain**
- **Coordinates**: `[-40, 25, -90]`
- **Lighting**: Cool high-altitude directional light with volumetric fog passes.
- **Materials**:
  - Mountain Rock: Flat-shaded faceted rock surfaces (`#20241E`, `roughness: 0.85`).
  - Rope Bridges: Timber planks and suspension cables.
- **Interactive Checkpoints**: 5 Flagged mountain shelters with milestone plaques detailing Cybernaut, ELITA, and academic achievements.

### **Zone 05: Contact Beacon**
- **Coordinates**: `[10, 35, -140]`
- **Lighting**: High-intensity vertical beacon spotlight (`#C7FF45`, `angle: 0.15`, `penumbra: 0.8`) firing into the sky.
- **Materials**:
  - Lighthouse Tower: Cylindrical architectural structure with rotating glass fresnel lens.
  - Hologram Platform: Glowing circular floor grid with interactive contact terminals.

---

## 3. Instancing & Draw Call Architecture

To guarantee 60 FPS on integrated Intel Iris Xe Graphics:
1. **Palm Trees (Origin Coast)**: Single `InstancedMesh` (count: 36, 1 draw call).
2. **Glowing Crystals (Skill Forest)**: Single `InstancedMesh` (count: 24, 1 draw call).
3. **Cyber City Streetlights & Reticles**: Single `InstancedMesh` (count: 48, 1 draw call).
4. **Firefly Particles**: Single `Points` object (count: 150, 1 draw call).
- **Total Draw Calls for Entire World**: Estimated **38 to 52 draw calls**, well below the 65-call ceiling.

