import { Eye, Feather, FileType, Languages, Scan, Shield } from 'lucide-react'
import { type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'Client types from your server code'
const description =
  'Duck Gen reads your TypeScript server and writes .d.ts files, so client types always match your routes and message keys.'

const features: IPackageFeature[] = [
  {
    description:
      'Walks your NestJS or TypeScript server modules and puts every route into one type graph. Verbs, params, bodies, and responses included.',
    icon: Scan,
    title: 'Route scanning',
  },
  {
    description:
      'Writes declaration files your client imports directly. No runtime and no codegen DSL, only typed modules.',
    icon: FileType,
    title: '.d.ts output',
  },
  {
    description:
      'Reads your i18n catalogs and emits a union of valid keys. A typo fails at compile time, not silently at runtime.',
    icon: Languages,
    title: 'Message keys',
  },
  {
    description:
      'It ships as a CLI, so nothing lands in your bundle. The output is plain .d.ts that disappears at build time.',
    icon: Feather,
    title: 'Zero runtime',
  },
  {
    description:
      'Regenerates on every file change. Run it next to your dev server and client types follow the backend live.',
    icon: Eye,
    title: 'Watch mode',
  },
  {
    description: 'Ships `duck-gen.schema.json`, so your editor validates the config with autocomplete and hover docs.',
    icon: Shield,
    title: 'Config schema',
  },
]

const INSTALL_CODE = `# Install
bun add -D @gentleduck/gen

# Generate types
bunx duck-gen`

export default function DuckGenPage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-gen/introduction', label: 'Get started' },
        { href: '/duck-gen/api-routes', label: 'API routes' },
      ]}
      description={description}
      features={features}
      install={{ code: INSTALL_CODE, description: 'Works with NestJS today. Express and Fastify are next.' }}
      packageName="@gentleduck/gen"
      slug="duck-gen"
      source="packages/deprecated/duck-gen"
      title={title}
    />
  )
}
