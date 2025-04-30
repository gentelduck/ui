// @ts-noCheck
import { cn } from '@gentelduck/libs/cn'
import { TableHead, TableHeader, TableRow } from '../table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../dropdown-menu'
import { ArrowDownIcon, ArrowUpDown, ArrowUpIcon } from 'lucide-react'
import React from 'react'
import { Button } from '../button'
import { Table, TableBody } from './table'
import { dropdownMenuOptions } from './table-advanced.constants'
import {
  DuckTableBodyProps,
  DuckTableContextType,
  DuckTableHeadCheckboxProps,
  DuckTableHeadSelectableProps,
  DuckTableHeaderProps,
  DuckTableProps,
  DuckTableProviderProps,
  DuckTableRowCheckboxProps,
  GetColumnLabel,
  TableColumnType,
  TableContentDataType,
  TableSearchStateType,
} from './table-advanced.types'
import { ScrollArea, ScrollBar } from '../scroll-area/'
import { Checkbox } from '../checkbox'
import { Input } from '../input'

export const DuckTableContext =
  React.createContext<DuckTableContextType<any> | null>(null)

export function useDuckTable<TColumnName extends readonly TableColumnType[]>() {
  const context = React.useContext<
    DuckTableContextType<GetColumnLabel<TColumnName>>
  >(
    DuckTableContext as unknown as React.Context<
      DuckTableContextType<GetColumnLabel<TColumnName>>
    >
  )
  if (!context) {
    throw new Error('useTableProvider must be used within an TableProvider')
  }
  return context
}

export function DuckTableProvider<TColumnName extends string[]>({
  table_rows,
  table_columns,
  children,
  className,
  ...props
}: DuckTableProviderProps<TColumnName>) {
  const [search, setSearch] = React.useState<TableSearchStateType>({
    query: '',
    queryBy: [],
  })

  const [tableColumns, setTableColumns] = React.useState<
    Map<string, TableColumnType>
  >(new Map(table_columns.map((column) => [column.label, column])))

  const [selectedRows, setSelectedRows] = React.useState<
    Set<TableContentDataType<TColumnName>>
  >(new Set())

  const DuckTable = DuckTableContext //<TColumnName>()

  return (
    <DuckTable.Provider
      value={{
        tableColumns,
        setTableColumns,
        tableRows: table_rows,
        selectedRows,
        setSelectedRows,
        search,
        setSearch,
      }}
    >
      <div
        className={cn(
          `w-full- flex flex-col gap-4 w-[800px] h-[500px]`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    </DuckTable.Provider>
  )
}
DuckTableProvider.displayName = 'DuckTableProvider'

export function DuckTable({
  wrapper,
  className,
  children,
  ...props
}: DuckTableProps) {
  const { className: wrapperClassName, ...wrapperProps } = wrapper! ?? {}

  return (
    <ScrollArea
      className={cn(
        'border border-border rounded-lg !overflow-visible relative',
        wrapperClassName
      )}
      {...wrapperProps}
    >
      <Table {...props}>{children}</Table>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}
DuckTable.displayName = 'DuckTable'

// ------------------------------------------------------------------------------------------------

export function DuckTableHeader({}: DuckTableHeaderProps) {
  const { tableColumns } = useDuckTable()
  return (
    <>
      <TableHeader>
        <TableRow>
          {Array.from(tableColumns.values())?.map((column, idx) => {
            const {
              children,
              className,
              sortable,
              label,
              showLabel,
              ...props
            } = column

            const Component = () =>
              !sortable ? (
                <span className='capitalize'>
                  {(label as string) ?? children}
                </span>
              ) : (
                <DuckTableHeadSelectable
                  column={column}
                  label={(label as string) ?? children}
                  showLabel={showLabel}
                />
              )

            return (
              !column['aria-hidden'] && (
                <React.Fragment key={idx}>
                  <TableHead
                    className={cn(
                      'py-2',
                      idx === 0 && 'justify-start ',
                      sortable && 'px-2',
                      className
                    )}
                    {...props}
                  >
                    {idx === 0 ? (
                      <div className='flex items-center gap-4'>
                        <DuckTableHeadCheckbox
                          type='header'
                          className={cn(sortable && 'justify-end')}
                        />
                        {/*NOTE: Rendering Sorting else rendering label*/}
                        <Component />
                      </div>
                    ) : (
                      <Component />
                    )}
                  </TableHead>
                </React.Fragment>
              )
            )
          })}
        </TableRow>
      </TableHeader>
    </>
  )
}
DuckTableHeader.displayName = 'TableCustomViewHeader'

export function DuckTableHeadCheckbox({
  className,
  ...props
}: DuckTableHeadCheckboxProps) {
  const { selectedRows, setSelectedRows, tableRows } = useDuckTable()

  return (
    <div
      className={cn(
        'flex items-center w-fit data-[state=open]:bg-accent text-xs capitalize',
        className
      )}
      {...props}
    >
      <Checkbox
        className='border-border'
        onClick={() => {
          setSelectedRows(() => {
            if (selectedRows.size === tableRows.length) {
              return new Set()
            }
            return new Set(tableRows.map((item) => item))
          })
        }}
        checked={
          selectedRows.size === tableRows.length
            ? true
            : selectedRows.size < tableRows.length && selectedRows.size
            ? 'indeterminate'
            : false
        }
      />
    </div>
  )
}

export function DuckTableHeadSelectable<TSort extends boolean = true>({
  column,
  label,
  showLabel,
  children,
}: DuckTableHeadSelectableProps<TSort>) {
  const { setTableColumns } = useDuckTable()

  return (
    <div className={cn('flex items-center space-x-2')}>
      {(dropdownMenuOptions?.length ?? 0) > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size='sm'
              aria-label='table-column-options'
              aria-controls='dropdown-menu'
              name='dropdown-menu-trigger'
              variant='ghost'
              aria-sort={column['aria-sort']}
              className='data-[state=open]:bg-accent [&>div]:justify-between w-full [&>div]:w-full capitalize'
              secondIcon={
                column['aria-sort'] === 'ascending' ? (
                  <ArrowDownIcon className='text-muted-foreground' />
                ) : column['aria-sort'] === 'descending' ? (
                  <ArrowUpIcon className='text-muted-foreground' />
                ) : (
                  <ArrowUpDown className='text-muted-foreground' />
                )
              }
              label={
                showLabel
                  ? {
                      children: label.toString() + ' options',
                      className: 'capitalize',
                      showLabel: true,
                      side: 'top',
                    }
                  : undefined
              }
            >
              {(label as string) ?? children}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-48'>
            <DropdownMenuGroup>
              {dropdownMenuOptions.map((item, idx) => {
                return (
                  <>
                    {idx === dropdownMenuOptions.length - 1 && (
                      <DropdownMenuSeparator />
                    )}
                    <DropdownMenuItem
                      className='p-0'
                      key={idx}
                      onClick={() => {
                        setTableColumns((prev) => {
                          const newSet = new Map(prev)

                          if (item.children === ('hide' as 'other')) {
                            newSet.set(label, {
                              ...column,
                              'aria-hidden': true,
                              hidden: true,
                            })
                          } else {
                            if (newSet.get(label)?.label === item.children) {
                              newSet.set(label, {
                                ...column,
                                'aria-sort': 'none',
                              })
                            } else {
                              newSet.set(label, {
                                ...column,
                                'aria-sort': item.children,
                              })
                            }
                          }

                          return newSet
                        })
                      }}
                    >
                      <Button
                        {...item}
                        className={cn(
                          'w-full justify-start capitalize',
                          item.className
                        )}
                      >
                        {item.children}
                      </Button>
                    </DropdownMenuItem>
                  </>
                )
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

export function DuckTableBody({ children }: DuckTableBodyProps) {
  return <TableBody>{children}</TableBody>
}

export function DuckTableRowCheckbox<
  TColumnName extends readonly TableColumnType[]
>({ className, tableRow, ...props }: DuckTableRowCheckboxProps<TColumnName>) {
  const { selectedRows, setSelectedRows } = useDuckTable()

  return (
    <div
      className={cn(
        'flex items-center w-fit data-[state=open]:bg-accent text-xs capitalize',
        className
      )}
      {...props}
    >
      <Checkbox
        className='border-border'
        onClick={() => {
          setSelectedRows(() => {
            if (selectedRows.has(tableRow)) {
              return new Set(
                Array.from(selectedRows.values()).filter(
                  (item) => item !== tableRow
                )
              )
            }
            return new Set([...selectedRows, tableRow])
          })
        }}
        checked={selectedRows.has(tableRow) ? true : false}
      />
    </div>
  )
}

export interface DuckTableTopBarProps extends React.HTMLProps<HTMLDivElement> {}

export function DuckTableTopBar({
  className,
  children,
  ...props
}: DuckTableTopBarProps) {
  return (
    <div
      className={cn('', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export interface DuckTableSearchInputProps
  extends React.HTMLProps<HTMLDivElement> {}

export function DuckTableSearchInput({
  className,
  ...props
}: DuckTableSearchInputProps) {
  return (
    <div
      className={cn('flex-1', className)}
      {...props}
    >
      <Input placeholder='Search...' />
    </div>
  )
}
