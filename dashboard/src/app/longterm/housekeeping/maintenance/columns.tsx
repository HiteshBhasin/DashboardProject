"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "../../../../components/table/button"
import {DataTableColumnHeader} from "./data-table-column-header"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../../../components/table/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Properties = {
    task: string,
    assigned_to: string,
    due_at: Date,
    property: string,
    status: "In Progress" | "Completed" | "Pending" | "Overdue"
}

export const columns: ColumnDef<Properties>[] = [
    {
        accessorKey: "task",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Task" />
            )
        },
    },
    {
        accessorKey: "assigned",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Assigned To" />
            )
        },
    },
    {
        accessorKey: "due_at",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Due At" />
            )
        },
    },
    {
        accessorKey: "property",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Property" />
            )
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Status" />
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const property = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(property.property)}
                        >
                            Copy property ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View property details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]