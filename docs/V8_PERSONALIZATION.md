# Portfolio V8: Personalized Visitor Experience (Prompt 41)

## 1. Architectural Strategy & Design
In accordance with **Prompt 41 (Personalized Portfolio Experience)**, the portfolio integrates a lightweight, accessible personalization engine allowing visitors to tailor their viewing track to their specific goals:

1. **General Track (Complete Tour)**: Sequential, balanced view exploring narrative philosophy, selected engineering case studies, interactive architecture labs, blog articles, and career timeline.
2. **Recruiter Track (Fast-Track Evaluation)**: Highlights verified developer internship milestones, skills taxonomy, ATS-compatible printable curriculum vitae (`#resume-center`), and direct email contact actions.
3. **Developer Track (Deep Engineering Inspection)**: Focuses directly on real software projects, interactive architecture diagrams, live cybersecurity playgrounds, REST API lifecycle tracer, and the sandboxed terminal CLI.

---

## 2. Privacy & UX Principles
- **Zero Profiling & Zero PII**: The track selector uses purely client-side state persisted in `localStorage ('portfolio_visitor_path')`. No tracking pixels or fingerprinting mechanisms are involved.
- **Zero Content Fragmentation**: All sections remain 100% accessible via navigation links and direct `#anchors` in every track; no content is gated, duplicated, or removed.
- **Accessible Controls**: Built using a semantic `role="radiogroup"` pattern with keyboard focus traversal, visible 2px lime focus rings, and screen-reader announcements.

