import { cn } from '@/lib'
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../..'
import { ToggleToolTipWrapperButtonProps } from './ToggleToolTipButtonWrapper.types'
import React, { useState } from 'react'

export const ToggleToolTipButtonWrapper = React.forwardRef<HTMLButtonElement, ToggleToolTipWrapperButtonProps>(
  ({ variant, className, onMouseUp, onMouseMove, children, onClick, side, tip, disabled }, ref) => {
    const [value, setValue] = useState<boolean>(false)

    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger
            asChild
            onMouseDown={() => setValue(!value)}
            onClick={onClick}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
          >
            <Button
              type="button"
              variant={variant || 'ghost'}
              disabled={disabled}
              className={cn('toggle__tool__tip__trigger', className)}
              ref={ref}
            >
              {children}
            </Button>
          </TooltipTrigger>
          <TooltipContent
            className="toggle__tool__tip__content"
            side={side || 'top'}
          >
            <p>{tip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
)

ToggleToolTipButtonWrapper.displayName = 'ToggleToolTipButtonWrapper'
