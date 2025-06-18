'use client'

import * as React from 'react'
import { cn } from '@gentleduck/libs/cn'
import { Root as Popover } from '@gentleduck/aria-feather/popover'
import { AnimDialogVariants, AnimPopoverVariants, AnimTooltipVariants, AnimVariants } from '@gentleduck/motion/anim'
import { PopoverTrigger } from '../popover/_popover'
import { useDialogContext } from '@gentleduck/aria-feather/dialog'

const HoverCard = Popover

const HoverCardTrigger = PopoverTrigger

function HoverCardContent({
  className,
  children,
  overlay = "nothing",
  ...props
}: React.ComponentProps<'dialog'> & { overlay?: "default" | "nothing" } = { overlay: "nothing" }) {

  const { id, ref } = useDialogContext()

  return (
    <dialog ref={ref} role='tooltip' style={{ '--position-anchor': `--${id}` } as React.CSSProperties}
      closedby="any" id={id} popover="auto"
      className={cn(AnimVariants({ motionBackdrop: overlay }), AnimDialogVariants(), AnimPopoverVariants(), className)}
      {...props}>
      {children}
    </dialog>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }


// PopoverWrapper Component
// export interface PopoverWrapperProps {
//   wrapper?: React.ComponentPropsWithoutRef<typeof Popover>
//   trigger?: React.ComponentPropsWithoutRef<typeof PopoverTrigger>
//   content?: React.ComponentPropsWithoutRef<typeof PopoverContent>
// }

// const PopoverWrapper: React.FC<PopoverWrapperProps> = ({ content, trigger, wrapper }) => {
//   const { className: triggerClassName, key: triggerKey, children: triggerChildren, ...triggerProps } = trigger ?? {}
//   const { className: contentClassName, key: contentKey, children: contentChildren, ...contentProps } = content ?? {}

//   return (
//     <Popover {...wrapper}>
//       <PopoverTrigger asChild className={cn('', triggerClassName)} {...triggerProps}>
//         {triggerChildren}
//       </PopoverTrigger>
//       <PopoverContent className={cn('w-80', contentClassName)} {...contentProps}>
//         {contentChildren}
//       </PopoverContent>
//     </Popover>
//   )
// }

// PopoverWrapper.displayName = 'PopoverWrapper'

// export { Popover, PopoverTrigger, PopoverContent, PopoverWrapper, PopoverClose }
