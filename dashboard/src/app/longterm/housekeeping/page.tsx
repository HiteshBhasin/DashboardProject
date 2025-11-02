import Image from "next/image";
import KpiCard from "../../../components/KpiCard";
import FilterButton from "../../../components/FilterButton";

export default function Home() {

  const data = {
    totalRequest: 48,
    completeRequest: 42,
    pendingRequest: 6,
    avgResolution: 7,
    totalCost: 5250
  };
  return (
    <div className ="flex flex-col gap-1 ">
      <div className="flex flex-wrap gap-3">
        <KpiCard title="Total Requests" value={data.totalRequest}/>
        <KpiCard title="Complete Requests" value={data.completeRequest}/>
        <KpiCard title="Pending Requests" value={data.pendingRequest}/>
        <KpiCard title="Avg. Resolution Time" value={`${data.avgResolution} days`} />
        <KpiCard title="Total Maintenance Cost" value={`$${data.totalCost}`}/>
      </div>

    </div>

    
  );
}
