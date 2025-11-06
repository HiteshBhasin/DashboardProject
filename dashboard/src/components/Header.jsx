'use client';
import {RiSearchAiLine, RiAccountCircleFill, RiNotification3Fill} from '@remixicon/react';

const UserInfo = ({user}) => (
    <div className='flex items-center'>
        {/*Profile Picture*/}
        <div className='w-10 h-10 flex items-center justify-center overflow-hidden mr-3'>
            <RiAccountCircleFill size={40} className='text-white' />
        </div>

        {/*Name and Position*/}
        <div className='flex flex-col'>
            <span className='text-m font-bold text-white whitespace-nowrap'>
                {user.name}
            </span>
            <span className='text-sm font-italic text-white whitespace-nowrap'>
                {user.position}
            </span>
        </div>

    </div>
);

const SearchBar = () => (
    <div className='flex flex-col relative w-full max-w-md rounded-full flex-1'>
        <RiSearchAiLine size={20} className='absolute left-3 top-2 transform text-primary' />
        <input 
            type='text'
            placeholder='Search'
            className='w-175 pl-10 pr-4 py-2 text-sm rounded-full focus:outline-none focus:border-primary 
                transition duration-150 bg-white text-primary'
        />
    </div>
);

const Notification = () => (
    <div className='w-10 h-10 flex items-center justify-center overflow-hidden ml-100'>
        <RiNotification3Fill size={30} className='text-white' />
    </div>
);

function Header(){
    //For display purpose only
    const mockUser = {
        name: 'Cam Finnson',
        position: 'President/CEO',
    }
    return(
        <header className="
            flex justify-between items-center w-full p-5 bg-primary relative top-0 z-10 max-h-20
        ">
           <SearchBar />
           <Notification />
           <UserInfo user={mockUser} />
        </header>

    );
}

export default Header;