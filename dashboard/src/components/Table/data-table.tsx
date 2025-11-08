"use client"

import * as React from "react"
import { Buttons } from "./button"
import { Input } from "./input"
import { Search } from "lucide-react"

import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu"

// ✅ Correctly typed global filter for TanStack v8
const globalFilterFn: FilterFn<any> = (row, _columnId, filterValue) => {
  if (!filterValue) return true
  const search = String(filterValue).toLowerCase()

  // Check every visible cell value in the row
  return row
    .getAllCells()
    .some((cell: any) =>
      String(cell.getValue() ?? "")
        .toLowerCase()
        .includes(search)
    )
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  title?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  title,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = React.useState("")

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
      globalFilter,
    },
  })

  return (
    <div className="w-[96%] bg-[#D7E2E4] rounded-3xl shadow-md border border-gray-400 overflow-hidden">
      {/* 🔹 Top Section: Title on Left, Search + Columns on Right */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-400">
        {/* Title on Left */}
        {title && (
          <h2 className="text-[#0D525C] text-xl font-bold">{title}</h2>
        )}

        {/* Search + Columns Button on Right */}
        <div className="flex items-center space-x-2 w-[60%] justify-end">
          {/* ✅ Global Row-based Search Input */}
          <div className="relative flex-1 min-w-[150px] max-w-[400px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-5 h-5" />
            </span>
            <Input
              placeholder="Search..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="w-full h-[42px] bg-white border border-gray-400 rounded-md px-10 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Columns Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Buttons
                variant="outline"
                className="h-[42px] w-[120px] font-bold text-sm border border-gray-400 bg-white text-[#0D525C] hover:bg-gray-100"
              >
                Columns
              </Buttons>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="bg-white border border-gray-400 text-[#0D525C] rounded-xl shadow-md"
            >
              {table.getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize px-6 py-2 hover:bg-gray-100 hover:text-[#0D525C] rounded-md transition-colors"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 🔹 Table Section */}
      <div className="overflow-x-auto bg-white">
        <Table className="w-full h-48">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className="border border-gray-400 text-[#0D525C] font-bold pl-6 bg-[#D7E2E4]"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="border border-gray-400 text-[#0D525C]"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="border border-gray-400 pl-6" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 🔹 Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4 px-6 border-t border-gray-400 bg-[#D7E2E4]">
        <Buttons
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Buttons>
        <Buttons
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Buttons>
      </div>
    </div>
  )
}
