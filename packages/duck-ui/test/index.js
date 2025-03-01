#!/usr/bin/env node
import { Command as Re } from 'commander'
var h = {
    name: 'duck-ui',
    description: 'This is the main file of the duck-ui CLI application written with TypeScript',
    version: '1.0.0',
  },
  j = 'https://duckui.vercel.app/registry'
import { Command as ke } from 'commander'
var D = {
  name: 'init',
  description: 'init the project',
  options: {
    option_1: { flags: '-y, --yes', description: 'skip confirmation prompt.', defaultValue: !1 },
    option_2: { flags: '-d, --defaults,', description: 'use default configuration.', defaultValue: !1 },
    option_3: {
      flags: '-c, --cwd <cwd>',
      description: 'the working directory. defaults to the current directory.',
      defaultValue: process.cwd(),
    },
    option_4: { flags: '-s, --silent', description: 'silent mode', defaultValue: !1 },
    option_5: { flags: '-f, --force', description: 'will force and overwrite old configurations.', defaultValue: !1 },
    option_6: {
      flags: '-sd, --src-dir <src-dir>',
      description: 'the source directory. defaults to the current directory.',
      defaultValue: process.cwd(),
    },
  },
}
import je from 'path'
import { z as f } from 'zod'
var L = f.object({
  yes: f.boolean().default(!1),
  defaults: f.boolean().default(!1),
  cwd: f.string().default(process.cwd()),
  slint: f.boolean().default(!1),
  force: f.boolean().default(!1),
  srcDir: f.string().default(process.cwd()),
})
var p = ['**/node_modules', '**/.git', '**/dist', '**/.next', '**/build', '**/coverage', '**/public']
import We from 'fs-extra'
import Mt from 'fast-glob'
import l from 'kleur'
import Pt from 'log-symbols'
var { error: $t, warning: Nt, info: Ot, success: Dt } = Pt,
  i = {
    error: ({ with_icon: t = !0, args: e }) => (
      console.log(l.red([t ? $t : '', 'ERROR:'].join(' ')), l.red(e.join(' '))), i
    ),
    warn: ({ with_icon: t = !0, args: e }) => (
      console.log(l.yellow([t ? Nt : '', 'WARN:'].join(' ')), l.yellow(e.join(' '))), i
    ),
    info: ({ with_icon: t = !0, args: e }) => (
      console.log(l.green([t ? Ot : '', 'INFO:'].join(' ')), l.green(e.join(' '))), i
    ),
    success: ({ args: t, with_icon: e }) => (
      console.log(l.green([e ? Dt : '', 'SUCCESS:'].join(' ')), l.green(t.join(' '))), i
    ),
    break: () => (console.log(''), i),
  }
import {
  cyan as Lt,
  green as Ut,
  red as Vt,
  yellow as Jt,
  bgRed as At,
  bgYellow as Ft,
  bgGreen as zt,
  bgCyan as Gt,
} from 'kleur/colors'
var c = { error: Vt, bg_error: At, warn: Jt, bg_warn: Ft, success: Ut, bg_success: zt, info: Lt, bg_info: Gt }
async function U(t) {
  return !!Mt.globSync('tailwind.config.*', { cwd: t, deep: 3, ignore: p }).length
}
import { createMatchPath as Wt } from 'tsconfig-paths'
async function d(t, e) {
  return Wt(e.absoluteBaseUrl, e.paths)(t, void 0, () => !0, ['.ts', '.tsx'])
}
import V from 'fast-glob'
import J from 'fs-extra'
import A from 'path'
import { loadConfig as Yt } from 'tsconfig-paths'
async function F(t) {
  let e = V.sync(['**/*.css', '**/*.scss', '**/*.sass'], { cwd: t, deep: 3, ignore: p })
  if (!e.length) return null
  for (let r of e) {
    let n = await J.readFile(A.resolve(t, r), 'utf8')
    if (n.includes('@tailwind base') || n.includes('@tailwind components') || n.includes('@tailwind utilities'))
      return r
  }
  return null
}
async function z(t) {
  let e = Yt(t)
  if (e.resultType === 'failed' || !e.paths) return null
  for (let [r, n] of Object.entries(e.paths)) if (n.includes('./src/*') || n.includes('./*')) return r.at(0)
  return null
}
function G() {
  if (!V.sync(['package.json'], { cwd: process.cwd(), deep: 1, ignore: p }).length)
    return i.error({ args: ['package.json not found'] }), process.exit(1)
  let e = A.join(process.cwd(), 'package.json')
  return JSON.parse(J.readFileSync(e, 'utf8'))
}
import re from 'chalk'
import ie from 'fs-extra'
import { loadConfig as ne } from 'tsconfig-paths'
import { cosmiconfig as Bt } from 'cosmiconfig'
var M = Bt('duck-ui', { searchPlaces: ['duck-ui.config.js', 'duck-ui.config.ts'] }),
  W = t => `export default ${JSON.stringify(t, null, 2)};
`
import { z as s } from 'zod'
var k = s
    .object({
      $schema: s.string().optional(),
      style: s.string(),
      rsc: s.coerce.boolean().default(!1),
      tsx: s.coerce.boolean().default(!0),
      tailwind: s.object({
        config: s.string(),
        css: s.string(),
        baseColor: s.string(),
        cssVariables: s.boolean().default(!0),
        prefix: s.string().default('').optional(),
      }),
      aliases: s.object({
        components: s.string(),
        hooks: s.string().optional(),
        pages: s.string().optional(),
        utils: s.string(),
        lib: s.string().optional(),
        ui: s.string().optional(),
      }),
    })
    .strict(),
  Y = k.extend({
    resolvedPaths: s.object({
      tailwindConfig: s.string(),
      tailwindCss: s.string(),
      utils: s.string(),
      components: s.string(),
      ui: s.string(),
    }),
  })
import S from 'path'
import Kt from 'fast-glob'
var B = {
  type: 'NEXT_JS',
  detect: async t => !!(await Kt.glob('**/*', { cwd: t, deep: 3, ignore: p })).find(n => n.includes('next.config')),
}
var T = (a => (
    (a.NEXT_JS = 'Next.js'), (a.VITE = 'Vite'), (a.CREATE_REACT_APP = 'Create React App'), (a.UNKNOWN = 'Unknown'), a
  ))(T || {}),
  K = [B]
async function x(t) {
  for (let e of K) if (await e.detect(t)) return e.type
  return 'UNKNOWN'
}
import { z as Xt } from 'zod'
function X(t) {
  return Object.values(t)
}
var qt = X(T),
  Eo = Xt.enum([...qt])
import oe from 'prompts'
import Qt from 'fast-glob'
import et from 'fs-extra'
import ot from 'path'
import Zt from 'ora'
function g(t, e) {
  return Zt({ color: 'yellow', text: t, isSilent: e?.silent })
}
import { detect as Ht } from '@antfu/ni'
async function _(t) {
  let e = await Ht({ programmatic: !0, cwd: t })
  return e === 'yarn@berry' ? 'yarn' : e === 'pnpm@6' ? 'pnpm' : e || 'npm'
}
async function q(t, e) {
  let r = e ?? (await _(t))
  return r === 'pnpm' ? 'pnpm dlx' : r === 'bun' ? 'bunx' : 'npx'
}
import { execa as te } from 'execa'
var Z = [
    {
      type: 'confirm',
      name: 'typescript',
      message: `Would you like to install ${c.info('TypeScript')} (recommended)`,
      initial: !1,
      active: 'yes',
      inactive: 'no',
    },
  ],
  H = ['typescript'],
  Q = `{
  "compilerOptions": {
    "target": "es6",                   // Target ECMAScript version
    "module": "commonjs",               // Specify module code generation
    "baseUrl": ".",                     // Base directory for non-relative module names
    "paths": {                          // Path aliases for cleaner imports
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    },
    "jsx": "react-jsx",                 // Set JSX handling for React projects
    "allowSyntheticDefaultImports": true, // Allow default imports from modules with no default export
    "esModuleInterop": true,            // Import compatibility for CommonJS and ES modules
    "strict": true                      // Enable all strict type-checking options
  },
  "include": ["src"],                   // Include files in the src folder
  "exclude": ["node_modules", "dist"]   // Exclude folders from the config
}
`,
  tt = `{
  "compilerOptions": {
    "target": "es6", // Target ECMAScript version
    "module": "commonjs", // Module system used in Node.js
    "lib": ["dom", "es6", "dom.iterable", "scripthost"], // Standard library
    "jsx": "react-jsx", // JSX support for React
    "outDir": "./dist", // Output directory for compiled files
    "rootDir": "./src", // Root directory of source files
    "strict": true, // Enable strict type checking
    "moduleResolution": "node", // Module resolution strategy
    "esModuleInterop": true, // Allow default imports from CommonJS
    "skipLibCheck": true, // Skip type checking of declaration files
    "forceConsistentCasingInFileNames": true, // Enforce consistent file naming
    "resolveJsonModule": true, // Support importing JSON files
    "allowSyntheticDefaultImports": true, // Synthetic default imports for compatibility
    "baseUrl": ".", // Base directory for module resolution
    "paths": {
      // Define path aliases
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"], // Include all source files in the src directory
  "exclude": ["node_modules", "dist", "tests"] // Exclude directories from compilation
}
`
async function rt(t, e) {
  let r = g(c.info('Installing TypeScript...')).start(),
    n = await _(t),
    { failed: a } = await te(n, [n !== 'npm' ? 'install' : 'add', ...H, '-D'], { cwd: t, shell: !0 })
  if (a) return r.fail()
  await ee(t, e), i.break(), r.succeed()
}
async function ee(t, e) {
  let r = g(c.info('Adding TypeScript config...')).start()
  await et.writeFile(ot.join(t, `${e ? 'ts' : 'js'}config.json`), e ? tt : Q), i.break(), r.succeed()
}
async function u(t) {
  return et.pathExists(ot.resolve(t, 'tsconfig.json'))
}
async function it(t) {
  return !!Qt.sync(['duck-ui.*'], { cwd: t, deep: 3, ignore: p }).length
}
import { z as nt } from 'zod'
var st = nt.object({
  typescript: nt
    .boolean({
      message: 'You have to pick one option',
      description: 'Would you like to use TypeScript? (yes/no) -default: no',
    })
    .default(!1),
})
async function at(t) {
  let e = await it(t)
  if ((await u(t)) || e) return
  i.warn({ args: [`${c.info('TypeScript')} is not installed. You need to install ${c.info('TypeScript')}...`] })
  let n = await oe(Z),
    { typescript: a } = st.parse(n)
  a && (await rt(t, a))
}
async function se(t) {
  try {
    let e = await M.search(t)
    return e ? k.parse(e.config) : null
  } catch {
    i.error({ args: [`Invalid configuration found in ${t}/components.json.`] }), process.exit(1)
  }
}
async function ae(t) {
  let e = await se(t)
  return e ? await ct(t, e) : null
}
async function ct(t, e) {
  let r = ne(t)
  return r.resultType === 'failed'
    ? i.error({ args: [`Failed to leaod ${e.tsx ? 'tsconfig' : 'jsconfig'}.json. ${r.message ?? ''}`.trim()] })
    : Y.parse({
        ...e,
        resolvedPaths: {
          tailwindConfig: S.resolve(t, e.tailwind.config),
          tailwindCss: S.resolve(t, e.tailwind.css),
          utils: await d(e.aliases.utils, r),
          components: await d(e.aliases.components, r),
          ui: e.aliases.ui ? await d(e.aliases.ui, r) : await d(e.aliases.components, r),
        },
      })
}
async function pt(t) {
  let e = await ae(t)
  if (e) return e
  let r = await x(t),
    n = await F(t),
    a = await z(t)
  if (!r || !n || !a)
    return i.error({ args: [`Failed to get project config!, ${re.bgRed.white('TailwindCss')} is required`] }), null
  let m = await u(t),
    y = {
      $schema: 'https://duckui.vercel.app/schema.json',
      rsc: ['NEXT_JS'].includes(r),
      tsx: m,
      style: 'default',
      tailwind: {
        config: m ? 'tailwind.config.ts' : 'tailwind.config.js',
        baseColor: 'zinc',
        css: n,
        cssVariables: !0,
        prefix: '',
      },
      aliases: { utils: `${a}/lib/utils`, components: `${a}/components` },
    },
    vt = y?.tsx ? `export const config = ${JSON.stringify(y, null, 2)};` : W(y)
  try {
    await ie.writeFile(S.join(t, `duck-ui.config.${m ? 'ts' : 'js'}`), vt, 'utf8')
  } catch (Et) {
    console.log(Et), i.error({ args: [`Failed to create duck-ui.config.${m ? 'ts' : 'js'}`] }), process.exit(1)
  }
  return ct(t, y)
}
import { z as lt } from 'zod'
var ce = lt.string().min(1, 'Path must be a non-empty string'),
  pe = lt.string().refine(t => /\/chat\/b\//.test(t), { message: 'The URL must contain /chat/b/ in the pathname' })
import ue from 'prompts'
var ft = [
    {
      type: 'confirm',
      name: 'tailwind',
      message: `Would you like to install ${c.info('TailwindCSS')}`,
      initial: !1,
      active: 'yes',
      inactive: 'no',
    },
  ],
  mt = ['tailwindcss', 'postcss', 'autoprefixer'],
  gt = ['tailwindcss', 'init', '-p'],
  C = `/** @type {import('tailwindcss').Config} */
    export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };`
import { z as ut } from 'zod'
var dt = ut.object({
  tailwind: ut
    .boolean({
      message: 'You have to pick one option',
      description: 'Would you like to use TailwindCSS? (yes/no) -default: no',
    })
    .default(!1),
})
import { execa as R } from 'execa'
import w from 'path'
import _t from 'fs-extra'
async function ht(t) {
  let e = g(c.info('Installing TailwindCSS...')).start(),
    r = await _(t),
    { failed: n } = await R(r, [r !== 'npm' ? 'install' : 'add', ...mt], { cwd: t, shell: !0 })
  if (n) return e.fail()
  let a = await q(t, r),
    { failed: m } = await R(a, [...gt], { cwd: t, shell: !0 })
  if (m) return e.fail()
  await le(t), e.succeed()
}
async function le(t) {
  let e = await u(t),
    r = await x(t),
    n = g(c.info('Adding TailwindCSS config...')).start()
  e && (await R(`mv ${w.join(t, 'tailwind.config.js')} ${w.join(t, 'tailwind.config.ts')}`, { shell: !0, cwd: t })),
    await _t.writeFile(w.join(t, `tailwind.config.${e ? 'ts' : 'js'}`), fe(r)),
    await _t.writeFile(w.join(t, me(r)), ge(r)),
    i.break(),
    n.succeed()
}
var fe = t => (t === 'UNKNOWN' ? C : C),
  me = t => './style.css'
function ge(t) {
  return yt
}
var yt = `@tailwind base;
@tailwind components;
@tailwind utilities;
`
async function xt(t) {
  if (await U(t)) return
  i.warn({ args: [`${c.info('TailwindCss')} is not installed. You need to install ${c.info('TailwindCss')}...`] })
  let r = await ue(ft),
    { tailwind: n } = dt.parse(r)
  n && (await ht(t))
}
import { z as o } from 'zod'
var wt = o.enum([
    'components:style',
    'components:lib',
    'components:example',
    'components:block',
    'components:component',
    'components:ui',
    'components:hook',
    'components:theme',
    'components:page',
  ]),
  bt = o.object({ path: o.string(), content: o.string().optional(), type: wt, target: o.string().optional() }),
  de = o.object({
    config: o
      .object({
        content: o.array(o.string()).optional(),
        theme: o.record(o.string(), o.any()).optional(),
        plugins: o.array(o.string()).optional(),
      })
      .optional(),
  }),
  _e = o.object({
    light: o.record(o.string(), o.string()).optional(),
    dark: o.record(o.string(), o.string()).optional(),
  }),
  b = o.object({
    name: o.string(),
    type: wt,
    description: o.string().optional(),
    dependencies: o.array(o.string()).optional(),
    devDependencies: o.array(o.string()).optional(),
    registryDependencies: o.array(o.string()).optional(),
    files: o.array(bt).optional(),
    tailwind: de.optional(),
    cssVars: _e.optional(),
    meta: o.record(o.string(), o.any()).optional(),
    docs: o.string().optional(),
  }),
  ye = o.array(b.extend({ files: o.array(o.union([o.string(), bt])).optional() })),
  ui = o.array(o.object({ name: o.string(), label: o.string() })),
  he = o.object({
    inlineColors: o.object({ light: o.record(o.string(), o.string()), dark: o.record(o.string(), o.string()) }),
    cssVars: o.object({ light: o.record(o.string(), o.string()), dark: o.record(o.string(), o.string()) }),
    inlineColorsTemplate: o.string(),
    cssVarsTemplate: o.string(),
  }),
  di = b.pick({ dependencies: !0, devDependencies: !0, files: !0, tailwind: !0, cssVars: !0, docs: !0 })
import xe from 'axios'
var jt = { 400: 'Bad request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not found', 500: 'Internal server error' }
function I(t) {
  try {
    return new URL(t), !0
  } catch {
    return !1
  }
}
function we(t) {
  if (I(t)) {
    let e = new URL(t)
    return (
      e.pathname.match(/\/chat\/b\//) && !e.pathname.endsWith('/json') && (e.pathname = `${e.pathname}/json`),
      e.toString()
    )
  }
  return `${j}/${t}`
}
async function kt(t) {
  try {
    return await Promise.all(
      t.map(async r => {
        let n = we(r),
          a = await xe.get(n)
        return a.status !== 200 && be(a, n), a.data
      })
    )
  } catch {
    return (
      i.error({
        args: [
          `
Failed to fetch from registry.`,
        ],
        with_icon: !0,
      }),
      []
    )
  }
}
function be(t, e) {
  if (t.status === 401)
    throw new Error(`You are not authorized to access the component at ${c.info(e)}.
If this is a remote registry, you may need to authenticate.`)
  if (t.status === 404)
    throw new Error(`The component at ${c.info(e)} was not found.
It may not exist at the registry. Please make sure it is a valid component.`)
  if (t.status === 403)
    throw new Error(`You do not have access to the component at ${c.info(e)}.
If this is a remote registry, you may need to authenticate or a token.`)
  let r = t.data,
    n = r && typeof r == 'object' && 'error' in r ? r.error : t.statusText || jt[t.status]
  throw new Error(`Failed to fetch from ${c.info(e)}.
${n}`)
}
async function St(t, e) {
  try {
    let [r] = await kt([I(t) ? t : `styles/${e}/${t}.json`])
    return console.log(Tt), b.parse(Tt)
  } catch (r) {
    return i.error({ args: ['Failed to fetch from registry.', r] }), null
  }
}
var Tt = {
  name: 'button',
  dependencies: ['@radix-ui/react-slot', 'command', 'tooltip'],
  registryDependencies: ['dialog'],
  files: [
    {
      name: 'button.tsx',
      path: 'src/components/button.tsx',
      content: `import React from 'react'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { Slot } f`,
    },
  ],
  type: 'components:ui',
}
async function Ct(t) {
  let e = L.parse(t),
    r = je.resolve(e.cwd)
  i.info({ args: ['Checking for preflight...'] }), await at(r), await xt(r)
  let n = await pt(r)
  i.success({ with_icon: !0, args: [, 'Done.!, preflight passed'] })
  let a = await St('button', 'default')
  console.log(a)
}
var { name: Te, description: Se, options: Ce } = D,
  { option_1: v, option_2: E, option_3: P, option_4: $, option_5: N, option_6: O } = Ce
function Rt() {
  let t = new ke(Te)
  return (
    t
      .description(Se)
      .option(v.flags, v.description, v.defaultValue)
      .option(E.flags, E.description, E.defaultValue)
      .option(P.flags, P.description, P.defaultValue)
      .option($.flags, $.description, $.defaultValue)
      .option(N.flags, N.description, N.defaultValue)
      .option(O.flags, O.description, O.defaultValue)
      .action(Ct),
    t
  )
}
function It() {
  let t = new Re(),
    e = G()
  t.name(e?.name || h.name),
    t.description(e?.description || h.description),
    t.version(e?.version || h.version),
    t.addCommand(Rt()),
    t.parse()
}
process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))
It()
//# sourceMappingURL=index.js.map
