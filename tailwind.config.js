/* eslint-disable global-require */
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./forms/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      borderWidth: ["responsive", "hover"],
    },
  },
  plugins: [
    require("tailwind-heropatterns")({
      variants: [],
      patterns: ["endless-clouds"],
      colors: {
        default: "#000",
      },
      opacity: {
        default: "0.1",
      },
    }),
  ],
};
