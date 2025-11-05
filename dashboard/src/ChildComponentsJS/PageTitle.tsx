import React from 'react';

interface PageTitleProps {
  pageTitle: string;  // the type of your prop
}

const PageTitle: React.FC<PageTitleProps> = ({ pageTitle }) => {
  return (
    <div className="flex items-center justify-start pt-6 pb-1">
      <div className="text-[38px] font-bold leading-[30px] tracking-[-.80px] font-sans text-[#0D525C]">
        {pageTitle}
      </div>
    </div>
  );
};

export default PageTitle;
