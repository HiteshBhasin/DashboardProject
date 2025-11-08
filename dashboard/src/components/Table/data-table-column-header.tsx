import { Column } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Buttons } from "./button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./dropdown-menu"

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>
    }

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Buttons
                        variant="ghost"
                        size="sm"
                        className="data-[state=open]:bg-accent -ml-3 h-8 hover:bg-gray-100 hover:text-[#0D525C] rounded-md transition-colors"
                    >
                        <span className="font-bold">{title}</span>
                        {column.getIsSorted() === "desc" ? (
                            <ArrowDown />
                        ) : column.getIsSorted() === "asc" ? (
                            <ArrowUp />
                        ) : (
                            <ChevronsUpDown />
                        )}
                    </Buttons>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-white border border-[#90ADB2] text-[#0D525C] shadow-md rounded-md ">
                    <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-[#0D525C] rounded-md transition-colors"

                        onClick={() => column.toggleSorting(false)}>
                        <ArrowUp />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-[#0D525C] rounded-md transition-colors"
                        onClick={() => column.toggleSorting(true)}>
                        <ArrowDown />
                        Desc
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-[#0D525C] rounded-md transition-colors"
                        onClick={() => column.toggleVisibility(false)}>
                        <EyeOff />
                        Hide
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
