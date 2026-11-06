import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { skillsData } from '../data/skills';
import { SkillCategory } from '../types';
import { SkillNode } from './SkillNode';
import { SkillConnections } from './SkillConnections';
import { SkillDetails } from './SkillDetails';
import { AnimeAvatar } from './AnimeAvatar';
import { CharacterDialogue } from './CharacterDialogue';
import { Network, LayoutGrid, Terminal } from 'lucide-react';

export const SkillTree: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(skillsData[0]);
  const [hoveredCategory, setHoveredCategory] = useState<SkillCategory | null>(null);
  const [viewMode, setViewMode] = useState<'tree' | 'grid'>('tree');

  return (
    <div className="relative w-full">
      {/* View Switcher Controls */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-[#00E5FF]">
          <Terminal className="w-4 h-4" />
          <span className="font-bold tracking-wider uppercase">
            HOLOGRAPHIC LABORATORY // ARSENAL GRAPH
          </span>
        </div>

        <div className="flex items-center gap-1 p-0.5 bg-[var(--surface)] border border-white/10 rounded-sm">
          <button
            type="button"
            onClick={() => setViewMode('tree')}
            className={`px-3 py-1 font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5 ${
              viewMode === 'tree'
                ? 'bg-[#00E5FF] text-[#0A0B09]'
                : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Interactive Tree</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5 ${
              viewMode === 'grid'
                ? 'bg-[#00E5FF] text-[#0A0B09]'
                : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Structured Grid</span>
          </button>
        </div>
      </div>

      {viewMode === 'tree' ? (
        <div className="space-y-6">
          {/* Main Stage: Avatar Explorer on Left & Connected Nodes on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Stage: Exploring Anime Companion */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 flex flex-col items-center justify-center p-4 border border-[#00E5FF]/20 rounded-sm bg-[#131512]/90 backdrop-blur-md relative"
            >
              <CharacterDialogue
                speaker="SANTHOSH // ARSENAL"
                message="Welcome to The Arsenal. Select any skill node in the holographic matrix to inspect verified proficiencies, architectures, and real code modules."
                expression="exploring"
                position="top"
                className="mb-2"
              />
              <AnimeAvatar
                expression="exploring"
                size="md"
                scene="hologram-lab"
                interactionEnabled={true}
                showControls={false}
              />
            </motion.div>

            {/* Right Stage: Interactive Node Matrix with Neural Connections */}
            <div className="lg:col-span-8 relative">
              {/* SVG Connecting Circuit Paths */}
              <div className="absolute inset-0 z-0">
                <SkillConnections activeCategoryId={hoveredCategory?.id || selectedCategory?.id} />
              </div>

              {/* Node Cards Grid */}
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {skillsData.map((category) => (
                  <SkillNode
                    key={category.id}
                    category={category}
                    isSelected={selectedCategory?.id === category.id}
                    isHovered={hoveredCategory?.id === category.id}
                    onSelect={(cat) => setSelectedCategory(cat)}
                    onHover={(cat) => setHoveredCategory(cat)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Inspection Panel */}
          <div className="w-full">
            <SkillDetails category={hoveredCategory || selectedCategory} />
          </div>
        </div>
      ) : (
        /* Structured Bento Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillsData.map((category, index) => (
            <motion.div
              key={category.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="p-6 bg-[var(--surface)] border border-[var(--border)] flex flex-col justify-between transition-all duration-300 hover:border-[#00E5FF] hover:bg-[var(--surface-subtle)] hover:-translate-y-1 group rounded-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[var(--muted)]">
                    {category.number}
                  </span>
                  <span className="font-mono text-[10px] text-[#00E5FF] font-semibold">
                    {category.items.length} MODULES
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[var(--primary-text)] group-hover:text-white transition-colors font-sans">
                  {category.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[var(--secondary-text)] leading-relaxed font-sans">
                  {category.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border)] flex flex-wrap gap-1.5">
                {category.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[0.72rem] font-mono border border-[var(--border)] bg-black/30 text-[var(--secondary-text)] rounded-sm group-hover:border-[#00E5FF]/40"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
