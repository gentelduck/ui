import path from 'node:path'
import fg from 'fast-glob'
import fs from 'fs-extra'
import type { Ora } from 'ora'
import type { PackageJson } from 'type-fest'
import { ZodError } from 'zod'
import { duckUiSchema } from '../preflight-configs/preflight-duckui'
import { highlighter, logger } from '../text-styling'
import { findDuckuiRootCwd } from '../workspace'
import { IGNORED_DIRECTORIES } from './get-project-info.constants'
import { tsConfigSchema } from './get-project-info.dto'

export function getPackageJson(): PackageJson | null {
  const files = fg.sync(['package.json'], {
    cwd: process.cwd(),
    deep: 1,
    ignore: IGNORED_DIRECTORIES,
  })

  if (!files.length) {
    logger.error({ args: ['package.json not found'] })
    process.exit(1)
  }

  const packageJsonPath = path.join(process.cwd(), 'package.json')

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')) as PackageJson

  return packageJson
}

export async function getDuckuiConfig(cwd: string, spinner: Ora) {
  try {
    spinner.text = `Reading ${highlighter.info('duck-ui.config.json')}...`

    const configRoot = findDuckuiRootCwd(cwd)
    if (!configRoot) {
      spinner.fail(
        `No ${highlighter.info('duck-ui.config.json')} found here or in a parent folder.\nCreate one with ${highlighter.info('npx @gentleduck/cli init')} (or ${highlighter.info('bunx @gentleduck/cli init')}).\nRun ${highlighter.info('npx @gentleduck/cli --help')} for every command. Having issues? ${highlighter.info('https://github.com/gentleeduck/duck-ui/issues')}`,
      )
      process.exit(1)
    }

    const duckuiConfigRaw = await fs.readFile(path.join(configRoot, 'duck-ui.config.json'), 'utf8')

    let duckuiConfig: unknown
    try {
      duckuiConfig = JSON.parse(duckuiConfigRaw)
    } catch {
      spinner.fail(`${highlighter.info('duck-ui.config.json')} is not valid JSON. Fix the file and try again.`)
      process.exit(1)
    }
    const duckuiParsedConfig = duckUiSchema.safeParse(duckuiConfig)
    if (duckuiParsedConfig.error) {
      const isLegacyConfig = duckuiParsedConfig.error.issues.some(
        (issue) => issue.path[0] === 'workspace' && issue.code === 'invalid_type',
      )

      if (isLegacyConfig) {
        spinner.fail(
          `Legacy ${highlighter.info('duck-ui.config.json')} detected (missing ${highlighter.info(
            'workspace',
          )}). Re-run ${highlighter.info('npx @gentleduck/cli init')} to migrate.`,
        )
        process.exit(1)
      }

      spinner.stop()
      console.dir(duckuiParsedConfig.error, { depth: null })
      spinner.fail(
        `${highlighter.info('duck-ui.config.json')} does not match the expected shape; the issues are listed above.`,
      )
      process.exit(1)
    }

    return duckuiParsedConfig.data
  } catch (error) {
    if (error instanceof ZodError) {
      spinner.fail(`Could not read ${highlighter.info('duck-ui.config.json')}: ${error.message}`)
    } else {
      spinner.fail(`Could not read ${highlighter.info('duck-ui.config.json')}: ${error}`)
    }

    process.exit(1)
  }
}

export async function getTsConfig(cwd: string, spinner: Ora) {
  try {
    spinner.text = `Getting ${highlighter.info('ts')} configs...`

    const files = fg.sync(['tsconfig.json'], {
      cwd,
      deep: 1,
      ignore: IGNORED_DIRECTORIES,
    })

    if (!files.length) {
      spinner.fail(`No ${highlighter.info('tsconfig.json')} found in this folder.`)
      process.exit(1)
    }

    const tsConfigRaw = await fs.readFile(path.join(cwd, 'tsconfig.json'), 'utf8')

    const tsConfig = tsConfigSchema.parse(JSON.parse(tsConfigRaw))

    return tsConfig
  } catch (error) {
    spinner.fail(`Could not read ${highlighter.info('tsconfig.json')}: ${error}`)
    process.exit(1)
  }
}
