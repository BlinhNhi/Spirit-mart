/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      // fontSize:,
      colors: {
        primary: "#fea928",
        secondary: "#ed8900"
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem"
        }
      },
      backgroundColor: {
        'bg-blue': 'rgb(4, 21, 39)',
      }
    },
  },
  plugins: [],
}