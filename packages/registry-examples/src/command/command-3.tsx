'use client'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@gentleduck/registry-ui/command'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-react'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <Command className="h-fit w-80 border pt-0">
        <CommandInput placeholder="اكتب أمرًا أو ابحث..." />
        <CommandList>
          <CommandEmpty>لا توجد نتائج.</CommandEmpty>
          <CommandGroup heading="اقتراحات">
            <CommandItem>
              <Calendar />
              <span>التقويم</span>
            </CommandItem>
            <CommandItem>
              <Smile />
              <span>البحث عن رموز تعبيرية</span>
            </CommandItem>
            <CommandItem disabled>
              <Calculator />
              <span>الآلة الحاسبة</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="الإعدادات">
            <CommandItem>
              <User />
              <span>الملف الشخصي</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>الفوترة</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>الإعدادات</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </DirectionProvider>
  )
}
