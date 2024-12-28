/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'handmade': ['Handmade Apple', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

