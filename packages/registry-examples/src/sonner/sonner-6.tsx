'use client'

import { Button } from '@gentleduck/registry-ui/button'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { Toaster } from '@gentleduck/registry-ui/sonner'
import { toast } from 'sonner'

const TOASTER_ID = 'sonner-rtl'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      {/* This docs page is LTR, so the demo mounts its own Toaster inside the provider.
          In an app with <html dir="rtl">, the root Toaster is already RTL. */}
      <Toaster id={TOASTER_ID} />
      <Button
        onClick={() =>
          toast('تم إنشاء الحدث', {
            action: {
              label: 'تراجع',
              onClick: () => console.log('Undo'),
            },
            description: 'الأحد، 3 ديسمبر 2023 الساعة 9:00 صباحًا',
            toasterId: TOASTER_ID,
          })
        }
        variant="outline">
        عرض الإشعار
      </Button>
    </DirectionProvider>
  )
}
