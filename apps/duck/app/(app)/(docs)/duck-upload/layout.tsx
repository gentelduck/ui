import type { Metadata } from 'next'
import { absoluteUrl } from '~/lib'

const title = 'Duck Upload'
const description =
  'A file upload engine with React bindings. Pause, resume, and retry uploads, and pick them up again after a reload.'

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/duck-upload') },
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

export default function DuckUploadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
