import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useAppMotion } from './MotionProvider';
import { TRANSITION_EASING, MOTION_DURATIONS, VIEWPORT_CONFIG } from './motionConfig';

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  yOffset?: number;
}

export const RevealSection: React.FC<RevealSectionProps> = ({
  children,
  className = '',
  id,
  delay = 0,
  yOffset = 16
}) => {
  const { shouldReduceMotion } = useAppMotion();

  if (shouldReduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{
        duration: MOTION_DURATIONS.editorial,
        delay,
        ease: TRANSITION_EASING.editorial
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

