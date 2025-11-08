
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
  const selected = href ? pathname === href : false;

  // Shared card layout classes
  const baseClasses = `
    flex flex-col p-4 rounded-[25px] relative justify-between flex-1 whitespace-nowrap m-0 border-2 transition-all duration-300 ease-in-out
  `;

  // Styles for clickable cards
  const clickableClasses = `
    cursor-pointer
    ${selected
      ? "bg-white text-[#0D525C] border-[#0D525C] scale-[1.02] shadow-lg"
      : "bg-[#0D525C] text-white border-transparent hover:bg-[#0b4750] hover:scale-[1.02] hover:shadow-md"}
  `;

  // Styles for non-clickable cards
  const staticClasses = `
    bg-[#0D525C] text-white border-transparent
  `;

  const cardContent = (
    <>
      {/* Header */}
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          {icon && <span className="text-xl">{icon}</span>}
          <h3 className="font-medium text-base m-0">{title}</h3>
        </div>

        {/* Change bubble */}
        {change != null && (
          <p
            className={`
              text-xs font-medium px-2 py-[0.1rem] rounded-full
              ${positive ? "bg-green-600" : "bg-red-600"} text-white
            `}
          >
            {positive ? "+" : "-"} {Math.abs(change)}%
          </p>
        )}
      </div>

      {/* Value */}
      <h2 className="text-2xl font-bold">{value}</h2>
    </>
  );

  // Render clickable Link or static div
  return href ? (
    <Link href={href} className={`${baseClasses} ${clickableClasses}`}>
      {cardContent}
    </Link>
  ) : (
    <div className={`${baseClasses} ${staticClasses}`}>
      {cardContent}
    </div>
  );
};
export default KpiCard;
