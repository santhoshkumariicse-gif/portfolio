# Portfolio V7: Privacy-First Analytics Architecture

## 1. Core Principles & Privacy Mandate
In strict accordance with **Prompt 34 (Privacy-First Analytics)**:
- **Zero Third-Party Trackers**: No Google Analytics, no Facebook Pixels, no Hotjar, and no remote surveillance SDKs.
- **Zero Cookies & Zero Fingerprinting**: Never access `document.cookie`, never read canvas data, never inspect audio context, never read battery APIs or device fingerprints.
- **Zero PII Collection**: Form fields, passwords, search input values, and IP addresses are completely excluded from event payloads.
- **Strict DNT Respect**: Automatically checks `navigator.doNotTrack` and ceases all execution if set to `'1'`.
- **User Opt-Out**: Supports immediate opt-out persistence via `localStorage.getItem('portfolio_analytics_opt_out')`.

---

## 2. Tracked Events & Payload Specification

| Event Type | Trigger Origin | Payload Attributes | Purpose |
| :--- | :--- | :--- | :--- |
| `page_view` | Main router / Hash navigation | `{ path: string }` (query params stripped) | Section interest metrics |
| `project_view` | `ProjectDetailModal` | `{ projectId: string, title: string }` | Identifying technical case study reads |
| `resume_action` | `CareerResumeCenter` | `{ action: 'print' \| 'request' }` | Assessing recruiter conversion |
| `external_click` | `ContactSection`, `Navbar` | `{ target: 'github' \| 'linkedin', destination: string }` | Evaluating recruiter outreach |
| `security_lab_run` | `CybersecurityPlayground` | `{ labId: string }` | Verifying playground engagement |

---

## 3. Safe Development Isolation
In development mode (`import.meta.env.DEV`), the tracker routes events directly to `console.debug('[Privacy Analytics: Dev]', event)`, guaranteeing that local development and test automation never contaminate telemetry streams.

In static production hosting (GitHub Pages), events are emitted to an in-browser `window.dispatchEvent(new CustomEvent('portfolio:analytics', ...))` allowing developers to attach optional serverless endpoints (e.g. Cloudflare Worker with anonymized counters) without bundling client-side tracking SDKs.

