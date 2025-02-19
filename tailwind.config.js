/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700', // Or any other gold shade you prefer
      },},
  },
  plugins: [
    require('daisyui'),
  ],
}

