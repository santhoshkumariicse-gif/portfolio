import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type AICoreState = 'idle' | 'listening' | 'processing' | 'speaking' | 'error';

export interface CircularAICoreControlProps {
  state?: AICoreState;
  size?: number; // diameter in pixels (default 80)
  onClick?: () => void;
  className?: string;
}

export const CircularAICoreControl: React.FC<CircularAICoreControlProps> = ({
  state = 'idle',
  size = 80,
  onClick,
  className = ''
}) => {
  const shouldReduceMotion = useReducedMotion();

  const stateColors: Record<AICoreState, { core: string; glow: string; text: string }> = {
    idle: { core: '#00E5FF', glow: 'rgba(0, 229, 255, 0.4)', text: 'IDLE' },
    listening: { core: '#C7FF45', glow: 'rgba(199, 255, 69, 0.5)', text: 'LISTENING' },
    processing: { core: '#FFB347', glow: 'rgba(255, 179, 71, 0.5)', text: 'PROCESSING' },
    speaking: { core: '#00E5FF', glow: 'rgba(0, 229, 255, 0.6)', text: 'SPEAKING' },
    error: { core: '#FF3358', glow: 'rgba(255, 51, 88, 0.6)', text: 'ERROR' }
  };

  const currentTheme = stateColors[state];

  return (
    <div
      onClick={onClick}
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center cursor-pointer select-none group ${className}`}
      role="button"
      tabIndex={0}
      aria-label={`SAN AI Core Status: ${state}`}
    >
      {/* Outer Pulse Glow */}
      <div
        className="absolute inset-0 rounded-full blur-md opacity-40 group-hover:opacity-75 transition-opacity"
        style={{ backgroundColor: currentTheme.glow }}
      />

      {/* Outer Rotating Reticle Ring */}
      <svg
        viewBox="0 0 100 100"
        className={`absolute inset-0 w-full h-full ${
          shouldReduceMotion ? '' : 'animate-[spin_12s_linear_infinite]'
        }`}
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke={currentTheme.core}
          strokeWidth="1"
          strokeDasharray="4 8"
          opacity="0.6"
        />
        <circle
          cx="50"
          cy="50"
          r="41"
          fill="none"
          stroke={currentTheme.core}
          strokeWidth="1.5"
          strokeDasharray="24 16 8 16"
        />
      </svg>

      {/* Inner Counter-Rotating Geometrics */}
      <svg
        viewBox="0 0 100 100"
        className={`absolute inset-0 w-full h-full ${
          shouldReduceMotion ? '' : 'animate-[spin_8s_linear_infinite_reverse]'
        }`}
      >
        <circle
          cx="50"
          cy="50"
          r="34"
          fill="none"
          stroke={currentTheme.core}
          strokeWidth="0.75"
          strokeDasharray="2 6"
          opacity="0.8"
        />
      </svg>

      {/* Central Pulsing Energy Core */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: state === 'speaking' || state === 'listening' ? [1, 1.25, 1] : [1, 1.08, 1],
                opacity: [0.75, 1, 0.75]
              }
        }
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: size * 0.42,
          height: size * 0.42,
          backgroundColor: currentTheme.core,
          boxShadow: `0 0 16px ${currentTheme.core}`
        }}
        className="rounded-full flex items-center justify-center text-[8px] font-mono font-extrabold text-[#0A0B09]"
      >
        SAN
      </motion.div>
    </div>
  );
};
