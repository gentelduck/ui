import React, { ForwardedRef } from 'react'
import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@/ui'
import { TooltipButtonProps } from './TooltipButton.types'
import { cn } from '@/utils'

export const TooltipButton = React.forwardRef(
  (
    { button, isCollapsed = false, delayDuration = 0 }: TooltipButtonProps,
    ref: ForwardedRef<HTMLButtonElement> | undefined,
  ) => {
    return isCollapsed ? (
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild>
          <Button
            ref={ref}
            variant={button.variant || 'ghost'}
            size={button.size || 'icon'}
            onClick={button.onClick}
            className={cn('hover:bg-accent hover:text-foreground collabsed', button.className)}
            {...button}
          >
            {<button.icon className="w-[1.15rem] h-[1.15rem]" />}
            <span className="sr-only"> {button.title} </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="flex gap-4 z-50"
        >
          {button.title}
          {button.label && <span className="ml-auto text-muted-foreground"> {button.label} </span>}
        </TooltipContent>
      </Tooltip>
    ) : (
      <Button
        ref={ref}
        variant={button.variant || 'secondary'}
        size={button.size || 'sm'}
        onClick={button.onClick}
        className={cn('flex items-center gap-2 text-[16px] justify-start w-[200px]', button.className)}
        {...button}
      >
        <button.icon className="w-[1.15rem] h-[1.15rem]" />
        {button.title}
        {button.label && <span className={cn('ml-auto')}> {button.label} </span>}
      </Button>
    )
  },
)
