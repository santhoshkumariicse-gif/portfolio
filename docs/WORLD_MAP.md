# WORLD MAP & TOPOLOGY — SAN AI: THE DEVELOPER UNIVERSE

**Project**: SAN AI — THE DEVELOPER UNIVERSE  
**World Designer**: Senior 3D World Designer & Creative Director  
**Island Name**: Aethelgard Island (The Developer Universe)  
**Total Dimensions**: 300m × 300m World Units  
**Atmospheric Palette**: Obsidian Charcoal (`#0A0B09`), Cyber Lime (`#C7FF45`), Holographic Cyan (`#00E5FF`), Neon Crimson (`#FF3358`)  

---

## 1. Top-Down Minimap ASCII Blueprint

```
                      [NORTH // DEEP DIGITAL OCEAN]
                                    ▲
                                    │
                         ┌──────────────────────┐
                         │   ZONE 05: BEACON    │  Z: -140
                         │   (Lighthouse Peak)  │
                         └──────────┬───────────┘
                                    │ [Summit Bridge]
                         ┌──────────┴───────────┐
                         │ ZONE 04: EXP MOUNTAIN│  Z: -90
                         │   (Climbing Trails)  │
                         └─────┬──────────┬─────┘
           [West Forest Path] /            \ [East Highway Bridge]
        ┌────────────────────┴──┐        ┌──┴───────────────────┐
        │  ZONE 02: SKILL FOREST│        │ ZONE 03: PROJECT CITY│  Z: -30 to 20
        │  (Bioluminescent Glow)│        │ (Neon Cyber Towers)  │
        └────────────┬──────────┘        └──────────┬───────────┘
                      \                            /
                       \──[Coastal Highway Road]──/
                                    │
                         ┌──────────┴───────────┐
                         │ ZONE 01: ORIGIN COAST│  Z: 80
                         │ (Karaikal Sunrise)   │
                         └──────────────────────┘
                                    │
                                    ▼
                      [SOUTH // SUNRISE SHORELINE]
```

---

## 2. Connected World Geography & Transitions

The entire portfolio takes place on **one single, seamless open-world island** rather than disconnected web scenes:

### 1. Zone 01 — Origin Coast (South, Z ≈ +80)
- **Topography**: Low-elevation sandy beach, gentle shoreline waves, coastal road, coconut palm clusters.
- **Atmosphere**: Early morning sunrise with warm golden-amber lighting transitioning into deep charcoal terrain.
- **Narrative Anchor**: Santhosh's academic beginnings (Gnanamani College of Technology) and personal study desk workspace.

### 2. Transition: Coastal Highway & River Bridge (Z: +50 to +20)
- A smooth paved road extends northward from the coast. A stone/cyber bridge crosses an inlet connecting the coastline to the inland forest and city.

### 3. Zone 02 — Skill Forest (West, X ≈ -70, Z ≈ +20)
- **Topography**: Rolling mossy terrain, dark organic foliage, clearing with monolithic stone pillars.
- **Atmosphere**: Deep midnight mist illuminated by bioluminescent trees and floating cyan crystals (`#00E5FF`).
- **Narrative Anchor**: 7 Interactive technology crystal monuments representing verified engineering proficiencies.

### 4. Zone 03 — Project City (East, X ≈ +60, Z ≈ -30)
- **Topography**: Elevated tech plateau with paved cyber roadways, neon pedestrian plazas, and structural skyways.
- **Atmosphere**: High-contrast cyberpunk metropolis bathed in neon crimson (`#FF3358`) and lime (`#C7FF45`).
- **Narrative Anchor**: Individual architecturally distinct buildings housing LorryBook/RDA, NexusATS, Recall AI, and security tooling.

### 5. Zone 04 — Experience Mountain (North-West, X ≈ -40, Z ≈ -90)
- **Topography**: Steep craggy rock faces, switchback climbing paths, wooden rope bridges spanning chasms.
- **Atmosphere**: High-altitude drifting clouds, cool ambient mountain wind, dynamic volumetric light rays.
- **Narrative Anchor**: Milestone checkpoints tracking internships (Cybernaut, ELITA), academic milestones, and certifications.

### 6. Zone 05 — Contact Beacon (Far North, X ≈ +10, Z ≈ -140)
- **Topography**: Sheer oceanic cliff precipice protruding into the northern waters, topped with an architectural launch pad and modern holographic lighthouse.
- **Atmosphere**: Dramatic dusk/horizon starscape, pulsing vertical light beam projecting into the cosmos.
- **Narrative Anchor**: Direct recruiter and developer outreach terminal, verified email/phone, resume dispatch.

---

## 3. Scale, Measurement & Collision Boundaries

- **World Unit Equivalent**: 1 Three.js unit = 1 meter.
- **Player Avatar Height**: 1.8 units.
- **Island Diameter**: ~280 units east-west, ~300 units north-south.
- **Island Elevation Profile**:
  - Beach: Y = 0 to 2m.
  - Inland Forest: Y = 3 to 8m.
  - City Plateau: Y = 6 to 12m.
  - Mountain Summit: Y = 35m.
  - Lighthouse Lantern: Y = 48m.
- **Invisible Collision Bounds**: Ocean perimeter surrounded by subtle low-poly barrier reefs and invisible bounding volumes to keep players on the island terrain.

