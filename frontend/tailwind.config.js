/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paddy: "#143116",
        cream: "#FFFDD0",
        harvest: "#F0E68C",
        aqua: "#14F9D5",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
