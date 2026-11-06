import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { X, Terminal } from 'lucide-react';

export interface HoloInfoPanelProps {
  title: string;
  badge?: string;
  coordinates?: string;
  onClose?: () => void;
  variant?: 'cyan' | 'lime' | 'crimson';
  children: React.ReactNode;
  className?: string;
}

export const HoloInfoPanel: React.FC<HoloInfoPanelProps> = ({
  title,
  badge = 'TELEMETRY',
  coordinates,
  onClose,
  variant = 'cyan',
  children,
  className = ''
}) => {
  const shouldReduceMotion = useReducedMotion();

  const variantBar = {
    cyan: 'from-[#00E5FF] via-[#00E5FF]/60 to-transparent',
    lime: 'from-[#C7FF45] via-[#C7FF45]/60 to-transparent',
    crimson: 'from-[#FF3358] via-[#FF3358]/60 to-transparent'
  }[variant];

  const variantAccent = {
    cyan: 'text-[#00E5FF] border-[#00E5FF]/40',
    lime: 'text-[#C7FF45] border-[#C7FF45]/40',
    crimson: 'text-[#FF3358] border-[#FF3358]/40'
  }[variant];

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -4 }}
      transition={{ duration: 0.25 }}
      className={`relative p-5 rounded-sm bg-[#0E1210]/95 border border-white/20 backdrop-blur-md shadow-[0_12px_36px_rgba(0,0,0,0.85)] ${className}`}
    >
      {/* Top Edge Holographic Gradient Bar */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${variantBar}`} />

      {/* Reticle Corner Brackets */}
      <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-white/40" />
      <span className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-white/40" />
      <span className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-white/40" />
      <span className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-white/40" />

      {/* Panel Header */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 gap-2">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-sm font-mono text-[9px] font-bold border uppercase ${variantAccent}`}>
            {badge}
          </span>
          <span className="font-mono text-xs font-bold text-[var(--primary-text)] tracking-wider">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {coordinates && (
            <span className="hidden sm:inline font-mono text-[10px] text-[var(--muted)]">
              {coordinates}
            </span>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[var(--muted)] hover:text-white transition-colors"
              aria-label="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Panel Body Content */}
      <div className="text-sm text-[var(--secondary-text)] leading-relaxed">
        {children}
      </div>

      {/* Panel Footer Telemetry */}
      <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-[var(--muted)]">
        <span className="flex items-center gap-1">
          <Terminal className="w-3 h-3 text-[#00E5FF]" />
          <span>SAN_AI // QUANTUM_LINK</span>
        </span>
        <span>STATUS: VERIFIED</span>
      </div>
    </motion.div>
  );
};

