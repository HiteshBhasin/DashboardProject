import Image from "next/image";
import KpiCard from "../../../components/KpiCard";
import FilterButton from "../../../components/FilterButton";

export default function Home() {

  const data = {
    totalComplete: 48,
    totalReported: 286.5,
    totalVerified: 286.5,
    totalCharges: 3650,
    avgHours: 35
  };
  return (
    <div className ="flex flex-col gap-1 ">
      <div className="flex flex-wrap gap-3">
        <KpiCard title="Total Task Completed" value={data.totalComplete}/>
        <KpiCard title="Total Reported Hours" value={`${data.totalReported} hours`}/>
        <KpiCard title="Total Verfied Hours" value={`${data.totalVerified} hours`}/>
        <KpiCard title="Total Labour Charges" value={`$${data.totalCharges}`} />
        <KpiCard title="Avg. Hours per Staff" value={`${data.avgHours} hours`}/>
      </div>

    </div>

    
  );
}
