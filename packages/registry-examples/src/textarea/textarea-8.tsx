import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { Label } from '@gentleduck/registry-ui/label'
import { Textarea } from '@gentleduck/registry-ui/textarea'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message-rtl">رسالتك</Label>
        <Textarea id="message-rtl" placeholder="اكتب رسالتك هنا." />
      </div>
    </DirectionProvider>
  )
}
