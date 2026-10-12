'use client'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@gentleduck/registry-ui/collapsible'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { ChevronsUpDown } from 'lucide-react'
import * as React from 'react'

export default function Demo() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <DirectionProvider dir="rtl">
      <Collapsible className="flex w-[350px] flex-col gap-2" onOpenChange={setIsOpen} open={isOpen}>
        <div className="flex items-center justify-between gap-4 px-4">
          <h4 className="font-semibold text-sm">أضاف أحمد نجمة إلى 3 مستودعات</h4>
          <CollapsibleTrigger size={'icon'}>
            <ChevronsUpDown aria-hidden="true" />
            <span className="sr-only">إظهار المستودعات أو إخفاؤها</span>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">gentleeduck/duck-ui</div>
        <CollapsibleContent className="flex flex-col gap-2">
          <div className="rounded-md border px-4 py-2 font-mono text-sm">gentleeduck/duck-vim</div>
          <div className="rounded-md border px-4 py-2 font-mono text-sm">gentleeduck/duck-mc</div>
        </CollapsibleContent>
      </Collapsible>
    </DirectionProvider>
  )
}
