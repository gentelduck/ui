import type { Metadata } from 'next'
import { absoluteUrl } from '~/lib'

const title = 'Duck Hooks'
const description =
  'Debounce, media queries, clipboard, composed refs, and stable IDs. Each hook has its own subpath, so you only bundle what you import.'

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/duck-hooks') },
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

export default function DuckHooksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
