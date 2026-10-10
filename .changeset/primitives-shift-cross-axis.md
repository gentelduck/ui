---
"@gentleduck/primitives": minor
---

Add `shiftCrossAxis` to `PopperContent`. When `true`, collision shifting also corrects along the side's own axis (vertically for `top` and `bottom` placements), not just along the alignment axis. It defaults to `false`, so existing placements do not move.
