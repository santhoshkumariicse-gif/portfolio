/**
 * PORTFOLIO V6 - DESIGN SYSTEM TOKENS
 * Strict design constraints preserving the studio charcoal and electric-lime identity.
 */

export const COLORS = {
  bg: '#0A0B09',
  surface: '#131512',
  surfaceSubtle: '#171A16',
  raised: '#1D211C',
  primaryText: '#F0F0E9',
  secondaryText: '#9BA195',
  mutedText: '#585F53',
  accent: '#C7FF45',
  accentDim: 'rgba(199, 255, 69, 0.12)',
  accentGlow: 'rgba(199, 255, 69, 0.28)',
  border: 'rgba(240, 240, 233, 0.11)',
  borderStrong: 'rgba(240, 240, 233, 0.22)',
  activeBorder: 'rgba(199, 255, 69, 0.65)'
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
  24: '96px'
} as const;

export const Z_INDEX = {
  base: 0,
  sticky: 40,
  drawer: 50,
  modal: 60,
  commandPalette: 70,
  toast: 80,
  progress: 100
} as const;

