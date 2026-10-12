import { Button } from '@gentleduck/registry-ui/button'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { ChevronLeft, ChevronRight, Save, Trash2 } from 'lucide-react'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <div className="flex flex-wrap items-center gap-4">
        <Button icon={<Save />}>حفظ</Button>
        <Button icon={<ChevronRight />} variant="outline">
          السابق
        </Button>
        <Button secondIcon={<ChevronLeft />} variant="outline">
          التالي
        </Button>
        <Button variant="secondary">تسجيل الدخول</Button>
        <Button icon={<Trash2 />} variant="destructive">
          حذف
        </Button>
      </div>
    </DirectionProvider>
  )
}
