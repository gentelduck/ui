'use client'

import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@gentleduck/registry-ui/dropdown-menu'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@gentleduck/registry-ui/input-group'
import { Separator } from '@gentleduck/registry-ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@gentleduck/registry-ui/tooltip'
import { IconCheck, IconInfoCircle, IconPaperclip } from '@tabler/icons-react'
import { ArrowUpIcon, FilterIcon } from 'lucide-react'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <TooltipProvider>
        <div className="grid w-full max-w-sm gap-6">
          <InputGroup>
            <InputGroupInput placeholder="تصفية السجلات..." />
            <InputGroupAddon>
              <FilterIcon aria-hidden="true" />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">24 سجلًا</InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput inputMode="decimal" placeholder="0.00" />
            <InputGroupAddon>
              <InputGroupText>المبلغ</InputGroupText>
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <InputGroupText>ر.س</InputGroupText>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InputGroupButton aria-label="معلومات" className="rounded-full" size="icon-xs">
                    <IconInfoCircle aria-hidden="true" />
                  </InputGroupButton>
                </TooltipTrigger>
                <TooltipContent>المبلغ شامل ضريبة القيمة المضافة.</TooltipContent>
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupTextarea placeholder="اشرح مشكلتك..." />
            <InputGroupAddon align="block-end">
              <InputGroupButton aria-label="إرفاق ملف" className="rounded-full" size="icon-xs" variant="outline">
                <IconPaperclip aria-hidden="true" />
              </InputGroupButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <InputGroupButton variant="ghost">منخفضة</InputGroupButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="[--radius:0.95rem]" side="top">
                  <DropdownMenuItem>منخفضة</DropdownMenuItem>
                  <DropdownMenuItem>متوسطة</DropdownMenuItem>
                  <DropdownMenuItem>عالية</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <InputGroupText className="ms-auto">3 مرفقات</InputGroupText>
              <Separator className="!h-4" orientation="vertical" />
              <InputGroupButton className="rounded-full" disabled size="icon-xs" variant="default">
                <ArrowUpIcon aria-hidden="true" />
                <span className="sr-only">إرسال</span>
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput placeholder="فريق ألفا" />
            <InputGroupAddon align="inline-end">
              <div className="flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <IconCheck className="size-3" />
              </div>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </TooltipProvider>
    </DirectionProvider>
  )
}
