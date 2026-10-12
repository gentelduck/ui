import { ArrowDown, ArrowUp, Boxes, Pencil, Send, Trash2 } from 'lucide-react'
import { type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'API calls typed from your routes'
const description =
  'A typed Axios client. Feed it a Duck Gen route map or your own, and bodies, params, queries, and responses are all typed.'

const features: IPackageFeature[] = [
  {
    description: 'Typed GET requests with an inferred response, typed path params, and typed query strings.',
    icon: ArrowDown,
    title: 'get',
  },
  {
    description: 'Typed POST body and response. The build fails if the body drifts from the route map.',
    icon: ArrowUp,
    title: 'post',
  },
  {
    description: 'Full and partial updates, typed against your DTOs. No hand-written interfaces to keep in sync.',
    icon: Pencil,
    title: 'put and patch',
  },
  {
    description: 'Typed DELETE with typed params and response. Handles `204 No Content` correctly.',
    icon: Trash2,
    title: 'del',
  },
  {
    description: 'An escape hatch for any HTTP verb, with full type inference over a route-map entry.',
    icon: Boxes,
    title: 'byMethod',
  },
  {
    description: 'A raw Axios request with the route-map config filled in. Every option stays typed.',
    icon: Send,
    title: 'request',
  },
]

const INSTALL_CODE = `# Install
bun add @gentleduck/query axios

# Create a typed client
import { createDuckQueryClient } from '@gentleduck/query'
import type { Routes } from './generated'

export const api = createDuckQueryClient<Routes>({ baseURL: '/api' })`

export default function DuckQueryPage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-query/introduction', label: 'Get started' },
        { href: '/duck-query/client-methods', label: 'Client methods' },
      ]}
      description={description}
      features={features}
      install={{
        code: INSTALL_CODE,
        description: 'Install it with Axios, create a client, and start calling endpoints.',
      }}
      packageName="@gentleduck/query"
      slug="duck-query"
      source="packages/duck-query"
      title={title}
    />
  )
}
