import React from 'react';

interface AvatarSvgProps {
  className?: string;
}

export const AchievementAvatarSvg: React.FC<AvatarSvgProps> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 400 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Anime Developer Avatar - Achievement Pose"
  >
    <defs>
      <linearGradient id="achieveJacketGrad" x1="120" y1="260" x2="280" y2="500" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1B1E19" />
        <stop offset="100%" stopColor="#10120E" />
      </linearGradient>
      <linearGradient id="achieveSkinGrad" x1="180" y1="120" x2="220" y2="240" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#D49C74" />
        <stop offset="100%" stopColor="#BA7E55" />
      </linearGradient>
      <radialGradient id="achieveHaloGrad" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="rgba(199, 255, 69, 0.22)" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <filter id="achieveNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Atmospheric Background Celebration Aura */}
    <circle cx="200" cy="220" r="160" fill="url(#achieveHaloGrad)" />

    {/* Orbiting Sparkles & Achievement Emblems */}
    {/* Top-Right Star Sparkle */}
    <path d="M290 85 L295 70 L300 85 L315 90 L300 95 L295 110 L290 95 L275 90 Z" fill="#C7FF45" filter="url(#achieveNeonGlow)" />
    {/* Top-Left Small Star */}
    <path d="M100 115 L103 105 L106 115 L116 118 L106 121 L103 131 L100 121 L90 118 Z" fill="#C7FF45" opacity="0.8" />
    {/* Floating Trophy Ring */}
    <circle cx="200" cy="220" r="175" stroke="#C7FF45" strokeWidth="1.5" strokeDasharray="16 24" />

    {/* Shoulders & Jacket */}
    <path
      d="M100 480 L120 310 L165 260 L235 260 L280 310 L300 480 Z"
      fill="url(#achieveJacketGrad)"
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
      filter="url(#achieveNeonGlow)"
    />

    {/* Raised Right Arm giving Thumbs-Up */}
    <path d="M280 310 L315 250 L290 235 L260 295 Z" fill="#1B1E19" stroke="#2B3026" strokeWidth="1.5" />
    {/* Fist & Upright Thumb */}
    <rect x="300" y="215" width="22" height="26" rx="6" fill="#D49C74" stroke="#9C6542" strokeWidth="1" />
    {/* Thumb */}
    <path d="M308 220 L308 195 C308 188 318 188 318 195 L318 220 Z" fill="#D49C74" stroke="#9C6542" strokeWidth="1.2" />

    {/* Neck */}
    <path d="M182 205 L182 270 L218 270 L218 205 Z" fill="#BA7E55" />

    {/* Head Contours / Jawline */}
    <path
      d="M148 135 C148 205 168 238 200 238 C232 238 252 205 252 135 C252 70 148 70 148 135 Z"
      fill="url(#achieveSkinGrad)"
    />

    {/* Ears */}
    <path d="M145 145 C140 148 140 168 148 170 Z" fill="#BA7E55" />
    <path d="M255 145 C260 148 260 168 252 170 Z" fill="#BA7E55" />

    {/* Joyful Beaming Eyebrows */}
    <path d="M164 133 C172 130 182 132 186 136" stroke="#121410" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M214 136 C218 132 228 130 236 133" stroke="#121410" strokeWidth="2.5" strokeLinecap="round" />

    {/* Joyful Animated Eyes (Crescent Curves) */}
    <path d="M167 148 C173 140 181 140 186 148" stroke="#121410" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M214 148 C219 140 227 140 233 148" stroke="#121410" strokeWidth="2.5" fill="none" strokeLinecap="round" />

    {/* Nose & Big Smile */}
    <path d="M198 160 L196 172 L202 173" stroke="#9C6542" strokeWidth="1.5" strokeLinecap="round" />
    {/* Open Beaming Smile with Teeth */}
    <path d="M186 186 C190 204 210 204 214 186 Z" fill="#FFFFFF" stroke="#7A452C" strokeWidth="1.75" />
    <path d="M188 193 C194 200 206 200 212 193" fill="#D45A5A" />

    {/* Modern Styled Hair */}
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

    {/* Highlights */}
    <path d="M185 65 C195 60 215 62 225 68" stroke="#343A2E" strokeWidth="2" strokeLinecap="round" />
    <path d="M165 80 C175 75 190 76 195 82" stroke="#343A2E" strokeWidth="1.5" strokeLinecap="round" />

    {/* Holographic Verification Badge Pill in Foreground */}
    <g transform="translate(140, 360)">
      <rect width="120" height="30" rx="4" fill="rgba(19, 21, 18, 0.95)" stroke="#C7FF45" strokeWidth="1.5" />
      <circle cx="20" cy="15" r="7" fill="rgba(199, 255, 69, 0.2)" stroke="#C7FF45" strokeWidth="1.2" />
      <path d="M16 15 L19 18 L25 12" stroke="#C7FF45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="34" y="19" fill="#F0F0E9" fontSize="8.5" fontFamily="monospace" fontWeight="bold">MILESTONE PASSED</text>
    </g>

    {/* HUD Reticles */}
    <path d="M50 40 L30 40 L30 60" stroke="#C7FF45" strokeWidth="1.5" opacity="0.6" />
    <path d="M350 40 L370 40 L370 60" stroke="#C7FF45" strokeWidth="1.5" opacity="0.6" />
    <path d="M30 440 L30 460 L50 460" stroke="#C7FF45" strokeWidth="1.5" opacity="0.6" />
    <path d="M370 440 L370 460 L350 460" stroke="#C7FF45" strokeWidth="1.5" opacity="0.6" />

    {/* Bottom Status Text */}
    <text x="200" y="475" textAnchor="middle" fill="#C7FF45" fontSize="8" fontFamily="monospace" letterSpacing="2" opacity="0.75">
      STATE: ACHIEVEMENT // OBJECTIVES COMPLETED
    </text>
  </svg>
);

