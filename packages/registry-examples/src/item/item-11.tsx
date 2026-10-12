import { Button } from '@gentleduck/registry-ui/button'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@gentleduck/registry-ui/item'
import { ChevronLeftIcon, ClipboardListIcon } from 'lucide-react'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>ملاحظات الاجتماع الأسبوعي</ItemTitle>
            <ItemDescription>راجع المهام المتفق عليها في الاجتماع الأخير قبل يوم الخميس.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="outline">
              عرض
            </Button>
          </ItemActions>
        </Item>
        <Item asChild size="sm" variant="outline">
          {/* biome-ignore lint/a11y/useValidAnchor: placeholder href in demo component */}
          <a href="#">
            <ItemMedia>
              <ClipboardListIcon className="size-5" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>لديك 3 مهام جديدة في هذه الدورة.</ItemTitle>
            </ItemContent>
            <ItemActions>
              <ChevronLeftIcon className="size-4" />
            </ItemActions>
          </a>
        </Item>
      </div>
    </DirectionProvider>
  )
}
