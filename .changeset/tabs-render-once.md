---
"@gentleduck/registry-ui": minor
---

`TabsContent` takes `renderOnce`: the panel mounts the first time its tab opens and then stays mounted, hidden, so form input, scroll position, and fetched data survive tab switches. `forceMount` now keeps a panel mounted from the start, before its tab is ever opened. Kept panels get `display: none` and `aria-hidden`.

By default an inactive panel now unmounts. Before, every panel stayed mounted after its first open no matter which props you passed. If you relied on that to keep state across tab switches, add `renderOnce`.
