import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface PythonAutomationSvgProps {
  className?: string;
}

export const PythonAutomationSvg: React.FC<PythonAutomationSvgProps> = ({ className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 540 200"
        className="w-full h-auto max-h-[220px]"
        role="img"
        aria-labelledby="py-flow-title py-flow-desc"
      >
        <title id="py-flow-title">Python Automation &amp; Log Triage Architecture</title>
        <desc id="py-flow-desc">
          System diagram showing automated log collection, regex event parsing, rule-based threat classification, and alert dispatch with archive routing.
        </desc>

        <defs>
          <pattern id="py-grid-mini" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(240, 240, 233, 0.04)" strokeWidth="0.8" />
          </pattern>
        </defs>

        <rect width="540" height="200" fill="url(#py-grid-mini)" />

        {/* Pipeline connecting spine */}
        <path
          d="M 50 100 L 150 100 L 220 55 L 340 55 L 420 55 L 490 55"
          fill="none"
          stroke="rgba(199, 255, 69, 0.4)"
          strokeWidth="1.4"
        />
        <path
          d="M 340 55 L 390 145 L 490 145"
          fill="none"
          stroke="rgba(240, 240, 233, 0.2)"
          strokeWidth="1.2"
          strokeDasharray="4 3"
        />

        {/* Data flow packet */}
        {!shouldReduceMotion && (
          <motion.circle
            r="3"
            fill="var(--accent)"
            animate={{
              cx: [50, 150, 220, 340, 420, 490],
              cy: [100, 100, 55, 55, 55, 55]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        )}

        {/* Node 1: Log Collection Daemon */}
        <g transform="translate(60, 100)">
          <rect x="-18" y="-18" width="36" height="36" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.2" />
          <path d="M -8 -8 L 8 -8 M -8 0 L 8 0 M -8 8 L 4 8" stroke="var(--accent)" strokeWidth="1.2" />
          <text y="-26" textAnchor="middle" fontFamily="var(--mono)" fontSize="8.5" fontWeight="700" fill="var(--secondary-text)">
            LOG_COLLECT
          </text>
          <text y="32" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--muted)">
            SYS_JOURNAL
          </text>
        </g>

        {/* Node 2: Regex Event Parser */}
        <g transform="translate(180, 100)">
          <circle r="16" fill="var(--raised)" stroke="rgba(240, 240, 233, 0.3)" strokeWidth="1.2" />
          <text y="4" textAnchor="middle" fontFamily="var(--mono)" fontSize="10" fontWeight="700" fill="var(--primary-text)">
            .*
          </text>
          <text y="-24" textAnchor="middle" fontFamily="var(--mono)" fontSize="8.5" fontWeight="700" fill="var(--primary-text)">
            REGEX_PARSE
          </text>
          <text y="32" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--muted)">
            TOKENIZE / NORM
          </text>
        </g>

        {/* Node 3: Threat Classifier */}
        <g transform="translate(300, 55)">
          <polygon points="0,-16 18,0 0,16 -18,0" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
          <text y="-24" textAnchor="middle" fontFamily="var(--mono)" fontSize="8.5" fontWeight="700" fill="var(--accent)">
            CLASSIFY
          </text>
          <text y="30" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--muted)">
            RULE_MATCH
          </text>
        </g>

        {/* Node 4A: Critical Alert Dispatch */}
        <g transform="translate(460, 55)">
          <circle r="14" fill="var(--raised)" stroke="var(--accent)" strokeWidth="1.5" />
          <polygon points="-4,-6 6,0 -4,6" fill="var(--accent)" />
          <text y="-22" textAnchor="middle" fontFamily="var(--mono)" fontSize="8.5" fontWeight="700" fill="var(--accent)">
            ALERT_DISPATCH
          </text>
          <text y="30" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--muted)">
            WEBHOOK / SOC
          </text>
        </g>

        {/* Node 4B: Structured Archive */}
        <g transform="translate(460, 145)">
          <rect x="-24" y="-12" width="48" height="24" fill="var(--surface)" stroke="rgba(240, 240, 233, 0.2)" strokeWidth="1" />
          <text y="4" textAnchor="middle" fontFamily="var(--mono)" fontSize="8" fill="var(--secondary-text)">
            ARCHIVE
          </text>
          <text y="28" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--muted)">
            JSON_LEDGER
          </text>
        </g>
      </svg>
    </div>
  );
};

