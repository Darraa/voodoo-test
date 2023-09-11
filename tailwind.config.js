/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
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

