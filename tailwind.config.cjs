/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        discordgray: {
          900: "#202225",
          800: "#2f3136",
          700: "#36393f",
          600: "#474B52",
          400: "#d4d7dc",
          300: "#e3e5e8",
          200: "#ebedef",
          100: "#f2f3f5",
          50: "#EBEBEB",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
