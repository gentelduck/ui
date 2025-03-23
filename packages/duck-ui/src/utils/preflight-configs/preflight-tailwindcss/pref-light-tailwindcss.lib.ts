import { execa } from 'execa'
import fg from 'fast-glob'
import fs from 'fs-extra'
import path from 'node:path'
import { Ora } from 'ora'
import { ZodError } from 'zod'
import { get_package_manager } from '../../get-package-manager'
import { IGNORED_DIRECTORIES } from '../../get-project-info'
import { highlighter } from '../../text-styling'
import { duckui_prompts_schema, PROJECT_TYPE } from '../preflight-duckui'
import {
  post_css_nextjs,
  tailwindcss_install_prompts,
  tailwindcss_poiler,
  tailwindcss_vite,
} from './pref-light-tailwindcss.constants'
import prompts from 'prompts'

export async function checkTailwindCssInstalled(cwd: string, spinner: Ora) {
  try {
    spinner.text = `${highlighter.info('Checking for TailwindCss...')}`

    const styles_files = await fg.async('**.css', {
      cwd,
      deep: 3,
      globstar: true,
      ignore: IGNORED_DIRECTORIES,
      objectMode: true,
    })

    let is_tailwind_installed: boolean = false

    // biome-ignore lint/style/useForOf: <explanation>
    for (let i = 0; i < styles_files.length; i++) {
      const file = styles_files[i]
      const content = await fs.readFile(
        path.join((file.dirent as never)['parentPath'], file.name),
        'utf-8',
      )
      is_tailwind_installed = content.includes('@import "tailwindcss"')
    }

    if (is_tailwind_installed) {
      spinner.text = `${highlighter.info('TailwindCss is already installed...')}`
      return is_tailwind_installed
    }

    return is_tailwind_installed
  } catch (error) {
    if (error instanceof ZodError) {
      spinner.fail(
        `${highlighter.error('Wrong Options..')}${highlighter.error(error.message)}`,
      )
    }

    spinner.fail(
      `${highlighter.error('TailwindCss is not installed...')}${highlighter.error(error as string)}`,
    )
    process.exit(0)
  }
}

export async function install_tailwindcss(cwd: string, spinner: Ora) {
  spinner.text = `${highlighter.info('Installing TailwindCSS...')}`

  spinner.stop()
  const options = await prompts(tailwindcss_install_prompts)

  const { project_type, css } = duckui_prompts_schema
    .pick({ project_type: true, css: true })
    .parse(options)
  spinner.start()

  if (!project_type || !css) {
    spinner.fail(`${highlighter.error('No project type selected...')}`)
    return
  }

  const packageManager = await get_package_manager(cwd)
  const { failed: installation_step_1 } = await execa(
    packageManager,
    [
      packageManager !== 'npm' ? 'install' : 'add',
      ...tailwindcss_dependencies(project_type, css, cwd),
    ],
    {
      cwd: cwd,
      shell: true,
    },
  )
  if (installation_step_1) return spinner.fail(`${installation_step_1}`)

  spinner.text = `${highlighter.info('TailwindCSS is installed...')}`
}

export const tailwindcss_dependencies = (
  project_type: (typeof PROJECT_TYPE)[number],
  css_path: string,
  cwd: string,
) => {
  try {
    switch (project_type) {
      case 'NEXT_JS':
        fs.writeFileSync(path.join(cwd, 'postcss.config.mjs'), post_css_nextjs)
        fs.writeFileSync(
          path.join(cwd, css_path, 'styles.css'),
          tailwindcss_poiler,
        )
        return ['tailwindcss', 'postcss', '@tailwindcss/postcss']

      case 'VITE':
      case 'TANSTACK_START':
        fs.writeFileSync(path.join(cwd, 'vite.config.ts'), tailwindcss_vite)
        fs.writeFileSync(
          path.join(cwd, css_path, 'styles.css'),
          tailwindcss_poiler,
        )
        return ['tailwindcss', '@tailwindcss/vite']

      default:
        fs.writeFileSync(path.join(cwd, 'vite.config.ts'), tailwindcss_vite)
        fs.writeFileSync(
          path.join(cwd, css_path, 'styles.css'),
          tailwindcss_poiler,
        )
        return ['tailwindcss', '@tailwindcss/vite']
    }
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}
