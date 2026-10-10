---
"@gentleduck/registry-ui": patch
---

- Disabled and `aria-disabled` controls show a `cursor-not-allowed` cursor. They relied on `pointer-events-none` alone, which hid the cursor instead of showing that the control is disabled.
- An icon inside a component can be resized with its own `size-*` class, without `!`. The components' default `[&_svg]:size-4` now steps aside when the icon carries a size.
- The `Switch` thumb grows from the correct side in left-to-right layouts. Its transform origins were the right-to-left ones; they now follow the direction.
- `PopoverArrow`'s props no longer reference the primitive's internal `Scope` type, which made declaration emit non-portable.
