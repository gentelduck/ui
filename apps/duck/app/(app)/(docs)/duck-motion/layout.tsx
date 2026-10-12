import type { Metadata } from 'next'
import { absoluteUrl } from '~/lib'

const title = 'Duck Motion'
const description =
  'Duration tokens, easing curves, springs, and presets that respect reduced motion. Optional loaders keep the motion library light.'

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/duck-motion') },
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

export default function DuckMotionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
