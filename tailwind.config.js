/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
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
      },
      keyframes: {
        fall: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        glow: {
          '0%': {
            boxShadow: '0 0 10px rgba(255, 165, 0, 0.5), 0 0 20px rgba(255, 165, 0, 0.4), 0 0 30px rgba(255, 165, 0, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(255, 165, 0, 0.8), 0 0 30px rgba(255, 165, 0, 0.6), 0 0 40px rgba(255, 165, 0, 0.4)',
          },
          '100%': {
            boxShadow: '0 0 10px rgba(255, 165, 0, 0.5), 0 0 20px rgba(255, 165, 0, 0.4), 0 0 30px rgba(255, 165, 0, 0.3)',
          },
        }

      },
      animation: {
        fall: 'fall 5s linear infinite',
        glow: 'glow 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
