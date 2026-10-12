import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { Skeleton } from '@gentleduck/registry-ui/skeleton'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <div className="flex items-center gap-4">
        <Skeleton className="size-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </DirectionProvider>
  )
}
