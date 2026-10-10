import { createDocsVeliteConfig } from './velite'

const cfg = createDocsVeliteConfig({
  // Root `docs` collection excludes per-package docs (they have dedicated
  // collections below); the default `docs/**/*.mdx` would duplicate them.
  docsPattern: 'docs/!(duck-*|www)/**/*.mdx',
  packages: [
    'duck-auth',
    'duck-calendar',
    'duck-cli',
    'duck-error',
    'duck-gen',
    'duck-hooks',
    'duck-iam',
    'duck-lazy',
    'duck-libs',
    'duck-motion',
    'duck-primitives',
    'duck-query',
    'duck-registry-build',
    'duck-shortcut',
    'duck-state',
    'duck-template',
    'duck-ttest',
    'duck-ttlog',
    'duck-ui',
    'duck-upload',
    'duck-variants',
    'duck-vim',
    'www',
  ],
})

export default {
  ...cfg,
  root: 'content',
  // `clean: false` keeps `.gentleduck/.cache/` between builds: dmc's per-doc
  // cache and the mermaid SVGs (`mermaid.outputDir`). That is the difference
  // between a ~3s build and a ~90s one, nearly all of it drawing diagrams. The
  // stale-cache worry it used to carry is already handled: the per-doc cache key
  // hashes the compiler version, so publishing a new `@gentleduck/md`
  // invalidates every entry on its own (verified on the 0.4.1 -> 0.6.2 bump --
  // all 548 records recompiled), while the SVGs, keyed by theme and diagram
  // source, survive it. A locally rebuilt crate at an unchanged version is the
  // one case the key cannot see; run `duck-md clean` by hand for that, rather
  // than paying the wipe every build.
  // What `clean` would also have swept is stale output: a `.json` for a
  // collection no longer in `packages` above, and Syncthing `*.sync-conflict-*`
  // files, which are not records this build wrote and nothing prunes.
  // `html: false` drops the pre-rendered HTML string the app never reads
  // (pages use `<Mdx code={doc.body} />`, copy uses `doc.content`); halves the
  // output size.
  output: { ...cfg.output, data: '.gentleduck', html: false, clean: false },
}
