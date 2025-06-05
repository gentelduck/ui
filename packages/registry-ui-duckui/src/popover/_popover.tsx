'use client'

import * as React from 'react'
import { cn } from '@gentleduck/libs/cn'
import { useComputedTimeoutTransition } from '@gentleduck/hooks'
import { Button } from '../button'
import { Slot } from '@gentleduck/aria-feather/slot'
import { AnimDialogVariants, AnimPopoverVariants, AnimVariants } from '@gentleduck/motion/anim'


export interface PopoverContextType {
  open: boolean
  ref: React.RefObject<HTMLDialogElement | null>
  onOpenChange: (open: boolean) => void
  id: string
}

export type PopoverProps = {
  children?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  id: string
}


export function usePopover(openProp?: boolean, onOpenChange?: (state: boolean) => void) {
  const dialogRef = React.useRef<HTMLDialogElement | null>(null)
  const [open, setOpen] = React.useState<boolean>(openProp ?? false)

  const handleOpenChange = React.useCallback(
    (state: boolean) => {
      try {
        const dialog = dialogRef.current
        if (state) {
          document.body.classList.add('scroll-locked')
          setTimeout(() => {
            dialog?.showModal()
            setOpen(true)
            onOpenChange?.(true)
          }, 100)
        } else {
          useComputedTimeoutTransition(dialog, () => {
            document.body.classList.remove('scroll-locked')
          })
          dialog?.close()
          setOpen(false)
          onOpenChange?.(false)
        }
      } catch (e) {
        console.warn('Dialog failed to toggle', e)
      }
    },
    [onOpenChange],
  )

  React.useEffect(() => {
    const dialog = dialogRef.current
    useComputedTimeoutTransition(dialog, () => {
      document.body.classList.toggle('scroll-locked', open)
    })

    if (openProp) {
      handleOpenChange(true)
    } else if (openProp === false) {
      handleOpenChange(false)
    }
  }, [handleOpenChange, open, openProp])

  return {
    ref: dialogRef,
    open,
    onOpenChange: handleOpenChange,
  } as const
}

/**
 * Context for managing the open state of the popover.
 *
 */
export const PopoverContext = React.createContext<PopoverContextType | null>(null)

export function usePopoverContext(name: string = 'Popover'): PopoverContextType {
  const context = React.useContext(PopoverContext)
  if (!context) {
    throw new Error(`usePopoverContext must be used within a ${name}`)
  }
  return context
}

/**
 * Popover component that provides a context for managing its open state and
 * behavior. It uses a ref to handle the underlying HTMLPopoverElement.
 */
function Popover({ children, open: openProp, onOpenChange }: PopoverProps): React.JSX.Element {
  const { open, onOpenChange: _onOpenChange, ref } = usePopover(openProp, onOpenChange)
  const popoverId = React.useId()
  return (
    <PopoverContext.Provider
      value={{
        open: open,
        onOpenChange: _onOpenChange,
        ref,
        id: popoverId,
      }}>
      {children}
    </PopoverContext.Provider>
  )
}

function PopoverTrigger({
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
    <Button popovertarget={id} style={{anchorName: `--${id}`}} {...props}>
      {children}
    </Button>
  )
}


function PopoverContent({
  className,
  children,
  overlay = "nothing",
  ...props
}: React.ComponentProps<'dialog'> & { overlay?: "default" | "nothing" } = { overlay: "nothing" }) {

  const { id } = usePopoverContext()
  return (
    <dialog style={{positionAnchor: `--${id}`}} closedby id={id} popover="auto" className={cn(AnimVariants({ motionBackdrop: overlay }), AnimDialogVariants(), AnimPopoverVariants(), className)}
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

export {
  Popover, PopoverTrigger, PopoverContent,
  //  PopoverAnchor
}

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
