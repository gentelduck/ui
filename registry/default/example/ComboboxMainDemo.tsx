import { CommandListGroupDataType } from '../ui'
import { Combobox } from '../ui/Combobox'

const linuxDistros: CommandListGroupDataType[] = [
  {
    label: 'Ubuntu',
    element: 'Ubuntu',
  },
  {
    label: 'Debian',
    element: 'Debian',
  },
  {
    label: 'Fedora',
    element: 'Fedora',
  },
  {
    label: 'Arch Linux',
    element: 'Arch Linux',
  },
  {
    label: 'CentOS',
    element: 'CentOS',
  },
  {
    label: 'Red Hat Enterprise Linux (RHEL)',
    element: 'Red Hat Enterprise Linux (RHEL)',
  },
  {
    label: 'openSUSE',
    element: 'openSUSE',
  },
  {
    label: 'Manjaro',
    element: 'Manjaro',
  },
  {
    label: 'Kali Linux',
    element: 'Kali Linux',
  },
  {
    label: 'Linux Mint',
    element: 'Linux Mint',
  },
]

export default function ComboboxMainDemo() {
  return (
    <Combobox
      data={linuxDistros}
      title="Selectt a User"
      className={{ trigger: 'w-[200px]' }}
      command={{
        label: '⌘+m',
        key: 'm',
      }}
    />
  )
}
