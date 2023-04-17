module.exports = {
  purge: ["./node_modules/flowbite-react/**/*.js", './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
      require("flowbite/plugin")
  ],
}
