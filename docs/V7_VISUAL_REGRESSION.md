# Portfolio V7: Visual Regression Testing System

## 1. Scope & Objective
In accordance with **Prompt 36 (Visual Regression Testing)**, this document specifies the automated visual regression suite built with Playwright to safeguard against unintended visual regressions, font shifting, unexpected horizontal scrolling, and responsive layout breakage across mobile, tablet, and desktop display widths.

---

## 2. Tested Viewports & Breakpoints
The test suite in `tests/visual-regression.spec.ts` executes deterministically across 5 standardized device viewports:

| Profile | Viewport (Width × Height) | Target Form Factor | Testing Criteria |
| :--- | :--- | :--- | :--- |
| **Mobile Small** | 360 × 740 px | Budget Android (Samsung Galaxy A-series) | Single-column flow, hamburger drawer, zero clip |
| **Mobile Standard** | 390 × 844 px | Standard iOS / Android (iPhone 14/15) | Touch targets ≥ 44px, readable editorial type |
| **Tablet** | 768 × 1024 px | iPads & mid-range tablets | Two-column grid transitions, sticky nav bar |
| **Laptop** | 1024 × 768 px | Ultrabooks / Small laptops | Multi-column architecture labs, sidebar layouts |
| **Desktop High-Res** | 1440 × 900 px | Standard developer displays | Max container bounds (1180px), generous whitespace |

---

## 3. Animation & Flakiness Stabilization
To avoid flaky diffs stemming from continuous SVG signal animations, typing effects, and Framer Motion spring physics:
1. **Reduced Motion Emulation**: `page.emulateMedia({ reducedMotion: 'reduce' })` forces all Framer Motion components to render in their final resting state.
2. **Global CSS Reset Injection**:
   ```css
   *, *::before, *::after {
     animation-duration: 0s !important;
     animation-delay: 0s !important;
     transition-duration: 0s !important;
     transition-delay: 0s !important;
   }
   ```
3. **Deterministic Timestamps**: Public telemetry and GitHub fallback timestamps are frozen during test execution.

---

## 4. Test Execution & Baseline Triage Runbook

### Running Local Visual Tests
```bash
# Start local preview server and run visual regression tests
npx playwright test

# Update baseline snapshots only after deliberate design verification
npx playwright test --update-snapshots

# View detailed graphical comparison report
npx playwright show-report
```

### Triaging Visual Diffs
When visual regression reports a diff:
1. Open `playwright-report/index.html`.
2. Inspect the slider comparison between `Actual` and `Expected`.
3. Check whether the diff stems from intentional typography updates or accidental layout shift.
4. **Never blindly run `--update-snapshots`** without confirming intentionality and checking that `document.documentElement.scrollWidth <= clientWidth`.

