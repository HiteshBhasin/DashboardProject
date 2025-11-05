import React, { ReactNode } from "react";

interface ButtonProps {
  buttonName: string;
  variant?: "regular" | "long"; // only allow these two options
  icon?: ReactNode;             // can be an SVG, icon component, or any React element
}

const Button: React.FC<ButtonProps> = ({ buttonName, variant = "regular", icon }) => {
  // Base Tailwind classes for text, font, border, flex alignment
  const baseClasses =
    "text-white rounded-3xl font-semibold text-xl leading-6 tracking-wide font-sans flex items-center justify-center cursor-pointer border-0 transition-colors duration-200 ease-in-out";

  // Size and background based on variant
  const sizeClasses =
    variant === "regular"
      ? "w-36 h-11 bg-[#0D525C] hover:bg-[#0B444F] focus:ring-2 focus:ring-[#0D525C]"
      : "w-72 h-14 bg-[#0D525C] hover:bg-[#0B444F] focus:ring-2 focus:ring-[#0D525C]";

  return (
    <button className={`${baseClasses} ${sizeClasses}`}>
      {icon && <span className="mr-2">{icon}</span>}
      {buttonName}
    </button>
  );
};

export default Button;
