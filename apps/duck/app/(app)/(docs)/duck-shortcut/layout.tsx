import type { Metadata } from 'next'
import { absoluteUrl } from '~/lib'

const title = 'Duck Shortcut'
const description =
  'A React hook for keyboard shortcuts, now deprecated in favor of @gentleduck/vim. The docs stay up for existing users.'

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/duck-shortcut') },
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

export default function DuckShortcutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
