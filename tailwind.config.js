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
        navy: {
          DEFAULT: '#1D3045',
          900: '#1D3045',
          950: '#0f1c29',
        },
      },
      fontFamily: {
        sans: ['"Helvetica Neue ME"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      transitionTimingFunction: {
        'cinema': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'modal': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    },
  },
  plugins: [],
}
