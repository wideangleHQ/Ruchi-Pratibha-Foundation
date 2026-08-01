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
      },
    },
  },
  plugins: [],
};

export default config;
