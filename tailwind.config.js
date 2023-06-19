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
        'roboto-slab': ['roboto-slab', 'sans-serif'],
        'fraunces-regular': ['fraunces-114pt-regular', 'sans-serif'],
        'fraunces-light': ['fraunces-114pt-light', 'sans-serif'],
        'fraunces-supersoft-light': ['fraunces-114pt-supersoft-light', 'sans-serif'],
        'fraunces-72pt-regular': ['fraunces-72pt-regular', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
