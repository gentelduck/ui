import type { Metadata } from 'next'
import { absoluteUrl } from '~/lib'

const title = 'Duck TType'
const description =
  'Compile-time type tests and more than 200 utility types for TypeScript. No test runner and no runtime cost.'

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/duck-ttest') },
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

export default function DuckTtestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
