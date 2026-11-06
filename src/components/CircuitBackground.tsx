import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const CircuitBackground: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.035]"
      aria-hidden="true"
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="circuit-grad-lime" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C7FF45" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C7FF45" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Global horizontal and vertical tech traces */}
        <line x1="10%" y1="0" x2="10%" y2="100%" stroke="#F0F0E9" strokeWidth="0.75" />
        <line x1="90%" y1="0" x2="90%" y2="100%" stroke="#F0F0E9" strokeWidth="0.75" />
        <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#F0F0E9" strokeWidth="0.75" />
        <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#F0F0E9" strokeWidth="0.75" />

        {/* Circuit bus diagonals */}
        <path d="M 100,50 L 250,50 L 300,100 L 500,100" fill="none" stroke="#C7FF45" strokeWidth="1" />
        <path d="M 800,200 L 950,200 L 1000,250 L 1200,250" fill="none" stroke="#C7FF45" strokeWidth="1" />

        {/* Moving data packets along lines */}
        <motion.circle
          r="3"
          fill="#C7FF45"
          animate={{
            cx: [100, 250, 300, 500],
            cy: [50, 50, 100, 100],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        <motion.circle
          r="3"
          fill="#C7FF45"
          animate={{
            cx: [800, 950, 1000, 1200],
            cy: [200, 200, 250, 250],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4
          }}
        />
      </svg>
    </div>
  );
};

