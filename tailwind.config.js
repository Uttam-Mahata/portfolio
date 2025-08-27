/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        dark: {
          bg: '#0f172a',
          card: '#1e293b',
          border: '#334155',
          text: '#e2e8f0',
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'glow-pulse': 'glowPulse 2s infinite',
        'border-glow': 'borderGlow 3s infinite alternate',
        'flow-glow': 'flowGlow 8s infinite linear',
        'shimmer': 'shimmer 3s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 8px 2px rgba(14, 165, 233, 0.3)' },
          '50%': { boxShadow: '0 0 16px 4px rgba(14, 165, 233, 0.6)' },
        },
        borderGlow: {
          '0%': { borderColor: 'rgba(14, 165, 233, 0.5)', boxShadow: '0 0 5px 1px rgba(14, 165, 233, 0.2)' },
          '100%': { borderColor: 'rgba(56, 189, 248, 0.8)', boxShadow: '0 0 12px 4px rgba(56, 189, 248, 0.4)' }
        },
        flowGlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        }
      },
      boxShadow: {
        'glow-sm': '0 0 8px 0 rgba(14, 165, 233, 0.25)',
        'glow-md': '0 0 12px 0 rgba(14, 165, 233, 0.3)',
        'glow-lg': '0 0 20px 0 rgba(14, 165, 233, 0.35)',
        'glow-inner': 'inset 0 0 12px 0 rgba(14, 165, 233, 0.3)',
        'glow-dark-sm': '0 0 8px 0 rgba(56, 189, 248, 0.25)',
        'glow-dark-md': '0 0 12px 0 rgba(56, 189, 248, 0.3)',
        'glow-dark-lg': '0 0 20px 0 rgba(56, 189, 248, 0.35)',
      },
    },
  },
  plugins: [],
}