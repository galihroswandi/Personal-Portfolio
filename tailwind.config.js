/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'future-mono': ['future-mono', 'sans-serif'],
        'fraunces-regular': ['fraunces-114pt-regular', 'sans-serif'],
        'fraunces-light': ['fraunces-114pt-light', 'sans-serif'],
        'fraunces-supersoft-light': ['fraunces-114pt-supersoft-light', 'sans-serif']
      }
    }
  },
  plugins: [],
}
