# MASTER ARCHITECTURE: 3D UNIVERSE HOMEPAGE → VIEW JOURNEY → HIGHWAY PORTFOLIO
**Project**: THE ROAD OF SANTHOSH — Powered by SAN AI  
**Specification Version**: 3.0.0  
**Date**: November 2026 | **Architect**: Principal 3D Web Architect & UI/UX Director  

---

## 1. Core User Flow & Screen Sequence

The website strictly follows a linear, cinematic narrative progression where the explorable 3D Universe acts as the grand entrance, launching into the 3D Highway via the central "VIEW JOURNEY" dispatch:

```
┌────────────────────────────────────────────────────────┐
│               SCREEN 1: 3D UNIVERSE HOMEPAGE           │
│  - Deep space environment with central cinematic planet │
│  - Stars, crimson holographic particles & SAN AI core  │
│  - Santhosh Kumar M | Full-Stack & AI Systems Engineer  │
│  - Prominent Primary Action: [ VIEW JOURNEY ]          │
│  - Secondary: [ Explore Portfolio (2D) ] | Sound Toggle│
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│           SCREEN 2: CINEMATIC WARP TRANSITION          │
│  - SAN AI voice transmission: "Engaging Speedway Bus"  │
│  - Camera accelerates forward into hyperdrive warp     │
│  - Title reveal: "THE ROAD OF SANTHOSH"                │
│  - Sequential road luminaire activation into KM 0      │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│               SCREEN 3: THE 3D HIGHWAY PORTFOLIO       │
│                                                        │
│  [KM 0: Welcome Gate]                                  │
│  - Origin Portal & Speedway Ingress                    │
│                                                        │
│  [KM 1: Personal Photo Billboard (FIRST BILLBOARD)]    │
│  - Santhosh's authentic suit portrait (uncropped)      │
│  - B.E. CSE, Gnanamani College of Technology (7.2 GPA) │
│  - [ Explore About Me ] interaction                    │
│                                                        │
│  [KM 2: Academic Overpass (Education)]                 │
│  - Nirmala R.C. School + Gnanamani College timeline    │
│                                                        │
│  [KM 3: Skills Junction (Direction Signboards)]        │
│  - Multi-lane overhead highway gantry signboards       │
│  - Languages, Frontend, Backend, DBs, Android, AI      │
│                                                        │
│  [KM 4: Project Highway (Alternating Billboards)]      │
│  - Billboard 4A (Left): LorryBook / RDA Logistics      │
│  - Billboard 4B (Right): NexusATS Hiring Engine        │
│  - Billboard 4C (Left): Recall AI Autonomous RAG       │
│  - GitHub & Verified Live Demo links + Detail Panels   │
│                                                        │
│  [KM 5: Experience Toll Gate]                          │
│  - Cybernaut (Python Intern) & ELITA (Web/App Intern)  │
│                                                        │
│  [KM 6: Rest Stop Sanctuary]                           │
│  - Hobbies, lo-fi companion, continuous learning flow  │
│                                                        │
│  [KM 7: Destination City (Hire Me)]                    │
│  - Contact form, email dispatch, verified ATS resume   │
└────────────────────────────────────────────────────────┘
```

---

## 2. Strict Highway Preservation Contract

The existing 3D Highway implementation is officially locked:
1. **Road Pavement & Geometry**: The 2,200-unit Catmull-Rom spline, 4-lane striping, solid white emergency lines, amber dashed center striping, and crimson laser edge rails (`#FF1E40`) are preserved without regression.
2. **Navigation & Physics**: The authoritative `HighwayStateContext` (velocity calculation, rolling friction, lane steering, autopilot smoothing) remains the central physics arbiter.
3. **Cockpit HUD & Telemetry**: The speedometer, odometer (KM 0 to 7), 8-node roadmap scrubber, and camera view toggle (`CHASE` vs `COCKPIT`) remain fully functional.
4. **No Full Page Reloads**: Transitions between Universe and Highway occur completely in-memory using React state and Three.js camera interpolation.
