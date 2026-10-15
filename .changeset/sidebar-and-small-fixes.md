---
"@gentleduck/registry-ui": patch
---

`Sidebar` and `MotionSidebar` sit at `z-5` instead of `z-10`. `SidebarInset` has `min-w-0`, so wide content such as a table scrolls inside it instead of pushing the page wider, and a hidden `SidebarGroupLabel` in icon mode no longer takes clicks. `Badge` size `sm` uses `.75rem` text. Chart tooltip and legend icons keep a `size-*` class you give them instead of being forced to the default size.
