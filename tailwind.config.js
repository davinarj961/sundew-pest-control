/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: "#0B2B21",
          900: "#123A2C",
          700: "#1B4332",
          500: "#2D6A4F",
          300: "#74A98C",
        },
        cream: {
          DEFAULT: "#F7F5EF",
          dim: "#EFEBE0",
        },
        gold: {
          DEFAULT: "#C99A3D",
          soft: "#E4C889",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
}