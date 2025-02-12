import { loadConfig } from 'tsconfig-paths'
import { logger } from '../logger'
import { explorer } from './get-project-config.constants'
import { resolve_import } from '../resolve-import'
import {
  config_cchema,
  raw_config_schema,
  RawConfigType
} from './get-project-config.dto'
import path from 'path'
import {
  get_tailwindcss_file,
  get_ts_config_alias_prefix
} from '../get-project-info'
import { checkTypeScriptInstalled } from '../checkers'
import { get_project_type } from '../get-project-type'

export async function get_raw_config(
  cwd: string
): Promise<RawConfigType | null> {
  try {
    const rawConfig = await explorer.search(cwd)
    if (!rawConfig) {
      return null
    }

    return raw_config_schema.parse(rawConfig.config)
  } catch (error) {
    logger.error(`Invalid configuration found in ${cwd}/components.json.`)
    process.exit(1)
  }
}

export async function get_config(cwd: string) {
  const config = await get_raw_config(cwd)

  if (!config) {
    return null
  }

  return await resolve_config_paths(cwd, config)
}

// Resolve Config Paths
export async function resolve_config_paths(cwd: string, config: RawConfigType) {
  const ts_config = loadConfig(cwd)

  if (ts_config.resultType === 'failed') {
    return logger.error(
      `Failed to leaod ${config.tsx ? 'tsconfig' : 'jsconfig'}.json. ${ts_config.message ?? ''}`.trim()
    )
  }

  return config_cchema.parse({
    ...config,
    resolvedPaths: {
      tailwindConfig: path.resolve(cwd, config.tailwind.config),
      tailwindCss: path.resolve(cwd, config.tailwind.css),
      utils: await resolve_import(config.aliases.utils, ts_config),
      components: await resolve_import(config.aliases.components, ts_config),
      ui: config.aliases.ui
        ? await resolve_import(config.aliases.ui, ts_config)
        : await resolve_import(config.aliases.components, ts_config)
    }
  })
}

export async function get_project_config(cwd: string) {
  const project_config = get_config(cwd)

  if (project_config) {
    return project_config
  }

  const project_type = await get_project_type(cwd)
  const tailwindcss_file = await get_tailwindcss_file(cwd)
  const ts_config_alias_prefix = await get_ts_config_alias_prefix(cwd)

  if (!project_type || !tailwindcss_file || !ts_config_alias_prefix) {
    return null
  }

  const is_tsx = await checkTypeScriptInstalled(cwd)

  const config: RawConfigType = {
    $schema: 'https://duckui.vercel.app/schema.json',
    rsc: ['next-app', 'next-app-src'].includes(project_type),
    tsx: is_tsx,
    style: 'default',
    tailwind: {
      config: is_tsx ? 'tailwind.config.ts' : 'tailwind.config.js',
      baseColor: 'zinc',
      css: tailwindcss_file,
      cssVariables: true,
      prefix: ''
    },
    aliases: {
      utils: `${ts_config_alias_prefix}/lib/utils`,
      components: `${ts_config_alias_prefix}/components`
    }
  }

  return resolve_config_paths(cwd, config)
}
