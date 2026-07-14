/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#16233F",
        inksoft: "#2A3B5C",
        paper: "#FAF8F3",
        amber: "#F2A93B",
        amberdark: "#C97F1E",
        okgreen: "#2F9E68",
        coral: "#D65A4A",
        line: "#D9D4C7",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
}
