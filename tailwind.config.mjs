/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Public Sans', 'sans-serif'],
        sans: ['Public Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: "#135bec",
        "primary-dark": "#0e45b5",
        "background-light": "#f6f6f8",
        "background-dark": "#101622",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
    },
  },
  plugins: [],
}
