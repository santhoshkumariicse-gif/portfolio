/**
 * THE DEVELOPER CHRONICLES - CINEMATIC DESIGN SYSTEM TOKENS
 * Preserving the charcoal and electric-lime palette while introducing
 * anime-inspired tech lab highlights, HUD telemetry tokens, and chapter rules.
 */

export const COLORS = {
  // Core Atmospheric Palette
  bg: '#0A0B09',
  surface: '#131512',
  surfaceSubtle: '#171A16',
  raised: '#1D211C',
  primaryText: '#F0F0E9',
  secondaryText: '#9BA195',
  mutedText: '#585F53',

  // Signature Neon Accents
  accent: '#C7FF45',
  accentDim: 'rgba(199, 255, 69, 0.12)',
  accentGlow: 'rgba(199, 255, 69, 0.28)',

  // Anime Cyber Accents (Atmospheric Storytelling)
  animeCrimson: '#FF3358',
  animeCrimsonDim: 'rgba(255, 51, 88, 0.12)',
  animeCrimsonGlow: 'rgba(255, 51, 88, 0.28)',
  animeCyan: '#00E5FF',
  animeCyanDim: 'rgba(0, 229, 255, 0.12)',
  animeCyanGlow: 'rgba(0, 229, 255, 0.28)',

  // Technical HUD Borders
  border: 'rgba(240, 240, 233, 0.11)',
  borderStrong: 'rgba(240, 240, 233, 0.22)',
  activeBorder: 'rgba(199, 255, 69, 0.65)',
  crimsonBorder: 'rgba(255, 51, 88, 0.65)'
} as const;

export const TYPOGRAPHY = {
  fonts: {
    serif: '"Newsreader", Georgia, "Times New Roman", serif',
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", SFMono-Regular, Menlo, Consolas, monospace'
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800
  },
  sizes: {
    displayCinematic: 'clamp(2.5rem, 6vw, 5rem)',
    chapterHeading: 'clamp(1.75rem, 4vw, 3rem)',
    sectionTitle: 'clamp(1.25rem, 2.5vw, 2rem)',
    body: '1rem',
    bodySmall: '0.875rem',
    hudMonospace: '0.72rem',
    hudMicro: '0.62rem'
  }
} as const;

export const SPACING = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px'
} as const;

export const BORDER_RADIUS = {
  none: '0px',
  sharp: '2px',
  card: '4px',
  hudPill: '9999px'
} as const;

export const LIGHTING_SHADOWS = {
  cardElevation: '0 8px 32px rgba(0, 0, 0, 0.75)',
  limeGlow: '0 0 25px rgba(199, 255, 69, 0.18)',
  crimsonGlow: '0 0 25px rgba(255, 51, 88, 0.22)',
  cyanGlow: '0 0 25px rgba(0, 229, 255, 0.20)',
  hudReticleGlow: '0 0 12px rgba(199, 255, 69, 0.40)'
} as const;

export const ANIMATION_STANDARDS = {
  easing: {
    cinematicEntrance: [0.16, 1, 0.3, 1] as const,
    snappyImpact: [0.25, 1, 0.5, 1] as const,
    subtleHover: [0.4, 0, 0.2, 1] as const
  },
  duration: {
    fast: 0.2,
    normal: 0.45,
    cinematic: 0.75,
    sceneTransition: 0.9
  }
} as const;

export const CHAPTER_CONFIG = {
  ch01: {
    id: 'chapter-01',
    num: 'CH_01',
    title: 'THE BEGINNING',
    subtitle: 'Gateway to the Digital Metropolis',
    theme: 'cyber-city',
    avatarExpression: 'idle' as const,
    accentColor: COLORS.accent
  },
  ch02: {
    id: 'chapter-02',
    num: 'CH_02',
    title: 'THE ORIGIN',
    subtitle: 'Personal Workspace & Foundations',
    theme: 'workspace',
    avatarExpression: 'thinking' as const,
    accentColor: COLORS.accent
  },
  ch03: {
    id: 'chapter-03',
    num: 'CH_03',
    title: 'THE ARSENAL',
    subtitle: 'Holographic Ability Tree',
    theme: 'hologram-lab',
    avatarExpression: 'exploring' as const,
    accentColor: COLORS.animeCyan
  },
  ch04: {
    id: 'chapter-04',
    num: 'CH_04',
    title: 'THE MISSIONS',
    subtitle: 'Software Engineering Directives',
    theme: 'mission-control',
    avatarExpression: 'coding' as const,
    accentColor: COLORS.animeCrimson
  },
  ch05: {
    id: 'chapter-05',
    num: 'CH_05',
    title: 'THE EVOLUTION',
    subtitle: 'Academic & Internship Milestones',
    theme: 'timeline',
    avatarExpression: 'achievement' as const,
    accentColor: COLORS.accent
  },
  ch06: {
    id: 'chapter-06',
    num: 'CH_06',
    title: 'THE NEXT CHAPTER',
    subtitle: 'Horizon Observation Deck',
    theme: 'horizon',
    avatarExpression: 'future' as const,
    accentColor: COLORS.accent
  }
} as const;

export const Z_INDEX = {
  base: 0,
  sceneBackground: 5,
  sceneContent: 10,
  avatarLayer: 20,
  hudOverlay: 30,
  stickyNav: 40,
  drawer: 50,
  modal: 60,
  commandPalette: 70,
  toast: 80,
  narrativeProgress: 100
} as const;
