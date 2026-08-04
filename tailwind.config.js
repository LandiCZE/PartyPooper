/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        ink: '#0b0b12',
        panel: '#151522',
        muted: '#8b8ba3',
        accent: '#ff5c8a',
      },
      boxShadow: {
        card: '0 20px 40px -20px rgba(0,0,0,0.6), 0 8px 20px -8px rgba(255,92,138,0.15)',
      },
      keyframes: {
        cardIn: {
          '0%': { opacity: '0', transform: 'translateY(12px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        pop: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        cardIn: 'cardIn 260ms ease-out',
        pop: 'pop 160ms ease-out',
      },
    },
  },
  plugins: [],
}
