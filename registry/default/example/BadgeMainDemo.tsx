import { buttonVarieties } from '@/hooks/use-varieties'
import { Badge } from '@/registry/default/ui'
import { useAtom } from 'jotai'
import { CircleAlert } from 'lucide-react'

export default function BadgeMainDemo() {
  //NOTE: that's a state in the example
  const [variety] = useAtom(buttonVarieties)
  //NOTE: you will use your own variables not this state in the example
  const { variant, size, title } = variety.default.variety!

  return (
    <Badge
      variant={variant as Exclude<typeof variant, 'default' | 'link' | 'ghost'>}
      size={size}
      label={{
        children: title as unknown as HTMLCollection,
      }}
    >
      {size == 'icon' ? <CircleAlert /> : title}
    </Badge>
  )
}
