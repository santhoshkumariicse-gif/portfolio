import React from 'react';

export const ProjectEnvironment: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 opacity-25">
      {/* Radial Crimson Spotlight */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[400px] bg-gradient-to-b from-[#FF3358]/[0.12] via-transparent to-transparent rounded-full blur-3xl" />

      {/* Mission Control Grid Wireframe */}
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none">
        <defs>
          <pattern id="missionGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 51, 88, 0.08)" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#missionGrid)" />

        {/* Tactical Crosshair Reticles */}
        <g stroke="#FF3358" strokeWidth="1" opacity="0.4">
          <circle cx="15%" cy="25%" r="18" fill="none" strokeDasharray="3 3" />
          <line x1="15%" y1="21%" x2="15%" y2="29%" />
          <line x1="13%" y1="25%" x2="17%" y2="25%" />

          <circle cx="85%" cy="75%" r="24" fill="none" strokeDasharray="4 4" />
          <line x1="85%" y1="70%" x2="85%" y2="80%" />
          <line x1="82%" y1="75%" x2="88%" y2="75%" />
        </g>
      </svg>
    </div>
  );
};
