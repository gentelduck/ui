import { Registry } from '../registry-schema'

export const registry_examples: Registry = [
  {
    name: 'button-main',
    type: 'registry:example',
    registryDependencies: ['button'],
    root_folder: 'registry-examples-components/button',
    files: [],
  },
  {
    name: 'badge-main',
    type: 'registry:example',
    registryDependencies: ['badge'],
    root_folder: 'registry-examples-components/badge',
    files: [],
  },
]
