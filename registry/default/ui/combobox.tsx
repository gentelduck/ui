'use client'
import React from 'react'

import { Button, CommandType } from './button'
import { Label } from './ShadcnUI/label'
import { Popover, PopoverContent, PopoverTrigger } from './ShadcnUI/popover'
import { Command, CommandInput, CommandListGroup, CommandListGroupDataType } from './command'

import { cn } from '@/lib'
import { ChevronsUpDown } from 'lucide-react'
import { Separator } from './ShadcnUI'
import { Badge } from './badge'

interface OnSelectType<T> {
  value: T[]
  setValue: React.Dispatch<React.SetStateAction<T[]>>
}

type ComboboxType<T = string, C extends string = string> = {
  type: 'combobox' | 'listbox'
  onSelect?: OnSelectType<T>
  wrapper?: React.HTMLProps<HTMLDivElement> & {}
  title?: Partial<React.ComponentPropsWithoutRef<typeof Label>> & {}
  trigger?: Partial<React.ComponentPropsWithoutRef<typeof Button>> & {}
  content?: Partial<React.ComponentPropsWithoutRef<typeof PopoverContent>> & {
    data: CommandListGroupDataType<C>[]
    showSearchInput?: boolean
    groupheading?: string[]
  }
}

const Combobox = <T,>({ wrapper, title, trigger, content, onSelect, type }: ComboboxType<T>) => {
  //NOTE: you can use state management lib instead of this local states to use it globally
  const [open, setOpen] = React.useState(false)

  const { className: wrapperClassName, ...wrapperProps } = wrapper ?? {}
  const { className: titleClassName, children: titleChildren, ...titleProps } = title ?? {}
  const { className: triggerClassName, children: triggerChildren, command, ...triggerProps } = trigger ?? {}
  const {
    className: contentClassName,
    data,
    showSearchInput,
    children: contentChildren,
    groupheading,
    ...contentProps
  } = content ?? {}

  const filteredData = onSelect?.value?.filter(item => {
    return data?.some(el => el.label === item)
  })

  return (
    <>
      <div
        className={cn('', wrapperClassName)}
        {...wrapperProps}
      >
        {title && (
          <Label
            htmlFor={titleClassName}
            className={cn('', titleClassName)}
            {...titleProps}
          >
            {titleChildren}
          </Label>
        )}
        <Popover
          open={open}
          onOpenChange={setOpen}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              disabled={false}
              role="combobox"
              secondIcon={
                <ChevronsUpDown
                  className={cn('ml-2 h-4 w-4 shrink-0 opacity-50 overflow-hidden', type === 'listbox' && 'hidden')}
                />
              }
              aria-expanded={open}
              className={cn(
                `justify-between`,
                type === 'combobox' ? 'w-[200px] [&_div]:w-[81%]' : 'rounded-lg border-dashed py-1 px-2 h-8',
                triggerClassName
              )}
              command={{ ...command, action: () => setOpen(!open), state: open } as CommandType}
              {...triggerProps}
            >
              <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                {type === 'combobox' ? ((onSelect?.value[0] as string) ?? triggerChildren) : triggerChildren}
              </span>
              {type === 'listbox' && filteredData?.length ? (
                <Separator
                  orientation="vertical"
                  className="h-4"
                />
              ) : null}
              {type === 'listbox' && (
                <div className="flex items-center gap-1">
                  {filteredData?.length! < 3 ? (
                    filteredData?.map((item, idx) => (
                      <Badge
                        key={idx}
                        variant={'secondary'}
                        className="rounded-md text-xs px-1 font-normal"
                      >
                        {item as string}
                      </Badge>
                    ))
                  ) : (
                    <Badge
                      variant={'secondary'}
                      className="rounded-md text-xs px-1 font-normal"
                    >
                      {filteredData?.length} Selected
                    </Badge>
                  )}
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={cn('w-[180px] p-0', contentClassName)}
            id={titleClassName}
            {...contentProps}
          >
            {contentChildren ? (
              contentChildren
            ) : (
              <Command>
                {showSearchInput && (
                  <CommandInput
                    className={cn(type === 'listbox' && 'p-2 h-fit')}
                    placeholder={type === 'combobox' ? 'Search...' : 'Filter...'}
                    required
                  />
                )}
                <CommandListGroup
                  type={type ?? 'combobox'}
                  data={data ?? []}
                  selected={(onSelect?.value as string[]) ?? ([] as string[])}
                  groupheading={groupheading || []}
                  checkabble={true}
                  onSelect={{
                    key: (value: string | undefined) => {
                      onSelect?.setValue(
                        type === 'combobox'
                          ? [value as T]
                          : onSelect?.value.includes(value as T)
                            ? onSelect?.value.filter(i => i !== value)
                            : [...onSelect?.value, value as T]
                      )
                    },
                    clear: () => {
                      onSelect?.setValue(
                        onSelect?.value.filter(item => !data?.map(item => item.label).includes(item as string)) as T[]
                      )
                    },
                  }}
                />
              </Command>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}

Combobox.displayName = 'Combobox'

export { Combobox, type ComboboxType, type OnSelectType }
