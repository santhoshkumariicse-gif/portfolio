import React from 'react';

interface AvatarSvgProps {
  className?: string;
}

export const ThinkingAvatarSvg: React.FC<AvatarSvgProps> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 400 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Anime Developer Avatar - Thinking Pose"
  >
    <defs>
      <linearGradient id="thinkJacketGrad" x1="120" y1="260" x2="280" y2="500" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1B1E19" />
        <stop offset="100%" stopColor="#10120E" />
      </linearGradient>
      <linearGradient id="thinkSkinGrad" x1="180" y1="120" x2="220" y2="240" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#D49C74" />
        <stop offset="100%" stopColor="#BA7E55" />
      </linearGradient>
      <radialGradient id="thinkHaloGrad" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="rgba(0, 229, 255, 0.14)" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <filter id="thinkNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Atmospheric Background Halo (Cyan Thought Chamber) */}
    <circle cx="200" cy="220" r="160" fill="url(#thinkHaloGrad)" />

    {/* Analytical Telemetry Nodes & Coordinates Floating in Background */}
    <circle cx="90" cy="140" r="3" fill="#00E5FF" opacity="0.6" />
    <line x1="90" y1="140" x2="140" y2="180" stroke="#00E5FF" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4" />
    <rect x="55" y="115" width="70" height="20" rx="2" fill="rgba(19, 21, 18, 0.85)" stroke="#00E5FF" strokeWidth="0.75" />
    <text x="60" y="128" fill="#00E5FF" fontSize="6.5" fontFamily="monospace">O(n log n) EVAL</text>

    <circle cx="310" cy="130" r="3" fill="#C7FF45" opacity="0.6" />
    <line x1="310" y1="130" x2="260" y2="170" stroke="#C7FF45" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4" />
    <rect x="275" y="105" width="85" height="20" rx="2" fill="rgba(19, 21, 18, 0.85)" stroke="#C7FF45" strokeWidth="0.75" />
    <text x="280" y="118" fill="#C7FF45" fontSize="6.5" fontFamily="monospace">SCHEMA_RESOLVE</text>

    {/* Shoulders & Tactical Cyber-Jacket */}
    <path
      d="M100 480 L120 310 L165 260 L235 260 L280 310 L300 480 Z"
      fill="url(#thinkJacketGrad)"
      stroke="#262A22"
      strokeWidth="2"
    />

    {/* Collar & Inner Shirt */}
    <path d="M170 260 L200 320 L230 260 Z" fill="#0C0E0A" stroke="#22251D" strokeWidth="1.5" />
    <path
      d="M165 260 L185 330 L200 345 L215 330 L235 260"
      stroke="#C7FF45"
      strokeWidth="2.5"
      strokeLinecap="round"
      filter="url(#thinkNeonGlow)"
    />

    {/* Neck */}
    <path d="M182 205 L182 270 L218 270 L218 205 Z" fill="#BA7E55" />
    <path d="M182 245 C190 260 210 260 218 245 Z" fill="#9C6542" opacity="0.6" />

    {/* Head Contours / Jawline */}
    <path
      d="M148 135 C148 205 168 238 200 238 C232 238 252 205 252 135 C252 70 148 70 148 135 Z"
      fill="url(#thinkSkinGrad)"
    />

    {/* Ears */}
    <path d="M145 145 C140 148 140 168 148 170 Z" fill="#BA7E55" />
    <path d="M255 145 C260 148 260 168 252 170 Z" fill="#BA7E55" />

    {/* Raised Arm & Hand to Chin (Thinking Gesture) */}
    {/* Forearm */}
    <path
      d="M185 360 L205 250 L225 245 L210 360 Z"
      fill="#171A15"
      stroke="#262A22"
      strokeWidth="1.5"
    />
    {/* Hand Resting on Chin */}
    <path
      d="M196 226 C194 220 205 214 212 218 C216 220 217 228 214 235 C208 242 198 238 196 226 Z"
      fill="#D49C74"
      stroke="#9C6542"
      strokeWidth="1"
    />
    {/* Fingers Curled Under Jaw */}
    <path d="M195 228 C191 228 189 233 194 235" stroke="#9C6542" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M198 232 C194 233 192 237 197 239" stroke="#9C6542" strokeWidth="1.2" strokeLinecap="round" />

    {/* Concentrated Eyebrows (Slight Angle of Thought) */}
    <path d="M165 137 C173 135 183 137 187 141" stroke="#121410" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M213 141 C217 137 227 135 235 137" stroke="#121410" strokeWidth="2.5" strokeLinecap="round" />

    {/* Analytical Focused Eyes (Gazing slightly upward) */}
    <ellipse cx="176" cy="147" rx="7" ry="5.5" fill="#FFFFFF" />
    <ellipse cx="177" cy="146" rx="4" ry="4.5" fill="#4A311F" />
    <circle cx="178.5" cy="144.5" r="1.5" fill="#00E5FF" />
    <path d="M167 144 C172 141 181 141 185 144" stroke="#121410" strokeWidth="1.75" fill="none" strokeLinecap="round" />

    <ellipse cx="224" cy="147" rx="7" ry="5.5" fill="#FFFFFF" />
    <ellipse cx="223" cy="146" rx="4" ry="4.5" fill="#4A311F" />
    <circle cx="221.5" cy="144.5" r="1.5" fill="#00E5FF" />
    <path d="M215 144 C219 141 228 141 233 144" stroke="#121410" strokeWidth="1.75" fill="none" strokeLinecap="round" />

    {/* Nose */}
    <path d="M198 160 L196 172 L202 173" stroke="#9C6542" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

    {/* Mouth (Pensive Expression) */}
    <path d="M192 188 L208 188" stroke="#7A452C" strokeWidth="1.75" strokeLinecap="round" />

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

    {/* HUD Corner Reticles */}
    <path d="M50 40 L30 40 L30 60" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
    <path d="M350 40 L370 40 L370 60" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
    <path d="M30 440 L30 460 L50 460" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
    <path d="M370 440 L370 460 L350 460" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />

    {/* Bottom Status Text */}
    <text x="200" y="475" textAnchor="middle" fill="#00E5FF" fontSize="8" fontFamily="monospace" letterSpacing="2" opacity="0.75">
      STATE: THINKING // ANALYZING ARCHITECTURE
    </text>
  </svg>
);

