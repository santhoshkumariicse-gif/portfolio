import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UniverseCanvas } from './UniverseCanvas';
import { WorldMinimap } from './WorldMinimap';
import { PrologueOverlay } from './PrologueOverlay';
import { OriginCoastModal } from './OriginCoastModal';
import { SkillForestModal } from './SkillForestModal';
import { ProjectCityModal } from './ProjectCityModal';
import { ExperienceMountainModal } from './ExperienceMountainModal';
import { ZONE_COORDINATES, ZoneCoordinate } from './WorldCoordinates';
import { AICore, AIConversationPanel, useSanAI } from '../../ai';
import { Layers, X, Sparkles, Navigation, FileText, Cpu, Building2, Mountain } from 'lucide-react';

export interface UniverseStageProps {
  onExitUniverse: () => void;
}

export const UniverseStage: React.FC<UniverseStageProps> = ({ onExitUniverse }) => {
  const [activeZone, setActiveZone] = useState<ZoneCoordinate>(ZONE_COORDINATES['prologue']);
  const [showMinimap, setShowMinimap] = useState(true);
  const [originModalOpen, setOriginModalOpen] = useState(false);
  const [originModalTab, setOriginModalTab] = useState<'workspace' | 'education'>('workspace');
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState('programming-languages');
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState('rda-lorrybook');
  const [expModalOpen, setExpModalOpen] = useState(false);
  const [expModalTab, setExpModalTab] = useState<'roles' | 'certifications'>('roles');
  const [announcedZones, setAnnouncedZones] = useState<Set<string>>(new Set());

  const { announce } = useSanAI();
  const zonesList = Object.values(ZONE_COORDINATES).filter((z) => z.id !== 'prologue');

  // Trigger contextual SAN AI audio & textual briefings upon arriving in zones
  useEffect(() => {
    if (activeZone.id === 'origin-coast' && !announcedZones.has('origin-coast')) {
      setAnnouncedZones((prev) => new Set(prev).add('origin-coast'));
      announce(
        "Welcome to Origin Coast. Here are Santhosh's academic foundations at Gnanamani College of Technology and his origin story from Karaikal. Click the study workspace or the collegiate monument to inspect his verified records."
      );
    } else if (activeZone.id === 'skill-forest' && !announcedZones.has('skill-forest')) {
      setAnnouncedZones((prev) => new Set(prev).add('skill-forest'));
      announce(
        "Welcome to the Skill Forest. Here lie the 7 foundational technology crystals of Santhosh's developer arsenal — from Full-Stack React and Python automation to Android engineering and defensive security. Click any crystal to inspect verified proficiencies."
      );
    } else if (activeZone.id === 'project-city' && !announcedZones.has('project-city')) {
      setAnnouncedZones((prev) => new Set(prev).add('project-city'));
      announce(
        "Welcome to Project City. Every neon skyscraper in this metropolis represents a real, verified software system engineered by Santhosh — including the LorryBook logistics dispatch platform, the NexusATS candidate parsing pipeline, and the Recall AI hackathon assistant. Click any skyscraper to inspect its architectural dossier."
      );
    } else if (activeZone.id === 'exp-mountain' && !announcedZones.has('exp-mountain')) {
      setAnnouncedZones((prev) => new Set(prev).add('exp-mountain'));
      announce(
        "Welcome to Experience Mountain. As you ascend the mountain path, you will discover the checkpoints marking Santhosh's developer internships at Cybernaut and ELITA, his competitive CTF challenges, and his verified technical certifications. Click any checkpoint to inspect his track record."
      );
    }
  }, [activeZone.id, announcedZones, announce]);

  return (
    <div className="relative w-full h-screen bg-[#0A0B09] overflow-hidden select-none">
      {/* 1. Main 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0">
        <UniverseCanvas
          activeZone={activeZone}
          onSelectOriginPOI={(poi) => {
            setOriginModalTab(poi);
            setOriginModalOpen(true);
          }}
          onSelectSkillCategory={(catId) => {
            setSelectedSkillId(catId);
            setSkillModalOpen(true);
          }}
          onSelectProject={(projId) => {
            setSelectedProjectId(projId);
            setProjectModalOpen(true);
          }}
          onSelectExperiencePOI={(tab) => {
            setExpModalTab(tab);
            setExpModalOpen(true);
          }}
        />
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

            {/* Center: Current Zone HUD Pillar + Inspect Action */}
            <div className="pointer-events-auto hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#0A0B09]/85 border border-white/20 px-3 py-1.5 rounded-sm backdrop-blur-md font-mono text-xs">
                <Navigation className="w-3.5 h-3.5 text-[#C7FF45]" />
                <span className="text-[var(--primary-text)] font-bold">{activeZone.name}</span>
                <span className="text-[var(--muted)]">·</span>
                <span className="text-[10px] text-[#C7FF45]">
                  [{activeZone.center[0]}, {activeZone.center[1]}, {activeZone.center[2]}]
                </span>
              </div>

              {activeZone.id === 'origin-coast' && (
                <button
                  type="button"
                  onClick={() => {
                    setOriginModalTab('workspace');
                    setOriginModalOpen(true);
                  }}
                  className="px-2.5 py-1.5 bg-[#FFB347]/15 border border-[#FFB347]/60 text-[#FFB347] font-mono text-xs font-bold rounded-sm hover:bg-[#FFB347]/30 transition-all flex items-center gap-1.5 backdrop-blur-md shadow-[0_0_12px_rgba(255,179,71,0.3)] animate-pulse"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>INSPECT DOSSIER</span>
                </button>
              )}

              {activeZone.id === 'skill-forest' && (
                <button
                  type="button"
                  onClick={() => setSkillModalOpen(true)}
                  className="px-2.5 py-1.5 bg-[#00E5FF]/15 border border-[#00E5FF]/60 text-[#00E5FF] font-mono text-xs font-bold rounded-sm hover:bg-[#00E5FF]/30 transition-all flex items-center gap-1.5 backdrop-blur-md shadow-[0_0_12px_rgba(0,229,255,0.3)] animate-pulse"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>INSPECT ARSENAL</span>
                </button>
              )}

              {activeZone.id === 'project-city' && (
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(true)}
                  className="px-2.5 py-1.5 bg-[#FF3358]/15 border border-[#FF3358]/60 text-[#FF3358] font-mono text-xs font-bold rounded-sm hover:bg-[#FF3358]/30 transition-all flex items-center gap-1.5 backdrop-blur-md shadow-[0_0_12px_rgba(255,51,88,0.3)] animate-pulse"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>INSPECT MISSIONS</span>
                </button>
              )}

              {activeZone.id === 'exp-mountain' && (
                <button
                  type="button"
                  onClick={() => setExpModalOpen(true)}
                  className="px-2.5 py-1.5 bg-[#C7FF45]/15 border border-[#C7FF45]/60 text-[#C7FF45] font-mono text-xs font-bold rounded-sm hover:bg-[#C7FF45]/30 transition-all flex items-center gap-1.5 backdrop-blur-md shadow-[0_0_12px_rgba(199,255,69,0.3)] animate-pulse"
                >
                  <Mountain className="w-3.5 h-3.5" />
                  <span>INSPECT EXPERIENCE</span>
                </button>
              )}
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
            <div>• Minimap / Quick-Bar: Fast Travel</div>
            <div>• Desk & Monument: Click to Inspect</div>
          </div>

          {/* Floating SAN AI Holographic Core */}
          <div className="fixed top-20 right-4 sm:right-6 z-30 pointer-events-auto">
            <AICore size={80} />
          </div>
        </>
      )}

      {/* Origin Coast Academic & Workspace Modal */}
      <OriginCoastModal
        isOpen={originModalOpen}
        initialTab={originModalTab}
        onClose={() => setOriginModalOpen(false)}
        onTravelToNextZone={() => setActiveZone(ZONE_COORDINATES['skill-forest'])}
      />

      {/* Skill Forest Technical Arsenal Modal */}
      <SkillForestModal
        isOpen={skillModalOpen}
        initialCategoryId={selectedSkillId}
        onClose={() => setSkillModalOpen(false)}
        onTravelToNextZone={() => setActiveZone(ZONE_COORDINATES['project-city'])}
      />

      {/* Project City Missions & Architectures Modal */}
      <ProjectCityModal
        isOpen={projectModalOpen}
        initialProjectId={selectedProjectId}
        onClose={() => setProjectModalOpen(false)}
        onTravelToNextZone={() => setActiveZone(ZONE_COORDINATES['exp-mountain'])}
      />

      {/* Experience Mountain Progression Modal */}
      <ExperienceMountainModal
        isOpen={expModalOpen}
        initialTab={expModalTab}
        onClose={() => setExpModalOpen(false)}
        onTravelToNextZone={() => setActiveZone(ZONE_COORDINATES['contact-beacon'])}
      />

      {/* Global AI Conversation Panel */}
      <AIConversationPanel />
    </div>
  );
};

