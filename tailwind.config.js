/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Manrope', 'sans-serif'],
        secondary: ['"Share Tech Mono"', 'monospace'],
      },
      colors: {
        primary: '#f5f5f5',
        secondary: '#e8e6e6bf',
      },
    },
  },
  plugins: [],
};
