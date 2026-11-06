/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0B09',
        surface: '#131512',
        'surface-subtle': '#171A16',
        raised: '#1D211C',
        'primary-text': '#F0F0E9',
        'secondary-text': '#9BA195',
        muted: '#585F53',
        accent: '#C7FF45',
        'accent-dim': 'rgba(199,255,69,0.12)',
        'accent-glow': 'rgba(199,255,69,0.28)',
        border: 'rgba(240,240,233,0.11)',
        'border-strong': 'rgba(240,240,233,0.22)',
        'active-border': 'rgba(199,255,69,0.65)',
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

