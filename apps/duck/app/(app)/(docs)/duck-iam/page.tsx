import { Component, FileText, Lock, Package, Server, Users } from 'lucide-react'
import { type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'Permissions, typed end to end'
const description =
  'Roles and attribute rules in one access control engine. Enforce policies on Express, NestJS, Hono, or Next.js, and reuse them in React or Vue.'

const features: IPackageFeature[] = [
  {
    description:
      'Write rules over subject, resource, action, and context. Combine or negate predicates, then trace how each decision was made.',
    icon: Lock,
    title: 'Attribute rules',
  },
  {
    description:
      'Typed roles and role hierarchies. Use them alone, or add attribute rules on top for per-resource checks.',
    icon: Users,
    title: 'Roles',
  },
  {
    description: 'Declarative policies with typed keys. A typo in an action or resource name fails at compile time.',
    icon: FileText,
    title: 'Policy DSL',
  },
  {
    description: 'Middleware for Express, NestJS, Hono, and Next.js route handlers. The same policies run everywhere.',
    icon: Server,
    title: 'Server adapters',
  },
  {
    description:
      'Typed `<Can />` components and hooks. Your UI shows or hides things with the same policies your API enforces.',
    icon: Component,
    title: 'React and Vue',
  },
  {
    description:
      'Every decision comes with a reason trace. Checks aim to stay under a microsecond, and the benchmarks page shows the numbers.',
    icon: Package,
    title: 'Explained decisions',
  },
]

const INSTALL_CODE = `# Install
bun add @gentleduck/iam

# Define a policy
import { createEngine } from '@gentleduck/iam'

export const iam = createEngine({
  roles: { admin: ['*'], editor: ['post:write'] },
})`

export default function DuckIamPage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-iam/introduction', label: 'Get started' },
        { href: '/duck-iam/core', label: 'Core concepts' },
      ]}
      description={description}
      features={features}
      install={{ code: INSTALL_CODE, description: 'Install the package, then pick a server or client adapter.' }}
      packageName="@gentleduck/iam"
      slug="duck-iam"
      source="https://github.com/gentleeduck/duck-iam"
      status="wip"
      title={title}
    />
  )
}
