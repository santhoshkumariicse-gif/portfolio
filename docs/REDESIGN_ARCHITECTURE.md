# Redesign architecture

The portfolio remains a dependency-free static site because the repository contains one HTML entry point and no package manifest or build system. This avoids a migration cost and keeps the existing GitHub Pages deployment path stable.

## Structure

- [`index.html`](../index.html): semantic page structure, design tokens, responsive CSS, and small interaction controller.
- [`AUDIT.md`](../AUDIT.md): source-of-truth audit and content verification notes.
- [`docs/DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md): visual language and layout rules.
- [`docs/MOTION_SYSTEM.md`](./MOTION_SYSTEM.md): interaction and reduced-motion rules.
- [`docs/FINAL_QA_REPORT.md`](./FINAL_QA_REPORT.md): browser validation results.
- [`docs/DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md): local and GitHub Pages instructions.

The JavaScript is intentionally small: it manages the mobile menu, Escape handling, email copy feedback, active-section state, and pointer response for the hero geometry. Essential content and navigation remain usable without those enhancements.

## Evidence integrity

The work section includes only verified learning/practice areas. Missing screenshots, repositories, demos, metrics, and the unverified GitHub profile are explicitly labelled rather than fabricated.
