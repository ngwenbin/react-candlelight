/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/renderer/index.html", "./src/renderer/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { main: "#DD6C3C", light: "#F7D7CA", dark: "#111" },
        gray: {
          1: "#EEEEF0",
          2: "#B2B3BD",
          3: "#797B86",
          4: "#6C6E79",
          5: "#5F606A",
          6: "#46484F",
          7: "#393A40"
        }
      }
    }
  },
  plugins: []
}
