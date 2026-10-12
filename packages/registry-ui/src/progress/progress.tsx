'use client'

import { cn } from '@gentleduck/libs/cn'
import { useDirection } from '@gentleduck/primitives/direction'
import * as React from 'react'
import { toDirection } from '../direction/direction.libs'

const Progress = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLProps<HTMLDivElement>, 'value' | 'ref'> & { value: number }
>(({ className, value, dir, ...props }, ref) => {
  const direction = useDirection(toDirection(dir))
  // Shift the bar toward the inline-start edge so the fill grows from it in either direction.
  const offset = 100 - (value ?? 0)
  return (
    <div
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary', className)}
      ref={ref}
      {...props}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={value}
      dir={direction}
      data-slot="progress"
      role="progressbar">
      <div
        className="size-full flex-1 bg-primary transition-transform duration-200 ease-(--gentleduck-motion-ease)"
        style={{ transform: `translateX(${direction === 'rtl' ? offset : -offset}%)` }}
      />
    </div>
  )
})
Progress.displayName = 'Progress'

export { Progress }
