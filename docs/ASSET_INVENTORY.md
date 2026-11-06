# COMPREHENSIVE ASSET INVENTORY & VISUAL SPECIFICATION
**Project**: THE ROAD OF SANTHOSH — Powered by SAN AI  
**Archive Source**: User Supplied Archive `11.zip` (Extracted to `extracted_assets/11/`)  
**Production Destination**: `public/assets/`  
**Date**: November 2026 | **Auditor**: Lead Creative Technologist & Asset Architect  

---

## 1. Asset Classification Policy & Mandatory Guardrails

> [!IMPORTANT]
> **Strict Policy on Personal Representation**:
> - **Authentic Portrait**: Only Image [9] (`santhosh-profile-formal.jpg`) is the genuine personal photograph of Santhosh Kumar M. It is reserved exclusively for the About section, Hero credentials, Resume badge, and authentic profile cards.
> - **Anime Illustrations**: Images [1], [8], [12], [13], [14] represent creative anime developer avatars, world-building artwork, and thematic workstation visuals. They must NEVER be labeled or presented as Santhosh's actual physical appearance.
> - **AI / HUD Visuals**: Images [4], [5], [10] serve as telemetry backgrounds, SAN AI holographic core backdrops, and HUD reference overlays.
> - **Domain Visuals**: Images [2], [3], [11] serve as technical backdrop graphics for Systems Lab, Cybersecurity SOC, and Neural Architecture projects.

---

## 2. Granular Inventory of the 14 User-Supplied Visual Assets

| # | Normalized Production Path | Original Archive Filename | Format | Dimensions | Aspect | Size (KB) | Visual Category | Quality Rating | Target UI Section & Usage |
| :-: | :--- | :--- | :---: | :---: | :---: | :---: | :--- | :---: | :--- |
| **01** | `public/assets/illustrations/anime-coder-purple-study.jpg` | `0C6-jsSAEqNRsrp...jpg` | JPEG | 1000 × 561 | 1.78 (16:9) | 51.5 KB | Anime Illustration | High (Optimized) | **KM 6: Rest Stop** (Late Night Coding Sanctuary billboard & creative rest stop modal) |
| **02** | `public/assets/projects/systems-lab-optical-bus.jpg` | `BPCvJ3Eew3V2...jpg` | JPEG | 1024 × 576 | 1.78 (16:9) | 128.6 KB | Systems / Hardware | High (Vibrant) | **KM 4: Project Highway** (Project 2: Inside the Systems Lab / High-Throughput Microservice Bus) |
| **03** | `public/assets/cybersecurity/cyber-soc-threat-command.jpg` | `EitbpT_DAq_CRk...jpg` | JPEG | 600 × 340 | 1.76 (16:9) | 41.1 KB | Cybersecurity | Medium (Fast Load) | **KM 5: Experience Toll Gate** (Cybernaut Security & Threat Defense billboard visual) |
| **04** | `public/assets/ai-interface/san-ai-keynote-telemetry.jpg` | `eYZoAIIhpI_5B...jpg` | JPEG | 1536 × 1024 | 1.50 (3:2) | 169.9 KB | Futuristic AI Core | Ultra-High (Retina) | **KM 0: Welcome Gate** & **SAN AI Global Assistant** modal backdrop / keynote telemetry |
| **05** | `public/assets/ai-interface/avatar-wireframe-diagnostics.jpg` | `mSnMvrGr769d...jpg` | JPEG | 1080 × 608 | 1.78 (16:9) | 77.7 KB | Avatar Telemetry | High (Clean lines) | **SAN AI Diagnostics HUD** & System Telemetry Drawer (biometric and scan line overlay) |
| **06** | `public/assets/backgrounds/jarvis-holographic-lab.jpg` | `n9jHV2BWOxm6...jpg` | JPEG | 884 × 442 | 2.00 (2:1) | 37.2 KB | Reference / Ambient | Standard | **KM 7: Hire Me / Mission Control** background glass lab atmosphere |
| **07** | `public/assets/backgrounds/curved-workstation-reference.jpg` | `QNOokmbHG-ry...jpg` | JPEG | 1000 × 563 | 1.78 (16:9) | 71.1 KB | Reference / Ambient | High | **KM 3: Skills Junction** engineering lab backdrop & hardware workstation reference |
| **08** | `public/assets/illustrations/anime-coder-sunset-cat.jpg` | `uH2q4jBooXfd...jpg` | JPEG | 919 × 517 | 1.78 (16:9) | 71.2 KB | Anime Illustration | High (Warm tone) | **KM 6: Rest Stop** (Sunset Lo-Fi Companion view & calm developer reflection zone) |
| **09** | `public/assets/profile/santhosh-profile-formal.jpg` | `WhatsApp Image 2026-11-06 at 9.53.01 AM.jpeg` | JPEG | 970 × 1300 | 0.75 (3:4) | 57.9 KB | **Authentic Profile** | **Crisp Studio** | **KM 1: About Santhosh Billboard**, Bio Card, Navigation Avatar, Resume Header, Open Graph |
| **10** | `public/assets/ai-interface/san-ai-crimson-hud-reference.jpg` | `wnb_RROZ1M38...jpg` | JPEG | 1000 × 533 | 1.88 (21:9) | 69.4 KB | HUD Telemetry UI | High (Tactical) | **Highway HUD Speedometer & Compass Ring** styling reference, tactical telemetry overlay |
| **11** | `public/assets/projects/ai-brain-neural-architecture.jpg` | `X7Q26LLJ4CCv...jpg` | JPEG | 1024 × 576 | 1.78 (16:9) | 57.0 KB | AI / Neural Network | High (Luminescent) | **KM 4: Project Highway** (Project 1: Recall AI / Autonomous Multi-Agent RAG Orchestrator) |
| **12** | `public/assets/illustrations/anime-coder-neon-looking-back.jpg` | `x9jLgr6fBUuB...jpg` | JPEG | 1024 × 576 | 1.78 (16:9) | 79.8 KB | Anime Illustration | High (Atmospheric) | **KM 2: Education Milestone** (Night study journey at Gnanamani College of Technology) |
| **13** | `public/assets/illustrations/anime-coder-panoramic-red.jpg` | `YyqzDs2jpDf_...jpg` | JPEG | 2316 × 1080 | 2.14 (Ultrawide) | 251.4 KB | Anime Illustration | Ultra-Wide HD | **KM 0: Highway Start Banner** & Autopilot Panoramic Cockpit windshield backdrop |
| **14** | `public/assets/illustrations/anime-coder-4k-workstation.jpg` | `Y_h-Xz8o-upx...jpg` | JPEG | 3840 × 2160 | 1.78 (4K UHD) | 451.0 KB | Anime Illustration | **Master 4K Ultra** | **Hero Banner (Full Screen)**, Desktop Wallpaper showcase & 3D Billboards master texture |

---

## 3. Directory Distribution Structure

To maximize cache locality, Vite bundling speed, and asset organization, files are placed in `public/assets/`:

```
public/assets/
├── profile/
│   └── santhosh-profile-formal.jpg          (Authentic portrait, 970x1300)
├── illustrations/
│   ├── anime-coder-4k-workstation.jpg       (Master 4K artwork, 3840x2160)
│   ├── anime-coder-panoramic-red.jpg        (Ultrawide HUD cockpit, 2316x1080)
│   ├── anime-coder-neon-looking-back.jpg    (Neon study glance, 1024x576)
│   ├── anime-coder-sunset-cat.jpg           (Sunset lo-fi rest stop, 919x517)
│   └── anime-coder-purple-study.jpg         (Night study workstation, 1000x561)
├── ai-interface/
│   ├── san-ai-keynote-telemetry.jpg         (Keynote AI sphere, 1536x1024)
│   ├── san-ai-crimson-hud-reference.jpg     (Tactical crimson HUD ring, 1000x533)
│   └── avatar-wireframe-diagnostics.jpg     (Avatar wireframe telemetry, 1080x608)
├── cybersecurity/
│   └── cyber-soc-threat-command.jpg         (SOC command wall, 600x340)
├── projects/
│   ├── ai-brain-neural-architecture.jpg     (Neural brain fiber optics, 1024x576)
│   └── systems-lab-optical-bus.jpg          (Photonic processor bus, 1024x576)
└── backgrounds/
    ├── jarvis-holographic-lab.jpg           (Holographic Stark lab, 884x442)
    └── curved-workstation-reference.jpg     (Curved triple-monitor desk, 1000x563)
```

---

## 4. Texture Preloading & WebGL Buffer Optimization

For the Three.js 3D Highway environment:
1. **Mipmapping & Anisotropy**: Textures mapped onto 3D Billboards (`anime-coder-4k-workstation.jpg`, `santhosh-profile-formal.jpg`, `ai-brain-neural-architecture.jpg`) use `texture.minFilter = THREE.LinearMipmapLinearFilter` and `texture.anisotropy = renderer.capabilities.getMaxAnisotropy()`.
2. **Color Space**: Explicitly tagged `texture.colorSpace = THREE.SRGBColorSpace` to prevent washed-out dark reds or clipped contrast on HDR/sRGB monitors.
3. **Lazy Buffer Allocation**: Billboards initialize with placeholder solid black material + glowing wireframe border; full-resolution image textures load asynchronously as the camera approaches within 120 meters.
