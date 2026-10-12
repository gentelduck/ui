import type { Metadata } from 'next'
import { absoluteUrl } from '~/lib'

const title = 'Duck Vim'
const description =
  'A typed keyboard engine for React. Hotkeys, sequences, chords, a key recorder, and a Mod key that fits each platform.'

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/duck-vim') },
  description,
  title,
  openGraph: {
    title,
    description,
    images: [{ url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}` }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}` }],
  },
}

export default function DuckVimLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
