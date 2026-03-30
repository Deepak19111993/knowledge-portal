/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/server/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF6EF",
        surface: "#FFF9F0",
        foreground: "#1A0A05",
        primary: {
          DEFAULT: "#6B1E14",
          light: "#8A2D20",
        },
        secondary: "#E8A020",
        tertiary: "#2D6A4F",
        accent: "#1B7A7A",
        industry: "#2C2C6B",
        muted: {
          DEFAULT: "#C4A882",
          foreground: "#5C4A3A",
        },
        gradient: {
          start: "#6B1E14",
          mid: "#E8A020",
          end: "#2D6A4F",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        serif: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
