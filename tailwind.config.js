module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './forms/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
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
}
