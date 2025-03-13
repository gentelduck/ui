import React from 'react'
import { Button } from '@duck/registry-ui-duckui/button'
import { Inbox } from 'lucide-react'

export default function Button20Demo() {
  return (
    <div className="block">
      <Button
        aria-label="Inbox button"
        type="button"
        role="button"
        variant="ring_hover"
        icon={<Inbox />}
      >
        Button
      </Button>
    </div>
  )
}
