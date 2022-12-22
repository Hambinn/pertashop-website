/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#065666",
        secondary: "#10E0E0",
      },
    },
  },
  plugins: [],
};
