import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs basées sur le logo Nathafty
        primary: {
          DEFAULT: '#1e40af', // Bleu principal
          light: '#3b82f6',
          dark: '#1e3a8a',
        },
        secondary: {
          DEFAULT: '#f59e0b', // Orange/Jaune
          light: '#fbbf24',
          dark: '#d97706',
        },
        accent: {
          DEFAULT: '#10b981', // Vert
          light: '#34d399',
          dark: '#059669',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
