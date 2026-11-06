import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExperienceItem } from '../types';
import { Building2, MapPin, ChevronRight } from 'lucide-react';

export interface TimelineMilestoneProps {
  item: ExperienceItem;
  index: number;
}

export const TimelineMilestone: React.FC<TimelineMilestoneProps> = ({ item, index }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 md:pl-12 group"
    >
      {/* Node Pulsing Beacon Marker */}
      <div className="absolute left-[-5px] top-2 w-3 h-3 rounded-full bg-[#0A0B09] border-2 border-[#C7FF45] group-hover:scale-125 transition-transform">
        <span className="absolute inset-0 rounded-full bg-[#C7FF45]/40 animate-ping" />
      </div>

      {/* Main Milestone Card Container */}
      <div className="p-5 sm:p-6 rounded-sm bg-[#131512]/95 border border-white/10 hover:border-[#C7FF45]/60 transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
        {/* Top Edge Accent */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="font-mono text-xs font-bold text-[#C7FF45] tracking-wider">
            {item.period}
          </span>
          <span className="flex items-center gap-1 font-mono text-[11px] text-[var(--muted)]">
            <MapPin className="w-3 h-3 text-[#C7FF45]" />
            <span>{item.location}</span>
          </span>
        </div>

        {/* Role & Organization */}
        <div className="flex flex-wrap items-baseline gap-2 mb-2">
          <h3 className="text-lg sm:text-xl font-bold text-[var(--primary-text)] font-sans">
            {item.role}
          </h3>
          <span className="text-xs sm:text-sm font-mono text-[#00E5FF] font-semibold flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>{item.organization}</span>
          </span>
        </div>

        {/* Narrative Description */}
        <p className="text-xs sm:text-sm text-[var(--secondary-text)] leading-relaxed font-sans mb-3.5">
          {item.description}
        </p>

        {/* Verified Highlights */}
        <div className="pt-3 border-t border-white/5 space-y-1.5 font-sans">
          {item.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-[var(--secondary-text)]">
              <ChevronRight className="w-3.5 h-3.5 text-[#C7FF45] shrink-0 mt-0.5" />
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
