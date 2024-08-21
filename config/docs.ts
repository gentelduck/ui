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
        // {
        //   title: 'Accordion',
        //   href: '/docs/components/Accordion',
        //   items: [],
        // },
        {
          title: 'AlertDialog',
          href: '/docs/components/AlertDialog',
          items: [],
          label: 'new',
        },
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
          title: 'Drawer',
          href: '/docs/components/Drawer',
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
        {
          title: 'Table',
          href: '/docs/components/Table',
          items: [],
        },
      ],
    },
  ],
}
