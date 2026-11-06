import React from 'react';

interface AvatarSvgProps {
  className?: string;
}

export const FutureAvatarSvg: React.FC<AvatarSvgProps> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 400 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Anime Developer Avatar - Future Horizon Pose"
  >
    <defs>
      <linearGradient id="futureJacketGrad" x1="120" y1="260" x2="280" y2="500" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1B1E19" />
        <stop offset="100%" stopColor="#10120E" />
      </linearGradient>
      <linearGradient id="futureSkinGrad" x1="180" y1="120" x2="220" y2="240" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#D49C74" />
        <stop offset="100%" stopColor="#BA7E55" />
      </linearGradient>
      <radialGradient id="futureHaloGrad" cx="50%" cy="35%" r="55%">
        <stop offset="0%" stopColor="rgba(199, 255, 69, 0.18)" />
        <stop offset="60%" stopColor="rgba(0, 229, 255, 0.08)" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <linearGradient id="horizonGlow" x1="200" y1="180" x2="200" y2="300" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="rgba(199, 255, 69, 0.25)" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
      <filter id="futureNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Atmospheric Background Halo & Cosmic Horizon Glow */}
    <circle cx="200" cy="210" r="170" fill="url(#futureHaloGrad)" />
    <path d="M50 260 L350 260" stroke="url(#horizonGlow)" strokeWidth="2" strokeDasharray="12 6" />

    {/* Distant Futuristic Skyline & Constellation Grid */}
    <g opacity="0.35">
      <line x1="80" y1="260" x2="120" y2="220" stroke="#00E5FF" strokeWidth="0.75" strokeDasharray="3 3" />
      <circle cx="120" cy="220" r="2" fill="#00E5FF" />
      <line x1="120" y1="220" x2="160" y2="235" stroke="#00E5FF" strokeWidth="0.75" strokeDasharray="3 3" />
      <circle cx="160" cy="235" r="2.5" fill="#C7FF45" />
      <line x1="240" y1="230" x2="280" y2="205" stroke="#00E5FF" strokeWidth="0.75" strokeDasharray="3 3" />
      <circle cx="280" cy="205" r="2.5" fill="#00E5FF" />
      <line x1="280" y1="205" x2="320" y2="225" stroke="#00E5FF" strokeWidth="0.75" strokeDasharray="3 3" />
      <circle cx="320" cy="225" r="2" fill="#C7FF45" />

      {/* Distant city beacon vectors */}
      <line x1="70" y1="260" x2="70" y2="245" stroke="#C7FF45" strokeWidth="1" />
      <line x1="90" y1="260" x2="90" y2="235" stroke="#9BA195" strokeWidth="1" />
      <line x1="310" y1="260" x2="310" y2="240" stroke="#9BA195" strokeWidth="1" />
      <line x1="330" y1="260" x2="330" y2="248" stroke="#00E5FF" strokeWidth="1" />
    </g>

    {/* Technical Telemetry Orbit Rings */}
    <circle cx="200" cy="220" r="175" stroke="#C7FF45" strokeWidth="0.75" strokeDasharray="4 10" opacity="0.3" />
    <circle cx="200" cy="220" r="185" stroke="rgba(0, 229, 255, 0.25)" strokeWidth="0.75" strokeDasharray="40 100" />

    {/* Shoulders & Tactical Cyber-Jacket (Turned slightly 3/4 right toward horizon) */}
    <path
      d="M95 480 L115 315 L165 260 L240 260 L290 310 L315 480 Z"
      fill="url(#futureJacketGrad)"
      stroke="#262A22"
      strokeWidth="2"
    />

    {/* Jacket Panel Cutlines & Seams */}
    <path d="M115 315 L175 355 L175 480" stroke="#2B3026" strokeWidth="1.5" />
    <path d="M290 310 L230 355 L230 480" stroke="#2B3026" strokeWidth="1.5" />

    {/* Inner Tactical Shirt */}
    <path d="M170 260 L205 320 L235 260 Z" fill="#0C0E0A" stroke="#22251D" strokeWidth="1.5" />

    {/* Signature Electric Lime Collar Piping */}
    <path
      d="M165 260 L188 330 L205 345 L220 330 L240 260"
      stroke="#C7FF45"
      strokeWidth="2.5"
      strokeLinecap="round"
      filter="url(#futureNeonGlow)"
    />

    {/* Holographic Chest ID Badge */}
    <rect x="135" y="342" width="40" height="18" rx="2" fill="rgba(19, 21, 18, 0.9)" stroke="#C7FF45" strokeWidth="1" />
    <text x="140" y="354" fill="#C7FF45" fontSize="6.5" fontFamily="monospace" fontWeight="bold">SKM//06</text>

    {/* Neck */}
    <path d="M185 205 L185 270 L222 270 L222 205 Z" fill="#BA7E55" />
    <path d="M185 245 C195 260 215 260 222 245 Z" fill="#9C6542" opacity="0.6" />

    {/* Head Contours / Jawline (Turned 3/4 toward the right horizon) */}
    <path
      d="M152 135 C152 205 174 238 206 238 C236 238 254 205 254 135 C254 70 152 70 152 135 Z"
      fill="url(#futureSkinGrad)"
    />

    {/* Ears */}
    <path d="M148 145 C143 148 143 168 151 170 Z" fill="#BA7E55" />
    <path d="M255 145 C259 148 259 168 253 170 Z" fill="#BA7E55" />

    {/* Visionary Eyes & Eyebrows - Looking forward and slightly upward into the distance */}
    {/* Left Eyebrow */}
    <path d="M170 136 C178 131 188 132 192 135" stroke="#121410" strokeWidth="2.5" strokeLinecap="round" />
    {/* Right Eyebrow */}
    <path d="M218 134 C224 131 234 131 240 135" stroke="#121410" strokeWidth="2.5" strokeLinecap="round" />

    {/* Left Eye (Looking toward upper right horizon) */}
    <ellipse cx="180" cy="146" rx="7" ry="5.5" fill="#FFFFFF" />
    <ellipse cx="182" cy="145" rx="4" ry="4.5" fill="#4A311F" />
    <circle cx="184" cy="143.5" r="1.5" fill="#C7FF45" />
    <circle cx="181" cy="147" r="0.8" fill="#00E5FF" opacity="0.75" />
    <path d="M171 143 C176 140 185 140 189 143" stroke="#121410" strokeWidth="1.75" fill="none" strokeLinecap="round" />

    {/* Right Eye */}
    <ellipse cx="228" cy="146" rx="7" ry="5.5" fill="#FFFFFF" />
    <ellipse cx="230" cy="145" rx="4" ry="4.5" fill="#4A311F" />
    <circle cx="232" cy="143.5" r="1.5" fill="#C7FF45" />
    <circle cx="229" cy="147" r="0.8" fill="#00E5FF" opacity="0.75" />
    <path d="M219 143 C224 140 233 140 237 143" stroke="#121410" strokeWidth="1.75" fill="none" strokeLinecap="round" />

    {/* Nose (Slight 3/4 profile) */}
    <path d="M202 158 L201 170 L207 171" stroke="#9C6542" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

    {/* Mouth (Determined, forward-looking visionary smile) */}
    <path d="M194 188 C200 192 210 192 216 189" stroke="#7A452C" strokeWidth="1.75" strokeLinecap="round" />

    {/* Wind-Swept Textured Dark Hair (Softly moving toward right with the wind) */}
    <path
      d="M144 125 C140 73 167 46 202 46 C243 46 266 73 263 120 
         C258 102 248 90 238 86 
         C247 106 248 122 246 132 
         C236 112 226 100 215 95 
         C222 112 220 128 212 136 
         C203 110 189 96 178 93 
         C184 113 182 128 174 136 
         C168 116 154 106 144 125 Z"
      fill="#121410"
      stroke="#20241C"
      strokeWidth="1.5"
    />

    {/* Wind-blown fringe hair locks extending dynamically */}
    <path d="M246 95 C258 90 268 96 276 92 C268 100 256 102 246 102 Z" fill="#121410" />
    <path d="M250 115 C262 112 272 120 280 116 C272 122 260 124 250 123 Z" fill="#121410" />

    {/* Hair Highlights & Sheen */}
    <path d="M188 63 C198 58 220 60 230 66" stroke="#343A2E" strokeWidth="2" strokeLinecap="round" />
    <path d="M168 78 C178 73 194 74 198 80" stroke="#343A2E" strokeWidth="1.5" strokeLinecap="round" />

    {/* HUD Corner Reticles Around Avatar Frame */}
    <path d="M50 40 L30 40 L30 60" stroke="#C7FF45" strokeWidth="1.5" opacity="0.6" />
    <path d="M350 40 L370 40 L370 60" stroke="#C7FF45" strokeWidth="1.5" opacity="0.6" />
    <path d="M30 440 L30 460 L50 460" stroke="#C7FF45" strokeWidth="1.5" opacity="0.6" />
    <path d="M370 440 L370 460 L350 460" stroke="#C7FF45" strokeWidth="1.5" opacity="0.6" />

    {/* Bottom Status Text */}
    <text x="200" y="475" textAnchor="middle" fill="#C7FF45" fontSize="8" fontFamily="monospace" letterSpacing="2" opacity="0.75">
      STATE: FUTURE // HORIZON SCANNING
    </text>
  </svg>
);
