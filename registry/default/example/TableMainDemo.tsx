import { TableView, TableHeaderColumns, DropdownMenuOptionsDataType, ComboboxType, TableHeaderOptionsType } from '../ui'
import { tableData, TableDataType } from '../ui/data'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Circle,
  CircleCheck,
  CircleHelp,
  CirclePlus,
  CircleX,
  Clock12,
  LucideIcon,
  Pencil,
  Share2,
  Star,
  Trash2,
  Twitch,
  Twitter,
} from 'lucide-react'
import { EyeNoneIcon } from '@radix-ui/react-icons'

const tableHeaderDropDown: DropdownMenuOptionsDataType<TableHeaderOptionsType<HeaderColumns, TableDataType>, false>[] =
  [
    {
      action: ({ sortArray, setHeaders, setTableData, data, headers, idx }) => {
        const { sortedData, updatedColumns } = sortArray(
          headers,
          data,
          Object.keys(data[0])[idx]! as HeaderColumns,
          'asc'
        )
        setHeaders(() => updatedColumns)
        setTableData(() => (updatedColumns[idx].currentSort === 'asc' ? sortedData : data))
      },
      icon: {
        icon: ArrowUpIcon,
        className: 'mr-2 h-3.5 w-3.5 text-muted-foreground/70',
      },
      children: 'Asc',
    },
    {
      action: ({ sortArray, setHeaders, setTableData, data, headers, idx }) => {
        const { sortedData, updatedColumns } = sortArray(
          headers,
          data,
          Object.keys(data[0])[idx] as HeaderColumns,
          'desc'
        )
        setHeaders(() => updatedColumns)
        setTableData(() => (updatedColumns[idx].currentSort === 'desc' ? sortedData : data))
      },
      icon: {
        icon: ArrowDownIcon,
        className: 'mr-2 h-3.5 w-3.5 text-muted-foreground/70',
      },
      children: 'Desc',
    },
    {
      action: ({ headers, column, setHeaders }) => {
        setHeaders(headers.filter(sub => sub !== column))
      },
      icon: {
        icon: EyeNoneIcon as LucideIcon,
        className: 'mr-2 h-3.5 w-3.5 text-muted-foreground/70',
      },
      children: 'Hide',
    },
  ]

export type HeaderColumns = 'task' | 'title' | 'status' | 'label' | 'priority'
const columns: TableHeaderColumns<true, HeaderColumns, TableDataType>[] = [
  {
    label: 'task',
    sortable: false,
  },
  {
    label: 'title',
    className: 'w-[110px]',
    sortable: true,
    showLabel: true,
    dropdownMenuOptions: tableHeaderDropDown,
  },
  {
    label: 'status',
    sortable: true,
    showLabel: true,
    className: 'w-[70px]',
    currentSort: 'not sorted',
    dropdownMenuOptions: tableHeaderDropDown,
  },
  {
    label: 'label',
    className: 'w-[90px]',
    sortable: true,
    currentSort: 'not sorted',
    dropdownMenuOptions: tableHeaderDropDown,
  },
  {
    label: 'priority',
    sortable: true,
    dropdownMenuOptions: tableHeaderDropDown,
  },
]

export type StatusType = 'Backlog' | 'Todo' | 'In Progress' | 'Done' | 'Canceled'
export type PriorityType = 'High' | 'Medium' | 'Low'
const iconStyle = 'size-4 stroke-[1.5] text-muted-foreground'
const filtersData = [
  {
    type: 'listbox',
    trigger: {
      children: 'Status',
      label: {
        children: 'Filter Status',
        showLabel: true,
        showCommand: true,
        side: 'top',
      },
      command: {
        label: '⌃+⇧+S',
        key: 'ctrl+shift+s',
      },
    },
    content: {
      showSearchInput: true,
      data: [
        {
          label: 'Backlog',
          element: {
            icon: {
              icon: CircleHelp,
              className: iconStyle,
            },
          },
        },
        {
          label: 'Todo',
          element: {
            icon: {
              icon: Circle,
              className: iconStyle,
            },
          },
        },
        {
          label: 'In progress',
          element: {
            icon: {
              icon: Clock12,
              className: iconStyle,
            },
          },
        },
        {
          label: 'Done',
          element: {
            icon: {
              icon: CircleCheck,
              className: iconStyle,
            },
          },
        },
        {
          label: 'Canceled',
          element: {
            icon: {
              icon: CircleX,
              className: iconStyle,
            },
          },
        },
      ],
    },
  } as ComboboxType<string, StatusType>,
  {
    type: 'listbox',
    trigger: {
      children: 'Method',
      label: {
        children: 'Filter Method',
        showLabel: true,
        showCommand: true,
        side: 'top',
      },
      command: {
        label: '⌃+⇧+M',
        key: 'ctrl+shift+m',
      },
    },
    content: {
      showSearchInput: true,
      data: [
        {
          label: 'Low',
          element: {
            icon: {
              icon: CirclePlus,
              className: 'size-4 stroke-[1.5]',
            },
          },
        },
        {
          label: 'Medium',
          element: {
            icon: {
              icon: CirclePlus,
              className: 'size-4 stroke-[1.5]',
            },
          },
        },
        {
          label: 'High',
          element: {
            icon: {
              icon: CirclePlus,
              className: 'size-4 stroke-[1.5]',
            },
          },
        },
      ],
    },
  } as ComboboxType<string, PriorityType>,
]

const optionsData: DropdownMenuOptionsDataType<TableHeaderOptionsType<HeaderColumns, TableDataType>, true>[] = [
  {
    children: 'Edit',
    onClick: () => console.log('edit'),
    icon: { icon: Pencil },
  },
  {
    children: 'Share',
    icon: {
      icon: Share2,
    },
    nestedData: {
      group: [2],
      optionsData: [
        {
          className: '[&_svg]:text-[#1DA1F2]',
          children: 'Twitter',
          icon: {
            icon: Twitter,
          },
        },
        {
          command: {
            key: 'b',
            label: '⌘+e',
          },
          icon: {
            icon: Twitch,
          },
          className: '[&_svg]:text-[#6441a5]',
          children: 'Twitch',
        },
      ],
    },
  },
  {
    children: 'Favorite',
    icon: {
      icon: Star,
    },
  },
  {
    children: 'Delete',
    command: { label: '⌘⌫', key: 'a' },
    icon: {
      icon: Trash2,
    },
    className: '[&_span]:text-red-500 text-red-500 [&_span]:hover:text-primary',
  },
]

export default function DataTableMainDemo() {
  return (
    <>
      <TableView<true, HeaderColumns, TableDataType>
        wrapper={{ className: 'w-[270px] m-auto' }}
        table={{
          className: 'w-[270px]',
        }}
        header={columns}
        selection={true}
        filters={filtersData}
        tableContentData={[...tableData]}
        caption={{
          children: 'A list of your recent invoices.',
        }}
        // footer={{
        //   children: 'Footer',
        // }}
        viewButton={true}
        tableSearch={true}
        pagination={{
          groupSize: 6,
          showSelectCount: true,
          showPageCount: true,
          showGroup: true,
          showNavigation: true,
        }}
        contextMenu={{
          group: [3, 1],
          optionsData: optionsData,
        }}
        dropdownMenu={{
          group: [3, 1],
          optionsData: optionsData,
        }}
      />
    </>
  )
}
