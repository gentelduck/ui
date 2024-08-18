import { Registry } from '@/registry/schema'

export const ui: Registry = [
  {
    name: 'Button',
    type: 'components:ui',
    dependencies: ['@radix-ui/react-slot', 'Command', 'Tooltip'],
    registryDependencies: ['dialog'],
    files: ['ui/Button.tsx'],
  },
  {
    name: 'Badge',
    type: 'components:ui',
    dependencies: [],
    files: ['ui/Badge.tsx'],
  },
  {
    name: 'Command',
    type: 'components:ui',
    dependencies: ['cmdk@1.0.0', '@radix-ui/react-dialog'],
    files: ['ui/Command.tsx'],
  },
  {
    name: 'Tooltip',
    type: 'components:ui',
    dependencies: ['@radix-ui/react-tooltip'],
    files: ['ui/Tooltip.tsx'],
  },
  {
    name: 'Combobox',
    type: 'components:ui',
    dependencies: ['Command', 'Tooltip', 'Button'],
    files: ['ui/Combobox.tsx'],
  },
  {
    name: 'NavGroup',
    type: 'components:ui',
    dependencies: ['Button', 'Badge'],
    files: ['ui/NavGroup.tsx'],
  },
  {
    name: 'Header',
    type: 'components:ui',
    dependencies: ['NavGroup'],
    files: ['ui/Header.tsx'],
  },
]
