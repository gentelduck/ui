import type { UnpluginFactory } from 'unplugin'
import type { Options } from './plugin.types'
import { createUnplugin } from 'unplugin'
import MagicString from 'magic-string'

export const unpluginFactory: UnpluginFactory<Options | undefined> = () => ({
  name: '@gentelduck/cn',

  transformInclude(id) {
    return (
      id.endsWith('.ts') ||
      id.endsWith('.tsx') ||
      id.endsWith('.js') ||
      id.endsWith('.jsx')
    )
  },

  transform(code) {
    console.log('Processing file with @gentelduck/cn plugin')

    const s = new MagicString(code)

    // Match all `cn("class-name ...")` instances
    const cnRegex = /cn\((".*?")\)/g

    let match
    while ((match = cnRegex.exec(code)) !== null) {
      const fullMatch = match[0]
      const innerString = match[1]

      // Replace `cn(...)` with its inner string
      s.overwrite(match.index, match.index + fullMatch.length, innerString!)
    }

    return {
      code: s.toString(),
      map: s.generateMap({ hires: true }), // Optional source map
    }
  },
})

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)
