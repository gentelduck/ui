import React from 'react'
import { cn } from '@/lib'
import { Slot } from '@radix-ui/react-slot'
import { Badge, CommandShortcut, Tooltip, TooltipContent, TooltipTrigger } from '@/registry/default/ui'
import { DuckButtonProps } from './DuckButton.types'
import { buttonVariants } from './DuckButton.local'

const DuckButton = React.forwardRef<HTMLButtonElement, DuckButtonProps>(
  (
    {
      asChild,
      isCollapsed = false,
      size = 'default',
      variant = 'default',
      title,
      className,
      label,
      children,
      icon: Icon,
      delayDuration = 0,
      command,
      ...props
    }: DuckButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement> | undefined
  ) => {
    const Component = asChild ? Slot : 'button'

    // Handle keyboard shortcuts
    React.useEffect(() => {
      if (command?.key) {
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === command.key && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            command.action && command.action()
          }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
      }
    }, [command])

    console.log(size)

    return (
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild>
          <Component
            ref={ref}
            className={cn(
              buttonVariants({
                variant: variant || 'ghost',
                size: size ? size : isCollapsed ? 'icon' : 'default',
                className: cn(
                  !isCollapsed && 'flex items-center gap-2 justify-start w-[220px] h-[40px]',
                  !isCollapsed && size === 'icon' && 'px-4',
                  className
                ),
              })
            )}
            {...props}
          >
            {!isCollapsed && (children || title) && <span className="text-[.9rem]">{children || title}</span>}
            {!isCollapsed && command && <CommandShortcut className="text-[.8rem]">{command.label}</CommandShortcut>}
            {!isCollapsed && label && <span className="ml-auto text-[.9rem]">{label}</span>}
          </Component>
        </TooltipTrigger>
        {isCollapsed && (title || label) && (
          <TooltipContent
            side="right"
            className="flex items-center gap-4 z-50 justify-start"
          >
            {title}
            {command && (
              <CommandShortcut className="text-[.8rem]">
                <Badge className="p-0 px-2">{command.label}</Badge>
              </CommandShortcut>
            )}
            {label && <span className="ml-auto text-muted-foreground text-[.9rem]">{label}</span>}
          </TooltipContent>
        )}
      </Tooltip>
    )
  }
)

DuckButton.displayName = 'DuckButton'

export { DuckButton }
