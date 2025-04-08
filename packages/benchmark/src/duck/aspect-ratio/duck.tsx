import { AspectRatio } from "@gentelduck/registry-ui-duckui/aspect-ratio"

export default function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9} className="bg-muted">
      {/* <img
        width={480}
        height={320}
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="Photo by Drew Beamer"
        className="h-full w-full rounded-md object-cover"
      /> */}
    </AspectRatio>
  )
}