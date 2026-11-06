import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useAppMotion } from './MotionProvider';
import { TRANSITION_EASING, MOTION_DURATIONS, STAGGER_DELAYS, VIEWPORT_CONFIG } from './motionConfig';

interface AnimatedTextProps {
  text: string;
  className?: string;
  el?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  stagger?: number;
  delay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  el: Tag = 'h2',
  stagger = STAGGER_DELAYS.tight,
  delay = 0
}) => {
  const { shouldReduceMotion } = useAppMotion();

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
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
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_CONFIG}
      className={`inline-block ${className}`}
    >
      {words.map((word, idx) => (
        <span key={`${word}-${idx}`} className="inline-block whitespace-nowrap mr-[0.25em]">
          <motion.span variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

