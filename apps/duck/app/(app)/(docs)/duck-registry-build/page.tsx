import { FileCode, Gauge, Layers, Puzzle, Settings, TestTube } from 'lucide-react'
import { type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'Build your own component registry'
const description =
  'A build system for component registries, driven by extensions. Typed sources, a configurable pipeline, and a UI preset to start from.'

const features: IPackageFeature[] = [
  {
    description:
      'The builder runs a pipeline of extensions. Start with `uiRegistryPreset()`, or write your own for any kind of registry.',
    icon: Puzzle,
    title: 'Extensions',
  },
  {
    description:
      'One typed config covers sources, package mappings, and registry entries. A typo shows up as a TypeScript error.',
    icon: Settings,
    title: 'defineConfig()',
  },
  {
    description:
      'Map each registry namespace to a source folder, a package name, and a reference path. Imports resolve across workspaces.',
    icon: Layers,
    title: 'Sources and targets',
  },
  {
    description:
      'Every item is checked as a `registry:*` namespace string, with the same rule across sources, mappings, and schemas.',
    icon: FileCode,
    title: 'Schema validation',
  },
  {
    description:
      'A phased build context with a built-in cache. Only the registries you touched run again, so large ones still finish in seconds.',
    icon: Gauge,
    title: 'Cached builds',
  },
  {
    description:
      'Built-in extensions add banners, colors, a component index, and validation. Output hooks fit into any CI job.',
    icon: TestTube,
    title: 'Ready for CI',
  },
]

const INSTALL_CODE = `# Install
bun add -D @gentleduck/registry-build

# Build your registry
bunx registry-build build`

export default function DuckRegistryBuildPage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-registry-build/introduction', label: 'Get started' },
        { href: '/duck-registry-build/configuration', label: 'Configuration' },
      ]}
      description={description}
      features={features}
      install={{
        code: INSTALL_CODE,
        description: 'Add a `registry-build.config.ts`, run the CLI, and ship your registry.',
      }}
      packageName="@gentleduck/registry-build"
      slug="duck-registry-build"
      source="packages/duck-registry-build"
      title={title}
    />
  )
}
