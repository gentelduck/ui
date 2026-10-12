import { cn } from '@gentleduck/libs/cn'
import { Slot } from '@gentleduck/primitives/slot'
import type { Variants } from '@gentleduck/variants'
import * as React from 'react'
import { typesetVariants } from './typeset.constants'

interface ITypesetProps extends React.HTMLAttributes<HTMLDivElement>, Variants.VariantProps<typeof typesetVariants> {
  asChild?: boolean
}

const Typeset = React.forwardRef<HTMLDivElement, ITypesetProps>(
  ({ className, size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    return <Comp className={cn(typesetVariants({ size }), className)} data-slot="typeset" ref={ref} {...props} />
  },
)
Typeset.displayName = 'Typeset'

export { Typeset }
