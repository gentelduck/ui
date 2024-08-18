'use client'

import React from 'react'

import {
  Separator,
  AccountType,
  DuckSwitcher,
  NavCollabsedType,
  NavGroup,
  NavGroupProps,
  NavType,
} from '@/registry/default/ui'

import { cn, filteredObject } from '@/lib/utils'

type HeaderProps<T extends boolean> = {
  header: HeaderType
  nav: NavGroupProps<T>
  switcher?: SwitcherType
  footer?: FooterType
}

interface HeaderType extends React.HtmlHTMLAttributes<HTMLDivElement> {
  isCollabsed?: boolean
}

type SwitcherType = {
  accounts: AccountType[]
}

type FooterType = {
  buttons: React.ReactNode[]
}

const Header = <T extends boolean>({ nav, header, switcher, footer }: HeaderProps<T>) => {
  const navIsCollabsed = (header as NavCollabsedType).isCollabsed || false
  const filteredKeys = filteredObject(['isCollabsed'], header)

  return (
    <header
      {...filteredKeys}
      className={cn('py-2 flex flex-col h-full', header.className)}
    >
      {switcher && (
        <DuckSwitcher
          isCollapsed={navIsCollabsed}
          accounts={switcher.accounts}
          className={cn('mx-2 mb-2', !(nav.nav as NavType<true>)?.isCollabsed && 'mx-auto')}
        />
      )}
      <Separator className="my-1" />
      <NavGroup<T>
        nav={{ ...nav.nav, isCollabsed: navIsCollabsed } as NavType<true>}
        navigationKeys={nav.navigationKeys}
      />

      <Separator className="my-1" />
      <div>{footer && footer.buttons.map((button, idx) => <React.Fragment key={idx}>{button}</React.Fragment>)} </div>
    </header>
  )
}

Header.displayName = 'Header'

export { Header, type HeaderProps, type HeaderType, type SwitcherType, type FooterType }
