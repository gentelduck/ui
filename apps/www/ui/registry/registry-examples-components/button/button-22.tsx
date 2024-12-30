import React from 'react'
import { Button } from '@/registry/registry-ui-components/button'
import { Inbox } from 'lucide-react'

export default function Button22Demo() {
  return (
    <div className="block">
      <Button
        aria-label="Inbox button"
        type="button"
        role="button"
        variant="gooey_left"
        icon={{ children: Inbox }}
      >
        Button
      </Button>
    </div>
  )
}
