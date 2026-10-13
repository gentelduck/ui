---
"@gentleduck/registry-ui": patch
---

`Breadcrumb` keeps an `aria-label` you pass instead of overwriting it with `breadcrumb`, which stays the default. Its type drops the `separator` prop, which the component never read; if you passed one, remove it and pass `BreadcrumbSeparator` children as before.
