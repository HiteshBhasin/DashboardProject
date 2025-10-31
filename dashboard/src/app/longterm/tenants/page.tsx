import Image from "next/image";
import KpiCard from "../../../components/KpiCard";
import FilterButton from "../../../components/FilterButton";

export default function Home() {

  const data = {
    totalProperties: 48,
    activeTenants: 42,
    activeLeases: 41,
    vacantUnits: 9,
    outstandingBalance: '$5,250',
  };
  return (
    <div className ="flex flex-col gap-1 ">
      <div className="flex flex-wrap gap-3">
        <KpiCard title="Total Properties" value={data.totalProperties}/>
        <KpiCard title="Active Tenants" value={data.activeTenants}/>
        <KpiCard title="Active Leases" value={data.activeLeases}/>
        <KpiCard title="Vacant Units" value={data.vacantUnits} />
        <KpiCard title="Outstanding Balance" value={data.outstandingBalance}/>
      </div>

    </div>

    
  );
}
