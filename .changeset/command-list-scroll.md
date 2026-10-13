---
"@gentleduck/registry-ui": patch
---

`CommandList` caps the box that scrolls. The `max-h-75` limit and your `className` sat on the list inside the scroll area, so a long list spilled past the cap instead of scrolling; both now go on the viewport. The list also scrolls with the wheel and touch when it is portalled out of a modal, such as a combobox inside a dialog, where the modal's scroll lock used to swallow the gesture.
