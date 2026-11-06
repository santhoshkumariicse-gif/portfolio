import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface CtfMatrixSvgProps {
  className?: string;
}

export const CtfMatrixSvg: React.FC<CtfMatrixSvgProps> = ({ className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 540 180"
        className="w-full h-auto max-h-[200px]"
        role="img"
        aria-labelledby="ctf-title ctf-desc"
      >
        <title id="ctf-title">CTF Challenge Reconnaissance &amp; Cryptography Matrix</title>
        <desc id="ctf-desc">
          Vector diamond matrix showing network reconnaissance, cryptographic cipher analysis, packet exploration probes, and flag validation.
        </desc>

        <defs>
          <pattern id="ctf-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(240, 240, 233, 0.04)" strokeWidth="0.8" />
          </pattern>
        </defs>

        <rect width="540" height="180" fill="url(#ctf-grid)" />

        {/* Diamond Matrix Paths */}
        <path
          d="M 270 25 L 430 90 L 270 155 L 110 90 Z"
          fill="none"
          stroke="rgba(199, 255, 69, 0.45)"
          strokeWidth="1.3"
        />
        <line x1="110" y1="90" x2="430" y2="90" stroke="rgba(240, 240, 233, 0.18)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="270" y1="25" x2="270" y2="155" stroke="rgba(240, 240, 233, 0.18)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Orbiting packet */}
        {!shouldReduceMotion && (
          <motion.circle
            r="3"
            fill="var(--accent)"
            animate={{
              cx: [270, 430, 270, 110, 270],
              cy: [25, 90, 155, 90, 25]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        )}

        {/* Top Node: Reconnaissance */}
        <g transform="translate(270, 25)">
          <circle r="12" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.2" />
          <circle r="4" fill="var(--accent)" />
          <text y="-18" textAnchor="middle" fontFamily="var(--mono)" fontSize="8.5" fontWeight="700" fill="var(--accent)">
            RECON_PROBE
          </text>
        </g>

        {/* Right Node: Cryptography */}
        <g transform="translate(430, 90)">
          <rect x="-12" y="-12" width="24" height="24" fill="var(--raised)" stroke="rgba(240, 240, 233, 0.25)" strokeWidth="1" />
          <text y="4" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="var(--primary-text)">
            XOR
          </text>
          <text x="22" y="4" textAnchor="start" fontFamily="var(--mono)" fontSize="8" fontWeight="700" fill="var(--primary-text)">
            CRYPTO_MATRIX
          </text>
        </g>

        {/* Bottom Node: Web Exploitation */}
        <g transform="translate(270, 155)">
          <circle r="12" fill="var(--surface)" stroke="rgba(240, 240, 233, 0.25)" strokeWidth="1.2" />
          <text y="24" textAnchor="middle" fontFamily="var(--mono)" fontSize="8" fontWeight="700" fill="var(--secondary-text)">
            EXPLOIT_LAB
          </text>
        </g>

        {/* Left Node: Network Triage */}
        <g transform="translate(110, 90)">
          <circle r="12" fill="var(--surface)" stroke="rgba(240, 240, 233, 0.25)" strokeWidth="1.2" />
          <text x="-22" y="4" textAnchor="end" fontFamily="var(--mono)" fontSize="8" fontWeight="700" fill="var(--secondary-text)">
            PCAP_SNIFF
          </text>
        </g>

        {/* Center Node: Flag Validation */}
        <g transform="translate(270, 90)">
          <circle r="16" fill="var(--raised)" stroke="var(--accent)" strokeWidth="1.8" />
          <circle r="6" fill="var(--accent)" />
          <text y="28" textAnchor="middle" fontFamily="var(--mono)" fontSize="8" fontWeight="700" fill="var(--accent)">
            FLAG_VALIDATION
          </text>
        </g>
      </svg>
    </div>
  );
};

