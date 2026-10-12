import { Code2, FileJson2, Fingerprint, Package, ShieldCheck, Workflow } from 'lucide-react'
import { type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'Errors your types know about'
const description =
  'Typed error classes built from a registry of codes. Secrets stay out of your logs, and it runs anywhere with zero dependencies.'

const features: IPackageFeature[] = [
  {
    description:
      'Each subsystem gets one error class, built from a plain object that maps codes to HTTP status numbers.',
    icon: Workflow,
    title: 'Registry-driven',
  },
  {
    description:
      'Which codes exist, what metadata each one carries, and whether it’s required. TypeScript infers all of it, with no extra declarations.',
    icon: Code2,
    title: 'Fully inferred',
  },
  {
    description:
      '`toJSON()` decides which metadata is safe to serialize, so secrets never reach logs or API responses.',
    icon: ShieldCheck,
    title: 'Secret-safe',
  },
  {
    description: 'Framework-agnostic and isomorphic. It behaves the same in Node, edge runtimes, and the browser.',
    icon: Package,
    title: 'Zero dependencies',
  },
  {
    description: '`detail()` and `fault()` brand a plain status number, so a code from one kit can’t pass as another.',
    icon: Fingerprint,
    title: 'Branded codes',
  },
  {
    description: 'Drop-in error handlers for Express, Fastify, Hono, NestJS, and Next.js Route Handlers.',
    icon: FileJson2,
    title: 'Framework handlers',
  },
]

const INSTALL_CODE = `# Install
bun add @gentleduck/error

# Define a kit
import { createErrorKit, fault } from '@gentleduck/error'

export const AppError = createErrorKit('AppError', {
  NOT_FOUND: fault<{ id: string }>(404),
})`

export default function DuckErrorPage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-error/introduction', label: 'Get started' },
        { href: '/duck-error/core-concepts', label: 'Core concepts' },
      ]}
      description={description}
      features={features}
      install={{ code: INSTALL_CODE, description: 'Install the package, then define your first kit.' }}
      packageName="@gentleduck/error"
      slug="duck-error"
      source="https://github.com/gentleeduck/duck-error"
      title={title}
    />
  )
}
