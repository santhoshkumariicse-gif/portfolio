import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface TextMaskRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span';
}

export const TextMaskReveal: React.FC<TextMaskRevealProps> = ({
  children,
  delay = 0.1,
  duration = 0.7,
  className = '',
  as: Component = 'div'
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component className={`overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '100%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        {children}
      </motion.span>
    </Component>
  );
};

