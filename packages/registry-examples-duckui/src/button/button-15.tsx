import React from 'react'
import { Button } from '@duck/registry-ui-duckui/button'
import { Inbox } from 'lucide-react'
import { toast } from 'sonner'

export default function Button15Demo() {
  return (
    <>
      <Button
        aria-label="Inbox button with keyboard shortcut"
        type="button"
        role="button"
        icon={<Inbox />}
        command={{
          key: 'alt+k',
          label: 'alt+k',
          action: () =>
            toast('Your inbox has been updated', {
              description: `you have clicked the 'command' button`,
            }),
        }}
      >
        Button
      </Button>
    </>
  )
}
