'use client'

import { Avatar, AvatarFallback } from '@gentleduck/registry-ui/avatar'
import { Badge } from '@gentleduck/registry-ui/badge'
import { Button } from '@gentleduck/registry-ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@gentleduck/registry-ui/card'
import { DirectionProvider, useDirection } from '@gentleduck/registry-ui/direction'
import { Label } from '@gentleduck/registry-ui/label'
import { Switch } from '@gentleduck/registry-ui/switch'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const NOTIFICATIONS = [
  { defaultChecked: true, id: 'direction-email', label: 'إشعارات البريد الإلكتروني' },
  { defaultChecked: false, id: 'direction-mentions', label: 'تنبيهات الإشارات' },
]

function NextStepButton() {
  const dir = useDirection()
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <Button className="px-0" variant="link">
      التالي: الأمان
      <Arrow aria-hidden="true" />
    </Button>
  )
}

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-row items-center gap-3">
          <Avatar>
            <AvatarFallback>سع</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <CardTitle>سارة العتيبي</CardTitle>
            <CardDescription>sara@example.com</CardDescription>
          </div>
          <Badge variant="secondary">مسؤولة</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          {NOTIFICATIONS.map((item) => (
            <div className="flex items-center justify-between gap-4" key={item.id}>
              <Label htmlFor={item.id}>{item.label}</Label>
              <Switch defaultChecked={item.defaultChecked} id={item.id} />
            </div>
          ))}
        </CardContent>
        <CardFooter className="justify-between">
          <Button>حفظ التغييرات</Button>
          <NextStepButton />
        </CardFooter>
      </Card>
    </DirectionProvider>
  )
}
