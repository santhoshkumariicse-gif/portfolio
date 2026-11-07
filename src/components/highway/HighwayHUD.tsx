import React from 'react';
import { useHighwayState } from './HighwayStateContext';
import { HighwaySectionCard } from './HighwaySectionCard';
import { HighwayNavigationUI } from './HighwayNavigationUI';
import { Volume2, VolumeX, Globe } from 'lucide-react';

export interface HighwayHUDProps {
  onReturnToUniverse?: () => void;
}

export const HighwayHUD: React.FC<HighwayHUDProps> = ({ onReturnToUniverse }) => {
  const { isMuted, toggleMute } = useHighwayState();

  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex flex-col justify-between p-3 sm:p-6 select-none font-sans">
      {/* 1. MINIMAL TOP AUTOMOTIVE HEADER */}
      <header className="flex items-center justify-between gap-3 w-full shrink-0">
        {/* Top-Left: Clean Motorsport Telemetry Branding & Sequential Mode Pill */}
        <div className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#F2F4F7]/95 border border-[rgba(9,11,14,0.12)] backdrop-blur-xl shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#E10620] animate-pulse shadow-[0_0_8px_#E10620]" />
          <span className="text-[#090B0E] font-mono font-black text-xs sm:text-sm tracking-wider">
            THE ROAD OF SANTHOSH
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-[#E10620]/10 text-[#E10620] border border-[#E10620]/25 font-bold">
            SEQUENTIAL VIEW
          </span>
        </div>

        {/* Top-Right: Sound Toggle & Universe Home */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Audio Mute Toggle */}
          <button
            type="button"
            onClick={toggleMute}
            className={`p-2 rounded-xl border transition-all backdrop-blur-xl shadow-sm ${
              !isMuted
                ? 'bg-[#E10620]/15 border-[#E10620] text-[#E10620]'
                : 'bg-[#F2F4F7] border-[rgba(9,11,14,0.12)] text-[#626C78] hover:text-[#090B0E] hover:border-[#E10620]'
            }`}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#E10620]" />}
          </button>

          {/* Universe Home Button */}
          {onReturnToUniverse && (
            <button
              type="button"
              onClick={onReturnToUniverse}
              className="px-3.5 py-2 bg-[#F2F4F7] hover:bg-[#DCE2E8] text-[#090B0E] rounded-xl font-mono font-bold text-xs uppercase tracking-wider border border-[rgba(9,11,14,0.12)] hover:border-[#E10620] shadow-sm transition-all flex items-center gap-1.5 backdrop-blur-xl"
              title="Return to 3D Universe Home"
              aria-label="Return to 3D Universe Home"
            >
              <Globe className="w-3.5 h-3.5 text-[#E10620]" />
              <span className="hidden sm:inline">Universe Home</span>
            </button>
          )}
        </div>
      </header>

      {/* 2. ACTIVE SECTION INFORMATION DISPLAY (Shows ONLY active section's info) */}
      <div className="flex-1 flex items-center sm:items-start lg:items-center justify-start py-2 sm:py-4 pointer-events-none">
        <HighwaySectionCard />
      </div>

      {/* 3. SEQUENTIAL NAVIGATION CONTROL DOCK */}
      <footer className="w-full shrink-0 pt-2 pointer-events-none">
        <HighwayNavigationUI onReturnToUniverse={onReturnToUniverse} />
      </footer>
    </div>
  );
};
