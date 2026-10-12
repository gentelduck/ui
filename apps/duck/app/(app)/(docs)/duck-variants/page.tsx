import { Feather, Layers, Palette, Settings, Shield, Type } from 'lucide-react'
import { githubTree, type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'Typed variants for your components'
const description =
  'A cva() variant system with compound variants, defaults, and a VariantProps helper. Every type comes from your config.'

const features: IPackageFeature[] = [
  {
    description:
      'Every variant, default, and compound is inferred. `VariantProps<typeof button>` gives you the union of valid props.',
    icon: Type,
    title: 'Inferred types',
  },
  {
    description:
      'Define variants once and reuse them everywhere: `intent`, `size`, `tone`, or whatever your design system needs.',
    icon: Palette,
    title: 'Variant-driven styles',
  },
  {
    description: 'Set defaults so consumers rarely spell them out, and override them per instance when needed.',
    icon: Settings,
    title: 'Default variants',
  },
  {
    description: 'Add classes when several variants match, like `primary` with `lg`, or `outline` with `destructive`.',
    icon: Layers,
    title: 'Compound variants',
  },
  {
    description: 'Works with Tailwind but doesn’t need it. Use it with any className-based styling.',
    icon: Feather,
    title: 'Zero dependencies',
  },
  {
    description: 'Same API as class-variance-authority. Migrate an existing codebase by changing the import.',
    icon: Shield,
    title: 'cva-compatible',
  },
]

const INSTALL_CODE = `# Install
bun add @gentleduck/variants

# Define variants
import { cva, type VariantProps } from '@gentleduck/variants'`

export default function DuckVariantsPage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-variants/introduction', label: 'Get started' },
        { href: githubTree('packages/duck-variants'), label: 'View source' },
      ]}
      description={description}
      features={features}
      install={{ code: INSTALL_CODE, description: 'Write your variants and export their types.' }}
      packageName="@gentleduck/variants"
      slug="duck-variants"
      source="packages/duck-variants"
      title={title}
    />
  )
}
