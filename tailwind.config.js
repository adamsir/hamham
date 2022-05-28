const plugin = require('tailwindcss/plugin')

module.exports = {

  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.overflow-overlay': {
          'overflow': 'overlay',
        },
      })
    })
  ],
}
