import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@gentleduck/registry-ui/accordion'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <Accordion className="w-87.5" collapsible type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>هل يدعم إمكانية الوصول؟</AccordionTrigger>
          <AccordionContent>نعم، فهو يتبع نمط التصميم المعتمد في WAI-ARIA.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>هل يأتي بتنسيق جاهز؟</AccordionTrigger>
          <AccordionContent>نعم، يأتي بأنماط افتراضية متناسقة مع بقية المكونات.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>هل يدعم الحركة؟</AccordionTrigger>
          <AccordionContent>نعم، الحركة مفعّلة افتراضيًا ويمكنك تعطيلها متى شئت.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </DirectionProvider>
  )
}
