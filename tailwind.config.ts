import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:      "#0f1110",
        surface: "#1a1c1b",
        border:  "#2a2d2b",
        ink:     "#e8e2d5",
        muted:   "#6b6b5b",
        green:   "#4a9d5b",
        amber:   "#c4862d",
        rose:    "#c45a4d",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        mono:    ["Geist Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
