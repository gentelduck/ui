import { CheckCircle2, Equal, Feather, Import, Package, Split } from 'lucide-react'
import { githubTree, type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'Test your types with tsc'
const description =
  'Compile-time type tests and more than 200 utility types for TypeScript. No test runner and no runtime cost.'

const features: IPackageFeature[] = [
  {
    description:
      'Boolean assertions at compile time, with custom messages. A failing test shows up as a red underline in your editor.',
    icon: CheckCircle2,
    title: 'AssertTrue and AssertFalse',
  },
  {
    description:
      'Structural equality for types. It catches widening, distributive drift, and excess-property regressions.',
    icon: Equal,
    title: 'Expect<Equal>',
  },
  {
    description:
      'Primitives, predicates, strings, tuples, objects, numbers, unions, and brands, each imported from its own subpath.',
    icon: Package,
    title: '200+ utility types',
  },
  {
    description:
      'The `.js` files are empty on purpose. Every utility disappears at build time, so your bundle stays the same.',
    icon: Feather,
    title: 'Zero runtime',
  },
  {
    description:
      'Import `@gentleduck/ttest/string` or `/tuple`. Each domain has its own entry, so you only load what you use.',
    icon: Split,
    title: 'Subpath imports',
  },
  {
    description: 'No Jest and no Vitest. `tsc --noEmit` runs your tests in any project, editor, or CI.',
    icon: Import,
    title: 'No test runner',
  },
]

const INSTALL_CODE = `# Install
bun add -D @gentleduck/ttest

# Write a type test
import type { AssertTrue, Equal } from '@gentleduck/ttest/assert'

type _test = AssertTrue<Equal<Uppercase<'gentle'>, 'GENTLE'>, 'uppercase works'>`

export default function DuckTtestPage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-ttest/introduction', label: 'Get started' },
        { href: githubTree('packages/duck-ttest'), label: 'View source' },
      ]}
      description={description}
      features={features}
      install={{
        code: INSTALL_CODE,
        description: 'Install it as a dev dependency, write tests in `.test-d.ts` files, and let `tsc` run them.',
      }}
      packageName="@gentleduck/ttest"
      slug="duck-ttest"
      source="packages/duck-ttest"
      title={title}
    />
  )
}
