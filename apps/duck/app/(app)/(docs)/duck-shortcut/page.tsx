import { AlertTriangle, ArrowRight, Command, Globe, Keyboard, ListOrdered } from 'lucide-react'
import { type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'Replaced by duck-vim'
const description =
  'A React hook for keyboard shortcuts, now deprecated in favor of @gentleduck/vim. The docs stay up for existing users.'

const features: IPackageFeature[] = [
  {
    description:
      'New work happens in `@gentleduck/vim`. It keeps the same ideas, adds a richer API, and is under active development.',
    icon: AlertTriangle,
    title: 'Deprecated',
  },
  {
    description: 'Classic combos like `ctrl+s` or `command+k`. Case-insensitive and platform-aware.',
    icon: Command,
    title: 'Key combos',
  },
  {
    description: 'Konami-style sequences such as `Up Up Down Down Left Right B A Enter`. They mix freely with combos.',
    icon: ListOrdered,
    title: 'Key sequences',
  },
  {
    description: 'One hook. Pass `keys` and `onKeysPressed`, with a single binding or an array of alternatives.',
    icon: Keyboard,
    title: 'useDuckShortcut',
  },
  {
    description: 'A single document-level listener, so mounted instances never fight over events.',
    icon: Globe,
    title: 'One global listener',
  },
  {
    description:
      '`@gentleduck/vim` is the drop-in successor, with chord bindings, key recording, scoped contexts, and React hooks.',
    icon: ArrowRight,
    title: 'Move to duck-vim',
  },
]

const INSTALL_CODE = `# Install (deprecated)
bun add @gentleduck/shortcut

# Switch to duck-vim
bun add @gentleduck/vim`

export default function DuckShortcutPage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-vim/introduction', label: 'Use duck-vim instead' },
        { href: '/duck-shortcut/introduction', label: 'Read the docs' },
      ]}
      description={description}
      features={features}
      install={{
        code: INSTALL_CODE,
        description: 'Already on duck-shortcut? Move to duck-vim at your own pace. The docs cover the API differences.',
        title: 'Migrate',
      }}
      packageName="@gentleduck/shortcut"
      slug="duck-shortcut"
      source="packages/deprecated/duck-shortcut"
      status="deprecated"
      title={title}
    />
  )
}
