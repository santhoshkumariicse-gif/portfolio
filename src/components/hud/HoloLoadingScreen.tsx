import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface HoloLoadingScreenProps {
  progress?: number;
  statusText?: string;
}

export const HoloLoadingScreen: React.FC<HoloLoadingScreenProps> = ({
  progress = 85,
  statusText = 'INITIALIZING DIGITAL UNIVERSE...'
}) => {
  const shouldReduceMotion = useReducedMotion();

  const systems = [
    { name: 'WebGL 2.0 Graphics Pipeline', status: 'SYNCHRONIZED' },
    { name: 'Aethelgard Island Geometry', status: 'STREAMING' },
    { name: 'SAN AI Knowledge Base', status: 'MOUNTED' },
    { name: 'Spatial Telemetry Radar', status: 'ACTIVE' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0B09] flex flex-col items-center justify-center p-6 select-none font-mono">
      {/* Background Subtle Radar Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[450px] h-[450px] rounded-full border border-[#00E5FF] animate-ping" />
        <div className="w-[300px] h-[300px] rounded-full border border-[#C7FF45] animate-pulse" />
      </div>

      <div className="relative z-10 max-w-md w-full p-6 rounded-sm bg-[#111412]/95 border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.9)]">
        {/* Top Reticle Accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00E5FF] via-[#C7FF45] to-[#FF3358]" />

        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs">
          <span className="text-[#00E5FF] font-bold">SAN AI // SYSTEM BOOT</span>
          <span className="text-[#C7FF45]">{progress}%</span>
        </div>

        {/* Status Text */}
        <p className="text-xs text-[var(--primary-text)] font-semibold tracking-wider mb-4">
          {statusText}
        </p>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/10 mb-5">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00E5FF] via-[#C7FF45] to-[#00E5FF]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
          />
        </div>

        {/* Diagnostic Subsystems Checklist */}
        <div className="space-y-2 text-[10px]">
          {systems.map((s, idx) => (
            <div key={idx} className="flex items-center justify-between p-1.5 rounded-sm bg-black/40 border border-white/5">
              <span className="text-[var(--secondary-text)]">{s.name}</span>
              <span className="text-[#C7FF45] font-bold">[{s.status}]</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

