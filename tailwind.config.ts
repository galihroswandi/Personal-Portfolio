import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#03A0D9",
        "primary-green": "#5FA04E",
        "primary-dark": "#00080B",
      },
      boxShadow: {
        "inner-shadow":
          "0 8px 8px 0 #017FAD inset, 0 5px 5px 0 #017FAD, 0 -5px 16px rgba(203, 213, 225, 25%)",
      },
    },
    screens: {
      400: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  darkMode: "selector",
  plugins: [],
};
export default config;
