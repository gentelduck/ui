import { cn } from '@gentleduck/libs/cn'
import { Badge } from '@gentleduck/registry-ui/badge'
import { getPackageLifecycleMeta, type PackageLifecycleStatus } from '~/config/package-status'

export function PackageStatusBadge({ status, className }: { status: PackageLifecycleStatus; className?: string }) {
  const meta = getPackageLifecycleMeta(status)

  return (
    <Badge
      aria-label={`${meta.label} package status`}
      className={cn(
        'w-fit rounded-full px-2.5 py-0.5 font-semibold text-[0.65rem] uppercase tracking-[0.18em]',
        className,
      )}
      variant={meta.variant}>
      {meta.label}
    </Badge>
  )
}

const STATUS_PILL_CLASSNAME: Record<PackageLifecycleStatus, string> = {
  deprecated: 'bg-muted text-muted-foreground ring-border',
  experimental: 'bg-sky-500/10 text-sky-700 ring-sky-500/25 dark:text-sky-300',
  wip: 'bg-amber-500/10 text-amber-700 ring-amber-500/25 dark:text-amber-300',
}

/** Compact status tag for dense spots like menus and eyebrows. */
export function PackageStatusPill({ status, className }: { status: PackageLifecycleStatus; className?: string }) {
  return (
    <span
      className={cn(
        'shrink-0 rounded-sm px-1 py-0.5 font-medium text-[10px] uppercase leading-none tracking-wide ring-1 ring-inset',
        STATUS_PILL_CLASSNAME[status],
        className,
      )}>
      {getPackageLifecycleMeta(status).label}
    </span>
  )
}
