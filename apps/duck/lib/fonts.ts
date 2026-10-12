import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import localFont from 'next/font/local'

export const fontMono = localFont({
  src: [
    {
      path: '../public/fonts/jetbrains-mono/jetbrains-mono-400-normal.woff2',
      style: 'normal',
      weight: '400',
    },
    {
      path: '../public/fonts/jetbrains-mono/jetbrains-mono-500-normal.woff2',
      style: 'normal',
      weight: '500',
    },
    {
      path: '../public/fonts/jetbrains-mono/jetbrains-mono-700-normal.woff2',
      style: 'normal',
      weight: '700',
    },
    {
      path: '../public/fonts/jetbrains-mono/jetbrains-mono-400-italic.woff2',
      style: 'italic',
      weight: '400',
    },
    {
      path: '../public/fonts/jetbrains-mono/jetbrains-mono-500-italic.woff2',
      style: 'italic',
      weight: '500',
    },
    {
      path: '../public/fonts/jetbrains-mono/jetbrains-mono-700-italic.woff2',
      style: 'italic',
      weight: '700',
    },
  ],
  variable: '--font-mono-font',
  display: 'swap',
  preload: true,
  fallback: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
})

/** Arabic glyphs only; JetBrains Mono has none. Listed after it in the font stacks, so Latin text is untouched. */
export const fontArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
  preload: false,
})
