/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#f1f5e9",
          100: "#e8f5e9",
          200: "#c8e6c9",
          300: "#a5d6a7",
          400: "#81c784",
          500: "#66bb6a",
          600: "#4CAF50", // Main green
          700: "#43a047",
          800: "#388e3c",
          900: "#2e7d32",
        },
        accent: {
          50: "#fff3e0",
          100: "#ffe0b2",
          200: "#ffd54f",
          300: "#ffb74d",
          400: "#ffa726",
          500: "#ff9800", // Brand orange
          600: "#f57c00",
          700: "#e65100",
        },
        neutral: {
          white: "#ffffff",
          light: "#f5f5f5",
          dark: "#212121",
        },
      },
    },
  },
  plugins: [],
};
