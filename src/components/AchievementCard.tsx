import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CertificationItem } from '../types';
import { Award, Calendar, CheckCircle } from 'lucide-react';

export interface AchievementCardProps {
  cert: CertificationItem;
  index: number;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ cert, index }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="p-5 sm:p-6 rounded-sm bg-[#131512]/95 border border-white/10 hover:border-[#C7FF45]/60 transition-all duration-300 flex flex-col justify-between group"
    >
      <div>
        {/* Header: Category Badge & Date */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-sm bg-[#C7FF45]/10 text-[#C7FF45] font-mono text-[10px] font-bold border border-[#C7FF45]/30">
            {cert.category.toUpperCase()}
          </span>
          <span className="flex items-center gap-1 font-mono text-[11px] text-[var(--muted)]">
            <Calendar className="w-3 h-3 text-[var(--muted)]" />
            <span>{cert.date}</span>
          </span>
        </div>

        {/* Certificate Title */}
        <h3 className="text-base sm:text-lg font-bold text-[var(--primary-text)] font-sans group-hover:text-[#C7FF45] transition-colors">
          {cert.title}
        </h3>

        {/* Issuer */}
        <div className="mt-1 flex items-center gap-1.5 font-mono text-xs text-[#00E5FF]">
          <Award className="w-3.5 h-3.5" />
          <span>{cert.issuer}</span>
        </div>

        {/* Description */}
        <p className="mt-3 text-xs sm:text-sm text-[var(--secondary-text)] leading-relaxed font-sans">
          {cert.description}
        </p>
      </div>

      {/* Verification Badge */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-[var(--muted)]">
        <span className="flex items-center gap-1 text-[#C7FF45]">
          <CheckCircle className="w-3 h-3" />
          <span>VERIFIED RECORD</span>
        </span>
        <span>ID: {cert.id}</span>
      </div>
    </motion.div>
  );
};
