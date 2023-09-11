/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      "main": ["Space Grotesk"],
    },
    extend: {
      colors:{
        'sand': '#FCF7E6',
      },
    },
  },
  plugins: [],
}

