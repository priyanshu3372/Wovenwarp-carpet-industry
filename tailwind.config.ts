import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0a0706',
          900: '#120d0a',
          800: '#1b1411',
          700: '#251a15',
        },
        clay: {
          50: '#f7efe6',
          100: '#ecdcc8',
          200: '#d9b896',
          300: '#c08e60',
          400: '#a96a3a',
          500: '#8b4f25',
          600: '#6e3d1c',
          700: '#532c14',
        },
        ember: {
          400: '#d96a2c',
          500: '#b8501c',
          600: '#923c12',
        },
        gold: {
          300: '#e6c789',
          400: '#cba85a',
          500: '#a4853f',
        },
        bone: '#efe6d8',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Cormorant Garamond', 'serif'],
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'editorial': '0.18em',
        'tightest': '-0.04em',
      },
      animation: {
        'grain': 'grain 8s steps(10) infinite',
        'float-slow': 'float 14s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-slow': 'pulse 6s ease-in-out infinite',
        'scroll-line': 'scrollLine 2.2s ease-in-out infinite',
      },
      keyframes: {
        grain: {
          '0%,100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-5%,-10%)' },
          '20%': { transform: 'translate(-15%,5%)' },
          '30%': { transform: 'translate(7%,-25%)' },
          '40%': { transform: 'translate(-5%,25%)' },
          '50%': { transform: 'translate(-15%,10%)' },
          '60%': { transform: 'translate(15%,0)' },
          '70%': { transform: 'translate(0,15%)' },
          '80%': { transform: 'translate(3%,35%)' },
          '90%': { transform: 'translate(-10%,10%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-12px) translateX(6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scrollLine: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
        'radial-warm': 'radial-gradient(ellipse at 30% 40%, rgba(217,106,44,0.18) 0%, transparent 55%)',
        'radial-vignette': 'radial-gradient(ellipse at center, transparent 35%, rgba(10,7,6,0.7) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
