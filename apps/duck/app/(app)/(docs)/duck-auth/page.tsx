import { Cookie, Database, Fingerprint, KeyRound, Mail, ShieldCheck } from 'lucide-react'
import { type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'Sign-in for TypeScript apps'
const description =
  'Passwords, magic links, OAuth, passkeys, API keys, and SAML behind one typed engine. Bring your own framework, database, and mailer.'

const features: IPackageFeature[] = [
  {
    description:
      'Sessions, identities, flows, providers, hijack policy, and anomaly detection live on one typed root. Add passwords, MFA, passkeys, API keys, or orgs when you need them.',
    icon: ShieldCheck,
    title: 'One engine',
  },
  {
    description:
      'Use `__Host-` HttpOnly cookies, opaque bearer tokens, or stateless JWT with key rotation. Bind any of them to a client key with DPoP (RFC 9449).',
    icon: Cookie,
    title: 'Cookies, bearer, or JWT',
  },
  {
    description:
      'Password, magic link, WebAuthn passkeys, API keys, and SAML. Six OAuth providers: Google, GitHub, LinkedIn, Microsoft, Discord, and Apple. They all share one provider interface.',
    icon: KeyRound,
    title: 'Every sign-in method',
  },
  {
    description:
      'Magic links, password resets, and verification emails all go through one `deliver` function. Send them with whatever your app already uses.',
    icon: Mail,
    title: 'Your mailer',
  },
  {
    description:
      '`strict()` refuses to boot with insecure config, like in-memory limiters, stores, or event buses, or insecure cookies. Presets cover GDPR, SOC 2, HIPAA, and FIPS.',
    icon: Fingerprint,
    title: 'Strict in production',
  },
  {
    description:
      'Drizzle tables for Postgres, MySQL, and SQLite sit next to your own. Redis or Valkey handles rate limits, events, and single-use tokens.',
    icon: Database,
    title: 'Your database',
  },
]

const INSTALL_CODE = `# Install
bun add @gentleduck/auth

# Mount on Express
import { mountSignIn } from '@gentleduck/auth/server/express'
app.post('/auth/signin', mountSignIn(auth))`

export default function DuckAuthPage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-auth/introduction', label: 'Get started' },
        { href: '/duck-auth/core', label: 'Core concepts' },
      ]}
      description={description}
      features={features}
      install={{ code: INSTALL_CODE, description: 'Install the package, then mount a sign-in route.' }}
      packageName="@gentleduck/auth"
      slug="duck-auth"
      status="wip"
      title={title}
    />
  )
}
