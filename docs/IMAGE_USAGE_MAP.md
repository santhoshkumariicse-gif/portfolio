# COMPREHENSIVE IMAGE USAGE & SECTION MAPPING
**Project**: THE ROAD OF SANTHOSH — Powered by SAN AI  
**Specification Version**: 1.0.0  
**Date**: November 2026 | **Architect**: Creative Director & Principal Frontend Architect  

---

## 1. Primary Mapping: The 8 Highway Milestones (KM 0 to KM 7)

Each milestone along the 2200-unit 3D highway curve features a physical 3D Billboard structure that activates visually and sonically when approached. Below is the deterministic image-to-milestone assignment:

```
[KM 0: Welcome Gate]   ──► Master 4K Workstation + Keynote Telemetry Sphere
[KM 1: About Santhosh] ──► Genuine Formal Suit Portrait (Santhosh Kumar M)
[KM 2: Education]      ──► Neon Looking Back (Study Grind at Gnanamani College)
[KM 3: Skills]         ──► Curved Workstation Reference + 14 Bespoke SVGs
[KM 4: Projects]       ──► AI Neural Brain Architecture + Optical Bus Photonic Chip
[KM 5: Experience]     ──► Cybersecurity SOC Command Wall (Cybernaut Internship)
[KM 6: Rest Stop]      ──► Sunset Lo-Fi Cat + Purple Study Night Sanctuary
[KM 7: Destination]    ──► Holographic Stark Lab + Formal Profile Badge (Hire Me)
```

---

## 2. Granular Milestone Specification Table

| Highway Location | Milestone Title | Primary Image Asset Path | Framing & CSS Classes | Visual Role & Content Context | Accessibility / Alt Text |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **KM 0 (Progress 0.00)** | **Welcome Gate** | `public/assets/illustrations/anime-coder-4k-workstation.jpg` | `object-cover w-full h-full rounded-xl border border-red-500/30 shadow-[0_0_30px_rgba(255,30,64,0.3)]` | High-impact 4K intro banner establishing the futuristic developer universe theme. | "Futuristic developer workstation with multi-monitor holographic displays and code IDE" |
| **KM 1 (Progress 0.14)** | **About Santhosh** | `public/assets/profile/santhosh-profile-formal.jpg` | `object-cover object-top w-full h-full rounded-2xl border-2 border-red-500/60 shadow-[0_0_40px_rgba(255,30,64,0.4)]` | **Authentic Formal Portrait** of Santhosh Kumar M. Confirms identity, B.E. CSE qualifications, and engineering philosophy. | "Formal portrait of Santhosh Kumar M in black suit, white shirt, and black necktie" |
| **KM 2 (Progress 0.28)** | **Education Milestone** | `public/assets/illustrations/anime-coder-neon-looking-back.jpg` | `object-cover w-full h-full rounded-xl border border-cyan-500/40 shadow-[0_0_25px_rgba(0,229,255,0.25)]` | Represents the academic grind, late-night labs, and foundational engineering at Gnanamani College of Technology (7.2 CGPA). | "Anime programmer glancing over shoulder in dark room with illuminated dual monitors" |
| **KM 3 (Progress 0.42)** | **Skills Junction** | `public/assets/backgrounds/curved-workstation-reference.jpg` | `object-cover w-full h-full rounded-xl opacity-80 mix-blend-luminosity hover:opacity-100 transition-opacity` | Physical multi-monitor desk backdrop overlaid with 14 interactive vector SVG skill category emblems. | "Curved ultrawide multi-screen workstation with ambient lighting and developer tools" |
| **KM 4 (Progress 0.57)** | **Project Highway** | **Billboard A**: `public/assets/projects/ai-brain-neural-architecture.jpg`<br>**Billboard B**: `public/assets/projects/systems-lab-optical-bus.jpg` | `object-cover w-full h-full rounded-xl border border-red-500/50` | **Card A**: Recall AI (Agentic Multi-Agent RAG Orchestrator)<br>**Card B**: Inside the Systems Lab (High-Throughput Optical Bus Architecture). | "Glowing 3D neural brain network with synaptic fiber optics / Quantum optical data bus processor" |
| **KM 5 (Progress 0.71)** | **Experience Toll Gate** | `public/assets/cybersecurity/cyber-soc-threat-command.jpg` | `object-cover w-full h-full rounded-xl border border-red-600/60 shadow-[0_0_35px_rgba(255,0,0,0.35)]` | Represents Cybernaut Full-Stack & Security internship, threat defense pipelines, and ELITA Python automation. | "Cybersecurity Operations Center SOC command center wall with threat monitoring telemetry" |
| **KM 6 (Progress 0.85)** | **Rest Stop** | **Left**: `public/assets/illustrations/anime-coder-sunset-cat.jpg`<br>**Right**: `public/assets/illustrations/anime-coder-purple-study.jpg` | `object-cover w-full h-full rounded-xl hover:scale-105 transition-transform duration-500` | Dual-panel showcase representing work-life balance, creative lo-fi music rest stops, and late-night coding flow states. | "Anime developer at sunset desk with sleeping cat / Cozy purple bedroom workstation at night" |
| **KM 7 (Progress 1.00)** | **Destination: Hire Me** | `public/assets/backgrounds/jarvis-holographic-lab.jpg` *(Backdrop)*<br>`public/assets/profile/santhosh-profile-formal.jpg` *(Avatar)* | `object-cover w-full h-full rounded-2xl border border-red-500/80` | High-tech command lab backdrop with Santhosh's authentic profile badge, active contact terminal, resume download, and booking links. | "Holographic Stark Industries command laboratory with Santhosh Kumar M recruiter beacon" |

---

## 3. Secondary UI & HUD Interface Mapping

| Interface Component | Asset Employed | Rendering Mode & Treatment | Behavioral Function |
| :--- | :--- | :--- | :--- |
| **SAN AI Global Assistant Core** | `public/assets/ai-interface/san-ai-keynote-telemetry.jpg` | Embedded in circular SVG clip-path (`rounded-full border-2 border-red-500/80 animate-pulse`) | Visual core for the JARVIS-style assistant modal and speech output pulses. |
| **HUD Cockpit Windshield (Autopilot)** | `public/assets/illustrations/anime-coder-panoramic-red.jpg` | Ultrawide 21:9 background banner with top & bottom linear-gradient mask (`to-black`) | Provides atmospheric cockpit feel when toggling "Autopilot First-Person Cinematic Camera". |
| **SAN AI Biometric Diagnostics** | `public/assets/ai-interface/avatar-wireframe-diagnostics.jpg` | Translucent HUD telemetry side-drawer (`mix-blend-screen opacity-70`) | Displays real-time WebGL framerate, camera spline coordinates, and memory usage. |
| **Speedometer & Compass Ring Reference** | `public/assets/ai-interface/san-ai-crimson-hud-reference.jpg` | Visual styling guide for procedural SVG dials and HUD coordinate overlays | Informs the exact concentric SVG geometry of the digital speedometer. |
| **Open Graph & Social Share Card** | `public/assets/profile/santhosh-profile-formal.jpg` | 1200 × 630 composite canvas with Santhosh's suit portrait + "The Road of Santhosh" HUD overlay | Guarantees recruiters on LinkedIn and GitHub see Santhosh's genuine face and title immediately. |

---

## 4. Technical Guardrails & Fallback Handling

1. **Aspect Ratio Enforcement**:
   - Portrait assets (`santhosh-profile-formal.jpg`, 3:4 aspect) are never stretched onto landscape billboard frames. They are framed with dedicated vertical biometric cards or centered with blurred letterbox backdrops.
   - Landscape assets (16:9, 21:9) use `aspect-video` containers with `object-cover`.
2. **Bandwidth & Offline Resilience**:
   - When running on 2G/3G mobile networks, billboard meshes display high-contrast SVG vector placeholders immediately, deferring high-res JPEG textures until camera deceleration.
   - The Service Worker (`sw.js`) caches all 14 assets in the `san-portfolio-assets-v2` cache bucket.

