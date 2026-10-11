---
"@gentleduck/registry-ui": patch
---

`unsafeHtml` takes priority over `children` whenever it is passed, as its docs say. `PreviewPanel`, `MotionPreviewPanel` and `PreviewPanelDialog` tested its truthiness, so `unsafeHtml=""` rendered `children` instead.
