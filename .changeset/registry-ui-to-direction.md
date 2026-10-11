---
"@gentleduck/registry-ui": patch
---

`toDirection` accepts only `ltr` and `rtl`. It checked `dir in DIRECTION_DICTIONARY`, which also matches keys inherited from `Object.prototype`, so `toDirection('toString')` returned `'toString'` as a direction.
