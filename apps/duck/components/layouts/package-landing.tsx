import { cn } from '@gentleduck/libs/cn'
import { Button } from '@gentleduck/registry-ui/button'
import { type LucideIcon, Package } from 'lucide-react'
import Link from 'next/link'
import type * as React from 'react'
import { codeToHtml } from 'shiki'
import { CopyButton } from '~/components/copy-button'
import { OpenSourceSection } from '~/components/layouts/open-source-section'
import { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading } from '~/components/layouts/page-header'
import { SpotlightGrid } from '~/components/layouts/spotlight-grid'
import { navItems } from '~/config/nav-items'
import { getPackageLifecycleMeta, type PackageLifecycleStatus } from '~/config/package-status'
import { siteConfig } from '~/config/site'

export interface IPackageFeature {
  icon: LucideIcon
  title: string
  /** Plain text. Wrap code in backticks to render it as inline code. */
  description: string
}

export interface IPackageAction {
  href: string
  label: string
}

export interface IPackageInstall {
  /** Defaults to `Install`. */
  title?: string
  /** Plain text. Wrap code in backticks to render it as inline code. */
  description?: string
  code: string
}

interface IPackageLandingProps {
  /** Route segment, e.g. `duck-primitives`. Picks the icon and accent color from the nav config. */
  slug: string
  packageName: string
  title: string
  description: string
  status?: PackageLifecycleStatus
  actions: IPackageAction[]
  features: IPackageFeature[]
  install: IPackageInstall
  /** Monorepo folder such as `packages/duck-vim`, or a full URL for packages with their own repo. */
  source?: string
}

/** Links a folder in the gentleduck monorepo on GitHub. */
export function githubTree(path: string) {
  return `${siteConfig.links.github}/tree/master/${path}`
}

function packageNavItem(slug: string) {
  const packages = navItems.flatMap((item) => item.items ?? [])
  return packages.find((item) => item.href === `/${slug}`)
}

/** Renders `code` spans in feature copy, which is otherwise plain text. */
function InlineCode({ text }: { text: string }) {
  return text.split(/(`[^`]+`)/).map((part, index) =>
    part.startsWith('`') && part.endsWith('`') ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: the split is stable for a given string
      <code className="rounded-sm bg-muted px-1 py-0.5 text-[0.92em] text-foreground/90" key={index}>
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    ),
  )
}

function ActionLink({ href, label }: IPackageAction) {
  const external = /^https?:\/\//.test(href)
  return external ? (
    <a href={href} rel="noreferrer" target="_blank">
      {label}
    </a>
  ) : (
    <Link href={href}>{label}</Link>
  )
}

const STATUS_DOT_CLASSNAME: Record<PackageLifecycleStatus, string> = {
  deprecated: 'bg-muted-foreground',
  experimental: 'bg-sky-500',
  wip: 'bg-amber-500',
}

function PackageEyebrow({
  icon: Icon,
  packageName,
  status,
}: {
  icon: LucideIcon
  packageName: string
  status?: PackageLifecycleStatus
}) {
  return (
    <div className="mb-2 inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-secondary px-3 py-1 font-medium text-secondary-foreground text-sm">
      <Icon aria-hidden="true" className="size-4 shrink-0 text-(--pkg)" />
      <span className="truncate">{packageName}</span>
      {status && (
        <span className="inline-flex shrink-0 items-center gap-1.5 border-foreground/15 border-s ps-2 text-muted-foreground text-xs">
          <span aria-hidden="true" className={cn('size-1.5 rounded-full', STATUS_DOT_CLASSNAME[status])} />
          {getPackageLifecycleMeta(status).label}
        </span>
      )}
    </div>
  )
}

function PackageFeatures({ features }: { features: IPackageFeature[] }) {
  return (
    <section aria-label="Features" className="mx-auto max-w-5xl">
      <SpotlightGrid className="sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <li className="group/feature flex flex-col gap-3 bg-background p-5" key={title}>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-background text-muted-foreground shadow-xs transition-colors duration-300 ease-(--gentleduck-motion-ease) group-hover/feature:border-(--pkg)/40 group-hover/feature:text-(--pkg)">
                <Icon className="size-4" />
              </span>
              <h3 className="font-medium text-foreground text-sm">{title}</h3>
            </div>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              <InlineCode text={description} />
            </p>
          </li>
        ))}
      </SpotlightGrid>
    </section>
  )
}

interface IInstallStep {
  title?: string
  code: string
}

/** Splits a snippet into steps. A `#` or `//` comment that opens a block becomes the step title. */
function installSteps(code: string): IInstallStep[] {
  const steps: IInstallStep[] = []
  const lines = code.split('\n')
  lines.forEach((line, index) => {
    const heading = line.match(/^(?:#|\/\/)\s+(.+)$/)
    if (heading && (index === 0 || lines[index - 1].trim() === '')) {
      steps.push({ code: '', title: heading[1] })
      return
    }
    if (!steps.length) steps.push({ code: '' })
    const step = steps[steps.length - 1]
    step.code = step.code ? `${step.code}\n${line}` : line
  })
  return steps.map((step) => ({ ...step, code: step.code.trim() })).filter((step) => step.code)
}

function stepLanguage(code: string) {
  if (/^(?:bun|bunx|npm|npx|pnpm|yarn|cargo|duck-template)\b/.test(code)) return 'bash'
  if (code.startsWith('[')) return 'toml'
  if (/^use \w+::/.test(code)) return 'rust'
  return 'tsx'
}

async function InstallStep({ step, number, last }: { step: IInstallStep; number: number; last: boolean }) {
  const html = await codeToHtml(step.code, {
    defaultColor: 'light',
    lang: stepLanguage(step.code),
    themes: { dark: 'catppuccin-mocha', light: 'github-light' },
    transformers: [
      {
        pre(node) {
          node.properties.class =
            'no-scrollbar min-w-0 overflow-x-auto py-3 pr-12 pl-4 outline-none !bg-transparent text-sm font-mono'
        },
      },
    ],
  })

  return (
    <li className="group/step relative grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-4 pb-8 last:pb-0">
      {!last && <span aria-hidden="true" className="absolute top-8 bottom-2 left-3 w-px bg-border" />}
      <span
        aria-hidden="true"
        className="relative flex size-6 items-center justify-center rounded-full border bg-background font-medium text-muted-foreground text-xs tabular-nums shadow-xs transition-colors duration-300 ease-(--gentleduck-motion-ease) group-hover/step:border-(--pkg)/40 group-hover/step:text-(--pkg)">
        {number}
      </span>
      <div className="min-w-0">
        {step.title && <h3 className="pt-0.5 pb-2.5 font-medium text-foreground text-sm">{step.title}</h3>}
        <div className="relative overflow-hidden rounded-lg border bg-muted/30">
          <div
            className="[&_pre]:bg-transparent! dark:[&_span]:text-(--shiki-dark)!"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: shiki output
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <CopyButton className="absolute top-2 right-2" value={step.code} variant="ghost" />
        </div>
      </div>
    </li>
  )
}

function PackageInstall({ title = 'Install', description, code }: IPackageInstall) {
  const steps = installSteps(code)

  return (
    <section aria-labelledby="package-install">
      <div className="mb-8 flex flex-col items-center gap-1 text-center">
        <h2 className="font-semibold text-xl leading-tight tracking-tight" id="package-install">
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground text-sm">
            <InlineCode text={description} />
          </p>
        )}
      </div>
      <ol className="mx-auto max-w-2xl list-none">
        {steps.map((step, index) => (
          <InstallStep key={step.title ?? index} last={index === steps.length - 1} number={index + 1} step={step} />
        ))}
      </ol>
    </section>
  )
}

export function PackageLanding({
  slug,
  packageName,
  title,
  description,
  status,
  actions,
  features,
  install,
  source,
}: IPackageLandingProps) {
  const navItem = packageNavItem(slug)
  const repository = source && (/^https?:\/\//.test(source) ? source : githubTree(source))

  return (
    <div
      className="container pt-24 pb-8"
      style={{ '--pkg': navItem?.color ?? 'var(--foreground)' } as React.CSSProperties}>
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareSourceCode',
            author: { '@type': 'Person', name: 'Ahmed Ayob', url: 'https://github.com/wildduck2' },
            codeRepository: repository || undefined,
            description,
            license: 'https://opensource.org/licenses/MIT',
            name: packageName,
            programmingLanguage: 'TypeScript',
            url: new URL(slug, siteConfig.url).toString(),
          }),
        }}
        type="application/ld+json"
      />
      <PageHeader>
        <PackageEyebrow icon={navItem?.icon ?? Package} packageName={packageName} status={status} />
        <PageHeaderHeading className="normal-case">{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          {actions.map((action, index) => (
            <Button asChild key={action.href} variant={index === 0 ? 'default' : 'outline'}>
              <ActionLink {...action} />
            </Button>
          ))}
        </PageActions>
      </PageHeader>
      <div className="relative space-y-20">
        <PackageFeatures features={features} />
        <PackageInstall {...install} />
        <OpenSourceSection className="!px-0" />
      </div>
    </div>
  )
}
