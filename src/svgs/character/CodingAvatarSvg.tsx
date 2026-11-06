import React from 'react';

interface AvatarSvgProps {
  className?: string;
}

export const CodingAvatarSvg: React.FC<AvatarSvgProps> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 400 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Anime Developer Avatar - Coding Pose"
  >
    <defs>
      <linearGradient id="codeMonitorGrad" x1="40" y1="320" x2="360" y2="440" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="rgba(19, 21, 18, 0.95)" />
        <stop offset="100%" stopColor="rgba(10, 11, 9, 0.95)" />
      </linearGradient>
      <linearGradient id="codeNeonGlowGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(199, 255, 69, 0.25)" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
      <linearGradient id="codeSkinGrad" x1="180" y1="120" x2="220" y2="240" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#D49C74" />
        <stop offset="100%" stopColor="#BA7E55" />
      </linearGradient>
      <filter id="codeGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Background Screen Glow Illumination */}
    <ellipse cx="200" cy="240" rx="170" ry="150" fill="url(#codeNeonGlowGrad)" />

    {/* Dual Floating Holographic Display Frames in Background */}
    {/* Left Sub-Monitor */}
    <rect x="25" y="160" width="100" height="130" rx="4" fill="rgba(19, 21, 18, 0.85)" stroke="#2C3227" strokeWidth="1" />
    <path d="M35 180 H115" stroke="#C7FF45" strokeWidth="1" opacity="0.6" />
    <path d="M35 195 H95" stroke="#9BA195" strokeWidth="1" opacity="0.4" />
    <path d="M35 210 H105" stroke="#9BA195" strokeWidth="1" opacity="0.4" />
    <path d="M35 225 H80" stroke="#00E5FF" strokeWidth="1" opacity="0.7" />
    <path d="M35 240 H110" stroke="#9BA195" strokeWidth="1" opacity="0.4" />

    {/* Right Sub-Monitor */}
    <rect x="275" y="160" width="100" height="130" rx="4" fill="rgba(19, 21, 18, 0.85)" stroke="#2C3227" strokeWidth="1" />
    <path d="M285 180 H355" stroke="#FF3358" strokeWidth="1" opacity="0.7" />
    <path d="M285 195 H365" stroke="#9BA195" strokeWidth="1" opacity="0.4" />
    <path d="M285 210 H340" stroke="#9BA195" strokeWidth="1" opacity="0.4" />
    <path d="M285 225 H360" stroke="#C7FF45" strokeWidth="1" opacity="0.7" />
    <path d="M285 240 H330" stroke="#9BA195" strokeWidth="1" opacity="0.4" />

    {/* Torso & Shoulders Leaning In */}
    <path
      d="M110 440 L130 290 L170 250 L230 250 L270 290 L290 440 Z"
      fill="#171A15"
      stroke="#262A22"
      strokeWidth="2"
    />

    {/* Lime Collar Trim */}
    <path
      d="M170 250 L188 315 L200 325 L212 315 L230 250"
      stroke="#C7FF45"
      strokeWidth="2.5"
      strokeLinecap="round"
      filter="url(#codeGlow)"
    />

    {/* Neck */}
    <path d="M182 200 L182 260 L218 260 L218 200 Z" fill="#BA7E55" />

    {/* Head Contours / Jawline */}
    <path
      d="M148 135 C148 205 168 238 200 238 C232 238 252 205 252 135 C252 70 148 70 148 135 Z"
      fill="url(#codeSkinGrad)"
    />

    {/* Ears */}
    <path d="M145 145 C140 148 140 168 148 170 Z" fill="#BA7E55" />
    <path d="M255 145 C260 148 260 168 252 170 Z" fill="#BA7E55" />

    {/* Eyebrows (Focused downward towards screen) */}
    <path d="M166 142 C173 139 183 140 187 144" stroke="#121410" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M213 144 C217 140 227 139 234 142" stroke="#121410" strokeWidth="2.5" strokeLinecap="round" />

    {/* Eyes (Reflecting Code Glow) */}
    <ellipse cx="176" cy="151" rx="7" ry="5" fill="#FFFFFF" />
    <ellipse cx="177" cy="151" rx="4" ry="4" fill="#4A311F" />
    <circle cx="178" cy="150" r="1.5" fill="#C7FF45" />

    <ellipse cx="224" cy="151" rx="7" ry="5" fill="#FFFFFF" />
    <ellipse cx="223" cy="151" rx="4" ry="4" fill="#4A311F" />
    <circle cx="222" cy="150" r="1.5" fill="#C7FF45" />

    {/* Nose & Mouth (Determined, Focused) */}
    <path d="M198 163 L196 174 L202 175" stroke="#9C6542" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M193 192 H207" stroke="#7A452C" strokeWidth="1.75" strokeLinecap="round" />

    {/* Dark Textured Hair */}
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

    {/* Arms Reaching to Keyboard (Foreground Perspective) */}
    <path d="M125 340 L160 410 L195 400 L165 330 Z" fill="#1B1E19" stroke="#2B3026" strokeWidth="1.5" />
    <path d="M275 340 L240 410 L205 400 L235 330 Z" fill="#1B1E19" stroke="#2B3026" strokeWidth="1.5" />

    {/* Hands Typing on Mechanical Keys */}
    <ellipse cx="178" cy="405" rx="14" ry="8" fill="#D49C74" />
    <ellipse cx="222" cy="405" rx="14" ry="8" fill="#D49C74" />

    {/* Center High-Tech Mechanical Keyboard & Terminal Bar */}
    <rect x="70" y="385" width="260" height="75" rx="4" fill="url(#codeMonitorGrad)" stroke="#C7FF45" strokeWidth="1.2" />
    
    {/* Keyboard Keys Row */}
    <g fill="#21251E" stroke="#2F352B" strokeWidth="1">
      <rect x="85" y="415" width="16" height="12" rx="1" />
      <rect x="105" y="415" width="16" height="12" rx="1" />
      <rect x="125" y="415" width="16" height="12" rx="1" />
      <rect x="145" y="415" width="16" height="12" rx="1" />
      <rect x="165" y="415" width="16" height="12" rx="1" />
      <rect x="185" y="415" width="30" height="12" rx="1" fill="#2E3A26" stroke="#C7FF45" />
      <rect x="219" y="415" width="16" height="12" rx="1" />
      <rect x="239" y="415" width="16" height="12" rx="1" />
      <rect x="259" y="415" width="16" height="12" rx="1" />
      <rect x="279" y="415" width="16" height="12" rx="1" />
      <rect x="299" y="415" width="16" height="12" rx="1" />
    </g>

    {/* Live Terminal Stream Displayed on Console Screen */}
    <text x="85" y="401" fill="#C7FF45" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
      skm@dev:~$ pytest -v tests/ --status=PASS [2537/2537]
    </text>

    {/* HUD Corner Reticles */}
    <path d="M50 40 L30 40 L30 60" stroke="#C7FF45" strokeWidth="1.5" opacity="0.6" />
    <path d="M350 40 L370 40 L370 60" stroke="#C7FF45" strokeWidth="1.5" opacity="0.6" />
    <path d="M30 440 L30 460 L50 460" stroke="#C7FF45" strokeWidth="1.5" opacity="0.6" />
    <path d="M370 440 L370 460 L350 460" stroke="#C7FF45" strokeWidth="1.5" opacity="0.6" />

    {/* Bottom Status Text */}
    <text x="200" y="475" textAnchor="middle" fill="#C7FF45" fontSize="8" fontFamily="monospace" letterSpacing="2" opacity="0.75">
      STATE: CODING // EXECUTING TEST PIPELINE
    </text>
  </svg>
);

