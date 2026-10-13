---
"@gentleduck/registry-ui": patch
---

`Input` is `h-9`, the height of the `Select` trigger, `Button` and `InputGroup` it sits beside in a form row or a button group; it was `h-8`. `Input`, `Textarea`, the `Select` and `MotionSelect` triggers and the default `Button` share one `shadow-xs`, where the select and button used `shadow-sm` and the input and textarea had none.
