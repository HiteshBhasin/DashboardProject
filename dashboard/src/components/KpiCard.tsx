
'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

interface KpiCardProps {
  title: string;
  value: number | string;
  change?: number;
  icon?: React.ReactNode;
  href?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, icon, href }) => {
  const positive = (change ?? 0) >= 0;
  const pathname = usePathname();
  // Mark selected if this card's href matches the current page
  const selected = href
  ? pathname === href
  : false;


  return (
    <Link
      href={href || "#"}
      className={`
        flex flex-col p-4 rounded-[25px] relative transition justify-between flex-1 whitespace-nowrap m-0
        ${selected
          ? 'bg-white text-[#0D525C] border-2 border-[#0D525C]'
          : 'bg-[#0D525C] text-white hover:bg-[#0b4750]'
        }
      `}
    >
      {/* Header section */}
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          {icon && <span className="text-xl">{icon}</span>}
          <h3 className="font-medium text-base m-0">{title}</h3>
        </div>

        {/* Change percentage bubble */}
        {change != null && (
          <p
            className={`
              text-xs font-medium px-2 py-[0.1rem] rounded-full
              ${positive ? 'bg-green-600' : 'bg-red-600'}
              text-white
            `}
          >
            {positive ? '+' : '-'} {Math.abs(change)}%
          </p>
        )}
      </div>

      {/* Value section */}
      <h2 className="text-2xl font-bold">{value}</h2>
    </Link>
  );
};

export default KpiCard;
