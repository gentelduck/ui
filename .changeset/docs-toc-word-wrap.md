---
"@gentleduck/docs": patch
---

Stop the on-page table of contents from splitting words mid-character. Long entries such as `throwError(code, meta?)` broke as `throwError(code, m` / `eta?)`; they now wrap between words, and split inside a word only when a single run cannot fit.
