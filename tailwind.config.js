/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
console.log('theme - ssvc');

module.exports = {
  purge: {
    mode: 'layers',
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
  },
  theme: {
    extend: {
      maxHeight: {
        ...defaultTheme.maxHeight,
        80: '80vh',
        90: '90vh',
      },
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        ...defaultTheme.spacing,
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
      colors: {
        brand: {
          lighter: '#4e5576',
          DEFAULT: '#222222',
          darker: '#171f4a',
        },
        accent: {
          lighter: '#BB2B3F',
          DEFAULT: '#ab1c30',
          darker: '#861E2C',
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['odd'],
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
};
