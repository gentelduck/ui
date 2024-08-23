import { TableView, TableHeaderColumns } from '../ui'
import { tableData } from '../ui/data'

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
          className: 'w-[650px] h-[325px]',
        }}
        header={columns}
        data={[...tableData]}
        // caption={{
        //   children: 'A list of your recent invoices.',
        // }}
        // footer={{}}
        selection={true}
        viewButton={true}
        pagination={{
          groupSize: 5,
          showCount: true,
          showGroup: true,
        }}
        options={{
          optionsData: [
            {
              children: 'Edit',
            },
            {
              children: 'Make a copy',
            },
            {
              children: 'Favorite',
            },
          ],
        }}
      />
    </>
  )
}
