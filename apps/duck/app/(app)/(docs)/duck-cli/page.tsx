import { Diff, Download, GitBranch, List, RefreshCw, Terminal } from 'lucide-react'
import { githubTree, type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'Add components from your terminal'
const description =
  'Scaffold a project and copy gentleduck/ui components into it. Five commands: init, add, update, diff, and list.'

const features: IPackageFeature[] = [
  {
    description:
      'Detects your framework, writes `duck-ui.config.json`, sets up Tailwind, and installs the base dependencies.',
    icon: Terminal,
    title: 'init',
  },
  {
    description:
      'Installs components by name. It resolves dependencies, writes the source into your project, and follows your tsconfig aliases.',
    icon: Download,
    title: 'add',
  },
  {
    description:
      'Pulls the latest registry source into components you already have. No hand-editing 50 files to stay current.',
    icon: RefreshCw,
    title: 'update',
  },
  {
    description:
      'Compares your local copy with the registry, so you can review upstream changes before you run `update`.',
    icon: Diff,
    title: 'diff',
  },
  {
    description: 'Browses the registry from your terminal, with categories, names, and current versions in one view.',
    icon: List,
    title: 'list',
  },
  {
    description:
      'Pass `--monorepo` to `init` and `--workspace apps/web` to every other command. Each workspace gets its own setup.',
    icon: GitBranch,
    title: 'Monorepos',
  },
]

const INSTALL_CODE = `# Set up your project
npx @gentleduck/cli init

# Add components
npx @gentleduck/cli add button`

export default function DuckCliPage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-cli/introduction', label: 'Get started' },
        { href: githubTree('packages/duck-cli'), label: 'View source' },
      ]}
      description={description}
      features={features}
      install={{ code: INSTALL_CODE, description: 'Works with Next.js, Vite, Remix, and Astro.' }}
      packageName="@gentleduck/cli"
      slug="duck-cli"
      source="packages/duck-cli"
      title={title}
    />
  )
}
