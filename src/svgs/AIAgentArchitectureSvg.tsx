import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AIAgentArchitectureSvgProps {
  className?: string;
}

export const AIAgentArchitectureSvg: React.FC<AIAgentArchitectureSvgProps> = ({ className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 560 210"
        className="w-full h-auto max-h-[230px]"
        role="img"
        aria-labelledby="ai-agent-title ai-agent-desc"
      >
        <title id="ai-agent-title">Autonomous AI Agent Architecture Diagram</title>
        <desc id="ai-agent-desc">
          Engineering diagram showing the ReAct loop: prompt input, reasoning/planning router, vector retrieval, sandboxed tool execution, and guardrail validation.
        </desc>

        <defs>
          <pattern id="agent-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(240, 240, 233, 0.04)" strokeWidth="0.8" />
          </pattern>
        </defs>

        <rect width="560" height="210" fill="url(#agent-grid)" />

        {/* Central Orchestration Flow Lines */}
        <path
          d="M 45 105 L 140 105 L 235 60 L 350 60 L 440 105 L 515 105"
          fill="none"
          stroke="rgba(199, 255, 69, 0.4)"
          strokeWidth="1.4"
        />
        <path
          d="M 140 105 L 235 150 L 350 150 L 440 105"
          fill="none"
          stroke="rgba(199, 255, 69, 0.3)"
          strokeWidth="1.2"
          strokeDasharray="4 3"
        />
        <line
          x1="290"
          y1="60"
          x2="290"
          y2="150"
          stroke="rgba(240, 240, 233, 0.15)"
          strokeWidth="1"
          strokeDasharray="2 3"
        />

        {/* Dynamic packet pulse */}
        {!shouldReduceMotion && (
          <motion.circle
            r="3"
            fill="var(--accent)"
            animate={{
              cx: [45, 140, 235, 350, 440, 515],
              cy: [105, 105, 60, 60, 105, 105]
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )}

        {/* Stage 1: User / System Input */}
        <g transform="translate(50, 105)">
          <circle r="14" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.2" />
          <circle r="4" fill="var(--accent)" />
          <text y="-24" textAnchor="middle" fontFamily="var(--mono)" fontSize="8.5" fontWeight="700" fill="var(--secondary-text)">
            INPUT
          </text>
          <text y="28" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--muted)">
            PROMPT / EVENT
          </text>
        </g>

        {/* Stage 2: Reasoning & Planning Router (ReAct Core) */}
        <g transform="translate(150, 105)">
          <rect x="-14" y="-14" width="28" height="28" fill="var(--raised)" stroke="rgba(240, 240, 233, 0.25)" strokeWidth="1.2" />
          <path d="M -6 -6 L 6 6 M -6 6 L 6 -6" stroke="var(--accent)" strokeWidth="1.2" />
          <text y="-24" textAnchor="middle" fontFamily="var(--mono)" fontSize="8.5" fontWeight="700" fill="var(--primary-text)">
            REASONING
          </text>
          <text y="30" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--muted)">
            ReAct PLANNER
          </text>
        </g>

        {/* Stage 3A: Vector Retrieval Store */}
        <g transform="translate(290, 60)">
          <rect x="-42" y="-14" width="84" height="28" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1" />
          <text y="4" textAnchor="middle" fontFamily="var(--mono)" fontSize="8" fontWeight="700" fill="var(--accent)">
            VECTOR_RETRIEVAL
          </text>
          <text y="-22" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--muted)">
            SEMANTIC RAG
          </text>
        </g>

        {/* Stage 3B: Sandboxed Tool Execution */}
        <g transform="translate(290, 150)">
          <rect x="-42" y="-14" width="84" height="28" fill="var(--surface)" stroke="rgba(240, 240, 233, 0.22)" strokeWidth="1" />
          <text y="4" textAnchor="middle" fontFamily="var(--mono)" fontSize="8" fontWeight="700" fill="var(--primary-text)">
            TOOL_EXECUTION
          </text>
          <text y="28" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--muted)">
            ISOLATED AGENT
          </text>
        </g>

        {/* Stage 4: Guardrail Validation */}
        <g transform="translate(430, 105)">
          <polygon points="0,-14 14,0 0,14 -14,0" fill="var(--raised)" stroke="var(--accent)" strokeWidth="1.5" />
          <text y="-24" textAnchor="middle" fontFamily="var(--mono)" fontSize="8.5" fontWeight="700" fill="var(--accent)">
            GUARDRAIL
          </text>
          <text y="28" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--muted)">
            INJECTION FILTER
          </text>
        </g>

        {/* Stage 5: Verified Output */}
        <g transform="translate(515, 105)">
          <circle r="14" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeDasharray="3 2" />
          <circle r="6" fill="var(--accent)" />
          <text y="-24" textAnchor="middle" fontFamily="var(--mono)" fontSize="8.5" fontWeight="700" fill="var(--accent)">
            VALIDATED
          </text>
          <text y="28" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--muted)">
            SAFE SINK
          </text>
        </g>
      </svg>
    </div>
  );
};

