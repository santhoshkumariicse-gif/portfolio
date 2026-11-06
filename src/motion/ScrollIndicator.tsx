import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const ScrollIndicator: React.FC<{ targetId?: string; className?: string }> = ({
  targetId = 'command-center',
  className = ''
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <a
      href={`#${targetId}`}
      className={`inline-flex flex-col items-center gap-2 group cursor-pointer ${className}`}
      aria-label="Scroll to next section"
    >
      <span className="font-[var(--mono)] text-[0.65rem] tracking-widest uppercase text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
        Scroll To Explore
      </span>

      {/* Technical track & moving pulse */}
      <div className="w-[1px] h-10 bg-[var(--border-strong)] relative overflow-hidden">
        {shouldReduceMotion ? (
          <div className="w-full h-3 bg-[var(--accent)]" />
        ) : (
          <motion.div
            className="w-full h-3.5 bg-[var(--accent)] shadow-[0_0_8px_var(--accent-glow)]"
            animate={{
              y: [-14, 40]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )}
      </div>
    </a>
  );
};

