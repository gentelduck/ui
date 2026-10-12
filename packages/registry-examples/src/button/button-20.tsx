'use client'

import { Button } from '@gentleduck/registry-ui/button'
import { CommandShortcut } from '@gentleduck/registry-ui/command'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@gentleduck/registry-ui/tooltip'
import { ArrowBigUpDash, Command } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

export default function Demo() {
  const [open, setOpen] = React.useState<boolean>(false)

  return (
    <DirectionProvider dir="rtl">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-expanded={open}
              aria-label={'زر متقدم'}
              icon={<ArrowBigUpDash />}
              isCollapsed={open}
              loading={false}
              onClick={() => setOpen((prev) => !prev)}
              size="default">
              زر
            </Button>
          </TooltipTrigger>
          <TooltipContent forceMount side="top" className="flex items-center gap-2">
            <CommandShortcut
              keys="mod+i"
              onKeysPressed={() => {
                setOpen((prev) => !prev)
                toast.success('زر متقدم')
              }}
              variant="secondary">
              <Command />
              +i
            </CommandShortcut>
            <p>زر متقدم</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </DirectionProvider>
  )
}
