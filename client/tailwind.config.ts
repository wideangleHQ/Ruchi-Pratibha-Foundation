import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        manrope: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        space: ['var(--font-space-grotesk)', 'monospace', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        poppins: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        hatalekha: ['var(--font-hatalekha)', 'cursive', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        institutional: {
          dark: '#0B0F17',
          darker: '#06080D',
          surface: '#121824',
          light: '#F8F6F0',
          cream: '#FFFDF9',
          accent: '#C5A059',
          accentHover: '#D4AF37',
          muted: '#8A94A6',
          mutedLight: '#5A6270',
          borderDark: 'rgba(255, 255, 255, 0.1)',
          borderLight: 'rgba(11, 15, 23, 0.1)',
        },
        damdaar: {
          freshGreen: '#4D6B1F',
          deepGreen: '#343D0F',
          gold: '#CF8A12',
          burntOrange: '#B1320A',
          warmOrange: '#D55E33',
        },
      },
    },
  },
  plugins: [],
};

export default config;
