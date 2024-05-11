import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
        'custom': '#3c4858',
      },
    },
  },
  plugins: [],
};
export default config;
