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
        "spin-slow": {
          "0%": { transform: "translateY (0px)" },
          "50%": { transform: "translateY(100px)" },
          "100%": { transform: "translateX(0px)" },
        },
      },
      animation: {
        "trans-bottom": "trans-bottom 5s ease-in-out infinite",
        "trans-top": "trans-bottom 2.5s ease-in-out infinite",
        "spin-slowest": "spin 360s linear infinite",
        "spin-slowest1": "spin 20s linear infinite",

        "spin-slowest2": "spin 15s linear infinite",

        "spin-slow": "spin-slow 30s linear infinite",
      },
    },
  },
  plugins: [],
};
