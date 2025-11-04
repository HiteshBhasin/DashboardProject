import { columns, Properties } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Properties[]> {
    // Fetch data from your API here.
    return [
        {
            task: "Unit Repair",
            assigned_to: "Cameron Finnson",
            due_at: new Date("9999-12-31"), // Represents December 31, 9999
            property: "121-123 Clyde Road",
            status: "In Progress",
        },
        {
            task: "Unit Repair",
            assigned_to: "Cameron Finnson",
            due_at: new Date("9999-12-31"), // Represents December 31, 9999
            property: "121-123 Clyde Road",
            status: "In Progress",
        },
        {
            task: "Unit Repair",
            assigned_to: "Cameron Finnson",
            due_at: new Date("9999-12-31"), // Represents December 31, 9999
            property: "121-123 Clyde Road",
            status: "In Progress",
        },
        {
            task: "Unit Repair",
            assigned_to: "Cameron Finnson",
            due_at: new Date("9999-12-31"), // Represents December 31, 9999
            property: "121-123 Clyde Road",
            status: "In Progress",
        },
        {
            task: "Unit Repair",
            assigned_to: "Cameron Finnson",
            due_at: new Date("9999-12-31"), // Represents December 31, 9999
            property: "121-123 Clyde Road",
            status: "In Progress",
        },





    ];
}

export default async function DemoPage() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}