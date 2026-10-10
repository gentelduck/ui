---
"@gentleduck/registry-build": patch
---

Fix the check that keeps output paths inside their base directory when the path runs through a symlink, as macOS's `/var` -> `/private/var` temp directories do. The base was resolved through symlinks but the candidate path was not, so a path inside the base could be rejected as outside it. The candidate is now resolved the same way, through its nearest existing ancestor.
