---
"@gentleduck/registers": patch
---

Make every registry-ui item declare what its files import, so `duck add` installs it whole. 31 components imported `../direction/direction.libs` without depending on `direction`, 12 imported `_internal` helpers that no item shipped, and 52 imported packages such as `motion`, `@gentleduck/motion` and `@gentleduck/vim` without declaring them. The new `motion-shell` and `shortcut-binder` items ship the two helpers, and a test now fails when an item imports a file or package its install does not put in place.
