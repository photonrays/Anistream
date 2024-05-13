import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary': '#552A92',
        'secondary': '#8F7003',
        'black': '#0e0e0e',
        'gray-light': '#666666',
        'gray': '#1C1C1C',
        'text-white': '#AAAAAA',
        'text-gray': '#515151',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      dark: {
        colors: {
          default: {
            DEFAULT: "#666666",
            foreground: "#AAAAAA",
            background: "#0e0e0e",
          },
          primary: {
            DEFAULT: "#5A2E98",
            foreground: "#AAAAAA",
            background: "#0e0e0e",
          },
          secondary: {
            DEFAULT: "#8F7003",
            foreground: "#AAAAAA",
            background: "#0e0e0e",
          },
          focus: "#5a2e98",
        },
        layout: {
          hoverOpacity: 1,
        },
      },
    },
  }),],
};
export default config;
