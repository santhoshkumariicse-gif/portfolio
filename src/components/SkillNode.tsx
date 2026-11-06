import React from 'react';
import { motion } from 'framer-motion';
import { SkillCategory } from '../types';
import {
  ProgrammingSvg,
  WebArchitectureSvg,
  BackendSvg,
  MobileDevelopmentSvg,
  DatabaseSvg,
  ToolsSvg,
  AISecuritySvg
} from '../svgs/SkillCategorySvgs';

export interface SkillNodeProps {
  category: SkillCategory;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (category: SkillCategory) => void;
  onHover: (category: SkillCategory | null) => void;
}

export const SkillNode: React.FC<SkillNodeProps> = ({
  category,
  isSelected,
  isHovered,
  onSelect,
  onHover
}) => {
  const renderIcon = (type: string) => {
    switch (type) {
      case 'programming':
        return <ProgrammingSvg className="w-5 h-5 text-[#00E5FF]" />;
      case 'frontend':
      case 'web':
        return <WebArchitectureSvg className="w-5 h-5 text-[#00E5FF]" />;
      case 'backend':
        return <BackendSvg className="w-5 h-5 text-[#00E5FF]" />;
      case 'mobile':
        return <MobileDevelopmentSvg className="w-5 h-5 text-[#00E5FF]" />;
      case 'database':
        return <DatabaseSvg className="w-5 h-5 text-[#00E5FF]" />;
      case 'tools':
      case 'workflow':
        return <ToolsSvg className="w-5 h-5 text-[#00E5FF]" />;
      case 'ai-emerging':
      case 'ai-security':
        return <AISecuritySvg className="w-5 h-5 text-[#00E5FF]" />;
      default:
        return <ProgrammingSvg className="w-5 h-5 text-[#00E5FF]" />;
    }
  };

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(category)}
      onMouseEnter={() => onHover(category)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(category)}
      onBlur={() => onHover(null)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`relative p-3.5 sm:p-4 text-left transition-all duration-300 rounded-sm border backdrop-blur-md flex flex-col justify-between ${
        isSelected
          ? 'bg-[#172023] border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.35)] ring-1 ring-[#00E5FF]'
          : isHovered
          ? 'bg-[#141A1C] border-[#00E5FF]/70 shadow-[0_0_12px_rgba(0,229,255,0.2)]'
          : 'bg-[#131512]/90 border-white/10 hover:border-white/25'
      }`}
      aria-pressed={isSelected}
    >
      {/* Node Header */}
      <div className="flex items-center justify-between gap-2 mb-2 w-full">
        <span className="font-mono text-[10px] text-[#00E5FF] font-bold">
          NODE_{category.number}
        </span>
        <div className="p-1.5 rounded-sm bg-black/40 border border-white/10">
          {renderIcon(category.iconType)}
        </div>
      </div>

      {/* Node Title */}
      <div className="font-sans font-bold text-xs sm:text-sm text-[var(--primary-text)] line-clamp-1">
        {category.title}
      </div>

      {/* Skills Item Count Pill */}
      <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-[var(--secondary-text)]">
        <span>{category.items.length} Modules</span>
        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#00E5FF] animate-ping' : 'bg-white/20'}`} />
      </div>
    </motion.button>
  );
};
