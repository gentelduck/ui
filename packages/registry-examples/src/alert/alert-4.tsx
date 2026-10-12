import { Alert, AlertDescription, AlertTitle } from '@gentleduck/registry-ui/alert'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from 'lucide-react'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <div className="grid w-full max-w-xl items-start gap-4">
        <Alert>
          <CheckCircle2Icon aria-hidden="true" />
          <AlertTitle>تم حفظ التغييرات بنجاح</AlertTitle>
          <AlertDescription>تنبيه يضم أيقونة وعنوانًا ووصفًا.</AlertDescription>
        </Alert>
        <Alert>
          <PopcornIcon aria-hidden="true" />
          <AlertTitle>تنبيه بعنوان وأيقونة فقط، دون وصف.</AlertTitle>
        </Alert>
        <Alert variant="destructive">
          <AlertCircleIcon aria-hidden="true" />
          <AlertTitle>تعذّر إتمام عملية الدفع.</AlertTitle>
          <AlertDescription>
            <p>يرجى مراجعة بيانات الفوترة ثم المحاولة مرة أخرى.</p>
            <ul className="list-inside list-disc text-sm">
              <li>تحقق من بيانات البطاقة</li>
              <li>تأكد من توفر رصيد كافٍ</li>
              <li>تحقق من عنوان الفوترة</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </DirectionProvider>
  )
}
