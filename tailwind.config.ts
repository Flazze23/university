import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0a0a0b',
          800: '#111114',
          700: '#1a1a1f',
          600: '#22222a',
          500: '#2d2d36',
          400: '#3a3a45'
        },
        line: {
          DEFAULT: '#26262d',
          strong: '#33333c'
        },
        fog: {
          DEFAULT: '#8a8a93',
          soft: '#b5b5bd'
        },
        accent: {
          DEFAULT: '#ff3d00',
          hover: '#ff5722',
          glow: '#ff6a3d'
        },
        gold: '#ffb800',
        success: '#22c55e',
        danger: '#ef4444'
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      letterSpacing: {
        'mega': '0.18em'
      },
      boxShadow: {
        'accent-glow': '0 0 0 1px rgba(255,61,0,.35), 0 8px 30px -8px rgba(255,61,0,.45)',
        'card': '0 1px 0 0 rgba(255,255,255,.04) inset, 0 20px 40px -20px rgba(0,0,0,.6)'
      },
      backgroundImage: {
        'grid-noise':
          'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
        'hero-gradient':
          'radial-gradient(ellipse at top, rgba(255,61,0,0.15), transparent 50%), radial-gradient(ellipse at bottom right, rgba(255,184,0,0.08), transparent 50%)'
      },
      animation: {
        'fade-up': 'fadeUp .6s cubic-bezier(.2,.7,.2,1) both',
        'shimmer': 'shimmer 2.2s linear infinite',
        'marquee': 'marquee 30s linear infinite'
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      }
    }
  }
}
