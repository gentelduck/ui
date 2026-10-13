---
"@gentleduck/registry-ui": minor
---

`PreviewPanel` and `MotionPreviewPanel` start locked: the wheel over a panel scrolls the page it sits in instead of zooming, and drag and pinch do nothing until the user presses the new lock button beside the zoom controls. The zoom buttons work either way. Pass `defaultLocked={false}` where the panel is the page's main content, and `lockText` and `unlockText` to translate the button. A new `actions` prop renders your own buttons in the toolbar before the zoom controls, and still renders with `showControls={false}`.

`PreviewPanelDialog` puts its fullscreen button in that toolbar instead of over the bottom corner of the content, takes the same `defaultLocked`, `lockText` and `unlockText` for its inline panel, and opens the fullscreen panel unlocked.

If a panel relied on the wheel zooming straight away, add `defaultLocked={false}`.
