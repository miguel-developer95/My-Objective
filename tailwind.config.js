/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1D3045',
      },
      fontFamily: {
        sans: ['"Helvetica Neue ME"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      transitionTimingFunction: {
        'nav-ease': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'modal-ease': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    },
  },
  plugins: [],
}
