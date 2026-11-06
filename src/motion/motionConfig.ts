/**
 * PORTFOLIO V3 - FRAMER MOTION TOKENS & SYSTEM CONFIGURATION
 * Strict motion constraints: transform & opacity only, restrained easing,
 * zero layout thrashing, prefers-reduced-motion compliance.
 */

export const TRANSITION_EASING = {
  // Editorial curve: quick rise, elegant decelerated settle
  editorial: [0.22, 1, 0.36, 1] as const,
  // Mechanical/technical snap for UI controls
  technical: [0.16, 1, 0.3, 1] as const,
  // Smooth linear for data packet traces
  linear: [0, 0, 1, 1] as const
};

export const MOTION_DURATIONS = {
  instant: 0.15,
  fast: 0.25,
  standard: 0.45,
  editorial: 0.7,
  slow: 1.1
} as const;

export const STAGGER_DELAYS = {
  tight: 0.04,
  standard: 0.08,
  spacious: 0.14
} as const;

export const VIEWPORT_CONFIG = {
  once: true,
  margin: '-60px'
} as const;

