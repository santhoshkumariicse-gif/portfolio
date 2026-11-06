import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Play, RotateCcw, CheckCircle2 } from 'lucide-react';

type VulnerabilityType = 'sqli' | 'xss' | 'validation' | 'headers';

export const CybersecurityPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<VulnerabilityType>('sqli');
  const [inputVal, setInputVal] = useState<string>('');
  const [outputResult, setOutputResult] = useState<{
    vulnerable: string;
    defensive: string;
    recommendation: string;
  } | null>(null);

  // Tab configurations
  const demos = {
    sqli: {
      name: '01 // SQL Injection',
      badge: 'CWE-89 // OWASP A03:2021',
      title: 'SQL Injection: Code & Data Separation',
      desc: 'Simulates what occurs when user input is concatenated directly into SQL statements versus compiled with parameterized prepared statements.',
      samplePayload: "admin' OR '1'='1",
      defaultInput: "admin' OR '1'='1",
      evaluate: (input: string) => {
        const hasInjection = input.includes("'") || input.toLowerCase().includes('or') || input.includes('--');
        return {
          vulnerable: hasInjection
            ? `SELECT * FROM users WHERE username = '${input}' AND pass = '***';\n\n🚨 [EXPLOITATION SIMULATED]: Syntax parsed ('1'='1' = true). Query evaluated true for all rows; authentication bypassed without credentials.`
            : `SELECT * FROM users WHERE username = '${input}' AND pass = '***';\n\n[QUERY EXECUTED]: Normal single-row lookup for literal username.`,
          defensive: `PREPARED STATEMENT (Parameterized):\ncursor.execute("SELECT * FROM users WHERE username = %s AND pass = %s", ("${input}", password))\n\n🛡️ [SECURE EXECUTION]: The SQL parser treated the input purely as a string literal. Zero syntax alteration possible. Injection thwarted.`,
          recommendation: 'Always utilize parameterized queries or ORM abstractions. Never concatenate user strings into dynamic SQL statements.'
        };
      }
    },
    xss: {
      name: '02 // Cross-Site Scripting (XSS)',
      badge: 'CWE-79 // OWASP A03:2021',
      title: 'Reflected XSS: Contextual Encoding',
      desc: 'Demonstrates how unencoded user inputs rendered into the DOM can lead to script injection, versus context-aware HTML entity encoding.',
      samplePayload: '<script>alert("XSS")</script>',
      defaultInput: '<script>alert("XSS")</script>',
      evaluate: (input: string) => {
        const hasScript = input.includes('<') && input.includes('>');
        return {
          vulnerable: hasScript
            ? `RAW DOM INJECTION (innerHTML):\n<div>Welcome, ${input}</div>\n\n🚨 [EXPLOITATION SIMULATED]: Raw HTML tags executed by browser parser. Attacker JavaScript runs in victim session, risking session cookie exfiltration.`
            : `RAW DOM INJECTION:\n<div>Welcome, ${input}</div>\n\n[NORMAL RENDERING]: Text nodes parsed without executable markup.`,
          defensive: `CONTEXT-AWARE HTML ESCAPING:\n<div>Welcome, &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;</div>\n\n🛡️ [SECURE EXECUTION]: Characters '<', '>', and '"' converted to HTML entities. Browser renders string literally without executing script tags.`,
          recommendation: 'Use framework text interpolations (React JSX auto-escapes string children) and establish a strict Content-Security-Policy (CSP).'
        };
      }
    },
    validation: {
      name: '03 // Schema Validation',
      badge: 'CWE-20 // Input Sanitization',
      title: 'Pydantic Strict Schema Enforcement',
      desc: 'Evaluates type boundaries, null bytes, and length limits to reject malformed payloads before they reach business logic.',
      samplePayload: 'user_admin\x00_bypass',
      defaultInput: 'user_admin\x00_bypass',
      evaluate: (input: string) => {
        const hasNullByte = input.includes('\x00') || input.length > 20;
        return {
          vulnerable: hasNullByte
            ? `UNVALIDATED INGESTION:\nuser_id = request.args.get("id")\n\n🚨 [ANOMALY DETECTED]: Null-byte poisoning or oversized payload passed through to C-bindings or filesystem calls without sanitization.`
            : `UNVALIDATED INGESTION:\nuser_id = "${input}"\n\n[ACCEPTED]: Standard input string within nominal boundary.`,
          defensive: `PYDANTIC STRICT SCHEMA MODEL:\nclass UserPayload(BaseModel):\n  id: constr(regex="^[a-zA-Z0-9_]{3,16}$")\n\n🛡️ [INPUT REJECTED]: Validation error 422 Unprocessable Entity. Input contains illegal characters. Blocked at API boundary.`,
          recommendation: 'Enforce strict schema validation on all inputs using Pydantic, Zod, or JSON Schema before passing variables to internal systems.'
        };
      }
    },
    headers: {
      name: '04 // Security Headers',
      badge: 'HTTP Defensive Architecture',
      title: 'HTTP Security Headers Audit',
      desc: 'Inspects essential browser security headers (CSP, HSTS, X-Frame-Options) that prevent clickjacking and insecure protocols.',
      samplePayload: 'https://santhoshkumariicse-gif.github.io/portfolio/',
      defaultInput: 'https://santhoshkumariicse-gif.github.io/portfolio/',
      evaluate: () => ({
        vulnerable: `MISSING SECURITY HEADERS:\nHTTP/1.1 200 OK\nServer: Custom\n\n🚨 [RISK EXPOSURE]: Vulnerable to Clickjacking (if framed), protocol downgrade attacks (HTTP without HSTS), and MIME-sniffing exploits.`,
        defensive: `HARDENED HTTP RESPONSE HEADERS:\nStrict-Transport-Security: max-age=31536000; includeSubDomains\nX-Content-Type-Options: nosniff\nX-Frame-Options: DENY\nContent-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';\n\n🛡️ [HARDENED POLICY]: Browser enforces HTTPS only, rejects unauthorized iframes, and restricts third-party script origins.`,
        recommendation: 'Configure your web server (Nginx, Caddy, Cloudflare) with standard OWASP-recommended HTTP security headers.'
      })
    }
  };

  const currentDemo = demos[activeTab];

  const handleRunEvaluation = () => {
    const val = inputVal || currentDemo.defaultInput;
    setOutputResult(currentDemo.evaluate(val));
  };

  const handleTabChange = (tab: VulnerabilityType) => {
    setActiveTab(tab);
    setInputVal('');
    setOutputResult(null);
  };

  const handleUseSample = () => {
    setInputVal(currentDemo.samplePayload);
  };

  return (
    <section id="security-playground" className="py-20 md:py-28 border-b border-[var(--border)] bg-[#131512]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
              Playground // Interactive Cybersecurity Lab
            </span>
            <span className="px-2 py-0.5 text-[0.65rem] font-[var(--mono)] uppercase tracking-wider font-bold bg-[var(--raised)] border border-[var(--border)] text-[var(--secondary-text)]">
              Isolated Educational Environment
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--primary-text)]">
            Vulnerabilities,{' '}
            <span className="font-[var(--serif)] italic font-normal text-[var(--accent)]">
              deconstructed.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--secondary-text)] max-w-[640px] leading-relaxed">
            Test attack vectors safely in an in-browser sandbox. Compare unhardened code behavior against defensive parameterization and entity encoding countermeasures.
          </p>
        </div>

        {/* Lab Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pb-4 mb-8 border-b border-[var(--border)] font-[var(--mono)] text-xs">
          {(Object.keys(demos) as VulnerabilityType[]).map((key) => {
            const d = demos[key];
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleTabChange(key)}
                className={`min-h-[42px] px-4 py-2 border transition-colors ${
                  isActive
                    ? 'border-[var(--accent)] bg-[rgba(199,255,69,0.08)] text-[var(--accent)] font-bold'
                    : 'border-[var(--border)] text-[var(--secondary-text)] hover:text-[var(--primary-text)] bg-[var(--surface)]'
                }`}
              >
                {d.name}
              </button>
            );
          })}
        </div>

        {/* Playground Console */}
        <div className="bg-[var(--surface)] border border-[var(--border-strong)] p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-6 border-b border-[var(--border)]">
            <div>
              <span className="px-2 py-0.5 text-[0.65rem] font-[var(--mono)] uppercase tracking-wider font-bold bg-[var(--raised)] border border-[var(--border)] text-[var(--accent)] inline-block mb-1">
                {currentDemo.badge}
              </span>
              <h3 className="text-xl font-bold text-[var(--primary-text)]">
                {currentDemo.title}
              </h3>
            </div>
            <span className="text-[0.7rem] font-[var(--mono)] text-[var(--muted)]">
              [CLIENT-SIDE DETERMINISTIC EVALUATOR]
            </span>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-[var(--secondary-text)] leading-relaxed">
            {currentDemo.desc}
          </p>

          {/* Interactive Input Form */}
          <div className="mt-6 p-4 bg-[#0A0B09] border border-[var(--border)]">
            <div className="flex items-center justify-between mb-2 text-xs font-[var(--mono)]">
              <label htmlFor="payload-input" className="text-[var(--secondary-text)] font-semibold">
                Test Input Payload:
              </label>
              <button
                type="button"
                onClick={handleUseSample}
                className="text-[var(--accent)] hover:underline flex items-center gap-1 text-[0.72rem]"
              >
                Insert Sample Attack Vector
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="payload-input"
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={`Try: ${currentDemo.samplePayload}`}
                className="flex-1 px-3.5 py-2.5 bg-[var(--surface)] border border-[var(--border)] text-xs sm:text-sm font-[var(--mono)] text-[var(--primary-text)] focus:border-[var(--accent)] outline-none"
              />

              <button
                type="button"
                onClick={handleRunEvaluation}
                className="min-h-[44px] px-6 py-2 bg-[var(--accent)] text-[var(--bg)] font-[var(--mono)] text-xs font-bold uppercase tracking-wider hover:bg-[#d8ff6b] transition-all flex items-center justify-center gap-2 shrink-0"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Evaluate Trace</span>
              </button>
            </div>
          </div>

          {/* Evaluation Results (Vulnerable vs Defensive) */}
          {outputResult && (
            <div className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-[var(--mono)] text-xs">
                {/* Vulnerable Result Card */}
                <div className="p-5 bg-[#171A16] border border-rose-800/50">
                  <div className="flex items-center gap-2 text-rose-400 font-bold mb-3">
                    <ShieldAlert className="w-4 h-4" />
                    <span className="uppercase tracking-wider">Vulnerable Implementation</span>
                  </div>
                  <pre className="text-[0.78rem] text-[var(--secondary-text)] leading-relaxed whitespace-pre-wrap">
                    {outputResult.vulnerable}
                  </pre>
                </div>

                {/* Defensive Result Card */}
                <div className="p-5 bg-[#171A16] border border-emerald-800/50">
                  <div className="flex items-center gap-2 text-[var(--accent)] font-bold mb-3">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="uppercase tracking-wider">Defended Implementation</span>
                  </div>
                  <pre className="text-[0.78rem] text-[var(--secondary-text)] leading-relaxed whitespace-pre-wrap">
                    {outputResult.defensive}
                  </pre>
                </div>
              </div>

              {/* Security Recommendation Callout */}
              <div className="p-4 bg-[var(--surface-subtle)] border border-[var(--border)] flex items-start gap-3 text-xs">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--primary-text)] font-[var(--mono)] uppercase tracking-wider block text-[0.72rem] mb-0.5">
                    Defensive Security Recommendation:
                  </strong>
                  <p className="text-[var(--secondary-text)] leading-relaxed">
                    {outputResult.recommendation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Safety Notice Footer */}
          <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between text-[0.68rem] font-[var(--mono)] text-[var(--muted)]">
            <span>[SAFETY GUARANTEE: SANDBOX EXECUTES ZERO EXTERNAL SHELL OR DATABASE QUERIES]</span>
            <button
              type="button"
              onClick={() => {
                setInputVal('');
                setOutputResult(null);
              }}
              className="hover:text-[var(--accent)] flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
