import React from 'react';
import { ZONE_COORDINATES, ZoneCoordinate } from '../universe/WorldCoordinates';

export interface HoloChapterNavProps {
  activeZoneId: string;
  onSelectZone: (zone: ZoneCoordinate) => void;
  className?: string;
}

export const HoloChapterNav: React.FC<HoloChapterNavProps> = ({
  activeZoneId,
  onSelectZone,
  className = ''
}) => {
  const zones = Object.values(ZONE_COORDINATES).filter((z) => z.id !== 'prologue');

  return (
    <div
      className={`p-1.5 rounded-sm bg-[#0E1210]/90 border border-white/15 backdrop-blur-md shadow-lg flex items-center gap-1.5 font-mono text-xs ${className}`}
    >
      {zones.map((zone) => {
        const isActive = activeZoneId === zone.id;
        return (
          <button
            key={zone.id}
            type="button"
            onClick={() => onSelectZone(zone)}
            className={`px-3 py-1.5 rounded-sm transition-all duration-200 flex items-center gap-2 ${
              isActive
                ? 'bg-[#C7FF45] text-[#0A0B09] font-extrabold shadow-[0_0_12px_rgba(199,255,69,0.35)]'
                : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)] hover:bg-white/5'
            }`}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: isActive ? '#0A0B09' : zone.color }}
            />
            <span>{zone.name.replace('Zone 0', 'Z0').replace(': ', ' ')}</span>
          </button>
        );
      })}
    </div>
  );
};
