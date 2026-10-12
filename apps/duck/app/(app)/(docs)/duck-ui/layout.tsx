import type { Metadata } from 'next'
import { absoluteUrl } from '~/lib'

const title = 'Duck UI'
const description =
  'Styled Tailwind components built on @gentleduck/primitives. The CLI copies the source into your project, so every file is yours.'

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/duck-ui') },
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

export default function DuckUiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
