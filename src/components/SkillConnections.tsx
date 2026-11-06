import React from 'react';

export interface SkillConnectionsProps {
  activeCategoryId?: string;
  className?: string;
}

export const SkillConnections: React.FC<SkillConnectionsProps> = ({
  activeCategoryId,
  className = ''
}) => {
  return (
    <svg
      viewBox="0 0 800 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full pointer-events-none select-none ${className}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="cyanLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#C7FF45" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.8" />
        </linearGradient>
        <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Grid Network Spine */}
      <line x1="50" y1="120" x2="750" y2="120" stroke="rgba(240, 240, 233, 0.08)" strokeWidth="1" strokeDasharray="4 8" />
      <line x1="400" y1="20" x2="400" y2="220" stroke="rgba(240, 240, 233, 0.08)" strokeWidth="1" strokeDasharray="4 8" />

      {/* Primary Neural Bus Routes */}
      <path
        d="M100 120 C200 40, 300 40, 400 120 C500 200, 600 200, 700 120"
        stroke={activeCategoryId ? 'url(#cyanLineGrad)' : 'rgba(0, 229, 255, 0.25)'}
        strokeWidth={activeCategoryId ? '2' : '1.2'}
        strokeDasharray={activeCategoryId ? '8 6' : '4 8'}
        filter={activeCategoryId ? 'url(#cyanGlow)' : undefined}
      />

      <path
        d="M100 120 C200 200, 300 200, 400 120 C500 40, 600 40, 700 120"
        stroke="rgba(199, 255, 69, 0.2)"
        strokeWidth="1"
        strokeDasharray="6 12"
      />

      {/* Bus Terminals & Junction Points */}
      <circle cx="100" cy="120" r="3" fill="#00E5FF" />
      <circle cx="250" cy="80" r="2.5" fill="#C7FF45" />
      <circle cx="400" cy="120" r="4" fill="#00E5FF" />
      <circle cx="550" cy="160" r="2.5" fill="#C7FF45" />
      <circle cx="700" cy="120" r="3" fill="#00E5FF" />
    </svg>
  );
};
