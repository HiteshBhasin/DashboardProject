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
        <KpiCard title="Total Properties" value={data.totalProperties} change={3} />
        <KpiCard title="Active Tenants" value={data.activeTenants} change={1} />
        <KpiCard title="Active Leases" value={data.activeLeases} change={2} />
        <KpiCard title="Vacant Units" value={data.vacantUnits} change={-1} />
        <KpiCard title="Outstanding Balance" value={data.outstandingBalance} change={-5} />
      </div>
    </div>

    
  );
}
