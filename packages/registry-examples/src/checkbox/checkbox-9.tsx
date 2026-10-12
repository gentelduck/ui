'use client'

import { Checkbox } from '@gentleduck/registry-ui/checkbox'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { Label } from '@gentleduck/registry-ui/label'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Checkbox id="terms-rtl" />
          <Label htmlFor="terms-rtl">أوافق على الشروط والأحكام</Label>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox defaultChecked id="terms-rtl-2" />
          <div className="grid gap-2">
            <Label htmlFor="terms-rtl-2">أوافق على الشروط والأحكام</Label>
            <p className="text-muted-foreground text-sm">بتحديد هذا المربع، فإنك توافق على الشروط والأحكام.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox disabled id="notifications-rtl" />
          <Label htmlFor="notifications-rtl">تفعيل الإشعارات</Label>
        </div>
        <Label className="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-checked:border-blue-600 has-checked:bg-blue-50 dark:has-checked:border-blue-900 dark:has-checked:bg-blue-950">
          <Checkbox
            className="text-white checked:border-blue-600 checked:bg-blue-600 dark:checked:border-blue-700 dark:checked:bg-blue-700"
            defaultChecked
            id="notifications-rtl-2"
          />
          <div className="grid gap-1.5 font-normal">
            <p className="font-medium text-sm leading-none">تفعيل الإشعارات</p>
            <p className="text-muted-foreground text-sm">يمكنك تفعيل الإشعارات أو إيقافها في أي وقت.</p>
          </div>
        </Label>
      </div>
    </DirectionProvider>
  )
}
