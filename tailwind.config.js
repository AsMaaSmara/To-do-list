/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "oklch(81% 0.117 11.638)",
          foreground: "oklch(13% 0.028 261.692)",
        },
        secondary: {
          DEFAULT: "oklch(13% 0.028 261.692)",
          foreground: "oklch(81% 0.117 11.638)",
        },
    },
  },
  plugins: [],
};
