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
      },
    },
  },
  plugins: [],
} satisfies Config
