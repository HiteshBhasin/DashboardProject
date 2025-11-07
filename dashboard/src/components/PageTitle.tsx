import React from 'react';

interface PageTitleProps {
  pageTitle: string;  // the type of your prop
}

const PageTitle: React.FC<PageTitleProps> = ({ pageTitle }) => {
  return (
    <div className='text-black flex flex-col flex-shrink-0'>
      <span className='text-xl font-bold text-primary pl-1 pb-3'>
        {pageTitle}
      </span>
    </div>
  );
};

export default PageTitle;
