'use client'

import * as React from 'react'
import { cn } from '@gentleduck/libs/cn'
import { Button } from '../button'
import { Slot } from '@gentleduck/aria-feather/slot'
import { usePopoverContext, Popover } from '@gentleduck/aria-feather/popover'
import { AnimDialogVariants, AnimPopoverVariants, AnimTooltipVariants, AnimVariants } from '@gentleduck/motion/anim'

const Tooltip = Popover

function TooltipTrigger({
  onClick,
  open,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof Slot> & {
  open?: boolean
  asChild?: boolean
}): React.JSX.Element {
  const { id } = usePopoverContext()

  return (
    <Button aria-haspopup="dialog" aria-controls={id} popoverTarget={id} style={{ anchorName: `--${id}` }} {...props}>
      {children}
    </Button>
  )
}


function TooltipContent({
  className,
  children,
  overlay = "nothing",
  ...props
}: React.ComponentProps<'dialog'> & { overlay?: "default" | "nothing" } = { overlay: "nothing" }) {

  const { id } = usePopoverContext()
  return (
    <dialog role='tooltip' style={{ positionAnchor: `--${id}` }} closedby="any" id={id} popover="auto"
      className={cn(AnimVariants({ motionBackdrop: overlay }), AnimDialogVariants(), AnimPopoverVariants(), AnimTooltipVariants(), className)}
      {...props}>
      {children}
    </dialog>
  )
}

// function PopoverAnchor({
//   ...props
// }: React.ComponentProps<'dialog'>) {
//   return <dialog {...props} />
// }

export { Tooltip, TooltipTrigger, TooltipContent }


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
