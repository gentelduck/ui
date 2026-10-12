---
"@gentleduck/registry-ui": patch
---

Components share one motion language. Popups and dialogs set enter and exit durations with `animation-duration-*` (200ms in and 150ms out; 300ms and 200ms for dialogs and sheets) on the shared `--gentleduck-motion-ease`. Transitions name the properties they animate instead of `transition-all`, and the sidebar, accordion, and collapsible use the same easing. Motion popovers use `springBouncy`, alert dialogs `springStiff` for both overlay and content, and the motion sheet overlay `tweenSlow`.
