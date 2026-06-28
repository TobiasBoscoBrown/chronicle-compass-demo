import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        parchment: "#F5EEDF",
        navy: "#0C2340",
        brass: "#B0884F",
        sea: "#1C4E6B",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      letterSpacing: { widest2: "0.3em" },
    },
  },
  plugins: [],
};
export default config;
