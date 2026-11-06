import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useSanAI } from './SanAIProvider';

export interface AICoreProps {
  size?: number; // default 96
  className?: string;
}

export const AICore: React.FC<AICoreProps> = ({ size = 96, className = '' }) => {
  const { state, isExpanded, toggleExpand } = useSanAI();
  const shouldReduceMotion = useReducedMotion();

  const themeColors = {
    idle: { primary: '#00E5FF', glow: 'rgba(0, 229, 255, 0.4)', status: 'ONLINE // IDLE' },
    listening: { primary: '#C7FF45', glow: 'rgba(199, 255, 69, 0.6)', status: 'LISTENING // AUDIO_IN' },
    processing: { primary: '#FFB347', glow: 'rgba(255, 179, 71, 0.6)', status: 'ANALYZING // KB_QUERY' },
    speaking: { primary: '#00E5FF', glow: 'rgba(0, 229, 255, 0.8)', status: 'TRANSMITTING // SPEECH_OUT' },
    navigation: { primary: '#FF3358', glow: 'rgba(255, 51, 88, 0.7)', status: 'ROUTING // COORDINATE_LOCK' },
    error: { primary: '#FF3358', glow: 'rgba(255, 51, 88, 0.8)', status: 'ALERT // ANOMALY' }
  }[state];

  const waveformBars = [12, 24, 18, 30, 22, 14, 28, 16];

  return (
    <div
      onClick={toggleExpand}
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center cursor-pointer select-none group ${className}`}
      role="button"
      tabIndex={0}
      aria-label="Toggle SAN AI Assistant Interface"
      title="Click to open SAN AI Assistant"
    >
      {/* 1. Ambient Background Glow Aura */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-50 group-hover:opacity-85 transition-opacity"
        style={{ backgroundColor: themeColors.glow }}
      />

      {/* 2. Outer Concentric Telemetry Ring */}
      <svg
        viewBox="0 0 120 120"
        className={`absolute inset-0 w-full h-full ${
          shouldReduceMotion ? '' : 'animate-[spin_16s_linear_infinite]'
        }`}
      >
        <circle
          cx="60"
          cy="60"
          r="56"
          fill="none"
          stroke={themeColors.primary}
          strokeWidth="1.2"
          strokeDasharray="6 10"
          opacity="0.5"
        />
        <circle
          cx="60"
          cy="60"
          r="51"
          fill="none"
          stroke={themeColors.primary}
          strokeWidth="2"
          strokeDasharray="30 18 12 18"
        />
      </svg>

      {/* 3. Middle Counter-Rotating Ring */}
      <svg
        viewBox="0 0 120 120"
        className={`absolute inset-0 w-full h-full ${
          shouldReduceMotion ? '' : 'animate-[spin_10s_linear_infinite_reverse]'
        }`}
      >
        <circle
          cx="60"
          cy="60"
          r="42"
          fill="none"
          stroke={themeColors.primary}
          strokeWidth="1"
          strokeDasharray="3 6"
          opacity="0.8"
        />
        {/* Tick marks */}
        <line x1="60" y1="14" x2="60" y2="19" stroke={themeColors.primary} strokeWidth="2" />
        <line x1="60" y1="101" x2="60" y2="106" stroke={themeColors.primary} strokeWidth="2" />
        <line x1="14" y1="60" x2="19" y2="60" stroke={themeColors.primary} strokeWidth="2" />
        <line x1="101" y1="60" x2="106" y2="60" stroke={themeColors.primary} strokeWidth="2" />
      </svg>

      {/* 4. Active Sound Waveform (Animates during speaking/listening) */}
      {(state === 'speaking' || state === 'listening') && (
        <div className="absolute inset-0 flex items-center justify-center gap-0.5 pointer-events-none z-10">
          {waveformBars.map((h, i) => (
            <motion.div
              key={i}
              className="w-0.5 rounded-full"
              style={{ backgroundColor: themeColors.primary }}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      height: [h * 0.4, h, h * 0.4]
                    }
              }
              transition={{
                duration: 0.5 + (i % 3) * 0.15,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      )}

      {/* 5. Central High-Energy Core Orb */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: state === 'speaking' || state === 'listening' ? [1, 1.15, 1] : [1, 1.05, 1],
                opacity: [0.85, 1, 0.85]
              }
        }
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: size * 0.42,
          height: size * 0.42,
          backgroundColor: themeColors.primary,
          boxShadow: `0 0 20px ${themeColors.primary}`
        }}
        className="rounded-full flex flex-col items-center justify-center text-[#0A0B09] font-mono font-extrabold text-[10px] tracking-wider z-20"
      >
        <span>SAN</span>
      </motion.div>

      {/* Status Pill Tag Underneath when not expanded */}
      {!isExpanded && (
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-sm bg-black/80 border border-white/10 font-mono text-[8px] text-[var(--secondary-text)]">
          {themeColors.status}
        </div>
      )}
    </div>
  );
};

