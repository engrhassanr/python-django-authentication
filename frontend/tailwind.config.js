export default {
  darkMode: "class", // Ensures dark mode is only enabled when "dark" class is added
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    require.resolve("flowbite-react"),
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
