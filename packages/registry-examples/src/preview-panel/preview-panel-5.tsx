import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { PreviewPanel } from '@gentleduck/registry-ui/preview-panel'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <PreviewPanel
        className="rounded-lg border bg-card"
        lockText="قفل العرض"
        maxHeight="400px"
        resetText="إعادة الضبط"
        unlockText="فتح قفل العرض"
        zoomInText="تكبير"
        zoomOutText="تصغير">
        <div className="flex flex-col items-center gap-4 p-8">
          <div className="size-24 rounded-full bg-primary/20" />
          <h3 className="font-semibold text-lg">تحريك وتكبير</h3>
          <p className="text-muted-foreground text-sm">افتح قفل العرض للسحب والتمرير، أو استخدم أدوات التحكم.</p>
        </div>
      </PreviewPanel>
    </DirectionProvider>
  )
}
