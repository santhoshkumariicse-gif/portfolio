import React, { useState } from 'react';
import { Send, Server, Clock } from 'lucide-react';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiEndpointConfig {
  endpoint: string;
  method: HttpMethod;
  defaultBody: string;
  status: number;
  response: object;
  steps: string[];
}

export const ApiEngineeringLab: React.FC = () => {
  const [selectedEndpointKey, setSelectedEndpointKey] = useState<string>('projects');
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [requestBody, setRequestBody] = useState<string>('{}');
  const [isExecuting, setIsExecuting] = useState(false);
  const [responseOutput, setResponseOutput] = useState<{
    status: number;
    latency: string;
    body: object;
    steps: string[];
  } | null>(null);

  const endpoints: Record<string, ApiEndpointConfig> = {
    projects: {
      endpoint: '/api/v1/projects?category=security',
      method: 'GET',
      defaultBody: '{}',
      status: 200,
      response: {
        status: 'success',
        count: 2,
        data: [
          { id: 'web-sec-testing', title: 'Web App Security Testing', status: 'verified_lab' },
          { id: 'python-security-automation', title: 'Python Security Scripts', status: 'internship_verified' }
        ]
      },
      steps: [
        '1. Client dispatched HTTP/2 GET request to /api/v1/projects',
        '2. Ingress CORS validated allowed origin',
        '3. Query parameter "category" sanitized against SQLi injection',
        '4. PostgreSQL query executed via async connection pool (3.2ms)',
        '5. Serialized Pydantic models to JSON and returned HTTP 200 OK'
      ]
    },
    inquiry: {
      endpoint: '/api/v1/contact/inquiry',
      method: 'POST',
      defaultBody: JSON.stringify(
        {
          name: 'Technical Recruiter',
          email: 'recruiter@enterprise.com',
          message: 'Discussing Python Developer & Security internship opportunities.'
        },
        null,
        2
      ),
      status: 201,
      response: {
        status: 'created',
        message: 'Inquiry received. Dispatched to Santhosh via verified SMTP queue.',
        ticket_id: 'INQ-94821',
        dispatched_to: 'santhoshkumar160706@gmail.com'
      },
      steps: [
        '1. Ingress payload parsed and size constrained (max 10KB)',
        '2. Pydantic schema validated email format and stripped HTML tags',
        '3. Rate-limiter verified source IP under 5 submissions / hour',
        '4. Queued notification into asynchronous mail transport',
        '5. Returned HTTP 201 Created with tracking identifier'
      ]
    },
    telemetry: {
      endpoint: '/api/v1/system/telemetry',
      method: 'GET',
      defaultBody: '{}',
      status: 200,
      response: {
        system: 'Santhosh Portfolio V6 Platform',
        environment: 'GitHub Pages Static Hosting',
        host: 'santhoshkumariicse-gif.github.io',
        runtime: 'React 18 + TypeScript Strict',
        uptime: 'Static Edge CDN 100%'
      },
      steps: [
        '1. Edge CDN node resolved requested resource',
        '2. Handled client Cache-Control header',
        '3. Serialized environmental specifications',
        '4. Returned HTTP 200 OK with ETag validation'
      ]
    }
  };

  const handleSelectEndpoint = (key: string) => {
    setSelectedEndpointKey(key);
    const ep = endpoints[key];
    setMethod(ep.method);
    setRequestBody(ep.defaultBody);
    setResponseOutput(null);
  };

  const handleExecuteRequest = () => {
    setIsExecuting(true);
    setResponseOutput(null);

    const ep = endpoints[selectedEndpointKey];

    setTimeout(() => {
      let parsedBody = ep.response;
      let respStatus = ep.status;

      // Validate JSON input for POST
      if (method === 'POST') {
        try {
          JSON.parse(requestBody);
        } catch {
          respStatus = 422;
          parsedBody = {
            error: 'Unprocessable Entity',
            detail: 'Malformed JSON payload failed schema validation.'
          };
        }
      }

      setResponseOutput({
        status: respStatus,
        latency: `${(Math.random() * 12 + 4).toFixed(1)}ms`,
        body: parsedBody,
        steps: ep.steps
      });
      setIsExecuting(false);
    }, 350);
  };

  return (
    <section id="api-lab" className="py-20 md:py-28 border-b border-[var(--border)] bg-[#0A0B09]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
              API // Request Lifecycle Laboratory
            </span>
            <span className="px-2 py-0.5 text-[0.65rem] font-[var(--mono)] uppercase tracking-wider font-bold bg-[var(--raised)] border border-[var(--border)] text-[var(--secondary-text)]">
              Backend Architecture Simulator
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--primary-text)]">
            REST lifecycle,{' '}
            <span className="font-[var(--serif)] italic font-normal text-[var(--accent)]">
              traced.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--secondary-text)] max-w-[640px] leading-relaxed">
            Inspect how authenticated client requests traverse ingress gateways, JWT validation middleware, schema models, and database sinks in modern Python / FastAPI systems.
          </p>
        </div>

        {/* API Console Housing */}
        <div className="bg-[var(--surface)] border border-[var(--border-strong)] p-6 md:p-8 shadow-2xl">
          {/* Endpoint Selector Tabs */}
          <div className="flex flex-wrap gap-2 pb-6 mb-6 border-b border-[var(--border)] font-[var(--mono)] text-xs">
            {Object.keys(endpoints).map((key) => {
              const ep = endpoints[key];
              const isActive = selectedEndpointKey === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelectEndpoint(key)}
                  className={`min-h-[40px] px-3.5 py-1.5 border transition-colors flex items-center gap-2 ${
                    isActive
                      ? 'border-[var(--accent)] bg-[rgba(199,255,69,0.08)] text-[var(--accent)] font-bold'
                      : 'border-[var(--border)] text-[var(--secondary-text)] hover:text-[var(--primary-text)] bg-[var(--surface-subtle)]'
                  }`}
                >
                  <span className="px-1.5 py-0.5 bg-[var(--raised)] text-[0.65rem] font-bold text-[var(--primary-text)]">
                    {ep.method}
                  </span>
                  <span>{ep.endpoint}</span>
                </button>
              );
            })}
          </div>

          {/* Request Header Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 bg-[#0A0B09] border border-[var(--border)] font-[var(--mono)] text-xs">
            <span className="px-3 py-2 bg-[var(--raised)] text-[var(--accent)] font-bold border border-[var(--border)] self-start sm:self-auto">
              {method}
            </span>

            <input
              type="text"
              readOnly
              value={endpoints[selectedEndpointKey].endpoint}
              className="flex-1 bg-transparent text-[var(--primary-text)] font-[var(--mono)] text-xs sm:text-sm outline-none px-2"
            />

            <button
              type="button"
              disabled={isExecuting}
              onClick={handleExecuteRequest}
              className="min-h-[40px] px-6 py-2 bg-[var(--accent)] text-[var(--bg)] font-[var(--mono)] text-xs font-bold uppercase tracking-wider hover:bg-[#d8ff6b] transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isExecuting ? 'Dispatching...' : 'Send Request'}</span>
            </button>
          </div>

          {/* Request & Response Split Screen */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 font-[var(--mono)] text-xs">
            {/* Left: Request Payload & Headers */}
            <div className="p-4 bg-[var(--surface-subtle)] border border-[var(--border)] flex flex-col justify-between">
              <div>
                <span className="text-[var(--accent)] font-bold uppercase tracking-wider block mb-2">
                  REQUEST PAYLOAD &amp; HEADERS:
                </span>
                <div className="text-[0.72rem] text-[var(--muted)] space-y-1 mb-3">
                  <div>Content-Type: application/json</div>
                  <div>Authorization: Bearer [JWT_TOKEN_VERIFIED]</div>
                  <div>X-Request-ID: req_94821a30</div>
                </div>

                <label htmlFor="api-body-input" className="text-[var(--secondary-text)] block mb-1">
                  JSON Body:
                </label>
                <textarea
                  id="api-body-input"
                  rows={6}
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  disabled={method === 'GET'}
                  className="w-full p-3 bg-[#0A0B09] border border-[var(--border)] text-[0.75rem] text-[var(--primary-text)] font-[var(--mono)] outline-none focus:border-[var(--accent)] disabled:opacity-50 resize-none"
                />
              </div>

              <span className="text-[0.68rem] text-[var(--muted)] mt-2">
                Editable JSON body for POST simulation testing.
              </span>
            </div>

            {/* Right: Response Inspector & Trace */}
            <div className="p-4 bg-[var(--surface-subtle)] border border-[var(--border)] flex flex-col justify-between min-h-[260px]">
              {responseOutput ? (
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border)]">
                    <span className="text-[var(--accent)] font-bold uppercase tracking-wider">
                      RESPONSE OUTPUT:
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-800 text-emerald-400 font-bold text-[0.7rem]">
                        STATUS: {responseOutput.status} OK
                      </span>
                      <span className="text-[0.7rem] text-[var(--muted)] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[var(--muted)]" />
                        <span>{responseOutput.latency}</span>
                      </span>
                    </div>
                  </div>

                  <pre className="p-3 bg-[#0A0B09] border border-[var(--border)] text-[0.72rem] text-[var(--primary-text)] overflow-x-auto max-h-[160px] leading-relaxed">
                    {JSON.stringify(responseOutput.body, null, 2)}
                  </pre>

                  <div className="mt-4 space-y-1 text-[0.7rem] text-[var(--secondary-text)]">
                    <strong className="text-[var(--accent)] block text-[0.68rem] uppercase tracking-wider mb-1">
                      Lifecycle Trace:
                    </strong>
                    {responseOutput.steps.map((st, i) => (
                      <div key={i}>{st}</div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center text-xs text-[var(--muted)]">
                  <Server className="w-8 h-8 mb-2 opacity-40 text-[var(--accent)]" />
                  <span>Click "Send Request" to trace the API lifecycle.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
