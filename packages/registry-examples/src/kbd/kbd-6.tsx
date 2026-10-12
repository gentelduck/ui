import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { Kbd, KbdGroup } from '@gentleduck/registry-ui/kbd'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <div className="flex flex-col items-center gap-4 text-muted-foreground text-sm">
        <p>
          اضغط{' '}
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <span>+</span>
            <Kbd>S</Kbd>
          </KbdGroup>{' '}
          لحفظ التغييرات.
        </p>
        <p>
          استخدم <Kbd>⌘K</Kbd> لفتح لوحة الأوامر، و<Kbd>Esc</Kbd> لإغلاقها.
        </p>
      </div>
    </DirectionProvider>
  )
}
