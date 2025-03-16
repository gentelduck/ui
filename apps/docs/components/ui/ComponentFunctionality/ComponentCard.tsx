import React from 'react'

import { cn } from '@gentelduck/libs/cn'
import { AspectRatio } from '@gentelduck/registry-ui-duckui/aspect-ratio'

export function ComponentCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <AspectRatio
      ratio={1 / 1}
      asChild
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-md border p-8',
          className
        )}
        {...props}
      />
    </AspectRatio>
  )
}
