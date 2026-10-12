import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { Input } from '@gentleduck/registry-ui/input'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <Input className="max-w-xs" placeholder="البريد الإلكتروني" type="email" />
    </DirectionProvider>
  )
}
