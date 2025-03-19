import type { UnpluginContextMeta, UnpluginFactory } from 'unplugin'
import type { Options } from './plugin.types'
import { createUnplugin } from 'unplugin'

export const meta: UnpluginContextMeta = {
  framework: 'vite',
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
  options,
  meta,
) => ({
  name: '@gentelduck/cn',
  transformInclude(id) {
    return id.endsWith('main.ts')
  },
  transform(code) {
    console.log('this is the code from the plugin')
    console.log(code.slice(0, 10))
    return code.replace('__UNPLUGIN__', `Hello Unplugin! ${options}`)
  },
})

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)
