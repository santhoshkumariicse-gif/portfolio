import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HoloButton } from '../hud/HoloButton';
import { Compass, Play, Navigation, Layers, FastForward } from 'lucide-react';

export interface PrologueOverlayProps {
  onBeginJourney: () => void;
  onStartTour: () => void;
  onEnterFreeRoam: () => void;
  onEnterSimplePortfolio: () => void;
}

export const PrologueOverlay: React.FC<PrologueOverlayProps> = ({
  onBeginJourney,
  onStartTour,
  onEnterFreeRoam,
  onEnterSimplePortfolio
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 z-40 pointer-events-none flex flex-col justify-between overflow-hidden select-none font-mono">
      {/* 1. Cinematic Top Letterbox Bar */}
      <div className="w-full h-14 sm:h-18 bg-[#060705] border-b border-white/10 px-4 sm:px-8 flex items-center justify-between text-[10px] text-[var(--muted)] pointer-events-auto">
        <div className="flex items-center gap-2 text-[#00E5FF]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping" />
          <span className="font-bold tracking-widest uppercase">
            SAN AI // DEEP SPACE ORBITAL INGRESS
          </span>
        </div>

        <button
          type="button"
          onClick={onBeginJourney}
          className="flex items-center gap-1.5 text-xs text-[var(--secondary-text)] hover:text-[#C7FF45] uppercase tracking-wider transition-colors"
        >
          <span>Skip Intro</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Center Cinematic Title Card */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center pointer-events-auto">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl w-full"
        >
          {/* Institution & Mission Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-bold uppercase tracking-widest mb-4">
            <span>PROLOGUE // GATEWAY TO AETHELGARD</span>
          </div>

          {/* Grand Headline: SANTHOSH KUMAR M */}
          <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--primary-text)] font-sans uppercase leading-none">
            SANTHOSH KUMAR M
          </h1>

          {/* Subtitle */}
          <p className="mt-3 text-sm sm:text-lg md:text-xl font-mono text-[#C7FF45] font-semibold tracking-wider uppercase">
            ASPIRING SOFTWARE DEVELOPER
          </p>

          {/* Tagline */}
          <p className="mt-2 text-base sm:text-xl font-[var(--serif)] italic text-[var(--secondary-text)]">
            "Exploring ideas. Engineering possibilities."
          </p>

          {/* Four Mode Action Buttons */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            {/* 1. Begin Journey */}
            <HoloButton
              variant="lime"
              onClick={onBeginJourney}
              icon={<Play className="w-4 h-4 fill-current" />}
              className="min-h-[44px] px-5 font-bold"
            >
              Begin Journey
            </HoloButton>

            {/* 2. Guided Tour */}
            <HoloButton
              variant="cyan"
              onClick={onStartTour}
              icon={<Compass className="w-4 h-4" />}
              className="min-h-[44px] px-4"
            >
              Guided Tour
            </HoloButton>

            {/* 3. Free Roam */}
            <HoloButton
              variant="cyan"
              onClick={onEnterFreeRoam}
              icon={<Navigation className="w-4 h-4" />}
              className="min-h-[44px] px-4"
            >
              Free Roam
            </HoloButton>

            {/* 4. Simple Portfolio */}
            <HoloButton
              variant="crimson"
              onClick={onEnterSimplePortfolio}
              icon={<Layers className="w-4 h-4" />}
              className="min-h-[44px] px-4"
            >
              Simple Portfolio
            </HoloButton>
          </motion.div>
        </motion.div>
      </div>

      {/* 3. Cinematic Bottom Letterbox Bar */}
      <div className="w-full h-14 sm:h-18 bg-[#060705] border-t border-white/10 px-4 sm:px-8 flex items-center justify-between text-[10px] text-[var(--muted)] pointer-events-auto">
        <div className="flex items-center gap-4">
          <span>LAT: 10.9254° N</span>
          <span>LONG: 79.8380° E</span>
          <span className="hidden sm:inline">ALTITUDE: 150,000 M</span>
        </div>

        <div className="text-[#C7FF45] font-semibold">
          PRESS ANY ACTION TO COMMENCE INGRESS
        </div>
      </div>
    </div>
  );
};
