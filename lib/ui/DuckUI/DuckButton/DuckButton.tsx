import React, { ForwardedRef } from 'react'
import { Button, CommandShortcut, Tooltip, TooltipContent, TooltipTrigger } from '@/ui'
import { DuckButtonProps } from './DuckButton.d'
import { cn, filteredObject } from '@/utils'

export const DuckButton = React.forwardRef(
  (
    { button, isCollapsed = false, delayDuration = 0, command }: DuckButtonProps,
    ref: ForwardedRef<HTMLButtonElement> | undefined,
  ) => {
    const filteredKeys = filteredObject(['icon', 'className'], button)

    if (command && command.key) {
      React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
          if (e.key === command.key && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            command.action && command.action()
          }
        }
        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
      }, [command.state])
    }

    return isCollapsed ? (
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild>
          <Button
            ref={ref}
            variant={button.variant || 'ghost'}
            size={button.size || 'icon'}
            onClick={button.onClick}
            className={cn('hover:bg-accent hover:text-foreground collabsed', button.className)}
            {...filteredKeys}
          >
            {<button.icon className="w-[1.15rem] h-[1.15rem]" />}
            <span className="sr-only"> {button.title} </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="flex items-center gap-4 z-50"
        >
          {button.title}
          {command && <CommandShortcut className="text-[.9rem]">{command.label}</CommandShortcut>}
          {button.label && <span className="ml-auto text-muted-foreground"> {button.label} </span>}
        </TooltipContent>
      </Tooltip>
    ) : (
      <Button
        ref={ref}
        variant={button.variant || 'ghost'}
        size={button.size || 'default'}
        onClick={button.onClick}
        className={cn('flex items-center gap-2 text-[16px] justify-start w-[200px]', button.className)}
        {...filteredKeys}
      >
        <button.icon className="w-[1.15rem] h-[1.15rem]" />
        {button.title}
        {command && <CommandShortcut className="text-[.9rem]">{command.label}</CommandShortcut>}
        {button.label && <span className={cn('ml-auto')}> {button.label} </span>}
      </Button>
    )
  },
)
