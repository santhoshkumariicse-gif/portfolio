# SCENE SPECIFICATION: ZONE 02 — SKILL FOREST (ACT 02)

**Project**: SAN AI — THE DEVELOPER UNIVERSE  
**Zone Key**: `skill-forest`  
**Spatial Coordinates**: `[-65, 5, 20]`  
**Theme**: Bioluminescent Ancient Woodland, Levitating Tech Monoliths, 7 Crystal Clusters  
**Lead Creative Technologist**: Principal Software Architect & 3D World Designer  

---

## 1. Narrative Lore & Spatial Design

Zone 02 — Skill Forest represents the technical arsenal of Santhosh Kumar M. Situated in the deep moss-carpeted valley between the coastal sands and the northern mountain peaks, the forest is an ethereal cyber-natural sanctuary where technology manifests as bioluminescent geometry.

Rather than presenting skills as static resume bullet points or fabricated percentage bars, the Skill Forest organizes Santhosh's capabilities into **7 distinct crystallised domains** arranged in a radial ring around an ancient cybernetic obelisk.

---

## 2. 3D Environmental Composition & Assets

```
                    [06: Dev Tools (Amethyst)]     [07: AI & Security (Crimson)]
                               \                         /
    [05: Databases (Cobalt)] ---- [CENTRAL OBELISK] ---- [01: Languages (Amber)]
                               /       [-65, 5, 20]      \
    [04: Mobile (Emerald)] --------- [03: Backend (Lime)] ---- [02: Frontend (Cyan)]
```

### 2.1 Bioluminescent Ancient Trees
- **Asset**: `BioTree` component.
- **Trunk**: Dark timber cylinder geometry with organic taper and moss tones (`#141E15`).
- **Canopy**: Layered faceted dodecahedra with emissive inner lighting (`#0D2E20` to `#123B2A`).
- **Floating Spores**: Emissive spheres acting as fungal bioluminescent lanterns scattered across branches.
- **Distribution**: 8 trees encircling the sanctuary clearing to frame the interactive arena.

### 2.2 Central Arsenal Monolith
- **Coordinates**: `[-65, 5, 20]`
- **Structure**:
  - Stepped cylindrical plinth (`#131B14` and `#19241B`).
  - Obsidian obelisk (`[1.8, 6.2, 1.8]`) with metallic reflection.
  - Four vertical emissive cyan energy channels (`#00E5FF`).
  - Faceted pyramidion crown with high emissive glow (`emissiveIntensity: 1.8`).
  - Rotating cyan halo energy ring (`ringRef.current.rotation.z = elapsed * 0.5`).
- **Interaction**: Clicking the central obelisk opens the complete 7-category master arsenal view.

### 2.3 The 7 Floating Technology Crystals
Each crystal is positioned on a radial circle with radius $R = 13.5$ meters around the center:

| Index | Domain | Color | Hex Code | Verified Technologies |
| :--- | :--- | :--- | :--- | :--- |
| **01** | Programming Languages | Amber | `#FFB347` | Python, Java, JavaScript, TypeScript, C/C++ |
| **02** | Frontend Development | Cyan | `#00E5FF` | React, HTML5, CSS3, Tailwind CSS, Vite, UI/UX |
| **03** | Backend Development | Lime | `#C7FF45` | Node.js, Express, FastAPI, Flask, REST APIs |
| **04** | Mobile Applications | Emerald | `#2ECC71` | Android Development, Java/Kotlin, XML Layouts |
| **05** | Databases & Modeling | Cobalt | `#3498DB` | PostgreSQL, MySQL, SQLite, MongoDB, Schemas |
| **06** | DevOps & Tools | Amethyst | `#9B59B6` | Git, GitHub, Linux / Bash CLI, VS Code, Postman |
| **07** | AI & Defensive Tech | Crimson | `#FF3358` | LLM APIs, Prompt Engineering, OWASP Security |

### 2.4 Crystal Animation & Shader Physics
- **Hover Oscillation**:
  `crystalRef.current.position.y = baseY + Math.sin(elapsed * 1.6 + index * 0.9) * 0.45;`
- **Dynamic Rotation**: Multi-axis angular velocity around Y and Z.
- **Ground Projection**: Concentric stone pedestal with glowing floor reticle ring.
- **Hover Reaction**: Pointer cursor change, emissive boost from 1.7 to 2.5, scale expansion by 25%, and floating targeting reticle.

---

## 3. Ethical Zero-Fabrication Standard

Every skill item presented in the Skill Forest meets strict ethical verification criteria:
1. **No Invented Percentages**: We deliberately reject misleading metric bars like "Python 95%" or "React 90%".
2. **Traceable Implementations**: Each proficiency is backed by verifiable artifacts:
   - Full-Stack React & FastAPI $\rightarrow$ LorryBook / RDA platform.
   - Python Automation & Log Parsing $\rightarrow$ Cybernaut Internship.
   - Candidate Parsing Pipelines $\rightarrow$ NexusATS system.
   - Core Computer Science $\rightarrow$ Gnanamani College of Technology coursework (GPA 7.2/10).

---

## 4. SAN AI Contextual Integration

Upon crossing the threshold into the Skill Forest, SAN AI automatically announces:
> *"Welcome to the Skill Forest. Here lie the 7 foundational technology crystals of Santhosh's developer arsenal — from Full-Stack React and Python automation to Android engineering and defensive security. Click any crystal to inspect verified proficiencies."*

Visitors can click any individual crystal or the central obelisk to open `SkillForestModal.tsx`, where they can:
- Switch tabs between all 7 technical clusters.
- Review verified technology badges and descriptions.
- Click "Audit" or "Ask SAN AI" to query Santhosh's specific experience with that tool.
- Fast-travel directly to **Zone 03 — Project City**.

