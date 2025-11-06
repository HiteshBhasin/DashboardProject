'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    RiDashboardFill, RiHome2Fill, RiBrush3Fill, RiContactsBook2Fill, RiGobletBrokenFill, RiUserFill, RiHandCoinFill,
    RiClipboardFill, RiMoneyDollarCircleFill, RiMoneyDollarBoxFill, RiAdvertisementFill, RiLineChartFill, RiAlertFill,
    RiSettings3Fill, RiLogoutBoxFill
    } from '@remixicon/react';

const navLinks = [
    {type: 'link', name: 'Overview', href: '/', icon: RiDashboardFill},
    {
        type: 'section', 
        title: 'Furnished Management',
        items: [
            {name: 'Property Status', href: '/furnished/property', icon: RiHome2Fill},
            {name: 'Guest Booking', href: '/furnished/booking', icon: RiContactsBook2Fill},
            {name: 'Housekeeping', href: '/furnished/housekeeping', icon: RiBrush3Fill},
            {name: 'Incident & Claim', href: '/furnished/incident', icon: RiGobletBrokenFill}
        ]
    },
    {
        type: 'section', 
        title: 'Long-term Management',
        items: [
            {name: 'Tenants', href: '/longterm/tenants', icon: RiUserFill},
            {name: 'Housekeeping', href: '/longterm/housekeeping', icon: RiBrush3Fill},
            {name: 'Montly Payout', href: '/longterm/monthlypayout', icon: RiHandCoinFill},
            {name: 'Leases', href: '/longterm/leases', icon: RiClipboardFill}
        ]
    },
    {
        type: 'section', 
        title: 'Operations',
        items: [
            {name: 'Core Financials', href: '/operation/corefinance', icon: RiMoneyDollarCircleFill},
            {name: 'Managed Financials', href: '/operation/managefinance', icon: RiMoneyDollarBoxFill},
            {name: 'Marketing', href: '/operation/marketing', icon: RiAdvertisementFill},
            {name: 'Analytics', href: '/operation/analytics', icon: RiLineChartFill},
            {name: 'Alert', href: '/operation/alert', icon: RiAlertFill},
        ]
    }
];

const bottomButtons = [
    {name: 'Settings', href: '/settings', icon: RiSettings3Fill},
    {name: 'Log-out', href: '/log-in', icon: RiLogoutBoxFill}
];

function NavSideBar() {
    const pathname = usePathname(); //Get the current path of the page

    const NavLinkItem = ({link}) => {
        const Icon = link.icon; //Set a simplified nickname for each icons of the page.
        const isActive = pathname === link.href; //check if the user is in the current page.

        return(
            <Link 
                href={link.href}
                className={`
                flex items-center p-1 rounded-lg transition-colors
                ${isActive 
                    ? 'bg-secondary text-white' 
                    : 'hover:bg-light-gray hover:text-white' 
                }
                `} 
            > {/*Setting the layout of the sidebar and check if the user is in the page*/}
                <Icon size={16} className="flex-shrink-0 mr-2 ml-1" /> {/*Prevent the icon from shrinking*/}
                <span className="ml-1 whitespace-nowrap text-base text-sm"> {/*Add margin-left and prevents making a new line */}
                    {link.name}
                </span>
            </Link>
        );
    };

        return(
            <div className="flex h-full z-20">
                <nav className="w-64 bg-primary text-white flex flex-col p-4 flex-shrink-0 sticky">
                    {/* Logo */}
                    <div className='text-5xl font-extrabold pb-6 text-secondary text-center' >
                        FGC
                    </div>

                    {/* Main Navigation */}
                    <div className='flex-grow overflow-y-auto space-y-6 pt-10'>
                        {navLinks.map((item, index) => (
                            <div key={index}>
                                {item.type === 'link' && (
                                    //Place the Overview
                                    <NavLinkItem link={item} />
                                )}

                                {item.type === 'section' && (
                                    //Place the section and buttons
                                    <>
                                        <h3 className='text-sm font-bold uppercase mt-2 mb-1 px-2 text-navgrey'>
                                            {item.title}
                                        </h3>
                                        <div className='space-y-1'> {/*this gets the items within the section*/}
                                            {item.items.map((subLink, subIndex) => (
                                                <div key={subIndex}>
                                                    <NavLinkItem link={subLink} />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    {/*Bottom Buttons*/}
                    <div className="mt-auto pt-3 pt-15 space-y-1">
                        {bottomButtons.map((link, index) => (
                            <NavLinkItem key={index} link={link} />
                        ))}
                    </div>
                </nav>
            </div>

        );
}

export default NavSideBar;