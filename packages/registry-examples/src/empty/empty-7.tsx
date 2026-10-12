import { Button } from '@gentleduck/registry-ui/button'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@gentleduck/registry-ui/empty'
import { IconInbox } from '@tabler/icons-react'
import { ArrowUpLeftIcon } from 'lucide-react'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconInbox />
          </EmptyMedia>
          <EmptyTitle>صندوق الوارد فارغ</EmptyTitle>
          <EmptyDescription>لا توجد رسائل جديدة. ستظهر هنا المحادثات الجديدة فور تواصل أحد معك.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button>رسالة جديدة</Button>
            <Button variant="outline">عرض الأرشيف</Button>
          </div>
        </EmptyContent>
        <Button asChild className="text-muted-foreground" size="sm" variant="link">
          {/* biome-ignore lint/a11y/useValidAnchor: placeholder href in demo component */}
          <a href="#">
            إدارة الإعدادات <ArrowUpLeftIcon />
          </a>
        </Button>
      </Empty>
    </DirectionProvider>
  )
}
