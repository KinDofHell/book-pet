import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "radial-gradient":
          "linear-gradient(to bottom, hsl(var(--blue)), hsl(var(--gray)), hsl(var(--red)))",
      },
      colors: {
        "main-dark": "hsl(var(--main-dark))",
        "main-light": "hsl(var(--main-light))",
      },
    },
  },
  plugins: [],
};
export default config;
