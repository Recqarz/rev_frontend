/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /** */
        primary_dark: "#073c4e",
        primary_light: "#51677E",

        /** */
        secondary_dark: "#b97f18",
        secondary_light: "#f1ce91",

        /** */
        accent_dark: "#ff0000",
        accent_light: "#ff8989",
      },
    },
  },
  plugins: [],
};
