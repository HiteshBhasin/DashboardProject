import React from 'react';

interface PageTitleCom {
  pageTitle: string;  
}

const PageTitleCom: React.FC<PageTitleCom> = ({ pageTitle }) => {
  return (
    <div className="flex items-center justify-start pt-1 pb-1">
      <div className="text-[18px] pl-2 pb-2 font-bold text-primary">
        {pageTitle}
      </div>
    </div>
  );
};

export default PageTitleCom;
