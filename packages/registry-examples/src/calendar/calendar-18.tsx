'use client'

import { PersianAdapter } from '@gentleduck/calendar'
import { Calendar } from '@gentleduck/registry-ui/calendar'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import * as React from 'react'

const adapter = new PersianAdapter()

export default function Demo() {
  const [date, setDate] = React.useState<Date | null>(new Date())

  return (
    <DirectionProvider dir="rtl">
      <Calendar
        adapter={adapter}
        className="rounded-md border shadow-sm"
        locale="fa-IR"
        mode="single"
        onSelect={setDate}
        selected={date}
        showDropdowns
        yearRange={{ from: 1380, to: 1430 }}
      />
    </DirectionProvider>
  )
}
