'use client';
import {Search, CircleUserRound, Sparkles} from 'lucide-react';

const UserInfo = ({user}) => (
    <div className='flex items-center'>
        {/*Profile Picture*/}
        <div className='w-10 h-10 rounded-full bg-light-grey flex items-center justify-center overflow-hidden  mr-3'>
            <img src={user.photo} className="w-full h-full object-cover"/>
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
    <div className='flex flex-col relative w-full max-w-md rounded-3x1'>
        <Search size={20} className='absolute left-3 top-2 transform text-primary' />
        <input 
            type='text'
            placeholder='Search'
            className='w-200 pl-10 pr-4 py-2 text-sm rounded-3x1 focus:outline-none focus:border-primary 
                transition duration-150 bg-white text-primary'
        />
        <Sparkles size={20} className='absolute left-192.5 top-2 transform text-primary' />
    </div>
);

function Header(){
    //For display purpose only
    const mockUser = {
        name: 'Cam Finnson',
        position: 'President/CEO',
        photo: <CircleUserRound size={10} className='text-primary'/>
    }
    return(
        <header className="
            flex justify-between items-center w-full p-5 bg-primary border-b border-light-grey relative top-0 z-10 max-h-20
        ">
           <SearchBar />
           <UserInfo user={mockUser} />
        </header>

    );
}

export default Header;