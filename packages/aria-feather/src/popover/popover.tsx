import React from "react"
import { useComputedTimeoutTransition } from "@gentleduck/hooks"
import { PopoverContext } from "./popover.hooks"
import { PopoverProps } from "./popover.types"

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
 * Popover component that provides a context for managing its open state and
 * behavior. It uses a ref to handle the underlying HTMLPopoverElement.
 */
export function Popover({ children, open: openProp, onOpenChange }: PopoverProps): React.JSX.Element {
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