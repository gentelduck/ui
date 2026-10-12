---
"@gentleduck/cli": minor
---

`add` imports the stylesheets a component ships. When a registry item includes a `.css` file (such as `typeset`), the CLI writes it next to the component and adds an `@import` for it to your Tailwind CSS file, right after the Tailwind import. Running `add` again never duplicates the import.
