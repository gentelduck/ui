---
"@gentleduck/motion": patch
---

`AnimVariants` transitions only opacity and transforms instead of `transition-all`, so a theme switch no longer fades components while the rest of the page changes instantly. `tweenExit` is now 150ms to match the CSS exit duration, and `checkersStylePattern` drops the duplicated padding and border radius on checkbox, radio, and switch.
