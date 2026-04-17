import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Keeping only the brand color for now
        "brand-50": "#eff6ff",
        "brand-100": "#dbeafe",
        "brand-200": "#bfdbfe",
        "brand-300": "#93c5fd",
        "brand-400": "#60a5fa",
        "brand-500": "#3b82f6",
        "brand-600": "#2563eb",
        "brand-700": "#1d4ed8",
        "brand-800": "#1e40af",
        "brand-900": "#1e3a8a",
      },
      fontFamily: {
        "headline": ["Space Grotesk", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"]
      },
      boxShadow: {
        'neon-glow': '0 0 15px rgba(109, 221, 255, 0.1)',
        'neon-glow-hover': '0 0 25px rgba(109, 221, 255, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;

