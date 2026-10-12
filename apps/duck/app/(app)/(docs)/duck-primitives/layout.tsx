import type { Metadata } from 'next'
import { absoluteUrl } from '~/lib'

const title = 'Duck Primitives'
const description =
  'Headless React primitives with roles, focus, and keyboard handled for you. Shared internals keep Alert Dialog at 1.6 KB and Popover at 2.4 KB.'

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/duck-primitives') },
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

export default function DuckPrimitivesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
