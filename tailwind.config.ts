import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
const defaultTheme = require('tailwindcss/defaultTheme')


const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      'xs': '540px',
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "inner-2xl": "inset 0 25px 50px -12px rgb(0 0 0 / 0.25);"
      },
      colors: {
        'primary': 'rgba(var(--primary))',
        'primary-light': 'rgba(var(--primary-light))',
        'secondary': 'rgba(var(--secondary))',
        'card': 'rgba(var(--card))',
        'card-light': 'rgba(var(--card-light))',
        'background': 'rgba(var(--background))',
        'foreground': 'rgba(var(--foreground))',
        'foreground-dark': 'rgba(var(--foreground-dark))',
        'foreground-darker': 'rgba(var(--foreground-darker))',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      dark: {
        colors: {
          default: {
            // DEFAULT: "rgba(var(--card))",
            foreground: "rgba(var(--foreground))",
            // background: "rgba(var(--background))",
          },
          primary: {
            DEFAULT: "rgba(var(--primary))",
            foreground: "rgba(170, 170, 170)",
            background: "rgba(14, 14, 14)",
          },
          secondary: {
            DEFAULT: "rgba(var(--secondary))",
            foreground: "rgba(170, 170, 170)",
            background: "rgba(14, 14, 14)",
          },
          focus: "rgba(var(--primary-light))",
        },
        layout: {
          hoverOpacity: 1,
        },
      },
      light: {
        colors: {
          default: {
            // DEFAULT: "rgba(var(--card))",
            foreground: "rgba(var(--foreground))",
            // background: "rgba(var(--background))",
          },
          primary: {
            DEFAULT: "rgba(var(--primary))",
            foreground: "rgba(225, 225, 225)",
            background: "rgba(14, 14, 14)",
          },
          secondary: {
            DEFAULT: "rgba(var(--secondary))",
            foreground: "rgba(225, 225, 225)",
            background: "rgba(14, 14, 14)",
          },
          focus: "rgba(var(--primary-light))",
        },
        layout: {
          hoverOpacity: 1,
        },
      },
    },
  }),],
};
export default config;
