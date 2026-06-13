import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:      "#0b0d0c",
        surface: "#131614",
        card:    "#171a18",
        border:  "#1e2120",
        border2: "#252927",
        ink:     "#d4cfc6",
        muted:   "#505549",
        dim:     "#3a3d38",
        green:   "#4a9d5b",
        green2:  "#3d8a4d",
        amber:   "#c4862d",
        rose:    "#c45a4d",
        teal:    "#3d8a7a",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        mono:    ['"Geist Mono"', "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
