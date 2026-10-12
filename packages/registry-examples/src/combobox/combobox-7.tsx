'use client'

import { cn } from '@gentleduck/libs/cn'
import { Button } from '@gentleduck/registry-ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@gentleduck/registry-ui/command'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { Popover, PopoverContent, PopoverTrigger } from '@gentleduck/registry-ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'

const options = [
  { label: 'صفحة هبوط', value: 'landing' },
  { label: 'لوحة تحكم', value: 'dashboard' },
  { label: 'متجر إلكتروني', value: 'ecommerce' },
  { label: 'مدونة', value: 'blog' },
  { label: 'معرض أعمال', value: 'portfolio' },
  { label: 'نظام حجوزات', value: 'booking' },
]

export default function Demo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  const selectedLabel = value ? options.find((option) => option.value === value)?.label : undefined

  return (
    <DirectionProvider dir="rtl">
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button aria-expanded={open} className="w-57.5 justify-between" role="combobox" variant="outline">
            {selectedLabel ?? 'اختر نوع المشروع...'}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-57.5 min-w-auto p-0">
          <Command>
            <CommandInput className="h-9" placeholder="ابحث عن نوع المشروع..." />
            <CommandList>
              <CommandEmpty>لم يتم العثور على نتائج.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue)
                      setOpen(false)
                    }}
                    value={option.value}>
                    {option.label}
                    <Check className={cn('ms-auto', value === option.value ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </DirectionProvider>
  )
}
