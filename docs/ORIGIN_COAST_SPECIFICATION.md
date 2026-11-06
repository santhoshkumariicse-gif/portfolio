# SCENE SPECIFICATION: ZONE 01 — ORIGIN COAST (ACT 01)

**Project**: SAN AI — THE DEVELOPER UNIVERSE  
**Zone Key**: `origin-coast`  
**Spatial Coordinates**: `[0, 1.5, 75]`  
**Theme**: Nostalgic Karaikal Coastline, Sunrise Horizon, Academic Foundations & Developer Study  
**Lead Creative Technologist**: Principal Software Architect & 3D World Designer  

---

## 1. Narrative Lore & Spatial Design

Origin Coast serves as the inaugural grounded chapter of the open-world portfolio. After the orbital descent through the Space Prologue, the player arrives at the southern shoreline of Aethelgard Island.

This region is directly inspired by Santhosh Kumar M's coastal origins in Karaikal, Puducherry, and his academic progression at Gnanamani College of Technology, Namakkal. It captures the quiet determination of late-night coding sessions, algorithmic curiosity, and the foundational software engineering coursework that shaped his career trajectory.

---

## 2. 3D Environmental Composition & Assets

```
[Ocean Waves: Z:94] <---> [Sandy Shoreline Rim: Z:85] <---> [Study Desk: (0, 1.2, 75)] <---> [Collegiate Monument: (-10, 1.2, 68)]
                                                                    |
                                                     [Flagstone Path -> Skill Forest (North)]
```

### 2.1 Low-Poly Dynamic Shoreline
- **Geometry**: Plane geometry (`args={[140, 18, 16, 4]}`) with flat shading.
- **Material**: Translucent ocean blue (`color: #38A3D8`, `emissive: #1E5C7D`, `opacity: 0.75`).
- **Animation**: Dynamic sinusoidal tide surge:
  `wavesRef.current.position.z = 94 + Math.sin(elapsed * 1.4) * 1.8;`
- **Foam Crest Edge**: White illuminated crest strip (`#EAF6FF`) marking the surf line.

### 2.2 Procedural Palm Grove
- **Asset**: `PalmTree` component.
- **Trunk**: 4 segmented cylinders stacked with natural curvature and bark tones (`#543D2B` to `#3E2B1E`).
- **Canopy**: 8 geometric leaf fronds (`#265C28` and `#2D6B2F`) branching radially with downward pitch.
- **Wind Physics**: Independent per-tree phase sway:
  `treeRef.current.rotation.z = Math.sin(time) * 0.025;`
- **Distribution**: 8 trees distributed along the coastline providing organic environmental framing.

### 2.3 Flagstone Pathway
- Stepped flagstone path (`#3B3E37`) leading from the southern beach northward towards Zone 02: Skill Forest.

---

## 3. Interactive Point of Interest (POI) 01: Developer Study Workspace

- **Coordinates**: `[0, 1.2, 75]`
- **Interactive Triggers**: 3D raycasting `onClick`, `onPointerOver`, and HUD action pill `[INSPECT DOSSIER]`.
- **Sub-Assets**:
  1. **Circular Base & Holographic Reticle**: Emissive amber ring (`#FFB347`) indicating interaction zone.
  2. **Minimalist Study Desk**: Dark composite wood surface (`#2A241E`) with 4 steel legs.
  3. **Ergonomic Developer Chair**: Detailed 5-star base, pneumatic cylinder, seat cushion, and mesh backrest.
  4. **Primary Ultrawide Monitor**:
     - Dark IDE screen with glowing color-coded syntax bars (`#00E5FF`, `#C7FF45`, `#FFB347`).
     - Real-time compiler readiness status.
  5. **Secondary Vertical Monitor (Authentic Portrait)**:
     - Three.js Texture mapping Santhosh's verified photograph: `public/images/santhosh-kumar.jpg`.
     - Holographic wireframe scanline border (`#FFB347`).
  6. **Mechanical Keyboard & Precision Mouse**: Backlit keybed with cyber mousepad.
  7. **Coffee Mug & Animated Steam**: Ceramic mug with floating particle steam oscillating upward.
  8. **Floating Schematic Hologram**: Wireframe octahedron hovering at `Y: 2.6`, spinning with amber light.

---

## 4. Interactive Point of Interest (POI) 02: Gnanamani Academic Monument

- **Coordinates**: `[-10, 1.2, 68]`
- **Interactive Triggers**: 3D raycasting `onClick`, `onPointerOver`.
- **Sub-Assets**:
  1. **Stepped Stone Plinth**: Multi-tiered foundation platform (`#1A1E18` to `#212620`).
  2. **Twin Academic Pillars**: Polished granite pillars (`#2E352C`) with architectural lintel archway.
  3. **Collegiate Plaque**:
     - Dark obsidian backing with gold wireframe overlay.
     - Displays:
       - `GNANAMANI COLLEGE OF TECHNOLOGY`
       - `B.E. COMPUTER SCIENCE & ENGINEERING`
       - `BATCH 2023 – 2027 · CURRENT GPA: 7.2 / 10`
  4. **Floating Collegiate Crest**: High-emissive amber crest hovering above the archway (`#FFB347`).
  5. **Interaction Ring**: Floating target reticle prompting visitor inspection.

---

## 5. Verified Academic & Identity Compliance

| Field | Verified Value | Compliance Note |
| :--- | :--- | :--- |
| **Full Name** | Santhosh Kumar M | Matches official identity |
| **Institution** | Gnanamani College of Technology, Namakkal | Verified accredited college |
| **Degree** | B.E. in Computer Science & Engineering | Verified engineering program |
| **Timeline** | 2023 – 2027 (Expected: May 2027) | Current undergraduate |
| **Cumulative GPA** | 7.2 / 10.0 | 100% verified real record; zero inflation |
| **Core Coursework** | DSA, OS, DBMS, Networks, OOP, Software Eng, Security | Matches Anna University / GCT curriculum |
| **Photograph** | `images/santhosh-kumar.jpg` | Authentic original photograph |

---

## 6. SAN AI Audio & Dialogue Briefing

When entering Origin Coast, SAN AI triggers an automated voice & text announcement:
> *"Welcome to Origin Coast. Here are Santhosh's academic foundations at Gnanamani College of Technology and his origin story from Karaikal. Click the study workspace or the collegiate monument to inspect his verified records."*

Clicking either POI opens `OriginCoastModal.tsx`, giving visitors the ability to:
- Read the origin story and engineering ethos.
- Inspect detailed coursework and GPA metrics.
- Ask SAN AI targeted questions about Santhosh's academic background.
- Fast travel to the next narrative zone: **Zone 02 — Skill Forest**.

