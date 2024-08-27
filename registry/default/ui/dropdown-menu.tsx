'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Check, ChevronRight, Circle } from 'lucide-react'

import { cn, groupArrays } from '@/lib/utils'
import { Button, CommandType } from './button'
import { ButtonProps } from './button'

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

type DropdownMenuOptionsDataType<T, Y extends boolean = true> = {
  command?: React.ComponentPropsWithoutRef<typeof DropdownMenuShortcut> & CommandType
  action?: (args: T) => void
  nestedData?: Y extends true ? DropdownMenuOptionsType<T> : never
} & Partial<Omit<ButtonProps, 'command'>> &
  Partial<React.ComponentPropsWithoutRef<typeof DropdownMenuCheckboxItem>> &
  Partial<React.ComponentPropsWithoutRef<typeof DropdownMenuItem>> &
  Partial<React.ComponentPropsWithoutRef<typeof DropdownMenuRadioItem>>

interface DropdownMenuOptionsType<T> {
  actionsArgs?: T extends {} ? T : never
  optionsData?: DropdownMenuOptionsDataType<T>[]
  group?: number[]
}

interface DropdownMenuViewProps<T> {
  content?: {
    itemType?: 'checkbox' | 'radio' | 'label'
    label?: React.ComponentPropsWithoutRef<typeof DropdownMenuLabel>
    options?: DropdownMenuOptionsType<T>
  } & React.ComponentPropsWithoutRef<typeof DropdownMenuContent>
  trigger?: React.ComponentPropsWithoutRef<typeof DropdownMenuTrigger> & ButtonProps
}

function DropdownMenuView<T>({ content, trigger }: DropdownMenuViewProps<T>) {
  const { className: triggerClassName, icon: Icon, ...triggerProps } = trigger ?? {}
  const { className: optionsClassName, itemType = 'label', options, label, ...contentProps } = content ?? {}
  const { className: labelClassName, ...labelProps } = label ?? {}
  const groupedOption = groupArrays(options?.group ?? [options?.optionsData?.length || 1], options?.optionsData ?? [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(triggerClassName)}
          icon={Icon}
          {...triggerProps}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn('w-[150px]', optionsClassName)}
        {...contentProps}
      >
        {label && (
          <>
            <DropdownMenuLabel
              className={cn(labelClassName)}
              {...labelProps}
            />
            <DropdownMenuSeparator />
          </>
        )}
        {groupedOption.map((group, idx) => {
          return (
            <React.Fragment key={`group-${idx}`}>
              {group.map((item, idx) => {
                const { children, action, className, value, nestedData, checked, onCheckedChange, ...props } = item
                const { icon: Icon, className: iconClassName, ...iconProps } = item.icon ?? {}
                const {
                  className: commandClassName,
                  label: commandLabel,
                  action: commandAction,
                  ...commandProps
                } = item.command ?? {}
                const groupedNestedOption =
                  groupArrays(
                    nestedData?.group ?? [nestedData?.optionsData?.length || 1],
                    nestedData?.optionsData ?? []
                  ) ?? []

                const Component =
                  itemType === 'checkbox'
                    ? DropdownMenuCheckboxItem
                    : itemType === 'radio'
                      ? DropdownMenuRadioItem
                      : DropdownMenuItem

                return !nestedData?.optionsData?.length ? (
                  <Component
                    value={value as string}
                    key={`item-${idx}`}
                    className={cn('flex gap-2 items-center', className)}
                    {...props}
                  >
                    {Icon && (
                      <Icon
                        className={cn('h-4 w-4', iconClassName)}
                        {...iconProps}
                      />
                    )}
                    {children}
                    {item.command && (
                      <>
                        <DropdownMenuShortcut
                          children={commandLabel}
                          {...commandProps}
                          key={`command-${idx}`}
                        />
                        <Button
                          command={item.command}
                          className="sr-only hidden"
                        />
                      </>
                    )}
                  </Component>
                ) : (
                  <DropdownMenuSub key={`sub-item-${idx}`}>
                    <DropdownMenuSubTrigger className={cn('flex item-center gap-2')}>
                      {Icon && (
                        <Icon
                          className={cn('h-4 w-4', iconClassName)}
                          {...iconProps}
                        />
                      )}
                      {children}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {groupedNestedOption?.map((nestedItem, idx) => {
                          return (
                            <React.Fragment key={`nested-${idx}`}>
                              {nestedItem.map((nestedItemInner, idx) => {
                                const {
                                  children: nestedChildren,
                                  action: nestedAction,
                                  className: nestedClassName,
                                  ...nestedProps
                                } = nestedItemInner
                                const {
                                  icon: NestedIcon,
                                  className: nestedIconClassName,
                                  ...nestedIconProps
                                } = nestedItemInner.icon ?? {}
                                const {
                                  className: nestedCommandClassName,
                                  label: enstedCommandLabel,
                                  action: nestedCommandAction,
                                  ...nestedCommandProps
                                } = nestedItemInner.command ?? {}

                                return (
                                  <DropdownMenuItem
                                    key={`nested-item-${idx}`}
                                    className={cn('flex gap-2 items-center', nestedClassName)}
                                    {...nestedProps}
                                  >
                                    {NestedIcon && (
                                      <NestedIcon
                                        {...nestedIconProps}
                                        className={cn('h-4 w-4', nestedIconClassName)}
                                      />
                                    )}
                                    {children}
                                    {nestedItemInner.command && (
                                      <>
                                        <DropdownMenuShortcut
                                          children={enstedCommandLabel}
                                          {...nestedCommandProps}
                                          key={`nested-item-shortcut-${idx}`}
                                        />
                                        <Button
                                          command={nestedItemInner.command}
                                          className="sr-only hidden"
                                        />
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                )
                              })}
                              {idx !== groupedNestedOption?.length - 1 && (
                                <DropdownMenuSeparator key={`separator-${idx}`} />
                              )}
                            </React.Fragment>
                          )
                        })}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                )
              })}
              {idx !== groupedOption.length - 1 && <DropdownMenuSeparator />}
            </React.Fragment>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuView,
  type DropdownMenuOptionsDataType,
  type DropdownMenuOptionsType,
}
