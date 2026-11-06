# Portfolio V7: Deployment Reliability & Automated Rollback Runbook

## 1. CI/CD Architecture & Multi-Stage Deployment Gates
In accordance with **Prompt 39 (Deployment Reliability and Rollback)**, the GitHub Actions deployment workflow (`.github/workflows/deploy-pages.yml`) operates across strict sequential quality gates before any bundle is delivered to GitHub Pages:

```
[Git Push to 'main']
         │
         ▼
[Gate 1: Dependency Security Audit]
   `npm audit --audit-level=high` (Halts immediately on high/critical CVEs)
         │
         ▼
[Gate 2: Strict Type System Validation]
   `npx tsc --noEmit` (Halts on any unused variable or type discrepancy)
         │
         ▼
[Gate 3: Optimized Vite Production Build]
   `npm run build` (Compiles with base: '/portfolio/', generates split chunks)
         │
         ▼
[Gate 4: Critical Asset Integrity Check]
   Verifies physical presence of:
   - `dist/index.html` (3.81 kB)
   - `dist/404.html` (SPA routing fallback)
   - `dist/manifest.json` (PWA manifest)
   - `dist/sw.js` (Service Worker cache engine)
         │
         ▼
[Gate 5: Deploy to GitHub Pages Environment]
   Uploads verified artifact to `https://santhoshkumariicse-gif.github.io/portfolio/`
```

---

## 2. GitHub Pages Routing & SPA Refresh Guarantees
GitHub Pages is a static file server that returns 404 for arbitrary subpaths unless handled. To guarantee smooth reloads and direct deep linking:
- `base: '/portfolio/'` is strictly configured in `vite.config.ts`.
- `public/404.html` includes an inline script redirecting requests to `/portfolio/?p=/...` which `App.tsx` decodes seamlessly.
- Canonical meta tags and Open Graph URLs link to `https://santhoshkumariicse-gif.github.io/portfolio/`.

---

## 3. Automated Failure Handling & Triage
If any step in the pipeline fails:
1. **Security Audit Failure (`npm audit`)**:
   - Inspect report in GitHub Actions summary.
   - Run `npm audit fix` locally or bump vulnerable sub-dependency in `package.json`.
2. **Type Check Failure (`tsc --noEmit`)**:
   - Run `npx tsc --noEmit` locally.
   - Fix strict unused local or parameter violations before pushing.
3. **Missing Asset Check**:
   - Verify `public/` directory contains all static asset files.

---

## 4. Emergency Rollback Runbook

If a production release introduces unexpected defects, execute one of the following two rollback procedures:

### Option A: Instant GitHub Pages Environment Redeploy (Zero Git Rewrites)
1. Go to repository **Actions** tab on GitHub: `https://github.com/santhoshkumariicse-gif/portfolio/actions`.
2. Select the **Deploy static content to Pages** workflow.
3. Locate the last known good deployment run.
4. Click **Re-run all jobs**. GitHub Pages will redeploy the previously verified artifact.

### Option B: Git Revert & Fast-Forward Push
```bash
# 1. Inspect recent commits
git log --oneline -n 5

# 2. Revert the problematic commit (creates a clean compensating commit)
git revert <problematic-commit-sha> -m 1

# 3. Verify build locally
npm run build

# 4. Push to main to trigger automated CI deployment
git push origin main
```

