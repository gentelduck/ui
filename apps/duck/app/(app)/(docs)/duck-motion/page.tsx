import { Accessibility, Clock, Feather, Gauge, Sparkles, Waves } from 'lucide-react'
import { githubTree, type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'Motion that feels the same everywhere'
const description =
  'Duration tokens, easing curves, springs, and presets that respect reduced motion. Optional loaders keep the motion library light.'

const features: IPackageFeature[] = [
  {
    description:
      '`duckMotionDurationMs.fast` is 150 ms, `.normal` is 200 ms, and `.slow` is 300 ms. Every animated component shares the same timing.',
    icon: Clock,
    title: 'Duration tokens',
  },
  {
    description:
      '`duckMotionEasing.standard`, `.exit`, `.expo`, `.easeOut`, and `.spring`. Cubic-bezier curves tuned for UI motion.',
    icon: Waves,
    title: 'Easing curves',
  },
  {
    description:
      '`useDuckReducedMotion()` and `motionTransition()` drop durations to zero when the user opts out. Your code stays the same.',
    icon: Accessibility,
    title: 'Reduced motion',
  },
  {
    description:
      'Tree-shakeable `fadeIn`, `scaleIn`, and `slideUp`, plus blur and asymmetric-exit variants. Pick one and drop it in.',
    icon: Sparkles,
    title: 'Presets',
  },
  {
    description: '`springDefault`, `springSnappy`, and `springGentle`. Pass them straight to the motion library.',
    icon: Gauge,
    title: 'Springs',
  },
  {
    description:
      '`MotionProvider`, `LazyMotion` feature loaders, and `useMotionPreset()`. Load only the features you use.',
    icon: Feather,
    title: 'Feature loaders',
  },
]

const INSTALL_CODE = `# Install
bun add @gentleduck/motion

# Import the helpers
import { motionTransition, useDuckReducedMotion } from '@gentleduck/motion'`

export default function DuckMotionPage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-motion/introduction', label: 'Get started' },
        { href: githubTree('packages/duck-motion'), label: 'View source' },
      ]}
      description={description}
      features={features}
      install={{
        code: INSTALL_CODE,
        description: 'Install the package and import the tokens, presets, and reduced-motion helpers.',
      }}
      packageName="@gentleduck/motion"
      slug="duck-motion"
      source="packages/duck-motion"
      status="wip"
      title={title}
    />
  )
}
