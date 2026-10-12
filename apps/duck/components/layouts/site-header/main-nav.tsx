'use client'

import { cn } from '@gentleduck/libs/cn'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@gentleduck/registry-ui/navigation-menu'
import { ArrowRight, Terminal } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type * as React from 'react'
import { PackageStatusPill } from '~/components/package-status-badge'
import { navItems } from '~/config/nav-items'
import type { IMainNavItem } from '~/types/nav'
import { HeaderBrand } from '../header-shell'

type NavItemType = IMainNavItem & { icon?: React.ElementType; color?: string; items?: NavItemType[] }

function isActive(pathname: string, href?: string) {
  return !!href && (pathname === href || pathname.startsWith(`${href}/`))
}

/** Keeps the config order of groups and of the items inside each group. */
function groupItems(items: NavItemType[]) {
  const groups = new Map<string, NavItemType[]>()
  for (const item of items) {
    const key = item.group ?? ''
    groups.set(key, [...(groups.get(key) ?? []), item])
  }
  return [...groups]
}

function PackageLink({ item, active }: { item: NavItemType; active: boolean }) {
  const Icon = item.icon
  const deprecated = item.status === 'deprecated'

  return (
    <li>
      <NavigationMenuLink active={active} asChild>
        <Link
          className="group/item flex-row items-center gap-3 rounded-md px-2 py-1.5"
          href={item.href ?? '#'}
          style={{ '--pkg': item.color ?? 'var(--foreground)' } as React.CSSProperties}>
          {Icon && (
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-background text-muted-foreground shadow-xs transition-colors group-hover/item:border-(--pkg)/40 group-hover/item:text-(--pkg) group-focus-visible/item:border-(--pkg)/40 group-focus-visible/item:text-(--pkg) group-data-active/item:text-(--pkg)">
              <Icon className="size-4 text-current" />
            </span>
          )}
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  'truncate font-medium text-[13px] leading-5',
                  deprecated ? 'text-muted-foreground' : 'text-foreground',
                )}>
                {item.title.replace(/^@gentleduck\//, '')}
              </span>
              {item.status && <PackageStatusPill status={item.status} />}
            </span>
            <span className="block truncate text-muted-foreground text-xs leading-4">
              {item.tagline ?? item.description}
            </span>
          </span>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

function PackagesMenu({ item, pathname }: { item: NavItemType; pathname: string }) {
  const groups = groupItems(item.items ?? [])

  return (
    <div className="w-[38rem] xl:w-[61rem]">
      <div className="grid grid-cols-2 gap-x-2 gap-y-5 p-3 xl:grid-cols-4">
        {groups.map(([group, items]) => {
          const headingId = `nav-group-${group.toLowerCase()}`
          return (
            <section key={group}>
              {group && (
                <h3
                  className="px-2 pb-2 font-medium text-[11px] text-muted-foreground uppercase tracking-wider"
                  id={headingId}>
                  {group}
                </h3>
              )}
              <ul aria-labelledby={group ? headingId : undefined} className="flex flex-col gap-0.5">
                {items.map((sub) => (
                  <PackageLink active={isActive(pathname, sub.href)} item={sub} key={sub.title} />
                ))}
              </ul>
            </section>
          )
        })}
      </div>
      <div className="flex items-center justify-between gap-4 border-t bg-muted/40 px-5 py-2.5">
        <p className="truncate text-muted-foreground text-xs">
          <span className="text-foreground">@gentleduck</span> · {item.description}
        </p>
        <NavigationMenuLink asChild>
          <Link
            className="group/cli shrink-0 flex-row items-center gap-2 rounded-md px-2 py-1 text-foreground/80 text-xs hover:bg-accent hover:text-foreground"
            href="/duck-cli">
            <Terminal aria-hidden="true" className="size-3.5" />
            <code className="font-bold font-mono text-sm">npx @gentleduck/cli init</code>
            <ArrowRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-200 ease-(--gentleduck-motion-ease) group-hover/cli:translate-x-0.5"
            />
          </Link>
        </NavigationMenuLink>
      </div>
    </div>
  )
}

function NavItem({ item, pathname }: { item: NavItemType; pathname: string }) {
  if (!item.items?.length) {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink
          asChild
          className={cn(
            navigationMenuTriggerStyle(),
            'bg-transparent text-sm',
            pathname === item.href ? 'text-foreground' : 'text-foreground/70',
          )}>
          <Link href={item.href ?? '#'}>{item.title}</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent text-foreground/70 text-sm data-[state=open]:text-foreground">
        {item.title}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="p-0 pe-0">
        <PackagesMenu item={item} pathname={pathname} />
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <HeaderBrand className="mr-4 lg:mr-6" />
      <NavigationMenu>
        <NavigationMenuList className="gap-1">
          {navItems.map((item) => (
            <NavItem key={item.href ?? item.title} item={item as NavItemType} pathname={pathname} />
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
