---
"@gentleduck/registers": patch
---

The `sheet` item depends on `direction`, since the motion sheet now imports its helpers. Adding `sheet` installs `direction` too instead of leaving a broken import.
