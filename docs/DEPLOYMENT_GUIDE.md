# PROMPT 15 — PRODUCTION DEPLOYMENT GUIDE

## 1. Live Deployment Architecture
**SAN AI — THE DEVELOPER UNIVERSE** is configured for zero-breakage dual hosting:
1. **Primary Deployment**: GitHub Pages (`https://santhoshkumariicse-gif.github.io/portfolio/`).
2. **Alternative / Mirror**: Vercel Serverless Hosting with automatic SPA fallback rewrites.

---

## 2. GitHub Pages Continuous Deployment

The repository uses automated build synchronization:
- `scripts/setup-build.cjs`: Copies and prepares `index.source.html` into `index.html` for Vite input.
- `scripts/sync-dist.cjs`: Copies minified bundle files from `dist/` directly into the repository root (`/`) after compilation, guaranteeing that GitHub Pages branch-based deployments serve the updated application seamlessly without routing disruptions.
- **Base Path**: Configured as `base: '/portfolio/'` in `vite.config.ts`.
- **SPA Fallback**: `public/404.html` and `404.html` redirect deep routes back to the single-page application entry point.

### GitHub Pages Command Sequence:
```bash
# 1. Typecheck and build production bundles
npm run build

# 2. Stage all updated bundles and root synchronization assets
git add -A

# 3. Commit with semantic convention
git commit -m "feat(release): deploy SAN AI Developer Universe v3.0"

# 4. Push to main branch (GitHub Pages deploys automatically)
git push origin main
```

---

## 3. Vercel Deployment Configuration

For alternative deployment to Vercel:

### 1. Root Configuration (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### 2. Vercel CLI Commands:
```bash
# Deploy preview build
vercel

# Deploy to production domain
vercel --prod
```

> **Note for Root-Domain Vercel Deployments**: If hosting on a custom root domain (e.g. `santhoshkumar.dev` instead of `/portfolio/`), set `base: '/'` in `vite.config.ts` or set environment variable `VITE_BASE_PATH='/'`.

---

## 4. Pre-Flight Verification Checklist

Before pushing any production update, execute the following audit:
- [x] `npx tsc --noEmit` exits with 0 errors.
- [x] `npm run build` succeeds and prints chunk table.
- [x] Both 3D Universe mode and 2D Classic mode toggle cleanly.
- [x] Proximity POI inspection works in Free Roam.
- [x] Web Audio synthesis plays crisp audio clicks when unmuted.
- [x] Resume download button points to verified document link.
- [x] Contact transmission dispatches mailto payload to `msanthoshkumar638@gmail.com`.
