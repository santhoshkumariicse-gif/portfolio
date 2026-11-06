import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkillCategory } from '../types';
import { CheckCircle2, Terminal, Code2, Cpu } from 'lucide-react';

export interface SkillDetailsProps {
  category: SkillCategory | null;
  onClose?: () => void;
}

export const SkillDetails: React.FC<SkillDetailsProps> = ({ category }) => {
  if (!category) {
    return (
      <div className="p-6 rounded-sm bg-[#131512]/90 border border-white/10 text-center flex flex-col items-center justify-center min-h-[220px]">
        <Cpu className="w-8 h-8 text-[#00E5FF]/40 mb-3 animate-pulse" />
        <span className="font-mono text-xs text-[#00E5FF] uppercase tracking-wider">
          AWAITING NODE SELECTION
        </span>
        <p className="mt-1.5 text-xs text-[var(--secondary-text)] max-w-xs">
          Select any skill node in the tree above to inspect its real application and module breakdown.
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className="relative p-5 sm:p-6 rounded-sm bg-[#131512]/95 border border-[#00E5FF]/40 shadow-[0_12px_32px_rgba(0,0,0,0.85)]"
      >
        {/* Top Glow Edge */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00E5FF] via-[#C7FF45] to-[#00E5FF]" />

        {/* Header: Node Number & Category Title */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-sm bg-[#00E5FF]/10 text-[#00E5FF] font-mono text-[10px] font-bold border border-[#00E5FF]/30">
              ARSENAL // NODE_{category.number}
            </span>
            <span className="text-xs font-mono text-[var(--muted)]">ID: {category.id}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#00E5FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            <span>VERIFIED CAPABILITY</span>
          </div>
        </div>

        {/* Category Title & Description */}
        <div className="mt-3">
          <h3 className="text-lg sm:text-xl font-bold text-[var(--primary-text)] font-sans">
            {category.title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[var(--secondary-text)] leading-relaxed font-sans">
            {category.description}
          </p>
        </div>

        {/* Verified Modules List */}
        <div className="mt-4 pt-3 border-t border-white/5">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#00E5FF] font-semibold uppercase tracking-wider mb-2.5">
            <Code2 className="w-3.5 h-3.5" />
            <span>Active Modules & Proficiencies:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {category.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-2 rounded-sm bg-black/40 border border-white/5 text-xs text-[var(--primary-text)] font-sans"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Telemetry Footer */}
        <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between text-[10px] font-mono text-[var(--muted)]">
          <span className="flex items-center gap-1">
            <Terminal className="w-3 h-3 text-[#00E5FF]" />
            DEFENSIVE_STANDARDS // OWASP_ALIGNED
          </span>
          <span>NO FABRICATED PERCENTAGES</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
