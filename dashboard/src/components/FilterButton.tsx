import React from 'react';

import { SlidersHorizontal } from 'lucide-react';

function FilterButton() {
  return (
    <p
      className="
        bg-white
        border border-[#D5D5D5]
        text-[#0D525C]
        px-2 py-2
        text-center
        rounded-[9px]
        flex items-center justify-center
        cursor-pointer
        w-fit
        gap-2
        font-sans
      "
    >
      <SlidersHorizontal width={16} height={16} fill="#0D525C" />
      Filter
    </p>
  );
}

export default FilterButton;