import { Checkbox } from '@gentleduck/registry-ui/checkbox'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { Label } from '@gentleduck/registry-ui/label'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <div className="flex items-center gap-2">
        <Checkbox id="label-terms-rtl" />
        <Label htmlFor="label-terms-rtl">أوافق على الشروط والأحكام</Label>
      </div>
    </DirectionProvider>
  )
}
