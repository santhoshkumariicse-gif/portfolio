/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#030806',
        'bg-secondary': '#07120D',
        surface: '#0A1710',
        'surface-subtle': '#0F2117',
        raised: '#142B1F',
        'primary-text': '#E7F5EC',
        'secondary-text': '#91A99A',
        muted: '#536B5E',
        'primary-green': '#00E676',
        'holographic-green': '#39FF88',
        'secondary-green': '#00BFA5',
        'muted-green': '#75B798',
        accent: '#00E676',
        'accent-dim': 'rgba(0, 230, 118, 0.12)',
        'accent-glow': 'rgba(57, 255, 136, 0.35)',
        border: 'rgba(0, 230, 118, 0.16)',
        'border-strong': 'rgba(57, 255, 136, 0.32)',
        'active-border': 'rgba(0, 230, 118, 0.75)',
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

