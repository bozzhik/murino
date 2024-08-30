import type {Config} from 'tailwindcss'
const plugin = require('tailwindcss/plugin')
import {fontFamily} from 'tailwindcss/defaultTheme'

const config = {
  darkMode: ['class'],
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  prefix: '',
  theme: {
    screens: {
      xl: {max: '1536px'},
      lg: {max: '1024px'},
      sm: {max: '768px'},
      xs: {max: '350px'},
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-suisseintl)', ...fontFamily.sans],
      },
      fontWeight: {
        book: '450',
      },
      colors: {
        custom: {
          green: '#387A22',
          gray: '#454545',
          95: '#959595',
          e4: '#E4E4E4',
        },
      },
      borderRadius: {
        large: '35px',
        medium: '30px',
        small: '20px',
        smallest: '15px',
      },
      boxShadow: {
        btn: '0px 0px 5px rgba(0, 0, 0, 0.25)',
        base: '0px 0px 10px rgba(0, 0, 0, 0.25)',
        card: '0px 4px 20px rgba(0, 0, 0, 0.25)',
      },
      keyframes: {
        'accordion-down': {
          from: {height: '0'},
          to: {height: 'var(--radix-accordion-content-height)'},
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: '0'},
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function sizePlugin(api) {
      api.matchUtilities({s: (value) => ({width: value, height: value})}, {values: api.theme('width')})
    }),
  ],
} satisfies Config

export default config
