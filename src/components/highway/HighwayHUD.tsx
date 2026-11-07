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
      {/* 1. MINIMAL TOP HEADER */}
      <header className="flex items-center justify-between gap-3 w-full shrink-0">
        {/* Top-Left: Clean Branding & Sequential Mode Pill */}
        <div className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#07120D]/90 border border-[#00E676]/30 backdrop-blur-xl shadow-lg">
          <div className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
          <span className="text-white font-mono font-black text-xs sm:text-sm tracking-wider">
            THE ROAD OF SANTHOSH
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-[#00E676]/15 text-[#39FF88] border border-[#00E676]/30 font-bold">
            SEQUENTIAL VIEW
          </span>
        </div>

        {/* Top-Right: Sound Toggle & Universe Home */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Audio Mute Toggle */}
          <button
            type="button"
            onClick={toggleMute}
            className={`p-2 rounded-xl border transition-all backdrop-blur-xl ${
              !isMuted
                ? 'bg-[#00E676]/20 border-[#00E676] text-[#00E676] shadow-[0_0_15px_rgba(0,230,118,0.3)]'
                : 'bg-[#07120D]/90 border-white/20 text-slate-400 hover:text-white hover:border-[#00E676]'
            }`}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#00E676]" />}
          </button>

          {/* Universe Home Button */}
          {onReturnToUniverse && (
            <button
              type="button"
              onClick={onReturnToUniverse}
              className="px-3 py-2 bg-[#00E676]/15 hover:bg-[#00E676]/30 text-[#39FF88] rounded-xl font-mono font-bold text-xs uppercase tracking-wider border border-[#00E676]/40 shadow-sm transition-all flex items-center gap-1.5 backdrop-blur-xl"
              title="Return to 3D Universe Home"
              aria-label="Return to 3D Universe Home"
            >
              <Globe className="w-3.5 h-3.5 text-[#00E676]" />
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
