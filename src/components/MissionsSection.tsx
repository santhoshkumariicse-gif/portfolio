import React, { useState } from 'react';
import { projectsData } from '../data/projects';
import { ProjectItem } from '../types';
import { StoryChapter } from './StoryChapter';
import { MissionScene } from './MissionScene';
import { ProjectCard } from './ProjectCard';
import { ProjectEnvironment } from './ProjectEnvironment';
import { AnimeAvatar } from './AnimeAvatar';
import { CharacterDialogue } from './CharacterDialogue';
import { Terminal, ShieldAlert, LayoutList } from 'lucide-react';

export interface MissionsSectionProps {
  onOpenDetail?: (project: ProjectItem) => void;
}

export const MissionsSection: React.FC<MissionsSectionProps> = ({ onOpenDetail }) => {
  const [viewMode, setViewMode] = useState<'missions' | 'classic'>('missions');

  return (
    <StoryChapter
      id="projects"
      chapterNumber="CH_04"
      title="THE MISSIONS: SOFTWARE ENGINEERING DIRECTIVES"
      subtitle="Mission Control & Verified Projects"
      narrativeLogline="A comprehensive audit of my deployed software systems, logistical architectures, semantic retrieval prototypes, and defensive security tooling with direct GitHub evidence."
      environmentTheme="mission-control"
    >
      <div className="relative">
        {/* Mission Control Ambient Wireframe */}
        <ProjectEnvironment />

        {/* Top Control Bar: HUD Telemetry & View Switcher */}
        <div className="relative z-10 mb-8 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#FF3358]">
            <Terminal className="w-4 h-4" />
            <span className="font-bold tracking-wider uppercase">
              MISSION CONTROL // ACTIVE PIPELINES: {projectsData.length} DIRECTIVES
            </span>
          </div>

          <div className="flex items-center gap-1 p-0.5 bg-[var(--surface)] border border-white/10 rounded-sm">
            <button
              type="button"
              onClick={() => setViewMode('missions')}
              className={`px-3 py-1 font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5 ${
                viewMode === 'missions'
                  ? 'bg-[#FF3358] text-white'
                  : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Tactical Missions</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('classic')}
              className={`px-3 py-1 font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5 ${
                viewMode === 'classic'
                  ? 'bg-[#FF3358] text-white'
                  : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Classic Cards</span>
            </button>
          </div>
        </div>

        {/* Narrative Avatar Stage: Coding Expression */}
        <div className="relative z-10 mb-10 p-5 rounded-sm bg-[#131512]/90 border border-[#FF3358]/30 backdrop-blur-md flex flex-col md:flex-row items-center gap-6">
          <div className="shrink-0">
            <AnimeAvatar
              expression="coding"
              size="md"
              scene="mission-control"
              interactionEnabled={true}
              showControls={false}
            />
          </div>

          <div className="flex-1 w-full">
            <CharacterDialogue
              speaker="SANTHOSH // MISSION CONTROL"
              message="Welcome to Mission Control. Here are my deployed systems, logistics engines, and AI prototypes. Every mission represents a concrete problem solved with clean architecture and verifiable code."
              expression="coding"
              position="top"
              className="w-full max-w-full"
            />
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[10px] text-[var(--muted)]">
              <div className="p-2 bg-black/40 border border-white/5 rounded-sm">
                <span className="text-[#FF3358] block font-bold">PRIMARY DIRECTIVE</span>
                <span>LorryBook / RDA Logistics</span>
              </div>
              <div className="p-2 bg-black/40 border border-white/5 rounded-sm">
                <span className="text-[#C7FF45] block font-bold">AI INTEGRATION</span>
                <span>Recall AI Retrieval Engine</span>
              </div>
              <div className="p-2 bg-black/40 border border-white/5 rounded-sm col-span-2 sm:col-span-1">
                <span className="text-[#00E5FF] block font-bold">WORKFLOW ATS</span>
                <span>NexusATS Candidate Parser</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Directives List */}
        <div className="relative z-10 space-y-4">
          {viewMode === 'missions' ? (
            projectsData.map((project, index) => (
              <MissionScene
                key={project.id}
                project={project}
                missionNumber={`MISSION_${String(index + 1).padStart(2, '0')}`}
                isActive={index === 0}
              />
            ))
          ) : (
            <div className="space-y-4">
              {projectsData.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpenDetail={onOpenDetail}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </StoryChapter>
  );
};
