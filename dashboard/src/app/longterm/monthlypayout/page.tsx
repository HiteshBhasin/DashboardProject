"use client"
import React, { useState, useEffect } from "react";
import KpiCard from "../../../components/KpiCard";
import PieGraph from "../../../components/charts/PieGraph";
import DynamicBarGraph from "../../../components/charts/DynamicBarGraph";

import PageTitle from "../../../components/PageTitle";
import Tabs from "../../../components/Tabs";
import { DataTable } from "../../../components/Table/data-table";
import { createColumns } from "../../../components/Table/createColumns";

interface StaffSummary {
  Staff: string;
  Task: number;
  Hours: number;
  Labour: number;
}

interface CategoryBreakdown {
  Category: string;
  Hours: number;
  Cost: number;
}

const staffColumns = createColumns<StaffSummary>([
  "Staff", "Task", "Hours", "Labour"
]);

const categoryColumns = createColumns<CategoryBreakdown>([
  "Category", "Hours", "Cost"
]);

export default function MonthlyPayout() {

  const [activeTab, setActiveTab] = useState(0);
  const [tabHistory, setTabHistory] = useState<number[]>([]);

  const data = {
    totalComplete: 48,
    totalReported: 286.5,
    totalVerified: 286.5,
    totalCharges: 3650,
    avgHours: 35
  };

  const staffItems : StaffSummary[] = [
    {
      Staff: "Dana",
      Task: 12,
      Hours: 670,
      Labour: 1200
    },
    {
      Staff: "Dana",
      Task: 12,
      Hours: 670,
      Labour: 1200
    },
    {
      Staff: "Dana",
      Task: 12,
      Hours: 670,
      Labour: 1200
    },
    {
      Staff: "Dana",
      Task: 12,
      Hours: 670,
      Labour: 1200
    },
    {
      Staff: "Dana",
      Task: 12,
      Hours: 670,
      Labour: 1200
    }
  ];

  const categoryItems : CategoryBreakdown[] = [
    {
      Category: "Maintenance",
      Hours: 200,
      Cost: 4000
    },
    {
      Category: "Cleaning",
      Hours: 200,
      Cost: 4000
    },
  ];

  const tabLabels = ['Overview', 'List'];

  const handleTabClick = (index: number) => {
  if (index !== activeTab) {
    setTabHistory((prev) => [...prev, activeTab]);
    setActiveTab(index);
    }
  };

  return (
    <div className ="flex flex-col gap-1 ">
      <PageTitle pageTitle="Monthly Payout" />
      <Tabs tabs={tabLabels} activeTab={activeTab} onTabClick={handleTabClick} />
      {activeTab === 0 && (
        <>
          <div className="flex flex-wrap flex-row gap-3 mb-2">
            <KpiCard title="Total Task Completed" value={data.totalComplete}/>
            <KpiCard title="Total Reported Hours" value={`${data.totalReported} hours`}/>
            <KpiCard title="Total Verfied Hours" value={`${data.totalVerified} hours`}/>
            <KpiCard title="Total Labour Charges" value={`$${data.totalCharges}`} />
            <KpiCard title="Avg. Hours per Staff" value={`${data.avgHours} hours`}/>
          </div>
          <div className='flex flex-wrap flex-row gap-3 mb-2'>
            <div className="flex-1">
              <DynamicBarGraph
                title='Task Status Summary'
                labels={["In Progress", "Complete", "Not Started"]}
                label='Tasks'
                dataValues={[39, 54, 7]}
                colors={["#EE7C1B", "#0D525C", "#b5b5b5"]}
                hoverColors={["rgba(245, 155, 60, 1)", "#116e7cff","#cfcfcf"]}
                indexAxis='x'
              />
            </div>
            <div className="flex-1">
              <DynamicBarGraph
                title='Labour Charges Comparison'
                labels={["Sept", "Oct (present)", "Nov (projected)"]}
                label='Labour Charges'
                dataValues={[4000, 4250, 5000]}
                colors={["#EE7C1B", "#0D525C", "#b5b5b5"]}
                hoverColors={["rgba(245, 155, 60, 1)", "#116e7cff","#cfcfcf"]}
                indexAxis='x'
              />
              </div>
              <div className="flex-1">
              <PieGraph
                title='Maintenance vs Cleaning (Hours)'
                labels={["Maintenance", "Cleaning"]}
                dataValues={[75, 25]}
                colors={["#0D525C", "rgba(238, 124, 27, 1)"]}
                hoverColors={["#116e7cff", "rgba(245, 155, 60, 1)"]}
              />
              </div>
              
          </div>
          <div className='flex flex-wrap gap-3 mb-2'>
            <div className="flex-1">
              <DataTable
                title="Staff Summary (Top Highest Labour)"
                columns={staffColumns}
                data={staffItems}
              />
            </div>
            <div className="flex-1">
              <DataTable
                title="Category Breakdown"
                columns={categoryColumns}
                data={categoryItems}
              />
            </div>              
          </div>
        </>
      )}
    </div>  
  );
}
