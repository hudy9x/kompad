module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  mode: "jit",
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
