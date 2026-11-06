# Portfolio V5: Next Phase Roadmap (Portfolio V6 & Beyond)

With Portfolio V5 successfully verified and compiled with zero errors, the groundwork is laid for subsequent maturity tiers:

## Portfolio V6: Advanced Digital Engineering Platform (Prompts 25–32)
1. **Design System & Component Library (Prompt 25)**:
   - Extract centralized design tokens into a standalone package or reusable UI layer.
   - Component showcase route at `/design-system`.
2. **Global Command Navigation (Prompt 26)**:
   - Global accessible Command Palette triggered with `Ctrl + K` / `Cmd + K`.
   - Fuzzy search across projects, technical notes, experience, and navigation links.
3. **Interactive Cybersecurity Playground (Prompt 27)**:
   - Dedicated educational security playground at `/lab/security` demonstrating SQLi, XSS, and sanitization boundaries in isolated client sandboxes.
4. **API Architecture Laboratory (Prompt 28)**:
   - Request lifecycle visualizer at `/lab/api` tracing HTTP methods, JWT claims, and database transactions.
5. **Engineering Documentation Center (Prompt 29)**:
   - Structured markdown documentation at `/engineering` covering system decisions, database schemas, and threat models.
6. **End-to-End Automated Testing (Prompt 31)**:
   - Vitest unit tests and Playwright visual regression tests integrated into GitHub Actions.

---

## Technical Debt & Maintenance Register
- **Evidence Verification**: Maintain real project repository URLs in `src/data/projects.ts` as prototypes mature into open-source repositories.
- **GitHub API Rate Limits**: The current 30-minute `sessionStorage` caching mechanism prevents unauthenticated rate limiting under normal browsing.

