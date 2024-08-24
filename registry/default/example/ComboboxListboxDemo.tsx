import { Combobox, CommandListGroupDataType, TooltipProvider } from '@/registry/default/ui'
import { ChevronsUpDown, Circle, CircleAlert, CircleCheck, CircleHelp, CircleMinus, CirclePlus } from 'lucide-react'
import React from 'react'

const linuxDistros: CommandListGroupDataType[] = [
  {
    label: 'Ubuntu',
    element: {
      label: {
        children: '19',
      },
      icon: <CircleCheck className="size-4 stroke-[1.5]" />,
      children: 'Ubuntu',
    },
  },
  {
    label: 'Debian',
    element: {
      label: {
        children: '14',
      },
      icon: <CircleHelp className="size-4 stroke-[1.5]" />,
      children: 'Ubuntu',
    },
  },
  {
    label: 'Fedora',
    element: {
      label: {
        children: '26',
      },
      icon: <CircleAlert className="size-4 stroke-[1.5]" />,
      children: 'Ubuntu',
    },
  },
  {
    label: 'Arch Linux',
    element: {
      label: {
        children: '23',
      },
      icon: <CircleMinus className="size-4 stroke-[1.5]" />,
      children: 'Ubuntu',
    },
  },
  {
    label: 'CentOS',
    element: {
      label: {
        children: '42',
      },
      icon: <Circle className="size-4 stroke-[1.5]" />,
      children: 'Ubuntu',
    },
  },
]

export default function ComboboxMainDemo() {
  const [value, setValue] = React.useState([])

  return (
    <TooltipProvider>
      <Combobox
        type={'listbox'}
        trigger={{
          children: 'Status',
          className: '[&>div>span]:text-xs',
          icon: (
            <CirclePlus
              size={14}
              className="!size-4 stroke-[1.5]"
            />
          ),
          label: {
            children: 'Select one',
            showLabel: true,
            side: 'top',
            showCommand: true,
          },
          command: {
            label: '⌘+m',
            key: 'm',
          },
        }}
        onSelect={{
          value: value,
          setValue: setValue,
        }}
        content={{
          showSearchInput: true,
          data: linuxDistros,
        }}
      />
    </TooltipProvider>
  )
}
