/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FEFFED",
        secondary: "#BE9B7B",
        background: "#41111F",
        accent: "#854442",
      },
      backgroundImage: {
        "gradient-to-b-transparent-white":
          "linear-gradient(to bottom, transparent, #FFFFFF)",
      },
      fontFamily: {
        courgette: ["Courgette", "sans-serif"],
        jost: ["Jost", "sans-serif"],
      },

    },
  },
  plugins: [],
};
