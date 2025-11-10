'use client';
import {RiSearchAiLine, RiAccountCircle2Fill, RiSettings5Fill, 
    RiLoginBoxFill} from '@remixicon/react';
import UserInfo from '../components/UserProfile';

//Input only
interface MenuItem {
    name: string;
    href: string;
    icon: React.ElementType;
}

interface User {
    name: string;
    title: string;
    avatar: string;
}

const bottomButtons : MenuItem[] = [
    {name: 'View Profile', href: '/profile', icon: RiAccountCircle2Fill},
    {name: 'Settings', href: '/settings', icon: RiSettings5Fill},
    {name: 'Log-out', href: '/logout', icon: RiLoginBoxFill}
];

const user : User = {
    name: 'Cam Finnson',
    title: 'President/CEO',
    avatar: 'https://placehold.co/300x300/FFF/0D525C?font=poppins&text=CF'
}

const SearchBar = () => (
    <div className='flex flex-col relative w-full max-w-md rounded-full flex-1'>
        <RiSearchAiLine size={20} className='absolute left-3 top-2 transform text-primary' />
        <input 
            type='text'
            placeholder='Search'
            className='w-190 pl-10 pr-4 py-2 text-sm rounded-full focus:outline-none focus:border-primary 
                transition duration-150 bg-white text-black'
        />
    </div>
);

function Header(){
    return(
        <header className="
            flex justify-between items-center w-full p-5 bg-primary relative top-0 z-10 max-h-20
        ">
           <SearchBar />
           <UserInfo user={user} menuItems={bottomButtons}/>
        </header>

    );
}

export default Header;