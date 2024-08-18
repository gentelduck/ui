import { Combobox, CommandListGroupDataType, TooltipProvider } from '@/registry/default/ui'

const linuxDistros: CommandListGroupDataType[] = [
  {
    label: 'Ubuntu',
    element: { children: 'Ubuntu' },
  },
  {
    label: 'Debian',
    element: { children: 'Debian' },
  },
  {
    label: 'Fedora',
    element: { children: 'Fedora' },
  },
  {
    label: 'Arch Linux',
    element: { children: 'Arch Linux' },
  },
  {
    label: 'CentOS',
    element: { children: 'CentOS' },
  },
  {
    label: 'Red Hat Enterprise Linux (RHEL)',
    element: { children: 'Red Hat Enterprise Linux (RHEL)' },
  },
  {
    label: 'openSUSE',
    element: { children: 'openSUSE' },
  },
  {
    label: 'Manjaro',
    element: { children: 'Manjaro' },
  },
  {
    label: 'Kali Linux',
    element: { children: 'Kali Linux' },
  },
  {
    label: 'Linux Mint',
    element: { children: 'Linux Mint' },
  },
]

export default function ComboboxMainDemo() {
  return (
    <TooltipProvider>
      <Combobox
        data={linuxDistros}
        title="Selectt a User"
        className={{ trigger: 'w-[200px]' }}
        command={{
          label: '⌘+m',
          key: 'm',
        }}
      />
    </TooltipProvider>
  )
}
