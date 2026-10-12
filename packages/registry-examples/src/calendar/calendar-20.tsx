'use client'

import { HebrewAdapter } from '@gentleduck/calendar'
import { Calendar } from '@gentleduck/registry-ui/calendar'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import * as React from 'react'

const adapter = new HebrewAdapter()

export default function Demo() {
  const [date, setDate] = React.useState<Date | null>(new Date())

  return (
    <DirectionProvider dir="rtl">
      <Calendar
        adapter={adapter}
        className="rounded-md border shadow-sm"
        locale="he-IL"
        mode="single"
        onSelect={setDate}
        selected={date}
        showDropdowns
        yearRange={{ from: 5750, to: 5810 }}
      />
    </DirectionProvider>
  )
}
