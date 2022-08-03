/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    colors: {
      black: colors.black,
      blue: colors.blue,
      white: colors.white,
      gray: colors.neutral,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,

      primary: {
        100: "#feedcf",
        200: "#fedaa0",
        300: "#fdc870",
        400: "#fdb541",
        500: "#fca311",
        600: "#ca820e",
        700: "#97620a",
        800: "#654107",
        900: "#322103",
      },
      green: colors.green,
      //CUSTOM COLORS
      //https://www.tailwindshades.com/
      //or crtl g + ctrl k on hexa value (#007ce6)

      dark: {
        100: "#d1d2d4",
        200: "#a4a5a9",
        300: "#76777f",
        400: "#494a54",
        500: "#1b1d29",
        600: "#161721",
        700: "#101119",
        800: "#0b0c10",
        900: "#050608",
      },
    },
    fontFamily: {
      body: ["Montserrat"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
