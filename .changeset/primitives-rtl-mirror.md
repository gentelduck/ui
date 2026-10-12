---
"@gentleduck/primitives": minor
---

Set the direction once and every primitive follows it. `useDirection` now falls back to `<html dir>` (and updates when it changes) after the `dir` prop and the nearest `DirectionProvider`, and `DirectionProvider` renders its wrapper with `display: contents` so it no longer affects layout.

Popper `side="left"` and `side="right"` now mirror in RTL, like every other physical side, so tooltips, popovers, hover cards, and menus open toward the same edge they would in LTR. Callers that flipped `side` themselves for RTL should drop that, or the side flips twice. Submenus always pass `side="right"` and let the popper mirror it, the transform origin follows Floating UI's RTL alignment, menubar arrow keys follow the visual order, and a `dir` passed to `DialogContent` or `DialogOverlay` overrides the root's.
