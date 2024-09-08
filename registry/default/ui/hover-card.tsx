'use client'

import * as React from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'

import { cn } from '@/lib/utils'

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      'z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

// HoverCardCustomView
export interface HoverCardCustomViewProps {
  trigger?: React.HTMLProps<HTMLDivElement> & { triggerStyle?: string }
  content?: React.HTMLProps<HTMLDivElement> & { contentStyle?: string }
}

const HoverCardCustomView = React.forwardRef<React.ElementRef<typeof HoverCard>, HoverCardCustomViewProps>(
  ({ content, trigger }, ref) => {
    const { className: triggerClassName, children: triggerChildren, triggerStyle, ...triggerProps } = trigger ?? {}
    const { className: contentClassName, children: contentChildren, contentStyle, ...contentProps } = content ?? {}

    return (
      <div ref={ref}>
        <HoverCard>
          <HoverCardTrigger
            asChild
            className={cn(triggerStyle)}
          >
            <div
              className={cn('', triggerClassName)}
              {...triggerProps}
            >
              {triggerChildren}
            </div>
          </HoverCardTrigger>
          <HoverCardContent className={cn('w-80', contentStyle)}>
            <div
              className={cn('', contentClassName)}
              {...contentProps}
            >
              {contentChildren}
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    )
  }
)
HoverCardCustomView.displayName = 'HoverCardCustomView'

export { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardCustomView }
