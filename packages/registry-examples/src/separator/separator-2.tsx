import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { Separator } from '@gentleduck/registry-ui/separator'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <div>
        <div className="space-y-1">
          <h4 className="font-medium text-sm leading-none">مكونات Duck UI</h4>
          <p className="text-muted-foreground text-sm">مكتبة مكونات واجهات مفتوحة المصدر.</p>
        </div>
        <Separator className="my-4" />
        <div className="flex h-5 items-center gap-4 text-sm">
          <div>المدونة</div>
          <Separator orientation="vertical" />
          <div>التوثيق</div>
          <Separator orientation="vertical" />
          <div>المصدر</div>
        </div>
      </div>
    </DirectionProvider>
  )
}
