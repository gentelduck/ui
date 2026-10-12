import type { Variants } from '@gentleduck/variants'
import { cva } from '@gentleduck/variants'

/**
 * Consistent transition + GPU-accelerated pseudo-element easing/duration across components.
 *
 * Only opacity and transforms transition, never colours, so a theme switch doesn't fade the
 * element while the rest of the page changes instantly.
 *
 * `pseudo: 'animate'` lets `:before`/`:after` inherit the host's transition duration and
 * easing. It intentionally does NOT set `will-change` — promoting a pseudo-element to a
 * GPU layer eagerly wastes memory on elements that may never animate.
 */
export const AnimVariants = cva('', {
  defaultVariants: {
    alive: 'default',
    pseudo: 'default',
  },
  variants: {
    alive: {
      default: 'transition-[opacity,transform,translate,scale,rotate] duration-200 ease-(--gentleduck-motion-ease)',
    },
    pseudo: {
      animate:
        '[&:before,&:after]:transition-[opacity,transform,translate,scale,rotate] [&:before,&:after]:duration-[inherit] [&:before,&:after]:ease-[inherit]',
      default: '',
    },
  },
})

export type AnimVariantsProps = Variants.VariantProps<typeof AnimVariants>
