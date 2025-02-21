import * as React from 'react'
import { cn, groupArrays } from '@/lib/utils'
import {
  Button,
  ButtonProps,
  buttonVariants,
  CommandType,
} from '@/registry/registry-ui-components'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './dropdown-menu'

export interface DropdownMenuOptionsDataType
  extends Partial<
    ButtonProps &
    React.ComponentPropsWithoutRef<typeof DropdownMenuCheckboxItem> &
    React.ComponentPropsWithoutRef<typeof DropdownMenuItem> &
    React.ComponentPropsWithoutRef<typeof DropdownMenuRadioItem>
  > {
  command?: React.ComponentPropsWithoutRef<typeof DropdownMenuShortcut> &
  CommandType
  nestedData?: React.ComponentPropsWithoutRef<typeof DropdownMenuSubContent> &
  DropdownMenuOptionsType
}

export interface DropdownMenuOptionsType {
  itemType: 'checkbox' | 'radio' | 'label'
  optionsData: DropdownMenuOptionsDataType[]
  group?: number[]
}

export interface DropdownMenuViewProps {
  wrapper?: React.ComponentPropsWithoutRef<typeof DropdownMenu>
  content: {
    label?: React.ComponentPropsWithoutRef<typeof DropdownMenuLabel>
    options: DropdownMenuOptionsType
  } & React.ComponentPropsWithoutRef<typeof DropdownMenuContent>
  trigger: React.ComponentPropsWithoutRef<typeof DropdownMenuTrigger> &
  ButtonProps
}

export function DropdownMenuView({
  wrapper,
  content,
  trigger,
}: DropdownMenuViewProps) {
  const {
    className: optionsClassName,
    options,
    label,
    align = 'end',
    ...contentProps
  } = content ?? {}

  const groupedOption = groupArrays(
    options?.group ?? [options?.optionsData?.length || 1],
    options?.optionsData ?? [],
  )

  return (
    <DropdownMenu modal={wrapper?.modal ?? false}>
      <DropdownWrapperTrigger trigger={trigger} />

      <DropdownMenuContent
        align={align}
        className={cn('w-[200px]', optionsClassName)}
        {...contentProps}
      >
        <DropdownWrapperLabel label={label} />

        {groupedOption.map((group, idx) => {
          return (
            <React.Fragment key={`group-${idx}`}>
              {group.map((item, idx) => {
                const { nestedData, key: _key } = item

                const {
                  className: nestedClassName,
                  group: nestedGroup,
                  optionsData: nestedOptions,
                  ...nestedProps
                } = nestedData ?? {}

                const groupedNestedOption =
                  groupArrays(
                    nestedData?.group ?? [nestedData?.optionsData?.length || 1],
                    nestedData?.optionsData ?? [],
                  ) ?? []

                return (
                  <React.Fragment key={`item-${idx}`}>
                    {!nestedData?.optionsData?.length ? (
                      <DropdownWrapperContentItem
                        item={item}
                        itemType={options.itemType}
                      />
                    ) : (
                      <DropdownMenuSub key={`sub-item-${idx}`}>
                        <DropdownWrapperSubTrigger trigger={item} />
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent
                            className={cn('w-[200px]', nestedClassName)}
                            {...nestedProps}
                          >
                            {groupedNestedOption?.map((nestedItem, idx) => {
                              return (
                                <React.Fragment key={`nested-${idx}`}>
                                  <DropdownWrapperSubContent
                                    itemType={nestedData?.itemType}
                                    nestedData={nestedItem}
                                  />
                                  {idx !== groupedNestedOption?.length - 1 && (
                                    <DropdownMenuSeparator
                                      key={`separator-${idx}`}
                                    />
                                  )}
                                </React.Fragment>
                              )
                            })}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    )}
                  </React.Fragment>
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

export function DropdownWrapperTrigger({
  trigger,
}: {
  trigger: React.ComponentPropsWithoutRef<typeof DropdownMenuTrigger> &
  ButtonProps
}) {
  return (
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="sm" {...trigger} />
    </DropdownMenuTrigger>
  )
}

export function DropdownWrapperLabel({
  label,
}: { label?: React.ComponentProps<typeof DropdownMenuLabel> }) {
  const { className, ...props } = label ?? {}
  return (
    label && (
      <>
        <DropdownMenuLabel className={cn('text-sm', className)} {...props} />
        <DropdownMenuSeparator />
      </>
    )
  )
}

export function DropdownWrapperContentItem({
  item,
  itemType,
}: {
  item: DropdownMenuOptionsDataType
  itemType: 'checkbox' | 'radio' | 'label'
}) {
  const {
    children,
    className,
    value,
    icon,
    command,
    nestedData,
    key: _key,
    ...props
  } = item

  const Component =
    itemType === 'checkbox'
      ? DropdownMenuCheckboxItem
      : itemType === 'radio'
        ? DropdownMenuRadioItem
        : DropdownMenuItem

  return (
    <Component
      value={value as string}
      className={cn(
        buttonVariants({
          variant: 'ghost',
          size: 'sm',
          className: 'flex gap-2 items-center justify-start px-2',
        }),
        itemType === 'checkbox' && 'pl-8',
        itemType === 'radio' && '[&_span_svg]:w-[.5rem] pl-8',
        className,
      )}
      {...props}
    >
      {icon && item.icon}
      {children}
      {command?.label && (
        <DropdownMenuShortcut {...command} children={command.label} />
      )}
    </Component>
  )
}

export function DropdownWrapperSubTrigger({
  trigger,
}: { trigger: DropdownMenuOptionsDataType }) {
  const { children, className, icon, ...props } = trigger
  return (
    <DropdownMenuSubTrigger
      className={cn(
        buttonVariants({
          variant: 'ghost',
          size: 'sm',
          className: 'w-full gap-2 px-2',
        }),
      )}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </DropdownMenuSubTrigger>
  )
}

export function DropdownWrapperSubContent({
  nestedData,
  itemType,
}: {
  nestedData: DropdownMenuOptionsDataType[]
  itemType: 'checkbox' | 'radio' | 'label'
}) {
  const Children = nestedData.map((item, idx) => {
    const { children, value, icon: Icon, className, ...props } = item
    const { label, ...commandProps } = item.command ?? {}

    const Component =
      itemType === 'checkbox'
        ? DropdownMenuCheckboxItem
        : itemType === 'radio'
          ? DropdownMenuRadioItem
          : DropdownMenuItem
    console.log(value)

    return (
      <Component
        value={value as string}
        checked={true}
        key={`nested-item-${idx}`}
        className={cn(
          buttonVariants({
            variant: 'ghost',
            size: 'sm',
          }),
          'flex gap-2 items-center justify-start',
          itemType !== 'label' && 'pl-8',
          itemType === 'radio' && '[&_span_svg]:w-[.5rem]',
          className,
        )}
        {...props}
      >
        {Icon && Icon}
        {children}
        {item.command && (
          <>
            <DropdownMenuShortcut
              children={label}
              {...commandProps}
              key={`nested-item-shortcut-${idx}`}
            />
            <Button command={item.command} className="sr-only hidden" />
          </>
        )}
      </Component>
    )
  })

  return itemType === 'radio' ? (
    <DropdownMenuRadioGroup value="date">{Children}</DropdownMenuRadioGroup>
  ) : (
    Children
  )
}
