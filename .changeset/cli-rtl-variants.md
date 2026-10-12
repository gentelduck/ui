---
"@gentleduck/cli": patch
---

When `init` sets up Tailwind CSS, the CSS file it writes now includes `rtl` and `ltr` custom variants. The nearest `dir` wins, so an LTR section inside an RTL page drops its `rtl:` styles. They use `[dir]` attribute selectors because Tailwind's CSS optimizer rewrites `:dir()` to `:lang()`.
