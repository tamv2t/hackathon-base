import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import borderRadiusConfig from "./base/borderRadius";
import colorConfig from "./base/color";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
    "../../packages/screens/src/**/*.{ts,tsx}",
    "../../packages/plugins/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontFamily: {},
    extend: {
      borderRadius: {
        ...borderRadiusConfig,
      },
      colors: {
        ...colorConfig,
      },
      gridTemplateColumns: {
        autoFill: "repeat(auto-fill, minmax(300px, 1fr))",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
