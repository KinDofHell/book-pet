import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "light-primary": "#0c5db1",
        "dark-primary": "#24315c",
      },
      backgroundImage: {
        "light-gradient":
          "linear-gradient(-90deg, rgba(3,26,84,1) 0%, rgba(18,35,142,1) 36%, rgba(0,219,255,1) 100%)",
        "dark-gradient":
          "linear-gradient(-90deg, rgba(1,3,9,1) 0%, rgba(30,32,46,1) 41%, rgba(110,118,120,1) 100%)",
      },
      screens: {
        tablet: "640px",
        desktop: "1200px",
      },
      boxShadow: {
        default: "0 1px 1px black",
      },
    },
  },
  plugins: [],
};
export default config;
