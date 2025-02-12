'use client'

import { Button } from '@/registry/registry-ui-components/button'
import { ToastAction, useToast } from '@/registry/registry-ui-components/toast'

export default function Toast5Demo() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }}
    >
      Show Toast
    </Button>
  )
}
