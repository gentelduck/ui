---
"@gentleduck/primitives": patch
---

`SelectValue` shows its placeholder again when the value clears, and shows string children given while an item is picked. `SelectItemText` portals the picked item's text into the value span, and React wrote a lone string child into that text node, so the string left with the item and the trigger went blank.
