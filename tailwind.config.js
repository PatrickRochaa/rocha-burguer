/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        home: "url('/assets/bg.png')",
      },
      animation: {
        fade: "fade 1s ease-in-out",
      },
      keyframes: {
        fade: {
          "0%": { transform: "translate3d(-30px, 0, 0)" },
          "100%": { transform: "translate3d(0px, 0, 0)" },
        },
      },
    },
  },
  plugins: [],
};
