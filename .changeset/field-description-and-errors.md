---
"@gentleduck/registry-ui": patch
---

`FieldDescription` is `text-xs` and, together with `FieldError`, tucks up against the label or control above it in a vertical `Field`. `FieldError` skips entries without a `message`: one message renders as plain text, several as a list, and none renders nothing, where an array of empty entries used to render an empty list.
