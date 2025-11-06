"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, CircleUserRoundIcon } from "lucide-react"
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
    task_id: string,
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
        cell: ({ row }) => {
        const task = row.getValue("task") as string;
        return (
        <div className="w-[50%] flex items-center gap-3">
        <span>{task}</span>
        </div>
        )
        }
    },
    {
        accessorKey: "task_id",
        enableSorting: false,

        header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="" />
        )
        },
        cell: ({row}) => {
            return (
                <span className={`px-2 py-1 text-[10px] font-medium  rounded-full text-[#0D525C] bg-[#CADCDF]`}>
                    {row.getValue('task_id') as string}
                </span>
            )
        }
    },
    {
        accessorKey: "assigned_to",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Assigned To" />
            )
        },
        //This code will change once we integrate backend
        //The avatar is hard coded
        cell: ({row}) => {
            const name = row.getValue("assigned_to") as string
            return (
                <div className="flex items-center gap-1.5">
                    <CircleUserRoundIcon/>
                    <span>{name}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "due_at",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Due At" />
            )
        },
        cell: ({row}) => {
            const date = row.getValue("due_at") as Date
            const formatted = date.toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
            });
            return(
                <span>{formatted}</span>
            )
  
        }
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
        cell: ({row}) => {
            const status = row.getValue("status") as string

            //Define colors based off the status
            const color =
            status === "In Progress"
                ? "text-yellow-600 bg-yellow-100"
                : status === "Completed"
                ? "text-green-600 bg-green-100"
                : status === "Pending"
                ? "text-gray-600 bg-gray-100"
                : status === "Overdue"
                ? "text-red-600 bg-red-100"
                : "text-gray-700"

            return (
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${color}`}>
                    {status}
                </span>
            )
        }
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