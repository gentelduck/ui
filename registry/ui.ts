import { Registry } from '@/registry/schema'

export const ui: Registry = [
  {
    name: 'Button',
    type: 'components:ui',
    dependencies: ['@radix-ui/react-slot', '@radix-ui/react-tooltip', '@radix-ui/react-dialog', 'cmdk@1.0.0'],
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
    dependencies: [],
    files: ['ui/Command.tsx'],
  },
  {
    name: 'Tooltip',
    type: 'components:ui',
    dependencies: ['@radix-ui/react-tooltip'],
    files: ['ui/Tooltip.tsx'],
  },
]
