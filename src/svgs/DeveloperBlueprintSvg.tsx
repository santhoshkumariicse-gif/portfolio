import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const DeveloperBlueprintSvg: React.FC<{ className?: string }> = ({ className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative w-full max-w-[500px] aspect-[5/4] mx-auto select-none ${className}`}>
      <svg
        viewBox="0 0 500 400"
        className="w-full h-full overflow-visible"
        role="img"
        aria-labelledby="blueprint-svg-title blueprint-svg-desc"
      >
        <title id="blueprint-svg-title">Developer Identity & Engineering Blueprint</title>
        <desc id="blueprint-svg-desc">
          Technical vector schematic illustrating core competencies in defensive security, Python automation pipelines, academic foundation, and internship practice.
        </desc>

        <defs>
          {/* Subtle grid pattern */}
          <pattern id="blueprint-grid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(240, 240, 233, 0.035)" strokeWidth="0.75" />
          </pattern>

          {/* Accent glow filter */}
          <filter id="blueprint-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Blueprint Grid Background */}
        <rect width="500" height="400" fill="#0A0B09" rx="4" stroke="rgba(240, 240, 233, 0.12)" strokeWidth="1" />
        <rect width="500" height="400" fill="url(#blueprint-grid)" />

        {/* Corner Calibration Marks */}
        <path d="M 15 25 L 15 15 L 25 15" fill="none" stroke="#C7FF45" strokeWidth="1.5" />
        <path d="M 485 25 L 485 15 L 475 15" fill="none" stroke="#C7FF45" strokeWidth="1.5" />
        <path d="M 15 375 L 15 385 L 25 385" fill="none" stroke="#C7FF45" strokeWidth="1.5" />
        <path d="M 485 375 L 485 385 L 475 385" fill="none" stroke="#C7FF45" strokeWidth="1.5" />

        {/* Header Telemetry */}
        <text x="25" y="32" fill="#C7FF45" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="700">
          SYS_ID: SANTHOSH_KUMAR_M // SPEC_V8.2
        </text>
        <text x="360" y="32" fill="#585F53" fontSize="8" fontFamily="JetBrains Mono, monospace">
          LOC: 11.2189°N, 78.1674°E
        </text>

        {/* Outer Circular Boundary */}
        <circle cx="250" cy="200" r="140" fill="none" stroke="rgba(240, 240, 233, 0.07)" strokeDasharray="3,6" />
        <circle cx="250" cy="200" r="100" fill="none" stroke="rgba(199, 255, 69, 0.15)" strokeWidth="1" />

        {/* Central Hexagonal Core: Defensive Logic Engine */}
        <g transform="translate(250, 200)">
          <polygon
            points="0,-45 39,-22.5 39,22.5 0,45 -39,22.5 -39,-22.5"
            fill="#131512"
            stroke="#C7FF45"
            strokeWidth="1.5"
            filter="url(#blueprint-glow)"
          />
          {/* Internal Core Rings */}
          <circle cx="0" cy="0" r="18" fill="#1D211C" stroke="rgba(240, 240, 233, 0.2)" strokeWidth="1" />
          <circle cx="0" cy="0" r="6" fill="#C7FF45" />

          {/* Rotating radar line (disabled on reduced motion) */}
          {!shouldReduceMotion && (
            <motion.line
              x1="0"
              y1="0"
              x2="0"
              y2="-42"
              stroke="#C7FF45"
              strokeWidth="1"
              opacity="0.8"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
          )}

          <text y="62" fill="#F0F0E9" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
            CORE_SECURITY_KERNEL
          </text>
          <text y="75" fill="#9BA195" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
            DEFENSIVE LOGIC &amp; TRIAGE
          </text>
        </g>

        {/* Node 1: Academic Engine (Top Left) */}
        <g transform="translate(90, 90)">
          <rect width="110" height="54" rx="3" fill="#131512" stroke="rgba(240,240,233,0.18)" strokeWidth="1" />
          <circle cx="15" cy="18" r="3" fill="#C7FF45" />
          <text x="25" y="21" fill="#F0F0E9" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono, monospace">
            B.E. CSE
          </text>
          <text x="12" y="35" fill="#9BA195" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
            Gnanamani College
          </text>
          <text x="12" y="46" fill="#C7FF45" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
            GPA: 7.2 / 10
          </text>
        </g>

        {/* Node 2: Cybernaut Internship (Top Right) */}
        <g transform="translate(300, 90)">
          <rect width="115" height="54" rx="3" fill="#131512" stroke="#C7FF45" strokeWidth="1" />
          <circle cx="15" cy="18" r="3" fill="#C7FF45" />
          <text x="25" y="21" fill="#C7FF45" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono, monospace">
            CYBERNAUT
          </text>
          <text x="12" y="35" fill="#F0F0E9" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
            Python Dev Intern
          </text>
          <text x="12" y="46" fill="#9BA195" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
            Automated Log Triage
          </text>
        </g>

        {/* Node 3: Controlled Lab Testing (Bottom Left) */}
        <g transform="translate(90, 270)">
          <rect width="110" height="54" rx="3" fill="#131512" stroke="rgba(240,240,233,0.18)" strokeWidth="1" />
          <circle cx="15" cy="18" r="3" fill="#9BA195" />
          <text x="25" y="21" fill="#F0F0E9" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono, monospace">
            LAB AUDITS
          </text>
          <text x="12" y="35" fill="#9BA195" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
            PortSwigger &amp; DVWA
          </text>
          <text x="12" y="46" fill="#585F53" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
            OWASP Top 10 Mitigation
          </text>
        </g>

        {/* Node 4: Defensive Target Trajectory (Bottom Right) */}
        <g transform="translate(300, 270)">
          <rect width="115" height="54" rx="3" fill="#131512" stroke="rgba(240,240,233,0.18)" strokeWidth="1" />
          <circle cx="15" cy="18" r="3" fill="#C7FF45" />
          <text x="25" y="21" fill="#F0F0E9" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono, monospace">
            SOC HORIZON
          </text>
          <text x="12" y="35" fill="#9BA195" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
            Threat Detection Trainee
          </text>
          <text x="12" y="46" fill="#C7FF45" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
            Graduation: May 2027
          </text>
        </g>

        {/* Circuit Bus Paths connecting Nodes to Center */}
        <path d="M 200 117 L 230 117 L 240 170" fill="none" stroke="rgba(199,255,69,0.4)" strokeWidth="1.2" />
        <path d="M 300 117 L 270 117 L 260 170" fill="none" stroke="rgba(199,255,69,0.7)" strokeWidth="1.4" />
        <path d="M 200 297 L 230 297 L 240 230" fill="none" stroke="rgba(199,255,69,0.4)" strokeWidth="1.2" />
        <path d="M 300 297 L 270 297 L 260 230" fill="none" stroke="rgba(199,255,69,0.5)" strokeWidth="1.2" />

        {/* Subtle Traveling Data Pulses (disabled on reduced motion) */}
        {!shouldReduceMotion && (
          <>
            <motion.circle
              r="2.5"
              fill="#C7FF45"
              animate={{
                cx: [300, 270, 260],
                cy: [117, 117, 170],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              r="2.5"
              fill="#C7FF45"
              animate={{
                cx: [200, 230, 240],
                cy: [117, 117, 170],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </>
        )}

        {/* Footer Hash Signatures */}
        <text x="25" y="380" fill="#585F53" fontSize="7" fontFamily="JetBrains Mono, monospace">
          SHA256: 9b2d8f7a01c4e613... · AUTH: LEVEL_01_DEFENSIVE
        </text>
      </svg>
    </div>
  );
};

