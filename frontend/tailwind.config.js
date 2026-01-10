/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#46ec13",
        "background-dark": "#131811",
        "background-light": "#f8f9f8",
      },
      fontFamily: {
        display: ["Manrope", "Noto Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
