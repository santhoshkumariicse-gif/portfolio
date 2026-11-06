import React from 'react';

interface AvatarSvgProps {
  className?: string;
}

export const IdleAvatarSvg: React.FC<AvatarSvgProps> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 400 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Anime Developer Avatar - Idle Pose"
  >
    <defs>
      <linearGradient id="idleJacketGrad" x1="120" y1="260" x2="280" y2="500" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1B1E19" />
        <stop offset="100%" stopColor="#10120E" />
      </linearGradient>
      <linearGradient id="idleSkinGrad" x1="180" y1="120" x2="220" y2="240" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#D49C74" />
        <stop offset="100%" stopColor="#BA7E55" />
      </linearGradient>
      <radialGradient id="idleHaloGrad" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="rgba(199, 255, 69, 0.16)" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <filter id="idleNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Atmospheric Background Halo */}
    <circle cx="200" cy="220" r="160" fill="url(#idleHaloGrad)" />

    {/* Technical Telemetry Ring in Background */}
    <circle cx="200" cy="220" r="175" stroke="#C7FF45" strokeWidth="1" strokeDasharray="6 8" opacity="0.35" />
    <circle cx="200" cy="220" r="185" stroke="rgba(240, 240, 233, 0.15)" strokeWidth="0.75" strokeDasharray="30 120" />

    {/* Shoulders & Tactical Cyber-Jacket */}
    <path
      d="M100 480 L120 310 L165 260 L235 260 L280 310 L300 480 Z"
      fill="url(#idleJacketGrad)"
      stroke="#262A22"
      strokeWidth="2"
    />

    {/* Jacket Panel Cutlines & Contours */}
    <path d="M120 310 L180 350 L180 480" stroke="#2B3026" strokeWidth="1.5" />
    <path d="M280 310 L220 350 L220 480" stroke="#2B3026" strokeWidth="1.5" />

    {/* Inner Tactical Shirt */}
    <path d="M170 260 L200 320 L230 260 Z" fill="#0C0E0A" stroke="#22251D" strokeWidth="1.5" />

    {/* Signature Electric Lime Collar Piping */}
    <path
      d="M165 260 L185 330 L200 345 L215 330 L235 260"
      stroke="#C7FF45"
      strokeWidth="2.5"
      strokeLinecap="round"
      filter="url(#idleNeonGlow)"
    />

    {/* Holographic Chest ID Badge */}
    <rect x="135" y="340" width="38" height="18" rx="2" fill="rgba(19, 21, 18, 0.9)" stroke="#C7FF45" strokeWidth="1" />
    <text x="140" y="352" fill="#C7FF45" fontSize="6.5" fontFamily="monospace" fontWeight="bold">SKM//01</text>

    {/* Neck */}
    <path d="M182 205 L182 270 L218 270 L218 205 Z" fill="#BA7E55" />
    <path d="M182 245 C190 260 210 260 218 245 Z" fill="#9C6542" opacity="0.6" />

    {/* Head Contours / Jawline */}
    <path
      d="M148 135 C148 205 168 238 200 238 C232 238 252 205 252 135 C252 70 148 70 148 135 Z"
      fill="url(#idleSkinGrad)"
    />

    {/* Ears */}
    <path d="M145 145 C140 148 140 168 148 170 Z" fill="#BA7E55" />
    <path d="M255 145 C260 148 260 168 252 170 Z" fill="#BA7E55" />

    {/* Eyes & Eyebrows */}
    {/* Left Eyebrow */}
    <path d="M165 138 C172 133 182 134 186 137" stroke="#121410" strokeWidth="2.5" strokeLinecap="round" />
    {/* Right Eyebrow */}
    <path d="M214 137 C218 134 228 133 235 138" stroke="#121410" strokeWidth="2.5" strokeLinecap="round" />

    {/* Left Eye */}
    <ellipse cx="176" cy="148" rx="7" ry="5.5" fill="#FFFFFF" />
    <ellipse cx="177" cy="148" rx="4" ry="4.5" fill="#4A311F" />
    <circle cx="178.5" cy="146.5" r="1.5" fill="#C7FF45" />
    <path d="M167 145 C172 142 181 142 185 145" stroke="#121410" strokeWidth="1.75" fill="none" strokeLinecap="round" />

    {/* Right Eye */}
    <ellipse cx="224" cy="148" rx="7" ry="5.5" fill="#FFFFFF" />
    <ellipse cx="223" cy="148" rx="4" ry="4.5" fill="#4A311F" />
    <circle cx="221.5" cy="146.5" r="1.5" fill="#C7FF45" />
    <path d="M215 145 C219 142 228 142 233 145" stroke="#121410" strokeWidth="1.75" fill="none" strokeLinecap="round" />

    {/* Nose */}
    <path d="M198 160 L196 172 L202 173" stroke="#9C6542" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

    {/* Mouth (Calm Confident Smile) */}
    <path d="M190 190 C195 194 205 194 210 190" stroke="#7A452C" strokeWidth="1.75" strokeLinecap="round" />

    {/* Modern Styled Textured Dark Hair */}
    <path
      d="M142 125 C138 75 165 48 200 48 C240 48 262 75 258 125 
         C252 108 245 95 235 90 
         C242 110 240 125 238 135 
         C230 115 220 102 210 98 
         C215 115 212 130 205 138 
         C198 112 185 98 175 95 
         C180 115 178 130 170 138 
         C165 118 152 108 142 125 Z"
      fill="#121410"
      stroke="#20241C"
      strokeWidth="1.5"
    />

    {/* Hair Highlights */}
    <path d="M185 65 C195 60 215 62 225 68" stroke="#343A2E" strokeWidth="2" strokeLinecap="round" />
    <path d="M165 80 C175 75 190 76 195 82" stroke="#343A2E" strokeWidth="1.5" strokeLinecap="round" />

    {/* HUD Corner Reticles Around Avatar Frame */}
    <path d="M50 40 L30 40 L30 60" stroke="#C7FF45" strokeWidth="1.5" opacity="0.6" />
    <path d="M350 40 L370 40 L370 60" stroke="#C7FF45" strokeWidth="1.5" opacity="0.6" />
    <path d="M30 440 L30 460 L50 460" stroke="#C7FF45" strokeWidth="1.5" opacity="0.6" />
    <path d="M370 440 L370 460 L350 460" stroke="#C7FF45" strokeWidth="1.5" opacity="0.6" />

    {/* Bottom Status Text */}
    <text x="200" y="475" textAnchor="middle" fill="#C7FF45" fontSize="8" fontFamily="monospace" letterSpacing="2" opacity="0.75">
      STATE: IDLE // READY FOR INPUT
    </text>
  </svg>
);

