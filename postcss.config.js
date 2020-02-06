
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    require('tailwindcss')('./tailwind.js'),
    require('postcss-import'),
    require('postcss-custom-properties'),
    require('postcss-color-function'),
    require('autoprefixer')
  ],
  theme: {
    screens: {
      xl: '1040px',
    }
	}
};