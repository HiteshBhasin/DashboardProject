"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "../../ChildComponentsJS/table";
import { Buttons, buttonVariants } from "../../ChildComponentsJS/button";

import { DataTable } from "../../ChildComponentsJS/DataTable/data-table";
import { columns, Properties } from "../../ChildComponentsJS/DataTable/columns";


import Header from "../../ChildComponentsJS/Header";
import NavSideBar from "../../ChildComponentsJS/NavSideBar";
import PageTitle from "../../components/PageTitle";
import Tabs from "../../components/Tabs";
import ArrowAndDescription from "../../ChildComponentsJS/ArrowAndDescription";
import Button from "../../ChildComponentsJS/Buttons";
import RegularCard from "../../ChildComponentsJS/DetailCard";


interface Staff {
  name: string;
  email: string;
  phone: string;
  unit?: string;
  address?: string;
  tenantPortalStatus?: string;
  labourType?: string;
  dateRange?: string;
  ratePerHour?: number;
  reportedHours?: number;
  timesheetHours?: number;
  totalCharges?: number;
  variance?: number;
  verifiedBy?: string;
  transactions?: Transaction[];

}
interface Transaction {
  task: string;
  location: string;
  reportedTime: string; // or number if in hours
  timesheet: string;    // or number
  date: string;
  status: string;
}


export default function MonthlyPayout() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(0);
  const [tabHistory, setTabHistory] = useState<number[]>([]);
  const [staff, setStaff] = useState<Staff | null>(null);


  const tabLabels = ["Overview", "Details"];

  // Fetch tenant data
  useEffect(() => {
    fetch("http://localhost:5000/api/tenant")
      .then((res) => res.json())
      .then((data) => setStaff(data))
      .catch((err) => console.error(err));
  }, []);

  const handleTabClick = (index: number) => {
    if (index !== activeTab) {
      setTabHistory((prev) => [...prev, activeTab]);
      setActiveTab(index);
    }
  };

  // Back button handler
  const handleBack = () => {
    if (tabHistory.length > 0) {
      const previous = tabHistory[tabHistory.length - 1];
      setTabHistory((prev) => prev.slice(0, prev.length - 1));
      setActiveTab(previous);
    } else {
      router.back();
    }
  };

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

    ];
  }

  const data : Properties[]= [
      {
        name: "John Doe",
        phone: "204-999-9999",
        email: "john.doe@email.com",
        property: "121-123 Clyde Road",
        rent_due_date: new Date("9999-12-31"), // Represents December 31, 9999
        status: "staying",
      },
    ];

  return (
    <div className="flex min-h-screen">
      <div className="flex-shrink-0">
        <NavSideBar />
      </div>


      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-10">
          <PageTitle pageTitle="Monthly Payout" />
          <Tabs tabs={tabLabels} activeTab={activeTab} onTabClick={handleTabClick} />


          {activeTab === 0 && (
            <>
            </>
          )}

          {activeTab === 1 && (
            <>
              <div className="flex justify-between items-center pt-10 pb-6 mr-[120px]">
                <ArrowAndDescription
                  description={staff?.name || "Loading..."}
                  hasPreviousTab={tabHistory.length > 0}
                  onBack={handleBack}
                />
                <Button buttonName="Edit" variant="regular" />
              </div>

              <RegularCard
                title="Tenant Information"
                labels={["Name", "Date Range", "Labour Type", "Contact Email"]}
                data={staff || {}}
                height="300px"
                width="96%"
                labelsPerColumn={3}
                gapBetweenLabelValue="gap-16"
              />
              <RegularCard
                title="Tenant Information"
                labels={["Rate per Hour", "Reported Hours", "Timesheet Hours", "Total Charges", "Variance", "Verified By",]}
                data={staff || {}}
                height="325px"
                width="96%"
                labelsPerColumn={3}
                gapBetweenLabelValue="gap-16"
              />

              <DataTable columns={columns} data={data}></DataTable>

              <div >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Reported Time</TableHead>
                      <TableHead>Timesheet</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staff?.transactions?.map((tx, index) => (
                      <TableRow key={index}>
                        <TableCell>{tx.task}</TableCell>
                        <TableCell>{tx.location}</TableCell>
                        <TableCell>{tx.reportedTime}</TableCell>
                        <TableCell>{tx.timesheet}</TableCell>
                        <TableCell>{tx.date}</TableCell>
                        <TableCell>{tx.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>


              </div>






            </>
          )}



        </div>
      </div>
    </div>
  );
}
