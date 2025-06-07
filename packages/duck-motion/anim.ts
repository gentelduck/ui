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
      nothing: ""
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
  `border border-border bg-background rounded-lg p-0 m-0   shadow-sm outline-hidden p-6 gap-[inherit]`,
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
  `bg-popover text-popover-foreground inset-auto 
  [position-area:_bottom] [position-try-order:_most-height] my-[1ch] ![position-try-fallbacks:_flip-block]`,
)

export const AnimTooltipVariants = cva(
  `p-2.5 px-4 w-fit`,
)

export const AnimDialogModalVariants = cva(
  `inset-1/2 -translate-y-1/2 -translate-x-1/2 sm:max-w-lg w-full`,
)

export const AnimSheetVariants = cva(
  `duration-400 pointer-events-auto border-0`,
  {
    variants: {
      side: {
        top: `
          max-w-full w-full
          border-b
          -translate-y-full starting:open:-translate-y-full open:translate-y-0  
          bottom-auto
          `,
        bottom: `
          max-w-full w-full
          border-t
          translate-y-full starting:open:translate-y-full open:translate-y-0
          top-auto
        `,
        left: `
          max-h-screen h-screen
          border-l 
          -translate-x-full starting:open:-translate-x-full open:translate-x-0
          end-auto
        `,
        right: `
          max-h-screen h-screen
          border-r 
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
