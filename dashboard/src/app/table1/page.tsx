import { columns, Properties } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Properties[]> {
    // Fetch data from your API here.
    return [
        {
            name: "John Doe",
            phone: "204-999-9999",
            email: "john.doe@email.com",
            property: "121-123 Clyde Road",
            rent_due_date: new Date("9999-12-31"), // Represents December 31, 9999
            status: "staying",
        },
        {
            name: "Sarah Doe",
            phone: "204-999-9999",
            email: "sarah.doe@email.com",
            property: "121-123 Clyde Road",
            rent_due_date: new Date("9999-12-31"),
            status: "moving in",
        },
        {
            name: "Danny Doe",
            phone: "204-999-9999",
            email: "danny.doe@email.com",
            property: "121-123 Clyde Road",
            rent_due_date: new Date("9999-12-31"),
            status: "moving out",
        },
        {
            name: "John Doe",
            phone: "204-999-9999",
            email: "john.doe@email.com",
            property: "121-123 Clyde Road",
            rent_due_date: new Date("9999-12-31"),
            status: "staying",
        },
        {
            name: "John Doe",
            phone: "204-999-9999",
            email: "john.doe@email.com",
            property: "121-123 Clyde Road",
            rent_due_date: new Date("9999-12-31"),
            status: "staying",
        },
        {
            name: "John Doe",
            phone: "204-999-9999",
            email: "john.doe@email.com",
            property: "121-123 Clyde Road",
            rent_due_date: new Date("9999-12-31"),
            status: "staying",
        },
        {
            name: "John Doe",
            phone: "204-999-9999",
            email: "john.doe@email.com",
            property: "121-123 Clyde Road",
            rent_due_date: new Date("9999-12-31"),
            status: "staying",
        },
        {
            name: "John Doe",
            phone: "204-999-9999",
            email: "john.doe@email.com",
            property: "121-123 Clyde Road",
            rent_due_date: new Date("9999-12-31"),
            status: "staying",
        },
        {
            name: "John Doe",
            phone: "204-999-9999",
            email: "john.doe@email.com",
            property: "121-123 Clyde Road",
            rent_due_date: new Date("9999-12-31"),
            status: "staying",
        },
        {
            name: "John Doe",
            phone: "204-999-9999",
            email: "john.doe@email.com",
            property: "121-123 Clyde Road",
            rent_due_date: new Date("9999-12-31"),
            status: "staying",
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