import { Registry } from '@/registry/schema'

export const examples: Registry = [
  {
    name: 'ButtonMainDemo',
    type: 'components:example',
    registryDependencies: ['button'],
    files: ['example/ButtonMainDemo.tsx'],
  },
  {
    name: 'ButtonSimpleDemo',
    type: 'components:example',
    registryDependencies: ['button'],
    files: ['example/ButtonSimpleDemo.tsx'],
  },
  {
    name: 'ButtonAdvancedDemo',
    type: 'components:example',
    registryDependencies: ['button'],
    files: ['example/ButtonAdvancedDemo.tsx'],
  },
  {
    name: 'BadgeMainDemo',
    type: 'components:example',
    registryDependencies: ['badge'],
    files: ['example/BadgeMainDemo.tsx'],
  },
  {
    name: 'CommandMainDemo',
    type: 'components:example',
    registryDependencies: ['command'],
    files: ['example/CommandMainDemo.tsx'],
  },
  {
    name: 'CommandDialogDemo',
    type: 'components:example',
    registryDependencies: ['command'],
    files: ['example/CommandDialogDemo.tsx'],
  },
  {
    name: 'CommandGroupDemo',
    type: 'components:example',
    registryDependencies: ['tooltip'],
    files: ['example/CommandGroupDemo.tsx'],
  },
  {
    name: 'TooltipMainDemo',
    type: 'components:example',
    registryDependencies: ['tooltip'],
    files: ['example/TooltipMainDemo.tsx'],
  },
  {
    name: 'TooltipGlobalDemo',
    type: 'components:example',
    registryDependencies: ['tooltip'],
    files: ['example/TooltipGlobalDemo.tsx'],
  },
  {
    name: 'ComboboxMainDemo',
    type: 'components:example',
    registryDependencies: ['combobox'],
    files: ['example/ComboboxMainDemo.tsx'],
  },
  {
    name: 'ComboboxDropdownDemo',
    type: 'components:example',
    registryDependencies: ['combobox'],
    files: ['example/ComboboxDropdownDemo.tsx'],
  },
  {
    name: 'ComboboxResponsiveDemo',
    type: 'components:example',
    registryDependencies: ['combobox'],
    files: ['example/ComboboxResponsiveDemo.tsx'],
  },
  {
    name: 'NavGroupMainDemo',
    type: 'components:example',
    registryDependencies: ['nav-group'],
    files: ['example/NavGroupMainDemo.tsx'],
  },
  {
    name: 'HeaderMainDemo',
    type: 'components:example',
    registryDependencies: ['header'],
    files: ['example/HeaderMainDemo.tsx'],
  },
  {
    name: 'HeaderTopDemo',
    type: 'components:example',
    registryDependencies: ['header'],
    files: ['example/HeaderTopDemo.tsx'],
  },
  {
    name: 'AlertDialogMainDemo',
    type: 'components:example',
    registryDependencies: ['alert-dialog', 'button'],
    files: ['example/AlertDialogMainDemo.tsx'],
  },
  {
    name: 'AlertDialogDrawerDemo',
    type: 'components:example',
    registryDependencies: ['alert-dialog', 'button', 'drawer', 'dialog', 'sheet'],
    files: ['example/AlertDialogDrawerDemo.tsx'],
  },
  {
    name: 'AlertDialogSheetDemo',
    type: 'components:example',
    registryDependencies: ['alert-dialog', 'button', 'drawer', 'dialog', 'sheet'],
    files: ['example/AlertDialogSheetDemo.tsx'],
  },
  {
    name: 'AlertDialogDialogDemo',
    type: 'components:example',
    registryDependencies: ['alert-dialog', 'button', 'drawer', 'dialog', 'sheet'],
    files: ['example/AlertDialogDialogDemo.tsx'],
  },
]
