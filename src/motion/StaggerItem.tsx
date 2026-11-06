import React, { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { useAppMotion } from './MotionProvider';
import { TRANSITION_EASING, MOTION_DURATIONS } from './motionConfig';

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  yOffset?: number;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
  yOffset = 14
}) => {
  const { shouldReduceMotion } = useAppMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION_DURATIONS.standard,
        ease: TRANSITION_EASING.editorial
      }
    }
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

