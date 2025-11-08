"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { Buttons } from "./button";
import { MoreHorizontal } from "lucide-react";


export function createColumns<T extends object>(
  columnNames: (keyof T)[],
  includeActions: boolean = false
): ColumnDef<T>[] {
  // Create base columns
  const baseColumns: ColumnDef<T>[] = columnNames.map((key) => ({
    accessorKey: key as string,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={String(key)
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase())}
      />
    ),
  }));

  
  if (includeActions) {
    baseColumns.push({
      id: "actions",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Buttons variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Buttons>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(JSON.stringify(data))}>
                Copy Row Data
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    });
  }

  return baseColumns;
}
