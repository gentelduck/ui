import { CalendarClock, Filter, Hash, Layers, Merge, Package } from 'lucide-react'
import { githubTree, type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'The helpers every package shares'
const description =
  'cn(), filteredObject, groupArray, parseDate, and the other small utilities gentleduck runs on. Each helper has its own subpath.'

const features: IPackageFeature[] = [
  {
    description:
      'Merges class names with clsx and tailwind-merge. When Tailwind utilities conflict, the last one wins.',
    icon: Merge,
    title: 'cn()',
  },
  {
    description: 'Picks or omits object keys with a typed result. A typed stand-in for `lodash.pick` and `omit`.',
    icon: Filter,
    title: 'filteredObject',
  },
  {
    description: 'Groups a list by key or by function and returns a record of matching items per group.',
    icon: Layers,
    title: 'groupArray',
  },
  {
    description:
      'Buckets numbers into explicit ranges. Useful for histograms, charts, and ad hoc analytics on number arrays.',
    icon: Hash,
    title: 'groupDataByNumbers',
  },
  {
    description:
      'Turns strings, numbers, or `Date` inputs into a real `Date`. Invalid input returns `null`, so you can return early.',
    icon: CalendarClock,
    title: 'parseDate',
  },
  {
    description:
      'Every helper has its own entry point, like `@gentleduck/libs/cn` or `/parse-date`. No framework dependencies.',
    icon: Package,
    title: 'Subpath imports',
  },
]

const INSTALL_CODE = `# Install
bun add @gentleduck/libs

# Import a helper
import { cn } from '@gentleduck/libs/cn'`

export default function DuckLibsPage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-libs/introduction', label: 'Get started' },
        { href: githubTree('packages/duck-libs'), label: 'View source' },
      ]}
      description={description}
      features={features}
      install={{ code: INSTALL_CODE, description: 'Import each helper from its own subpath.' }}
      packageName="@gentleduck/libs"
      slug="duck-libs"
      source="packages/duck-libs"
      title={title}
    />
  )
}
