import type { Config } from "tailwindcss";
import { colors } from "./config/tailwind/colors";
import { fontWeight } from "./config/tailwind/fontWeight";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: colors,
      screens: {
        xs: "480px",
      },
      fontWeight: fontWeight,
    },
  },
  plugins: [],
} satisfies Config;
