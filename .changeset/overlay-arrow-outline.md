---
"@gentleduck/registry-ui": patch
---

The `TooltipArrow`, `PopoverArrow`, `HoverCardArrow` and `DropdownMenuArrow` outline is 1px, like the content border it meets, and is drawn over the fill so the line sits on the curve instead of outside it. The fill comes from `--popover` directly, so the arrow no longer needs the `fill-popover` class.
