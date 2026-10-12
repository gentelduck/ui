import { cva } from '@gentleduck/variants'

export const typesetVariants = cva('typeset', {
  defaultVariants: {
    size: 'default',
  },
  variants: {
    size: {
      default: '',
      lg: '[--typeset-flow:1.4em] [--typeset-leading:1.8] [--typeset-size:1.125rem]',
      sm: '[--typeset-flow:1em] [--typeset-leading:1.65] [--typeset-size:0.875rem]',
    },
  },
})
