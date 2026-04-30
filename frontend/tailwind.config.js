/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        manrope: ['var(--font-manrope)', 'sans-serif'],
      },
      colors: {
        brand: {
          green: '#4CAF50',
          'green-light': '#EAF3DE',
          'green-dark': '#2e7d32',
          orange: '#FF9800',
          'orange-light': 'rgba(255,152,0,0.12)',
          dark: '#212121',
        },
      },
      // extend keyframes for the live-pulse dot
      keyframes: {
        pulse_dot: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(0.85)' },
        },
      },
      animation: {
        pulse_dot: 'pulse_dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};