---
"@gentleduck/registry-ui": patch
---

`SheetContent` renders its children before the close button, so the absolutely positioned button stays on top of full-bleed content and comes after it in tab order.
