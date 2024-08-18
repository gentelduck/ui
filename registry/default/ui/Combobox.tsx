'use client'
import React from 'react'

import {
  Button,
  Command,
  CommandInput,
  CommandListGroup,
  CommandListGroupDataType,
  CommandType,
  Label,
  LabelType,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/registry/default/ui'

import { cn } from '@/lib'
import { ChevronsUpDown } from 'lucide-react'

export type ComboboxType = {
  title?: string
  className?: ClassNameType
  data: CommandListGroupDataType[]
  command?: CommandType
  label?: LabelType
}

export interface ClassNameType {
  wrapper?: string
  trigger?: string
  content?: string
}

const Combobox: React.FC<ComboboxType> = ({ data, className, title, command, label }) => {
  //NOTE: you can use state management lib instead of this local states to use it globally
  const [value, setValue] = React.useState<string>('')
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
              label={{ children: 'sdf', showLabel: true, side: 'top', ...label }}
              command={{ ...command, action: () => setOpen(!open) } as CommandType}
            >
              <span className="truncate">{value ? value : 'Select one...'}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={cn('w-[200px] p-0 h-[245px]', className?.content)}
            id={title}
          >
            <Command>
              <CommandInput
                placeholder="Search one..."
                required
              />
              <CommandListGroup
                data={data}
                selected={['']}
                groupheading={['Group heading']}
                onSelect={(value: string | undefined) => {
                  setOpen(false)
                  setValue(value || '')
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

export { Combobox }
