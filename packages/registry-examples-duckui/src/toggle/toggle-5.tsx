import { Toggle } from '@gentelduck/registry-ui-duckui/toggle'
import { Italic } from 'lucide-react'

export default function Toggle1Demo() {
  return (
    <Toggle size='sm' aria-label='Toggle italic'>
      <Italic className='h-4 w-4' />
    </Toggle>
  )
}
