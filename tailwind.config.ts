import { rem } from "@mantine/core";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },
        blue: {
          50: "",
          100: "#E0F2FE",
          200: "",
          300: "",
          400: "",
          500: "#5D9EFF",
          600: "",
          700: "#1B5FF4",
          800: "",
          900: "",
        },
        gray: {
          50: "#F8F9FA",
          100: "",
          200: "",
          300: "#DEE2E6",
          400: "",
          500: "#adb5bd",
          600: "#868e96",
          700: "",
          800: "",
          900: "#212529",
        },
      },
      screens: {
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        md: { max: "767px" },
        sm: { max: "639px" },
      },
      borderRadius: {
        sm: rem(8),
        lg: rem(16),
      },
      fontSize: {
        md: rem(16),
        h3: rem(24),
      },
      lineHeight: {
        md: rem(24),
        h3: rem(32),
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(90deg, #C937F3 0%, #4F66FF 61.36%, #1EFBF2 122.73%)",
      },
      fontWeight: {
        thin: "100",
        hairline: "100",
        extralight: "200",
        light: "300",
        normal: "480",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        "extra-bold": "800",
        black: "900",
      },
    },
  },
  plugins: [],
} satisfies Config;
