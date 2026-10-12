import type { Metadata } from 'next'
import { absoluteUrl } from '~/lib'

const title = 'Duck Query'
const description =
  'A typed Axios client. Feed it a Duck Gen route map or your own, and bodies, params, queries, and responses are all typed.'

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/duck-query') },
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

export default function DuckQueryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
