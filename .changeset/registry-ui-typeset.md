---
"@gentleduck/registry-ui": minor
---

Add `Typeset`, prose styles for rendered HTML and markdown such as docs pages, blog posts, and streamed AI replies. Wrap content in `<Typeset>` (or add the `typeset` class) and headings, lists, tables, code, and quotes get consistent sizes and spacing driven by three variables: `--typeset-size`, `--typeset-leading`, and `--typeset-flow`. Blocks only take a top margin, so streamed content never shifts what is already on screen. Opt a subtree out with `not-typeset`. The styles ship as `@gentleduck/registry-ui/typeset.css`.
