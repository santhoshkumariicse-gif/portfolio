import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { AvatarExpression } from './AnimeAvatar';

export interface CharacterDialogueProps {
  speaker?: string;
  message: string;
  expression?: AvatarExpression;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top' | 'bottom';
  autoHideMs?: number;
  onClose?: () => void;
  className?: string;
}

export const CharacterDialogue: React.FC<CharacterDialogueProps> = ({
  speaker = 'SANTHOSH // LOG ENTRY',
  message,
  expression,
  position = 'top-right',
  autoHideMs,
  onClose,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsVisible(true);
    if (!autoHideMs) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, autoHideMs);

    return () => clearTimeout(timer);
  }, [message, autoHideMs, onClose]);

  const handleDismiss = () => {
    setIsVisible(false);
    onClose?.();
  };

  const positionClasses: Record<string, string> = {
    'top-right': 'top-0 right-0 md:-top-4 md:-right-8',
    'top-left': 'top-0 left-0 md:-top-4 md:-left-8',
    'bottom-right': 'bottom-0 right-0 md:-bottom-4 md:-right-8',
    'bottom-left': 'bottom-0 left-0 md:-bottom-4 md:-left-8',
    top: '-top-12 left-1/2 -translate-x-1/2',
    bottom: '-bottom-12 left-1/2 -translate-x-1/2'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`relative z-30 max-w-sm w-full p-3.5 rounded-sm bg-[#131512]/95 border border-white/20 backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.85)] ${positionClasses[position] || ''} ${className}`}
          role="region"
          aria-live="polite"
        >
          {/* Top Cyber Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C7FF45] via-[#C7FF45]/80 to-transparent" />

          {/* Corner HUD Reticles */}
          <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-[#C7FF45]/70" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-[#C7FF45]/70" />
          <span className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-[#C7FF45]/70" />
          <span className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-[#C7FF45]/70" />

          {/* Header Row: Speaker Monospace Tag & Close Button */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF45] animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-wider text-[#C7FF45] uppercase">
                {speaker}
              </span>
              {expression && (
                <span className="text-[9px] font-mono px-1 py-0.2 bg-white/5 rounded text-[#9BA195]">
                  [{expression}]
                </span>
              )}
            </div>

            <button
              onClick={handleDismiss}
              className="text-[#9BA195] hover:text-[#F0F0E9] p-0.5 rounded transition-colors text-xs"
              aria-label="Dismiss dialogue"
            >
              ✕
            </button>
          </div>

          {/* Message Content */}
          <p className="text-xs md:text-sm text-[#F0F0E9] leading-relaxed font-sans font-normal">
            {message}
          </p>

          {/* Bottom HUD Metadata */}
          <div className="mt-2 pt-1 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-[#585F53]">
            <span>CHRONICLE_COMM // ONLINE</span>
            <span>FREQ: 2.44GHz</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
