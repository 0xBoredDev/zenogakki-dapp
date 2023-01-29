const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: [
    "./src/views/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purple: "#3F0D40",
        pink: "#8C0375",
        black: "#000000",
        white: "#F1F0F2",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
