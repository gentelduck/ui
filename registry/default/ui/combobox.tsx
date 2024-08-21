'use client'
import React from 'react'

import { Button, LabelType, CommandType } from './button'
import { Label } from './ShadcnUI/label'
import { Popover, PopoverContent, PopoverTrigger } from './ShadcnUI/popover'
import { Command, CommandInput, CommandListGroup, CommandListGroupDataType } from './command'

import { cn } from '@/lib'
import { ChevronsUpDown } from 'lucide-react'
import { init } from 'next/dist/compiled/webpack/webpack'

interface OnSelectType<T> {
  value: T
  setValue: React.Dispatch<React.SetStateAction<T>>
}

type ComboboxType<T> = {
  title?: string
  onSelect: OnSelectType<T>
  className?: ClassNameType
  data: CommandListGroupDataType[]
  command?: CommandType
  label?: LabelType
  commandInput?: boolean
  groupheading?: string[]
}

interface ClassNameType {
  wrapper?: string
  trigger?: string
  content?: string
}

const Combobox = <T,>({
  data,
  className,
  title,
  command,
  label,
  groupheading,
  commandInput = true,
  onSelect,
}: ComboboxType<T>) => {
  //NOTE: you can use state management lib instead of this local states to use it globally
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <div className={cn('', className?.wrapper)}>
        {title && <Label htmlFor={title}>{title}</Label>}
        <Popover
          open={open}
          onOpenChange={setOpen}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              disabled={false}
              role="combobox"
              secondIcon={<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
              aria-expanded={open}
              className={cn(`w-[200px] justify-between capitalize`, className?.trigger)}
              label={{ showLabel: true, side: 'top', ...label }}
              command={{ ...command, action: () => setOpen(!open) } as CommandType}
            >
              <span className="truncate">{onSelect.value as string}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={cn('w-[200px] p-0 h-[245px]', className?.content ?? 'Select one...')}
            id={title}
          >
            <Command>
              {commandInput && (
                <CommandInput
                  placeholder="Search one..."
                  required
                />
              )}
              <CommandListGroup
                data={data}
                selected={['']}
                groupheading={groupheading || []}
                onSelect={(value: string | undefined) => {
                  setOpen(false)
                  onSelect.setValue(value as T)
                }}
              />
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}

Combobox.displayName = 'Combobox'

export { Combobox, type ComboboxType, type ClassNameType }
