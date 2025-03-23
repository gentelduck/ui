import fg from 'fast-glob'
import fs from 'fs-extra'
import path from 'node:path'
import { Ora } from 'ora'
import prompts from 'prompts'
import { get_registry_base_color } from '~/utils/get-registry'
import { IGNORED_DIRECTORIES } from '../../get-project-info'
import { highlighter } from '../../text-styling'
import {
  duckui_config_prompts,
  duckui_prompts,
} from './preflight-duckui.constants'
import {
  duckui_prompts_schema,
  preflight_duckui_options_schema,
} from './preflight-duckui.dto'
import { init_duckui_config } from './preflight-duckui.libs'

export async function preflight_duckui(cwd: string, spinner: Ora) {
  try {
    spinner.text = `Checking for ${highlighter.info('duck-ui')} config...`
    const files = fg.sync(['duck-ui.config.json'], {
      cwd,
      deep: 1,
      ignore: IGNORED_DIRECTORIES,
    })

    if (files.length) {
      spinner.text = `The ${highlighter.info('duck-ui')} config found...`
      return
    }

    spinner.stop()
    const options = await prompts(duckui_prompts)
    const { duckui } = preflight_duckui_options_schema.parse(options)
    spinner.start()

    if (!duckui) {
      spinner.text = `The required ${highlighter.info('duck-ui')} config not found...`
      process.exit(0)
    }

    spinner.text = `Initializing ${highlighter.info('duck-ui')} config...`
    spinner.stop()
    const config_options = await prompts(duckui_config_prompts)
    const parse_config_options = duckui_prompts_schema.parse(config_options)
    spinner.start()

    const theme_css = await get_registry_base_color('zinc')

    const exists = fs.existsSync(path.join(cwd, parse_config_options.css))
    if (exists) {
      const old_content = await fs.readFile(
        path.join(cwd, parse_config_options.css),
        'utf-8',
      )
      if (old_content.length > 20) {
        spinner.stop()
        const overwrite = await prompts({
          type: 'confirm',
          name: 'overwrite',
          message: `The ${highlighter.info(
            'duck-ui',
          )} config already exists, do you want to overwrite it?`,
        })
        spinner.start()

        if (overwrite) {
          fs.writeFileSync(
            path.join(cwd, parse_config_options.css),
            old_content + theme_css,
          )
        }
      }
    }

    fs.writeFileSync(path.join(cwd, parse_config_options.css), theme_css)

    await init_duckui_config(cwd, spinner, parse_config_options)
  } catch (error) {
    spinner.fail(
      `Failed to preflight required ${highlighter.error('duck-ui')} configs...\n ${highlighter.error(
        error as string,
      )}`,
    )
    process.exit(0)
  }
}
