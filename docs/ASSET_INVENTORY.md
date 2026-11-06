# ASSET INVENTORY & SPECIFICATION
**Project**: SANTHOSH KUMAR M | THE DEVELOPER CHRONICLES  
**Phase**: Prompt 01 — Asset Inventory & Specification  
**Date**: November 2026  
**Author**: Lead Visual Designer & Asset Architect  

---

## 1. Existing Assets Baseline

### 1.1 Authentic Photographic Assets
- **Asset**: `public/images/santhosh-kumar.jpg` (105,051 bytes, JPEG)
  - **Mirror**: `images/santhosh-kumar.jpg` (root level for direct branch deployment)
  - **Description**: High-resolution formal portrait of Santhosh Kumar M in black suit, white collared shirt, and black necktie.
  - **Status**: Live, verified, and rendering across Hero, About section, Open Graph meta tags, and PWA metadata.

### 1.2 Custom SVG Technical Illustrations (14 Modules in `src/svgs/`)
1. `HeroSystemArchitecture.tsx` (197 lines): Interactive central coordinator mesh with telemetry nodes.
2. `DeveloperBlueprintSvg.tsx` (191 lines): Technical CAD engineering schematic with rotating radar sweep.
3. `ContactNetworkSvg.tsx` (129 lines): Encrypted communication gateway with packet transmission pulses.
4. `CybersecurityWorkflowSvg.tsx` (144 lines): Step-by-step security pipeline diagram.
5. `PythonAutomationSvg.tsx` (127 lines): Event bus log parsing daemon schematic.
6. `HrSuiteArchitectureSvg.tsx` (119 lines): Resume parsing and blind review stage-gate triage model.
7. `RdaArchitectureSvg.tsx` (120 lines): Logistics geofenced route and driver queue architecture.
8. `RecallAiArchitectureSvg.tsx` (120 lines): Vector retrieval and document chunking model.
9. `NeuralArchitectureSVG.tsx` (172 lines): Neural network graph with glowing node layers.
10. `RAGPipelineSVG.tsx` (154 lines): Retrieval-Augmented Generation ingestion pipeline.
11. `CtfMatrixSvg.tsx` (107 lines): Reconnaissance and cryptographic challenge grid.
12. `SkillCategorySvgs.tsx` (108 lines): Bespoke vector icons for Programming, Frontend, Backend, Mobile, Databases, Tools, and AI.
13. `AIAgentArchitectureSvg.tsx` (145 lines): ReAct agentic feedback loop diagram.
14. `index.ts` (26 lines): Unified barrel export interface.

### 1.3 Static Public Files (`public/`)
- `manifest.json`: Web Application Manifest for offline PWA installability.
- `sw.js`: Service worker with cache-first and network-fallback strategy.
- `robots.txt`: Search engine crawling directives.
- `sitemap.xml`: SEO index containing verified canonical URL.
- `404.html`: Single-page routing fallback preserving Vite path redirects on GitHub Pages.
- `.nojekyll`: Instructs GitHub Pages to serve raw static assets without Jekyll interference.

---

## 2. New Anime & Storytelling Asset Architecture

To power "THE DEVELOPER CHRONICLES", a dedicated asset directory hierarchy is planned in `public/images/`:

```
public/images/
├── avatar/                  # Original anime developer character states
│   ├── avatar-idle.webp     # Default standing pose (observant, calm)
│   ├── avatar-thinking.webp # Problem analysis pose (hand on chin, focused)
│   ├── avatar-coding.webp   # Workstation pose (typing at keyboard with dual monitors)
│   ├── avatar-achievement.webp # Project victory pose (thumbs up / celebrating milestone)
│   ├── avatar-exploring.webp # Hologram interaction pose (gesturing at glowing UI node)
│   └── avatar-future.webp   # Horizon pose (looking toward futuristic city skyline)
├── scenes/                  # Layered atmospheric background environments
│   ├── scene-beginning.webp # Cyber city command desk at twilight
│   ├── scene-origin.webp    # Personal study and development workshop
│   ├── scene-arsenal.webp   # Holographic skill laboratory
│   ├── scene-missions.webp  # Mission control telemetry hub
│   ├── scene-evolution.webp # Cybernetic milestone pathway
│   └── scene-finale.webp    # Open sky observation horizon
├── decorations/             # Technical HUD overlays & vector decals
│   ├── hud-corner-reticles.svg
│   ├── telemetry-grid-matrix.svg
│   └── circuit-bus-lines.svg
└── santhosh-kumar.jpg       # Authentic professional photograph (Preserved)
```

---

## 3. Character Visual Design Constraints

- **Original Character Design**: The character must be a 100% original anime design. Never copy copyrighted anime characters (e.g., from Naruto, Demon Slayer, Jujutsu Kaisen, etc.).
- **Consistent Proportions & Clothing**:
  - Young male developer, dark hair with modern style, sharp and approachable expression.
  - Attire: Minimalist dark cyber-hoodie or technical jacket with subtle lime (`#C7FF45`) stitching or trims matching the website theme.
  - Consistent across all six expression states so the character feels like the same person in every chapter.
- **Reference to Real Identity**: The character styling and facial structure will subtly reflect Santhosh Kumar M's actual portrait while remaining artistic and anime-stylized.
- **Strict Integrity Rule**: Never replace Santhosh's actual professional photograph with an AI avatar. Both assets exist synergistically: the actual photo serves recruiter verification in the About section and modal, while the anime character acts as the interactive narrator.

---

## 4. Procedural & Lightweight SVG Fallback Strategy

To guarantee that the application **never** breaks if an external image fails to load or during offline testing:
1. Every character state will have an inline SVG fallback component (`AnimeAvatarSvg.tsx`) with vector layers for head, hair, eyes, and cyber-jacket.
2. All environmental backgrounds will have rich CSS gradient and SVG mesh fallbacks defined in `src/design-system/tokens.ts`.
3. Image loading errors will automatically degrade gracefully to the SVG vector illustrations without layout shifts.

