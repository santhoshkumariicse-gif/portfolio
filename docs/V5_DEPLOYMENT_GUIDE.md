# Portfolio V5: Deployment & Operational Runbook

## 1. Prerequisites
- Node.js ≥ 20.x
- npm ≥ 10.x
- Git repository hosted on GitHub: `https://github.com/santhoshkumariicse-gif/portfolio.git`

---

## 2. Local Development & Testing

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Verify TypeScript type safety
npx tsc --noEmit

# 4. Compile production build
npm run build

# 5. Preview production build locally
npx vite preview --port 4173
# Visit http://localhost:4173/portfolio/
```

---

## 3. GitHub Pages Deployment Pipeline

The repository includes an automated GitHub Actions deployment workflow:
[`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml)

### Workflow Actions Triggered on `git push origin main`:
1. Checks out repository source.
2. Configures Node.js 20 with npm caching.
3. Executes `npm ci` for deterministic dependency resolution.
4. Executes `npm run build` (`tsc && vite build`) generating `./dist`.
5. Uploads `./dist` artifact to GitHub Pages.
6. Publishes to `https://santhoshkumariicse-gif.github.io/portfolio/`.

---

## 4. Rollback Protocol
In the event of an unintended deployment:
1. Navigate to GitHub Repository -> **Actions** -> **Deploy static content to Pages**.
2. Select previous successful workflow run and review commit hash.
3. In local terminal:
   ```bash
   git revert HEAD
   git push origin main
   ```
4. GitHub Actions will rebuild and redeploy the previous verified commit automatically.

