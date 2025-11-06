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
    {href: '/longterm/housekeeping', name:'Overview'},
    {href: '/longterm/housekeeping/maintenance', name:'Maintenance'},
    {href: '/longterm/housekeeping/cleaning', name:'Cleaning'}
  ];

  return (
    <div className ="flex flex-col gap-1 ">
      <SectionMenu sectionName='Long-term Housekeeping' navLinks={sections} />
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
          <BarGraph
            title='Monthly Maintenance Expenses'
            labels={["Jan","Feb","Mar","Apr","May","Jun", "Jul","Aug","Sep","Oct","Nov","Dec"]}
            dataLabel='Expenses ($)'
            dataValues={[20000, 32000, 35000, 45000, 28000, 33000, 15000, 41000, 30000, 23000, 27000, 34000]}
          />
        </div>
      </div>

    </div>

    
  );
}
