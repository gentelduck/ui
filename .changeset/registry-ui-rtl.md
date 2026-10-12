---
"@gentleduck/registry-ui": minor
---

Every component follows the direction set once with `DirectionProvider` or `<html dir>`. Physical sides (`left`/`right` on sheet, sidebar, toasts, and popups) mirror in RTL instead of staying put, arrows and chevrons flip where they point along the inline axis, and keyboard navigation in tabs, menubar, and calendar follows the visual order. Progress fills from the inline-start edge, charts keep their SVG labels anchored, carousel passes the direction to Embla, JSON stays LTR inside the JSON editor, and `Kbd` keeps key labels in typing order. Preview panel controls accept `zoomInText`, `zoomOutText`, and `resetText` for translated labels.
