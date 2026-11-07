/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 60% Primary Surfaces - Obsidian & Carbon Black
        bg: '#090B0E',
        'bg-secondary': '#171B20',
        surface: '#171B20',
        'surface-subtle': '#20252C',
        raised: '#20252C',

        // 30% Typography & Secondary Neutrals - Ice Grey & Steel Grey
        'primary-text': '#F2F4F7',
        'secondary-text': '#C9D0D8',
        muted: '#87919D',
        'muted-dark': '#626C78',

        // 10% Controlled Motorsport Accent - Racing Red
        accent: '#E10620',
        'accent-signal': '#FF3548',
        'accent-deep': '#A9081A',
        'accent-dim': 'rgba(225, 6, 32, 0.12)',
        'accent-glow': 'rgba(225, 6, 32, 0.35)',

        // High-Precision Architectural Borders
        border: 'rgba(201, 208, 216, 0.12)',
        'border-strong': 'rgba(201, 208, 216, 0.24)',
        'active-border': 'rgba(225, 6, 32, 0.75)',

        // Motorsport Telemetry Specific Tokens
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
