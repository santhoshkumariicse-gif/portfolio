import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const ContactNetworkSvg: React.FC<{ className?: string }> = ({ className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative w-full max-w-[480px] aspect-[4/3] mx-auto select-none ${className}`}>
      <svg
        viewBox="0 0 460 320"
        className="w-full h-full overflow-visible"
        role="img"
        aria-labelledby="contact-net-title contact-net-desc"
      >
        <title id="contact-net-title">Communication Network Gateway</title>
        <desc id="contact-net-desc">
          Vector schematic illustrating incoming inquiry routing through secure TLS verification into developer direct email dispatch.
        </desc>

        <defs>
          <pattern id="contact-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(240, 240, 233, 0.03)" strokeWidth="0.75" />
          </pattern>
        </defs>

        {/* Backdrop Frame */}
        <rect width="460" height="320" fill="#0A0B09" rx="4" stroke="rgba(240, 240, 233, 0.12)" strokeWidth="1" />
        <rect width="460" height="320" fill="url(#contact-grid)" />

        {/* Top Header */}
        <text x="20" y="28" fill="#C7FF45" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="700">
          DISPATCH_BUS // ENCRYPTED_INQUIRY_INGRESS
        </text>
        <text x="340" y="28" fill="#585F53" fontSize="8" fontFamily="JetBrains Mono, monospace">
          PORT: 465 / 587
        </text>

        {/* Left Node: Ingress Client */}
        <g transform="translate(40, 120)">
          <rect width="100" height="64" rx="3" fill="#131512" stroke="rgba(240,240,233,0.2)" strokeWidth="1" />
          <circle cx="15" cy="18" r="3" fill="#C7FF45" />
          <text x="25" y="21" fill="#F0F0E9" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono, monospace">
            CLIENT_SRC
          </text>
          <text x="12" y="38" fill="#9BA195" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
            Recruiter / Lead
          </text>
          <text x="12" y="50" fill="#585F53" fontSize="7" fontFamily="JetBrains Mono, monospace">
            Inquiry Protocol
          </text>
        </g>

        {/* Center Node: TLS Handshake Gate */}
        <g transform="translate(190, 110)">
          <circle cx="40" cy="40" r="38" fill="#171A16" stroke="#C7FF45" strokeWidth="1.5" />
          <circle cx="40" cy="40" r="28" fill="#131512" stroke="rgba(240,240,233,0.15)" strokeWidth="1" />
          <circle cx="40" cy="40" r="14" fill="#1D211C" stroke="#C7FF45" strokeWidth="1" />
          <circle cx="40" cy="40" r="4" fill="#C7FF45" />

          {/* Pulse ring */}
          {!shouldReduceMotion && (
            <motion.circle
              cx="40"
              cy="40"
              r="38"
              fill="none"
              stroke="#C7FF45"
              strokeWidth="1"
              animate={{ r: [38, 48], opacity: [0.8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
          )}

          <text x="40" y="94" fill="#C7FF45" fontSize="8" fontWeight="700" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
            TLS_VERIFY
          </text>
          <text x="40" y="106" fill="#9BA195" fontSize="7" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
            AES_256_GCM
          </text>
        </g>

        {/* Right Node: Developer Direct Mailbox */}
        <g transform="translate(320, 120)">
          <rect width="105" height="64" rx="3" fill="#131512" stroke="#C7FF45" strokeWidth="1" />
          <circle cx="15" cy="18" r="3" fill="#C7FF45" />
          <text x="25" y="21" fill="#C7FF45" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono, monospace">
            DEV_SINK
          </text>
          <text x="12" y="38" fill="#F0F0E9" fontSize="7" fontFamily="JetBrains Mono, monospace">
            Santhosh Kumar M
          </text>
          <text x="12" y="50" fill="#9BA195" fontSize="6.8" fontFamily="JetBrains Mono, monospace">
            santhoshkumar...
          </text>
        </g>

        {/* Connection Pipes */}
        <path d="M 140 150 L 190 150" fill="none" stroke="#C7FF45" strokeWidth="1.5" />
        <path d="M 270 150 L 320 150" fill="none" stroke="#C7FF45" strokeWidth="1.5" />

        {/* Flowing Signals */}
        {!shouldReduceMotion && (
          <>
            <motion.circle
              r="3"
              fill="#C7FF45"
              animate={{ cx: [140, 190], opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              cy="150"
            />
            <motion.circle
              r="3"
              fill="#C7FF45"
              animate={{ cx: [270, 320], opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
              cy="150"
            />
          </>
        )}

        {/* Footer Audit Notation */}
        <text x="20" y="300" fill="#585F53" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
          RESPONSE_SLA: WITHIN_24_HOURS // DIRECT_COMMUNICATION_GUARANTEED
        </text>
      </svg>
    </div>
  );
};

