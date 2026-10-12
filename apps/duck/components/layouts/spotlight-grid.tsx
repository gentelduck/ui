'use client'

import { cn } from '@gentleduck/libs/cn'
import * as React from 'react'

/** Time for the glow to cover ~63% of the distance to the pointer. Higher trails more. */
const SPOT_LAG_MS = 90

/**
 * Hairline grid whose dividers light up in `--pkg` around the pointer.
 * The wrapper paints the border color plus a radial glow, and the 1px gaps between opaque cells let it show through.
 */
export function SpotlightGrid({ className, children, ...props }: React.ComponentProps<'ul'>) {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const spot = React.useRef({ frame: 0, time: 0, x: 0, y: 0, targetX: 0, targetY: 0 })

  React.useEffect(() => () => cancelAnimationFrame(spot.current.frame), [])

  const paint = (x: number, y: number) => {
    wrapperRef.current?.style.setProperty('--spot-x', `${x}px`)
    wrapperRef.current?.style.setProperty('--spot-y', `${y}px`)
  }

  // Eases toward the pointer each frame, scaled by frame time so it feels the same at any refresh rate.
  const step = (time: number) => {
    const s = spot.current
    const ease = 1 - Math.exp(-(time - s.time) / SPOT_LAG_MS)
    s.time = time
    s.x += (s.targetX - s.x) * ease
    s.y += (s.targetY - s.y) * ease
    paint(s.x, s.y)
    s.frame = Math.abs(s.targetX - s.x) + Math.abs(s.targetY - s.y) > 0.5 ? requestAnimationFrame(step) : 0
  }

  const track = (event: React.PointerEvent<HTMLDivElement>, snap: boolean) => {
    const s = spot.current
    const rect = event.currentTarget.getBoundingClientRect()
    s.targetX = event.clientX - rect.left
    s.targetY = event.clientY - rect.top
    if (snap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cancelAnimationFrame(s.frame)
      s.frame = 0
      s.x = s.targetX
      s.y = s.targetY
      paint(s.x, s.y)
    } else if (!s.frame) {
      s.time = performance.now()
      s.frame = requestAnimationFrame(step)
    }
  }

  return (
    <div
      className="relative rounded-xl bg-border p-px before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-0 before:transition-opacity before:duration-500 before:ease-out hover:before:opacity-100 before:[background-image:radial-gradient(220px_circle_at_var(--spot-x)_var(--spot-y),var(--pkg),transparent_70%)]"
      onPointerEnter={(event) => track(event, true)}
      onPointerMove={(event) => track(event, false)}
      ref={wrapperRef}>
      <ul
        className={cn('relative grid list-none gap-px overflow-hidden rounded-[calc(var(--radius-xl)-1px)]', className)}
        {...props}>
        {children}
      </ul>
    </div>
  )
}
