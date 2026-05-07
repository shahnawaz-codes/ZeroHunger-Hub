/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        display: ["Bricolage Grotesque", "system-ui", "sans-serif"],
      },
      colors: {
        // Primary — brand green (navbar, logo, tags, badges)
        "brand-green": {
          50: "#f1f8e9",
          100: "#dcedc8",
          200: "#c5e1a5",
          500: "#4CAF50",
          600: "#43A047",
          700: "#388E3C",
        },

        // CTA — orange (buttons that trigger actions ONLY)
        "brand-orange": {
          50: "#fff3e0",
          100: "#ffe0b2",
          500: "#FF9800",
          600: "#FB8C00",
          700: "#F57C00",
        },

        // Secondary / Neutral — text, borders, inactive states
        neutral: {
          50: "#F9FAFB", // page background light
          100: "#F5F0E8", // warm off-white surfaces
          200: "#E5E7EB", // borders, dividers
          400: "#9CA3AF", // placeholder text
          500: "#6B7280", // secondary text
          700: "#374151", // primary text light mode
          900: "#111827", // headings
        },

        // Surface
        surface: {
          light: "#FFFFFF",
          page: "#F9FAFB",
          dark: "#212121",
          "dark-elevated": "#2C2C2C", // cards on dark bg
        },

        // Semantic
        feedback: {
          success: "#2E7D32", // distinct from brand-green — confirmations
          error: "#DC2626",
          warning: "#D97706",
          info: "#0284C7",
        },
      },
    },
  },
  plugins: [],
};
