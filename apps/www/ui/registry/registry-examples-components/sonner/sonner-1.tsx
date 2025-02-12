'use client'

import { Button } from '@/registry/registry-ui-components/button'
import { toast } from 'sonner'

export default function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo'),
          },
        })
      }
    >
      Show Toast
    </Button>
  )
}
