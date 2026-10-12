'use client'

import { Card, CardContent } from '@gentleduck/registry-ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@gentleduck/registry-ui/carousel'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'

const slides = [
  { number: '١', title: 'الشريحة الأولى' },
  { number: '٢', title: 'الشريحة الثانية' },
  { number: '٣', title: 'الشريحة الثالثة' },
  { number: '٤', title: 'الشريحة الرابعة' },
  { number: '٥', title: 'الشريحة الخامسة' },
]

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.number}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square flex-col items-center justify-center gap-2 p-6">
                    <span className="font-semibold text-4xl">{slide.number}</span>
                    <span className="text-muted-foreground text-sm">{slide.title}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious text="الشريحة السابقة" />
        <CarouselNext text="الشريحة التالية" />
      </Carousel>
    </DirectionProvider>
  )
}
