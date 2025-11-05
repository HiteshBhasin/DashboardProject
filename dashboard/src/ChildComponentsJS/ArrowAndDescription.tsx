"use client";

import React from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface ArrowAndDescriptionProps {
  description: string;
  onBack?: () => void;       // optional callback when a previous tab exists
  hasPreviousTab?: boolean;  // optional flag to indicate previous tab
}

const ArrowAndDescription: React.FC<ArrowAndDescriptionProps> = ({
  description,
  onBack,
  hasPreviousTab = false,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (hasPreviousTab && onBack) {
      onBack(); // go to previous tab
    } else {
      router.back(); // fallback to browser back
    }
  };

  return (
    <div className="flex items-center gap-5 pl-5">
      {/* Back arrow */}
      <div
        className="text-[#0D525C] cursor-pointer hover:opacity-80"
        onClick={handleBack}
      >
        <IoArrowBackSharp size={50} />
      </div>

      {/* Description */}
      {/* <div className="font-[750] text-[30px] leading-6 text-[#0D525C] w-[800px] font-sans"> */}
        <div className="font-bold text-[30px] leading-[36px] text-[#0D525C] max-w-[800px] w-full font-sans">

        {description}
      </div>
    </div>
  );
};

export default ArrowAndDescription;
