import { Clipboard, Clock, Fingerprint, Link2, Monitor, Timer } from 'lucide-react'
import { githubTree, type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'Small hooks for everyday React'
const description =
  'Debounce, media queries, clipboard, composed refs, and stable IDs. Each hook has its own subpath, so you only bundle what you import.'

const features: IPackageFeature[] = [
  {
    description: 'Holds a value until typing settles, with a configurable delay in milliseconds.',
    icon: Timer,
    title: 'useDebounce',
  },
  {
    description: 'Merges callback refs, ref objects, and forwarded refs into one. It’s the plumbing behind `asChild`.',
    icon: Link2,
    title: 'useComposedRefs',
  },
  {
    description: 'Copies any string with the async clipboard API and remembers the last value, ready for a toast.',
    icon: Clipboard,
    title: 'useCopyToClipboard',
  },
  {
    description:
      'Subscribes to any media query, like `(prefers-reduced-motion)` or `(max-width: 768px)`. SSR-safe, with a configurable default.',
    icon: Monitor,
    title: 'useMediaQuery',
  },
  {
    description: 'SSR-safe, stable IDs for ARIA attributes. Built on `React.useId()` with a readable prefix.',
    icon: Fingerprint,
    title: 'useStableId',
  },
  {
    description: 'Times work to an element’s computed `transition-duration`, so you never hardcode a timeout.',
    icon: Clock,
    title: 'scheduleTransitionTimeout',
  },
]

const INSTALL_CODE = `# Install
bun add @gentleduck/hooks

# Import a hook
import { useDebounce } from '@gentleduck/hooks/use-debounce'`

export default function DuckHooksPage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-hooks/introduction', label: 'Get started' },
        { href: githubTree('packages/duck-hooks'), label: 'View source' },
      ]}
      description={description}
      features={features}
      install={{ code: INSTALL_CODE, description: 'Import each hook from its own subpath.' }}
      packageName="@gentleduck/hooks"
      slug="duck-hooks"
      source="packages/duck-hooks"
      title={title}
    />
  )
}
