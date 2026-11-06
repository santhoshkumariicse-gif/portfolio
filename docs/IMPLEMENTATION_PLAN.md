# THE ROAD OF SANTHOSH — COMPLETE IMPLEMENTATION PLAN

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Santhosh Kumar M's existing developer portfolio into an immersive, cinematic 3D highway experience with 8 interactive milestone billboards (KM 0 to KM 7), a JARVIS-inspired holographic AI assistant (SAN AI), and responsive recruiter presentation tools.

**Architecture:** A high-performance Three.js / React Three Fiber spline-driven 3D highway where the camera travels along a 2200-unit continuous trajectory. 8 spatial milestone billboard structures display authentic developer achievements and project architectures using the user's supplied 14 visual assets, governed by an authoritative `HighwayStateContext` that coordinates speed, steer, and autopilot. A procedural Web Audio engine and JARVIS-inspired vector SVG HUD overlay provide sound feedback and telemetry without bogging down mobile devices.

**Tech Stack:** React 18, TypeScript 5.5, Vite 5.4, Three.js 0.174, @react-three/fiber 8.18, @react-three/drei 9.122, @react-three/postprocessing 2.16, GSAP / Framer Motion, Tailwind CSS, Web Audio API, Web Speech API.

**Spec:** `docs/DESIGN_SYSTEM.md`, `docs/IMAGE_USAGE_MAP.md`, `docs/ASSET_INVENTORY.md`, `docs/PROJECT_AUDIT.md`.

## Global Constraints
- **Zero Fabrication**: Verified academic GPA 7.2/10 at Gnanamani College of Technology, B.E. CSE, Cybernaut & ELITA internships must be strictly maintained.
- **Image Segregation**: Santhosh's genuine portrait (`santhosh-profile-formal.jpg`) must only be used for authentic profile, about, and resume sections; anime illustrations are strictly creative artwork.
- **Zero Heavy Audio Files**: Synthesize sound effects procedurally via Web Audio API oscillators; never load multi-megabyte sound files.
- **Strict 60 FPS Target**: WebGL draw calls must stay below 50, vertices below 150,000, and geometry must be instanced or shared.
- **Dual-Mode Preservation**: The high-speed 2D HTML/CSS portfolio must remain instantly accessible via mode switcher for recruiters preferring traditional reading.

## Review Focus
1. **Camera Spline Jerk / Discontinuity**: Ensure camera interpolation between manual driving and milestone autopilot transitions smoothly without sudden angle flips.
2. **Mobile Touch Sensitivity**: Ensure virtual joystick and vertical swipe gestures on iOS/Android do not trigger native browser scroll pull-to-refresh.
3. **WebGL Texture Memory**: Verify that loading 14 image textures does not exceed 100MB VRAM or cause context loss on mobile Safari.
4. **Speech Recognition Fallback**: Ensure lack of microphone permission or browser support gracefully falls back to text-based quick command pills.
5. **Screen Reader Accessibility**: Ensure all milestone data and billboard cards have accessible DOM mirrors and ARIA tags so screen readers can consume all content.

---

## Task Decomposition

### Stage 1: Asset Integration & Image Usage Engine (Completed & Verified)
- [x] Extract user-supplied archive (`11.zip`) into `extracted_assets/11/`.
- [x] Visually inspect and audit dimensions, formats, and quality of all 14 image assets.
- [x] Organize files into structured `public/assets/{profile,illustrations,ai-interface,cybersecurity,projects,backgrounds}/`.
- [x] Create comprehensive forensic documentation (`PROJECT_AUDIT.md`, `ASSET_INVENTORY.md`, `IMAGE_USAGE_MAP.md`, `DESIGN_SYSTEM.md`).
- [x] Verify image loading and paths in local Vite dev server.

---

### Stage 2: 3D Highway Environment & Camera Spline Engine
**Files:**
- Modify: `src/components/highway/HighwaySpline.ts`
- Modify: `src/components/highway/HighwayRoadMesh.tsx`
- Modify: `src/components/highway/HighwayCameraController.tsx`
- Modify: `src/components/highway/HighwayStage.tsx`
- Modify: `src/components/highway/HighwayStateContext.tsx`

**Steps:**
- [ ] Refine the 2200-unit 3D Catmull-Rom spline curve with subtle banking curves, elevation shifts (+/- 15 units Y), and horizon drop.
- [ ] Enhance road mesh with 4-lane markings, continuous crimson laser edge rails (`#FF1E40`), and dashed amber divider striping (`#FFB347`).
- [ ] Add overhead truss gantries and sodium amber / red streetlight posts every 40 units along the highway shoulder with point light falloff.
- [ ] Implement dual camera perspectives: First-Person Cockpit View (driver POV) and Third-Person Chase Cam (cinematic follow).
- [ ] Implement smooth velocity-based camera shake and forward FOV widening (from 60° to 75° during acceleration).
- [ ] Verify 60 FPS baseline on local host with zero dropped frames.

---

### Stage 3: 8 Milestone 3D Billboards & Spatial Anchors
**Files:**
- Create: `src/components/highway/HighwayBillboardMesh.tsx`
- Create: `src/components/highway/HighwayMilestones.ts`
- Modify: `src/components/highway/HighwayStage.tsx`

**Steps:**
- [ ] Define the 8 milestone anchor coordinates along the spline curve:
  - KM 0 (0.00): Welcome Gate (4K Workstation Banner + Welcome HUD)
  - KM 1 (0.14): About Santhosh (Authentic Formal Suit Portrait + Engineering Bio)
  - KM 2 (0.28): Education (Gnanamani College of Technology, B.E. CSE 7.2 CGPA)
  - KM 3 (0.42): Skills Junction (Curved Workstation + 14 Vector Technology SVGs)
  - KM 4 (0.57): Project Highway (Recall AI Neural Brain + Systems Lab Optical Bus)
  - KM 5 (0.71): Experience Toll Gate (Cybernaut SOC Security + ELITA Automation)
  - KM 6 (0.85): Rest Stop (Sunset Lo-Fi Companion + Purple Study Night Sanctuary)
  - KM 7 (1.00): Destination: Hire Me (Holographic Lab + Resume Download + Contact Terminal)
- [ ] Build 3D metallic truss frames with glowing neon neon brackets holding physical billboard textured planes.
- [ ] Add proximity detection: as camera approaches within 60 units, billboard elevates, glows, and activates its holographic HUD title.
- [ ] Implement billboard click handler to trigger detailed interactive modal drawers.

---

### Stage 4: SAN AI Holographic Copilot & Audio HUD
**Files:**
- Modify: `src/components/san-ai/SanAICore.tsx`
- Modify: `src/components/highway/HighwayHUD.tsx`
- Modify: `src/hooks/useSanAI.ts`
- Modify: `src/utils/SoundFX.ts`

**Steps:**
- [ ] Build concentric SVG rotating rings with tactical targeting reticles inspired by Iron Man HUD references.
- [ ] Integrate Web Audio API procedural synthesizer for engine pitch modulation, milestone pass chimes, and HUD beeps.
- [ ] Implement voice command processor using Web Speech API:
  - Voice commands: *"Drive to About"*, *"Go to Projects"*, *"Show Skills"*, *"Hire Santhosh"*, *"Toggle Autopilot"*, *"Mute Sound"*.
- [ ] Add real-time SAN AI audio waveform visualizer that reacts dynamically to synthetic speech phonemes.
- [ ] Add speech synthesis narration for each milestone arrival (*"Welcome to KM 1, Mr. Santhosh's Engineering Profile"*).

---

### Stage 5: Recruiter Highway HUD & Interactive Modals
**Files:**
- Create: `src/components/highway/HighwayModalDrawer.tsx`
- Modify: `src/components/highway/HighwayHUD.tsx`
- Modify: `src/components/modals/ProjectDetailModal.tsx`
- Modify: `src/components/modals/CareerResumeCenter.tsx`

**Steps:**
- [ ] Design high-contrast cockpit dashboard with digital speedometer (0-180 km/h), KM counter, and coordinate telemetry.
- [ ] Build interactive 8-node roadmap scrubber bar allowing 1-click teleportation to any milestone.
- [ ] Implement responsive modal drawers that slide into view when clicking billboards or pressing `[ENTER]`:
  - Deep-dive project architectures with live demo links and GitHub repos.
  - Interactive PDF resume viewer with instant download.
  - Copy-to-clipboard email and quick LinkedIn connect buttons.
- [ ] Provide quick toggle button in HUD to switch immediately to 2D Classical HTML resume view.

---

### Stage 6: Mobile Touch Controls & Performance Optimization
**Files:**
- Create: `src/components/highway/HighwayMobileControls.tsx`
- Modify: `src/components/highway/HighwayInputController.tsx`
- Modify: `src/components/highway/HighwayStage.tsx`

**Steps:**
- [ ] Build on-screen virtual joystick / accelerator pedal for mobile touchscreen devices.
- [ ] Support vertical swipe to accelerate/brake and horizontal drag to steer lanes.
- [ ] Implement dynamic pixel ratio scaling (`dpr={[1, 1.5]}` on mobile, `dpr={[1, 2]}` on desktop).
- [ ] Add frustum culling and distance-based LOD (Level of Detail) to cull billboards and gantries beyond 150 units.
- [ ] Test touch interaction across simulated mobile viewports (iPhone 14, Pixel 7, iPad Pro).

---

### Stage 7: Production Build, Testing, Verification & Final Deployment
**Files:**
- Run: `npx tsc --noEmit`
- Run: `npm run build`
- Modify: `index.html` (SEO, Open Graph, meta titles)

**Steps:**
- [ ] Run full TypeScript compilation to guarantee zero type errors.
- [ ] Execute production Vite build and verify output bundle size and asset hashing.
- [ ] Verify all 14 images load properly in production `dist/` directory.
- [ ] Test cross-browser compatibility (Chrome, Edge, Firefox, Safari).
- [ ] Commit all deliverables and push to `origin/main`.
- [ ] Present completed audit, asset map, and roadmap to the user for formal approval before Stage 2 execution.
