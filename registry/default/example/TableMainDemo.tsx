import { TableView, TableHeaderColumns, TableContentDataType, FooterCoumnType } from '../ui'

import { cn } from '@/lib'

export type TableDataType = {
  invoice: React.ReactNode | string
  status: React.ReactNode | string
  amount: React.ReactNode | string
  method: React.ReactNode | string
}

export type HeaderColumns = 'invoice' | 'status' | 'amount' | 'method'
const columns: TableHeaderColumns<true, TableDataType>[] = [
  {
    label: 'invoice',
    className: 'text-sm',
  },
  {
    label: 'status',
    className: 'w-[110px] text-sm',
  },
  {
    label: 'amount',
    className: 'w-[90px] text-sm',
  },
  {
    label: 'method',
    className: 'w-[70px] text-sm',
  },
]

const footerColumns: FooterCoumnType[] = [
  {
    children: 'Total',
    colSpan: 3,
  },
  {
    children: '50000$',
    className: 'w-[170px]',
  },
]

export default function DataTableMainDemo() {
  return (
    <>
      <TableView<true, TableDataType>
        wrapper={{
          className: cn('xl:w-[642px] lg:w-[524px] w-[270px] m-auto '),
        }}
        table={{
          className: cn('xl:w-[642px] lg:w-[524px] w-[270px]', footerColumns.length && 'rounded-none border-[0]'),
        }}
        footer={{
          className: 'gap-4 border-t-0',
          columns: footerColumns,
          children: 'Footer',
        }}
        header={columns}
        tableContentData={[...tableData]}
        caption={{
          children: 'A list of your recent invoices.',
        }}
      />
    </>
  )
}

export const tableData: TableContentDataType<TableDataType>[] = [
  {
    invoice: { children: 'INV001' },
    status: { children: 'Paid' },
    amount: { children: '$250.00' },
    method: { children: 'Credit Card' },
  },
  {
    invoice: { children: 'INV002' },
    status: { children: 'Pending' },
    amount: { children: '$150.00' },
    method: { children: 'PayPal' },
  },
  {
    invoice: { children: 'INV003' },
    status: { children: 'Unpaid' },
    amount: { children: '$350.00' },
    method: { children: 'Bank Transfer' },
  },
  {
    invoice: { children: 'INV004' },
    status: { children: 'Paid' },
    amount: { children: '$450.00' },
    method: { children: 'Credit Card' },
  },
  {
    invoice: { children: 'INV005' },
    status: { children: 'Paid' },
    amount: { children: '$550.00' },
    method: { children: 'PayPal' },
  },
  {
    invoice: { children: 'INV006' },
    status: { children: 'Pending' },
    amount: { children: '$200.00' },
    method: { children: 'Bank Transfer' },
  },
  {
    invoice: { children: 'INV007' },
    status: { children: 'Unpaid' },
    amount: { children: '$300.00' },
    method: { children: 'Credit Card' },
  },
]
