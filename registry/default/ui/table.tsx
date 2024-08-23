import * as React from 'react'

import { Checkbox } from './checkbox'

import { cn } from '@/lib/utils'
import {
  Input,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  ScrollBar,
} from './ShadcnUI'
import { Button, LabelType } from './button'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpDown,
} from 'lucide-react'
import { ScrollArea, ScrollAreaProps } from '@radix-ui/react-scroll-area'
import { TooltipProvider } from './tooltip'
import { Combobox } from './combobox'
import { CommandListGroupDataType } from './command'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import { CaretSortIcon, DotsHorizontalIcon, EyeNoneIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Badge } from './badge'

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
)
Table.displayName = 'Table'

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn('[&_tr]:border-b', className)}
      {...props}
    />
  )
)
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
)
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  )
)
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className)}
      {...props}
    />
  )
)
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  )
)
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
      {...props}
    />
  )
)
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn('mt-4 text-sm text-muted-foreground', className)}
      {...props}
    />
  )
)
TableCaption.displayName = 'TableCaption'

interface TableHeaderColumns extends React.HTMLProps<HTMLTableCellElement> {
  sortable: boolean
  currentSort?: 'asc' | 'desc' | 'not sorted'
}

interface TableFooterColumns extends React.HTMLProps<HTMLTableCellElement> {}

interface TableDataType {
  [key: string]: TableDataKey
}

interface TableType extends Partial<React.ComponentPropsWithoutRef<typeof ScrollArea>> {}
interface TableDataKey extends React.HTMLProps<HTMLTableCellElement> {
  withLabel?: LabelType
  withIcon?: React.ReactNode
}
interface TableCaptionType extends React.HTMLProps<HTMLTableCaptionElement> {}
interface TablePaginationType extends React.HTMLProps<HTMLDivElement> {
  groupSize: number
  activePage?: number
  showCount?: boolean
  showGroup?: boolean
}

interface TableOptionsType {
  optionsData?: React.ComponentPropsWithoutRef<typeof DropdownMenuItem>[]
}

interface TableViewProps {
  table?: TableType
  data: TableDataType[]
  selection?: boolean
  header?: TableHeaderColumns[]
  footer?: TableFooterColumns
  caption?: TableCaptionType
  pagination?: TablePaginationType
  viewButton?: boolean
  options: TableOptionsType
}

type Checked = DropdownMenuCheckboxItemProps['checked']

const TableView = ({
  selection,
  pagination,
  viewButton,
  header,
  footer,
  data,
  caption,
  table,
  options,
}: TableViewProps) => {
  const { className: tableClassName, ...tableProps } = table! ?? {}
  const { children: captionChildren, className: captionClassName, ...captionProps } = caption! ?? []
  const [selected, setSelected] = React.useState<TableDataType[]>([])
  const [tableData, setTableData] = React.useState(data)
  const [paginationState, setPaginationState] = React.useState({
    activePage: pagination?.activePage ?? 0,
    groupSize: pagination?.groupSize ?? tableData.length / 3,
  })
  const [headers, setHeaders] = React.useState<TableHeaderColumns[]>(header ?? [])
  const [search, setSearchQ] = React.useState<{ q: string; qBy: string }>({ q: '', qBy: '' })
  const [value, setValue] = React.useState<string>(paginationState.groupSize.toString())

  const splitIntoChunks = (array: typeof tableData, chunkSize: number) => {
    const chunks = []
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize))
    }
    return chunks
  }

  //NOTE: filtring the data depednign on the q
  const filteredData = tableData.filter(item => {
    if (search.qBy === '') {
      return Object.values(item).some(value => {
        return JSON.stringify(value).includes(search.q)
      })
    } else {
      return item[search.qBy as keyof typeof item]?.toString()?.includes(search.q)
    }
  })

  const resultArrays = splitIntoChunks(filteredData, +value)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center space-x-2">
            <Input
              placeholder="Filter tasks..."
              value={search.q}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchQ({ ...search, q: event.target.value })
              }}
              className="h-8 w-[150px] lg:w-[250px]"
            />
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size={'sm'}
              className="ml-auto hidden [&>div]:h-8 h-8 w-[79px] lg:flex [&>div]:gap-0"
            >
              <MixerHorizontalIcon className="mr-2 h-4 w-4" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {header &&
              header.map((column, idx) => {
                const { children, className, sortable, disabled, ...props } = column
                return (
                  idx !== 0 && (
                    <DropdownMenuCheckboxItem
                      key={idx}
                      className="capitalize"
                      checked={headers.includes(column)}
                      onCheckedChange={() => {
                        setHeaders(
                          headers.includes(column) ? headers.filter(sub => sub !== column) : [...headers, column]
                        )
                      }}
                      disabled={disabled}
                    >
                      {children}
                    </DropdownMenuCheckboxItem>
                  )
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ScrollArea
        className={cn(`border border-border rounded-lg overflow-auto`, tableClassName)}
        {...tableProps}
      >
        <Table>
          {caption && (
            <TableCaption
              className={cn('mb-4', captionClassName)}
              {...captionProps}
            >
              {caption?.children}
            </TableCaption>
          )}
          {header && (
            <TableHeader>
              <TableRow>
                {header.map((column, idx) => {
                  const { children, className, sortable, ...props } = column
                  return (
                    headers.some(header => header.children === column.children) && (
                      <TableHead
                        key={idx}
                        className="h-[40px]"
                        {...props}
                      >
                        {!sortable ? (
                          <span
                            className={cn(
                              'flex items-center gap-2 w-full h-8 data-[state=open]:bg-accent text-xs',
                              idx === headers.length - 1 && 'justify-end bg-red-500',
                              className
                            )}
                          >
                            {selection && idx === 0 && (
                              <Checkbox
                                className="border-border"
                                onClick={() =>
                                  setSelected(selected.length === tableData.length ? [] : tableData.map(item => item))
                                }
                                checked={
                                  selected.length === tableData.length
                                    ? true
                                    : selected.length < tableData.length && selected.length
                                      ? 'indeterminate'
                                      : false
                                }
                              />
                            )}
                            {children}
                          </span>
                        ) : (
                          <div className={cn('flex items-center space-x-2', className)}>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="-ml-3 h-8 data-[state=open]:bg-accent text-xs"
                                >
                                  <span>{children}</span>
                                  {headers[idx]?.currentSort === 'asc' ? (
                                    <ArrowDownIcon className="ml-2 h-4 w-4" />
                                  ) : headers[idx]?.currentSort === 'desc' ? (
                                    <ArrowUpIcon className="ml-2 h-4 w-4" />
                                  ) : (
                                    <CaretSortIcon className="ml-2 h-4 w-4" />
                                  )}
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="start">
                                <DropdownMenuItem
                                  onClick={() => {
                                    const { sortedData, updatedColumns } = sortArray(
                                      headers,
                                      data,
                                      Object.keys(data[0])[idx],
                                      'asc'
                                    )
                                    setHeaders(() => updatedColumns)
                                    setTableData(() => (updatedColumns[idx].currentSort === 'asc' ? sortedData : data))
                                  }}
                                >
                                  <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                                  Asc
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    const { sortedData, updatedColumns } = sortArray(
                                      headers,
                                      data,
                                      Object.keys(data[0])[idx],
                                      'desc'
                                    )
                                    setHeaders(() => updatedColumns)
                                    setTableData(() => (updatedColumns[idx].currentSort === 'desc' ? sortedData : data))
                                  }}
                                >
                                  <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                                  Desc
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setHeaders(headers.filter(sub => sub !== column))
                                  }}
                                >
                                  <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                                  Hide
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}
                      </TableHead>
                    )
                  )
                })}
              </TableRow>
            </TableHeader>
          )}
          {tableData && !!resultArrays.length && (
            <TableBody>
              {resultArrays[paginationState.activePage ?? 0]?.map((item, idx) => (
                <TableRow key={idx}>
                  {Object.entries(item).map(([key, value], idx) => {
                    const headersEntries = headers.map(item => item.children)
                    const { className, children, ...props } = value
                    console.log(item?.[key]?.withLabel, item[key])

                    return (
                      headersEntries.includes(key) && (
                        <TableCell
                          key={key}
                          className={cn(
                            'py-2',
                            selected.includes(item) && 'bg-muted',
                            idx === Object.entries(item).length - 1 && 'flex items-center gap-2',
                            className
                          )}
                          {...props}
                        >
                          <div
                            className={cn(
                              'items-center gap-2 flex w-full',
                              // idx === Object.entries(item).length - 1 && 'justify-end',
                              headers?.[idx]?.className,
                              className
                            )}
                          >
                            {selection && idx === 0 && (
                              <Checkbox
                                className="border-border"
                                onClick={() =>
                                  setSelected(
                                    selected.includes(item) ? selected.filter(i => i !== item) : [...selected, item]
                                  )
                                }
                                checked={selected.includes(item)}
                              />
                            )}
                            {item?.[key]?.withLabel && (
                              <Badge
                                variant={'outline'}
                                size={'sm'}
                                className="h-5 text-xs"
                              >
                                documentation
                              </Badge>
                            )}

                            <span className="text-ellipsis overflow-hidden whitespace-nowrap">{children}</span>
                          </div>
                          {idx === Object.entries(item).length - 1 && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size={'icon'}
                                  className="flex h-8 w-12 p-0 data-[state=open]:bg-muted"
                                >
                                  <DotsHorizontalIcon className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="w-[160px]"
                              >
                                {options.optionsData?.map((item, idx) => {
                                  const { children, className, ...props } = item
                                  return (
                                    <DropdownMenuItem
                                      key={idx}
                                      className={className}
                                      {...props}
                                    >
                                      {children}
                                    </DropdownMenuItem>
                                  )
                                })}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  Delete
                                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </TableCell>
                      )
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          )}
          {footer && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </ScrollArea>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          {pagination?.showCount && (
            <span className="flex items-center justify-center text-sm font-medium text-muted-foreground whitespace-nowrap">
              {selected.length} of {tableData.length} row(s) selected.
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-4">
          {pagination?.showGroup && (
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center text-sm font-medium text-muted-foreground whitespace-nowrap">
                Rows per page
              </span>
              <TooltipProvider>
                <Combobox
                  data={Array.from({ length: Math.ceil(tableData.length / 5) }, (_, index) =>
                    ((index + 1) * 5).toString()
                  ).reduce((acc, curr) => {
                    acc.push({ label: curr, element: { children: curr } })
                    return acc
                  }, [] as CommandListGroupDataType[])}
                  className={{ trigger: 'w-[4.5rem] h-[32px] gap-0', content: 'w-[5rem] h-fit' }}
                  label={{ children: 'Rows per page' }}
                  onSelect={{
                    setValue,
                    value,
                  }}
                  commandInput={false}
                  command={{
                    key: 'm',
                  }}
                />
              </TooltipProvider>
            </div>
          )}
          {pagination?.showCount && (
            <span className="flex items-center justify-center text-sm font-medium text-muted-foreground whitespace-nowrap">
              Page {paginationState.activePage + 1} of {resultArrays.length}
            </span>
          )}

          {pagination && (
            <Pagination className="justify-end">
              <PaginationContent className="gap-2">
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-[32px] h-[32px] p-0"
                    disabled={paginationState.activePage === 0}
                    onClick={() => setPaginationState({ ...paginationState, activePage: 0 })}
                  >
                    <ChevronsLeftIcon className="size-4" />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-[32px] h-[32px] p-0"
                    onClick={() =>
                      setPaginationState({ ...paginationState, activePage: (paginationState.activePage ?? 1) - 1 })
                    }
                    disabled={paginationState.activePage === 0}
                  >
                    <ChevronLeftIcon className="size-4" />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-[32px] h-[32px] p-0"
                    onClick={() =>
                      setPaginationState({ ...paginationState, activePage: (paginationState.activePage ?? 1) + 1 })
                    }
                    disabled={paginationState.activePage === resultArrays.length - 1}
                  >
                    <ChevronRightIcon className="size-4" />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-[32px] h-[32px] p-0"
                    onClick={() => setPaginationState({ ...paginationState, activePage: resultArrays.length - 1 })}
                    disabled={paginationState.activePage === resultArrays.length - 1}
                  >
                    <ChevronsRightIcon className="size-4" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  )
}

function sortArray<T>(
  columns: TableHeaderColumns[],
  array: T[],
  key?: keyof T,
  order: 'asc' | 'desc' | 'not sorted' = 'desc'
) {
  const toggleSortOrder = (
    order: 'asc' | 'desc' | 'not sorted',
    currentOrder: 'asc' | 'desc' | 'not sorted'
  ): 'asc' | 'desc' | 'not sorted' => (order === 'not sorted' ? currentOrder : 'not sorted')

  const updatedColumns = columns.map(col => {
    if (col.children === key) {
      return {
        ...col,
        currentSort: toggleSortOrder(col.currentSort!, order),
      }
    }
    return col
  })

  const sortedData = array.sort((a, b) => {
    const valueA = key ? a[key] : a
    const valueB = key ? b[key] : b

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    } else if (typeof valueA === 'number' && typeof valueB === 'number') {
      return order === 'asc' ? valueA - valueB : valueB - valueA
    } else {
      return order === 'asc' ? (valueA > valueB ? 1 : -1) : valueA < valueB ? 1 : -1
    }
  })
  return { sortedData, updatedColumns }
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableView,
  type TableHeaderColumns,
  type TableViewProps as TableProps,
  type TableDataType,
  type TableDataKey,
}
