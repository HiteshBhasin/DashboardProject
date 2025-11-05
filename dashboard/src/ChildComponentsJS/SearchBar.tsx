"use client";

import React, { useState, ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  placeholderDescription?: string;
  onChange?: (value: string) => void; // function receiving the search string
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholderDescription, onChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="relative flex items-center justify-start mb-[30px] pt-[35px]">
      
      <FaSearch 
      // className="absolute left-[20px] text-[#0D525C] pointer-events-none text-[25px]" 
      className="absolute left-5 md:left-[20px] text-[#0D525C] text-lg md:text-[25px] pointer-events-none" 

      />

      {/* Input */}
      <input
        type="search"
        placeholder={placeholderDescription}
        value={value}
        onChange={handleChange}
        // className="w-[650px] h-[50px] pl-[55px] pr-[12px] py-[8px] text-[20px] font-semibold border border-[#D5D5D5] rounded-[15px] box-border focus:outline-none focus:ring-2 focus:ring-[#0D525C] bg-white"
      className="
    w-full max-w-[650px] h-12     
    px-14 pr-3 py-2              
    text-lg font-bold         
    border border-gray-300 rounded-xl 
    box-border
    focus:outline-none focus:ring-2 focus:ring-[#0D525C]
    bg-white"
      />
    </div>
  );
};

export default SearchBar;
