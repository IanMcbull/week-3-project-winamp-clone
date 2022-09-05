/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily:{
        'techMono':'Share Tech Mono'
      },
      colors: {
        'gray':'#5a616e',
        'blackBg':'#030202',
        'hr-color':'#000101',
        'skyBlue':'#a7c8d5',
        'silverBtns':'#eeeeee',
        'grey':'#5c5d5c',
        'greyDark':'#515150'
        
      }
    },
  },
  plugins: [],
}
