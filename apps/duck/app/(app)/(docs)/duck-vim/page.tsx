import { Apple, Command, Keyboard, ListOrdered, Mic, Workflow } from 'lucide-react'
import { type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'Keyboard commands for React'
const description =
  'A typed keyboard engine for React. Hotkeys, sequences, chords, a key recorder, and a Mod key that fits each platform.'

const features: IPackageFeature[] = [
  {
    description:
      'Binds one combo, like `ctrl+k`, `meta+shift+p`, or `mod+s`. Platform-aware, with `preventDefault` support.',
    icon: Keyboard,
    title: 'useKeyBind',
  },
  {
    description: 'Multi-step sequences like `g` then `d`, with a configurable timeout between steps and chord mode.',
    icon: ListOrdered,
    title: 'useKeySequence',
  },
  {
    description: 'Registers a whole command palette at once. Bind each command to a shortcut and render the list.',
    icon: Command,
    title: 'useKeyCommands',
  },
  {
    description:
      'Records key presses for settings screens, so users can pick their own shortcuts and you can save them.',
    icon: Mic,
    title: 'useKeyRecorder',
  },
  {
    description: '`Mod` means `Cmd` on macOS and `Ctrl` everywhere else. One binding feels native on both.',
    icon: Apple,
    title: 'Mod key',
  },
  {
    description:
      'The parser, matcher, sequence engine, and recorder are plain TypeScript. The React hooks are a thin layer on top.',
    icon: Workflow,
    title: 'Framework-agnostic core',
  },
]

const INSTALL_CODE = `# Install
bun add @gentleduck/vim

# Bind your first shortcut
import { KeyProvider, useKeyBind } from '@gentleduck/vim/react'`

export default function DuckVimPage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-vim/introduction', label: 'Get started' },
        { href: '/duck-vim/api/react', label: 'API reference' },
      ]}
      description={description}
      features={features}
      install={{ code: INSTALL_CODE, description: 'Wrap your app in `KeyProvider`, then start binding.' }}
      packageName="@gentleduck/vim"
      slug="duck-vim"
      source="packages/duck-vim"
      title={title}
    />
  )
}
