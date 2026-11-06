import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { HighwayMilestoneData } from './HighwayMilestones';
import { SoundFX } from '../../utils/SoundFX';

export interface HighwayModalDrawerProps {
  milestone: HighwayMilestoneData | null;
  onClose: () => void;
  onOpenClassicView: () => void;
}

export const HighwayModalDrawer: React.FC<HighwayModalDrawerProps> = ({
  milestone,
  onClose,
  onOpenClassicView
}) => {
  // ESC key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (milestone) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [milestone, onClose]);

  if (!milestone) return null;

  const handleClose = () => {
    SoundFX.playClick();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl font-mono select-text">
        {/* Backdrop click area */}
        <div className="absolute inset-0" onClick={handleClose} />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl max-h-[88vh] bg-[#070908] border border-red-500/40 rounded-xl shadow-[0_0_50px_rgba(255,30,64,0.3)] overflow-hidden flex flex-col z-10"
        >
          {/* 1. Header Bar with Crimson Laser Accent */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#0C100E] border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF1E40] shadow-[0_0_8px_#FF1E40]" />
              <span className="text-[10px] tracking-widest text-[#FF1E40] font-black uppercase">
                {milestone.codeName} // KM {milestone.km.toFixed(1)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenClassicView}
                className="px-2.5 py-1 text-[10px] font-bold text-slate-300 bg-white/5 hover:bg-white/15 rounded border border-white/15 transition-all"
              >
                Open Full 2D Page
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 2. Scrollable Body Content */}
          <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
            {/* Top Showcase: Image + Title Header */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Asset Visual */}
              <div className="md:col-span-5 relative rounded-lg overflow-hidden border border-white/15 bg-black/60 shadow-lg aspect-video md:aspect-[4/3]">
                <img
                  src={milestone.imageAsset}
                  alt={milestone.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 backdrop-blur-md rounded text-[9px] font-bold text-[#FFB347] border border-[#FFB347]/40">
                  {milestone.statBadge.label}: {milestone.statBadge.value}
                </div>
              </div>

              {/* Title & Description */}
              <div className="md:col-span-7 space-y-2">
                <div className="text-xs text-[#00E5FF] uppercase font-bold tracking-wider">
                  {milestone.subtitle}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                  {milestone.title}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {milestone.tagline}
                </p>
                <p className="text-xs text-slate-400 italic font-mono pt-1">
                  "{milestone.narration}"
                </p>
              </div>
            </div>

            {/* Bullet Highlights */}
            <div className="bg-[#0B0F0D] border border-white/10 rounded-lg p-4 space-y-2.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Key Technical Details:
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                {milestone.bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF1E40] shrink-0 mt-0.5" />
                    <span className="font-sans text-slate-200">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Custom Content Sections based on Category */}
            {milestone.category === 'profile' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center text-xs">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-slate-400 text-[10px]">Degree</div>
                  <div className="text-white font-bold mt-1">B.E. CSE</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-slate-400 text-[10px]">CGPA</div>
                  <div className="text-[#C7FF45] font-bold mt-1">7.2 / 10</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-slate-400 text-[10px]">Specialization</div>
                  <div className="text-white font-bold mt-1">Full-Stack / AI</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-slate-400 text-[10px]">Location</div>
                  <div className="text-white font-bold mt-1">Karaikal, India</div>
                </div>
              </div>
            )}

            {milestone.projects && (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#00E5FF]">
                  Featured Architectures:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {milestone.projects.map((proj, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-3.5 bg-white/5 rounded-lg border border-white/10 hover:border-[#FF1E40]/50 transition-colors space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">{proj.name}</span>
                        <span className="text-[9px] px-1.5 py-0.5 bg-[#FF1E40]/20 text-[#FF1E40] rounded font-bold border border-[#FF1E40]/30">
                          {proj.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-sans">{proj.desc}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {proj.tags.map((t, tIdx) => (
                          <span key={tIdx} className="text-[9px] px-1.5 py-0.5 bg-black/50 text-slate-400 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {milestone.category === 'destination' && (
              <div className="bg-[#0C120F] border border-red-500/30 rounded-xl p-5 text-center space-y-3">
                <div className="text-sm font-bold text-white">Ready to Discuss Software Opportunities?</div>
                <p className="text-xs text-slate-300 max-w-md mx-auto font-sans">
                  Available for Full-Time Software Engineer, Full-Stack Developer, and AI Systems roles. Direct dispatch channels open.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href="mailto:santhoshkumariicse@gmail.com"
                    className="px-4 py-2 bg-[#FF1E40] hover:bg-[#FF3366] text-white text-xs font-bold rounded-lg shadow-[0_0_20px_rgba(255,30,64,0.4)] transition-all flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Direct Email Dispatch</span>
                  </a>
                  <a
                    href="https://github.com/santhoshkumariicse-gif/portfolio"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg border border-white/20 transition-all flex items-center gap-2"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub Repositories</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* 3. Bottom Footer Navigation */}
          <div className="px-5 py-3 bg-[#0A0D0B] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span className="text-[10px]">PRESS [ESC] OR CLICK OUTSIDE TO RETURN TO SPEEDWAY</span>
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-1.5 bg-[#FF1E40] hover:bg-[#FF3366] text-white font-bold rounded text-xs transition-colors"
            >
              Resume Driving
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

