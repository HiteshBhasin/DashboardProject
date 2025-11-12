"use client";

import React from "react";

interface SpecialCardProps {
  title: string;
  subtitle: string;
  status: string;
}

const SpecialCard: React.FC<SpecialCardProps> = ({ title, subtitle, status }) => {
  // const formattedDate = new Date(date).toLocaleString();

  // const normalizedStatus: "Unread" | "Read" =
  //   status === "Unread" ? "Unread" : "Read";

  return (
    <div className="flex flex-row justify-between items-center border border-light-grey rounded-[25px] bg-[#EDF4F5] w-[90%] pt-[20px] pb-[20px] px-8">
      <div className="flex flex-col justify-center text-left">
        <h3 className="relative text-primary text-lg font-bold">
          {title}
        </h3>
        <div className="text-sm text-primary italic">
          {subtitle}
        </div>
      </div>
      <div className="font-bold tracking-[1px] text-xl text-right text-primary">
        {/* <span className={normalizedStatus === "Unread" ? "text-red-500" : "text-[#0F951F]"}> */}
          {status}
        {/* </span> */}
      </div>
    </div>
  );
};

export default SpecialCard;