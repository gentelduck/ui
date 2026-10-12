import type * as React from 'react'
import type { PackageLifecycleStatus } from '~/config/package-status'

export interface INavItem {
  title: string
  href?: string
  description?: string
  /** Short one-liner for compact menus, where `description` would be cut off. */
  tagline?: string
  /** Heading this item is listed under in grouped menus. */
  group?: string
  disabled?: boolean
  external?: boolean
  icon?: React.ElementType
  color?: string
  label?: string
  status?: PackageLifecycleStatus
  accordion?: boolean
  defaultOpen?: boolean
  collapsible?: boolean
}

export interface INavItemWithChildren extends INavItem {
  items?: INavItemWithChildren[]
}

export interface IMainNavItem extends INavItemWithChildren {}

export interface ISidebarNavItem extends INavItemWithChildren {}
