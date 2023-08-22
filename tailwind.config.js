/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      keyframes: {
        "trans-bottom": {
          "0%,100%": { transform: "translateY(50px)" },
          "50%": { transform: "translateY(0px)" },
        },
        "trans-top": {
          "0%,100%": { transform: "translateY(50px)" },
          "50%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        "trans-bottom": "trans-bottom 5s ease-in-out infinite",
        "trans-top": "trans-bottom 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
