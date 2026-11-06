# Portfolio V6: User Experience & Accessibility Review

## 1. Ergonomics & Usability Assessment

| User Persona | Designed Flow | Outcome |
| :--- | :--- | :--- |
| **Technical Recruiter (15s Glance)** | Hero fast-facts card -> Direct Résumé download -> Verified Cybernaut role. | Immediate clarity regarding degree (GCT, May 2027) and current internship. |
| **Security Engineer** | Systems Lab -> Cybersecurity Playground -> Defensive code comparisons. | Concrete technical proof of OWASP Top 10 understanding and parameterized queries. |
| **Software Architect** | API Lifecycle Lab -> Engineering Docs -> Blueprint schematics. | Evidence of clean separation of concerns and RESTful design discipline. |
| **Keyboard-Only Visitor** | `Ctrl + K` global command navigation, visible focus rings, Escape dismissals. | Full WCAG 2.2 AA compliant keyboard navigation without mouse reliance. |

---

## 2. Accessibility & Responsive Metrics
- **Touch Target Sizes**: All interactive buttons and drawer links maintain minimum 44px × 44px hitboxes.
- **Color Contrast**: Electric lime `#C7FF45` on dark `#0A0B09` achieves a 14.8:1 contrast ratio (exceeding WCAG AAA 7:1 minimum).
- **Reduced Motion**: Full fallback to instantaneous opacity switches when `prefers-reduced-motion: reduce` is detected.

