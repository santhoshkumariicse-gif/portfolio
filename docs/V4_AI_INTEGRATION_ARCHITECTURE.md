# Portfolio V4: AI Assistant Dual-Mode Architecture Proposal

## 1. Executive Summary
This document establishes the dual-mode operational specification for **CyberCopilot**, the portfolio's developer & security conversational interface, ensuring zero false inference claims, strict defense against OWASP LLM vulnerabilities, and zero credential exposure on static GitHub Pages.

---

## 2. Dual-Mode Architecture Matrix

| Dimension | MODE A: Offline In-Browser Simulation (Default) | MODE B: Real External Model Proxy (Production Backend) |
| :--- | :--- | :--- |
| **Hosting Model** | Client-side only (GitHub Pages static host) | Dedicated Serverless Worker / FastAPI Backend |
| **Inference Source** | Deterministic local rule engine & verified knowledge base | Authenticated Gemini API / Claude API via server proxy |
| **API Key Storage** | Zero API keys required or stored | Stored as server-side environment secrets (`GEMINI_API_KEY`) |
| **Network Traffic** | 0 external HTTP network calls | TLS 1.3 encrypted HTTPS requests to proxy endpoint |
| **OWASP Protection** | Client-side input regex & semantic normalization | Server-side rate limiter, schema validator & token quota |
| **Status Labeling** | `[IN-BROWSER DEMO SIMULATION ONLY]` | `[CONNECTED REAL MODEL // PRODUCTION PROXY]` |

---

## 3. MODE B Implementation Specification (When Backend is Deployed)

### Request Lifecycle
```
[Client Browser] 
    │  (POST /api/chat)
    ▼
[Cloudflare Worker / FastAPI Proxy]
    ├── 1. IP Rate Limiting (10 req/min per IP via Redis / Token Bucket)
    ├── 2. Input Length Validation (max 500 characters)
    ├── 3. OWASP LLM-01 Injection Filter (Sanitize system delimiters)
    ├── 4. System Prompt Prepension (Santhosh verified academic facts only)
    ▼
[Gemini 1.5 Flash API]
    │
    ▼
[Output Safety Filter]
    ├── Strip any accidental PII or prompt leak
    └── Return streaming SSE or JSON response
```

### Strict Constraint Checklist
- **Never expose API keys**: GitHub Pages static frontend must never hold OpenAI or Gemini API keys.
- **Truth in labeling**: The client interface must explicitly show `MODE A: OFFLINE DEMONSTRATION` until an active server endpoint is verified.

