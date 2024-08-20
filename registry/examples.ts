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
  {
    name: 'ComboboxMainDemo',
    type: 'components:example',
    registryDependencies: ['Combobox'],
    files: ['example/ComboboxMainDemo.tsx'],
  },
  {
    name: 'ComboboxDropdownDemo',
    type: 'components:example',
    registryDependencies: ['Combobox'],
    files: ['example/ComboboxDropdownDemo.tsx'],
  },
  {
    name: 'ComboboxResponsiveDemo',
    type: 'components:example',
    registryDependencies: ['Combobox'],
    files: ['example/ComboboxResponsiveDemo.tsx'],
  },
  {
    name: 'NavGroupMainDemo',
    type: 'components:example',
    registryDependencies: ['NavGroup'],
    files: ['example/NavGroupMainDemo.tsx'],
  },
  {
    name: 'HeaderMainDemo',
    type: 'components:example',
    registryDependencies: ['Header'],
    files: ['example/HeaderMainDemo.tsx'],
  },
  {
    name: 'HeaderTopDemo',
    type: 'components:example',
    registryDependencies: ['NavGroup'],
    files: ['example/HeaderTopDemo.tsx'],
  },
  {
    name: 'AlertDialogMainDemo',
    type: 'components:example',
    registryDependencies: ['AlertDialog', 'Button'],
    files: ['example/AlertDialogMainDemo.tsx'],
  },
  {
    name: 'AlertDialogDrawerDemo',
    type: 'components:example',
    registryDependencies: ['AlertDialog', 'Button', 'Drawer'],
    files: ['example/AlertDialogDrawerDemo.tsx'],
  },
]
