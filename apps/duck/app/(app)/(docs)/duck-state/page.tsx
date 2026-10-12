import { Atom, Feather, GitMerge, Globe, Layers, Zap } from 'lucide-react'
import { githubTree, type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'State as a graph of atoms'
const description =
  'Atom-based state for React, inspired by Jotai. Derived atoms track their own dependencies, and the store works outside React too.'

const features: IPackageFeature[] = [
  {
    description:
      'Create primitive, derived, or writable derived atoms. Your state becomes a graph you can read and reason about.',
    icon: Atom,
    title: 'Atoms',
  },
  {
    description: 'Derived atoms subscribe to whatever they read. No selectors and no dependency arrays.',
    icon: GitMerge,
    title: 'Automatic tracking',
  },
  {
    description:
      '`createStore()` works outside React. Read, write, and subscribe from workers, tests, or any JavaScript runtime.',
    icon: Globe,
    title: 'Standalone store',
  },
  {
    description:
      '`useAtom`, `useAtomValue`, `useSetAtom`, `useStore`, and a `<Provider>`. If you know Jotai, you know the API.',
    icon: Zap,
    title: 'React bindings',
  },
  {
    description:
      'Derive a value for reads and add a setter for writes. Computed state and its update logic stay in one place.',
    icon: Layers,
    title: 'Writable derived atoms',
  },
  {
    description:
      'The Jotai mental model with less API. No boilerplate, no middleware registry, and no nested providers.',
    icon: Feather,
    title: 'Small surface',
  },
]

const INSTALL_CODE = `# Install
bun add @gentleduck/state

# Create an atom
import { atom, createStore } from '@gentleduck/state'`

export default function DuckStatePage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-state/introduction', label: 'Get started' },
        { href: githubTree('packages/wip/duck-state'), label: 'View source' },
      ]}
      description={description}
      features={features}
      install={{ code: INSTALL_CODE, description: 'One package covers the standalone store and the React bindings.' }}
      packageName="@gentleduck/state"
      slug="duck-state"
      source="packages/wip/duck-state"
      status="experimental"
      title={title}
    />
  )
}
