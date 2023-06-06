/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.js",
    "./src/**/*.ts",
    "./src/**/*.jsx",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      screens: {
        md: "602px",
        xl: "1350px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        red: "#f5222d",
        lightGreen: "#389E0D",
        green: {
          500: "var(--green-primary)",
          450: "#398A82",
          400: "#648C88",
          350: "#0D9488",
          300: "#5eead4",
          250: "#95B6B3",
          200: "#BEE1DE",
          150: "#CEE5E3",
          100: "#f0fdfa",
        },
        blue: "#005ABC",
        grey: {
          25: "#FAFAFA",
          50: "#f5f5f5",
          100: "#bbb6b6",
          150: "d9d9d9",
          200: "#d9e2e1",
          250: "#a7aaad",
          300: "#596766",
        },
        black: {
          200: "#4e5857",
          300: "#2d2d2d",
        },
        inactive: "#ABADC6",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  // variants: {
  //   scrollbar: ["rounded"],
  // },
};
