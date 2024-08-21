import { Chilanka } from 'next/font/google'
import { TableView, TableHeaderColumns, TableDataType } from '../ui'

const columns: TableHeaderColumns[] = [
  {
    children: 'Invoice',
    sortable: false,
  },
  {
    children: 'Status',
    sortable: false,
  },
  {
    children: 'Method',
    sortable: true,
  },
  {
    children: 'Amount',
    sortable: false,
  },
]

const data: TableDataType[] = [
  {
    invoice: {
      children: 'INV001',
    },
    paymentStatus: { children: 'Paid' },
    paymentMethod: { children: 'paypal' },
    totalAmount: { children: '$250.00' },
  },
  {
    invoice: {
      children: 'INV002',
    },
    paymentStatus: { children: 'Paid' },
    paymentMethod: { children: 'binnace' },
    totalAmount: { children: '$250.00' },
  },
  {
    invoice: {
      children: 'INV003',
    },
    paymentStatus: { children: 'Paid' },
    paymentMethod: { children: 'Credit Card' },
    totalAmount: { children: '$250.00' },
  },
]

export default function DataTableMainDemo() {
  return (
    <>
      <TableView
        table={{
          className: 'w-[700px] overflow-y-hidden',
        }}
        header={columns}
        data={[...data]}
        // caption={{
        //   children: 'A list of your recent invoices.',
        // }}
        selection={true}
        // footer={{}}
        pagination={{
          groupSize: 5,
          showCount: true,
          showGroup: true,
        }}
        // pagination
      />
    </>
  )
}
