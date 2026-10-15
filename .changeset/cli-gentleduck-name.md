---
"@gentleduck/cli": patch
---

The CLI calls itself by its npm name: the banner reads `🦆 @gentleduck/cli <version>` instead of `duck-cli`, and the theme hints say `npx @gentleduck/cli theme add <name>`. The message for a project without a `duck-ui.config.json` is rewritten: it names the file it looked for, shows `bunx` and `npx` forms of `init`, and links the duck-ui issue tracker. The config and `tsconfig.json` errors name those files instead of "duckui configs" and "ts configs".
