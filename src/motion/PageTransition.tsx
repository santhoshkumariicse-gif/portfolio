import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useAppMotion } from './MotionProvider';
import { TRANSITION_EASING, MOTION_DURATIONS } from './motionConfig';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  const { shouldReduceMotion } = useAppMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: MOTION_DURATIONS.standard,
        ease: TRANSITION_EASING.editorial
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

