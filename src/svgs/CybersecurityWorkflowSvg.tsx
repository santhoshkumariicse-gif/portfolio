import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface CybersecurityWorkflowSvgProps {
  className?: string;
}

export const CybersecurityWorkflowSvg: React.FC<CybersecurityWorkflowSvgProps> = ({ className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 540 200"
        className="w-full h-auto max-h-[220px]"
        role="img"
        aria-labelledby="cyber-flow-title cyber-flow-desc"
      >
        <title id="cyber-flow-title">Defensive Cybersecurity Inspection Pipeline</title>
        <desc id="cyber-flow-desc">
          Architecture schematic detailing HTTP request ingress, input validation, dual-channel SQLi and XSS inspection sinks, and verified destination filtering.
        </desc>

        <defs>
          <pattern id="sec-grid-mini" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(240, 240, 233, 0.04)" strokeWidth="0.8" />
          </pattern>
        </defs>

        <rect width="540" height="200" fill="url(#sec-grid-mini)" />

        {/* Pipeline connecting path */}
        <path
          d="M 40 100 L 130 100 L 175 55 L 265 55 L 310 100 L 370 100 L 415 145 L 480 145"
          fill="none"
          stroke="rgba(199, 255, 69, 0.35)"
          strokeWidth="1.4"
        />
        <path
          d="M 130 100 L 175 145 L 265 145 L 310 100"
          fill="none"
          stroke="rgba(199, 255, 69, 0.35)"
          strokeWidth="1.4"
          strokeDasharray="4 3"
        />
        <line
          x1="220"
          y1="55"
          x2="220"
          y2="145"
          stroke="rgba(240, 240, 233, 0.12)"
          strokeWidth="1"
          strokeDasharray="2 3"
        />

        {/* Data pulse packet moving along top inspection path */}
        {!shouldReduceMotion && (
          <motion.circle
            r="3"
            fill="var(--accent)"
            animate={{
              cx: [40, 130, 175, 265, 310, 370, 480],
              cy: [100, 100, 55, 55, 100, 100, 145]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )}

        {/* Stage 1: Ingress Gateway */}
        <g transform="translate(40, 100)">
          <circle r="12" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
          <circle r="4" fill="var(--accent)" />
          <text y="-20" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fontWeight="700" fill="var(--secondary-text)">
            INGRESS
          </text>
          <text y="28" textAnchor="middle" fontFamily="var(--mono)" fontSize="7.5" fill="var(--muted)">
            HTTP / REQ
          </text>
        </g>

        {/* Stage 2: Input Sanitization */}
        <g transform="translate(130, 100)">
          <rect x="-10" y="-10" width="20" height="20" fill="var(--raised)" stroke="rgba(240, 240, 233, 0.25)" strokeWidth="1.2" />
          <text y="-18" textAnchor="middle" fontFamily="var(--mono)" fontSize="8.5" fontWeight="700" fill="var(--primary-text)">
            NORMALIZE
          </text>
          <text y="26" textAnchor="middle" fontFamily="var(--mono)" fontSize="7.5" fill="var(--muted)">
            CHAR_ENCODE
          </text>
        </g>

        {/* Stage 3A: SQLi Inspection */}
        <g transform="translate(220, 55)">
          <rect x="-35" y="-14" width="70" height="28" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1" />
          <text y="4" textAnchor="middle" fontFamily="var(--mono)" fontSize="8" fontWeight="700" fill="var(--accent)">
            SQLi_FILTER
          </text>
          <text y="-20" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--muted)">
            PARAMETER_BIND
          </text>
        </g>

        {/* Stage 3B: XSS Inspection */}
        <g transform="translate(220, 145)">
          <rect x="-35" y="-14" width="70" height="28" fill="var(--surface)" stroke="rgba(240, 240, 233, 0.22)" strokeWidth="1" />
          <text y="4" textAnchor="middle" fontFamily="var(--mono)" fontSize="8" fontWeight="700" fill="var(--primary-text)">
            XSS_ESCAPE
          </text>
          <text y="28" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--muted)">
            DOM_SANITIZER
          </text>
        </g>

        {/* Stage 4: Evaluation Gate */}
        <g transform="translate(340, 100)">
          <polygon points="0,-12 12,0 0,12 -12,0" fill="var(--raised)" stroke="var(--accent)" strokeWidth="1.2" />
          <text y="-20" textAnchor="middle" fontFamily="var(--mono)" fontSize="8.5" fontWeight="700" fill="var(--accent)">
            EVAL_GATE
          </text>
          <text y="26" textAnchor="middle" fontFamily="var(--mono)" fontSize="7.5" fill="var(--muted)">
            PASS / DROP
          </text>
        </g>

        {/* Stage 5: Verified Destination */}
        <g transform="translate(480, 145)">
          <circle r="14" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="3 2" />
          <circle r="7" fill="var(--accent)" />
          <text y="-22" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fontWeight="700" fill="var(--accent)">
            VERIFIED_SINK
          </text>
          <text y="28" textAnchor="middle" fontFamily="var(--mono)" fontSize="7.5" fill="var(--muted)">
            SECURE EXEC
          </text>
        </g>
      </svg>
    </div>
  );
};

