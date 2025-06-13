import React from 'react'
import { DialogContext } from './_dialog'
import { DialogContextType } from './dialog.types'
import { lockScrollbar, cleanLockScrollbar } from './dialog.libs'

export function useDialogContext(name: string = 'Dialog'): DialogContextType {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error(`useDialogContext must be used within a ${name}`)
  }
  return context
}

export function useDialog(openProp?: boolean, onOpenChange?: (state: boolean) => void) {
  const dialogRef = React.useRef<HTMLDialogElement | null>(null)
  const [open, setOpen] = React.useState<boolean>(openProp ?? false)

  const handleOpenChange = React.useCallback(
    (state: boolean) => {
      try {
        const dialog = dialogRef.current
        if (state) {
          dialog?.showModal()
          lockScrollbar(true)
          setOpen(true)
          onOpenChange?.(true)
        } else {
          lockScrollbar(false)
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
    lockScrollbar(open)

    if (openProp) {
      handleOpenChange(true)
    } else if (openProp === false) {
      handleOpenChange(false)
    }

    function dialogClose() {
      handleOpenChange?.(false)
    }

    dialog?.addEventListener("close", dialogClose)

    return () => {
      dialog?.removeEventListener("close", dialogClose)
      cleanLockScrollbar()
    }
  }, [handleOpenChange, open, openProp])

  return {
    ref: dialogRef,
    open,
    onOpenChange: handleOpenChange,
  } as const
}