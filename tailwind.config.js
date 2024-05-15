/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#42BBFF",
          800: "#0C3247",
          900: "#42BBFF/10",
        },
        black: {
          600: "#2E3757",
          700: "#1D2032",
          800: "#131625",
          900: "#10121E",
        },
        white: {
          100: "#FFFFFF",
          300: "#ADB3CC",
          500: "#55597D",
        },
        purple: {
          500: "#9542FF",
          900: "#9542FF/10",
        },
        green: {
          400: "#68D1BF",
          500: "#42FF77",
          900: "#42FF77/10",
        },
        gradient: {
          start: "#43B7FE",
          end: "#4F48E6",
        },
      },
      fontFamily: {
        iregular: ["Inter-Regular", "sans-serif"],
        imedium: ["Inter-Medium", "sans-serif"],
        ibold: ["Inter-Bold", "sans-serif"],
      },
    },
  },

  plugins: [],
};
