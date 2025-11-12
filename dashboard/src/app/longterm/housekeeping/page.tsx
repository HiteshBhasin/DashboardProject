"use client";
import React, { useState, useEffect } from "react";
import KpiCard from "../../../components/KpiCard";
import PieGraph from "../../../components/charts/PieGraph";
import DynamicBarGraph from "../../../components/charts/DynamicBarGraph";

import PageTitle from "../../../components/PageTitle";
import Tabs from "../../../components/Tabs";
import { DataTable } from "../../../components/Table/data-table";
import { createColumns } from "../../../components/Table/createColumns";

interface Cards {
  totalRequest: number;
  completeRequest: number;
  pendingRequest: number;
  avgResolution: number;
  totalCost: number;
}

interface CostPerProperty {
  Units: string;
  Task: number;
  Details: string;
  Cost: number;
}

interface PieData {
  title: string;
  labels: string[];
  dataValues: number[];
}

interface BarGraphData {
  title: string;
  labels: string[];
  label: string;
  dataValues: number[];
}

const columns = createColumns<CostPerProperty>([
  "Units", "Task", "Details", "Cost"
]);


export default function LongTermHousekeeping() {

  const [activeTab, setActiveTab] = useState(0);
  const [tabHistory, setTabHistory] = useState<number[]>([]);
  const [cards, setCards] = useState<Cards | null>(null);
  const [expenses, setExpenses] = useState<BarGraphData | null>(null);
  const [requestStatus, setRequestStatus] = useState<PieData | null>(null);
  const [resolutionTime, setResolutionTime] = useState<BarGraphData | null>(null);
  const [costPerProperty, setCostPerProperty] = useState<CostPerProperty[]>([]);

  const tabLabels = ['Overview', 'Maintenance', 'Cleaning'];

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
        const res = await fetch("/api/longtermhousekeeping");
        const data = await res.json();
        setCards(data.cards);
        setExpenses(data.maintenanceExpenses);
        setRequestStatus(data.requestStatus);
        setResolutionTime(data.resolutionTime);
        setCostPerProperty(data.costPerProperty);
      }
      catch (err){
        console.error("Error fetching tenant data:", err);
      }
    }
    fetchTenantData();
  }, []);

  return (
    <div className ="flex flex-col gap-1 ">
      <PageTitle pageTitle="Long-term Housekeeping" />
      <Tabs tabs={tabLabels} activeTab={activeTab} onTabClick={handleTabClick} />
      
      {activeTab === 0 && cards && expenses && requestStatus && resolutionTime &&
       costPerProperty && (
        <>
          <div className="flex flex-wrap flex-row gap-3 mb-2">
            <KpiCard title="Total Requests" value={cards.totalRequest} />
            <KpiCard title="Complete Requests" value={cards.completeRequest} />
            <KpiCard title="Pending Requests" value={cards.pendingRequest} />
            <KpiCard title="Avg. Resolution Time" value={`${cards.avgResolution} days`} />
            <KpiCard title="Total Maintenance Cost" value={`$${cards.totalCost}`} />
          </div><div className='flex flex-wrap flex-row gap-3 mb-2'>
              <div className="flex-2">
                <DynamicBarGraph
                  title={expenses.title}
                  labels={expenses.labels}
                  label={expenses.label}
                  dataValues={expenses.dataValues}
                  colors={['#0D525C']}
                  hoverColors={['#147382ff']}
                  indexAxis="x" />
              </div>
              <div className="flex-1">
                <PieGraph
                  title={requestStatus.title}
                  labels={requestStatus.labels}
                  dataValues={requestStatus.dataValues}
                  colors={["#E14B4B", "#EE7C1B", "#0D525C"]}
                  hoverColors={["#f26767", "#f7a94d", "#147382ff"]} />
              </div>
            </div><div className='flex flex-wrap flex-row gap-3'>
              <DynamicBarGraph
                title={resolutionTime.title}
                labels={resolutionTime.labels}
                label={resolutionTime.label}
                dataValues={resolutionTime.dataValues}
                colors={["#E14B4B", "#EE7C1B", "#0D525C"]}
                hoverColors={["#f26767", "#f7a94d", "#147382ff"]}
                indexAxis="y" />
              <div className="flex-1">
                <DataTable
                  title="Tasks Breakdown"
                  columns={columns}
                  data={costPerProperty} />
              </div>
            </div>
          </>
      )}

    </div>

    
  );
}
