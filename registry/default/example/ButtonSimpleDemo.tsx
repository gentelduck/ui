import React from 'react'
import { Button, TooltipProvider } from '@/registry/default/ui'
import { Inbox } from 'lucide-react'
import { useAtom } from 'jotai'
import { buttonVarieties } from '@/hooks/use-varieties'

export default function ButtonSimpleDemo() {
  //NOTE: that's a state in the example
  const [variety] = useAtom(buttonVarieties)
  //NOTE: you will use your own variables not this state in the example
  const { size, open, label, variant, title, loading } = variety.default.variety!

  return (
    <>
      <TooltipProvider>
        <Button
          isCollapsed={open}
          icon={{
            icon: Inbox,
          }}
          title={title}
          variant={variant}
          size={size}
          loading={loading}
          label={{
            children: label,
          }}
        />
      </TooltipProvider>
    </>
  )
}
