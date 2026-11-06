import React, { useState } from 'react';
import { experienceData } from '../data/experience';
import { certificationsData } from '../data/certifications';
import { TimelineMilestone } from './TimelineMilestone';
import { AchievementCard } from './AchievementCard';
import { AnimeAvatar } from './AnimeAvatar';
import { CharacterDialogue } from './CharacterDialogue';
import { TimelineProgress } from './TimelineProgress';
import { Award, Compass, Sparkles } from 'lucide-react';

export const StoryTimeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'certifications'>('timeline');

  return (
    <div className="relative w-full">
      {/* Narrative Avatar Header Stage */}
      <div className="mb-10 p-5 rounded-sm bg-[#131512]/90 border border-[#C7FF45]/30 backdrop-blur-md flex flex-col md:flex-row items-center gap-6">
        <div className="shrink-0">
          <AnimeAvatar
            expression="achievement"
            size="md"
            scene="timeline"
            interactionEnabled={true}
            showControls={false}
          />
        </div>

        <div className="flex-1 w-full">
          <CharacterDialogue
            speaker="SANTHOSH // THE EVOLUTION"
            message="Welcome to The Evolution. Every milestone reflects deliberate effort — from foundational coursework at Gnanamani College of Technology to production scripting at Cybernaut and full-stack internships at ELITA."
            expression="achievement"
            position="top"
            className="w-full max-w-full"
          />

          {/* Quick Stats Metric Bar */}
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[10px] text-[var(--muted)]">
            <div className="p-2 bg-black/40 border border-white/5 rounded-sm">
              <span className="text-[#C7FF45] block font-bold">DEGREE CANDIDACY</span>
              <span>B.E. CSE (2023—2027)</span>
            </div>
            <div className="p-2 bg-black/40 border border-white/5 rounded-sm">
              <span className="text-[#00E5FF] block font-bold">INTERNSHIP EXPERIENCE</span>
              <span>Cybernaut + ELITA</span>
            </div>
            <div className="p-2 bg-black/40 border border-white/5 rounded-sm col-span-2 sm:col-span-1">
              <span className="text-[#FF3358] block font-bold">ACADEMIC STANDING</span>
              <span>GPA: 7.2 / 10.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* View Switcher Controls */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-[#C7FF45]">
          <Compass className="w-4 h-4" />
          <span className="font-bold tracking-wider uppercase">
            CHRONICLE ARCHIVE // {activeTab === 'timeline' ? 'MILESTONES' : 'CREDENTIALS'}
          </span>
        </div>

        <div className="flex items-center gap-1 p-0.5 bg-[var(--surface)] border border-white/10 rounded-sm">
          <button
            type="button"
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1 font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5 ${
              activeTab === 'timeline'
                ? 'bg-[#C7FF45] text-[#0A0B09]'
                : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Evolution Journey</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('certifications')}
            className={`px-3 py-1 font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5 ${
              activeTab === 'certifications'
                ? 'bg-[#C7FF45] text-[#0A0B09]'
                : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Certifications ({certificationsData.length})</span>
          </button>
        </div>
      </div>

      {/* Tab Content Display */}
      {activeTab === 'timeline' ? (
        <div className="relative border-l border-white/10 ml-2 md:ml-4 space-y-8">
          <TimelineProgress className="hidden" />
          {experienceData.map((item, index) => (
            <TimelineMilestone key={index} item={item} index={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificationsData.map((cert, index) => (
            <AchievementCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

