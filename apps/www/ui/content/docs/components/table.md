---
title: Table
description: A highly customizable, type-safe React table component offering dynamic structure, advanced features like multi-selection, filtering, and pagination, along with intuitive keyboard shortcuts and responsive design, all while allowing extensive styling and functionality customization.
featured: true
component: true
---

<ComponentPreview
  name="TableMainDemo"
  description="A simple example of a table component with basic usage."
/>

## **Features**

- **Dynamic Structure**: A flexible, configurable React table component that supports custom rendering, styling, and seamless integration, making it adaptable to a wide range of use cases.

- **Type Safety**: Ensures type safety, providing a robust and reliable development experience with customizable rendering, styling, and easy integration.

- **Keyboard Shortcuts**: Includes intuitive keyboard shortcuts for efficient navigation.
  Additionally, it supports custom library creation for `vim`-like motions within any component, it's
  not that complex shortcuts but, we have a plan to create another lib to get it right with complex
  shortcuts, the current lib we use is this created by us [@ahmedayob/duck-shortcuts](https://github.com/TheDuckUI/shortcut.git).

- **Multi-Selection**: Offers multi-selection capabilities for individual columns, with intermediate selection options available for all columns within the table.

- **Built-In Pagination**: Comes with dynamic pagination that integrates seamlessly with features like search, filtering, and adjustable rows per page. Enable this feature by setting a simple boolean flag.

- **Advanced Options**: Utilizes our `DropdownMenu` component to provide dynamic options for columns, with support for checkboxes, radio buttons, labels, and nested items. Options can be mixed and grouped for a fully customizable dropdown menu experience.

- **Context Menu**: Extends the options feature to context menus, allowing for consistent behavior across both dropdowns and context menus. Easily enabled by filling out the `contextMenu` prop on the `TableView` component.

- **Column Visibility**: Enables dynamic hiding and showing of columns, allowing users to control the table’s appearance while maintaining the original column order.

- **Dynamic Filtering**: Provides multi-level dynamic filtering for table rows, with labels indicating the number of matching items. A reset button is included for easy filter management.

- **Customizable Styling**: Every aspect of the table's styling is customizable. Users can apply their own styles via `className`, CSS, or any preferred styling method.

- **Advanced Search**: Features a modern search function capable of handling complex data types, including `React.ReactNode` and other JSX elements, beyond simple text.

- **Table Caption**: Includes a table caption feature, allowing you to describe the purpose of the table directly within its layout.

- **Table Footer**: Provides a footer section to display additional information, such as totals or summaries, enhancing the table's utility.

- **Responsive Design**: Built with a responsive design out of the box, ensuring optimal display across all devices, with customizable responsiveness options available.

## Installation

<Tabs defaultValue="cli">

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx duck-ui@latest add table
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="table" />

<Step>
  The Combobox is built using a composition of the `<Combobox />
  `, `<Input />
  `, `<Pagination />
  `, `<ScrollArea />
  `, `<DropdownMenu />
  `, `<Command />
  `, `<Button />
  `, `<Checkbox />
  `, `<Badge />
  `, `<ContextMenu />` , and `<Tooltip />` components.
</Step>

<Step>
  You will also need to install the [`Tooltip`](/docs/components/Tooltip#installation),
  [`DropdownMenu`](/docs/components/DropdownMenu#installation), and [`Command`](/docs/components/Command#installation),
  and [`Button`](/docs/components/Button#installation), [`Checkbox`](/docs/components/Checkbox#installation), and
  [`Badge`](/docs/components/Badge#installation), [`ContextMenu`](/docs/components/ContextMenu#installation), and
  [`Tooltip`](/docs/components/Tooltip#installation), [`ScrollArea`](/docs/components/ScrollArea#installation), and
  [`Pagination`](/docs/components/Pagination#installation), and [`Input`](/docs/components/Input#installation) component
  because some dependencies are inherited from it.
</Step>

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</Tabs>

## Usage

### Table Native Component

```tsx
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
```

```tsx
<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

### TableCustomBody

`TableCustomBody` is a generic React component designed to render the body of a table. It supports features such as pagination, row selection, and integration with dropdown and context menus. This component allows for a highly customizable table experience, suitable for handling complex data structures.

#### Example Usage:

The `TableCustomBody` component is ideal for rendering the main content of a table, including features like pagination and row selection. It is well-suited for applications that require interactive table functionalities, and can be adapted to various data structures and use cases. For more details, refer to the API reference [`TableCustomBodyProps`](#tablecustombodyprops).

```tsx
import { TableCustomBody } from '@/components/ui'

//NOTE: you will replace these values with your own
const MyTableBody = () => {
  return (
    <TableCustomBody
      headers={headers}
      resultArrays={resultArrays}
      paginationState={paginationState}
      selection={true}
      selected={selectedRows}
      setSelected={setSelectedRows}
      dropdownMenu={dropdownMenu}
      contextMenu={contextMenu}
      filtersData={filtersData}
    />
  )
}
```

#### Description:

The `TableCustomBody` component is used to render the main content of a table, offering built-in support for pagination, row selection, and menu integration. It is designed to handle interactive and customizable table features efficiently.

#### Key Features:

- **Pagination**: Manages large datasets by dividing them into pages.
- **Selection**: Supports row selection for bulk operations and other interactive features.
- **Menus**: Integrates dropdown and context menus for additional table functionalities.

---

### TableCustomFooter

`TableCustomFooter` is a React component designed to render the footer of a table. It provides flexibility in defining the content and appearance of the footer by accepting an array of column configurations. This component is ideal for adding summaries, totals, or other footer details to your table.

#### Example Usage:

The `TableCustomFooter` component is used to customize the footer of a table, allowing you to specify the content and styling of each footer column. It integrates seamlessly with different table designs and is useful for displaying additional information. For further details, see the API reference [`TableFooterProps`](#tablefooterprops).

```tsx
import { TableCustomFooter } from '@/components/ui'

const MyTableFooter = () => {
  return (
    <TableCustomFooter
      className="custom-footer-class"
      columns={footerColumns}
    />
  )
}
```

#### Description:

The `TableCustomFooter` component allows you to create a customizable footer for your table. By passing an array of column configurations, you can define the content and properties of each column in the footer, ensuring it fits well with your design requirements.

#### Key Features:

- **Customizable Columns**: Configure each footer column to display specific content such as summaries or additional information.
- **Styling**: Utilize the `className` prop for applying custom styles to the footer, making it adaptable to different design systems.

---

#### Description:

`TableCustomBody` is a generic React component designed to render the body of a table. It supports features such as pagination, row selection, and integration with dropdown and context menus. This component allows for a customizable and interactive table experience, accommodating complex table requirements.

#### Example Usage:

The `TableCustomBody` component is typically used to render the main content of a table, providing features like pagination and row selection. It can be tailored to fit various data structures and use cases. For further details, see the API reference for [`TableCustomBodyProps`](#tablecustombodyprops).

```tsx
import { TableCustomBody } from '@/components/ui'

//NOTE: you will replace these values with your own
const MyTableBody = () => {
  return (
    <TableCustomBody
      headers={myHeaders}
      resultArrays={myResultArrays}
      paginationState={myPaginationState}
      selection={true}
      selected={selectedRows}
      setSelected={setSelectedRows}
      dropdownMenu={myDropdownMenu}
      contextMenu={myContextMenu}
      filtersData={myFiltersData}
    />
  )
}
```

#### Description:

The `TableCustomBody` component handles rendering the main content of a table, with built-in support
for pagination, selection, and menu integration. It is designed for tables that require interaction
and customization.

#### Key Features:

- **Pagination**: Manages large datasets by breaking them into manageable pages.
- **Selection**: Supports row selection for bulk actions and other interactive features.
- **Menus**: Includes dropdown and context menus for additional functionality and actions.

---

### TableCustomFooter

`TableCustomFooter` is a React component that renders the footer of a table. It provides flexibility in defining the content of the footer by accepting an array of columns. This component is ideal for adding summaries, totals, or other footer information to your table.

#### Example Usage:

The `TableCustomFooter` component is used to customize the footer of your table, allowing for the inclusion of various types of content. For detailed information, refer to the API reference for [`TableFooterProps`](#tablefooterprops).

```tsx
import { TableCustomFooter } from '@/components/ui'

//NOTE: you will replace these values with your own
const MyTableFooter = () => {
  return (
    <TableCustomFooter
      className="custom-footer-class"
      columns={myFooterColumns}
    />
  )
}
```

#### Description:

The `TableCustomFooter` component is used to create a customizable footer for tables. It allows you
to specify the content and properties of each column in the footer, making it easy to integrate with
different table designs.

#### Key Features:

- **Customizable Columns**: Configure each footer column to display specific content or summaries.
- **Styling**: Apply additional custom styles using the `className` prop, ensuring the footer fits seamlessly with your design system.

---

### TablePagination

`TablePagination` is a generic React component designed to handle pagination within a table. It provides functionality to manage and display pagination controls, handle data selection, and update the pagination state.

#### Example Usage:

```tsx
import { TablePagination } from '@/components/ui'

//NOTE: you will replace these values with your own
const MyTablePagination = () => {
  return (
    <TablePagination
      resultArrays={myResultArrays}
      selected={selectedRows}
      paginationState={paginationState}
      paginations={paginationOptions}
      value={paginationValues}
      tableData={tableData}
      setPaginationState={setPaginationState}
      setValue={setPaginationValues}
    />
  )
}
```

#### Description:

The `TablePagination` component is used to manage the pagination logic and controls for a table. It
allows for customizing how pagination is handled and displayed, including selecting items, managing
pagination states, and updating the displayed page, For detailed information, refer to the API reference for [`TablePaginationProps`](#tablepaginationprops).

#### Key Features:

- **Customizable Pagination Controls**: Provides flexible options to display and customize pagination controls, including navigation buttons, page numbers, and item selection.

- **Dynamic Data Handling**: Manages large datasets by splitting them into manageable pages, ensuring efficient data display and interaction.

- **State Management**: Supports updating and tracking pagination state, including the active page and selected items, to reflect user interactions.

- **Selection Integration**: Allows users to select multiple rows and track their selections, enabling bulk actions or further processing of selected data.

- **Adaptive Display**: Adjusts the table view based on pagination state and user selections, providing a responsive and interactive table experience.

---

### TableCustomView

`TableCustomView` is a generic React component designed to create a customizable table view with support for various features such as selection, pagination, and filters. It provides flexibility to include headers, footers, and additional controls, offering a comprehensive solution for managing table data and interactions.

#### Example Usage:

```tsx
import { TableCustomView } from '@/components/ui'

//NOTE: you will replace these values with your own
const MyTableView = () => {
  return (
    <TableCustomView
      wrapper={true}
      selection={true}
      pagination={true}
      viewButton={true}
      tableSearch={true}
      header={myTableHeader}
      footer={myTableFooter}
      tableContentData={myTableContentData}
      caption={myTableCaption}
      table={myTable}
      dropdownMenu={myDropdownMenu}
      contextMenu={myContextMenu}
      filters={myFilters}
    />
  )
}
```

#### Description:

The `TableCustomView` component is designed to provide a highly customizable table layout with
support for various features. It allows for configuration of table headers and footers, pagination,
selection, and more. This component is ideal for applications that require complex table
functionalities and flexible user interactions, For detailed information, refer to the API reference for [`TableCustomViewProps`](#tablecustomviewprops).

#### Key Features:

- **Customizable Layout**: Allows for extensive customization of table layout, including headers, footers, and table structure.

- **Selection Support**: Provides functionality for selecting rows, enabling bulk actions and user interaction.

- **Pagination**: Includes support for pagination, making it easier to navigate through large datasets.

- **Search and Filtering**: Enables search and filtering of table data, allowing users to find specific information quickly.

- **Interactive Menus**: Supports dropdown and context menus for additional actions and configurations, enhancing the table’s functionality.

- **Flexible Data Handling**: Manages various data structures and integrates seamlessly with other components to provide a cohesive table experience.

## Examples

### Simple

you can achieve the same result with from the example above with our `TableCustomView`
component, so also if you want create your own custom view, you can use the native components:

<ComponentPreview
  name="TableSimpleDemo"
  description="A simple example of a table component with basic usage."
/>

### Medium

<ComponentPreview
  name="TableMediumDemo"
  description="A simple example of a table component with basic usage."
/>

### Advanced

<ComponentPreview
  name="TableAdvancedDemo"
  description="A simple example of a table component with basic usage."
/>

## API Reference

### TableCustomViewProps

`TableCustomViewProps` is an interface that defines the properties that the `TableView` component can accept. It provides flexibility by allowing various customizations such as filters, table content, headers, footers, pagination, and more.

**_Key Properties_**

- **`wrapper`**: Optional property that allows you to customize the wrapper `div` element by passing standard HTML `div` properties.

- **`filters`**: An optional array of filter objects that allow users to filter the table data. Each
  filter is defined using the [ComboboxType](/docs/components/combobox#comboboxtype) from `Combobox`.

- **`table`**: Optional property that defines specific configurations for the table's structure,
  it's defined using the [TableType](/docs/components/table#tabletype).

- **`tableContentData`**: Required array containing the data to be displayed in the table. Each item represents a row of data.

- **`selection`**: Optional boolean that, when set to `true`, enables row selection functionality in the table.

- **`header`**: Optional array that defines the configurations for the table's header columns, it's
  defined using the [TableHeaderType](/docs/components/table#tableheadertype).

- **`footer`**: Optional property that allows for the inclusion of custom footer content in the
  table, it's defined using the [TableFooterType](#tablefootertype).

- **`caption`**: Optional property for adding a caption to the table, it's defined using the
  [TableCaptionType](#tablecaptiontype).

- **`pagination`**: Optional property that provides settings for pagination, it's defined using
  [TablePaginationsType](#tablepaginationstype).

- **`viewButton`**: Optional boolean that, when set to `true`, displays a "view" button within the table.

- **`tableSearch`**: Optional boolean that adds search functionality to the table.

- **`dropdownMenu`**: Optional property that configures dropdown menu options in the table headers.
  See [DropdownMenuOptionsType](/docs/components/dropdownMenu#dropdownmenuoptionstype) from `DropdownMenu`.

- **`contextMenu`**: Optional property that defines context menu options for interacting with table
  rows or cells. Refer to
  [ContextMenuOptionsType](/docs/components/contextMenu#contextmenuoptionstype) from `ContextMenu`.

- **`ref`** (`React.ForwardedRef<HTMLDivElement>`): Forwarded ref to attach to the `<div>` element of the table view component.

---

### TableHeaderActionsProps

`TableHeaderActionsProps` is a props interface for configuring the header actions of a table component. It allows managing the headers, search functionality, and filters within the table.

**_Key Properties_**

- **`T`**: A boolean that represents whether a certain condition is met within the table.

- **`C`**: A generic record type that defines the structure and context of the table data.

- **`Y`**: A key within the provided record `C` that represents a specific property used in filtering.

**_Properties_**

- **`header`**: An array of [`TableHeaderType<T, C>`](#tableheadertype). Represents the main header configuration for the table.

- **`headers`**: An array of [`TableHeaderType<T, C>`](#tableheadertype). Represents the complete set of headers used in the table.

- **`viewButton`**: A boolean indicating whether the "view" button is visible.

- **`tableSearch`**: A boolean indicating whether the table search functionality is enabled.

- **`setHeaders`**: A function of type `React.Dispatch<React.SetStateAction`[`<TableHeaderType<T,
C>`](#tableheadertype)`[]>>` that updates the headers configuration.

- **`search`**: An object representing the search functionality in the table.

  - **`searchValue`**: An object containing the current search query (`q: string`) and the fields to search by (`qBy: string[]`).

  - **`setSearchValue`**: A function of type `React.Dispatch<React.SetStateAction<{ q: string; qBy: string[] }>>` that updates the search query and fields.

- **`filter`**: An array of [`ComboboxType<Y, Extract<keyof C,
string>>`](/docs/components/combobox#comboboxtype) representing the filters available in the table.

- **`ref`** (`React.ForwardedRef<HTMLDivElement>`): Forwarded ref to attach to the root element of the component.

---

### TableCustomViewHeaderProps

`TableCustomViewHeaderProps` is an interface that defines the properties required for managing custom views of a table header, including handling table data, selection states, and header configurations.

**_Key Properties_**

- **`T`**: A boolean type that determines whether certain properties should be included or not. It defaults to `false`.

- **`C`**: A generic record type that defines the structure of the table data, mapping string keys to any value. It defaults to `Record<string, string>`.

**_Properties_**

- **`headers`**: An array of [`TableHeaderType<T, C>`](#tableheadertype). This represents the configuration of table headers, including labels, sorting options, and other custom properties.

- **`setHeaders`**: A React dispatch function that updates the state of the headers. It takes a
  `React.SetStateAction<`[`TableHeaderType<T, C>`](#tableheadertype)`[]>` as an argument.

- **`tableData`**: An array of [`TableContentDataType<C>`](#tablecontentdatatype). This represents the data displayed in the table, where each item corresponds to a row in the table.

- **`setTableData`**: A React dispatch function that updates the state of the table data. It takes a
  `React.SetStateAction<`[`TableContentDataType<C>`](#tablecontentdatatype)`[]>` as an argument.

- **`selection`**: A boolean that indicates whether selection is enabled for the table rows.

- **`selected`**: An array of [`TableContentDataType<C>`](#tablecontentdatatype) representing the currently selected rows in the table.

- **`setSelected`**: A React dispatch function that updates the state of the selected rows. It takes
  a `React.SetStateAction<`[`TableContentDataType<C>`](#tablecontentdatatype)`[]>` as an argument.

- **`ref`** (`React.ForwardedRef<HTMLTableSectionElement>`): Forwarded ref to attach to the `<thead>` element of the table.

---

### TableCustomBodyProps

`TableCustomBodyProps` is an interface that defines the properties for customizing the body of a table, including headers, data, pagination, selection, and interactive options.

**_Key Properties_**

- **`T`**: A boolean type that determines whether certain properties should be included or not.

- **`C`**: A generic record type that defines the structure of the table data.

- **`Y`**: A key type that represents the keys used for filtering the table data.

**_Properties_**

- **`headers`**: An array of [`TableHeaderType<T, C>`](#tableheadertype). This represents the configuration of the table headers, including labels, sorting options, and other custom properties.

- **`resultArrays`**: A 2D array of [`TableContentDataType<C>`](#tablecontentdatatype). This represents the data to be displayed in the table, with each inner array corresponding to a page or group of data.

- **`paginationState`**: A [`PaginationState`](#paginationstate) object that contains information about the current pagination state, including the active page and group size.

- **`selection`**: A boolean indicating whether row selection is enabled for the table.

- **`selected`**: An array of [`TableContentDataType<C>`](#tablecontentdatatype) representing the currently selected rows in the table.

- **`setSelected`**: A React dispatch function that updates the state of the selected rows. It takes
  a `React.SetStateAction<`[`TableContentDataType<C>`](#tablecontentdatatype)`[]>` as an argument.

- **`dropdownMenu`**: A
  [`DropdownMenuOptionsType`](/docs/components/dropdown-menu#dropdownmenuoptionstype)[`<TableHeaderOptionsType<C>>`](#tableheaderoptionstype) object that configures the options for the dropdown menu in the table headers.

- **`contextMenu`**: A
  [`ContextMenuOptionsType`](/docs/components/context-menu#contextmenuoptionstype)[`<TableHeaderOptionsType<C>>`](tableheaderoptionstype) object that defines the options for the context menu, allowing interactions with table rows or cells.

- **`filtersData`**: An optional array of [`ComboboxType<Extract<keyof C, string>,
Y>`](/docs/components/combobox#comboboxtype), representing the filters applied to the table data. If not defined, filtering functionality is not enabled.

- **`ref`** (`React.ForwardedRef<HTMLTableSectionElement>`): Forwarded ref to attach to the `<tbody>` element of the table.

---

### TablePaginationType

`TablePaginationType` is an interface that defines the properties and methods used to manage the pagination of table data. This interface is essential for handling the navigation and organization of large datasets across multiple pages in a table.

**_Key Properties_**

- **`C`**: A generic type parameter extending a record of key-value pairs. This represents the structure of the table data.
- **`selected`**: An array of [`TableContentDataType<C>`](#tablecontentdatatype) representing the selected items within the table. This array is used to keep track of which rows are selected, for example, when implementing multi-select functionality.

- **`setValue`**: A `React.Dispatch<React.SetStateAction<string[]>>` function used to update the state of the selected value(s) in the table, often tied to search or filter functionality.

- **`value`**: An array of strings representing the current value(s) used for filtering or searching within the table data.

- **`tableData`**: An array of [`TableContentDataType<C>`](#tablecontentdatatype) representing the entire dataset that is being displayed in the table. This is the main data source that will be paginated.

- **`paginations?`**: An optional property of type [`TablePaginationsType`](#tablepaginationstype) that contains additional pagination settings or configurations that might be needed for more complex pagination scenarios.

- **`resultArrays`**: A two-dimensional array of [`TableContentDataType<C>[]`](#tablecontentdatatype) representing the paginated chunks of data. Each sub-array corresponds to a specific page in the pagination.

- **`paginationState`**: An object of type [`PaginationState`](#paginationstate) that tracks the current state of pagination, including properties such as the active page and the size of each page group.

- **`setPaginationState`**: A
  `React.Dispatch<React.SetStateAction<`[`PaginationState>>`](#paginationState) function used to update the `paginationState`, allowing for dynamic control over the pagination (e.g., changing pages, adjusting page size).

- **`ref`** (`React.ForwardedRef<HTMLDivElement>`): Forwarded ref to attach to the `<div>` element of the pagination component.

---

### TableHeaderType

`TableHeaderType` is an interface that defines the structure and properties of a table header cell. It extends the standard HTML table cell properties and adds custom properties for label handling, sorting, and dropdown menu options.

**_Key Properties_**

- **`T`**: A boolean flag that indicates whether certain properties should be included or not.
- **`C`**: A generic record type that defines the structure of the table data, mapping string keys to any value.

**_Properties_**

- **`label`**: A string that represents the key in the provided record `C`. It is used as the label for the table header cell.
- **`sortable?`**: An optional boolean that indicates whether the column associated with this header is sortable.
- **`showLabel?`**: An optional boolean (`T`) that determines whether the label should be shown. If `T` is true, the label will be displayed.
- **`currentSort?`**: An optional property that is available only when `showLabel` is true (`T extends true`). It can have one of the following values:
  - `'asc'`: The column is currently sorted in ascending order.
  - `'desc'`: The column is currently sorted in descending order.
  - `'not sorted'`: The column is not currently sorted.
- **`dropdownMenuOptions?`**: An optional array of
  [`DropdownMenuOptionsDataType`](/docs/components/dropdown-menu#dropdownmenuoptionstype)[`<TableDropdownMenuOptionsType<C>>`](#tabledropdownmenuoptionstype), available only when `showLabel` is true (`T extends true`). This property defines the dropdown menu options associated with the header cell.

---

### TableContentDataType

`TableContentDataType` is a generic type that defines the structure of the data used within table cells. It maps each key of a given record type `C` to a `TableDataKey`, enriching each table cell with additional properties while associating it with the corresponding data from the record.

#### Key Properties:

- **`[key in keyof C]`**: Iterates over each key of the provided record `C` and creates a property in the resulting type. Each property represents a table cell.
- **`TableDataKey & { children: C[key] }`**: Combines `TableDataKey` properties with a `children` property. The `children` property contains the actual data for the table cell, which is derived from the corresponding value in the record `C`.

#### Example Usage:

```tsx
import { TableDataKey } from '@/components/ui'

type MyData = {
  name: string
  age: number
  email: string
}

const exampleData: TableContentDataType<MyData> = {
  name: {
    // Properties from TableDataKey
    withLabel: { text: 'Name' },
    withIcon: <i className="icon-name" />,
    children: 'John Doe', // Data for the cell
  },
  age: {
    // Properties from TableDataKey
    withLabel: { text: 'Age' },
    withIcon: <i className="icon-age" />,
    children: 30, // Data for the cell
  },
  email: {
    // Properties from TableDataKey
    withLabel: { text: 'Email' },
    withIcon: <i className="icon-email" />,
    children: 'john.doe@example.com', // Data for the cell
  },
}
```

---

### PaginationState

`PaginationState` is an interface that defines the properties related to pagination within a table or data grid. It includes information about the current page and the size of each page group.

**_Key Properties_**

- **`activePage`**: A number indicating the current active page in the pagination. This represents which page of the data is currently being viewed.
- **`groupSize`**: A number specifying the number of items displayed per page. This determines how many items are shown in each page group of the pagination.

---

### TableDropdownMenuOptionsType

`TableDropdownMenuOptionsType` is an interface that defines the properties used for configuring dropdown menu options in a table header. It includes settings for sorting, updating table headers, and managing table data.

**_Key Properties_**

- **`sortArray`**: A reference to the [`sortArray`](/coming-soon) function, which is used to sort the table data based on selected criteria.

- **`setHeaders`**: A function for updating the table headers. It accepts a `React.Dispatch` with a
  `SetStateAction` of an array of [`TableHeaderType`](#tableheadertype).

- **`headers`**: An array of [`TableHeaderType`](#tableheadertype) representing the current headers of the table.

- **`tableData`**: An array of [`TableContentDataType<C>`](#tablecontentdatatype) containing the data displayed in the table.

- **`setTableData`**: A function for updating the table data. It accepts a `React.Dispatch` with a
  `SetStateAction` of an array of [`TableContentDataType<C>`](#tablecontentdatatype).

- **`data`**: An array of [`TableContentDataType<C>`](#tablecontentdatatype) representing the data to be used for dropdown menu operations.

- **`idx`**: The index of the column in the table headers for which the dropdown menu options are being configured.

- **`column`**: A [`TableHeaderType`](#tableheadertype) representing the current column configuration for the dropdown menu options.

---

### TableFooterProps

`TableFooterProps` is an interface that extends the properties of the
[`TableFooter`](#tablefooter) component, providing additional configuration options specifically for the footer of a table. It includes a set of columns that define the structure and content of the table footer.

**_Key Properties_**

- **`columns`**: An array of [`FooterColumnType`](#footercolumntype) objects that represent the
  individual columns in the table footer. Each column can be customized using the properties available
  in [`TableCell`](#tablecell).

---

### FooterColumnType

`FooterColumnType` is a type that extends the properties of the
[`TableCell`](#tablecell) component. It provides partial customization options for each column in the table footer, allowing for flexible configuration of footer content.

**_Key Properties_**

- **`React.ComponentPropsWithoutRef<typeof `[`TableCell>`](#tablecell)**: This type includes all the
  properties available in the [`TableCell`](#tablecell) component, making it possible to customize
  each footer column based on the standard [`TableCell`](#tablecell) properties.

---

### TableCaptionType

`TableCaptionType` is an interface that extends the standard HTML properties for a `<caption>` element in a table. This interface is used to define the properties and behavior of the table caption, allowing for customization and additional attributes as needed.

**_Key Properties_**

- **`React.HTMLProps<HTMLTableCaptionElement>`**: This type includes all the standard HTML properties available for the `<caption>` element, such as `className`, `style`, `id`, and more. It allows you to fully customize the table caption by passing these properties.

---

### TablePaginationsType

`TablePaginationsType` is an interface that extends the standard properties of an HTML `div` element. It defines the structure and behavior of the pagination controls in a table, providing options to customize how pagination is displayed and interacted with.

**_Key Properties_**

- **`groupSize`**: A number representing the size of each group of pages. This property controls how many page numbers are displayed at a time in the pagination controls. It determines the chunking of pages in cases where there are many pages.

- **`activePage?`**: An optional number that indicates the currently active page. This property highlights the current page in the pagination controls, allowing users to see which page of data they are viewing.

- **`showPageCount?`**: An optional boolean that determines whether the total page count is displayed. If `true`, the pagination controls will show how many pages are available in total.

- **`showSelectCount?`**: An optional boolean that indicates whether a dropdown or selection control for page size is shown. If `true`, users can select how many items they want to see per page.

- **`showNavigation?`**: An optional boolean that controls whether navigation buttons (such as "Previous" and "Next") are displayed. If `true`, these buttons will appear, allowing users to move between pages.

- **`showGroup?`**: An optional boolean that determines whether the group of page numbers is displayed. If `true`, the pagination will display a chunk or group of page numbers based on the `groupSize` property.

---

### TableHeaderOptionsType

`TableHeaderOptionsType` is an interface that defines the structure and behavior of the options available for configuring and manipulating table headers. This interface provides the necessary methods and properties to interact with the table headers and the data associated with them.

**_Key Properties_**

- **`sortArray`**: A reference to a sorting function (typically [`sortArray`](/coming-soon)) that is used to sort the table data based on the specified column and sort direction. This function enables dynamic sorting of table data by different columns.

- **`setHeaders`**: A `React.Dispatch` function for updating the state of the table headers. This allows for dynamic modifications to the headers, such as changing labels, visibility, or sorting options.

- **`headers`**: An array of [`TableHeaderType`](#tableheadertype) objects representing the current configuration of the table headers. Each header defines properties such as the label, sorting capability, and other configurations related to how the column is displayed and interacted with.

- **`tableData`**: An array of [`TableContentDataType<C>`](#tablecontentdatatype) objects representing the data displayed in the table. This is the actual data that corresponds to the table headers and is manipulated when sorting or filtering is applied.

- **`setTableData`**: A `React.Dispatch` function for updating the state of the table data. This allows the data displayed in the table to be dynamically changed, such as when new data is loaded, or existing data is filtered or sorted.

- **`data`**: An array of [`TableContentDataType<C>`](#tablecontentdatatype) objects representing the current dataset for a specific column. This is a subset of the overall table data, typically used within the context of a specific column operation.

- **`idx`**: A number representing the index of the current column within the headers array. This property is used to identify which column is being referenced or manipulated.

- **`column`**: A [`TableHeaderType`](#tableheadertype) object representing the specific column being referenced. This provides access to the properties and configurations of that particular header, allowing for individual column manipulation.

---

### TableDataFilteredType

`TableDataFilteredType` is a utility type that transforms a record type `T` into an array of key-value pairs. Each key-value pair is represented as a tuple containing the key and its associated value from the record `T`.

#### Type Parameters:

- **`T`**: A generic record type where each key is of type `string` and the value is of any type (`unknown`). This type defines the structure of the data that will be transformed.

#### Description:

The `TableDataFilteredType` maps each key-value pair in the record `T` to a tuple, resulting in an array of tuples. Each tuple contains two elements:

- The first element is the key (`K`) from the record `T`.
- The second element is the value associated with the key (`T[K]`).

This type is particularly useful for transforming objects into an array of key-value pairs, which can then be easily manipulated, filtered, or processed in various ways.

#### Example:

Given a record type `T`:

```typescript
type T = {
  name: string
  age: number
  active: boolean
}
```

The `TableDataFilteredType<T>` would be:

```typescript
type Result = [['name', string], ['age', number], ['active', boolean]][]
```

#### Use Cases:

- **Data Transformation**: When you need to convert an object into a list of key-value pairs for processing or filtering.
- **Table Rendering**: When displaying object properties in a table where each row represents a key-value pair.

#### Usage

This type is useful in situations where you need to work with data in a key-value format rather than as an object, especially when dealing with dynamic data structures.

```typescript
const data: TableDataFilteredType<T> = [
  ['name', 'John Doe'],
  ['age', 30],
  ['active', true],
]
```

---

### TableType

TableType is an interface that extends the standard properties of the [`ScrollArea`](/docs/components/scrollarea/#scrollareatype) component. It includes optional properties that allow customization of table behaviors and appearances by inheriting properties from the `ScrollArea` component.

**_Key Properties_**

- **(inherited from ScrollArea)**: Includes all the standard properties of the
  [`ScrollArea`](/docs/components/scrollarea/#scrollareatype) component, allowing for extensive customization of the scrollable area within the table.

---

### TableDataKey

TableDataKey is an interface that extends the standard properties of an HTML `td` element. It defines the structure for table data cells, including optional properties for additional customization.

**_Key Properties_**

- **withLabel?**: An optional property that specifies a label to be displayed with the table cell.
  It uses the [`LabelType`](/docs/components/button#labeltype) interface, excluding `showCommand` and `showLabel` properties.

- **withIcon?**: An optional React node that represents an icon to be displayed within the table cell. This allows for additional visual elements within the table data cells.

---

### **Table**

The `Table` component renders a responsive table wrapped in a `div` for scrolling.

- **`className`** (`string`, optional): Custom CSS class names to apply to the `table` element.
- **`ref`** (`React.Ref<HTMLTableElement>`): Ref to the `table` element.
- **`...props`** (`React.HTMLAttributes<HTMLTableElement>`): Additional properties passed to the `table` element.

---

### **TableHeader**

The `TableHeader` component renders a `thead` element for the table header.

- **`className`** (`string`, optional): Custom CSS class names to apply to the `thead` element.
- **`ref`** (`React.Ref<HTMLTableSectionElement>`): Ref to the `thead` element.
- **`...props`** (`React.HTMLAttributes<HTMLTableSectionElement>`): Additional properties passed to the `thead` element.

---

### **TableBody**

The `TableBody` component renders a `tbody` element for the table body.

- **`className`** (`string`, optional): Custom CSS class names to apply to the `tbody` element.
- **`ref`** (`React.Ref<HTMLTableSectionElement>`): Ref to the `tbody` element.
- **`...props`** (`React.HTMLAttributes<HTMLTableSectionElement>`): Additional properties passed to the `tbody` element.

---

### **TableFooter**

The `TableFooter` component renders a `tfoot` element for the table footer.

- **`className`** (`string`, optional): Custom CSS class names to apply to the `tfoot` element.
- **`ref`** (`React.Ref<HTMLTableSectionElement>`): Ref to the `tfoot` element.
- **`...props`** (`React.HTMLAttributes<HTMLTableSectionElement>`): Additional properties passed to the `tfoot` element.

---

### **TableRow**

The `TableRow` component renders a `tr` element for a row in the table.

- **`className`** (`string`, optional): Custom CSS class names to apply to the `tr` element.
- **`ref`** (`React.Ref<HTMLTableRowElement>`): Ref to the `tr` element.
- **`...props`** (`React.HTMLAttributes<HTMLTableRowElement>`): Additional properties passed to the `tr` element.

---

### **TableHead**

The `TableHead` component renders a `th` element for a header cell in the table.

- **`className`** (`string`, optional): Custom CSS class names to apply to the `th` element.
- **`ref`** (`React.Ref<HTMLTableCellElement>`): Ref to the `th` element.
- **`...props`** (`React.ThHTMLAttributes<HTMLTableCellElement>`): Additional properties passed to the `th` element.

---

### **TableCell**

The `TableCell` component renders a `td` element for a data cell in the table.

- **`className`** (`string`, optional): Custom CSS class names to apply to the `td` element.
- **`ref`** (`React.Ref<HTMLTableCellElement>`): Ref to the `td` element.
- **`...props`** (`React.TdHTMLAttributes<HTMLTableCellElement>`): Additional properties passed to the `td` element.

---

### **TableCaption**

The `TableCaption` component renders a `caption` element for the table caption.

- **`className`** (`string`, optional): Custom CSS class names to apply to the `caption` element.
- **`ref`** (`React.Ref<HTMLTableCaptionElement>`): Ref to the `caption` element.
- **`...props`** (`React.HTMLAttributes<HTMLTableCaptionElement>`): Additional properties passed to the `caption` element.