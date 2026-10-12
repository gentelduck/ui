'use client'

import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { RadioGroup, RadioGroupItem } from '@gentleduck/registry-ui/radio-group'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <RadioGroup defaultValue="comfortable">
        <RadioGroupItem value="default">افتراضي</RadioGroupItem>
        <RadioGroupItem value="comfortable">مريح</RadioGroupItem>
        <RadioGroupItem value="compact">مضغوط</RadioGroupItem>
      </RadioGroup>
    </DirectionProvider>
  )
}
