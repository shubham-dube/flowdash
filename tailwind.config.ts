import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.625rem',
        'xxxs': '0.312rem',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "grad-image": "url('/gradient_background.avif')",
      },
      fontFamily: {
        'great-vibes': ['Great Vibes', 'cursive'],
        'poppins': ['Poppins', 'sans-serif'],
      }
    },
  },
  darkMode: 'class',
  plugins: [],
} satisfies Config;
