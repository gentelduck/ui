import { cva } from '@gentleduck/variants'

export const AnimVariants = cva('', {
  variants: {
    motionBlur: {
      default:
        // 'blur-xs starting:open:blur-xs open:blur-none',
        '',
    },
    motionBackdrop: {
      default:
        'backdrop:transition-[inherit] backdrop:duration-[inherit] backdrop:ease-[inherit] backdrop:bg-black/50  backdrop:opacity-0 starting:open:backdrop:opacity-0 open:backdrop:opacity-100',
      nothing: "backdrop:opacity-0"
    },
    motionAlive: {
      default: 'transition-all transition-discrete ease-(--duck-motion-ease) duration-[200ms,150ms]',
    },
    accelerated: {
      default: 'will-change-[opacity,transform,translate,blur] backdrop:will-change-[opacity,blur] transform-gpu',
    },
  },
  defaultVariants: {
    motionAlive: 'default',
    motionBlur: 'default',
    motionBackdrop: 'default',
    accelerated: 'default',
  },
})

export const AnimDialogVariants = cva(
  `border border-border bg-background rounded-lg shadow-sm outline-hidden p-6 gap-[inherit]`,
  {
    variants: {
      animation: {
        default: 'opacity-0 scale-90 starting:open:opacity-0 starting:open:scale-90 open:opacity-100 open:scale-100',
        nothing: ""
      },
    },
    defaultVariants: {
      animation: 'default',
    },
  },
)

export const AnimPopoverVariants = cva(
  `bg-popover text-popover-foreground inset-auto absolute max-h-[unset]
  [position-anchor:var(--position-anchor)]
  [position-try:_most-height_flip-block,_most-width_flip-inline,_flip-block_flip-inline] [position-visibility:anchors-visible]`,
  {
    variants: {
      side: {
        top: `
          [position-area:_block-start] origin-bottom my-2
        `,
        bottom: `
          [position-area:_block-end] origin-top my-2
        `,
        left: `
          [position-area:_inline-start_center] origin-right mx-2
        `,
        right: `
          [position-area:_inline-end_center] origin-left mx-2
        `,
        'top-left': `
          [position-area:_block-start_inline-start] origin-bottom-right my-2
        `,
        'top-right': `
          [position-area:_block-start_inline-end] origin-bottom-left my-2
        `,
        'bottom-left': `
          [position-area:_block-end_inline-start] origin-top-right my-2
        `,
        'bottom-right': `
          [position-area:_block-end_inline-end] origin-top-left my-2
        `,
        'top-span-left': `
          [position-area:_block-start_span-inline-start] origin-bottom-right my-2
        `,
        'top-span-right': `
          [position-area:_block-start_span-inline-end] origin-bottom-left  my-2
        `,
        'bottom-span-left': `
          [position-area:_block-end_span-inline-start] origin-top-right my-2
        `,
        'bottom-span-right': `
          [position-area:_block-end_span-inline-end] origin-top-left my-2
        `,
        'right-span-top': `
          [position-area:_inline-end_span-block-start] origin-bottom-left mx-2
        `,
        'right-span-bottom': `
          [position-area:_inline-end_span-block-end] origin-bottom-left mx-2
        `,
        'left-span-top': `
          [position-area:_inline-start_span-block-start] origin-top-right mx-2
        `,
        'left-span-bottom': `
          [position-area:_inline-start_span-block-end] origin-top-right mx-2
        `,
        center: `
          [position-area:_center] origin-center
        `,
      },
    },
    defaultVariants: {
      side: 'bottom',
    },
  },
)

export const AnimTooltipVariants = cva(
  `p-2.5 px-4 w-fit`,
)

export const AnimDialogModalVariants = cva(
  `inset-1/2 -translate-1/2 sm:max-w-lg w-full`,
)

export const AnimSheetVariants = cva(
  `duration-400 pointer-events-auto border-0 rounded-none`,
  {
    variants: {
      side: {
        top: `
          max-w-full w-full
          border-b
          rounded-b-lg
          -translate-y-full starting:open:-translate-y-full open:translate-y-0  
          bottom-auto
          `,
        bottom: `
          max-w-full w-full
          border-t
          rounded-t-lg
          translate-y-full starting:open:translate-y-full open:translate-y-0
          top-auto
        `,
        left: `
          max-h-screen h-screen
          border-l 
          rounded-r-lg
          -translate-x-full starting:open:-translate-x-full open:translate-x-0
          end-auto
          `,
        right: `
          max-h-screen h-screen
          border-r 
          rounded-l-lg
          translate-x-full starting:open:translate-x-full open:translate-x-0
          start-auto
        `,
      },
    },
    defaultVariants: {
      side: 'left',
    },
  },
)
