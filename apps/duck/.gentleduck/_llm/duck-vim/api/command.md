}>
  The **Registry** and **KeyHandler** classes form the core of duck-vim's shortcut system. Register commands with key bindings and let the KeyHandler dispatch them automatically.

```ts
import { Registry, KeyHandler } from '@gentleduck/vim/command'
import type { Command, KeyBindOptions, RegistrationHandle, RegistryEntry } from '@gentleduck/vim/command'
```

## Types

### `Command`

```ts
interface Command {
  name: string
  description?: string
  execute: <T>(args?: T) => void | Promise<void>
}
```

The `name` field is used for debugging, command palette display, and logging. The `execute` function is called when the binding matches.

### `KeyBindOptions`

Per-binding options that control behavior when matched.

```ts
interface KeyBindOptions {
  enabled?: boolean              // Default: true
  preventDefault?: boolean       // Default: false
  stopPropagation?: boolean      // Default: false
  ignoreInputs?: boolean         // Default: false
  eventType?: 'keydown' | 'keyup' // Default: 'keydown'
  requireReset?: boolean         // Default: false
  conflictBehavior?: 'warn' | 'error' | 'replace' | 'allow' // Default: 'warn'
}
```

### `RegistrationHandle`

Returned from `registry.register()`. Use this to manage the binding's lifecycle.

```ts
interface RegistrationHandle {
  unregister: () => void
  setEnabled: (enabled: boolean) => void
  isEnabled: () => boolean
  resetFired: () => void
}
```

### `RegistryEntry`

Internal storage entry. Access via `registry.getEntry()`.

```ts
interface RegistryEntry {
  command: Command
  options: KeyBindOptions
  fired: boolean
}
```

***

## `Registry`

The registry holds all key binding to command mappings. It also tracks sequence prefixes.

### `constructor(debug?)`

```ts
new Registry(debug?: boolean)
```

Pass `true` to enable debug logging to the console.

### `register(key, command, options?)`

Registers a command for a key sequence. Returns a `RegistrationHandle`.

```ts
registry.register(key: string, command: Command, options?: KeyBindOptions): RegistrationHandle
```

**Conflict behavior:**

If the key is already registered, the `conflictBehavior` option controls what happens:

| Value | Behavior |
| --- | --- |
| `'warn'` (default) | Logs a warning and replaces the binding |
| `'error'` | Throws an error |
| `'replace'` | Silently replaces |
| `'allow'` | Silently replaces |

}>
  The default conflict behavior is `'warn'`, which replaces the existing binding and logs a warning. If you want to prevent accidental overwrites, use `'error'` to throw instead.

**Example:**

```ts
const handle = registry.register('mod+k', {
  name: 'Open Palette',
  execute: () => openPalette(),
}, { preventDefault: true })

// Later: disable without unregistering
handle.setEnabled(false)

// Later: remove completely
handle.unregister()
```

### `unregister(key)`

Removes the command at the given key. Returns `true` if something was removed.

```ts
registry.unregister(key: string): boolean
```

### `hasCommand(key)`

```ts
registry.hasCommand(key: string): boolean
```

### `getCommand(key)`

```ts
registry.getCommand(key: string): Command | undefined
```

### `getEntry(key)`

Returns the full entry including options and fired state.

```ts
registry.getEntry(key: string): RegistryEntry | undefined
```

### `getOptions(key)`

```ts
registry.getOptions(key: string): KeyBindOptions | undefined
```

### `isPrefix(key)`

Returns `true` if the key is a prefix of any registered sequence. For example, if `g+d` is registered, `isPrefix('g')` returns `true`.

```ts
registry.isPrefix(key: string): boolean
```

### `getAllCommands()`

Returns a `Map<string, Command>` of all registered commands.

```ts
registry.getAllCommands(): Map<string, Command>
```

} className="[&_div]:w-full">
  Useful for building command palettes:

  ```ts
  const commands = registry.getAllCommands()
  for (const [binding, cmd] of commands) {
    console.log(`${cmd.name}: ${binding}`)
  }
  ```

### `clear()`

Removes all registered commands.

```ts
registry.clear(): void
```

***

## `KeyHandler`

Listens for keyboard events and dispatches commands from the registry.

### `constructor(registry, timeoutMs?, defaultOptions?)`

```ts
new KeyHandler(registry: Registry, timeoutMs?: number, defaultOptions?: Partial<KeyBindOptions>)
```

* `timeoutMs` (default: 600) controls how long the handler waits between keys in a sequence.
* `defaultOptions` are merged with each binding's options (binding options take precedence).

### `attach(target?)`

Starts listening for `keydown` events on the target.

```ts
handler.attach(target?: HTMLElement | Document) // defaults to document
```

### `detach(target?)`

Stops listening.

```ts
handler.detach(target?: HTMLElement | Document) // defaults to document
```

***

## Matching flow

When a key is pressed, the KeyHandler follows this process:

Builds a key descriptor from the event.

Appends it to the internal sequence buffer.

Checks for a full match in the registry. If found, executes the command and resets.

Checks for a prefix match. If found, starts the timeout timer.

If no match and no prefix, resets the buffer and retries with just the current key.

If still no match, resets completely.

***

## Complete example

```ts
import { Registry, KeyHandler } from '@gentleduck/vim/command'

const registry = new Registry(process.env.NODE_ENV === 'development')
const handler = new KeyHandler(registry, 600, {
  ignoreInputs: true,  // default for all bindings
})

// Single-key shortcut
registry.register('mod+k', {
  name: 'Command Palette',
  execute: () => togglePalette(),
}, { preventDefault: true })

// Multi-key sequence
registry.register('g+d', {
  name: 'Go to Dashboard',
  execute: () => navigate('/dashboard'),
})

// One-shot binding (fires once until resetFired is called)
const saveHandle = registry.register('mod+s', {
  name: 'Save',
  execute: () => save(),
}, { preventDefault: true, requireReset: true })

// After save completes, allow it to fire again
async function save() {
  await saveDocument()
  saveHandle.resetFired()
}

handler.attach(document)
```

}>
  Use `requireReset: true` for actions that should only fire once per invocation (like saving). Call `handle.resetFired()` when the action completes to allow the binding to fire again.