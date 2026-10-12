import type { Metadata } from 'next'
import { absoluteUrl } from '~/lib'

const title = 'Duck TTLog'
const description =
  'A fast, low-allocation logging framework for Rust. Lock-free ring buffer, compile-time macros, and snapshots that survive a crash.'

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/duck-ttlog') },
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

export default function DuckTtlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
