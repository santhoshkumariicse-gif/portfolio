import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface TimelineProgressProps {
  progressPercentage?: number;
  className?: string;
}

export const TimelineProgress: React.FC<TimelineProgressProps> = ({
  progressPercentage = 100,
  className = ''
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background Track Line */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/10" />

      {/* Progressively Drawn Gradient Beam */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[2.5px] bg-gradient-to-b from-[#C7FF45] via-[#00E5FF] to-[#C7FF45] origin-top"
        initial={shouldReduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
        whileInView={{ scaleY: progressPercentage / 100 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: '100%' }}
      />
    </div>
  );
};

