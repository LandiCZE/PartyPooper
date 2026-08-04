/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        stamp: ['"Special Elite"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Paper tones
        paper: '#ece2cb',
        card: '#f6ecd6',
        cardLight: '#faf3e3',
        // Ink tones
        ink: '#1c1613',
        inkMuted: '#6b5c4b',
        inkSoft: '#8a7b69',
        // Stamp colors (muted, like real rubber stamps)
        stamp: {
          red: '#a83223',
          burgundy: '#7a2a2a',
          navy: '#26445c',
          forest: '#3a5a3a',
          olive: '#6a6a2a',
          plum: '#5a2a52',
          rust: '#a05a2a',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(28,22,19,0.08), 0 8px 24px -12px rgba(28,22,19,0.25)',
        cardHover: '0 2px 4px rgba(28,22,19,0.08), 0 14px 32px -14px rgba(28,22,19,0.30)',
        deck: '0 1px 0 rgba(28,22,19,0.15), 0 2px 0 -1px #d9cfb8, 0 3px 0 -1px rgba(28,22,19,0.10), 0 4px 0 -2px #d9cfb8, 0 5px 0 -2px rgba(28,22,19,0.08)',
      },
      keyframes: {
        cardIn: {
          '0%': { opacity: '0', transform: 'translateY(8px) rotate(-0.4deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotate(0)' },
        },
      },
      animation: {
        cardIn: 'cardIn 260ms cubic-bezier(0.2, 0.9, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
