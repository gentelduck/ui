import type { Metadata } from 'next'
import { absoluteUrl } from '~/lib'

const title = '@gentleduck/error'
const description =
  'Typed error classes built from a registry of codes. Secrets stay out of your logs, and it runs anywhere with zero dependencies.'

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/duck-error') },
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

export default function DuckErrorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
