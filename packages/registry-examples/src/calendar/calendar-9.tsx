'use client'

import { Calendar } from '@gentleduck/registry-ui/calendar'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import * as React from 'react'

export default function Demo() {
  const [date, setDate] = React.useState<Date | null>(new Date())

  return (
    <DirectionProvider dir="rtl">
      <Calendar
        className="rounded-md border shadow-sm"
        locale="ar-SA"
        mode="single"
        onSelect={setDate}
        selected={date}
      />
    </DirectionProvider>
  )
}
