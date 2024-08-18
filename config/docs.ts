import { MainNavItem, SidebarNavItem } from 'types/nav'

export interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
  chartsNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  chartsNav: [],
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/docs',
          items: [],
        },
        {
          title: 'Installation',
          href: '/docs/installation',
          items: [],
        },
      ],
    },
    {
      title: 'Components',
      items: [
        {
          title: 'Badge',
          href: '/docs/components/Badge',
          items: [],
        },
        {
          title: 'Button',
          href: '/docs/components/Button',
          items: [],
        },
        {
          title: 'Combobox',
          href: '/docs/components/Combobox',
          items: [],
          label: 'new',
        },
        {
          title: 'Command',
          href: '/docs/components/Command',
          items: [],
        },
        {
          title: 'Header',
          href: '/docs/components/Header',
          items: [],
          label: 'new',
        },
        {
          title: 'NavGroup',
          href: '/docs/components/NavGroup',
          items: [],
          label: 'new',
        },
        {
          title: 'Tooltip',
          href: '/docs/components/Tooltip',
          items: [],
        },
      ],
    },
  ],
}
