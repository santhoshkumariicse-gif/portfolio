import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface StoryChapterProps {
  chapterNumber: string; // e.g. "CH_01"
  title: string;         // e.g. "THE BEGINNING"
  subtitle: string;      // e.g. "Gateway to the Digital Metropolis"
  narrativeLogline?: string;
  environmentTheme?: 'cyber-city' | 'workspace' | 'hologram-lab' | 'mission-control' | 'timeline' | 'horizon';
  children: React.ReactNode;
  id?: string;
  className?: string;
}

const themeAccents: Record<string, { border: string; glow: string; badge: string; text: string }> = {
  'cyber-city': {
    border: 'border-[#C7FF45]/30',
    glow: 'rgba(199, 255, 69, 0.15)',
    badge: 'bg-[#C7FF45]/10 text-[#C7FF45] border-[#C7FF45]/40',
    text: 'text-[#C7FF45]'
  },
  'workspace': {
    border: 'border-[#C7FF45]/30',
    glow: 'rgba(199, 255, 69, 0.12)',
    badge: 'bg-[#C7FF45]/10 text-[#C7FF45] border-[#C7FF45]/40',
    text: 'text-[#C7FF45]'
  },
  'hologram-lab': {
    border: 'border-[#00E5FF]/30',
    glow: 'rgba(0, 229, 255, 0.18)',
    badge: 'bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/40',
    text: 'text-[#00E5FF]'
  },
  'mission-control': {
    border: 'border-[#FF3358]/30',
    glow: 'rgba(255, 51, 88, 0.18)',
    badge: 'bg-[#FF3358]/10 text-[#FF3358] border-[#FF3358]/40',
    text: 'text-[#FF3358]'
  },
  'timeline': {
    border: 'border-[#C7FF45]/30',
    glow: 'rgba(199, 255, 69, 0.15)',
    badge: 'bg-[#C7FF45]/10 text-[#C7FF45] border-[#C7FF45]/40',
    text: 'text-[#C7FF45]'
  },
  'horizon': {
    border: 'border-[#C7FF45]/30',
    glow: 'rgba(199, 255, 69, 0.15)',
    badge: 'bg-[#C7FF45]/10 text-[#C7FF45] border-[#C7FF45]/40',
    text: 'text-[#C7FF45]'
  }
};

export const StoryChapter: React.FC<StoryChapterProps> = ({
  chapterNumber,
  title,
  subtitle,
  narrativeLogline,
  environmentTheme = 'cyber-city',
  children,
  id,
  className = ''
}) => {
  const shouldReduceMotion = useReducedMotion();
  const theme = themeAccents[environmentTheme] || themeAccents['cyber-city'];

  return (
    <section
      id={id}
      data-chapter={chapterNumber}
      data-theme={environmentTheme}
      className={`relative py-16 md:py-24 border-b border-[var(--border)] overflow-hidden ${className}`}
    >
      {/* Chapter Ambient Background Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#C7FF45_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-[1180px] w-full mx-auto px-4 sm:px-6 relative z-10">
        {/* Cinematic Chapter Header HUD */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-14"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
            {/* Left: Chapter Badge & Subtitle */}
            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-1 text-[11px] font-mono font-bold tracking-widest uppercase border rounded-sm ${theme.badge}`}>
                {chapterNumber}
              </span>
              <span className="text-xs md:text-sm font-mono tracking-wider text-[var(--secondary-text)] uppercase">
                {subtitle}
              </span>
            </div>

            {/* Right: Telemetry / Status indicator */}
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-[var(--muted)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF45] animate-ping" />
              <span>STORY_ARC // ACTIVE</span>
            </div>
          </div>

          {/* Chapter Main Title */}
          <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--primary-text)] font-sans uppercase">
                {title}
              </h2>
              {narrativeLogline && (
                <p className="mt-2 text-sm sm:text-base text-[var(--secondary-text)] max-w-2xl leading-relaxed font-sans">
                  {narrativeLogline}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Chapter Body Content */}
        {children}
      </div>
    </section>
  );
};
