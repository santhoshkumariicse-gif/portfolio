/**
 * SAN AI — THE DEVELOPER UNIVERSE: FUTURISTIC HUD DESIGN TOKENS
 * Inspired by tactical aerospace telemetry and sci-fi interfaces
 * without copying copyrighted IP.
 */

export const HUD_COLORS = {
  // Atmospheric obsidian backdrop
  voidBg: '#0A0B09',
  spaceBlack: '#060705',
  glassSurface: 'rgba(13, 16, 14, 0.88)',
  glassRaised: 'rgba(20, 26, 22, 0.94)',

  // Holographic primary signals
  cyan: '#00E5FF',
  cyanDim: 'rgba(0, 229, 255, 0.12)',
  cyanGlow: '0 0 16px rgba(0, 229, 255, 0.35)',

  lime: '#C7FF45',
  limeDim: 'rgba(199, 255, 69, 0.12)',
  limeGlow: '0 0 16px rgba(199, 255, 69, 0.35)',

  crimson: '#FF3358',
  crimsonDim: 'rgba(255, 51, 88, 0.12)',
  crimsonGlow: '0 0 16px rgba(255, 51, 88, 0.35)',

  amber: '#FFB347',
  amberDim: 'rgba(255, 179, 71, 0.12)',

  // Neutral telemetry typography
  textPrimary: '#F0F0E9',
  textSecondary: '#9BA195',
  textMuted: '#585F53',
  borderSubtle: 'rgba(240, 240, 233, 0.12)',
  borderHolo: 'rgba(0, 229, 255, 0.4)'
} as const;

export const HUD_TYPOGRAPHY = {
  mono: '"JetBrains Mono", SFMono-Regular, Menlo, Consolas, monospace',
  sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  sizes: {
    micro: '0.62rem',
    badge: '0.70rem',
    body: '0.875rem',
    title: '1.25rem',
    display: '2.25rem'
  }
} as const;

export const HUD_MOTION = {
  easing: {
    telemetry: [0.16, 1, 0.3, 1] as const,
    spring: [0.2, 0.8, 0.2, 1] as const
  },
  duration: {
    instant: 0.15,
    normal: 0.3,
    scan: 0.8
  }
} as const;
