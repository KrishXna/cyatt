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
        bottom: {
          "0%": { transform: "translateY(20px)" },
          "50%": { transform: "translateY(20px)" },
        },
        top: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
      animation: {
        "trans-bottom": "trans-bottom 5s ease-in-out infinite",
        "trans-top": "trans-bottom 2.5s ease-in-out infinite",
        "spin-slowest": "spin 160s linear infinite",
        bottom: "bottom 5s ease-in-out",
        top: "top 3s ease-in-out",
      },
    },
  },
  plugins: [],
};
