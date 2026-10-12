import { Accessibility, Blocks, Component, Paintbrush, Palette, Sparkles } from 'lucide-react'
import { type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'Components you copy and own'
const description =
  'Styled Tailwind components built on @gentleduck/primitives. The CLI copies the source into your project, so every file is yours.'

const features: IPackageFeature[] = [
  {
    description:
      'Buttons, dialogs, selects, tabs, sidebar, data table, calendar, command, and carousel. Styled and ready to ship.',
    icon: Component,
    title: 'The full kit',
  },
  {
    description:
      'Every component sits on the headless `@gentleduck/primitives` layer. Styled and unstyled are one family.',
    icon: Blocks,
    title: 'Built on primitives',
  },
  {
    description:
      'Written with `cva()` variants and `cn()` merging. Override `className` on any instance without forking.',
    icon: Paintbrush,
    title: 'Tailwind and cva',
  },
  {
    description: 'OKLCH tokens in CSS variables, with dark mode built in. Change a few variables to swap the palette.',
    icon: Palette,
    title: 'Themes and dark mode',
  },
  {
    description:
      'Keyboard, focus, and ARIA behavior come straight from duck-primitives. The styled layer never breaks them.',
    icon: Accessibility,
    title: 'Accessible by default',
  },
  {
    description: 'The CLI writes the source into your project. Patch it, restyle it, or extend it. It’s your code.',
    icon: Sparkles,
    title: 'Copy, don’t depend',
  },
]

const INSTALL_CODE = `# Set up your project
npx @gentleduck/cli init

# Add your first component
npx @gentleduck/cli add button`

export default function DuckUiPage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-ui/introduction', label: 'Get started' },
        { href: '/duck-ui/installation', label: 'Installation' },
      ]}
      description={description}
      features={features}
      install={{
        code: INSTALL_CODE,
        description: 'Scaffold once, then add components one at a time. Works with Next.js, Vite, Remix, and Astro.',
      }}
      packageName="@gentleduck/ui"
      slug="duck-ui"
      source="packages/registry-ui"
      title={title}
    />
  )
}
