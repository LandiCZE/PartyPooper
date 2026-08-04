/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Rubik Mono One"', 'system-ui', 'sans-serif'],
        body: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"VT323"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: '#0a0028',
        panel: '#180040',
        panel2: '#22005c',
        muted: '#a196c9',
        neon: {
          magenta: '#ff2d95',
          cyan: '#00e5ff',
          lime: '#d0ff00',
          purple: '#8b5cff',
          orange: '#ff8a00',
        },
      },
      boxShadow: {
        arcade: '5px 5px 0 0 #ff2d95, 10px 10px 0 0 #00e5ff',
        'arcade-sm': '3px 3px 0 0 #ff2d95',
        'arcade-cyan': '4px 4px 0 0 #00e5ff',
        'arcade-magenta': '4px 4px 0 0 #ff2d95',
        'arcade-lime': '4px 4px 0 0 #d0ff00',
        'arcade-white': '4px 4px 0 0 rgba(255,255,255,0.6)',
      },
      keyframes: {
        cardIn: {
          '0%': { opacity: '0', transform: 'translate(-4px, 8px)' },
          '100%': { opacity: '1', transform: 'translate(0, 0)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '48%': { opacity: '1' },
          '50%': { opacity: '0.72' },
          '52%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        cardIn: 'cardIn 200ms cubic-bezier(0.2, 0.9, 0.3, 1)',
        flicker: 'flicker 5s infinite',
        blink: 'blink 1.2s step-end infinite',
      },
    },
  },
  plugins: [],
}
