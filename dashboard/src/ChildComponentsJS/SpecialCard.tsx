"use client"; // required for client-side components

import React from "react";

interface SpecialCardProps {
  title: string;
  date: string | Date;      
  status: string; // accept any string and normalize it internally
}

const SpecialCard: React.FC<SpecialCardProps> = ({ title, date, status }) => {
  const formattedDate = new Date(date).toLocaleString();

  // normalize status to match expected literal types
  const normalizedStatus: "Unread" | "Read" =
    status === "Unread" ? "Unread" : "Read";

  return (
    <div className="flex flex-col border border-gray-300 rounded-[25px] bg-white w-[80%] pl-[20px] pt-[20px] pb-[20px]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="relative text-[#0D525C] text-[25px] font-bold font-sans w-max ml-[30px]">
          {title}
          <span className="absolute left-0 bottom-0 w-full h-1 bg-[#0D525C]" />
        </h3>
        <div className="font-bold tracking-[1px] text-[25px] pr-[50px]">
          <span className={normalizedStatus === "Unread" ? "text-red-500" : "text-[#0F951F]"}>
            {normalizedStatus}
          </span>
        </div>
      </div>

      <div className="text-[20px] text-[#545454] pl-[30px]">
        {formattedDate}
      </div>
    </div>
  );
};

export default SpecialCard;
