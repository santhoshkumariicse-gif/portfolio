import React from 'react';
import { motion } from 'framer-motion';
import { useHighwayState } from './HighwayStateContext';
import { HIGHWAY_MILESTONES } from './HighwaySpline';
import {
  Compass,
  Gauge,
  Radio,
  Volume2,
  VolumeX,
  Layers,
  Navigation,
  Sparkles,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

export interface HighwayHUDProps {
  onExitHighway: () => void;
  onOpenSANAI: () => void;
}

export const HighwayHUD: React.FC<HighwayHUDProps> = ({ onExitHighway, onOpenSANAI }) => {
  const {
    progress,
    currentKM,
    speed,
    mode,
    activeMilestone,
    isMuted,
    toggleMode,
    setTargetKM,
    toggleMute,
    accelerate,
    brake,
    steer
  } = useHighwayState();

  const formattedKM = currentKM.toFixed(2);
  const progressPercent = Math.round(progress * 100);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex flex-col justify-between p-3 sm:p-6 select-none font-mono">
      {/* 1. TOP QUADRANT */}
      <header className="flex items-start justify-between gap-3 w-full">
        {/* Top Left: SAN AI Holographic Identity */}
        <div className="pointer-events-auto flex items-center gap-3 bg-[#0A0B09]/90 border border-white/15 px-3 py-2 sm:px-4 sm:py-2.5 rounded-sm backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.85)]">
          {/* Mini Holographic Concentric Rings */}
          <button
            type="button"
            onClick={onOpenSANAI}
            className="relative w-9 h-9 flex items-center justify-center group"
            title="Interact with SAN AI Assistant"
            aria-label="Open SAN AI Assistant"
          >
            <div className="absolute inset-0 rounded-full border border-[#00E5FF]/40 group-hover:border-[#00E5FF] transition-all animate-spin" style={{ animationDuration: '8s' }} />
            <div className="absolute inset-1 rounded-full border border-dashed border-[#FF3366]/50 group-hover:border-[#FF3366] transition-all animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }} />
            <div className="w-3.5 h-3.5 rounded-full bg-[#00E5FF] shadow-[0_0_12px_#00E5FF] group-hover:scale-125 transition-transform" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[#00E5FF] font-black text-xs sm:text-sm tracking-wider">SAN AI</span>
              <span className="text-white/30 text-[10px]">v3.2</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF45] animate-ping" />
            </div>
            <div className="text-[9px] text-[var(--secondary-text)] flex items-center gap-1.5">
              <span className="text-[#C7FF45]">STATUS: {mode === 'autopilot' ? 'AUTOPILOT ACTIVE' : 'MANUAL DRIVE'}</span>
              <span>·</span>
              <span className="text-white/50 hidden sm:inline">HIGHWAY TELEMETRY</span>
            </div>
          </div>
        </div>

        {/* Top Right: KM Counter, Chapter, and Mode Switcher */}
        <div className="pointer-events-auto flex flex-col items-end gap-1.5">
          {/* Milestone & KM Counter Panel */}
          <div className="bg-[#0A0B09]/90 border border-white/15 px-3 py-2 sm:px-4 sm:py-2.5 rounded-sm backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.85)] text-right">
            <div className="flex items-center justify-end gap-2 text-xs sm:text-sm font-black">
              <span className="text-[var(--secondary-text)] text-[10px] uppercase tracking-wider">ODOMETER</span>
              <span className="text-[#C7FF45] text-base sm:text-lg tracking-widest font-black shadow-sm">
                KM {formattedKM} <span className="text-xs text-white/40">/ 7.00</span>
              </span>
            </div>

            <div className="text-[10px] text-[#FFB347] font-bold flex items-center justify-end gap-1.5 mt-0.5">
              <Compass className="w-3 h-3 text-[#FFB347]" />
              <span>{activeMilestone.codeName}</span>
            </div>
          </div>

          {/* Top Actions: Mode Switch, Mute, Classic View */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleMode}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-sm border text-[10px] font-bold uppercase transition-all flex items-center gap-1.5 backdrop-blur-md ${
                mode === 'autopilot'
                  ? 'bg-[#C7FF45] text-[#0A0B09] border-[#C7FF45] shadow-[0_0_15px_rgba(199,255,69,0.4)]'
                  : 'bg-[#0A0B09]/85 border-white/20 text-white hover:border-[#C7FF45]'
              }`}
              title={mode === 'autopilot' ? 'Switch to Manual Keyboard/Scroll Drive' : 'Engage SAN AI Cruise Autopilot'}
            >
              <Navigation className="w-3 h-3" />
              <span>{mode === 'autopilot' ? 'AUTOPILOT ON' : 'MANUAL DRIVE'}</span>
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className={`p-1.5 sm:p-2 rounded-sm border transition-all backdrop-blur-md ${
                !isMuted
                  ? 'bg-[#C7FF45]/20 border-[#C7FF45] text-[#C7FF45]'
                  : 'bg-[#0A0B09]/85 border-white/20 text-[var(--secondary-text)] hover:text-white'
              }`}
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={onExitHighway}
              className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#C7FF45] text-[#0A0B09] rounded-sm font-extrabold text-[10px] uppercase tracking-wider shadow-[0_0_15px_rgba(199,255,69,0.3)] hover:bg-[#D2FF5E] transition-all flex items-center gap-1"
              title="Switch to 2D HTML Portfolio"
            >
              <Layers className="w-3 h-3" />
              <span className="hidden sm:inline">2D Classic</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. CENTER HIGHWAY GUIDANCE (Fades in on KM changes) */}
      <div className="self-center text-center my-auto">
        <motion.div
          key={activeMilestone.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="bg-[#0A0B09]/80 border border-white/10 px-5 py-2 rounded-sm backdrop-blur-md max-w-md mx-auto"
        >
          <div className="text-[10px] text-[#00E5FF] tracking-widest uppercase font-bold flex items-center justify-center gap-1.5">
            <Radio className="w-3 h-3 text-[#00E5FF] animate-pulse" />
            <span>APPROACHING MILESTONE // KM {activeMilestone.km.toFixed(1)}</span>
          </div>
          <div className="text-sm sm:text-base font-black text-white tracking-wider mt-0.5">
            {activeMilestone.title}
          </div>
          <div className="text-[10px] text-[var(--secondary-text)] mt-0.5">
            {activeMilestone.subtitle}
          </div>
        </motion.div>
      </div>

      {/* 3. MOBILE TOUCH DRIVING BUTTONS (Visible only on mobile/tablet) */}
      <div className="pointer-events-auto block md:hidden self-center mb-2 flex items-center gap-2">
        <button
          type="button"
          onTouchStart={() => steer(-1)}
          onClick={() => steer(-1)}
          className="p-3 bg-[#0A0B09]/90 border border-white/20 active:bg-[#C7FF45] active:text-black rounded text-white"
          aria-label="Steer Left"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onTouchStart={() => accelerate(10)}
          onClick={() => accelerate(10)}
          className="p-3 bg-[#0A0B09]/90 border border-white/20 active:bg-[#C7FF45] active:text-black rounded text-white"
          aria-label="Accelerate"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
        <button
          type="button"
          onTouchStart={() => brake(12)}
          onClick={() => brake(12)}
          className="p-3 bg-[#0A0B09]/90 border border-white/20 active:bg-[#C7FF45] active:text-black rounded text-white"
          aria-label="Brake"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
        <button
          type="button"
          onTouchStart={() => steer(1)}
          onClick={() => steer(1)}
          className="p-3 bg-[#0A0B09]/90 border border-white/20 active:bg-[#C7FF45] active:text-black rounded text-white"
          aria-label="Steer Right"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* 4. BOTTOM ROADMAP & SPEED TELEMETRY */}
      <footer className="pointer-events-auto flex flex-col items-center gap-2 w-full max-w-4xl mx-auto">
        {/* Speedometer & Progress Strip */}
        <div className="flex items-center justify-between w-full px-2 text-[10px] text-[var(--secondary-text)]">
          <div className="flex items-center gap-2 bg-[#0A0B09]/90 border border-white/10 px-3 py-1 rounded-sm backdrop-blur-md">
            <Gauge className="w-3.5 h-3.5 text-[#C7FF45]" />
            <span className="text-white font-bold text-xs">{speed.toString().padStart(3, '0')}</span>
            <span className="text-[9px] text-[#C7FF45]">KM/H</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-[#0A0B09]/90 border border-white/10 px-3 py-1 rounded-sm backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-[#FFB347]" />
            <span>DRIVE: W/S OR SCROLL · STEER: A/D</span>
          </div>

          <div className="bg-[#0A0B09]/90 border border-white/10 px-3 py-1 rounded-sm backdrop-blur-md">
            <span>JOURNEY: </span>
            <span className="text-[#C7FF45] font-bold">{progressPercent}%</span>
          </div>
        </div>

        {/* Interactive 8-Checkpoint Milestone Scrub Bar */}
        <div className="w-full bg-[#0A0B09]/95 border border-white/20 p-2 sm:p-2.5 rounded-sm backdrop-blur-xl shadow-2xl">
          {/* Continuous Progress Line */}
          <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
            <div
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#00E5FF] via-[#FFB347] to-[#C7FF45] transition-all duration-75"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* 8 Clickable Milestone Nodes */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1">
            {HIGHWAY_MILESTONES.map((ms) => {
              const isCurrent = activeMilestone.id === ms.id;
              const isPassed = currentKM >= ms.km;

              return (
                <button
                  key={ms.id}
                  type="button"
                  onClick={() => setTargetKM(ms.km)}
                  className={`px-1.5 py-1 rounded-sm text-left transition-all border flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-[#C7FF45] text-[#0A0B09] border-[#C7FF45] shadow-[0_0_12px_rgba(199,255,69,0.5)] font-black'
                      : isPassed
                      ? 'bg-white/5 border-[#00E5FF]/40 text-white hover:bg-white/15'
                      : 'bg-black/40 border-white/10 text-white/40 hover:text-white hover:bg-white/10'
                  }`}
                  title={`Fast Travel to ${ms.title} (KM ${ms.km})`}
                >
                  <div className="text-[8px] font-mono leading-none">KM {ms.km.toFixed(0)}</div>
                  <div className="text-[9px] font-bold truncate mt-0.5">{ms.title}</div>
                </button>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
};
