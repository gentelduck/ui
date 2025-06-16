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
  lockScroll?: boolean 
}
