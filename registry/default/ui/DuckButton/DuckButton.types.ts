import { VariantProps } from 'class-variance-authority'
import { LucideIcon } from 'lucide-react'
import { buttonVariants } from './DuckButton.local'

export interface DuckButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isCollapsed?: boolean
  icon?: React.ReactElement
  label?: string
  route?: string
  command?: CommandType
  delayDuration?: number
}

export type CommandType = {
  label: string
  key: string
  state?: unknown
  action?: <T>(arg?: T) => void
}
