import {
  TableView,
  TableHeaderColumns,
  DropdownMenuOptionsDataType,
  TableContentDataType,
  CommandListGroupDataType,
  ComboboxType,
} from '../ui'
import { tableData } from '../ui/data'
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
import { sortArray } from '@/lib/utils'
import { EyeNoneIcon } from '@radix-ui/react-icons'

export interface TableViewProps {
  sortArray: typeof sortArray
  setHeaders: React.Dispatch<React.SetStateAction<TableHeaderColumns[]>>
  headers: TableHeaderColumns[]
  tableData: TableContentDataType[]
  setTableData: React.Dispatch<React.SetStateAction<TableContentDataType[]>>
  data: TableContentDataType[]
  idx: number
  column: TableHeaderColumns
}

const tableHeaderDropDown: DropdownMenuOptionsDataType<TableViewProps>[] = [
  {
    action: ({ sortArray, setHeaders, setTableData, data, headers, idx }) => {
      const { sortedData, updatedColumns } = sortArray(headers, data, Object.keys(data[0])[idx], 'asc')
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
      const { sortedData, updatedColumns } = sortArray(headers, data, Object.keys(data[0])[idx], 'desc')
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

const columns: TableHeaderColumns<true>[] = [
  {
    children: 'task',
    sortable: false,
  },
  {
    children: 'title',
    className: 'w-[110px]',
    sortable: true,
    dropdownMenuOptions: tableHeaderDropDown,
  },
  {
    children: 'status',
    sortable: true,
    className: 'w-[70px]',
    currentSort: 'not sorted',
    dropdownMenuOptions: tableHeaderDropDown,
  },
  {
    children: 'label',
    className: 'w-[90px]',
    sortable: true,
    currentSort: 'not sorted',
    dropdownMenuOptions: tableHeaderDropDown,
  },
  {
    children: 'priority',
    sortable: true,
    dropdownMenuOptions: tableHeaderDropDown,
  },
]

const filtersData: ComboboxType<string>[] = [
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
            label: {
              children: '23',
            },
            icon: <CircleHelp className="size-4 stroke-[1.5] text-muted-foreground" />,
            children: 'Backlog',
          },
        },
        {
          label: 'Todo',
          element: {
            label: {
              children: '23',
            },
            icon: <Circle className="size-4 stroke-[1.5] text-muted-foreground" />,
            children: 'Todo',
          },
        },
        {
          label: 'In progress',
          element: {
            label: {
              children: '23',
            },
            icon: <Clock12 className="size-4 stroke-[1.5] text-muted-foreground" />,
            children: 'In progress',
          },
        },

        {
          label: 'Done',
          element: {
            label: {
              children: '23',
            },
            icon: <CircleCheck className="size-4 stroke-[1.5] text-muted-foreground" />,
            children: 'Done',
          },
        },

        {
          label: 'Canceled',
          element: {
            label: {
              children: '23',
            },
            icon: <CircleX className="size-4 stroke-[1.5] text-muted-foreground" />,
            children: 'Canceled',
          },
        },
      ],
    },
  },

  {
    type: 'listbox',
    trigger: {
      children: 'Method',
    },
    content: {
      showSearchInput: true,
      data: [
        {
          label: 'Visa',
          element: {
            label: {
              children: '23',
            },
            icon: <CirclePlus className="size-4 stroke-[1.5]" />,
            children: 'Visa',
          },
        },

        {
          label: 'joe',
          element: {
            label: {
              children: '23',
            },
            icon: <CirclePlus className="size-4 stroke-[1.5]" />,
            children: 'joe',
          },
        },
      ],
    },
  },
]

export default function DataTableMainDemo() {
  return (
    <>
      <TableView<true>
        table={{
          className: 'w-[650px] h-[338px]',
        }}
        header={columns}
        filter={filtersData}
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
          showCount: true,
          showGroup: true,
          showNavigation: true,
        }}
        options={{
          group: [3, 1],
          optionsData: [
            { children: 'Edit' },
            { children: 'Make a copy' },
            { children: 'Favorite' },
            {
              children: 'Delete',
              command: { children: '⌘⌫' },
              icon: {
                icon: Trash2,
              },
              className: 'text-red-500',
            },
          ],
        }}
      />
    </>
  )
}
