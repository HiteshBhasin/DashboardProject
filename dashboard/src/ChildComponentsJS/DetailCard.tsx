import React, { ReactNode } from "react";

interface RegularCardProps {
  title: string;
  labels: string[];
  data: Record<string, any>;
  width?: string;
  height?: string;
  labelsPerColumn?: number;
  gapBetweenLabelValue?: string;
  children?: ReactNode;
}

const RegularCard: React.FC<RegularCardProps> = ({
  title,
  labels = [],
  data = {},
  width,
  height,
  labelsPerColumn = labels.length,
  gapBetweenLabelValue,
  children,
}) => {
  // Split labels into columns
  const splitIntoColumns = (array: string[], itemsPerColumn: number) => {
    const columns: string[][] = [];
    for (let i = 0; i < array.length; i += itemsPerColumn) {
      columns.push(array.slice(i, i + itemsPerColumn));
    }
    return columns;
  };

  const columnsData = splitIntoColumns(labels, labelsPerColumn);

  return (
    <div
      className="flex flex-col border border-gray-300 rounded-3xl bg-white  mb-5"
      style={{ height, width }}
    >
      {/* Title */}
      <h3 className="text-[#0D525C] text-3xl font-bold font-sans px-8 pt-8 pb-2 border-b border-[#0D525C6B] mx-4">
        {title}
      </h3>

      {/* Labels & Values */}
      <div className="flex gap-12 overflow-x-auto pt-8 pl-6 flex-grow pl-12">
        {columnsData.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4 min-w-[750px]">
            {col.map((label, index) => {
              const value = data[label] ?? data[label.toLowerCase()];
              return (
                <div key={index} className={`flex ${gapBetweenLabelValue} pb-4 pt-1`}>
                  <dt className="font-semibold text-[19px] leading-6 text-[#7DA1A7] whitespace-nowrap w-32">
                    {label}:
                  </dt>
                  <dd className="text-[#0993A6] text-[19px] leading-6 truncate flex-1">
                    {value || <span className="text-gray-400">Enter {label}</span>}
                  </dd>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Optional children */}
      {children && (
        <div className="flex flex-wrap justify-start gap-6 mt-6 px-6 pb-6">
          {children}
        </div>
      )}
    </div>
  );
};

export default RegularCard;
