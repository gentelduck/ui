import { Toggle } from '@/registry/registry-ui-components/toggle'
import { Bold } from 'lucide-react'

export default function Toggle1Demo() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  )
}
