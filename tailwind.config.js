/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 60% Ice Grey & Light Surfaces (Dominant Background Edition)
        bg: '#DCE2E8',
        'bg-secondary': '#C9D0D8',
        surface: '#F2F4F7',
        'surface-subtle': '#DCE2E8',
        raised: '#F2F4F7',

        // 30% Obsidian & Carbon Black (High Contrast Typography & Feature Panels)
        'primary-text': '#090B0E',
        'secondary-text': '#171B20',
        obsidian: '#090B0E',
        carbon: '#171B20',
        steel: '#87919D',
        muted: '#626C78',
        'muted-dark': '#87919D',

        // 10% Controlled Motorsport Accent - Racing Red
        accent: '#E10620',
        'accent-signal': '#FF3548',
        'accent-deep': '#A9081A',
        'accent-dim': 'rgba(225, 6, 32, 0.08)',
        'accent-glow': 'rgba(225, 6, 32, 0.25)',

        // Light Automotive Engineering Borders
        border: 'rgba(9, 11, 14, 0.12)',
        'border-strong': 'rgba(9, 11, 14, 0.22)',
        'active-border': 'rgba(225, 6, 32, 0.85)',

        // Explicit Design System Tokens
        'ice-primary': '#DCE2E8',
        'ice-secondary': '#C9D0D8',
        'surface-light': '#F2F4F7',
        'racing-red': '#E10620',
        'signal-red': '#FF3548',
        'deep-red': '#A9081A',
        'telemetry-red': '#E10620',
        'telemetry-signal': '#FF3548',
        'telemetry-ice': '#C9D0D8',
        'telemetry-steel': '#87919D',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', '"Times New Roman"', 'serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
