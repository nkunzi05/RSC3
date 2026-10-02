import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F5F2ED",
        sand: "#E6DFD3",
        stone: { DEFAULT: "#B8AD9E", dark: "#6E655A" },
        charcoal: "#1F1F1F",
        accent: { DEFAULT: "#A8674A", dark: "#8A523A" }, // terracotta — swap to #6B7F8E for dusty blue
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
      },
      letterSpacing: { widest2: "0.25em" },
      transitionTimingFunction: { soft: "cubic-bezier(0.22, 1, 0.36, 1)" },
    },
  },
  plugins: [],
};
export default config;
