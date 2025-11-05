"use client";

import React from "react";

interface TabsProps {
  tabs?: string[];
  activeTab?: number;
  onTabClick?: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({
  tabs = [],
  activeTab = 0,
  onTabClick = () => {},
}) => {
  return (
    <div className="flex items-center justify-start pt-12 gap-16 border-b-2 border-[#6B888D] w-full max-w-[95%] pb-1">
      {tabs.map((label, index) => (
        <span
          key={index}
          onClick={() => onTabClick(index)}
          className={`text-2xl font-semibold leading-7 font-sans cursor-pointer pl-1.5 pb-2 ${
            activeTab === index
              ? "text-[#E97919] border-b-4 border-[#E97919]"
              : "text-[#6B888D]"
          }`}
        >
          {label}
        </span>
      ))}
    </div>
  );
};

export default Tabs;
