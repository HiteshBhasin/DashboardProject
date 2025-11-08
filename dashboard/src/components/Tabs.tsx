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
    <div className="flex flex-wrap gap-7 ml-1 whitespace-nowrap
    border-b-1 border-light-grey mb-4 text-base text-sm w-full">
      {tabs.map((label, index) => (
        <div
          key={index}
          onClick={() => onTabClick(index)}
          className={`flex items-center transition-colors cursor-pointer text-base ${
            activeTab === index
              ? 'text-secondary font-bold border-b-3 border-secondary'
              : 'hover:text-light-gray font-medium text-light-grey'
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
