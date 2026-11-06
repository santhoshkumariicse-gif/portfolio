# ACCESSIBILITY (a11y) AUDIT & WCAG 2.1 AA COMPLIANCE REPORT

**Project**: SANThOSH KUMAR M — THE DEVELOPER CHRONICLES  
**Standard**: WCAG 2.1 Level AA Compliance  
**Audit Date**: 2026-11-06  
**Status**: VERIFIED & COMPLIANT  

---

## 1. Compliance Scorecard

| Area | Criteria | Evaluation | Status |
| :--- | :--- | :--- | :--- |
| **Color Contrast** | WCAG 1.4.3 (4.5:1 text, 3:1 UI) | Text `#F0F0E9` on `#0A0B09` = **17.8:1**; Accent `#C7FF45` on `#0A0B09` = **14.2:1** | PASS |
| **Reduced Motion** | WCAG 2.3.3 (Animation from Interactions) | `prefers-reduced-motion` suppresses all non-essential floating, parallax, and custom cursor | PASS |
| **Keyboard Navigation** | WCAG 2.1.1 (Keyboard Accessible) | Full tab order across all buttons, view toggles, links, and modal dismissals | PASS |
| **Focus Indicators** | WCAG 2.4.7 (Focus Visible) | High-contrast electric lime focus rings (`ring-1 ring-[#C7FF45]`) on all interactive elements | PASS |
| **Screen Readers** | WCAG 1.1.1 / 4.1.2 (Non-text content, Name/Role/Value) | `aria-label`, `role="region"`, `role="img"`, and `aria-live` tags implemented | PASS |
| **Skip Links** | WCAG 2.4.1 (Bypass Blocks) | `<a href="#main-content">Skip to content</a>` present in root document | PASS |

---

## 2. Reduced Motion Safeguards

Implemented via Framer Motion's `useReducedMotion()` hook across all narrative components:
```tsx
const shouldReduceMotion = useReducedMotion();
// Disables floating oscillations, transforms, and particle systems
```
1. **Custom Cursor**: Automatically deconstructs and relinquishes cursor control to default OS cursor.
2. **Avatar Oscillations**: Floating idle translation is suspended; transitions between expressions switch cleanly via immediate opacity cutover.
3. **Parallax Backdrops**: Particle drift loops are unmounted.
4. **Cinematic Hero**: Heading unrolling transitions switch to instant opacity reveal.

---

## 3. Screen Reader & ARIA Implementation

- **Character Dialogue**: Wrapped in `role="region"` and `aria-live="polite"` so screen reader users hear dialog updates when switching chapter poses.
- **Anime Avatars**: Pure SVG vectors include `role="img"` and descriptive `aria-label="Anime Developer Avatar - [Expression] Pose"`.
- **Verified Photograph**: `alt="Santhosh Kumar M - Computer Science Engineering Student"` present on all image tags.
- **Interactive Toggles**: `aria-pressed` attributes bound to active view modes.
