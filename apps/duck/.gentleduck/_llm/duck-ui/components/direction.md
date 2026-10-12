```tsx title="components/direction-1.tsx"
// import from your project: import Demo from '@/components/direction-1'
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
```

## Philosophy

Direction is cross-cutting state. Set it once and every component works out the rest: layout, spacing, icons, keyboard arrows, and where overlays open. You do not pass `dir` to components or add `rtl:` classes.

## Installation

CLI
Manual

```bash
npx @gentleduck/cli add direction
```

Install the following dependency:

```bash
npm install @gentleduck/primitives
```

Copy and paste the following code into your project.

Update the import paths to match your project setup.

## Usage

Set the direction on the document:

```tsx
<html dir="rtl" lang="ar">
```

Or wrap your app, or any part of it, in `DirectionProvider`:

```tsx
import { DirectionProvider } from '@/components/ui/direction'

<DirectionProvider dir="rtl">{children}</DirectionProvider>
```

Components resolve direction from their own `dir` prop, then the nearest `DirectionProvider`, then `<html dir>`. Changes to `<html dir>` are picked up at runtime. On the server the document is not available, so in server-rendered apps use `DirectionProvider` (it can sit right inside `<html dir="rtl">`) to get the right direction on first paint.

### Custom components

Use `useDirection` when your own component needs the direction in JavaScript, such as picking an icon or flipping a key. For layout, prefer logical classes (`ms-*`, `pe-*`, `start-*`, `text-start`), which follow `dir` without any code.

```tsx
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useDirection } from '@/components/ui/direction'

function NextIcon() {
  const dir = useDirection()
  return dir === 'rtl' ? <ArrowLeft /> : <ArrowRight />
}
```

## API Reference

### Exports

| Export | Type | Description |
| --- | --- | --- |
| `DIRECTION_DICTIONARY` | `{ ltr: 'ltr'; rtl: 'rtl' }` | Canonical direction values |
| `DirectionProvider` | `React.FC<{ dir: 'ltr' \| 'rtl'; children?: ReactNode }>` | Provides direction to descendants |
| `Provider` | `React.FC<{ dir: 'ltr' \| 'rtl'; children?: ReactNode }>` | Alias for `DirectionProvider` |
| `useDirection` | `(localDir?: 'ltr' \| 'rtl') => 'ltr' \| 'rtl'` | Resolves `localDir` -> nearest `DirectionProvider` -> `<html dir>` |
| `DirectionContext` | `React.Context<'ltr' \| 'rtl' \| undefined>` | Underlying context object |
| `toDirection` | `(dir: unknown) => 'ltr' \| 'rtl' \| undefined` | Narrows an arbitrary `dir` value; anything else becomes `undefined` |