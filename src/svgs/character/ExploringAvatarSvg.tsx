import React from 'react';

interface AvatarSvgProps {
  className?: string;
}

export const ExploringAvatarSvg: React.FC<AvatarSvgProps> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 400 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Anime Developer Avatar - Exploring Pose"
  >
    <defs>
      <linearGradient id="exploreJacketGrad" x1="120" y1="260" x2="280" y2="500" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1B1E19" />
        <stop offset="100%" stopColor="#10120E" />
      </linearGradient>
      <linearGradient id="exploreSkinGrad" x1="180" y1="120" x2="220" y2="240" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#D49C74" />
        <stop offset="100%" stopColor="#BA7E55" />
      </linearGradient>
      <radialGradient id="exploreHaloGrad" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="rgba(0, 229, 255, 0.2)" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <filter id="exploreNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Atmospheric Background Halo */}
    <circle cx="200" cy="220" r="160" fill="url(#exploreHaloGrad)" />

    {/* Interactive Holographic Nodes in Foreground / Midground */}
    <g filter="url(#exploreNeonGlow)">
      <circle cx="290" cy="180" r="14" fill="rgba(0, 229, 255, 0.2)" stroke="#00E5FF" strokeWidth="2" />
      <circle cx="290" cy="180" r="5" fill="#00E5FF" />
    </g>

    {/* Connecting Node Vectors */}
    <line x1="290" y1="180" x2="340" y2="120" stroke="#00E5FF" strokeWidth="1.2" strokeDasharray="4 4" />
    <circle cx="340" cy="120" r="7" fill="rgba(199, 255, 69, 0.3)" stroke="#C7FF45" strokeWidth="1.2" />

    <line x1="290" y1="180" x2="330" y2="260" stroke="#00E5FF" strokeWidth="1.2" strokeDasharray="4 4" />
    <circle cx="330" cy="260" r="8" fill="rgba(255, 51, 88, 0.3)" stroke="#FF3358" strokeWidth="1.2" />

    {/* Shoulders & Jacket (Angled slightly to the right) */}
    <path
      d="M95 480 L115 315 L165 260 L235 260 L285 305 L310 480 Z"
      fill="url(#exploreJacketGrad)"
      stroke="#262A22"
      strokeWidth="2"
    />

    {/* Inner Shirt & Collar */}
    <path d="M170 260 L200 320 L230 260 Z" fill="#0C0E0A" stroke="#22251D" strokeWidth="1.5" />
    <path
      d="M165 260 L185 330 L200 345 L215 330 L235 260"
      stroke="#C7FF45"
      strokeWidth="2.5"
      strokeLinecap="round"
      filter="url(#exploreNeonGlow)"
    />

    {/* Extended Right Arm Reaching Toward Hologram */}
    <path d="M255 295 L285 210 L305 215 L280 320 Z" fill="#1B1E19" stroke="#2B3026" strokeWidth="1.5" />
    {/* Forearm & Reaching Hand */}
    <ellipse cx="288" cy="195" rx="8" ry="11" fill="#D49C74" stroke="#9C6542" strokeWidth="1" />
    {/* Index Finger Extended Touching Node */}
    <path d="M288 190 L290 181" stroke="#9C6542" strokeWidth="2.5" strokeLinecap="round" />

    {/* Neck */}
    <path d="M182 205 L182 270 L218 270 L218 205 Z" fill="#BA7E55" />

    {/* Head Contours / Jawline (Tilted curiously toward node) */}
    <path
      d="M152 135 C152 205 172 238 204 238 C236 238 256 205 256 135 C256 70 152 70 152 135 Z"
      fill="url(#exploreSkinGrad)"
    />

    {/* Ears */}
    <path d="M149 145 C144 148 144 168 152 170 Z" fill="#BA7E55" />
    <path d="M259 145 C264 148 264 168 256 170 Z" fill="#BA7E55" />

    {/* Curious Eyebrows (Right eyebrow raised higher) */}
    <path d="M168 138 C176 134 185 135 189 138" stroke="#121410" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M217 135 C222 130 232 130 239 134" stroke="#121410" strokeWidth="2.5" strokeLinecap="round" />

    {/* Curious Engaged Eyes (Looking toward the floating node) */}
    <ellipse cx="178" cy="148" rx="7" ry="5.5" fill="#FFFFFF" />
    <ellipse cx="180" cy="148" rx="4" ry="4.5" fill="#4A311F" />
    <circle cx="182" cy="146.5" r="1.5" fill="#00E5FF" />

    <ellipse cx="226" cy="148" rx="7" ry="5.5" fill="#FFFFFF" />
    <ellipse cx="228" cy="148" rx="4" ry="4.5" fill="#4A311F" />
    <circle cx="230" cy="146.5" r="1.5" fill="#00E5FF" />

    {/* Nose & Mouth (Engaged Curiosity) */}
    <path d="M201 160 L199 172 L205 173" stroke="#9C6542" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M194 189 C199 193 207 193 212 189" stroke="#7A452C" strokeWidth="1.75" strokeLinecap="round" />

    {/* Hair */}
    <path
      d="M146 125 C142 75 169 48 204 48 C244 48 266 75 262 125 
         C256 108 249 95 239 90 
         C246 110 244 125 242 135 
         C234 115 224 102 214 98 
         C219 115 216 130 209 138 
         C202 112 189 98 179 95 
         C184 115 182 130 174 138 
         C169 118 156 108 146 125 Z"
      fill="#121410"
      stroke="#20241C"
      strokeWidth="1.5"
    />

    {/* Highlights */}
    <path d="M189 65 C199 60 219 62 229 68" stroke="#343A2E" strokeWidth="2" strokeLinecap="round" />
    <path d="M169 80 C179 75 194 76 199 82" stroke="#343A2E" strokeWidth="1.5" strokeLinecap="round" />

    {/* HUD Reticles */}
    <path d="M50 40 L30 40 L30 60" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
    <path d="M350 40 L370 40 L370 60" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
    <path d="M30 440 L30 460 L50 460" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
    <path d="M370 440 L370 460 L350 460" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />

    {/* Bottom Status Text */}
    <text x="200" y="475" textAnchor="middle" fill="#00E5FF" fontSize="8" fontFamily="monospace" letterSpacing="2" opacity="0.75">
      STATE: EXPLORING // HOLOGRAPHIC INTERFACE ENGAGED
    </text>
  </svg>
);

