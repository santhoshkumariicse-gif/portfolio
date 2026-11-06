import React from 'react';
import { motion } from 'framer-motion';
import { useHighwayState } from './HighwayStateContext';
import { HIGHWAY_MILESTONES } from './HighwaySpline';
import { useSanAI } from '../../ai';
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
  ArrowRight,
  Camera,
  Mic,
  MicOff,
  Maximize2,
  Globe
} from 'lucide-react';

export interface HighwayHUDProps {
  onExitHighway: () => void;
  onReturnToUniverse?: () => void;
  onOpenSANAI: () => void;
  onInspectMilestone: (km: number) => void;
}

export const HighwayHUD: React.FC<HighwayHUDProps> = ({
  onExitHighway,
  onReturnToUniverse,
  onOpenSANAI,
  onInspectMilestone
}) => {
  const {
    progress,
    currentKM,
    speed,
    mode,
    cameraView,
    activeMilestone,
    isMuted,
    toggleMode,
    toggleCameraView,
    setTargetKM,
    toggleMute,
    accelerate,
    brake,
    steer
  } = useHighwayState();

  const { state: aiState, toggleListening } = useSanAI();

  const formattedKM = currentKM.toFixed(2);
  const progressPercent = Math.round(progress * 100);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex flex-col justify-between p-3 sm:p-6 select-none font-mono">
      {/* 1. TOP TELEMETRY QUADRANT */}
      <header className="flex items-start justify-between gap-3 w-full">
        {/* Top Left: SAN AI Holographic Identity */}
        <div className="pointer-events-auto flex items-center gap-3 bg-[#0A0D0B]/90 border border-red-500/30 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
          {/* Holographic Concentric Rings Core Button */}
          <button
            type="button"
            onClick={onOpenSANAI}
            className="relative w-10 h-10 flex items-center justify-center group"
            title="Interact with SAN AI Assistant"
            aria-label="Open SAN AI Assistant"
          >
            <div
              className="absolute inset-0 rounded-full border border-[#00E5FF]/40 group-hover:border-[#00E5FF] transition-all animate-spin"
              style={{ animationDuration: '9s' }}
            />
            <div
              className="absolute inset-1 rounded-full border border-dashed border-[#FF1E40]/60 group-hover:border-[#FF1E40] transition-all animate-spin"
              style={{ animationDuration: '6s', animationDirection: 'reverse' }}
            />
            <div className="w-3.5 h-3.5 rounded-full bg-[#FF1E40] shadow-[0_0_12px_#FF1E40] group-hover:scale-125 transition-transform" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-black text-xs sm:text-sm tracking-wider">SAN AI</span>
              <span className="text-[#00E5FF] text-[10px] font-bold">COPILOT v4.0</span>
              <span className={`w-1.5 h-1.5 rounded-full ${aiState === 'listening' ? 'bg-[#FF1E40] animate-ping' : 'bg-[#00E5FF]'}`} />
            </div>
            <div className="text-[9px] text-slate-400 flex items-center gap-1.5">
              <span className="text-[#FFB347] font-semibold">
                MODE: {mode === 'autopilot' ? 'AUTOPILOT CRUISE' : 'MANUAL DRIVE'}
              </span>
              <span>·</span>
              <span className="text-white/40 hidden sm:inline">VIEW: {cameraView.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Top Right: KM Counter, Chapter, and Quick Action Controls */}
        <div className="pointer-events-auto flex flex-col items-end gap-1.5">
          {/* Milestone & Odometer Panel */}
          <div className="bg-[#0A0D0B]/90 border border-white/15 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.9)] text-right">
            <div className="flex items-center justify-end gap-2 text-xs sm:text-sm font-black">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider">ODOMETER</span>
              <span className="text-[#FF1E40] text-base sm:text-lg tracking-widest font-black">
                KM {formattedKM} <span className="text-xs text-white/40">/ 7.00</span>
              </span>
            </div>

            <div className="text-[10px] text-[#FFB347] font-bold flex items-center justify-end gap-1.5 mt-0.5">
              <Compass className="w-3 h-3 text-[#FFB347]" />
              <span>{activeMilestone.codeName}</span>
            </div>
          </div>

          {/* Action Pills: Mode Switch, Camera, Voice, Mute, 2D HTML */}
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            {/* Autopilot vs Manual Toggle */}
            <button
              type="button"
              onClick={toggleMode}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md border text-[10px] font-bold uppercase transition-all flex items-center gap-1.5 backdrop-blur-md ${
                mode === 'autopilot'
                  ? 'bg-[#FF1E40] text-white border-[#FF1E40] shadow-[0_0_15px_rgba(255,30,64,0.4)]'
                  : 'bg-[#0A0D0B]/85 border-white/20 text-white hover:border-[#FF1E40]'
              }`}
              title={mode === 'autopilot' ? 'Switch to Manual Keyboard/Scroll Drive' : 'Engage SAN AI Cruise Autopilot'}
            >
              <Navigation className="w-3 h-3" />
              <span>{mode === 'autopilot' ? 'AUTOPILOT ON' : 'MANUAL DRIVE'}</span>
            </button>

            {/* Camera View Switcher (Chase vs Cockpit) */}
            <button
              type="button"
              onClick={toggleCameraView}
              className="px-2 py-1 sm:px-2.5 sm:py-1.5 bg-[#0A0D0B]/85 border border-white/20 text-slate-200 hover:text-white hover:border-[#00E5FF] rounded-md text-[10px] font-bold uppercase transition-all flex items-center gap-1 backdrop-blur-md"
              title="Toggle Camera Perspective (Hotkey: C)"
            >
              <Camera className="w-3 h-3 text-[#00E5FF]" />
              <span className="hidden sm:inline">{cameraView === 'chase' ? 'CHASE' : 'COCKPIT'}</span>
            </button>

            {/* Voice Control Button */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-1.5 sm:p-2 rounded-md border transition-all backdrop-blur-md ${
                aiState === 'listening'
                  ? 'bg-[#FF1E40] border-[#FF1E40] text-white shadow-[0_0_15px_rgba(255,30,64,0.5)] animate-pulse'
                  : 'bg-[#0A0D0B]/85 border-white/20 text-slate-300 hover:text-white hover:border-[#00E5FF]'
              }`}
              title="Voice Navigation (e.g. 'Drive to about', 'Show skills', 'Hire Santhosh')"
              aria-label="Voice Navigation"
            >
              {aiState === 'listening' ? <Mic className="w-3.5 h-3.5 text-white" /> : <MicOff className="w-3.5 h-3.5" />}
            </button>

            {/* Audio Mute Toggle */}
            <button
              type="button"
              onClick={toggleMute}
              className={`p-1.5 sm:p-2 rounded-md border transition-all backdrop-blur-md ${
                !isMuted
                  ? 'bg-[#FFB347]/20 border-[#FFB347] text-[#FFB347]'
                  : 'bg-[#0A0D0B]/85 border-white/20 text-slate-400 hover:text-white'
              }`}
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#FFB347]" />}
            </button>

            {/* Universe Home Button */}
            {onReturnToUniverse && (
              <button
                type="button"
                onClick={onReturnToUniverse}
                className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#00E5FF]/10 hover:bg-[#00E5FF]/25 text-[#00E5FF] rounded-md font-bold text-[10px] uppercase tracking-wider border border-[#00E5FF]/40 shadow-sm transition-all flex items-center gap-1 backdrop-blur-md"
                title="Return to 3D Universe Home"
              >
                <Globe className="w-3 h-3 text-[#00E5FF]" />
                <span className="hidden sm:inline">Universe</span>
              </button>
            )}

            {/* 2D Classic Portfolio Fallback */}
            <button
              type="button"
              onClick={onExitHighway}
              className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-md font-bold text-[10px] uppercase tracking-wider border border-white/20 shadow-sm transition-all flex items-center gap-1 backdrop-blur-md"
              title="Switch to Traditional 2D Portfolio View"
            >
              <Layers className="w-3 h-3 text-slate-300" />
              <span className="hidden sm:inline">2D Classic</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. CENTER HIGHWAY GUIDANCE CARD (Click to Inspect) */}
      <div className="self-center text-center my-auto pointer-events-auto">
        <motion.button
          key={activeMilestone.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          onClick={() => onInspectMilestone(activeMilestone.km)}
          className="bg-[#070908]/85 border border-red-500/40 hover:border-red-500 px-5 py-2.5 rounded-xl backdrop-blur-xl max-w-md mx-auto group shadow-[0_0_30px_rgba(255,30,64,0.2)] transition-all cursor-pointer text-left block"
          title="Click to Inspect Milestone Details"
        >
          <div className="flex items-center justify-between text-[10px] text-[#00E5FF] tracking-widest uppercase font-bold">
            <div className="flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-[#FF1E40] animate-pulse" />
              <span>KM {activeMilestone.km.toFixed(1)} // {activeMilestone.title}</span>
            </div>
            <Maximize2 className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
          </div>

          <div className="text-xs sm:text-sm font-black text-white tracking-wider mt-1">
            {activeMilestone.subtitle}
          </div>

          <div className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-between">
            <span className="truncate">{activeMilestone.description}</span>
            <span className="text-[#FF1E40] text-[9px] font-bold uppercase ml-2 shrink-0 group-hover:underline">
              Inspect [ENTER]
            </span>
          </div>
        </motion.button>
      </div>

      {/* 3. MOBILE TOUCH CONTROLS */}
      <div className="pointer-events-auto block md:hidden self-center mb-2 flex items-center gap-2">
        <button
          type="button"
          onTouchStart={() => steer(-1)}
          onClick={() => steer(-1)}
          className="p-3 bg-[#0A0D0B]/90 border border-white/20 active:bg-[#FF1E40] active:text-white rounded-lg text-white"
          aria-label="Steer Left"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onTouchStart={() => accelerate(10)}
          onClick={() => accelerate(10)}
          className="p-3 bg-[#0A0D0B]/90 border border-white/20 active:bg-[#FF1E40] active:text-white rounded-lg text-white"
          aria-label="Accelerate"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
        <button
          type="button"
          onTouchStart={() => brake(12)}
          onClick={() => brake(12)}
          className="p-3 bg-[#0A0D0B]/90 border border-white/20 active:bg-[#FF1E40] active:text-white rounded-lg text-white"
          aria-label="Brake"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
        <button
          type="button"
          onTouchStart={() => steer(1)}
          onClick={() => steer(1)}
          className="p-3 bg-[#0A0D0B]/90 border border-white/20 active:bg-[#FF1E40] active:text-white rounded-lg text-white"
          aria-label="Steer Right"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* 4. BOTTOM ROADMAP & SPEED TELEMETRY */}
      <footer className="pointer-events-auto flex flex-col items-center gap-2 w-full max-w-4xl mx-auto">
        {/* Speedometer & Progress Strip */}
        <div className="flex items-center justify-between w-full px-2 text-[10px] text-slate-400">
          <div className="flex items-center gap-2 bg-[#0A0D0B]/90 border border-white/10 px-3 py-1 rounded-md backdrop-blur-md">
            <Gauge className="w-3.5 h-3.5 text-[#FFB347]" />
            <span className="text-white font-bold text-xs">{speed.toString().padStart(3, '0')}</span>
            <span className="text-[9px] text-[#FFB347]">KM/H</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-[#0A0D0B]/90 border border-white/10 px-3 py-1 rounded-md backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-[#00E5FF]" />
            <span>DRIVE: W/S OR WHEEL · STEER: A/D · CAM: C</span>
          </div>

          <div className="bg-[#0A0D0B]/90 border border-white/10 px-3 py-1 rounded-md backdrop-blur-md">
            <span>JOURNEY: </span>
            <span className="text-[#FF1E40] font-bold">{progressPercent}%</span>
          </div>
        </div>

        {/* Interactive 8-Checkpoint Milestone Scrub Bar */}
        <div className="w-full bg-[#0A0D0B]/95 border border-white/20 p-2 sm:p-2.5 rounded-xl backdrop-blur-xl shadow-2xl">
          {/* Continuous Progress Line */}
          <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
            <div
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#FF1E40] via-[#FFB347] to-[#00E5FF] transition-all duration-75"
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
                  className={`px-1.5 py-1 rounded text-left transition-all border flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-[#FF1E40] text-white border-[#FF1E40] shadow-[0_0_12px_rgba(255,30,64,0.6)] font-black'
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
