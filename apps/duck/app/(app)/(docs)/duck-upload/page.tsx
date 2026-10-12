import { Database, FileUp, Layers, Pause, Repeat, Zap } from 'lucide-react'
import { type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'Uploads that survive bad networks'
const description =
  'A file upload engine with React bindings. Pause, resume, and retry uploads, and pick them up again after a reload.'

const features: IPackageFeature[] = [
  {
    description:
      'Direct, presigned, tus, or S3 multipart behind one contract. Change backends without touching call sites.',
    icon: FileUp,
    title: 'Swappable strategies',
  },
  {
    description:
      'Stop an upload and resume from the last committed byte. Built on AbortController and per-chunk commits.',
    icon: Pause,
    title: 'Pause and resume',
  },
  {
    description: 'Each chunk retries with exponential backoff, so a flaky network doesn’t throw away finished work.',
    icon: Repeat,
    title: 'Retries with backoff',
  },
  {
    description:
      'Store progress in IndexedDB or your own storage. Uploads resume after a tab reload or a browser restart.',
    icon: Database,
    title: 'Persistence',
  },
  {
    description:
      'A `useUpload` hook with typed progress events and optimistic UI. It works well alongside React Query.',
    icon: Layers,
    title: 'React bindings',
  },
  {
    description:
      'The core is framework-agnostic. Use the React bindings, or wire it into Vue, Solid, or Svelte yourself.',
    icon: Zap,
    title: 'No lock-in',
  },
]

const INSTALL_CODE = `# Install
bun add @gentleduck/upload

# Use it
import { useUpload } from '@gentleduck/upload/react'
import { directStrategy } from '@gentleduck/upload/strategies'

const { upload, progress, pause, resume } = useUpload({
  strategy: directStrategy({ endpoint: '/api/upload' }),
})`

export default function DuckUploadPage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-upload/introduction', label: 'Get started' },
        { href: '/duck-upload/core', label: 'Core concepts' },
      ]}
      description={description}
      features={features}
      install={{ code: INSTALL_CODE, description: 'Pick a strategy and connect it to your form.' }}
      packageName="@gentleduck/upload"
      slug="duck-upload"
      status="wip"
      title={title}
    />
  )
}
