import React from 'react'
import { Button } from '@/registry/registry-ui-components/button'

export default function Button26Demo() {
  return (
    <div className="block">
      <Button
        aria-label="Inbox button"
        type="button"
        role="button"
        variant={'nothing'}
        border={'primary'}
      >
        Button
      </Button>
    </div>
  )
}