import { Avatar, AvatarFallback, AvatarImage } from '@gentleduck/registry-ui/avatar'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@gentleduck/registry-ui/hover-card'
import { CalendarIcon } from 'lucide-react'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <HoverCard>
        <HoverCardTrigger variant={'link'}>Next.js</HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between gap-4">
            <Avatar>
              <AvatarImage alt="Next.js" src="https://github.com/gentleeduck.png" />
              <AvatarFallback>NJ</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="font-semibold text-sm">Next.js</h4>
              <p className="text-sm">إطار عمل React من تطوير Vercel وصيانتها.</p>
              <div className="flex items-center gap-2 pt-2">
                <CalendarIcon aria-hidden="true" className="size-4 opacity-70" />
                <span className="text-muted-foreground text-xs">انضمّ في ديسمبر 2021</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </DirectionProvider>
  )
}
