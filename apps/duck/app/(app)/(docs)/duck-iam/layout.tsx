import type { Metadata } from 'next'
import { absoluteUrl } from '~/lib'

const title = 'Duck IAM'
const description =
  'Roles and attribute rules in one access control engine. Enforce policies on Express, NestJS, Hono, or Next.js, and reuse them in React or Vue.'

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/duck-iam') },
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

export default function DuckIamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
