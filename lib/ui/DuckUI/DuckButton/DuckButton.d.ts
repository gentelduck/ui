import { ButtonProps } from '@/ui'
import { IconType } from '../index.d'

export type DuckButtonProps = {
  button: TooltipButton
  isCollapsed?: boolean
  delayDuration?: number
  command?: CommandType
}

export type CommandType = {
  label: string
  key: string
  state?: unknown
  action?: <T>(arg?: T) => void
}

export type TooltipButton = ButtonProps &
  React.RefAttributes<HTMLButtonElement> & {
    icon: ({ className }: IconType) => JSX.Element
    title: string | JSX.Element
    label?: string
    route: string
  }
