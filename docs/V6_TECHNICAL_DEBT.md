# Portfolio V6: Technical Debt & Maintenance Register

This document tracks items for ongoing engineering maintenance and future expansion.

1. **Open-Source Repository Publishing**:
   - As conceptual prototypes (`RDA / LorryBook`, `HR Recruitment Suite`, `Recall AI`) transition from design blueprints into public GitHub repositories, their URLs in `src/data/projects.ts` should be updated from local notes to live GitHub repository URLs.
2. **GitHub API Tokenless Cache**:
   - The current public repository integration relies on GitHub's unauthenticated API (60 requests/hour/IP) paired with a 30-minute `sessionStorage` cache. This is safe and requires zero secrets in client code.
3. **PWA Cache Invalidation**:
   - The service worker in `public/sw.js` uses `stale-while-revalidate` for hashed assets and network-first for HTML, preventing stale application loads across new deployments.

