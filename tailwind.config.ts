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
        // Bleu — couleur de marque principale (logo Nathafty). 500 = valeur historique inchangée.
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#3b82f6',
          500: '#1e40af',
          600: '#1e3a8a',
          700: '#172554',
          900: '#0f172a',
          DEFAULT: '#1e40af',
        },
        // Vert — touche secondaire (anciennement "accent"). Mêmes valeurs, juste renommé.
        secondary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          900: '#064e3b',
          DEFAULT: '#10b981',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
