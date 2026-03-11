import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            DEFAULT: '#142f2a',
            50: '#e8f0ef',
            100: '#c5dad7',
            200: '#9ec3bd',
            300: '#77aba3',
            400: '#599990',
            500: '#3b877d',
            600: '#2f7068',
            700: '#235853',
            800: '#1a423e',
            900: '#142f2a',
            950: '#0a1815',
          },
          gold: {
            DEFAULT: '#ba8d32',
            50: '#fdf8ed',
            100: '#f9ecd0',
            200: '#f3d89e',
            300: '#ecc06a',
            400: '#e5a840',
            500: '#ba8d32',
            600: '#9a7228',
            700: '#7a5820',
            800: '#5e4419',
            900: '#473315',
            950: '#2a1e0c',
          },
          white: '#f7f7f7',
          dark: '#0a1815',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
