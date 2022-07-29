/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#005eff",
          second: "#004ac7",
          mid: "#5e9aff",
          dark: "#131a26",
          light: "#dce4f2",
        },
      },
      boxShadow: {
        small: "0 0 2px 0 rgba(0, 0, 0, 0.05)",
        normal: "0 0 3px 0 rgba(0, 0, 0, 0.1), 0 0 2px -1px rgba(0, 0, 0, 0.1)",
        medium: "0 0 6px -1px rgba(0, 0, 0, 0.1), 0 0 4px -2px rgba(0, 0, 0, 0.1)",
        large: "0 0 15px -3px rgba(0, 0, 0, 0.1), 0 0 6px -4px rgba(0, 0, 0, 0.1)",
        xlarge: "0 0 25px -5px rgba(0, 0, 0, 0.1), 0 0 10px -6px rgba(0, 0, 0, 0.1)",
        "2xlarge": "0 0 50px -12px rgba(0, 0, 0, 0.25)",
        "3xlarge": "0 0 75px -25px rgba(0, 0, 0, 0.40)",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
};
