import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface HrSuiteArchitectureSvgProps {
  className?: string;
}

export const HrSuiteArchitectureSvg: React.FC<HrSuiteArchitectureSvgProps> = ({ className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 540 180"
        className="w-full h-auto max-h-[200px]"
        role="img"
        aria-labelledby="hr-title hr-desc"
      >
        <title id="hr-title">HR Recruitment Suite Conceptual Architecture</title>
        <desc id="hr-desc">
          Conceptual schematic illustrating candidate resume ingestion, NLP entity extraction, anonymization filter, and recruiter pipeline triage.
        </desc>

        <defs>
          <pattern id="hr-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(240, 240, 233, 0.04)" strokeWidth="0.8" />
          </pattern>
        </defs>

        <rect width="540" height="180" fill="url(#hr-grid)" />

        {/* Conceptual Indicator Tag */}
        <g transform="translate(18, 22)">
          <rect x="0" y="0" width="120" height="18" fill="var(--raised)" stroke="rgba(240, 240, 233, 0.2)" strokeWidth="0.8" />
          <text x="60" y="12" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fontWeight="700" fill="var(--accent)" letterSpacing="0.08em">
            [CONCEPTUAL SCHEMA]
          </text>
        </g>

        {/* Path Flow */}
        <path
          d="M 50 100 L 140 100 L 210 55 L 330 55 L 400 100 L 485 100"
          fill="none"
          stroke="rgba(199, 255, 69, 0.35)"
          strokeWidth="1.3"
        />
        <path
          d="M 140 100 L 210 145 L 330 145 L 400 100"
          fill="none"
          stroke="rgba(240, 240, 233, 0.18)"
          strokeWidth="1.1"
          strokeDasharray="4 3"
        />

        {!shouldReduceMotion && (
          <motion.circle
            r="3"
            fill="var(--accent)"
            animate={{
              cx: [50, 140, 210, 330, 400, 485],
              cy: [100, 100, 55, 55, 100, 100]
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )}

        {/* Step 1: Candidate Ingestion */}
        <g transform="translate(50, 100)">
          <rect x="-14" y="-14" width="28" height="28" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.2" />
          <path d="M -6 -4 L 6 -4 M -6 0 L 6 0 M -6 4 L 2 4" stroke="var(--accent)" strokeWidth="1" />
          <text y="-22" textAnchor="middle" fontFamily="var(--mono)" fontSize="8.5" fontWeight="700" fill="var(--secondary-text)">
            APPLY_INGEST
          </text>
          <text y="28" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--muted)">
            PDF / DOCX
          </text>
        </g>

        {/* Step 2A: Skill Taxonomy Extraction */}
        <g transform="translate(270, 55)">
          <rect x="-45" y="-14" width="90" height="28" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1" />
          <text y="4" textAnchor="middle" fontFamily="var(--mono)" fontSize="8" fontWeight="700" fill="var(--accent)">
            SKILL_PARSER
          </text>
          <text y="-22" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--muted)">
            TAXONOMY MATCH
          </text>
        </g>

        {/* Step 2B: PII Blind Filter */}
        <g transform="translate(270, 145)">
          <rect x="-45" y="-14" width="90" height="28" fill="var(--surface)" stroke="rgba(240, 240, 233, 0.2)" strokeWidth="1" />
          <text y="4" textAnchor="middle" fontFamily="var(--mono)" fontSize="8" fontWeight="700" fill="var(--primary-text)">
            PII_MASKING
          </text>
          <text y="28" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--muted)">
            UNBIASED REVIEW
          </text>
        </g>

        {/* Step 3: Recruiter Triage Pipeline */}
        <g transform="translate(485, 100)">
          <polygon points="0,-14 14,0 0,14 -14,0" fill="var(--raised)" stroke="var(--accent)" strokeWidth="1.5" />
          <text y="-22" textAnchor="middle" fontFamily="var(--mono)" fontSize="8.5" fontWeight="700" fill="var(--accent)">
            STAGE_GATE
          </text>
          <text y="28" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--muted)">
            INTERVIEW CALL
          </text>
        </g>
      </svg>
    </div>
  );
};

