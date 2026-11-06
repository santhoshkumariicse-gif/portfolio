import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UniverseCanvas, ExplorationMode } from './UniverseCanvas';
import { WorldMinimap } from './WorldMinimap';
import { PrologueOverlay } from './PrologueOverlay';
import { OriginCoastModal } from './OriginCoastModal';
import { SkillForestModal } from './SkillForestModal';
import { ProjectCityModal } from './ProjectCityModal';
import { ExperienceMountainModal } from './ExperienceMountainModal';
import { ContactBeaconModal } from './ContactBeaconModal';
import { VirtualJoystick } from './VirtualJoystick';
import { TOUR_WAYPOINTS } from './GuidedTourController';
import { ZONE_COORDINATES, ZoneCoordinate } from './WorldCoordinates';
import { AICore, AIConversationPanel, useSanAI } from '../../ai';
import {
  Layers,
  X,
  Sparkles,
  Eye,
  Gamepad2,
  Video,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX
} from 'lucide-react';
import { SoundFX } from '../../utils/SoundFX';

export interface UniverseStageProps {
  onExitUniverse: () => void;
}

const CHAPTERS = [
  { id: 'origin-coast', num: '01', title: 'ORIGIN COAST', subtitle: 'Academic Roots & Karaikal Shore' },
  { id: 'skill-forest', num: '02', title: 'SKILL FOREST', subtitle: '7 Technology Crystals & Arsenal' },
  { id: 'project-city', num: '03', title: 'PROJECT CITY', subtitle: 'Enterprise Software Missions' },
  { id: 'exp-mountain', num: '04', title: 'EXPERIENCE MOUNTAIN', subtitle: 'Internships & Milestones' },
  { id: 'contact-beacon', num: '05', title: 'CONTACT BEACON', subtitle: 'Direct Dispatch & Resume Finale' },
];

export const UniverseStage: React.FC<UniverseStageProps> = ({ onExitUniverse }) => {
  const [activeZone, setActiveZone] = useState<ZoneCoordinate>(ZONE_COORDINATES['prologue']);
  const [explorationMode, setExplorationMode] = useState<ExplorationMode>('orbit');
  const [tourIndex, setTourIndex] = useState(0);
  const [isTourPlaying, setIsTourPlaying] = useState(true);
  const [joystickInput, setJoystickInput] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [proximityPOI, setProximityPOI] = useState<string | null>(null);

  const [showMinimap, setShowMinimap] = useState(true);
  const [originModalOpen, setOriginModalOpen] = useState(false);
  const [originModalTab, setOriginModalTab] = useState<'workspace' | 'education'>('workspace');
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState('programming-languages');
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState('rda-lorrybook');
  const [expModalOpen, setExpModalOpen] = useState(false);
  const [expModalTab, setExpModalTab] = useState<'roles' | 'certifications'>('roles');
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactModalTab, setContactModalTab] = useState<'transmit' | 'resume'>('transmit');
  const [announcedZones, setAnnouncedZones] = useState<Set<string>>(new Set());
  const [transitionBanner, setTransitionBanner] = useState<string | null>(null);

  const { announce, lastAction, clearLastAction, isMuted, toggleMute } = useSanAI();
  const zonesList = Object.values(ZONE_COORDINATES).filter((z) => z.id !== 'prologue');

  const currentChapterIndex = CHAPTERS.findIndex((c) => c.id === activeZone.id);
  const currentChapter = CHAPTERS[currentChapterIndex] || null;

  // Sync global audio mute state
  useEffect(() => {
    SoundFX.setMuted(isMuted);
  }, [isMuted]);

  // Trigger cinematic transition toast banner on zone change
  useEffect(() => {
    if (activeZone.id !== 'prologue') {
      setTransitionBanner(activeZone.name);
      const timer = setTimeout(() => {
        setTransitionBanner(null);
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [activeZone.id, activeZone.name]);

  // React to voice/text command actions dispatched by SAN AI
  useEffect(() => {
    if (!lastAction) return;

    if (lastAction.type === 'navigate_zone') {
      const targetCoord = ZONE_COORDINATES[lastAction.target];
      if (targetCoord) {
        SoundFX.playWarp();
        setActiveZone(targetCoord);
      }
    } else if (lastAction.type === 'set_mode') {
      if (lastAction.target === 'guided-tour' || lastAction.target === 'free-roam' || lastAction.target === 'orbit') {
        SoundFX.playModeSwitch();
        setExplorationMode(lastAction.target as ExplorationMode);
        if (lastAction.target === 'guided-tour') {
          setIsTourPlaying(true);
        }
      }
    } else if (lastAction.type === 'open_modal') {
      SoundFX.playClick();
      if (lastAction.target === 'rda-lorrybook' || lastAction.target === 'nexusats' || lastAction.target === 'recall-ai' || lastAction.target === 'cybernaut-defense') {
        setSelectedProjectId(lastAction.target);
        setProjectModalOpen(true);
      } else if (lastAction.target === 'contact-beacon-resume') {
        setContactModalTab('resume');
        setContactModalOpen(true);
      } else {
        handleInspectPOI(lastAction.target);
      }
    } else if (lastAction.type === 'toggle_view') {
      if (lastAction.target === 'classic') {
        onExitUniverse();
      }
    }

    clearLastAction();
  }, [lastAction, clearLastAction, onExitUniverse]);

  const handleInspectPOI = (poiId: string) => {
    SoundFX.playClick();
    switch (poiId) {
      case 'origin-coast':
      case 'workspace':
        setOriginModalTab('workspace');
        setOriginModalOpen(true);
        break;
      case 'education':
        setOriginModalTab('education');
        setOriginModalOpen(true);
        break;
      case 'skill-forest':
        setSkillModalOpen(true);
        break;
      case 'project-city':
        setProjectModalOpen(true);
        break;
      case 'exp-mountain':
        setExpModalOpen(true);
        break;
      case 'contact-beacon':
        setContactModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleTourWaypointChange = (index: number) => {
    SoundFX.playWarp();
    setTourIndex(index);
    const waypoint = TOUR_WAYPOINTS[index];
    if (waypoint && ZONE_COORDINATES[waypoint.id]) {
      setActiveZone(ZONE_COORDINATES[waypoint.id]);
    }
  };

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
    } else if (activeZone.id === 'contact-beacon' && !announcedZones.has('contact-beacon')) {
      setAnnouncedZones((prev) => new Set(prev).add('contact-beacon'));
      announce(
        "Welcome to Contact Beacon, the northernmost boundary of our digital universe. From here, you can transmit a message directly to Santhosh, inspect his verified ATS resume, or connect via GitHub and LinkedIn."
      );
    }
  }, [activeZone.id, announcedZones, announce]);

  return (
    <div className="relative w-full h-screen bg-[#0A0B09] overflow-hidden select-none">
      {/* 1. Main 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0">
        <UniverseCanvas
          activeZone={activeZone}
          mode={explorationMode}
          joystickInput={joystickInput}
          tourIndex={tourIndex}
          isTourPlaying={isTourPlaying}
          onTourWaypointChange={handleTourWaypointChange}
          onTourComplete={() => {
            setIsTourPlaying(false);
            setContactModalOpen(true);
          }}
          onProximityPOI={setProximityPOI}
          onInspectPOI={handleInspectPOI}
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
          onSelectContactPOI={(tab) => {
            setContactModalTab(tab);
            setContactModalOpen(true);
          }}
        />
      </div>

      {/* Cinematic Vignette Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(4,6,4,0.72)_100%)]" />

      {/* Cinematic Chapter Transition Toast Banner */}
      <AnimatePresence>
        {transitionBanner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="pointer-events-none fixed top-20 left-1/2 -translate-x-1/2 z-40 bg-[#0E1210]/95 border border-[#00E5FF]/50 px-6 py-2.5 rounded-sm backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.85)] text-center"
          >
            <div className="font-mono text-[9px] uppercase tracking-widest text-[#00E5FF] flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping" />
              <span>APPROACHING VECTOR // CHAPTER {currentChapter?.num || '01'}</span>
            </div>
            <div className="text-sm font-mono font-black text-white tracking-wider mt-0.5">
              {currentChapter?.title || activeZone.name}
            </div>
            <div className="text-[10px] font-mono text-[var(--secondary-text)]">
              {currentChapter?.subtitle}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Prologue Mode Cinematic Overlay */}
      {activeZone.id === 'prologue' ? (
        <PrologueOverlay
          onBeginJourney={() => {
            setActiveZone(ZONE_COORDINATES['origin-coast']);
            setExplorationMode('orbit');
          }}
          onStartTour={() => {
            setActiveZone(ZONE_COORDINATES['origin-coast']);
            setExplorationMode('guided-tour');
            setTourIndex(0);
            setIsTourPlaying(true);
          }}
          onEnterFreeRoam={() => {
            setActiveZone(ZONE_COORDINATES['origin-coast']);
            setExplorationMode('free-roam');
          }}
          onEnterSimplePortfolio={onExitUniverse}
        />
      ) : (
        <>
          {/* Top HUD Banner */}
          <div className="absolute top-0 left-0 right-0 z-20 p-3 sm:p-5 flex items-center justify-between pointer-events-none gap-2">
            {/* Left: Project & Universe Badge */}
            <div className="pointer-events-auto flex items-center gap-2.5 bg-[#0A0B09]/85 border border-white/20 p-2 sm:px-3 sm:py-2 rounded-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
              <div className="font-mono text-xs">
                <span className="text-[#00E5FF] font-bold block sm:inline mr-2">SAN AI // UNIVERSE</span>
                <span className="text-[var(--secondary-text)] text-[10px] hidden lg:inline">
                  EXPLORABLE 3D ISLAND
                </span>
              </div>
            </div>

            {/* Exploration Mode Switcher */}
            <div className="pointer-events-auto flex items-center bg-[#0A0B09]/85 border border-white/20 p-1 rounded-sm backdrop-blur-md gap-1">
              <button
                type="button"
                onClick={() => {
                  SoundFX.playModeSwitch();
                  setExplorationMode('orbit');
                }}
                className={`px-2.5 py-1 rounded-sm font-mono text-[10px] font-bold uppercase transition-all flex items-center gap-1 ${
                  explorationMode === 'orbit'
                    ? 'bg-[#C7FF45] text-[#0A0B09] shadow-sm'
                    : 'text-[var(--secondary-text)] hover:text-white'
                }`}
                title="Free Orbit Camera"
              >
                <Eye className="w-3 h-3" />
                <span className="hidden sm:inline">Orbit</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  SoundFX.playModeSwitch();
                  setExplorationMode('free-roam');
                }}
                className={`px-2.5 py-1 rounded-sm font-mono text-[10px] font-bold uppercase transition-all flex items-center gap-1 ${
                  explorationMode === 'free-roam'
                    ? 'bg-[#C7FF45] text-[#0A0B09] shadow-sm'
                    : 'text-[var(--secondary-text)] hover:text-white'
                }`}
                title="WASD / Joystick Third-Person Roam"
              >
                <Gamepad2 className="w-3 h-3" />
                <span className="hidden sm:inline">Free Roam</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  SoundFX.playModeSwitch();
                  setExplorationMode('guided-tour');
                  setTourIndex(0);
                  setIsTourPlaying(true);
                  setActiveZone(ZONE_COORDINATES['origin-coast']);
                }}
                className={`px-2.5 py-1 rounded-sm font-mono text-[10px] font-bold uppercase transition-all flex items-center gap-1 ${
                  explorationMode === 'guided-tour'
                    ? 'bg-[#C7FF45] text-[#0A0B09] shadow-sm'
                    : 'text-[var(--secondary-text)] hover:text-white'
                }`}
                title="Automated Cinematic Tour"
              >
                <Video className="w-3 h-3" />
                <span className="hidden sm:inline">Tour</span>
              </button>
            </div>

            {/* Center: Current Chapter HUD Progress */}
            <div className="pointer-events-auto hidden xl:flex flex-col items-center bg-[#0A0B09]/85 border border-white/20 px-3 py-1 rounded-sm backdrop-blur-md">
              <div className="flex items-center gap-2 font-mono text-[10px] font-bold">
                <span className="text-[#C7FF45]">CHAPTER {currentChapter?.num || '01'} / 05</span>
                <span className="text-white/30">|</span>
                <span className="text-white tracking-wider">{currentChapter?.title || activeZone.name}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                {CHAPTERS.map((ch, idx) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => {
                      SoundFX.playWarp();
                      setActiveZone(ZONE_COORDINATES[ch.id]);
                    }}
                    className={`h-1 rounded-full transition-all ${
                      ch.id === activeZone.id
                        ? 'w-5 bg-[#C7FF45] shadow-[0_0_8px_rgba(199,255,69,0.8)]'
                        : idx < currentChapterIndex
                        ? 'w-2.5 bg-[#00E5FF]/60 hover:bg-[#00E5FF]'
                        : 'w-2.5 bg-white/20 hover:bg-white/40'
                    }`}
                    title={`Jump to Chapter ${ch.num}: ${ch.title}`}
                  />
                ))}
              </div>
            </div>

            {/* Right: Audio Toggle & Exit / Classic View Switcher */}
            <div className="pointer-events-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  toggleMute();
                  SoundFX.setMuted(!isMuted);
                  if (isMuted) SoundFX.playClick();
                }}
                className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-sm border font-mono text-xs transition-all flex items-center gap-1.5 ${
                  !isMuted
                    ? 'bg-[#C7FF45]/20 border-[#C7FF45] text-[#C7FF45] shadow-[0_0_12px_rgba(199,255,69,0.3)]'
                    : 'bg-[#0A0B09]/85 border-white/20 text-[var(--secondary-text)] hover:text-white'
                }`}
                title={isMuted ? 'Unmute All Audio (Speech + FX)' : 'Mute All Audio'}
                aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#C7FF45]" />}
                <span className="hidden md:inline text-[9px] font-bold">{isMuted ? 'AUDIO OFF' : 'AUDIO ON'}</span>
              </button>

              <button
                type="button"
                onClick={onExitUniverse}
                className="px-3 py-1.5 bg-[#C7FF45] text-[#0A0B09] font-mono text-xs font-extrabold uppercase tracking-wider rounded-sm shadow-[0_0_15px_rgba(199,255,69,0.4)] hover:bg-[#D2FF5E] transition-all flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Classic</span>
                <span className="sm:hidden">2D</span>
                <X className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>
          </div>

          {/* Bottom Controls: Guided Tour Bar vs Normal Quick-Travel Bar */}
          {explorationMode === 'guided-tour' ? (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 max-w-xl w-[92%] pointer-events-auto">
              <div className="p-2.5 bg-[#0A0B09]/95 border border-[#C7FF45]/60 rounded-sm backdrop-blur-md flex items-center justify-between gap-3 shadow-[0_0_25px_rgba(199,255,69,0.25)]">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleTourWaypointChange(Math.max(0, tourIndex - 1))}
                    disabled={tourIndex === 0}
                    className="p-1.5 rounded-sm bg-white/5 hover:bg-white/15 disabled:opacity-30 text-white transition-all"
                    title="Previous Chapter"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsTourPlaying(!isTourPlaying)}
                    className="p-1.5 rounded-sm bg-[#C7FF45] text-[#0A0B09] font-bold shadow-sm hover:bg-[#D2FF5E] transition-all"
                    title={isTourPlaying ? 'Pause Tour' : 'Play Tour'}
                  >
                    {isTourPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleTourWaypointChange(Math.min(TOUR_WAYPOINTS.length - 1, tourIndex + 1))
                    }
                    disabled={tourIndex === TOUR_WAYPOINTS.length - 1}
                    className="p-1.5 rounded-sm bg-white/5 hover:bg-white/15 disabled:opacity-30 text-white transition-all"
                    title="Next Chapter"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 font-mono text-center">
                  <div className="text-[10px] text-[#C7FF45] font-bold">
                    {TOUR_WAYPOINTS[tourIndex]?.title}
                  </div>
                  <div className="text-[9px] text-[var(--muted)] truncate">
                    {TOUR_WAYPOINTS[tourIndex]?.subtitle}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setExplorationMode('orbit')}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white font-mono text-[10px] font-bold rounded-sm transition-all"
                >
                  Exit Tour
                </button>
              </div>
            </div>
          ) : (
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
          )}

          {/* Virtual Touch Joystick for Mobile / Tablet in Free Roam */}
          {explorationMode === 'free-roam' && (
            <div className="block lg:hidden fixed bottom-6 right-6 z-30 pointer-events-auto">
              <VirtualJoystick onMove={setJoystickInput} />
            </div>
          )}

          {/* Proximity POI Interaction Toast */}
          {explorationMode === 'free-roam' && proximityPOI && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
              <button
                type="button"
                onClick={() => handleInspectPOI(proximityPOI)}
                className="px-4 py-2 bg-[#C7FF45] text-[#0A0B09] font-mono text-xs font-black uppercase tracking-wider rounded-sm shadow-[0_0_20px_rgba(199,255,69,0.5)] animate-bounce flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>PRESS [E] OR TAP TO INSPECT: {proximityPOI.replace('-', ' ')}</span>
              </button>
            </div>
          )}

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
              <span>{explorationMode.toUpperCase()} CONTROLS</span>
            </div>
            {explorationMode === 'free-roam' ? (
              <>
                <div>• W / A / S / D or Arrows: Move Avatar</div>
                <div>• Shift: Sprint / Run</div>
                <div>• E: Inspect Nearby POI</div>
                <div>• Camera follows avatar automatically</div>
              </>
            ) : explorationMode === 'guided-tour' ? (
              <>
                <div>• Automated cinematic flight across island</div>
                <div>• Play / Pause / Skip via timeline bar</div>
                <div>• Click any POI anytime to inspect</div>
              </>
            ) : (
              <>
                <div>• Left Click + Drag: Rotate Orbit</div>
                <div>• Right Click + Drag: Pan Camera</div>
                <div>• Scroll Wheel: Zoom Altitude</div>
                <div>• Minimap / Quick-Bar: Fast Travel</div>
              </>
            )}
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

      {/* Contact Beacon Finale Modal */}
      <ContactBeaconModal
        isOpen={contactModalOpen}
        initialTab={contactModalTab}
        onClose={() => setContactModalOpen(false)}
        onRestartJourney={() => setActiveZone(ZONE_COORDINATES['origin-coast'])}
        onExitToClassic={onExitUniverse}
      />

      {/* Global AI Conversation Panel */}
      <AIConversationPanel />
    </div>
  );
};

