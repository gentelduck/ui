import { useTextmenuCommands } from '@/hooks'
import { HTMLAttributes } from 'react'

export type MouseEvent = React.MouseEventHandler<HTMLButtonElement>

export interface ToggleToolTipWrapperButtonProps extends HTMLAttributes<HTMLButtonElement> {
  tip?: string
  variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'
  side?: 'top' | 'left' | 'right' | 'bottom'
  children?: React.ReactNode
  onClick?: MouseEvent | keyof typeof useTextmenuCommands
  disabled?: boolean
}
