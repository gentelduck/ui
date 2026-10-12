import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { Toggle } from '@gentleduck/registry-ui/toggle'
import { Bookmark } from 'lucide-react'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <Toggle variant="outline">
        <Bookmark />
        إشارة مرجعية
      </Toggle>
    </DirectionProvider>
  )
}
