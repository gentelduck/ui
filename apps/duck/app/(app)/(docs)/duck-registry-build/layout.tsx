import type { Metadata } from 'next'
import { absoluteUrl } from '~/lib'

const title = 'Duck Registry Build'
const description =
  'A build system for component registries, driven by extensions. Typed sources, a configurable pipeline, and a UI preset to start from.'

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/duck-registry-build') },
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

export default function DuckRegistryBuildLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
