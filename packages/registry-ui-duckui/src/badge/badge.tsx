import * as React from 'react'

import { BadgeProps } from './badge.types'
import { badgeVariants } from './badge.constants'

import { cn } from '@gentelduck/libs/cn'

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, label, ...props }, ref) => {
    return (
      <div
        className={cn(badgeVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  },
)

Badge.displayName = 'Badge'

export { Badge }
