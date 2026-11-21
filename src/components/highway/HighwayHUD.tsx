import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useHighwayState } from './HighwayStateContext';
import { HighwayNavigationUI } from './HighwayNavigationUI';
import { Volume2, VolumeX, Globe, Pause, Play, Clapperboard } from 'lucide-react';

export interface HighwayHUDProps {
  onReturnToUniverse?: () => void;
}

export const HighwayHUD: React.FC<HighwayHUDProps> = ({ onReturnToUniverse }) => {
  const { isMuted, toggleMute, isJourneyPaused, toggleJourneyPause } = useHighwayState();
  const [openingComplete, setOpeningComplete] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('skipIntro') === 'true';
    }
    return false;
  });
  const [experienceMode, setExperienceMode] = useState<'cinematic' | 'interactive'>('cinematic');

  useEffect(() => {
    if (openingComplete) return;
    const timer = window.setTimeout(() => setOpeningComplete(true), 2400);
    return () => window.clearTimeout(timer);
  }, [openingComplete]);


  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex flex-col justify-between p-3 sm:p-6 select-none font-sans">
      <AnimatePresence>
        {!openingComplete && (
          <motion.div
            onClick={() => setOpeningComplete(true)}
            className="pointer-events-auto cursor-pointer absolute inset-0 z-[60] flex items-center justify-center bg-[#090B0E]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            title="Click or tap to skip intro"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.96, 1, 1, 1.02] }}
              transition={{ duration: 2.2, times: [0, 0.25, 0.75, 1], ease: 'easeInOut' }}
              className="text-center px-6"
            >
              <div className="text-[10px] sm:text-xs font-mono tracking-[0.45em] text-[#FF3548] uppercase">A personal journey</div>
              <div className="mt-3 text-xl sm:text-3xl font-black tracking-[0.18em] text-[#F2F4F7] uppercase">The Road of Santhosh</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
          <button
            type="button"
            onClick={() => setExperienceMode((mode) => mode === 'cinematic' ? 'interactive' : 'cinematic')}
            className="sm:hidden p-2 rounded-xl border border-[rgba(9,11,14,0.12)] bg-[#F2F4F7]/95 text-[#090B0E]"
            title={`Switch to ${experienceMode === 'cinematic' ? 'Interactive' : 'Cinematic'} mode`}
            aria-label={`Switch to ${experienceMode === 'cinematic' ? 'Interactive' : 'Cinematic'} mode`}
          >
            <Clapperboard className="w-4 h-4 text-[#E10620]" />
          </button>

          <div className="hidden sm:flex items-center rounded-xl border border-[rgba(9,11,14,0.12)] bg-[#F2F4F7]/95 p-1 backdrop-blur-xl shadow-sm">
            <button
              type="button"
              onClick={() => setExperienceMode('cinematic')}
              className={`h-8 px-3 rounded-lg text-[10px] font-mono font-bold uppercase flex items-center gap-1.5 transition-colors ${
                experienceMode === 'cinematic' ? 'bg-[#090B0E] text-white' : 'text-[#626C78] hover:text-[#090B0E]'
              }`}
              aria-pressed={experienceMode === 'cinematic'}
            >
              <Clapperboard className="w-3.5 h-3.5" /> Cinematic
            </button>
            <button
              type="button"
              onClick={() => setExperienceMode('interactive')}
              className={`h-8 px-3 rounded-lg text-[10px] font-mono font-bold uppercase transition-colors ${
                experienceMode === 'interactive' ? 'bg-[#090B0E] text-white' : 'text-[#626C78] hover:text-[#090B0E]'
              }`}
              aria-pressed={experienceMode === 'interactive'}
            >
              Interactive
            </button>
          </div>

          {experienceMode === 'cinematic' && (
            <button
              type="button"
              onClick={toggleJourneyPause}
              className="p-2 rounded-xl border border-[rgba(9,11,14,0.12)] bg-[#F2F4F7]/95 text-[#090B0E] hover:border-[#E10620] backdrop-blur-xl shadow-sm"
              title={isJourneyPaused ? 'Resume cinematic journey' : 'Pause cinematic journey'}
              aria-label={isJourneyPaused ? 'Resume cinematic journey' : 'Pause cinematic journey'}
            >
              {isJourneyPaused ? <Play className="w-4 h-4 text-[#E10620]" /> : <Pause className="w-4 h-4 text-[#E10620]" />}
            </button>
          )}

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

      {/* 2. Roadside billboard content is rendered in the 3D scene; no central overlay is used. */}
      <div className="flex-1 pointer-events-none" />

      {/* 3. SEQUENTIAL NAVIGATION CONTROL DOCK */}
      <footer className="w-full shrink-0 pt-2 pointer-events-none">
        <HighwayNavigationUI onReturnToUniverse={onReturnToUniverse} />
      </footer>
    </div>
  );
};
