const starlightPlugin = require("@astrojs/starlight-tailwind");

// Generated color palettes
const accent = {
  200: "#76b6ef",
  600: "#0072ad",
  900: "#003655",
  950: "#004e61",
};
const gray = {
  100: "#feeeee",
  200: "#f9dcd1",
  300: "#e7cfca",
  400: "#d2c3c3",
  500: "#47494e",
  700: "#3a3e47",
  800: "#1e222a",
  900: "#1a1d23",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: { accent, gray },
    },
  },
  plugins: [starlightPlugin()],
};
