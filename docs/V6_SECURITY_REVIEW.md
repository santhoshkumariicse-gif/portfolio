# Portfolio V6: Application Security Review & Threat Model

## 1. Perimeter & Asset Audits

| Surface | Defense Strategy | Audit Verdict |
| :--- | :--- | :---: |
| **User Input in CLI Terminal** | Strict command whitelist parser; no `eval()`, `exec()`, or child process calls. | **Passed (Zero Exploitation Risk)** |
| **Cybersecurity Playground Inputs** | Inputs evaluated via client-side pure functions; outputs rendered via JSX text nodes. | **Passed (Zero DOM XSS Risk)** |
| **External Hyperlinks** | All external anchors enforce `rel="noopener noreferrer" target="_blank"`. | **Passed (Zero Window Opener Hijacking)** |
| **API Keys & Secrets** | Zero private credentials embedded in repository, client bundles, or environment. | **Passed (Zero Secret Leakage)** |
| **GitHub API Rate Limits** | Public repository requests cached in `sessionStorage` with 30-min TTL + static fallback. | **Passed (Zero Unhandled Rate Limit Crashes)** |

---

## 2. Threat Modeling & Vulnerability Analysis
- **CWE-79 (Cross-Site Scripting)**: Neutralized through React's virtual DOM text node escaping.
- **CWE-89 (SQL Injection)**: The educational playground simulates SQL injection without connecting to an actual SQL database.
- **CWE-200 (Information Disclosure)**: The dual-mode AI specification prevents private prompt or chain-of-thought leakage.

