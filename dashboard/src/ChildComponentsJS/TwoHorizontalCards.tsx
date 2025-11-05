"use client";

import React, { ReactNode } from "react";

interface TwoHorizontalCardsProps {
  title: string;
  des?: string;
  width?: string | number;
  height?: string | number;
  children?: ReactNode;
}

const TwoHorizontalCards: React.FC<TwoHorizontalCardsProps> = ({
  title,
  des,
  width,
  height,
  children,
}) => {
  return (
    <div
      className="flex flex-col border border-gray-300 rounded-3xl bg-white mb-5 shadow-sm hover:shadow-md transition-shadow duration-300"
      style={{ height, width }}
    >
      {/* Title */}
      <h3 className="text-[#0D525C] text-2xl font-bold font-sans px-8 pt-6 pb-3 border-b border-[#0D525C40] leading-tight">
        {title}
      </h3>

      {/* Description or Main Content */}
      <div className="flex flex-col justify-start pt-6 px-8 flex-grow overflow-y-auto">
        <p className="text-gray-700 text-base leading-relaxed">
          {des || "No description available."}
        </p>
      </div>

      {/* Optional Children (e.g., Buttons) */}
      {children && <div className="mt-6 px-8 pb-8 flex flex-wrap gap-4">{children}</div>}
    </div>
  );
};

export default TwoHorizontalCards;
