"use client"
import React, { useState, useEffect } from "react";
import KpiCard from "../../../components/KpiCard";
import PieGraph from "../../../components/charts/PieGraph";
import DynamicBarGraph from "../../../components/charts/DynamicBarGraph";
//import LinearBar from "../../../components/charts/LinearBar"; //Not working

import PageTitle from "../../../components/PageTitle";
import Tabs from "../../../components/Tabs";
import PageTitleCom from "../../../components/Communications";
import SpecialCard from "../../../components/SpecialCard";
import { JSX } from "react/jsx-runtime";

interface Cards {
  totalProperties: number;
  activeTenants: number;
  activeLeases: number;
  vacantUnits: number;
  outstandingBalance: number;
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

interface TenantBalance {
  name: string;
  property: string;
  balance: string;
}

interface TenantApiResponse {
  map(arg0: (input: any, index: any) => JSX.Element): React.ReactNode;
  length: number;
  cards: Cards;
  propertyProfit: BarGraphData;
  adoption: PieData;
  paymentStatus: BarGraphData;
  occupancy: PieData;
  tenantBalance: TenantBalance[];
}

export default function TenantsPage() {
  //------components------
  const [activeTab, setActiveTab] = useState(0);
  const [tabHistory, setTabHistory] = useState<number[]>([]);
  const [cards, setCards] = useState<Cards | null>(null);
  const [propertyProfit, setPropetyProfit] = useState<BarGraphData | null>(null);
  const [adoption, setAdoption] = useState<PieData | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<BarGraphData | null>(null);
  const [occupancyRate, setOccupancyRate] = useState<PieData | null>(null);
  const [tenantBalance, setTenantBalance] = useState<TenantApiResponse | null>(null);


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
        const res = await fetch("/api/tenants");
        const data = await res.json();
        setCards(data.cards);
        setPropetyProfit(data.propertyProfit);
        setAdoption(data.adoption);
        setPaymentStatus(data.paymentStatus);
        setOccupancyRate(data.occupancy);
        setTenantBalance(data.tenantBalance);
      }
      catch (err){
        console.error("Error fetching tenant data:", err);
      }
    }
    fetchTenantData();
  }, []);

  return (
    <div className ="flex flex-col gap-1 ">
      <PageTitle pageTitle="Tenants" />
      <Tabs tabs={tabLabels} activeTab={activeTab} onTabClick={handleTabClick} />

      {activeTab === 0 && cards && propertyProfit && adoption && paymentStatus && occupancyRate &&
       tenantBalance && (
        <>
          <div className="flex flex-wrap flex-row gap-3 mb-2">
            <KpiCard title="Total Properties" value={cards.totalProperties}/>
            <KpiCard title="Active Tenants" value={cards.activeTenants}/>
            <KpiCard title="Active Leases" value={cards.activeLeases}/>
            <KpiCard title="Vacant Units" value={cards.vacantUnits} />
            <KpiCard title="Outstanding Balance" value={`$${cards.outstandingBalance}`}/>
          </div>
          <div className='flex flex-wrap flex-row gap-3 mb-2'>
          <div className="flex-2">
              <DynamicBarGraph
                title={propertyProfit.title}
                labels={propertyProfit.labels}
                label={propertyProfit.label}
                dataValues={propertyProfit.dataValues}
                colors={["#0D525C"]}
                hoverColors={["#116e7cff"]}
                indexAxis='x'
              />
            </div>
            <div className="flex-1">
              <PieGraph
                title={adoption.title}
                labels={adoption.labels}
                dataValues={adoption.dataValues}
                colors={["#e85d5d", "#f2a341", "#9c9c9c", "#0D525C", "#5fb59e",]}
                hoverColors={["#f17878", "#f7b25f", "#b5b5b5", "#116e7cff", "#7cccb5"]}
              />
            </div>
          </div>
          <div className='flex flex-wrap flex-row gap-3 mb-2'>
          <div className="flex-1">
              <DynamicBarGraph
                title={paymentStatus.title}
                labels={paymentStatus.labels}
                label={paymentStatus.label}
                dataValues={paymentStatus.dataValues}
                colors={["#E14B4B", "#EE7C1B", "#0D525C",]}
                hoverColors={["#f26767", "rgba(255, 152, 51, 1)", "#116e7cff", ]}
                indexAxis='y'
              />
            </div>
            <div className="flex-1">
              <PieGraph
                title={occupancyRate?.title}
                labels={occupancyRate?.labels}
                dataValues={occupancyRate?.dataValues}
                colors={["#0D525C", "#EE7C1B",]}
                hoverColors={["#116e7cff", "#f7b25f"]}
              />
            </div>
            <div className="flex-1 bg-white border shadow-lg rounded-xl border transition-shadow hover:shadow-2xl overflow-y-auto min-w-80 pt-2 pl-3 pr-3 pb-3">
                <PageTitleCom pageTitle="Tenant With Outstanding Balance"/>
                <div className="flex flex-col item-center gap-2 max-h-75 overflow-y-auto">
                {tenantBalance.length > 0 ? (
                  tenantBalance.map((input, index) => (  
                      <SpecialCard
                        key={index}
                        title={input.name}
                        subtitle={input.property}
                        status={input.balance}
                      />
                  ))
                ) : (
                  <div className="text-gray-500 pt-4">
                    No tenant balance data available.
                  </div>
                )}
              </div>
              </div>
          </div>
        </>
      )}

    </div>

    
  );
}
