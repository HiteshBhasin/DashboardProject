'use client';
import React, { useState, useRef, useEffect, FC } from 'react';
import {RiArrowUpSLine} from '@remixicon/react';

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

interface DropdownProps {
    user: User;
    menuItems: MenuItem[];
}

const UserInfoDropdown : FC<DropdownProps> = ({user, menuItems}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clickOutside = (event: MouseEvent | globalThis.MouseEvent) => {
            //checks if the dropdown is open and user clicks outside, making it close
            if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", clickOutside);
        return () => {
            document.removeEventListener("mousedown", clickOutside); //clean up
        }
    }, []);

    const handleAction = (href: string) => {
        // <------- Add a function for the pages inside the user dropdown
        setIsOpen(false);
    }

    return(
        <div className='relative p-4 border-t border-light-grey' ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='flex item-center w-full p-2 text-left transition duration-150 
                ease-in-out hover-all:bg-light-grey rounded-xl'
            >
                <div className='flex flex-row flex-1 items-center cursor-pointer'>
                    <img 
                        className='w-10 h-10 rounded-full object-cover mr-2'
                        src={user.avatar}
                        alt={user.name}
                    />

                    <div className='flex flex-col mr-2'>
                        <span className='text-m font-bold text-white whitespace-nowrap'>
                            {user.name}
                        </span>
                        <span className='text-sm font-italic text-white whitespace-nowrap'>
                            {user.title}
                        </span>
                    </div>

                    <RiArrowUpSLine
                        className={`w-7 h-7 text-white transition-transform duration-200
                        ${isOpen ? 'transform rotate-180' : ''}`}
                    />
                </div>
            </button>

            {isOpen && (
                <div
                    className='absolute top-full left-0 mb-2 w-full bg-primary z-20 shadow-xl'
                    style={{transformOrigin: 'bottom'}}
                >
                    <div className='p-1 space-y-1'>
                        {menuItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.preventDefault();
                                    handleAction(item.href);
                                }}
                                className="flex items-center px-3 py-2 text-sm text-white rounded-lg 
                                hover-all:bg-light-grey transition duration-150 ease-in-out  "
                            >
                                <item.icon className="w-5 h-5 mr-3 text-white" />
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserInfoDropdown;