import React from "react"
import { PopoverContextType } from "./popover.types"
import { useDialog } from "../dialog/dialog.hooks"

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


export {useDialog as usePopover}