import { columns, Properties } from "./columns"
import { DataTable } from "./data-table"
import SectionMenu from "../../../../components/SectionMenu";


async function getData(): Promise<Properties[]> {
    // Fetch data from your API here.
    return [
        {
            task: "Unit Repair",
            task_id: "#99999",
            assigned_to: "Cam",
            due_at: new Date("9999-12-31"), // Represents December 31, 9999
            property: "121-123 Clyde Road",
            status: "In Progress",
        },
        {
            task: "Unit Repair",
            task_id: "#99999",
            assigned_to: "Cameron Finnson",
            due_at: new Date("9999-12-31"), // Represents December 31, 9999
            property: "121-123 Clyde Road",
            status: "Pending",
        },
        {
            task: "Unit Repair",
            task_id: "#99999",
            assigned_to: "Cameron Finnsons",
            due_at: new Date("9999-12-31"), // Represents December 31, 9999
            property: "121-123 Clyde Road",
            status: "Overdue",
        },
        {
            task: "Unit Repair",
            task_id: "#99999",
            assigned_to: "Cameron Finnson",
            due_at: new Date("9999-12-31"), // Represents December 31, 9999
            property: "121-123 Clyde Road",
            status: "Completed",
        },
        {
            task: "Unit Repair",
            task_id: "#99999",
            assigned_to: "Cameron Finnson",
            due_at: new Date("9999-12-31"), // Represents December 31, 9999
            property: "121-123 Clyde Road",
            status: "In Progress",
        },





    ];
}

export default async function DemoPage() {
    const data = await getData()

    const sections = [
    {href: '/longterm/housekeeping', name:'Overview'},
    {href: '/longterm/housekeeping/maintenance', name:'Maintenance'},
    {href: '/longterm/housekeeping/cleaning', name:'Cleaning'}
    ];
    return (

        <div className ="flex flex-col gap-1 ">
            <SectionMenu sectionName='Long-term Housekeeping' navLinks={sections} />
            <div className="container mx-auto py-1">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    )
}