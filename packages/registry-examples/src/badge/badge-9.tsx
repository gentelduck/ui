import { Badge } from '@gentleduck/registry-ui/badge'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { BadgeCheckIcon, ClockIcon } from 'lucide-react'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>جديد</Badge>
        <Badge variant="secondary">
          <BadgeCheckIcon aria-hidden="true" className="size-3.5" />
          موثّق
        </Badge>
        <Badge variant="outline">
          <ClockIcon aria-hidden="true" className="size-3.5" />
          قيد المراجعة
        </Badge>
        <Badge variant="destructive">مرفوض</Badge>
      </div>
    </DirectionProvider>
  )
}
