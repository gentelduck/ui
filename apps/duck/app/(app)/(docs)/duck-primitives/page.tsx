import { Accessibility, Blocks, Component, Feather, Keyboard, Shield } from 'lucide-react'
import { type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'Accessible parts, no styles attached'
const description =
  'Headless React primitives with roles, focus, and keyboard handled for you. Shared internals keep Alert Dialog at 1.6 KB and Popover at 2.4 KB.'

const features: IPackageFeature[] = [
  {
    description:
      'Slot, Presence, Popper, and focus scope load once for every primitive. Alert Dialog is 1.6 KB and Popover is 2.4 KB.',
    icon: Feather,
    title: 'Shared internals',
  },
  {
    description:
      'Every primitive ships with the right roles, states, and keyboard behavior. Compose them and ARIA is already wired.',
    icon: Accessibility,
    title: 'Accessible by default',
  },
  {
    description:
      'Compose `Root`, `Trigger`, `Content`, and `Portal` with scoped context. Each part owns one job, with no prop drilling.',
    icon: Blocks,
    title: 'Compound parts',
  },
  {
    description:
      'Roving focus, type-ahead, arrow keys, and focus trapping, with the same behavior across menus, dialogs, and selects.',
    icon: Keyboard,
    title: 'Keyboard support',
  },
  {
    description:
      'Compound parts, `asChild`, and `data-state` attributes. If you’ve used a headless library before, you know the vocabulary.',
    icon: Shield,
    title: 'Familiar API',
  },
  {
    description:
      'Dialog, Popover, Select, Menu, Command, Calendar, Input OTP, Navigation Menu, and more. All headless and unstyled.',
    icon: Component,
    title: '40+ primitives',
  },
]

const INSTALL_CODE = `# Install
bun add @gentleduck/primitives

# Import a primitive
import { Root, Trigger, Portal, Content } from '@gentleduck/primitives/dialog'`

export default function DuckPrimitivesPage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-primitives/introduction', label: 'Get started' },
        { href: '/duck-primitives/api/dialog', label: 'API reference' },
      ]}
      description={description}
      features={features}
      install={{ code: INSTALL_CODE, description: 'Import each primitive from its own subpath.' }}
      packageName="@gentleduck/primitives"
      slug="duck-primitives"
      source="packages/duck-primitives"
      title={title}
    />
  )
}
