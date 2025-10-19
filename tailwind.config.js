import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de colores ELAS
        'elas-navy': '#041e49',        // Para títulos
        'elas-blue': '#9cc5f2',        // Para botones
        'elas-light': '#e8f4fd',       // Tonos claros
        'elas-dark': '#032440',        // Variante más oscura
        
        // Sistema de colores original (mantener para compatibilidad)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#041e49",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#9cc5f2",
          foreground: "#041e49",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#9cc5f2",
          foreground: "#041e49",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        // Fuentes para títulos
        'heading': ['Caprasimo', 'cursive'],
        'caprasimo': ['Caprasimo', 'cursive'],
        
        // Fuentes para párrafos/texto
        'body': ['Questrial', 'sans-serif'],
        'questrial': ['Questrial', 'sans-serif'],
        
        // Fuentes originales (mantener para compatibilidad)
        verdana: ["Verdana", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      fontSize: {
        xs: "11px",
      },
    },
  },
  plugins: [forms, typography, animate],
};