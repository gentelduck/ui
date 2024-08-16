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
]
