import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RdaArchitectureSvgProps {
  className?: string;
}

export const RdaArchitectureSvg: React.FC<RdaArchitectureSvgProps> = ({ className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 540 180"
        className="w-full h-auto max-h-[200px]"
        role="img"
        aria-labelledby="rda-title rda-desc"
      >
        <title id="rda-title">RDA / LorryBook Conceptual Architecture Schematic</title>
        <desc id="rda-desc">
          Conceptual diagram showing freight order dispatch, driver matching queue, geofenced GPS tracking, and digital proof-of-delivery settlement.
        </desc>

        <defs>
          <pattern id="rda-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(240, 240, 233, 0.04)" strokeWidth="0.8" />
          </pattern>
        </defs>

        <rect width="540" height="180" fill="url(#rda-grid)" />

        {/* Conceptual Indicator Tag */}
        <g transform="translate(18, 22)">
          <rect x="0" y="0" width="120" height="18" fill="var(--raised)" stroke="rgba(240, 240, 233, 0.2)" strokeWidth="0.8" />
          <text x="60" y="12" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fontWeight="700" fill="var(--accent)" letterSpacing="0.08em">
            [CONCEPTUAL SCHEMA]
          </text>
        </g>

        {/* Pipeline connecting path */}
        <path
          d="M 50 100 L 150 100 L 220 60 L 330 60 L 400 100 L 485 100"
          fill="none"
          stroke="rgba(199, 255, 69, 0.35)"
          strokeWidth="1.3"
        />
        <path
          d="M 150 100 L 220 140 L 330 140 L 400 100"
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
              cx: [50, 150, 220, 330, 400, 485],
              cy: [100, 100, 60, 60, 100, 100]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )}

        {/* Stage 1: Shipper Dispatch Ingress */}
        <g transform="translate(50, 100)">
          <circle r="12" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.2" />
          <circle r="4" fill="var(--accent)" />
          <text y="-22" textAnchor="middle" fontFamily="var(--mono)" fontSize="8.5" fontWeight="700" fill="var(--secondary-text)">
            DISPATCH
          </text>
          <text y="28" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--muted)">
            LOAD_ORDER
          </text>
        </g>

        {/* Stage 2A: Matching Engine */}
        <g transform="translate(275, 60)">
          <rect x="-45" y="-14" width="90" height="28" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1" />
          <text y="4" textAnchor="middle" fontFamily="var(--mono)" fontSize="8" fontWeight="700" fill="var(--accent)">
            DRIVER_MATCH
          </text>
          <text y="-22" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--muted)">
            PROXIMITY QUEUE
          </text>
        </g>

        {/* Stage 2B: Route & Geofence Matrix */}
        <g transform="translate(275, 140)">
          <rect x="-45" y="-14" width="90" height="28" fill="var(--surface)" stroke="rgba(240, 240, 233, 0.2)" strokeWidth="1" />
          <text y="4" textAnchor="middle" fontFamily="var(--mono)" fontSize="8" fontWeight="700" fill="var(--primary-text)">
            GEOFENCE_GPS
          </text>
          <text y="28" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--muted)">
            CORRIDOR CHECK
          </text>
        </g>

        {/* Stage 3: POD Settlement */}
        <g transform="translate(485, 100)">
          <circle r="14" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeDasharray="3 2" />
          <circle r="6" fill="var(--accent)" />
          <text y="-22" textAnchor="middle" fontFamily="var(--mono)" fontSize="8.5" fontWeight="700" fill="var(--accent)">
            POD_SETTLE
          </text>
          <text y="28" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--muted)">
            TRIP_CLOSE
          </text>
        </g>
      </svg>
    </div>
  );
};

