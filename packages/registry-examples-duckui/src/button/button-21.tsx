import React from 'react'
import { Button } from '@duck/registry-ui-duckui/button'
import { Inbox } from 'lucide-react'

export default function Button9Demo() {
  return (
    <>
      <Button
        aria-label="Inbox button"
        variant={'gooey_right'}
        type="button"
        role="button"
      >
        Button
      </Button>
    </>
  )
}
