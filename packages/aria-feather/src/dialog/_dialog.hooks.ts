import React from 'react'
import { DialogContext } from './_dialog'
import { DialogContextType, DialogProps } from './dialog.types'
import { lockScrollbar, cleanLockScrollbar } from './dialog.libs'

export function useDialogContext(name: string = 'Dialog'): DialogContextType {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error(`useDialogContext must be used within a ${name}`)
  }
  return context
}

export function useDialog({ openProp, onOpenChange, lockScroll, hoverable, mode }: DialogProps) {
  const dialogRef = React.useRef<HTMLDialogElement | null>(null)
  const triggerRef = React.useRef<HTMLElement | HTMLButtonElement | null>(null)
  const [open, setOpen] = React.useState<boolean>(openProp ?? false)

  function handleOpenChange(state: boolean) {
    try {
      const dialog = dialogRef.current;
      const openActions = {
        dialog: () => dialog?.showModal(),
        popover: () => dialog?.showPopover(),
      };
      const closeActions = {
        dialog: () => dialog?.close(),
        popover: () => dialog?.hidePopover(),
      };
      if (state) {
        openActions[mode]?.();
        setOpen(state);
        onOpenChange?.(state);
      } else {
        closeActions[mode]?.();
        setOpen(state);
        onOpenChange?.(state);
      }
    } catch (e) {
      console.warn('Dialog failed to toggle', e);
    }
  }

  React.useEffect(() => {
    const dialog = dialogRef.current
    const trigger = triggerRef.current
    if (lockScroll) lockScrollbar(open)

    if (openProp) {
      handleOpenChange(true)
    } else if (openProp === false) {
      handleOpenChange(false)
    }
    function dialogClose() {
      handleOpenChange(false)
    }

    dialog?.addEventListener("close", dialogClose)

    let openTimer = null;
    let closeTimer = null;

    function openAfterDelay() {
      clearTimeout(closeTimer);
      openTimer = setTimeout(() => handleOpenChange(true), 300);
    }

    function closeAfterDelay() {
      clearTimeout(openTimer);
      closeTimer = setTimeout(() => handleOpenChange(false), 1500);
    }


    // TODO: focus visible not working and if applied it leads to random UI rendering
    if (hoverable) {
      [trigger, dialog].forEach(elm => {
        elm?.addEventListener("mouseover", openAfterDelay);
        elm?.addEventListener("mouseout", closeAfterDelay);
      });
    }

    return () => {
      dialog?.removeEventListener("close", dialogClose)
      if (hoverable) {
        [trigger, dialog].forEach(elm => {
          elm?.addEventListener("mouseover", openAfterDelay);
          elm?.addEventListener("mouseout", closeAfterDelay);
        });
      }
      cleanLockScrollbar()
    }
  }, [handleOpenChange, open, openProp])

  return {
    triggerRef,
    ref: dialogRef,
    open,
    onOpenChange: handleOpenChange,
  } as const
}