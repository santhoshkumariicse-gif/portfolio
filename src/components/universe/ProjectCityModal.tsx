import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../../data/projects';
import { ProjectItem } from '../../types';
import { useSanAI } from '../../ai';
import {
  Building2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  ArrowRight,
  Sparkles,
  Layers,
  X
} from 'lucide-react';

export interface ProjectCityModalProps {
  initialProjectId?: string;
  isOpen: boolean;
  onClose: () => void;
  onTravelToNextZone?: () => void;
}

export const ProjectCityModal: React.FC<ProjectCityModalProps> = ({
  initialProjectId = 'rda-lorrybook',
  isOpen,
  onClose,
  onTravelToNextZone
}) => {
  const [selectedId, setSelectedId] = useState<string>(initialProjectId);
  const { sendMessage, toggleExpand } = useSanAI();

  if (!isOpen) return null;

  const currentProject: ProjectItem =
    projectsData.find((p) => p.id === selectedId) || projectsData[0];

  const handleAskAI = (projectTitle: string) => {
    sendMessage(`Explain the architecture and technical implementation of ${projectTitle}`);
    toggleExpand();
    onClose();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-[#C7FF45]/20 border-[#C7FF45]/60 text-[#C7FF45]';
      case 'In development':
        return 'bg-[#00E5FF]/20 border-[#00E5FF]/60 text-[#00E5FF]';
      case 'Prototype':
        return 'bg-[#FFB347]/20 border-[#FFB347]/60 text-[#FFB347]';
      default:
        return 'bg-white/10 border-white/30 text-white';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -8 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0E1210]/95 border border-[#FF3358]/40 rounded-sm shadow-[0_0_40px_rgba(255,51,88,0.25)] flex flex-col overflow-hidden text-[var(--primary-text)] font-sans"
        >
          {/* Top Crimson Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF3358] via-[#FF8095] to-transparent" />

          {/* Holographic Reticle Corners */}
          <span className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#FF3358]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#FF3358]" />
          <span className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-[#FF3358]" />
          <span className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#FF3358]" />

          {/* Modal Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-3 bg-[#131713]/80">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-sm bg-[#FF3358]/10 border border-[#FF3358]/40 text-[#FF3358]">
                <Building2 className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-sm font-mono text-[9px] font-bold uppercase bg-[#FF3358]/20 border border-[#FF3358]/50 text-[#FF3358]">
                    ACT 03 // PROJECT CITY METROPOLIS
                  </span>
                  <span className="font-mono text-[10px] text-[var(--muted)] hidden sm:inline">
                    REAL SOFTWARE ARCHITECTURES
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold font-mono text-white tracking-wide mt-0.5">
                  SANTHOSH KUMAR M — SOFTWARE MISSIONS
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[var(--muted)] hover:text-white rounded-sm hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Project Navigation Strip */}
          <div className="flex border-b border-white/10 bg-[#0A0D0B] px-3 py-2 gap-1.5 overflow-x-auto font-mono text-xs">
            {projectsData.map((project) => {
              const isSelected = project.id === selectedId;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedId(project.id)}
                  className={`px-3 py-1.5 rounded-sm whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-[#FF3358]/20 border-[#FF3358]/60 text-[#FF3358] font-bold shadow-md'
                      : 'border-transparent text-[var(--secondary-text)] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3358]" />
                  <span>{project.title.split('—')[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 max-h-[calc(90vh-200px)]">
            {/* Project Header Banner */}
            <div className="p-4 rounded-sm bg-[#131713] border border-white/10 flex flex-col sm:flex-row items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-sm font-mono text-[9px] font-bold uppercase border ${getStatusBadge(currentProject.status)}`}>
                    STATUS: {currentProject.status}
                  </span>
                  <span className="font-mono text-xs text-[#00E5FF]">
                    {currentProject.category}
                  </span>
                  <span className="text-[var(--muted)]">·</span>
                  <span className="font-mono text-[10px] text-[#C7FF45] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>VERIFIED RECORD</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold font-mono text-white">
                  {currentProject.title}
                </h3>
                <p className="text-xs text-[var(--secondary-text)] leading-relaxed max-w-2xl">
                  {currentProject.tagline}
                </p>
              </div>

              {/* GitHub Link Button if present */}
              {currentProject.repoUrl && (
                <a
                  href={currentProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-sm bg-[#FF3358]/15 border border-[#FF3358]/40 hover:bg-[#FF3358]/30 text-[#FF3358] font-mono text-xs font-bold transition-all flex items-center gap-2 shrink-0 shadow-sm"
                >
                  <span>Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Problem & Solution Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-sm bg-[#131713]/80 border border-white/10 space-y-2">
                <div className="font-mono text-xs font-bold text-[#FF3358] uppercase flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>The Engineering Problem</span>
                </div>
                <p className="text-xs text-[var(--secondary-text)] leading-relaxed">
                  {currentProject.problem}
                </p>
              </div>

              <div className="p-4 rounded-sm bg-[#131713]/80 border border-white/10 space-y-2">
                <div className="font-mono text-xs font-bold text-[#C7FF45] uppercase flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Architectural Solution</span>
                </div>
                <p className="text-xs text-[var(--secondary-text)] leading-relaxed">
                  {currentProject.solution}
                </p>
              </div>
            </div>

            {/* Verified Technologies Stack */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>Verified Technology Stack</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-sm bg-[#0E1410] border border-white/15 text-white font-mono text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features Matrix */}
            <div className="space-y-2.5">
              <h4 className="font-mono text-xs font-bold uppercase text-white">
                Key Architectural Deliverables
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(currentProject.keyFeatures || []).map((feat, idx) => (
                  <div
                    key={feat}
                    className="p-2.5 rounded-sm bg-[#131713]/70 border border-white/10 flex items-start gap-2"
                  >
                    <span className="w-4 h-4 rounded-sm bg-[#FF3358]/10 text-[#FF3358] font-mono text-[9px] font-bold flex items-center justify-center shrink-0 border border-[#FF3358]/30 mt-0.5">
                      0{idx + 1}
                    </span>
                    <span className="text-xs text-[var(--secondary-text)] font-sans leading-tight">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Contribution & Evidence Transparency Note */}
            <div className="p-3.5 rounded-sm bg-[#0A0D0B] border border-white/10 space-y-2">
              <div className="font-mono text-[10px] font-bold uppercase text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C7FF45]" />
                <span>Santhosh's Verified Contribution & Evidence</span>
              </div>
              <p className="text-xs text-[var(--secondary-text)] leading-relaxed">
                {currentProject.contribution}
              </p>
              <p className="text-[11px] text-[var(--muted)] italic leading-tight">
                Provenance Note: {currentProject.evidenceNote}
              </p>
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="p-4 border-t border-white/10 bg-[#131713] flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => handleAskAI(currentProject.title)}
              className="px-3 py-1.5 bg-[#FF3358]/15 border border-[#FF3358]/40 text-[#FF3358] hover:bg-[#FF3358]/25 font-mono text-xs font-bold rounded-sm transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask SAN AI About This Architecture</span>
            </button>

            <div className="flex items-center gap-2">
              {onTravelToNextZone && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onTravelToNextZone();
                  }}
                  className="px-4 py-1.5 bg-[#C7FF45] hover:bg-[#D2FF5E] text-[#0A0B09] font-mono text-xs font-black uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(199,255,69,0.4)]"
                >
                  <span>Next Zone: Experience Mountain</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded-sm transition-all"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
