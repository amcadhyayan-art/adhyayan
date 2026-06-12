/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f172a', // Slate-900 for clean dark text/elements
        },
        secondary: {
          DEFAULT: '#f8fafc', // Slate-50 for neat light backgrounds
        },
        accent: {
          DEFAULT: '#0284c7', // Sky-600 for medical blue
          light: '#e0f2fe', // Sky-100
        },
        gray: {
          light: '#e2e8f0', // Slate-200
          DEFAULT: '#64748b', // Slate-500
          dark: '#334155', // Slate-700
        },
        dark: {
          bg: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
        },
        success: {
          DEFAULT: '#10B981', // Green
        },
        warning: {
          DEFAULT: '#FBBF24', // Yellow
        },
        error: {
          DEFAULT: '#EF4444', // Red
        }
      },
      fontFamily: {
        montserrat: ['Outfit', 'Montserrat', 'sans-serif'],
        opensans: ['Plus Jakarta Sans', 'Open Sans', 'sans-serif'],
        playfair: ['Outfit', 'Playfair Display', 'serif'],
        outfit: ['Outfit', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'neon-cyan': '0 0 15px rgba(6, 182, 212, 0.35)',
        'neon-pink': '0 0 15px rgba(236, 72, 153, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
    },
  },
  plugins: [],
};