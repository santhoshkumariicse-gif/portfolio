import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../types';
import { ExternalLink, Shield, CheckCircle, ChevronDown, ChevronUp, GitBranch } from 'lucide-react';

export interface MissionSceneProps {
  project: ProjectItem;
  missionNumber: string;
  isActive?: boolean;
}

export const MissionScene: React.FC<MissionSceneProps> = ({
  project,
  missionNumber,
  isActive = false
}) => {
  const [isExpanded, setIsExpanded] = useState(isActive);

  return (
    <div
      className={`relative p-5 sm:p-6 rounded-sm bg-[#131512]/95 border transition-all duration-300 ${
        isExpanded
          ? 'border-[#FF3358]/60 shadow-[0_10px_30px_rgba(255,51,88,0.15)] ring-1 ring-[#FF3358]/30'
          : 'border-white/10 hover:border-white/25'
      }`}
    >
      {/* Top Crimson Accent Edge */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF3358] via-[#FF3358]/60 to-transparent" />

      {/* Header: Mission Tag & Status */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-sm bg-[#FF3358]/10 text-[#FF3358] font-mono text-[10px] font-bold border border-[#FF3358]/30">
            {missionNumber}
          </span>
          <span className="font-mono text-[11px] text-[var(--secondary-text)] uppercase">
            {project.category}
          </span>
        </div>

        <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-[var(--secondary-text)]">
          STATUS: {project.status.toUpperCase()}
        </span>
      </div>

      {/* Project Title & Tagline */}
      <h3 className="text-xl sm:text-2xl font-bold text-[var(--primary-text)] font-sans">
        {project.title}
      </h3>
      <p className="mt-1.5 text-xs sm:text-sm text-[var(--secondary-text)] leading-relaxed font-sans">
        {project.tagline}
      </p>

      {/* Core Tech Stack Pills */}
      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {project.technologies.map((tech, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 text-[0.7rem] font-mono border border-white/10 bg-black/40 text-[var(--secondary-text)] rounded-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Collapsible Deep Directive Analysis */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-5 pt-4 border-t border-white/10 space-y-4 text-xs sm:text-sm font-sans">
              {/* Problem Space */}
              <div className="p-3 bg-black/40 border-l-2 border-[#FF3358] rounded-sm">
                <span className="font-mono text-[10px] font-bold text-[#FF3358] uppercase tracking-wider block mb-1">
                  TACTICAL PROBLEM SPACE:
                </span>
                <p className="text-[var(--secondary-text)] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Engineered Solution */}
              <div className="p-3 bg-black/40 border-l-2 border-[#C7FF45] rounded-sm">
                <span className="font-mono text-[10px] font-bold text-[#C7FF45] uppercase tracking-wider block mb-1">
                  ENGINEERED DIRECTIVE:
                </span>
                <p className="text-[var(--secondary-text)] leading-relaxed">
                  {project.solution}
                </p>
              </div>

              {/* Key Features */}
              {project.keyFeatures && (
                <div>
                  <span className="font-mono text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider block mb-2">
                    VERIFIED SUBSYSTEM CAPABILITIES:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.keyFeatures.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[var(--secondary-text)]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#FF3358] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Personal Engineering Contribution */}
              {project.contribution && (
                <div className="pt-2 text-xs text-[var(--secondary-text)] font-sans">
                  <span className="font-mono text-[10px] font-bold text-[#C7FF45] uppercase tracking-wider block mb-1">
                    MY DIRECT CONTRIBUTION:
                  </span>
                  <p>{project.contribution}</p>
                </div>
              )}

              {/* Verification & Evidence Note */}
              {project.evidenceNote && (
                <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-sm font-mono text-[11px] text-[var(--muted)] flex items-start gap-2">
                  <Shield className="w-3.5 h-3.5 text-[#FF3358] shrink-0 mt-0.5" />
                  <span>{project.evidenceNote}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Footer: Expand/Collapse & External Repository Link */}
      <div className="mt-5 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[#FF3358] hover:text-[#FF6685] font-semibold transition-colors"
        >
          {isExpanded ? (
            <>
              <span>Collapse Schematic</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>Inspect Mission Schematic</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--primary-text)] hover:text-[#FF3358] transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Mission Repository</span>
            <ExternalLink className="w-3 h-3 text-[var(--muted)]" />
          </a>
        )}
      </div>
    </div>
  );
};
