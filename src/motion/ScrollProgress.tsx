import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useAppMotion } from './MotionProvider';

export const ScrollProgress: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { shouldReduceMotion } = useAppMotion();
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (shouldReduceMotion) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-[2px] z-[100] bg-transparent pointer-events-none ${className}`}
      role="progressbar"
      aria-label="Page scroll reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full bg-[var(--accent)] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
};

