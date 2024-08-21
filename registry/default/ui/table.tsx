import * as React from 'react'

import { Checkbox } from './checkbox'

import { cn } from '@/lib/utils'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from './ShadcnUI'
import { Button } from './button'
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, ChevronsUpDown } from 'lucide-react'
import { ScrollArea, ScrollAreaProps } from '@radix-ui/react-scroll-area'
import { TooltipProvider } from './tooltip'
import { Combobox } from './combobox'
import { CommandListGroupDataType } from './command'

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
}

interface TableFooterColumns extends React.HTMLProps<HTMLTableCellElement> {}

interface TableDataType {
  [key: string]: TableDataKey
}

interface TableType extends Partial<React.ComponentPropsWithoutRef<typeof ScrollArea>> {}
interface TableDataKey extends React.HTMLProps<HTMLTableCellElement> {}
interface TableCaptionType extends React.HTMLProps<HTMLTableCaptionElement> {}
interface TablePaginationType extends React.HTMLProps<HTMLDivElement> {
  groupSize: number
  activePage?: number
  showCount?: boolean
  showGroup?: boolean
}

interface TableViewProps {
  table?: TableType
  data: TableDataType[]
  selection?: boolean
  header?: TableHeaderColumns[]
  footer?: TableFooterColumns
  caption?: TableCaptionType
  pagination?: TablePaginationType
}

const TableView = ({ selection, pagination, header, footer, data, caption, table }: TableViewProps) => {
  const { className: tableClassName, ...tableProps } = table! ?? {}
  const { children: captionChildren, className: captionClassName, ...captionProps } = caption! ?? []
  const [selected, setSelected] = React.useState<TableDataType[]>([])
  const [tableData, setTableData] = React.useState(data)
  const [paginationState, setPaginationState] = React.useState({
    activePage: pagination?.activePage ?? 0,
    groupSize: pagination?.groupSize ?? tableData.length / 3,
  })

  const [value, setValue] = React.useState<string>(paginationState.groupSize.toString())
  const splitIntoChunks = (array: typeof tableData, chunkSize: number) => {
    const chunks = []
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize))
    }
    return chunks
  }

  const resultArrays = splitIntoChunks(tableData, +value)

  return (
    <div className="flex flex-col gap-4">
      <ScrollArea
        className={cn(`border border-border rounded-lg`, tableClassName)}
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
                    <TableHead
                      key={idx}
                      {...props}
                    >
                      {!sortable ? (
                        <span
                          className={cn(
                            'flex items-center gap-2 w-full',
                            idx === header.length - 1 && 'justify-end',
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
                        <Button
                          variant={'ghost'}
                          size={'sm'}
                          className="justify-start ml-[-.5rem]"
                          onClick={() => {
                            const sortedData = sortArray([...tableData], Object.keys(data[0])[idx], 'asc')
                            setTableData(sortedData)
                          }}
                        >
                          {children}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            </TableHeader>
          )}
          {tableData && !!resultArrays.length && (
            <TableBody>
              {resultArrays[paginationState.activePage ?? 0].map((item, idx) => (
                <TableRow key={idx}>
                  {Object.entries(item).map(([key, value], idx) => {
                    const { className, children, ...props } = value
                    return (
                      <TableCell
                        key={key}
                        className={cn(selected.includes(item) && 'bg-muted', className)}
                        {...props}
                      >
                        <span
                          className={cn(
                            'flex items-center gap-2 w-full',
                            idx === Object.entries(item).length - 1 && 'justify-end',
                            selection && 'items-center gap-2 flex',
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
                          {children}
                        </span>
                      </TableCell>
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

function sortArray<T>(array: T[], key?: keyof T, order: 'asc' | 'desc' = 'desc'): T[] {
  return array.sort((a, b) => {
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
