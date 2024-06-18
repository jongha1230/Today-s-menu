/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'theme-color': '#E0E2EF',
        'sub-color': '#F2E0E0',
        'default-color': '#EDEDED'
      }
    }
  },
  plugins: []
};
