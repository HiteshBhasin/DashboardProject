"use client";
import React, { useState, useEffect } from "react";
import KpiCard from "../../../components/KpiCard";
import SectionMenu from "../../../components/SectionMenu";
import BarGraph from "../../../components/charts/BarGraph";
import PieGraph from "../../../components/charts/PieGraph";

import PageTitle from "../../../components/PageTitle";
import Tabs from "../../../components/Tabs";


export default function Home() {

  const [activeTab, setActiveTab] = useState(0);
  const [tabHistory, setTabHistory] = useState<number[]>([]);

  const data = {
    totalRequest: 48,
    completeRequest: 42,
    pendingRequest: 6,
    avgResolution: 7,
    totalCost: 5250
  };

  const tabLabels = ['Overview', 'Maintenance', 'Cleaning'];

  const handleTabClick = (index: number) => {
  if (index !== activeTab) {
    setTabHistory((prev) => [...prev, activeTab]);
    setActiveTab(index);
    }
  };

  return (
    <div className ="flex flex-col gap-1 ">
      <PageTitle pageTitle="Long-term Housekeeping" />
      <Tabs tabs={tabLabels} activeTab={activeTab} onTabClick={handleTabClick} />
      <div className="flex flex-wrap gap-3 mb-2">
        <KpiCard title="Total Requests" value={data.totalRequest}/>
        <KpiCard title="Complete Requests" value={data.completeRequest}/>
        <KpiCard title="Pending Requests" value={data.pendingRequest}/>
        <KpiCard title="Avg. Resolution Time" value={`${data.avgResolution} days`} />
        <KpiCard title="Total Maintenance Cost" value={`$${data.totalCost}`}/>
      </div>
      <div className='flex flex-wrap gap-3'>
        <div className="flex-2">
          <BarGraph
            title='Monthly Maintenance Expenses'
            labels={["Jan","Feb","Mar","Apr","May","Jun", "Jul","Aug","Sep","Oct","Nov","Dec"]}
            dataLabel='Expenses ($)'
            dataValues={[20000, 32000, 35000, 45000, 28000, 33000, 15000, 41000, 30000, 23000, 27000, 34000]}
          />
        </div>
        <div className="flex-1">
          <PieGraph
            title='Average Resolution Time by Priority'
            labels={["High", "Medium", "Low"]}
            dataValues={[3, 6, 12]}
            colors={["#E14B4B", "#EE7C1B", "#4B9E57"]}
            hoverColors={["#f26767", "#f7a94d", "#62b06a"]}
          />
        </div>
      </div>

    </div>

    
  );
}
