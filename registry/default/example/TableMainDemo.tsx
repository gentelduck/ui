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
  Trash2,
} from 'lucide-react'
import { EyeNoneIcon } from '@radix-ui/react-icons'
import { u } from 'unist-builder'

const tableHeaderDropDown: DropdownMenuOptionsDataType<TableHeaderOptionsType<HeaderColumns, TableDataType>>[] = [
  {
    action: ({ sortArray, setHeaders, setTableData, data, headers, idx }) => {
      const { sortedData, updatedColumns } = sortArray(headers, data, Object.keys(data[0])[idx] as HeaderColumns, 'asc')
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
    label: 'Task',
    sortable: false,
  },
  {
    label: 'Title',
    className: 'w-[110px]',
    sortable: true,
    dropdownMenuOptions: tableHeaderDropDown,
  },
  {
    label: 'Status',
    sortable: true,
    className: 'w-[70px]',
    currentSort: 'not sorted',
    dropdownMenuOptions: tableHeaderDropDown,
  },
  {
    label: 'Label',
    className: 'w-[90px]',
    sortable: true,
    currentSort: 'not sorted',
    dropdownMenuOptions: tableHeaderDropDown,
  },
  {
    label: 'Priority',
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
    },
    content: {
      showSearchInput: true,
      data: [
        {
          label: 'Backlog',
          element: {
            icon: <CircleHelp className={iconStyle} />,
          },
        },
        {
          label: 'Todo',
          element: {
            icon: <Circle className={iconStyle} />,
          },
        },
        {
          label: 'In progress',
          element: {
            icon: <Clock12 className={iconStyle} />,
          },
        },

        {
          label: 'Done',
          element: {
            icon: <CircleCheck className={iconStyle} />,
          },
        },

        {
          label: 'Canceled',
          element: {
            icon: <CircleX className={iconStyle} />,
          },
        },
      ],
    },
  } as ComboboxType<string, StatusType>,
  {
    type: 'listbox',
    trigger: {
      children: 'Method',
    },
    content: {
      showSearchInput: true,
      data: [
        {
          label: 'Low',
          element: {
            icon: <CirclePlus className="size-4 stroke-[1.5]" />,
          },
        },
        {
          label: 'Medium',
          element: {
            icon: <CirclePlus className="size-4 stroke-[1.5]" />,
          },
        },
        {
          label: 'High',
          element: {
            icon: <CirclePlus className="size-4 stroke-[1.5]" />,
          },
        },
      ],
    },
  } as ComboboxType<string, PriorityType>,
]

const optionsData: DropdownMenuOptionsDataType<true, true>[] = [
  {
    children: 'Edit',
    onClick: () => console.log('edit'),
    nestedData: [
      {
        command: {
          key: 'e',
          label: '⌘+e',
          action: () => console.log('edit'),
        },
        icon: {
          icon: Trash2,
        },
        children: 'Duplicate',
        onClick: () => console.log('duplicate'),
      },
    ],
  },
  { children: 'Make a copy' },
  { children: 'Favorite' },
  {
    children: 'Delete',
    // command: { children: '⌘⌫' },
    icon: {
      icon: Trash2,
    },
    className: 'text-red-500',
  },
]

export default function DataTableMainDemo() {
  return (
    <>
      <TableView<true, HeaderColumns, TableDataType>
        table={{
          className: 'w-[650px] h-[340px]',
        }}
        header={columns}
        selection={true}
        filters={filtersData}
        tableContentData={[...tableData]}
        // caption={{
        //   children: 'A list of your recent invoices.',
        // }}
        // footer={{
        //   children: 'Footer',
        // }}
        // selection={true}
        viewButton={true}
        tableSearch={true}
        pagination={{
          groupSize: 6,
          showSelectCount: true,
          showPageCount: true,
          showGroup: true,
          showNavigation: true,
        }}
        options={{
          group: [3, 1],
          optionsData: optionsData,
        }}
      />
    </>
  )
}
