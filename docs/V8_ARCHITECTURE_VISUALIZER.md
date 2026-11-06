# Portfolio V8: Interactive Project Architecture Visualizer (Prompt 42)

## 1. Overview & Data Topography
In accordance with **Prompt 42 (Interactive Project Architecture Visualizer)**, the portfolio integrates an interactive system architecture visualizer at `#architecture-visualizer`.

The visualizer maps client ingress, gateway routing, compute logic, persistent storage, and defensive security boundaries across Santhosh Kumar's engineering projects:
- **`python-security-automation`**: Log file tailing -> Python regex parser -> Threshold sliding rate window -> JSON/CSV export.
- **`web-sec-testing`**: HTTP Client injection tests -> OWASP ZAP / Burp proxy -> Parameterized defensive sanitizers -> Sandbox DB sink.
- **`rda-lorrybook`** `[Conceptual]`: Driver & Shipper UI -> FastAPI REST Gateway -> Geofence radius engine -> PostgreSQL ledger.

---

## 2. Interactive Capabilities
1. **Multi-Project Topology Switcher**: Instant switching between Python automation, penetration evaluation, and freight fleet dispatch.
2. **Layer Filtering**: Isolates `Client / Ingress`, `Gateway`, `Compute Engine`, `Persistence`, or `Security Boundary` layers with visual highlighting.
3. **Component Node Deep-Dive**: Clicking any node highlights connected data pipes and expands the right-hand inspection card detailing technical stack, responsibilities, and specific defensive security controls.
4. **Zoom & Pan Controls**: Includes `Zoom In (+15%)`, `Zoom Out (-15%)`, and `Reset (↺)`.
5. **Accessible Dual-Mode Presentation**: For screen-reader accessibility and low-motion preference, a "Show Text Specification" button instantly switches the view to a structured text and tabular layout.

