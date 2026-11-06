# SCENE SPECIFICATION: ZONE 04 — EXPERIENCE MOUNTAIN (ACT 04)

**Project**: SAN AI — THE DEVELOPER UNIVERSE  
**Zone Key**: `exp-mountain`  
**Spatial Coordinates**: `[-35, 24, -85]`  
**Theme**: Mountain Trail Ascent, High-Altitude Checkpoints, Geodesic Summit Observatory  
**Lead Creative Technologist**: Principal Software Architect & 3D World Designer  

---

## 1. Narrative Lore & Spatial Design

Zone 04 — Experience Mountain symbolizes the steep, determined climb of professional and academic progression. Rising dramatically along the north-western ridge of Aethelgard Island, the mountain path is an ascending trail punctuated by observation shelters and outposts.

Each altitude checkpoint commemorates a verified phase of Santhosh Kumar M's developer career — from his first competitive CTF challenges and college cybersecurity club involvement to his professional developer internships at Cybernaut and ELITA, culminating at the high-altitude Summit Observatory showcasing verified industry credentials.

---

## 2. 3D Trail Composition & Checkpoints

```
                             [SUMMIT OBSERVATORY & SHRINE]
                                     (-35, 32, -85)
                                          /
               [CHECKPOINT 03: CTF CAMP]
                     (-42, 26, -92)
                           \
                            [CHECKPOINT 02: ELITA RIDGE]
                                  (-28, 22, -82)
                                        \
                                  [CHECKPOINT 01: CYBERNAUT OUTPOST]
                                            (-44, 18, -75)
```

### 2.1 Checkpoint 01: Cybernaut Python Outpost
- **Coordinates**: `[-44, 18, -75]` (Altitude: 18m)
- **Architecture**:
  - High-alpine timber shelter with foundation plinth and hip roof (`args={[3.2, 1.2, 4]}`).
  - Structural mast with an illuminated cyber lime banner (`#C7FF45`).
- **Verified Record**:
  - **Role**: Python Developer Intern
  - **Organization**: Cybernaut (Jul 2024 — Present)
  - **Deliverables**: Automated data parsing scripts, refactored backend logic, log analysis routines.

### 2.2 Checkpoint 02: ELITA Web & App Ridge Station
- **Coordinates**: `[-28, 22, -82]` (Altitude: 22m)
- **Architecture**:
  - Outpost circular deck with rocky retaining perimeter.
  - Signal mast flying a cyan banner (`#00E5FF`).
- **Verified Record**:
  - **Role**: Web & App Development Intern
  - **Organization**: ELITA (Jul — Aug 2025)
  - **Deliverables**: Accessible UI modules, client-side input sanitization, responsive cross-browser audits.

### 2.3 Checkpoint 03: Cybersecurity Club & CTF Defense Camp
- **Coordinates**: `[-42, 26, -92]` (Altitude: 26m)
- **Architecture**:
  - Faceted defensive stone watchtower (`#1A1814` to `#28241D`).
  - Amber banner (`#FFB347`) signifying threat modeling and capture-the-flag competitions.
- **Verified Record**:
  - **Role**: Active Member & CTF Competitor
  - **Organization**: Cybersecurity Club · Gnanamani College of Technology (Aug 2022 — May 2024)
  - **Deliverables**: Network packet capture analysis with Wireshark, decoding routines, team CTF tournaments.

### 2.4 Checkpoint 04: Summit Observatory & Credentials Shrine
- **Coordinates**: `[-35, 32, -85]` (Altitude: 32m)
- **Architecture**:
  - Geodesic dome canopy (`sphereGeometry args={[4.2, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]}`) in glowing cyber lime wireframe.
  - Rotating achievement halo rings (`#C7FF45`).
  - High-altitude zenith signal beacon (`Y: 36`) oscillating in the alpine air.
- **Verified Credentials**:
  1. *Python Software Developer Trainee* — Cybernaut Technologies (Jul 2024)
  2. *Web Application Security Practitioner (Labs)* — PortSwigger Web Security Academy (Dec 2023)
  3. *Introduction to Computer Networking & Protocols* — Gnanamani College of Technology (May 2024)

---

## 3. Interactive Modals & Provenance Guarantees

Clicking any trail shelter or the summit dome opens `ExperienceMountainModal.tsx`:
- **Dual Tab Interface**: Instant toggling between *Internships & Roles* and *Verified Certifications*.
- **Timeline Precision**: Exact verified dates (e.g. `JUL 2024 — PRESENT`, `JUL — AUG 2025`).
- **Zero Fabrication**: No exaggerated corporate titles or fabricated awards. Every entry is backed by college records and developer internship verification.

---

## 4. SAN AI Narration & Next Zone Travel

When visitors reach Experience Mountain, SAN AI announces:
> *"Welcome to Experience Mountain. As you ascend the mountain path, you will discover the checkpoints marking Santhosh's developer internships at Cybernaut and ELITA, his competitive CTF challenges, and his verified technical certifications. Click any checkpoint to inspect his track record."*

The modal features direct navigation to the world's crowning horizon checkpoint: **Zone 05 — Contact Beacon**.

