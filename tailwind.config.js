/** @type {import('tailwindcss').Config} */

const theme = import('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    ...theme.theme,
    backgroundColor: theme => ({
      ...theme('colors'),
      primary: '#00796B',
      "primary-dark": '#00594D',
      secondary: '#B2DFDB',
      tertiary: '#FFFFFF',
      accent: '#FFC107',
      additional: '#BDBDBD',
      default: '#757575',
      warning: '#E91E63',
      'warning-dark': '#C2185B'
    }),
    extend: {
      colors: {
        primary: '#00796B',
        secondary: '#B2DFDB',
        tertiary: '#FFFFFF',
        accent: '#FFC107',
        additional: '#BDBDBD',
        default: '#757575'
      },
      width: {
        'room-img': '45%',
      }
    }
  },
  plugins: [],
}