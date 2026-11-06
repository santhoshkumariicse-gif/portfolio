# Portfolio V7: Application Security & Hardening Audit

## 1. Threat Model & Client-Side Hosting Boundary
Static single-page applications hosted on GitHub Pages execute wholly within the user's browser sandbox. In accordance with **Prompt 35 (Security Hardening)**:
- **Zero Secret Storage**: Never store private API keys, backend database credentials, or auth tokens in client-side code, Git history, or repository files.
- **Client Sandbox Isolation**: The application consumes only public unauthenticated endpoints (`https://api.github.com/users/santhoshkumariicse-gif`).
- **Input Sanitization**: Terminal inputs and playground inputs are parsed through purely client-side state transitions with zero `eval()`, zero `dangerouslySetInnerHTML`, and zero execution against system OS processes.

---

## 2. Browser Security Policies Configured (`index.html`)

### 2.1 Content Security Policy (CSP)
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com data:;
  img-src 'self' data: https://avatars.githubusercontent.com https://raw.githubusercontent.com;
  connect-src 'self' https://api.github.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self' mailto: tel:;
">
```
- **XSS Mitigation**: Script execution restricted to `'self'` application bundles.
- **Anti-Clickjacking**: `frame-ancestors 'none'` prevents framing inside unauthorized IFrames.
- **Form Action Boundary**: Restricts outbound form transmissions strictly to `'self'`, `mailto:`, and `tel:`.

### 2.2 Permissions Policy & Referrer Privacy
```html
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=(), usb=()">
```
- Disables access to sensitive hardware interfaces (camera, mic, geolocation, WebUSB, Payment Request).
- Enforces strict origin cross-origin referrer redaction to protect visitor navigation history.

---

## 3. Reverse Tabnabbing Defense
All outbound anchor elements targeting `_blank` strictly enforce `rel="noopener noreferrer"`, isolating the window opener context from malicious process hijacking.

---

## 4. CI/CD Automated Security Pipeline (`.github/workflows/deploy-pages.yml`)
- Automated `npm audit --audit-level=high` step executes before any build artifact is bundled.
- Mandatory `npx tsc --noEmit` verifies strict type guarantees and prevents runtime type collisions.
- Minimal workflow permissions: `contents: read`, `pages: write`, `id-token: write`.

---

## 5. Security Audit Verification Evidence
- `npm audit`: **0 vulnerabilities found** (Clean audit).
- `dangerouslySetInnerHTML`: **0 occurrences**.
- Hardcoded secrets or private keys: **0 detected**.
- External links audit: **100% compliant with `rel="noopener noreferrer"`**.

