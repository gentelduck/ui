}>
  **duck-vim** is a keyboard shortcut engine for the browser. Registry-based commands, multi-key sequences, cross-platform <Kbd>Mod</Kbd> key, key recording, and display formatting. Under 5 KB gzipped.

## What is duck-vim?

duck-vim is a keyboard shortcut engine for the browser. Shortcuts are declared in a registry rather than hardcoded in event handlers. That makes them discoverable through command palettes, customizable per user, and composable into multi-key sequences like <Kbd>g</Kbd> then <Kbd>d</Kbd>.

The core is plain DOM with zero dependencies. React bindings sit on top as an optional layer.

***

## Why duck-vim?

Most keyboard shortcut libraries cover <Kbd>Ctrl+K</Kbd> to a function and stop. duck-vim also handles:

* **Multi-key sequences** like Vim's <Kbd>g</Kbd>+<Kbd>d</Kbd> (press <Kbd>g</Kbd>, then <Kbd>d</Kbd> within a timeout).
* **Prefix awareness** so the UI can show a "waiting for next key..." state.
* **Cross-platform Mod key** that resolves to <Kbd>Cmd</Kbd> on Mac and <Kbd>Ctrl</Kbd> elsewhere.
* **Scoped bindings** attached to specific DOM elements, not just `document`.
* **A key recorder** for settings UIs where users define their own shortcuts.
* **Display formatting** that renders `Mod+Shift+S` as <Kbd>Cmd+Shift+S</Kbd> on Mac and <Kbd>Ctrl+Shift+S</Kbd> on Windows.

}>
  All of the above fit under 5 KB gzipped.

***

## Architecture

duck-vim is organized into independent modules:

| Module | Purpose | Framework dependency |
| --- | --- | --- |
| `platform` | OS detection, Mod key resolution | None |
| `parser` | Parse and validate key binding strings | None |
| `matcher` | Match keyboard events against parsed bindings | None |
| `command` | Registry + KeyHandler for managing shortcuts | None |
| `sequence` | Multi-step sequence manager | None |
| `recorder` | Record key combinations for settings UIs | None |
| `format` | Format bindings for display (<Kbd>Cmd+S</Kbd>, <Kbd>Ctrl+S</Kbd>) | None |
| `react` | Provider, hooks, and context for React apps | React |

}>
  Every module except `react` is pure DOM. You can use any subset.

***

## Quick links

}>
  * [Getting Started](/duck-vim/getting-started) - Install and run your first shortcut.
  * [Core Concepts](/duck-vim/concepts) - Key descriptors, sequences, prefixes, the Mod key.
  * [API Reference](/duck-vim/api) - Full API for every module.
  * [Guides](/duck-vim/guides) - Recipes for common patterns.
  * [Course](/duck-vim/course) - Tutorial from zero to advanced.

***

## Installation

npm
pnpm
yarn

```bash
npm install @gentleduck/vim
```

```bash
pnpm add @gentleduck/vim
```

```bash
yarn add @gentleduck/vim
```

```ts
// Core (framework-agnostic)
import { Registry, KeyHandler } from '@gentleduck/vim/command'
import { parseKeyBind } from '@gentleduck/vim/parser'
import { formatForDisplay } from '@gentleduck/vim/format'

// React bindings
import { KeyProvider, useKeyBind, useKeySequence } from '@gentleduck/vim/react'
```

***

## Minimal example

```ts
import { Registry, KeyHandler } from '@gentleduck/vim/command'

const registry = new Registry()
const handler = new KeyHandler(registry)

registry.register('mod+k', {
  name: 'Open Palette',
  execute: () => document.getElementById('palette')?.focus(),
})

handler.attach(document)
```

}>
  Press <Kbd>Mod+K</Kbd> and the command fires. No React, no framework, no config files.