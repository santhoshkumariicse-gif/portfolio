import React from 'react';
import { motion } from 'framer-motion';
import { useAppMotion } from './MotionProvider';
import { TRANSITION_EASING, MOTION_DURATIONS } from './motionConfig';

interface AnimatedSVGPathProps {
  d: string;
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  fill?: string;
  className?: string;
  duration?: number;
  delay?: number;
}

export const AnimatedSVGPath: React.FC<AnimatedSVGPathProps> = ({
  d,
  stroke = 'var(--accent)',
  strokeWidth = 1.5,
  strokeDasharray,
  fill = 'none',
  className = '',
  duration = MOTION_DURATIONS.editorial,
  delay = 0
}) => {
  const { shouldReduceMotion } = useAppMotion();

  if (shouldReduceMotion) {
    return (
      <path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        fill={fill}
        className={className}
      />
    );
  }

  return (
    <motion.path
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      fill={fill}
      className={className}
      initial={{ pathLength: 0, opacity: 0.2 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        duration,
        delay,
        ease: TRANSITION_EASING.editorial
      }}
    />
  );
};

