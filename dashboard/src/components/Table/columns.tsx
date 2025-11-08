"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { Buttons } from "./button"
import {DataTableColumnHeader} from "./data-table-column-header"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./dropdown-menu"


export type Properties = {
    name: string
    phone: string
    property: string,
    email: string,
    rent_due_date: Date,
    status: "staying" | "moving in" | "moving out"
}


export const columns: ColumnDef<Properties>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Name" />
            )
        },
    },
    {
        accessorKey: "phone",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Phone Number" />
            )
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Email" />
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
        accessorKey: "rent_due_date",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Rent Due" />
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
                        <Buttons variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Buttons>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(property.name)}
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