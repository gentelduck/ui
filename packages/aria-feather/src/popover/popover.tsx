import React from "react"
import { PopoverContext, usePopover, usePopoverContext } from "./popover.hooks"
import { PopoverProps } from "./popover.types"
import { Slot } from "../slot"
import { useStableId } from "@gentleduck/hooks"


/**
 * Popover component that provides a context for managing its open state and
 * behavior. It uses a ref to handle the underlying HTMLPopoverElement.
 */
export function Root({ children, open: openProp, onOpenChange }: PopoverProps): React.JSX.Element {
  const { open, onOpenChange: _onOpenChange, ref } = usePopover(openProp, onOpenChange)
  const popoverId = useStableId()
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

export function Trigger({
  onClick,
  open,
  ...props
}: React.ComponentPropsWithRef<typeof Slot> & {
  open?: boolean
  asChild?: boolean
}): React.JSX.Element {
  const { onOpenChange, open: _open, id } = usePopoverContext()

  return (
    <Slot
      aria-haspopup="dialog"
      aria-controls={id}
      popoverTarget={id}
      style={{ '--position-anchor': `--${id}` } as React.CSSProperties}
      onClick={(e) => {
        onOpenChange(open ?? !_open)
        onClick?.(e)
      }}
      {...props}
    />
  )
}
