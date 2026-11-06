import React from 'react';
import { ZONE_COORDINATES, ZoneCoordinate } from './WorldCoordinates';
import { Compass } from 'lucide-react';

export interface WorldMinimapProps {
  activeZoneId?: string;
  onSelectZone?: (zone: ZoneCoordinate) => void;
  className?: string;
}

export const WorldMinimap: React.FC<WorldMinimapProps> = ({
  activeZoneId = 'origin-coast',
  onSelectZone,
  className = ''
}) => {
  // Mapping 3D coordinates [-150..150] into SVG viewBox [0..200]
  // X: -100..100 -> 0..200
  // Z: 100..-160 -> 200..0
  const projectCoords = (coords: [number, number, number]): [number, number] => {
    const x = coords[0];
    const z = coords[2];
    const svgX = 100 + (x / 110) * 80;
    const svgY = 100 - (z / 150) * 85;
    return [svgX, svgY];
  };

  return (
    <div
      className={`relative p-3 rounded-sm bg-[#0A0B09]/90 border border-white/20 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.8)] font-mono text-[10px] ${className}`}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-white/10 text-[var(--muted)]">
        <span className="flex items-center gap-1.5 text-[#C7FF45] font-bold">
          <Compass className="w-3.5 h-3.5" />
          <span>AETHELGARD // MINIMAP</span>
        </span>
        <span className="text-[9px] text-[#00E5FF]">RADAR_ONLINE</span>
      </div>

      {/* SVG Radar Map */}
      <div className="relative w-44 h-44 sm:w-52 sm:h-52 bg-black/60 rounded-sm border border-white/10 overflow-hidden">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <radialGradient id="radarSweep" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(199, 255, 69, 0.2)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Radar Sweep Rings */}
          <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(240,240,233,0.06)" strokeWidth="1" />
          <circle cx="100" cy="100" r="55" fill="none" stroke="rgba(240,240,233,0.08)" strokeWidth="1" />
          <circle cx="100" cy="100" r="25" fill="none" stroke="rgba(240,240,233,0.1)" strokeWidth="1" />
          <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(240,240,233,0.08)" strokeDasharray="2 4" />
          <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(240,240,233,0.08)" strokeDasharray="2 4" />

          {/* Island Outline Geometry */}
          <path
            d="M 100 25 C 130 35, 160 70, 155 120 C 150 160, 120 180, 100 180 C 80 180, 45 160, 45 120 C 45 70, 70 35, 100 25 Z"
            fill="rgba(19, 25, 20, 0.75)"
            stroke="rgba(199, 255, 69, 0.35)"
            strokeWidth="1.2"
          />

          {/* Zone Markers */}
          {Object.values(ZONE_COORDINATES).map((zone) => {
            if (zone.id === 'prologue') return null;
            const [cx, cy] = projectCoords(zone.center);
            const isSelected = activeZoneId === zone.id;

            return (
              <g
                key={zone.id}
                onClick={() => onSelectZone?.(zone)}
                className="cursor-pointer group"
              >
                {/* Ping animation when active */}
                {isSelected && (
                  <circle cx={cx} cy={cy} r="8" fill="none" stroke={zone.color} strokeWidth="1" className="animate-ping" />
                )}

                {/* Center marker */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? '4' : '3'}
                  fill={zone.color}
                  stroke="#0A0B09"
                  strokeWidth="1"
                />

                {/* Zone Label */}
                <text
                  x={cx + 6}
                  y={cy + 3}
                  fill={isSelected ? '#F0F0E9' : '#9BA195'}
                  fontSize="7"
                  fontFamily="monospace"
                  fontWeight={isSelected ? 'bold' : 'normal'}
                >
                  {zone.id.split('-')[0].toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom Status / Fast Travel Hint */}
      <div className="mt-2 flex items-center justify-between text-[9px] text-[var(--muted)]">
        <span>ACTIVE: {activeZoneId.toUpperCase()}</span>
        <span className="text-[#C7FF45]">CLICK TO FAST-TRAVEL</span>
      </div>
    </div>
  );
};

