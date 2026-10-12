import type { Metadata } from 'next'
import { absoluteUrl } from '~/lib'

const title = 'Duck Auth'
const description =
  'Passwords, magic links, OAuth, passkeys, API keys, and SAML behind one typed engine. Bring your own framework, database, and mailer.'

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/duck-auth') },
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

export default function DuckAuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
