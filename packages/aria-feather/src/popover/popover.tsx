import React from "react"
import { PopoverContext, usePopover } from "./popover.hooks"
import { PopoverProps } from "./popover.types"



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