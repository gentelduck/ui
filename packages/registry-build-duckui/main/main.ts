import { registry, registry_schema } from '@gentleduck/registers'
import { build_registry_index } from '../build-registry-index'
import { build_registry_components } from '../build-registry-components'
import { build_registry_tsx, write_index_tsx } from '../build-registry-tsx'
import { tsx_index } from './main.constants'
import { build_registry_styles_index } from '../build-registry-styles-index'
import { registry_build_colors } from '../build-registry-build-colors'
import { build_registry_home } from '../build-registry-home'
import { spinner as Spinner } from './main.lib'
import { styleText } from 'node:util'

export async function main() {
  const spinner = Spinner('')

  // 1- showing the home of the application
  await build_registry_home(spinner)

  spinner.start('🧭 Building the registry...')

  // 2- validate the registry with zod.
  spinner.text = '🧭 Validating the registry...'
  const registry_valid = registry_schema.safeParse(registry)

  if (!registry_valid.success) {
    spinner.fail('🚫 The registry is not valid!')
    process.exit(1)
  }

  // 3- build the registry index.
  const index = await build_registry_index({
    registry: registry_valid.data,
    spinner,
  })
  if (!index) return

  // 4- build components and registry and styles
  let tsx_content: string
  tsx_content = tsx_index

  for (const item of index) {
    // 1- build the components in the public folder.
    await build_registry_components({
      item,
      spinner,
      registry_count: index.length,
      idx: index.indexOf(item),
    })
    // 2- build the __registry__/
    tsx_content += await build_registry_tsx({ item, spinner })

    // 3- build the styles index.json
    await build_registry_styles_index({ item, spinner })
  }
  // 4- write the index.tsx
  await write_index_tsx({ tsx_content, spinner })

  // 5- build registry colors
  await registry_build_colors({ spinner })

  spinner.succeed(styleText('green', `🎉 Registry built successfully!`))
}
