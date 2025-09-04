/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.pug',
    './public/client/**/*.js',
    './public/client/**/*.html'
  ],
  safelist: [
    'bg-[#F7C32E]',
    'bg-[#F7C32E]/10',
    'text-[#F7C32E]',
    'border-[#F7C32E]',
    'text-[#066AC9]',
    'border-[#066AC9]',
    'bg-[#6F42C1]',
    'bg-[#066AC9]',
    'bg-[#066AC9]/10',
    'bg-[#0CBC87]',
    'bg-[#fd7e14]'
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        heebo: ['Heebo', 'sans-serif'],
      },
      boxShadow: {
        custom: "0 0 40px #1d3a5326",
      },
    },
  },
  plugins: [],
}
