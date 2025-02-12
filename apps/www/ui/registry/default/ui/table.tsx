import * as React from 'react'

import { cn, sortArray } from '@/lib/utils'
import { ArrowDownIcon, ArrowUpIcon, CirclePlus, Ellipsis } from 'lucide-react'
import { CaretSortIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Checkbox } from './checkbox'
import { ScrollArea, ScrollBar } from './scroll-area'
import { PaginationCustomView } from './pagination'
import { InputCustomView } from './input'
import { LabelType } from './button'
import { TooltipProvider } from './tooltip'
import { Combobox, type ComboboxType } from './combobox'
import { type CommandListGroupDataType } from './command'
import { type DropdownMenuOptionsDataType, type DropdownMenuOptionsType, DropdownMenuView } from './dropdown-menu'
import { Badge } from './badge'
import { ContextCustomView, type ContextMenuOptionsType } from './context-menu'
import { useDuckShortcut } from '@ahmedayob/duck-shortcut'
import { useDebounceCallback } from '@/hooks'

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

export interface TableDropdownMenuOptionsType<C extends Record<string, any> = Record<string, string>> {
  sortArray: typeof sortArray
  setHeaders: React.Dispatch<React.SetStateAction<TableHeaderType[]>>
  headers: TableHeaderType[]
  tableData: TableContentDataType<C>[]
  setTableData: React.Dispatch<React.SetStateAction<TableContentDataType<C>[]>>
  data: TableContentDataType<C>[]
  idx: number
  column: TableHeaderType
}

export interface TableHeaderType<T extends boolean = true, C extends Record<string, any> = Record<string, string>>
  extends Partial<React.HTMLProps<HTMLTableCellElement>> {
  label: Extract<keyof C, string>
  sortable?: boolean
  showLabel?: T
  currentSort?: T extends true ? 'asc' | 'desc' | 'not sorted' : never
  dropdownMenuOptions?: T extends true ? DropdownMenuOptionsDataType<TableDropdownMenuOptionsType<C>>[] : never
}

export interface TableHeaderActionsProps<
  T extends boolean,
  C extends Record<string, unknown>,
  Y extends keyof Record<string, unknown>,
> {
  header: TableHeaderType<T, C>[]
  headers: TableHeaderType<T, C>[]
  viewButton: boolean
  tableSearch: boolean
  setHeaders: React.Dispatch<React.SetStateAction<TableHeaderType<T, C>[]>>
  search: {
    searchValue: { q: string; qBy: string[] }
    setSearchValue: React.Dispatch<React.SetStateAction<{ q: string; qBy: string[] }>>
  }
  filter: ComboboxType<Y, Extract<keyof C, string>>[]
}

export interface TableHeaderOptionsType<C extends Record<string, any> = Record<string, string>> {
  sortArray: typeof sortArray
  setHeaders: React.Dispatch<React.SetStateAction<TableHeaderType[]>>
  headers: TableHeaderType[]
  tableData: TableContentDataType<C>[]
  setTableData: React.Dispatch<React.SetStateAction<TableContentDataType<C>[]>>
  data: TableContentDataType<C>[]
  idx: number
  column: TableHeaderType
}

const TableHeaderActions = <
  T extends boolean = true,
  C extends Record<string, any> = Record<string, string>,
  Y extends keyof Record<string, unknown> = string,
>({
  setHeaders,
  header,
  headers,
  search,
  viewButton,
  tableSearch,
  filter,
}: TableHeaderActionsProps<T, C, Y>) => {
  const [value, setValue] = React.useState<string[]>([])

  React.useEffect(() => {
    search.setSearchValue({ ...search.searchValue, qBy: value })
  }, [value])

  //NOTE: Debounce search
  const debouncedSearch = useDebounceCallback((newValue: string) => {
    search.setSearchValue(prev => ({
      ...prev,
      q: newValue,
    }))
  }, 500)
  console.log(headers)

  //NOTE: Gen options for filteres with label values
  const optionsData = header.map((column, idx) => {
    const { children, className, label, sortable, disabled, currentSort, dropdownMenuOptions, ...props } = column

    return {
      key: idx,
      className: 'capitalize',
      checked: headers.some(headerItem => headerItem.label === label),
      disabled: disabled,
      onCheckedChange: () => {
        setHeaders(prevHeaders => {
          const exists = prevHeaders.some(headerItem => headerItem.label === label)

          if (exists) {
            return prevHeaders.filter(headerItem => headerItem.label !== label)
          }

          const originalIndex = header.findIndex(headerItem => headerItem.label === label)
          const newHeaders = [...prevHeaders]
          newHeaders.splice(originalIndex, 0, column)
          return newHeaders.sort(
            (a, b) =>
              header.findIndex(headerItem => headerItem.label === a.label) -
              header.findIndex(headerItem => headerItem.label === b.label)
          )
        })
      },
      children: label ?? children,
      ...props,
    }
  }) as DropdownMenuOptionsDataType<C>[]

  //NOTE: Duck shortcut
  const inputRef = React.useRef<HTMLInputElement>(null)
  useDuckShortcut({
    keys: ['ctrl+shift+f'],
    onKeysPressed: () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    },
  })

  return (
    <>
      <div className="flex items-end lg:items-center justify-between">
        <div className="grid lg:flex items-center lg:justify-between gap-2">
          {/*NOTE: Rendering the search bar only if the tableSearch prop is true.*/}
          {tableSearch && (
            <div className="flex flex-1 items-center space-x-2">
              <InputCustomView
                trigger={{
                  className: 'h-8 w-[150px] lg:w-[200px]',
                  placeholder: 'Filter tasks...',
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) => debouncedSearch(event.target.value),
                }}
                label={{
                  children: 'Filter tasks...',
                }}
                badge={{
                  children: '⌃+⇧+F',
                }}
              />
            </div>
          )}

          {/*NOTE: Rendering the filter only if the filter prop is true.*/}
          {filter && (
            <div className={cn('flex items-center gap-2')}>
              {filter?.map((filter, idx) => {
                const {
                  className: triggerClassName,
                  children: triggerChildren,
                  ...triggerProps
                } = filter?.trigger ?? {}
                return (
                  <Combobox<Y, Extract<keyof C, string>>
                    key={idx}
                    type={'listbox'}
                    title={filter?.title}
                    wrapper={filter?.wrapper}
                    trigger={{
                      icon: {
                        icon: CirclePlus,
                        className: '!size-4 stroke-[1.5]',
                      },
                      children: (triggerChildren ?? 'not found') as Y,
                      className: cn('[&>div>span]:text-xs ml-auto w-[88px] lg:w-auto capitalize', triggerClassName),
                      ...triggerProps,
                    }}
                    onSelect={
                      filter?.onSelect ?? {
                        value: value as Extract<keyof C, string>[],
                        setValue: setValue as React.Dispatch<React.SetStateAction<Extract<keyof C, string>[]>>,
                      }
                    }
                    content={{
                      ...filter?.content!,
                    }}
                  />
                )
              })}
            </div>
          )}
        </div>

        {/*NOTE: Rendering the view button only if the viewButton prop is true.*/}
        {viewButton && (
          <DropdownMenuView
            trigger={{
              children: (
                <>
                  <MixerHorizontalIcon className="mr-2 h-4 w-4" />
                  View
                </>
              ),
              className: 'ml-auto [&>div]:h-8 h-8 w-[79px] lg:flex [&>div]:gap-0 text-xs',
              label: {
                children: 'Toggle columns',
                showCommand: true,
                showLabel: true,
                side: 'top',
              },
              command: {
                key: 'ctrl+shift+v',
                label: '⌃+⇧+V',
              },
            }}
            content={{
              label: {
                children: 'Toggle columns',
              },
              options: {
                itemType: 'checkbox',
                optionsData: optionsData,
              },
            }}
          />
        )}
      </div>
    </>
  )
}
TableHeaderActions.displayName = 'TableHeaderActions'

export interface TableCustomViewHeaderProps<
  T extends boolean = false,
  C extends Record<string, any> = Record<string, string>,
> {
  headers: TableHeaderType<T, C>[]
  setHeaders: React.Dispatch<React.SetStateAction<TableHeaderType<T, C>[]>>
  tableData: TableContentDataType<C>[]
  setTableData: React.Dispatch<React.SetStateAction<TableContentDataType<C>[]>>
  selection: boolean
  selected: TableContentDataType<C>[]
  setSelected: React.Dispatch<React.SetStateAction<TableContentDataType<C>[]>>
}

const TableCustomViewHeader = <T extends boolean = false, C extends Record<string, any> = Record<string, string>>({
  headers,
  setHeaders,
  tableData,
  setTableData,
  selection,
  selected,
  setSelected,
}: TableCustomViewHeaderProps<T, C>) => {
  return (
    <>
      <TableHeader>
        <TableRow>
          {headers.map((column, idx) => {
            const { children, className, sortable, label, showLabel, dropdownMenuOptions, currentSort, ...props } =
              column
            const actionsArgs = {
              sortArray,
              setTableData,
              setHeaders,
              column,
              idx,
              data: tableData,
              headers,
              tableData,
            } as unknown as TableDropdownMenuOptionsType<C>

            //NOTE: passing the actionsArgs to the onClick function
            const fullDropDownMenuOptions = dropdownMenuOptions?.map(item => {
              return {
                ...item,
                onClick: (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>) => {
                  item.action?.(e, actionsArgs)
                },
              }
            })

            return (
              headers.some(header => header.children === column.children) && (
                <TableHead
                  key={idx}
                  className="h-[40px] py-2"
                  {...props}
                >
                  {/*NOTE: Rendering Sorting else rendering label*/}
                  {!sortable ? (
                    <span
                      className={cn(
                        'flex items-center gap-2 w-full h-8 data-[state=open]:bg-accent text-xs capitalize',
                        dropdownMenuOptions?.length && 'justify-end',
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
                      {(label as string) ?? children}
                    </span>
                  ) : (
                    <div className={cn('flex items-center space-x-2', className)}>
                      {dropdownMenuOptions?.length && (
                        <DropdownMenuView<TableDropdownMenuOptionsType<C>>
                          trigger={{
                            className: '-ml-3 h-8 data-[state=open]:bg-accent text-xs ',
                            children: (
                              <>
                                <span className="capitalize">{(label as string) ?? children}</span>
                                {headers[idx]?.currentSort === 'asc' ? (
                                  <ArrowDownIcon className="ml-2 h-4 w-4" />
                                ) : headers[idx]?.currentSort === 'desc' ? (
                                  <ArrowUpIcon className="ml-2 h-4 w-4" />
                                ) : (
                                  <CaretSortIcon className="ml-2 h-4 w-4" />
                                )}
                              </>
                            ),
                            label: showLabel
                              ? {
                                  children: label.toString() + ' options',
                                  className: 'capitalize',
                                  showLabel: true,
                                  side: 'top',
                                }
                              : undefined,
                            variant: 'ghost',
                            size: 'sm',
                          }}
                          content={{
                            align: 'start',
                            options: {
                              group: [2, 1],
                              optionsData: fullDropDownMenuOptions as
                                | DropdownMenuOptionsDataType<TableDropdownMenuOptionsType<C>>[]
                                | undefined,
                            },
                          }}
                        />
                      )}
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
TableCustomViewHeader.displayName = 'TableCustomViewHeader'

export interface TableCustomBodyProps<
  T extends boolean,
  C extends Record<string, unknown>,
  Y extends keyof Record<string, unknown>,
> {
  headers: TableHeaderType<T, C>[]
  resultArrays: TableContentDataType<C>[][]
  paginationState: PaginationState
  selection: boolean
  selected: TableContentDataType<C>[]
  setSelected: React.Dispatch<React.SetStateAction<TableContentDataType<C>[]>>
  dropdownMenu: DropdownMenuOptionsType<TableHeaderOptionsType<C>>
  contextMenu: ContextMenuOptionsType<TableHeaderOptionsType<C>>
  filtersData: ComboboxType<Extract<keyof C, string>, Y>[] | undefined
}

export type TableDataFilteredType<T extends Record<string, unknown>> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

const TableCustomBody = <
  T extends boolean,
  C extends Record<string, unknown>,
  Y extends keyof Record<string, unknown>,
>({
  headers,
  resultArrays,
  paginationState,
  selection,
  selected,
  setSelected,
  dropdownMenu,
  contextMenu,
  filtersData,
}: TableCustomBodyProps<T, C, Y>) => {
  return (
    <TableBody>
      {resultArrays[paginationState.activePage ?? 0]?.map((item, idx) => {
        {
          /*NOTE: filtering the data based on headers */
        }
        const tableDataFiltered = Object.entries(item).filter(([key]) => {
          const headersEntries = headers.map(
            item => item.label.toString().toLowerCase() ?? item.children?.toString().toLowerCase()
          )
          return headersEntries.includes(key.toLowerCase())
        }) as TableDataFilteredType<typeof item>

        return (
          <ContextCustomView
            key={idx}
            trigger={{
              children: (
                <TableRow key={idx}>
                  {tableDataFiltered.map(([key, value], idx) => {
                    const headersEntries = headers.map(
                      item => item.label.toString().toLowerCase() ?? item.children?.toString().toLowerCase()
                    )
                    const { className, children, withLabel, ...props } = value
                    const {
                      className: labelClassName,
                      children: labelChildren,
                      type: labelType = 'default',
                      ...labelProps
                    } = item?.[key]?.withLabel ?? {}

                    return (
                      headersEntries.includes(key.toString().toLowerCase()) && (
                        <TableCell
                          key={key}
                          className={cn('py-2 h-[50px]', selected.includes(item) && 'bg-muted', className)}
                          {...props}
                        >
                          <div
                            className={cn(
                              'items-center gap-2 flex w-full',
                              headers?.[idx]?.className,
                              className,
                              idx === headersEntries.length - 1 && dropdownMenu && 'justify-between w-full'
                            )}
                          >
                            {/*NOTE: Rendering Checkbox */}
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

                            {/*NOTE: Rendering Label */}
                            {labelChildren && (
                              <Badge
                                variant={'outline'}
                                size={'sm'}
                                className={cn(labelType === 'default' ? '' : 'bg-red-500', labelClassName)}
                                {...labelProps}
                              >
                                {labelChildren}
                              </Badge>
                            )}

                            <div className="flex items-center gap-2 text-ellipsis overflow-hidden whitespace-nowrap">
                              {/*NOTE: Getting Icons from Filter Data */}
                              {filtersData?.length &&
                                filtersData?.map(item => {
                                  return item?.content?.data.map((item, idx) => {
                                    const { icon: Icon, ...props } = item?.element?.icon ?? {}
                                    return item.label?.toString().toLowerCase() ===
                                      (children as string).toString().toLowerCase() ? (
                                      <span
                                        className="whitespace-nowrap"
                                        key={idx}
                                      >
                                        {(Icon ? <Icon {...props} /> : '') as React.ReactNode}
                                      </span>
                                    ) : null
                                  })
                                })}

                              {/*NOTE: Rendering the row column childrend */}
                              <span className="text-ellipsis overflow-hidden whitespace-nowrap">{children}</span>
                            </div>
                            {/*NOTE: Dropdown Menu */}
                            {idx === headersEntries.length - 1 && dropdownMenu.optionsData?.length && (
                              <DropdownMenuView
                                trigger={{
                                  className: 'flex h-8 w-8 p-0 data-[state=open]:bg-muted',
                                  children: <span className="sr-only">Open menu</span>,
                                  variant: 'ghost',
                                  size: 'icon',
                                  icon: {
                                    icon: Ellipsis,
                                    className: 'h-4 w-4',
                                  },
                                }}
                                content={{
                                  align: 'end',
                                  options: dropdownMenu,
                                }}
                              />
                            )}
                          </div>
                        </TableCell>
                      )
                    )
                  })}
                </TableRow>
              ),
            }}
            content={{
              options: contextMenu,
            }}
          />
        )
      })}
    </TableBody>
  )
}
TableCustomBody.displayName = 'TableCustomBody'

export interface TableFooterProps extends Partial<React.ComponentPropsWithoutRef<typeof TableFooter>> {
  columns: FooterColumnType[]
}

export type FooterColumnType = Partial<React.ComponentPropsWithoutRef<typeof TableCell>>

const TableCustomFooter = ({ className, columns }: TableFooterProps) => {
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

export type TableContentDataType<C extends Record<string, any> = Record<string, string>> = {
  [key in keyof C]: TableDataKey & { children: C[key] }
}

export interface TableType extends Partial<React.ComponentPropsWithoutRef<typeof ScrollArea>> {}
export interface TableDataKey extends React.HTMLProps<HTMLTableCellElement> {
  withLabel?: Omit<LabelType, 'showCommand' | 'showLabel'>
  withIcon?: React.ReactNode
}
export interface TableCaptionType extends React.HTMLProps<HTMLTableCaptionElement> {}
export interface TablePaginationsType extends React.HTMLProps<HTMLDivElement> {
  groupSize: number
  activePage?: number
  showPageCount?: boolean
  showSelectCount?: boolean
  showNavigation?: boolean
  showGroup?: boolean
}

export interface PaginationState {
  activePage: number
  groupSize: number
}

export interface TablePaginationType<C extends Record<string, any> = Record<string, string>> {
  selected: TableContentDataType<C>[]
  setValue: React.Dispatch<React.SetStateAction<string[]>>
  value: string[]
  tableData: TableContentDataType<C>[]
  paginations?: TablePaginationsType
  resultArrays: TableContentDataType<C>[][]
  paginationState: PaginationState
  setPaginationState: React.Dispatch<React.SetStateAction<PaginationState>>
}

const TablePagination = <
  C extends Record<string, unknown> = Record<string, string>,
  Y extends keyof Record<string, unknown> = string,
>({
  resultArrays,
  selected,
  paginationState,
  paginations,
  value,
  tableData,
  setPaginationState,
  setValue,
}: TablePaginationType<C>) => {
  //NOTE: gen the page length data
  const pageLengthData = paginations?.groupSize
    ? Array.from({ length: Math.ceil(tableData.length / paginations.groupSize) }, (_, index) => {
        const start = index * paginations.groupSize + 1
        const end = Math.min((index + 1) * paginations.groupSize, tableData.length)
        if (start > tableData.length) return null
        return end.toString()
      })
        .filter(Boolean)
        .reduce((acc, curr) => {
          acc.push({ label: curr!, element: { children: curr! } })
          return acc
        }, [] as CommandListGroupDataType[])
    : []

  return (
    <>
      <div className="grid lg:flex items-center lg:justify-between gap-4 lg::gap-0">
        <div className="flex items-center justify-between">
          {/*NOTE: Select Count */}
          {paginations?.showSelectCount && (
            <span className="flex items-center justify-center text-sm font-medium text-muted-foreground whitespace-nowrap">
              {selected.length} of {tableData.length} row(s) selected.
            </span>
          )}
        </div>
        <div className="flex items-center lg:justify-between lg:gap-4">
          {/*NOTE: Group Size */}
          {paginations?.showGroup && (
            <div className="flex items-center gap-2">
              <span className="max-2xl:hidden flex items-center justify-center text-sm font-medium text-muted-foreground whitespace-nowrap">
                Rows per page
              </span>
              <TooltipProvider>
                <Combobox<Extract<keyof C, string>, Y>
                  type="combobox"
                  content={{
                    data: (pageLengthData ?? []) as CommandListGroupDataType<Y>[],
                    showSearchInput: false,
                    className: 'w-[5rem] h-fit',
                  }}
                  trigger={{
                    command: {
                      key: 'ctrl+shift+c',
                      label: '⌃+⇧+C',
                    },
                    label: {
                      children: 'Rows per page',
                      showLabel: true,
                      side: 'top',
                      className: 'text-xs',
                      showCommand: true,
                    },
                    className: 'w-[4.5rem] h-[32px] gap-0',
                  }}
                  onSelect={{
                    setValue: setValue as React.Dispatch<React.SetStateAction<Y[]>>,
                    value: value as Y[],
                  }}
                />
              </TooltipProvider>
            </div>
          )}
          {paginations?.showPageCount && (
            <span className="max-lg:hidden flex items-center justify-center text-sm font-medium text-muted-foreground whitespace-nowrap">
              Page {paginationState.activePage + 1} of {resultArrays.length}
            </span>
          )}

          {/*NOTE: Navigation */}
          {paginations?.showNavigation && (
            <PaginationCustomView
              right={{
                onClick: () =>
                  setPaginationState({
                    ...paginationState,
                    activePage:
                      paginationState.activePage === resultArrays.length - 1
                        ? resultArrays.length - 1
                        : (paginationState.activePage ?? 1) + 1,
                  }),
                command: {
                  key: 'ctrl+shift+up',
                  label: '⌃+⇧+↑',
                  action: () =>
                    setPaginationState({
                      ...paginationState,
                      activePage:
                        paginationState.activePage === resultArrays.length - 1
                          ? resultArrays.length - 1
                          : (paginationState.activePage ?? 1) + 1,
                    }),
                },
                label: {
                  showCommand: true,
                  showLabel: true,
                  side: 'top',
                  children: 'Next page',
                },
                disabled: paginationState.activePage === resultArrays.length - 1,
              }}
              maxRight={{
                onClick: () => setPaginationState({ ...paginationState, activePage: resultArrays.length - 1 }),
                command: {
                  key: 'ctrl+shift+right',
                  label: '⌃+⇧+→',
                  action: () => setPaginationState({ ...paginationState, activePage: resultArrays.length - 1 }),
                },
                label: {
                  showCommand: true,
                  showLabel: true,
                  side: 'top',
                  children: 'Last page',
                },
                disabled: paginationState.activePage === resultArrays.length - 1,
              }}
              left={{
                onClick: () =>
                  setPaginationState({
                    ...paginationState,
                    activePage: paginationState.activePage === 0 ? 0 : (paginationState.activePage ?? 1) - 1,
                  }),
                command: {
                  key: 'ctrl+shift+down',
                  label: '⌃+⇧+↓',
                  action: () =>
                    setPaginationState({
                      ...paginationState,
                      activePage: paginationState.activePage === 0 ? 0 : (paginationState.activePage ?? 1) - 1,
                    }),
                },
                label: {
                  showCommand: true,
                  showLabel: true,
                  side: 'top',
                  children: 'Previous page',
                },
                disabled: paginationState.activePage === 0,
              }}
              maxLeft={{
                onClick: () => setPaginationState({ ...paginationState, activePage: 0 }),
                command: {
                  key: 'ctrl+shift+left',
                  label: '⌃+⇧+←',
                  action: () => setPaginationState({ ...paginationState, activePage: 0 }),
                },
                label: {
                  showCommand: true,
                  showLabel: true,
                  side: 'top',
                  children: 'First page',
                },
                disabled: paginationState.activePage === 0,
              }}
            />
          )}
        </div>
      </div>
    </>
  )
}
TablePagination.displayName = 'TablePagination'

export interface TableCustomViewProps<
  T extends boolean = false,
  C extends Record<string, unknown> = Record<string, string>,
  Y extends keyof Record<string, unknown> | string = string,
> {
  wrapper?: React.HTMLProps<HTMLDivElement>
  filters?: ComboboxType<Extract<keyof C, string>, Y>[]
  table?: TableType
  tableContentData: TableContentDataType<C>[]
  selection?: boolean
  header?: TableHeaderType<T, C>[]
  footer?: TableFooterProps
  caption?: TableCaptionType
  pagination?: TablePaginationsType
  viewButton?: boolean
  tableSearch?: boolean
  dropdownMenu?: DropdownMenuOptionsType<TableHeaderOptionsType<C>>
  contextMenu?: ContextMenuOptionsType<TableHeaderOptionsType<C>>
}

const TableCustomView = <
  T extends boolean = false,
  C extends Record<string, unknown> = Record<string, unknown>,
  Y extends keyof Record<string, unknown> = string,
>({
  wrapper,
  selection,
  pagination,
  viewButton,
  tableSearch,
  header,
  footer,
  tableContentData,
  caption,
  table,
  dropdownMenu,
  contextMenu,
  filters,
}: TableCustomViewProps<T, C, Y>) => {
  const { className: wrapperClassName, ...wrapperProps } = wrapper! ?? {}
  const { className: tableClassName, ...tableProps } = table! ?? {}
  const { children: captionChildren, className: captionClassName, ...captionProps } = caption! ?? []
  const [selected, setSelected] = React.useState<TableContentDataType<C>[]>([])
  const [tableData, setTableData] = React.useState<TableContentDataType<C>[]>(tableContentData)
  const [paginationState, setPaginationState] = React.useState({
    activePage: pagination?.activePage ?? 0,
    groupSize: pagination?.groupSize ?? tableData.length,
  })
  const [headers, setHeaders] = React.useState<TableHeaderType<T, C>[]>(header ?? [])
  const [search, setSearch] = React.useState<{ q: string; qBy: string[] }>({ q: '', qBy: [] })
  const [value, setValue] = React.useState<string[]>([paginationState.groupSize.toString()])

  const [filterLabels, setFilterLabels] = React.useState<{ [key: string]: number }>({})

  //NOTE: Function to split array into chunks
  const splitIntoChunks = (array: typeof tableData, chunkSize: number) => {
    const chunks = []
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize))
    }
    return chunks
  }

  const filteredData = React.useMemo(() => {
    //NOTE: Step 1: Filter the data based on search.q and search.qBy
    const data = tableData.filter(item => {
      return !search.qBy.length
        ? Object.values(item).some(value => JSON.stringify(value).toLowerCase().includes(search.q.toLowerCase()))
        : Object.values(item).some(value =>
            search.qBy.some(q => JSON.stringify(value).toLowerCase().includes(q.toLowerCase()))
          )
    })

    //NOTE: Step 2: Calculate label counts based on the filtered data
    const labelCounts: { [key: string]: number } = {}
    data.forEach(item => {
      Object.values(item).forEach(value => {
        filters?.forEach(filter => {
          filter?.content?.data.forEach(option => {
            const label = option?.label?.toString().toLowerCase()
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

    setFilterLabels(labelCounts)

    return data
  }, [tableData, filters, search])

  //NOTE: Step 3: Update the filters to display the count based on the filtered data
  const updatedFilters = React.useMemo(() => {
    return filters?.map(filter => {
      return {
        ...filter,
        content: {
          ...filter.content,
          data: filter?.content?.data.map(option => {
            const label = option?.label?.toString().toLowerCase()
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

  //NOTE: Step 4: Split the data into chunks based on the groupSize
  const resultArrays = splitIntoChunks(filteredData, +value)

  return (
    <div
      className={cn(`flex flex-col gap-4`, wrapperClassName)}
      {...wrapperProps}
    >
      <TableHeaderActions<T, C>
        search={{ searchValue: search, setSearchValue: setSearch }}
        viewButton={viewButton ?? false}
        tableSearch={tableSearch ?? false}
        header={header ?? []}
        filter={(updatedFilters as ComboboxType<Y, Extract<keyof C, string>>[]) ?? []}
        headers={headers}
        setHeaders={setHeaders}
      />
      <ScrollArea
        className={cn('border border-border rounded-lg !overflow-visible', tableClassName)}
        {...tableProps}
      >
        <Table>
          {header && (
            <TableCustomViewHeader<T, C>
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
            <TableCustomBody<T, C, Y>
              headers={headers}
              resultArrays={resultArrays}
              paginationState={paginationState}
              selection={selection ?? false}
              selected={selected}
              filtersData={filters}
              setSelected={setSelected}
              dropdownMenu={dropdownMenu ?? {}}
              contextMenu={contextMenu ?? {}}
            />
          )}
          {footer?.columns && <TableCustomFooter {...footer} />}
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {caption && (
        <div
          className={cn('mb-4 text-sm text-muted-foreground text-center', captionClassName)}
          {...captionProps}
        >
          {caption?.children}
        </div>
      )}
      {pagination && (
        <TablePagination<C>
          selected={selected}
          value={value}
          tableData={tableData}
          resultArrays={resultArrays}
          paginationState={paginationState}
          paginations={pagination}
          setValue={setValue}
          setPaginationState={setPaginationState}
        />
      )}
    </div>
  )
}
TableCustomView.displayName = 'TableCustomView'

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, TableCustomView }
