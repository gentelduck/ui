---
"@gentleduck/registry-ui": patch
---

`ScrollArea` shows the native scrollbar again. The viewport hard-coded `scrollbar-none`, so content scrolled with no visible bar, and a `viewportClassName` could not bring it back. The bar now uses your global `::-webkit-scrollbar` styles; pass `viewportClassName="scrollbar-none"` to hide it.
