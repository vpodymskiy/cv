/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bg5: "url('/public/images/bg5.jpg')",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        serif: ["Merriweather", ...defaultTheme.fontFamily.serif],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        "main-blue": "#272333",
        "main-containers": "#302C40",
        "hover-blue": "#0d86ff",
        "hover-yellow": "#fff350",
      },
    },
  },
  plugins: [],
};
