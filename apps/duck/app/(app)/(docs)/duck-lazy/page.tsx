import { Eye, Feather, ImageIcon, Layers, Timer, Wand2 } from 'lucide-react'
import { githubTree, type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'Render it when it scrolls into view'
const description =
  'Lazy-load components and images in React with IntersectionObserver. SSR-safe, with zero dependencies.'

const features: IPackageFeature[] = [
  {
    description:
      'Nothing renders until the wrapper enters the viewport. Tune when with the native `rootMargin` and `threshold` options.',
    icon: Eye,
    title: 'IntersectionObserver',
  },
  {
    description:
      'Wrap any subtree. Its children mount when the wrapper reaches the viewport, and a placeholder shows until then.',
    icon: Layers,
    title: 'DuckLazyComponent',
  },
  {
    description:
      'A lazy `<img>` that replaces its placeholder on load, with a configurable fade and a preserved aspect ratio.',
    icon: ImageIcon,
    title: 'DuckLazyImage',
  },
  {
    description:
      'Use `DuckLazyImage` in a Next.js app, or pass any image element as a child. Nothing ties it to a framework.',
    icon: Wand2,
    title: 'Works with next/image',
  },
  {
    description: 'React and the browser’s IntersectionObserver API. No polyfills and no extra weight.',
    icon: Feather,
    title: 'Zero dependencies',
  },
  {
    description:
      'The server renders the placeholder, and the client upgrades once the observer fires. No hydration mismatches.',
    icon: Timer,
    title: 'SSR-safe',
  },
]

const INSTALL_CODE = `# Install
bun add @gentleduck/lazy

# Lazy-mount a subtree
import { DuckLazyComponent } from '@gentleduck/lazy/lazy-component'`

export default function DuckLazyPage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-lazy/introduction', label: 'Get started' },
        { href: githubTree('packages/duck-lazy'), label: 'View source' },
      ]}
      description={description}
      features={features}
      install={{ code: INSTALL_CODE, description: 'Wrap the parts of your page that sit below the fold.' }}
      packageName="@gentleduck/lazy"
      slug="duck-lazy"
      source="packages/duck-lazy"
      title={title}
    />
  )
}
