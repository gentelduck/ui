---
"@gentleduck/calendar": patch
---

In RTL the day grid runs right to left, so ArrowLeft and ArrowRight now swap to follow it. `useKeyboard` takes a `direction` option, and `useCalendar` passes the locale's direction to it.
