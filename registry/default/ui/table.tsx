import * as React from 'react'

import { Checkbox } from './checkbox'

import { cn, groupArrays, sortArray } from '@/lib/utils'
import { Input, Pagination, PaginationContent, PaginationItem } from './ShadcnUI'
import { Button, LabelType } from './button'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  CircleMinus,
  CirclePlus,
} from 'lucide-react'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { TooltipProvider } from './tooltip'
import { Combobox, ComboboxType, OnSelectType } from './combobox'
import { CommandListGroupDataType } from './command'
import {
  DataTableViewOptions,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuOptionsDataType,
  DropdownMenuOptionsType,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { CaretSortIcon, DotsHorizontalIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Badge } from './badge'
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import { ButtonProps } from 'react-day-picker'

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

interface TableDropdownMenuOptions {
  sortArray: typeof sortArray
  setHeaders: React.Dispatch<React.SetStateAction<TableHeaderColumns[]>>
  headers: TableHeaderColumns[]
  tableData: TableContentDataType[]
  setTableData: React.Dispatch<React.SetStateAction<TableContentDataType[]>>
  data: TableContentDataType[]
  idx: number
  column: TableHeaderColumns
}

interface TableHeaderColumns<Y extends boolean = true, T extends string = string>
  extends Partial<React.HTMLProps<HTMLTableCellElement>> {
  label: T
  sortable?: boolean
  currentSort?: Y extends true ? 'asc' | 'desc' | 'not sorted' : never
  dropdownMenuOptions?: Y extends true ? DropdownMenuOptionsDataType<TableDropdownMenuOptions>[] : never
}

interface TableHeaderColumnsType<T extends boolean = false> {
  header: TableHeaderColumns<T>[]
  headers: TableHeaderColumns<T>[]
  viewButton: boolean
  tableSearch: boolean
  setHeaders: React.Dispatch<React.SetStateAction<TableHeaderColumns<T>[]>>
  search: {
    searchValue: { q: string; qBy: string[] }
    setSearchValue: React.Dispatch<React.SetStateAction<{ q: string; qBy: string[] }>>
  }
  filter: ComboboxType<string>[]
}

const useDebounceCallback = <T extends (...args: any[]) => void>(callback: T, delay: number) => {
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  return (...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

const TableHeaderActions = <T extends boolean = false>({
  setHeaders,
  header,
  headers,
  search,
  viewButton,
  tableSearch,
  filter,
}: TableHeaderColumnsType<T>) => {
  const [value, setValue] = React.useState<string[]>([])

  React.useEffect(() => {
    search.setSearchValue({ ...search.searchValue, qBy: value })
  }, [value])

  const debouncedSearch = useDebounceCallback((newValue: string) => {
    search.setSearchValue(prev => ({
      ...prev,
      q: newValue,
    }))
  }, 500)

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between gap-2">
          {tableSearch && (
            <div className="flex flex-1 items-center space-x-2">
              <Input
                placeholder="Filter tasks..."
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => debouncedSearch(event.target.value)}
                className="h-8 w-[150px] lg:w-[200px]"
              />
            </div>
          )}
          {filter && (
            <div className={cn('flex items-center gap-2')}>
              {filter?.map((filter, idx) => {
                const {
                  className: triggerClassName,
                  children: triggerChildren,
                  ...triggerProps
                } = filter?.trigger ?? {}
                return (
                  <Combobox<string>
                    key={idx}
                    type={'listbox'}
                    title={filter?.title}
                    wrapper={filter?.wrapper}
                    trigger={{
                      icon: (
                        <CirclePlus
                          size={14}
                          className="!size-4 stroke-[1.5]"
                        />
                      ),
                      children: triggerChildren,
                      className: cn('[&>div>span]:text-xs ml-auto', triggerClassName),
                      // label: {
                      //   children: 'Select one',
                      //   showLabel: true,
                      //   side: 'top',
                      //   showCommand: true,
                      // },
                      // command: {
                      //   label: '⌘+m',
                      //   key: 'm',
                      // },
                      ...triggerProps,
                    }}
                    onSelect={
                      filter?.onSelect ?? {
                        value: value,
                        setValue: setValue,
                      }
                    }
                    content={filter?.content}
                  />
                )
              })}
            </div>
          )}
        </div>

        {viewButton && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size={'sm'}
                className="ml-auto hidden [&>div]:h-8 h-8 w-[79px] lg:flex [&>div]:gap-0 text-xs"
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
                  const { children, className, label, sortable, disabled, currentSort, dropdownMenuOptions, ...props } =
                    column
                  return (
                    idx !== 0 && (
                      <DropdownMenuCheckboxItem
                        key={idx}
                        className="capitalize"
                        checked={headers.includes(column)}
                        onCheckedChange={() => {
                          setHeaders(prevHeaders => {
                            const exists = prevHeaders.includes(column)
                            if (exists) {
                              return prevHeaders.filter(sub => sub !== column)
                            }

                            const originalIndex = header.indexOf(column)
                            const newHeaders = [...prevHeaders]
                            newHeaders.splice(originalIndex, 0, column)
                            return newHeaders.sort((a, b) => header.indexOf(a) - header.indexOf(b))
                          })
                        }}
                        disabled={disabled}
                        {...(props as React.ComponentPropsWithoutRef<typeof DropdownMenuCheckboxItem>)}
                      >
                        {label ?? children}
                      </DropdownMenuCheckboxItem>
                    )
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </>
  )
}

interface TableHeaderProps<T extends boolean = false> {
  headers: TableHeaderColumns<T>[]
  setHeaders: React.Dispatch<React.SetStateAction<TableHeaderColumns<T>[]>>
  tableData: TableContentDataType[]
  setTableData: React.Dispatch<React.SetStateAction<TableContentDataType[]>>
  selection: boolean
  selected: TableContentDataType[]
  setSelected: React.Dispatch<React.SetStateAction<TableContentDataType[]>>
}

const TableCustomHeader = <T extends boolean = false>({
  headers,
  setHeaders,
  tableData,
  setTableData,
  selection,
  selected,
  setSelected,
}: TableHeaderProps<T>) => {
  return (
    <>
      <TableHeader>
        <TableRow>
          {headers.map((column, idx) => {
            const { children, className, sortable, label, dropdownMenuOptions, currentSort, ...props } = column
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
                        idx === headers.length - 1 && 'justify-end',
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
                      {label ?? children}
                    </span>
                  ) : (
                    <div className={cn('flex items-center space-x-2', className)}>
                      {
                        <DataTableViewOptions<TableDropdownMenuOptions>
                          trigger={{
                            className: '-ml-3 h-8 data-[state=open]:bg-accent text-xs',
                            children: (
                              <>
                                <span>{label ?? children}</span>
                                {headers[idx]?.currentSort === 'asc' ? (
                                  <ArrowDownIcon className="ml-2 h-4 w-4" />
                                ) : headers[idx]?.currentSort === 'desc' ? (
                                  <ArrowUpIcon className="ml-2 h-4 w-4" />
                                ) : (
                                  <CaretSortIcon className="ml-2 h-4 w-4" />
                                )}
                              </>
                            ),
                            variant: 'ghost',
                            size: 'sm',
                          }}
                          content={{
                            align: 'start',
                            options: {
                              actionsArgs: {
                                sortArray,
                                setTableData,
                                setHeaders,
                                column,
                                idx,
                                data: tableData,
                                headers,
                                tableData,
                              } as TableDropdownMenuOptions,
                              group: [2, 1],
                              optionsData: dropdownMenuOptions!,
                            },
                          }}
                        />
                      }
                    </div>
                  )}
                </TableHead>
              )
            )
          })}
        </TableRow>
      </TableHeader>
    </>
  )
}

interface TableCustomBodyProps<T extends boolean = false> {
  headers: TableHeaderColumns<T>[]
  resultArrays: TableContentDataType[][]
  paginationState: PaginationState
  selection: boolean
  selected: TableContentDataType[]
  setSelected: React.Dispatch<React.SetStateAction<TableContentDataType[]>>
  options: DropdownMenuOptionsType<T>
}

const TableCustomBody = <T extends boolean = false>({
  headers,
  resultArrays,
  paginationState,
  selection,
  selected,
  setSelected,
  options,
}: TableCustomBodyProps<T>) => {
  return (
    <TableBody>
      {resultArrays[paginationState.activePage ?? 0]?.map((item, idx) => (
        <TableRow key={idx}>
          {Object.entries(item).map(([key, value], idx) => {
            const headersEntries = headers.map(
              item => item.label.toLowerCase() ?? item.children?.toString().toLowerCase()
            )
            const { className, children, ...props } = value

            return (
              headersEntries.includes(key.toLowerCase()) && (
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
                          setSelected(selected.includes(item) ? selected.filter(i => i !== item) : [...selected, item])
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
                  {idx === Object.entries(item).length - 1 && options && (
                    <DataTableViewOptions
                      trigger={{
                        className: 'flex h-8 w-12 p-0 data-[state=open]:bg-muted',
                        children: <span className="sr-only">Open menu</span>,
                        variant: 'ghost',
                        size: 'icon',
                        icon: <DotsHorizontalIcon className="h-4 w-4" />,
                      }}
                      content={{
                        align: 'end',
                        className: 'w-[160px]',
                        options,
                      }}
                    />
                  )}
                </TableCell>
              )
            )
          })}
        </TableRow>
      ))}
    </TableBody>
  )
}

interface TableCustomFooterColumns extends Partial<React.ComponentPropsWithoutRef<typeof TableFooter>> {
  columns: Partial<React.ComponentPropsWithoutRef<typeof TableCell>>[]
}

const TableCustomFooter = ({ className, columns }: TableCustomFooterColumns) => {
  return (
    <TableFooter className={cn(className)}>
      <TableRow>
        {columns?.map((item, idx) => {
          const { children, ...props } = item
          return (
            <TableCell
              key={idx}
              {...props}
            >
              {children}
            </TableCell>
          )
        })}
      </TableRow>
    </TableFooter>
  )
}

interface TableContentDataType {
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
  showNavigation?: boolean
  showGroup?: boolean
}

interface PaginationState {
  activePage: number
  groupSize: number
}

const TablePagination = ({
  resultArrays,
  selected,
  paginationState,
  pagination,
  value,
  tableData,
  setPaginationState,
  setValue,
}: {
  selected: TableContentDataType[]
  setValue: React.Dispatch<React.SetStateAction<string[]>>
  value: string[]
  tableData: TableContentDataType[]
  pagination?: TablePaginationType
  resultArrays: TableContentDataType[][]
  paginationState: PaginationState
  setPaginationState: React.Dispatch<React.SetStateAction<PaginationState>>
}) => {
  return (
    <>
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
                <Combobox<string>
                  type="combobox"
                  content={{
                    data: Array.from({ length: Math.ceil(tableData.length / 5) }, (_, index) =>
                      ((index + 1) * 5).toString()
                    ).reduce((acc, curr) => {
                      acc.push({ label: curr, element: { children: curr } })
                      return acc
                    }, [] as CommandListGroupDataType[]),
                    showSearchInput: false,
                    className: 'w-[5rem] h-fit',
                  }}
                  trigger={{
                    command: {
                      key: 'm',
                    },
                    label: { children: 'Rows per page', showLabel: true, side: 'top', className: 'text-xs' },
                    className: 'w-[4.5rem] h-[32px] gap-0',
                  }}
                  onSelect={{
                    setValue,
                    value,
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

          {pagination?.showNavigation && (
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
    </>
  )
}

interface TableViewProps<T extends boolean = false> {
  filters: ComboboxType<string>[]
  table?: TableType
  tableContentData: TableContentDataType[]
  selection?: boolean
  header?: TableHeaderColumns<T>[]
  footer?: TableCustomFooterColumns
  caption?: TableCaptionType
  pagination?: TablePaginationType
  viewButton?: boolean
  tableSearch?: boolean
  options: DropdownMenuOptionsType<T>
}

const TableView = <T extends boolean = false>({
  selection,
  pagination,
  viewButton,
  tableSearch,
  header,
  footer,
  tableContentData,
  caption,
  table,
  options,
  filters,
}: TableViewProps<T>) => {
  const { className: tableClassName, ...tableProps } = table! ?? {}
  const { children: captionChildren, className: captionClassName, ...captionProps } = caption! ?? []
  const [selected, setSelected] = React.useState<TableContentDataType[]>([])
  const [tableData, setTableData] = React.useState(tableContentData)
  const [paginationState, setPaginationState] = React.useState({
    activePage: pagination?.activePage ?? 0,
    groupSize: pagination?.groupSize ?? tableData.length / 3,
  })
  const [headers, setHeaders] = React.useState<TableHeaderColumns<T>[]>(header ?? [])
  const [search, setSearch] = React.useState<{ q: string; qBy: string[] }>({ q: '', qBy: [] })
  const [value, setValue] = React.useState<string[]>([paginationState.groupSize.toString()])
  const [filterLabels, setFilterLabels] = React.useState<{ [key: string]: number }>({})

  // Function to split array into chunks
  const splitIntoChunks = (array: typeof tableData, chunkSize: number) => {
    const chunks = []
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize))
    }
    return chunks
  }

  const filteredData = React.useMemo(() => {
    // Step 1: Filter the data based on search.q and search.qBy
    const data = tableData.filter(item => {
      return !search.qBy.length
        ? Object.values(item).some(value => JSON.stringify(value).toLowerCase().includes(search.q.toLowerCase()))
        : Object.values(item).some(value =>
            search.qBy.some(q => JSON.stringify(value).toLowerCase().includes(q.toLowerCase()))
          )
    })

    // Step 2: Calculate label counts based on the filtered data
    const labelCounts: { [key: string]: number } = {}
    data.forEach(item => {
      Object.values(item).forEach(value => {
        filters?.forEach(filter => {
          filter?.content?.data.forEach(option => {
            const label = option?.label?.toLowerCase()
            if (
              JSON.stringify(value)
                .toLowerCase()
                .includes(label ?? '')
            ) {
              labelCounts[label ?? ''] = (labelCounts[label ?? ''] || 0) + 1
            }
          })
        })
      })
    })

    // Update the filterLabels state with the new counts
    setFilterLabels(labelCounts)

    return data
  }, [tableData, filters, search])

  // Update the filters to display the count based on the filtered data
  const updatedFilters = React.useMemo(() => {
    return filters?.map(filter => {
      return {
        ...filter,
        content: {
          ...filter.content,
          data: filter?.content?.data.map(option => {
            const label = option?.label?.toLowerCase()
            return {
              ...option,
              element: {
                ...option.element,
                label: {
                  ...option?.element?.label,
                  children: filterLabels[label ?? ''] || 0,
                },
              },
            }
          }),
        },
      }
    })
  }, [filters, filterLabels])

  const resultArrays = splitIntoChunks(filteredData, +value)

  return (
    <div className="flex flex-col gap-4">
      <TableHeaderActions<T>
        search={{ searchValue: search, setSearchValue: setSearch }}
        viewButton={viewButton ?? false}
        tableSearch={tableSearch ?? false}
        header={header ?? []}
        filter={(updatedFilters as ComboboxType<string>[]) ?? []}
        headers={headers}
        setHeaders={setHeaders}
      />
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
            <TableCustomHeader<T>
              selection={selection ?? false}
              selected={selected}
              headers={headers}
              tableData={tableData}
              setHeaders={setHeaders}
              setTableData={setTableData}
              setSelected={setSelected}
            />
          )}
          {tableData && !!resultArrays.length && (
            <TableCustomBody<T>
              headers={headers}
              resultArrays={resultArrays}
              paginationState={paginationState}
              selection={selection ?? false}
              selected={selected}
              setSelected={setSelected}
              options={options}
            />
          )}
          {footer?.columns && <TableCustomFooter {...footer} />}
        </Table>
      </ScrollArea>
      {pagination && (
        <TablePagination
          selected={selected}
          value={value}
          tableData={tableData}
          resultArrays={resultArrays}
          paginationState={paginationState}
          pagination={pagination}
          setValue={setValue}
          setPaginationState={setPaginationState}
        />
      )}
    </div>
  )
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
  type TableContentDataType,
  type TableDataKey,
  type TableDropdownMenuOptions,
}
