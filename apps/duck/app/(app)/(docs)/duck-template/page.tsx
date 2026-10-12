import { Blocks, Cloud, FileJson, Layers, Terminal, Workflow } from 'lucide-react'
import { type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'New projects from one JSON file'
const description =
  'A project scaffolder written in Rust. Templates are JSON, with variants, remote configs, and CLI flags passed straight into your files.'

const features: IPackageFeature[] = [
  {
    description:
      'One `duck-template.json` drives the whole scaffold: files, variables, conditional blocks, and variants.',
    icon: FileJson,
    title: 'JSON templates',
  },
  {
    description:
      'One template, many layouts. Run `create-variant` to save a folder as a reusable variant, like api, web, or cli.',
    icon: Layers,
    title: 'Variants',
  },
  {
    description:
      'Keep templates in a git repo or at any URL. Point duck-template at the link and it fetches and renders them.',
    icon: Cloud,
    title: 'Remote templates',
  },
  {
    description:
      '`init`, `create`, and `create-variant`. Each has its own flags, and all of them share one template engine.',
    icon: Terminal,
    title: 'Three commands',
  },
  {
    description:
      'Any CLI flag lands in the template context. Use `{{project_name}}` in a file and pass `--project_name`.',
    icon: Workflow,
    title: 'Flag injection',
  },
  {
    description: 'One statically linked binary with no Node runtime. Install it with `cargo install duck-template`.',
    icon: Blocks,
    title: 'Single binary',
  },
]

const INSTALL_CODE = `# Install
cargo install duck-template

# New project
duck-template init --name my-app

# From a variant
duck-template create --variant api --name my-api`

export default function DuckTemplatePage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-template/introduction', label: 'Get started' },
        { href: 'https://github.com/gentleeduck/duck-template', label: 'View source' },
      ]}
      description={description}
      features={features}
      install={{ code: INSTALL_CODE, description: 'Install with cargo, run `init`, and commit your template.' }}
      packageName="duck-template"
      slug="duck-template"
      source="https://github.com/gentleeduck/duck-template"
      title={title}
    />
  )
}
