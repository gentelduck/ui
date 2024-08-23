import { toast } from 'sonner'
import {
  TableView,
  TableHeaderColumns,
  DropdownMenuShortcut,
  DropdownMenuOptionsDataType,
  TableContentDataType,
} from '../ui'
import { tableData } from '../ui/data'
import { ArrowDownIcon, ArrowUpIcon, Delete, LucideIcon, Trash, Trash2 } from 'lucide-react'
import { sortArray } from '@/lib/utils'
import { EyeNoneIcon } from '@radix-ui/react-icons'

const columns: TableHeaderColumns[] = [
  {
    children: 'task',
    sortable: false,
  },
  {
    children: 'title',
    className: 'w-[110px]',
    sortable: true,
  },
  {
    children: 'status',
    sortable: true,
    className: 'w-[70px]',
    currentSort: 'not sorted',
  },
  {
    children: 'label',
    className: 'w-[90px]',
    sortable: true,
    currentSort: 'not sorted',
  },
  {
    children: 'priority',
    sortable: true,
  },
]

export default function DataTableMainDemo() {
  return (
    <>
      <TableView
        table={{
          className: 'w-[650px] h-[335px]',
        }}
        header={columns}
        tableContentData={[...tableData]}
        // caption={{
        //   children: 'A list of your recent invoices.',
        // }}
        // footer={{}}
        selection={true}
        viewButton={true}
        pagination={{
          groupSize: 6,
          showCount: true,
          showGroup: true,
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

interface TableViewProps {
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
    action: ({ sortArray, setHeaders, setTableData, data, headers, idx, column }) => {
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
    action: ({ sortArray, setHeaders, setTableData, data, headers, idx, column }) => {
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
    action: ({ sortArray, setHeaders, setTableData, data, headers, idx, column }) => {
      setHeaders(headers.filter(sub => sub !== column))
    },
    icon: {
      icon: EyeNoneIcon as LucideIcon,
      className: 'mr-2 h-3.5 w-3.5 text-muted-foreground/70',
    },
    children: 'Hide',
  },
]
