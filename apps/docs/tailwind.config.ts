import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

import baseConfig from '@duck/tailwind-config/web'

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [
    // '!./node_modules/',
    './**/*.tsx',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/registry-ui-duckui/button/**/*.tsx',
  ],
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...fontFamily.mono],
      },
    },
  },
} satisfies Config
