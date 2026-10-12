import { AspectRatio } from '@gentleduck/registry-ui/aspect-ratio'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import Image from 'next/image'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <figure className="flex w-full flex-col gap-2">
        <AspectRatio className="rounded-lg bg-muted" ratio={'16/9'}>
          <Image
            alt="صورة بعدسة Drew Beamer"
            className="rounded-lg object-cover dark:grayscale"
            height={450}
            src="https://plus.unsplash.com/premium_photo-1672116453000-c31b150f48ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width={800}
          />
        </AspectRatio>
        <figcaption className="text-muted-foreground text-sm">تصوير Drew Beamer على Unsplash</figcaption>
      </figure>
    </DirectionProvider>
  )
}
