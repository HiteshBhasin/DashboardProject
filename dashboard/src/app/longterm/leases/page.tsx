import Image from "next/image";
import KpiCard from "../../../components/KpiCard";
import FilterButton from "../../../components/FilterButton";
import SectionMenu from "../../../components/SectionMenu";
import BarGraph from "../../../components/charts/BarGraph";

export default function Home() {

  const data = {
    totalRequest: 48,
    completeRequest: 42,
    pendingRequest: 6,
    avgResolution: 7,
    totalCost: 5250
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



    </div>

    
  );
}
