---
"@gentleduck/registry-ui": patch
---

`MotionTableRow`, `MotionAlertTitle`, `MotionAlertDescription` and `MotionTypographyListItem` bring their own `LazyMotion`. They need no context from their motion root, so they can sit in the plain `Table`, `Alert` or list, where nothing loaded Motion's features and their entrance animation never ran.
