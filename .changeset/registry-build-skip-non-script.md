---
"@gentleduck/registry-build": patch
---

Registry builds copy CSS and JSON files unchanged. They were parsed as TSX to strip source variables, which dropped their leading comment.
