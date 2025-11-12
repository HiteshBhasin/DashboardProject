"use client"
import React, { useState, useEffect } from "react";
import KpiCard from "../../../components/KpiCard";
import PieGraph from "../../../components/charts/PieGraph";
import DynamicBarGraph from "../../../components/charts/DynamicBarGraph";

import PageTitle from "../../../components/PageTitle";
import Tabs from "../../../components/Tabs";
import { DataTable } from "../../../components/Table/data-table";
import { createColumns } from "../../../components/Table/createColumns";

interface Cards {
  totalComplete: number;
  totalReported: number;
  totalVerified: number;
  totalCharges: number;
  avgHours: number;
}

interface BarGraphData {
  title: string;
  labels: string[];
  label: string;
  dataValues: number[];
}

interface PieData {
  title: string;
  labels: string[];
  dataValues: number[];
}

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
  const [cards, setCards] = useState<Cards | null>(null);
  const [taskStatus, setTaskStatus] = useState<BarGraphData | null>(null);
  const [labourCharges, setLabourCharges] = useState<BarGraphData | null>(null);
  const [hourComparison, setHourComparison] = useState<PieData | null>(null);
  const [staffItems, setStaffItems] = useState<StaffSummary[]>([]);
  const [categoryItems, setCategoryItems] = useState<CategoryBreakdown[]>([]);

  const tabLabels = ['Overview', 'List'];

  const handleTabClick = (index: number) => {
  if (index !== activeTab) {
    setTabHistory((prev) => [...prev, activeTab]);
    setActiveTab(index);
    }
  };

  // Fetch tenant data
    useEffect(() => {
      async function fetchTenantData() {
        try {
          const res = await fetch("/api/monthlypayout");
          const data = await res.json();
          setCards(data.cards);
          setTaskStatus(data.taskStatus);
          setLabourCharges(data.labourCharges);
          setHourComparison(data.hourComparison);
          setStaffItems(data.staffItems);
          setCategoryItems(data.categoryItems);
        }
        catch (err){
          console.error("Error fetching tenant data:", err);
        }
      }
      fetchTenantData();
    }, []);

  return (
    <div className ="flex flex-col gap-1 ">
      <PageTitle pageTitle="Monthly Payout" />
      <Tabs tabs={tabLabels} activeTab={activeTab} onTabClick={handleTabClick} />
      {activeTab === 0 && cards && taskStatus && labourCharges && hourComparison &&
        staffItems && categoryItems && (
        <>
          <div className="flex flex-wrap flex-row gap-3 mb-2">
            <KpiCard title="Total Task Completed" value={cards.totalComplete}/>
            <KpiCard title="Total Reported Hours" value={`${cards.totalReported} hours`}/>
            <KpiCard title="Total Verfied Hours" value={`${cards.totalVerified} hours`}/>
            <KpiCard title="Total Labour Charges" value={`$${cards.totalCharges}`} />
            <KpiCard title="Avg. Hours per Staff" value={`${cards.avgHours} hours`}/>
          </div>
          <div className='flex flex-wrap flex-row gap-3 mb-2'>
            <div className="flex-1">
              <DynamicBarGraph
                title='Task Status Summary'
                labels={taskStatus.labels}
                label={taskStatus.label}
                dataValues={taskStatus.dataValues}
                colors={["#EE7C1B", "#0D525C", "#b5b5b5"]}
                hoverColors={["rgba(245, 155, 60, 1)", "#116e7cff","#cfcfcf"]}
                indexAxis='x'
              />
            </div>
            <div className="flex-1">
              <DynamicBarGraph
                title='Labour Charges Comparison'
                labels={labourCharges.labels}
                label={labourCharges.label}
                dataValues={labourCharges.dataValues}
                colors={["#EE7C1B", "#0D525C", "#b5b5b5"]}
                hoverColors={["rgba(245, 155, 60, 1)", "#116e7cff","#cfcfcf"]}
                indexAxis='x'
              />
              </div>
              <div className="flex-1">
              <PieGraph
                title='Maintenance vs Cleaning (Hours)'
                labels={hourComparison.labels}
                dataValues={hourComparison.dataValues}
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
