import { ButtonProps } from '@/ui'
import { IconType } from '../index.type'

export type TooltipButtonProps = {
  button: TooltipButtonIcon
  isCollapsed?: boolean
  delayDuration?: number
}

export type TooltipButtonIcon = ButtonProps &
  React.RefAttributes<HTMLButtonElement> & {
    icon: ({ className }: IconType) => JSX.Element
    title: string | JSX.Element
    label?: string
  }
