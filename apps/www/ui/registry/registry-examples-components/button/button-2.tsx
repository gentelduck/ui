import React from 'react'
import { Button } from '@/registry/registry-ui-components/button'

export default function ButtonSimpleDemo() {
  return (
    <Button
      aria-label="Simple button"
      variant={'default'}
      type="button"
      role="button"
    >
      Button
    </Button>
  )
}
