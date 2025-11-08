'use client';
import Image from "next/image";
import KpiCard from "../../../../components/KpiCard";
import FilterButton from "../../../../components/FilterButton";
import SectionMenu from "../../../../components/SectionMenu";
import BarGraph from "../../../../components/charts/BarGraph";

export default function Home() {

  const data = {
    allUnits: 115,
    leaseEndingSoon: 1,
    unlistedVacantUnits: 99,
    listedUnits: 2,

  };

  const sections = [
    {href: '/longterm/leases', name:'Active'},
    {href: '/longterm/leases/in-active', name:'In-Active'},
    {href: '/longterm/leases/applications', name:'Applications'},
    {href: '/longterm/leases/listing', name:'Listing'},

  ];

  return (
    <div className ="flex flex-col gap-1 ">
      {/* Top of the Page */}
      <SectionMenu sectionName='Leasing' navLinks={sections} />
      <div className="flex flex-wrap gap-3 mb-2">
        <KpiCard title="All Units" value={data.allUnits} href='/longterm/leases/listing'/>
        <KpiCard title="Lease ending soon" value={data.leaseEndingSoon} href='/longterm/leases/listing/ending-soon'/>
        <KpiCard title="Unlisted Vacant Units" value={data.unlistedVacantUnits} href='/longterm/leases/listing/unlisted-vacant'/>
        <KpiCard title="Listed Units" value={data.listedUnits} href='/longterm/leases/listing/listed' />
      </div>


    </div>

    
  );
}
