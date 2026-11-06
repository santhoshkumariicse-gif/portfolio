import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsData } from '../../data/skills';
import { SkillCategory } from '../../types';
import { useSanAI } from '../../ai';
import {
  Code,
  Layout,
  Server,
  Smartphone,
  Database,
  Terminal,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X
} from 'lucide-react';

export interface SkillForestModalProps {
  initialCategoryId?: string;
  isOpen: boolean;
  onClose: () => void;
  onTravelToNextZone?: () => void;
}

const getCategoryIcon = (iconType: string) => {
  switch (iconType) {
    case 'programming':
      return <Code className="w-4 h-4 text-[#FFB347]" />;
    case 'frontend':
      return <Layout className="w-4 h-4 text-[#00E5FF]" />;
    case 'backend':
      return <Server className="w-4 h-4 text-[#C7FF45]" />;
    case 'mobile':
      return <Smartphone className="w-4 h-4 text-[#2ECC71]" />;
    case 'database':
      return <Database className="w-4 h-4 text-[#3498DB]" />;
    case 'tools':
      return <Terminal className="w-4 h-4 text-[#9B59B6]" />;
    case 'ai-emerging':
      return <Sparkles className="w-4 h-4 text-[#FF3358]" />;
    default:
      return <Code className="w-4 h-4 text-[#00E5FF]" />;
  }
};

const getCategoryAccentColor = (iconType: string) => {
  switch (iconType) {
    case 'programming':
      return '#FFB347';
    case 'frontend':
      return '#00E5FF';
    case 'backend':
      return '#C7FF45';
    case 'mobile':
      return '#2ECC71';
    case 'database':
      return '#3498DB';
    case 'tools':
      return '#9B59B6';
    case 'ai-emerging':
      return '#FF3358';
    default:
      return '#00E5FF';
  }
};

export const SkillForestModal: React.FC<SkillForestModalProps> = ({
  initialCategoryId = 'programming-languages',
  isOpen,
  onClose,
  onTravelToNextZone
}) => {
  const [selectedId, setSelectedId] = useState<string>(initialCategoryId);
  const { sendMessage, toggleExpand } = useSanAI();

  if (!isOpen) return null;

  const currentCategory: SkillCategory =
    skillsData.find((cat) => cat.id === selectedId) || skillsData[0];
  const accentColor = getCategoryAccentColor(currentCategory.iconType);

  const handleAskAI = (skillTitle: string) => {
    sendMessage(`What is Santhosh's verified experience with ${skillTitle}?`);
    toggleExpand();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -8 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0E1210]/95 border border-[#00E5FF]/40 rounded-sm shadow-[0_0_40px_rgba(0,229,255,0.25)] flex flex-col overflow-hidden text-[var(--primary-text)] font-sans"
        >
          {/* Top Cyan Accent Bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] transition-colors duration-300"
            style={{
              background: `linear-gradient(to right, ${accentColor}, #00E5FF, transparent)`
            }}
          />

          {/* Holographic Reticle Corners */}
          <span className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#00E5FF]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#00E5FF]" />
          <span className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-[#00E5FF]" />
          <span className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#00E5FF]" />

          {/* Modal Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-3 bg-[#131713]/80">
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-sm border"
                style={{
                  backgroundColor: `${accentColor}15`,
                  borderColor: `${accentColor}40`,
                  color: accentColor
                }}
              >
                {getCategoryIcon(currentCategory.iconType)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-0.5 rounded-sm font-mono text-[9px] font-bold uppercase border"
                    style={{
                      backgroundColor: `${accentColor}20`,
                      borderColor: `${accentColor}50`,
                      color: accentColor
                    }}
                  >
                    ACT 02 // SKILL FOREST ARSENAL
                  </span>
                  <span className="font-mono text-[10px] text-[var(--muted)] hidden sm:inline">
                    7 BIOLUMINESCENT CRYSTAL CLUSTERS
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold font-mono text-white tracking-wide mt-0.5">
                  SANTHOSH KUMAR M — TECHNICAL ARSENAL
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

          {/* Horizontal Crystal Category Navigation Bar */}
          <div className="flex border-b border-white/10 bg-[#0A0D0B] px-3 py-2 gap-1.5 overflow-x-auto font-mono text-xs">
            {skillsData.map((cat) => {
              const isSelected = cat.id === selectedId;
              const catColor = getCategoryAccentColor(cat.iconType);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedId(cat.id)}
                  className={`px-3 py-1.5 rounded-sm whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? 'font-bold shadow-md'
                      : 'border-transparent text-[var(--secondary-text)] hover:text-white hover:bg-white/5'
                  }`}
                  style={{
                    backgroundColor: isSelected ? `${catColor}20` : 'transparent',
                    borderColor: isSelected ? `${catColor}60` : 'transparent',
                    color: isSelected ? catColor : undefined
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: catColor }}
                  />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 max-h-[calc(90vh-200px)]">
            {/* Category Overview Card */}
            <div className="p-4 rounded-sm bg-[#131713] border border-white/10 flex flex-col sm:flex-row items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-xs font-bold uppercase tracking-wider"
                    style={{ color: accentColor }}
                  >
                    CLUSTER {currentCategory.number} OF 07
                  </span>
                  <span className="text-[var(--muted)]">·</span>
                  <span className="font-mono text-[10px] text-[#C7FF45] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>100% VERIFIED COMPETENCE</span>
                  </span>
                </div>
                <h3 className="text-lg font-bold font-mono text-white">
                  {currentCategory.title}
                </h3>
                <p className="text-xs text-[var(--secondary-text)] leading-relaxed max-w-2xl">
                  {currentCategory.description}
                </p>
              </div>

              {/* Zero-Fabrication Philosophy Stamp */}
              <div className="p-2.5 rounded-sm bg-[#0E1210] border border-white/10 text-center shrink-0 font-mono text-[10px] text-[var(--muted)] min-w-[140px]">
                <div className="text-[var(--primary-text)] font-bold">ETHICAL AUDIT</div>
                <div className="text-[#00E5FF] font-black text-sm mt-0.5">NO FAKE %</div>
                <div className="text-[8px] text-[var(--muted)] mt-0.5">VERIFIED IN PROJECTS</div>
              </div>
            </div>

            {/* Verified Skills Grid */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold uppercase text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" style={{ color: accentColor }} />
                <span>Verified Technologies & Proficiencies</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {currentCategory.items.map((skill, idx) => (
                  <div
                    key={skill}
                    className="p-3 rounded-sm bg-[#131713]/80 border border-white/10 flex items-center justify-between gap-2 hover:border-white/30 transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-5 h-5 rounded-sm text-[10px] font-mono font-bold flex items-center justify-center shrink-0 border"
                        style={{
                          backgroundColor: `${accentColor}15`,
                          borderColor: `${accentColor}40`,
                          color: accentColor
                        }}
                      >
                        0{idx + 1}
                      </span>
                      <span className="text-xs text-white font-mono font-medium">
                        {skill}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAskAI(skill)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-[var(--muted)] hover:text-white transition-opacity font-mono text-[9px] underline"
                      title={`Ask SAN AI about ${skill}`}
                    >
                      Audit
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Engineering Application Note */}
            <div className="p-3.5 rounded-sm bg-[#0A0D0B] border border-white/10 flex items-start gap-3">
              <Terminal className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-mono text-[10px] font-bold uppercase text-white">
                  Real-World Implementation Standard
                </div>
                <p className="text-xs text-[var(--secondary-text)] leading-relaxed">
                  Every listed skill has been validated in production codebases, academic lab assignments at Gnanamani College of Technology, or professional internships at Cybernaut and ELITA. Santhosh avoids inflated self-assigned percentage bars in favor of traceable GitHub commits, verifiable APIs, and functional software architectures.
                </p>
              </div>
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="p-4 border-t border-white/10 bg-[#131713] flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => handleAskAI(currentCategory.title)}
              className="px-3 py-1.5 bg-[#00E5FF]/15 border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF]/25 font-mono text-xs font-bold rounded-sm transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask SAN AI About {currentCategory.title}</span>
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
                  <span>Next Zone: Project City</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded-sm transition-all"
              >
                Close Arsenal
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
