// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Inter'],
      },
      colors: {
        primary: {
          500: '#f7e3e0',
        },
        // Wedding color palette
        'wedding-white': '#FAF9F6',
        'wedding-green': '#a3b18a',
        'wedding-pink': '#f0d7d1',
        'wedding-off-pink': '#f7edeb',
        'wedding-btn-pink': '#d6a59d',
        'wedding-gold': '#d4af37',
        'wedding-sage': '#9ca3af',
        'wedding-cream': '#fefefe',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'heartbeat': 'heartbeat 2s ease-in-out infinite',
        'timeline-grow': 'timelineGrow 2s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)',
            opacity: '0.3'
          },
          '50%': {
            transform: 'translateY(-20px) rotate(180deg)',
            opacity: '0.6'
          }
        },
        heartbeat: {
          '0%, 100%': {
            transform: 'scale(1)'
          },
          '50%': {
            transform: 'scale(1.1)'
          }
        },
        timelineGrow: {
          '0%': {
            height: '0'
          },
          '100%': {
            height: '100%'
          }
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'elegant-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
} satisfies Config
