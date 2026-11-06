import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UniverseCanvas } from './UniverseCanvas';
import { WorldMinimap } from './WorldMinimap';
import { PrologueOverlay } from './PrologueOverlay';
import { ZONE_COORDINATES, ZoneCoordinate } from './WorldCoordinates';
import { AICore, AIConversationPanel } from '../../ai';
import { Layers, X, Sparkles, Navigation } from 'lucide-react';

export interface UniverseStageProps {
  onExitUniverse: () => void;
}

export const UniverseStage: React.FC<UniverseStageProps> = ({ onExitUniverse }) => {
  const [activeZone, setActiveZone] = useState<ZoneCoordinate>(ZONE_COORDINATES['prologue']);
  const [showMinimap, setShowMinimap] = useState(true);

  const zonesList = Object.values(ZONE_COORDINATES).filter((z) => z.id !== 'prologue');

  return (
    <div className="relative w-full h-screen bg-[#0A0B09] overflow-hidden select-none">
      {/* 1. Main 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0">
        <UniverseCanvas activeZone={activeZone} />
      </div>

      {/* 2. Prologue Mode Cinematic Overlay */}
      {activeZone.id === 'prologue' ? (
        <PrologueOverlay
          onBeginJourney={() => setActiveZone(ZONE_COORDINATES['origin-coast'])}
          onStartTour={() => setActiveZone(ZONE_COORDINATES['origin-coast'])}
          onEnterFreeRoam={() => setActiveZone(ZONE_COORDINATES['origin-coast'])}
          onEnterSimplePortfolio={onExitUniverse}
        />
      ) : (
        <>
          {/* Top HUD Banner */}
          <div className="absolute top-0 left-0 right-0 z-20 p-3 sm:p-5 flex items-center justify-between pointer-events-none">
            {/* Left: Project & Universe Badge */}
            <div className="pointer-events-auto flex items-center gap-2.5 bg-[#0A0B09]/85 border border-white/20 p-2 sm:px-3 sm:py-2 rounded-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
              <div className="font-mono text-xs">
                <span className="text-[#00E5FF] font-bold block sm:inline mr-2">SAN AI // UNIVERSE</span>
                <span className="text-[var(--secondary-text)] text-[10px] hidden md:inline">
                  EXPLORABLE 3D ISLAND PROTOTYPE
                </span>
              </div>
            </div>

            {/* Center: Current Zone HUD Pillar */}
            <div className="pointer-events-auto hidden sm:flex items-center gap-2 bg-[#0A0B09]/85 border border-white/20 px-3 py-1.5 rounded-sm backdrop-blur-md font-mono text-xs">
              <Navigation className="w-3.5 h-3.5 text-[#C7FF45]" />
              <span className="text-[var(--primary-text)] font-bold">{activeZone.name}</span>
              <span className="text-[var(--muted)]">·</span>
              <span className="text-[10px] text-[#C7FF45]">
                [{activeZone.center[0]}, {activeZone.center[1]}, {activeZone.center[2]}]
              </span>
            </div>

            {/* Right: Exit / Classic View Switcher */}
            <div className="pointer-events-auto flex items-center gap-2">
              <button
                type="button"
                onClick={onExitUniverse}
                className="px-3 py-1.5 bg-[#C7FF45] text-[#0A0B09] font-mono text-xs font-extrabold uppercase tracking-wider rounded-sm shadow-[0_0_15px_rgba(199,255,69,0.4)] hover:bg-[#D2FF5E] transition-all flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Classic Portfolio</span>
                <X className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          </div>

          {/* Bottom Zone Quick-Travel Bar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 max-w-2xl w-[92%] pointer-events-auto">
            <div className="p-1.5 bg-[#0A0B09]/90 border border-white/20 rounded-sm backdrop-blur-md flex items-center justify-between gap-1 overflow-x-auto shadow-2xl">
              {zonesList.map((zone) => {
                const isCurrent = activeZone.id === zone.id;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setActiveZone(zone)}
                    className={`px-2.5 py-1.5 rounded-sm font-mono text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isCurrent
                        ? 'bg-[#C7FF45] text-[#0A0B09] font-bold shadow-[0_0_10px_rgba(199,255,69,0.4)]'
                        : 'text-[var(--secondary-text)] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: isCurrent ? '#0A0B09' : zone.color }}
                    />
                    <span>{zone.name.replace('Zone 0', 'Z0').replace(': ', ' ')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom-Left Collapsible Radar Minimap */}
          <div className="absolute bottom-16 sm:bottom-6 left-3 sm:left-6 z-20 pointer-events-auto">
            <AnimatePresence>
              {showMinimap && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <WorldMinimap
                    activeZoneId={activeZone.id}
                    onSelectZone={(zone) => setActiveZone(zone)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={() => setShowMinimap(!showMinimap)}
              className="mt-1.5 px-2 py-0.5 bg-[#0A0B09]/80 border border-white/10 text-[9px] font-mono text-[var(--muted)] hover:text-white rounded-sm"
            >
              {showMinimap ? 'HIDE MINIMAP' : 'SHOW MINIMAP'}
            </button>
          </div>

          {/* Bottom-Right Navigation Instructions */}
          <div className="hidden lg:block absolute bottom-6 right-6 z-20 pointer-events-none p-3 bg-[#0A0B09]/80 border border-white/10 rounded-sm font-mono text-[10px] text-[var(--secondary-text)] backdrop-blur-md">
            <div className="text-[#C7FF45] font-bold mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>PROTOTYPE CONTROLS</span>
            </div>
            <div>• Left Click + Drag: Rotate Orbit</div>
            <div>• Right Click + Drag: Pan Camera</div>
            <div>• Scroll Wheel: Zoom Altitude</div>
            <div>• Minimap: Click zones to travel</div>
          </div>

          {/* Floating SAN AI Holographic Core */}
          <div className="fixed top-20 right-4 sm:right-6 z-30 pointer-events-auto">
            <AICore size={80} />
          </div>
        </>
      )}

      {/* Global AI Conversation Panel */}
      <AIConversationPanel />
    </div>
  );
};

