import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        patara_black: "#0C0C14",
        patara_black_50: "#282828",
        patara_black_100: "#444444",
        patara_dark_blue: "#001229",
        patara_blue: "#006EFF",
        patara_blue_50: "#CCE2FF",
        patara_blue_400: "#197CFF",
        patara_blue_500: "#4DA2FF",
        patara_blue_600: "#2775CA",
        patara_gray_50: "#F5F5F5",
        patara_gray_75: "#EBEBF5",
        patara_gray_100: "#DCDCE6",
        patara_gray_200: "#C8C8DC",
        patara_gray_300: "#B4B4BE",
        patara_gray_400: "#A0A0A8",
        patara_gray_500: "#8C8C8F",
        patara_gray_600: "#787882",
        patara_gray_700: "#404048",
        patara_gray_800: "#343330",
        patara_red: "#FF4D4D",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".absolute-center": {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      });
    }),
  ],
} satisfies Config;

export default config;
