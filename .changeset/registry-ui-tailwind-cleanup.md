---
"@gentleduck/registry-ui": patch
---

Tailwind classes use their v4 forms: `size-*` instead of matching `h-*`/`w-*` pairs, `outline-hidden` instead of `outline-none`, and `focus-visible:` rings on close buttons, so a mouse click no longer leaves a focus ring. Popover, tooltip, hover card, and dropdown menu set their border colour with a class instead of an inline style, and the slider thumb uses `bg-background` so it follows the theme.
