"use client"
import React, { useState, useEffect } from "react";
import KpiCard from "../../../components/KpiCard";
import PieGraph from "../../../components/charts/PieGraph";
import DynamicBarGraph from "../../../components/charts/DynamicBarGraph";
import LinearBar from "../../../components/charts/DynamicBarGraph";

import PageTitle from "../../../components/PageTitle";
import Tabs from "../../../components/Tabs";

export default function TenantsPage() {

  const [activeTab, setActiveTab] = useState(0);
  const [tabHistory, setTabHistory] = useState<number[]>([]);

  const data = {
    totalProperties: 48,
    activeTenants: 42,
    activeLeases: 41,
    vacantUnits: 9,
    outstandingBalance: '$5,250',
  };

  const tabLabels = ['Overview', 'List'];

  const handleTabClick = (index: number) => {
  if (index !== activeTab) {
    setTabHistory((prev) => [...prev, activeTab]);
    setActiveTab(index);
    }
  };

  return (
    <div className ="flex flex-col gap-1 ">
      <PageTitle pageTitle="Tenants" />
      <Tabs tabs={tabLabels} activeTab={activeTab} onTabClick={handleTabClick} />

      {activeTab === 0 && (
        <>
          <div className="flex flex-wrap flex-row gap-3 mb-2">
            <KpiCard title="Total Properties" value={data.totalProperties}/>
            <KpiCard title="Active Tenants" value={data.activeTenants}/>
            <KpiCard title="Active Leases" value={data.activeLeases}/>
            <KpiCard title="Vacant Units" value={data.vacantUnits} />
            <KpiCard title="Outstanding Balance" value={data.outstandingBalance}/>
          </div>
          <div className='flex flex-wrap flex-row gap-3 mb-2'>
          <div className="flex-2">
              <DynamicBarGraph
                title='Long-term Properties Profit'
                labels={['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']}
                label='Profit ($)'
                dataValues={[20000, 32000, 38000, 45000, 29000, 35000, 15000, 42000, 31000, 23000, 27000, 33000]}
                colors={["#0D525C"]}
                hoverColors={["#116e7cff"]}
                indexAxis='x'
              />
            </div>
            <div className="flex-1">
              <PieGraph
                title='Tenant Portal Adoption'
                labels={["Missing Contact Details", "Invalid Emails", "Inactive", "Activated in Portal", "Payment Set Up",]}
                dataValues={[18, 17, 10, 35, 20]}
                colors={["#e85d5d", "#f2a341", "#9c9c9c", "#0D525C", "#5fb59e",]}
                hoverColors={["#f17878", "#f7b25f", "#b5b5b5", "#116e7cff", "#7cccb5"]}
              />
            </div>
          </div>
          <div className='flex flex-wrap flex-row gap-3 mb-2'>
          <div className="flex-2">
              <DynamicBarGraph
                title='Payment Status Breakdown'
                labels={["Overdue", "Late", "Paid on Time"]}
                label='Number of Payments'
                dataValues={[14, 23, 67]}
                colors={["#E14B4B", "#EE7C1B", "#0D525C",]}
                hoverColors={["#f26767", "rgba(255, 152, 51, 1)", "#116e7cff", ]}
                indexAxis='y'
              />
            </div>
            <div className="flex-1">
              <LinearBar
                title='Occupancy Rate'
                labels={["Occupied", "Vacant"]}
                dataValues={[80, 20]}
                colors={["#0D525C", "#EE7C1B",]}
                hoverColors={["#116e7cff", "#f7b25f"]}
                indexAxis="y"
              />
            </div>
          </div>
        </>
      )}

    </div>

    
  );
}
