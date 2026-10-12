---
"@gentleduck/primitives": patch
"@gentleduck/registry-ui": patch
---

The navigation menu viewport measures its content before the first paint, so opening a menu no longer flashes an empty 0x0 box for a frame. The styled viewport also fades as it zooms in and out.
