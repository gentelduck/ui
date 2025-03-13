import React from 'react'
import { Button } from '@duck/registry-ui-duckui/button'
import { Inbox } from 'lucide-react'

export default function Button12Demo() {
  return (
    <>
      <Button
        aria-label="Inbox button with 23 notifications"
        type="button"
        role="button"
        icon={<Inbox />}
        label={{
          children: '23',
        }}
      >
        Button
      </Button>
    </>
  )
}
