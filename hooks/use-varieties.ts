import { buttonVariants } from '@/registry/default/ui'
import { VariantProps } from 'class-variance-authority'
import { Atom, atom } from 'jotai'
export type ButtonVarietiesType = {
  default: Varieties
}

export type Varieties = {
  variety?: VariantProps<typeof buttonVariants> & {
    title?: string
    label?: string
    commandLabel?: string
    command?: string
    loading?: boolean
    open?: boolean
    duration?: number
  }
}

export const buttonVarieties = atom<ButtonVarietiesType>({
  default: {
    variety: {
      variant: 'default',
      size: 'default',
      title: 'Settings',
      label: '5',
      commandLabel: 'Ctrl + C',
      loading: false,
      command: 'c',
      open: true,
      duration: 0,
    },
  },
})

// ButtonMainDemo: 'default',
//   ButtonSimpleDemo: 'default',
//   ButtonAdvancedDemo: 'default',
