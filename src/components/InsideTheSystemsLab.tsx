import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Shield, Cpu, Server, Terminal, RotateCcw, Info, CheckCircle2 } from 'lucide-react';

type LabType = 'cyber' | 'ai' | 'backend' | 'automation';

interface NodeInfo {
  id: string;
  name: string;
  protocol: string;
  duty: string;
  telemetry: string;
}

export const InsideTheSystemsLab: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeLab, setActiveLab] = useState<LabType>('cyber');
  const [selectedNode, setSelectedNode] = useState<string>('node-1');

  // Node telemetry records per lab
  const labData: Record<LabType, { title: string; subtitle: string; desc: string; nodes: Record<string, NodeInfo> }> = {
    cyber: {
      title: 'Defensive Cybersecurity Pipeline',
      subtitle: 'INGRESS FILTERING & THREAT ISOLATION',
      desc: 'Simulates perimeter packet inspection, regex-based SQLi / XSS anomaly detection, and sanitization before request execution.',
      nodes: {
        'node-1': { id: 'node-1', name: 'HTTP Ingress Gateway', protocol: 'TLS 1.3 / Port 443', duty: 'Terminates encrypted traffic, extracts source IP, and inspects rate limits.', telemetry: 'ACTIVE // RATE: 42 REQ/S' },
        'node-2': { id: 'node-2', name: 'Input Validation Boundary', protocol: 'Pydantic / Regex Filters', duty: 'Rejects malformed JSON schemas and strips null-byte attack strings.', telemetry: 'PASS // ZERO ANOMALIES' },
        'node-3': { id: 'node-3', name: 'Heuristic Threat Engine', protocol: 'OWASP Core Rule Set', duty: 'Evaluates payload signatures against common SQLi / XSS heuristics.', telemetry: 'ISOLATION ARMED' },
        'node-4': { id: 'node-4', name: 'Sanitized App Destination', protocol: 'Parameterized Queries', duty: 'Dispatches validated arguments into prepared database statements.', telemetry: 'SECURE EXECUTION' }
      }
    },
    ai: {
      title: 'Constrained AI Agent Loop',
      subtitle: 'GROUNDED RETRIEVAL & GUARDRAIL GATE',
      desc: 'Demonstrates a secure ReAct reasoning loop with vector store retrieval and strict permission boundaries before tool execution.',
      nodes: {
        'node-1': { id: 'node-1', name: 'Prompt Normalizer', protocol: 'Unicode Normalization', duty: 'Strips adversarial Unicode wrappers and normalizes multi-turn prompt templates.', telemetry: 'NORMALIZED' },
        'node-2': { id: 'node-2', name: 'Vector Store Index', protocol: 'HNSW / Cosine Similarity', duty: 'Performs semantic retrieval against grounded markdown documents.', telemetry: 'TOP-K RETRIEVED (K=4)' },
        'node-3': { id: 'node-3', name: 'LLM Reasoning Core', protocol: 'Constrained JSON Mode', duty: 'Synthesizes context with temperature=0.2 to prevent speculative hallucination.', telemetry: 'TOKENS: 248 // CONFIDENCE: 0.94' },
        'node-4': { id: 'node-4', name: 'Sandbox Tool Gate', protocol: 'Strict Schema Validator', duty: 'Validates API parameters before permitting network or file system operations.', telemetry: 'SANDBOX LOCKED' }
      }
    },
    backend: {
      title: 'Backend API Request Lifecycle',
      subtitle: 'ASYNC FASTAPI & POOLED POSTGRESQL',
      desc: 'Traces an authenticated REST API call through JWT signature verification, route controller, and pooled relational query execution.',
      nodes: {
        'node-1': { id: 'node-1', name: 'Client Ingress', protocol: 'HTTP/2 REST', duty: 'Dispatches JSON payloads with Authorization Bearer header.', telemetry: 'CONNECT: 12ms' },
        'node-2': { id: 'node-2', name: 'JWT Auth Middleware', protocol: 'HMAC-SHA256', duty: 'Verifies cryptographically signed token claims and expiry timestamps.', telemetry: 'CLAIMS: [USER_ROLE: DEV]' },
        'node-3': { id: 'node-3', name: 'Async Route Handler', protocol: 'FastAPI / Python 3.11', duty: 'Orchestrates business logic and serialization using async event loops.', telemetry: 'LATENCY: 4.8ms' },
        'node-4': { id: 'node-4', name: 'Relational Database Sink', protocol: 'PostgreSQL / asyncpg', duty: 'Executes indexed query with transactional isolation (Read Committed).', telemetry: 'POOL: 12/20 CONNS' }
      }
    },
    automation: {
      title: 'Python Automation & Log Triage',
      subtitle: 'DAEMON INGESTION & DISPATCH BUS',
      desc: 'Illustrates an automated server log triage script: collecting syslog streams, applying regex filters, and routing alerts.',
      nodes: {
        'node-1': { id: 'node-1', name: 'Syslog Collector', protocol: 'Tail Stream / File I/O', duty: 'Monitors auth.log and nginx access logs in non-blocking FIFO queues.', telemetry: 'STREAM: 180 LINES/MIN' },
        'node-2': { id: 'node-2', name: 'Regex Parser Daemon', protocol: 'Compiled Python re', duty: 'Extracts IP addresses, HTTP status codes, and failed authentication timestamps.', telemetry: 'MATCH LATENCY: < 1ms' },
        'node-3': { id: 'node-3', name: 'Threshold Alert Rule', protocol: 'Stateful Sliding Window', duty: 'Triggers when failed SSH attempts exceed 5 failures within 60 seconds.', telemetry: 'RULE: 0 TRIGGERS' },
        'node-4': { id: 'node-4', name: 'Notification & Archive', protocol: 'SMTP / S3 CSV Storage', duty: 'Dispatches structured telemetry reports and archives raw parsed JSON.', telemetry: 'ARCHIVE OK' }
      }
    }
  };

  const currentLab = labData[activeLab];
  const currentNode = currentLab.nodes[selectedNode] || currentLab.nodes['node-1'];

  const handleLabChange = (lab: LabType) => {
    setActiveLab(lab);
    setSelectedNode('node-1');
  };

  return (
    <section id="systems-lab" className="py-20 md:py-28 border-b border-[var(--border)] bg-[var(--surface-subtle)] relative">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
              Laboratory // Inside the Systems
            </span>
            <span className="px-2 py-0.5 text-[0.65rem] font-[var(--mono)] uppercase tracking-wider font-bold bg-[var(--raised)] border border-[var(--border)] text-[var(--secondary-text)]">
              Interactive Architecture Explorer
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--primary-text)]">
            How systems communicate,{' '}
            <span className="font-[var(--serif)] italic font-normal text-[var(--accent)]">
              inspected.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--secondary-text)] max-w-[640px] leading-relaxed">
            Click into each technical layer to examine protocols, data boundaries, and operational duties. All diagrams represent verified architectural models created for educational and design clarity.
          </p>
        </div>

        {/* Laboratory Tab Bar */}
        <div className="flex flex-wrap gap-2 border-b border-[var(--border)] pb-4 mb-8 font-[var(--mono)] text-xs">
          {[
            { id: 'cyber', label: '01 // Cybersecurity', icon: Shield },
            { id: 'ai', label: '02 // AI Agentics', icon: Cpu },
            { id: 'backend', label: '03 // Backend REST', icon: Server },
            { id: 'automation', label: '04 // Python Daemon', icon: Terminal }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeLab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleLabChange(tab.id as LabType)}
                className={`min-h-[42px] px-4 py-2 border inline-flex items-center gap-2 transition-colors ${
                  isActive
                    ? 'border-[var(--accent)] bg-[rgba(199,255,69,0.08)] text-[var(--accent)] font-bold'
                    : 'border-[var(--border)] text-[var(--secondary-text)] hover:text-[var(--primary-text)] bg-[var(--surface)]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Lab Canvas & Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Visual Diagram (7 cols) */}
          <div className="lg:col-span-7 bg-[var(--surface)] border border-[var(--border)] p-6 relative">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--border)] font-[var(--mono)] text-xs">
              <span className="text-[var(--accent)] font-bold">{currentLab.subtitle}</span>
              <span className="text-[var(--muted)] text-[0.7rem]">[CLICK NODES TO INSPECT]</span>
            </div>

            {/* Custom Interactive SVG Flow */}
            <div className="w-full aspect-[540/220] relative">
              <svg
                viewBox="0 0 540 220"
                className="w-full h-full select-none"
                role="img"
                aria-label={`${currentLab.title} schematic`}
              >
                <defs>
                  <pattern id="lab-grid-pat" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(240, 240, 233, 0.03)" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="540" height="220" fill="url(#lab-grid-pat)" />

                {/* Connecting Bus Lines */}
                <line x1="80" y1="110" x2="200" y2="110" stroke="rgba(199, 255, 69, 0.4)" strokeWidth="1.5" />
                <line x1="200" y1="110" x2="330" y2="110" stroke="rgba(199, 255, 69, 0.4)" strokeWidth="1.5" />
                <line x1="330" y1="110" x2="460" y2="110" stroke="rgba(199, 255, 69, 0.4)" strokeWidth="1.5" />

                {/* Animated Packet Flow */}
                {!shouldReduceMotion && (
                  <motion.circle
                    r="3.2"
                    fill="var(--accent)"
                    animate={{ cx: [80, 200, 330, 460], cy: [110, 110, 110, 110] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
                  />
                )}

                {/* Interactive Stage Nodes */}
                {[
                  { id: 'node-1', x: 80, y: 110, label: 'INGRESS' },
                  { id: 'node-2', x: 200, y: 110, label: 'VALIDATION' },
                  { id: 'node-3', x: 330, y: 110, label: 'PROCESSING' },
                  { id: 'node-4', x: 460, y: 110, label: 'DESTINATION' }
                ].map((n, i) => {
                  const isSelected = selectedNode === n.id;
                  return (
                    <g
                      key={n.id}
                      onClick={() => setSelectedNode(n.id)}
                      className="cursor-pointer transition-transform hover:scale-105"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedNode(n.id);
                        }
                      }}
                    >
                      <rect
                        x={n.x - 48}
                        y={n.y - 36}
                        width="96"
                        height="72"
                        fill={isSelected ? '#1D211C' : '#131512'}
                        stroke={isSelected ? 'var(--accent)' : 'rgba(240, 240, 233, 0.18)'}
                        strokeWidth={isSelected ? 2 : 1}
                      />
                      <circle cx={n.x} cy={n.y - 12} r="5" fill={isSelected ? 'var(--accent)' : 'rgba(199, 255, 69, 0.4)'} />
                      <text
                        x={n.x}
                        y={n.y + 10}
                        textAnchor="middle"
                        fill={isSelected ? 'var(--accent)' : 'var(--primary-text)'}
                        fontFamily="var(--mono)"
                        fontSize="8.5"
                        fontWeight="700"
                        letterSpacing="0.05em"
                      >
                        STAGE {i + 1}
                      </text>
                      <text
                        x={n.x}
                        y={n.y + 24}
                        textAnchor="middle"
                        fill="var(--secondary-text)"
                        fontFamily="var(--mono)"
                        fontSize="7.5"
                      >
                        {n.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Disclaimer strip */}
            <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[0.68rem] font-[var(--mono)] text-[var(--muted)]">
              <span>[SIMULATION ENVIRONMENT // STATIC PLAYGROUND]</span>
              <span>ZERO EXTERNAL TRANSMISSION</span>
            </div>
          </div>

          {/* Right Inspector Telemetry Card (5 cols) */}
          <div className="lg:col-span-5 bg-[var(--surface)] border border-[var(--border)] p-6 md:p-8 flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-wider">
                  TELEMETRY // {currentNode.id.toUpperCase()}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedNode('node-1')}
                  className="inline-flex items-center gap-1.5 text-[0.7rem] font-[var(--mono)] text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              <h3 className="text-xl font-bold text-[var(--primary-text)] mb-2">
                {currentNode.name}
              </h3>

              <div className="mb-4 inline-block px-2.5 py-1 bg-[var(--raised)] border border-[var(--border)] font-[var(--mono)] text-[0.72rem] text-[var(--accent)]">
                PROTOCOL: {currentNode.protocol}
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[var(--secondary-text)] leading-relaxed">
                <div>
                  <strong className="text-[var(--primary-text)] block font-[var(--mono)] text-[0.7rem] uppercase tracking-wider text-[var(--muted)] mb-1">
                    System Responsibility:
                  </strong>
                  <p>{currentNode.duty}</p>
                </div>

                <div className="p-3 bg-[var(--raised)] border border-[var(--border)]">
                  <strong className="text-[var(--accent)] block font-[var(--mono)] text-[0.7rem] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                    Live Trace Readout:
                  </strong>
                  <code className="font-[var(--mono)] text-xs text-[var(--primary-text)] block">
                    {currentNode.telemetry}
                  </code>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)] text-[0.72rem] font-[var(--mono)] text-[var(--muted)] flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
              <span>Use arrow keys or click nodes to cycle through pipeline layers.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
