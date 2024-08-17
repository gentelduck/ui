import { Registry } from '@/registry/schema'

export const examples: Registry = [
  {
    name: 'ButtonMainDemo',
    type: 'components:example',
    registryDependencies: ['Button'],
    files: ['example/ButtonMainDemo.tsx'],
  },
  {
    name: 'ButtonSimpleDemo',
    type: 'components:example',
    registryDependencies: ['Button'],
    files: ['example/ButtonSimpleDemo.tsx'],
  },
  {
    name: 'ButtonAdvancedDemo',
    type: 'components:example',
    registryDependencies: ['Button'],
    files: ['example/ButtonAdvancedDemo.tsx'],
  },
  {
    name: 'BadgeMainDemo',
    type: 'components:example',
    registryDependencies: ['Badge'],
    files: ['example/BadgeMainDemo.tsx'],
  },
  {
    name: 'CommandMainDemo',
    type: 'components:example',
    registryDependencies: ['Command'],
    files: ['example/CommandMainDemo.tsx'],
  },
  {
    name: 'CommandDialogDemo',
    type: 'components:example',
    registryDependencies: ['Command'],
    files: ['example/CommandDialogDemo.tsx'],
  },
  {
    name: 'CommandGroupDemo',
    type: 'components:example',
    registryDependencies: ['Tooltip'],
    files: ['example/CommandGroupDemo.tsx'],
  },
  {
    name: 'TooltipMainDemo',
    type: 'components:example',
    registryDependencies: ['Tooltip'],
    files: ['example/TooltipMainDemo.tsx'],
  },
  {
    name: 'TooltipGlobalDemo',
    type: 'components:example',
    registryDependencies: ['Tooltip'],
    files: ['example/TooltipGlobalDemo.tsx'],
  },
]
