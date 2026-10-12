'use client'

import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { Label } from '@gentleduck/registry-ui/label'
import { Switch } from '@gentleduck/registry-ui/switch'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <div className="flex items-center gap-2">
        <Switch id="airplane-mode-rtl" />
        <Label htmlFor="airplane-mode-rtl">وضع الطيران</Label>
      </div>
    </DirectionProvider>
  )
}
