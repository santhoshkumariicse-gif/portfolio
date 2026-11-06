# IMPLEMENTATION ROADMAP: THE ROAD OF SANTHOSH × SAN AI
**Sequential 6-Stage Roadmap**

---

## Stage A: Foundation, 3D Highway Engine & Authoritative HUD (CURRENT TASK)
- [x] Existing project audit (`docs/EXISTING_PROJECT_AUDIT.md`).
- [x] Proposed technical architecture (`docs/NEW_ARCHITECTURE.md`).
- [x] Content inventory mapping (`docs/CONTENT_INVENTORY.md`).
- [x] CatmullRomCurve3 road spline geometry spanning KM 0 to KM 7 ($2,200\text{ world units}$).
- [x] Authoritative highway state machine (`HighwayStateContext.tsx`).
- [x] Smooth keyboard controls (W/S accelerate/brake, A/D lane steer, Arrow keys), mouse wheel scroll, and touch drag.
- [x] Camera follow rig maintaining smooth banking and forward lookAhead along road tangents.
- [x] Futuristic JARVIS-inspired HUD:
  - Top Left: SAN AI identity and status pulse.
  - Top Right: KM counter (`KM 0.00 / 7.00`), active chapter title, and mode badge (`MANUAL` / `AUTOPILOT`).
  - Bottom: Speedometer (`KM/H`), interactive 8-checkpoint roadmap scrub bar, mute toggle, and 2D view switcher.
- [x] Highway atmosphere: Deep black void, asphalt road with lane markings, guardrails with red retroreflectors, instanced streetlamps, horizon fog.
- [x] Clean compilation (`npx tsc --noEmit`) and production build verification.

---

## Stage B: KM 0 Welcome Gantry, KM 1 About & KM 2 Education Billboards
- 3D overhead highway portal at KM 0.
- Realistic double-sided roadside billboard at KM 1 with Karaikal coastal origin and philosophy.
- Arching highway bridge structure at KM 2 displaying Gnanamani College of Technology, B.E. CSE, 7.2 GPA, and core coursework.
- Proximity detection triggering detailed modal view for KM 1 and KM 2.

---

## Stage C: KM 3 Skills Junction & KM 4 Project Highway
- Multi-lane directional route signs for 7 skill categories at KM 3.
- Monumental 3D physical billboards at KM 4 for LorryBook/RDA, NexusATS, Recall AI, and Cybersecurity Automation.
- Interactive architectural schematics and GitHub repository links.

---

## Stage D: KM 5 Experience Toll Gate, KM 6 Rest Stop & KM 7 Destination
- 3-lane physical toll plaza at KM 5 for Cybernaut Technologies, ELITA, and CTF competitions.
- Roadside service plaza at KM 6 linking to Systems Lab and technical docs.
- Illuminated transit destination terminal at KM 7 with contact transmission form, ATS resume download, and social links.

---

## Stage E: Full Voice AI, Stylized Avatar, Lighting Transitions & Vehicle FX
- Web Speech API voice synthesis and speech-to-text recognition integrated into highway autopilot.
- Stylized 3D personal avatar representing Santhosh.
- Dynamic vehicle headlights casting illumination along the road.
- Smooth transitions between night, sunset, and cyber dawn.

---

## Stage F: Performance Optimization, Mobile Polish, Final QA & Deployment
- Adaptive rendering quality based on hardware framerates.
- Instanced geometry optimizations for guardrails, markers, and lamps.
- 7-viewport responsive testing (360px to 1920px).
- Production build validation and deployment to GitHub Pages & Vercel.
