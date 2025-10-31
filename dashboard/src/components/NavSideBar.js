'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    SquareChartGantt, House, BrushCleaning, BookUser, WineOff, UserRound, BanknoteArrowDown,
    ClipboardList, CircleDollarSign, DollarSign, Presentation, ChartLine, TriangleAlert,
    Settings, LogOut
    } from 'lucide-react';

const navLinks = [
    {type: 'link', name: 'Overview', href: '/', icon: SquareChartGantt},
    {
        type: 'section', 
        title: 'Furnished Management',
        items: [
            {name: 'Property Status', href: '/furnished/property', icon: House},
            {name: 'Guest Booking', href: '/furnished/booking', icon: BookUser},
            {name: 'Housekeeping', href: '/furnished/housekeeping', icon: BrushCleaning},
            {name: 'Incident & Claim', href: '/furnished/incident', icon: WineOff}
        ]
    },
    {
        type: 'section', 
        title: 'Long-term Management',
        items: [
            {name: 'Tenants', href: '/longterm/tenants', icon: UserRound},
            {name: 'Housekeeping', href: '/longterm/housekeeping', icon: BrushCleaning},
            {name: 'Montly Payout', href: '/longterm/monthlypayout', icon: BanknoteArrowDown},
            {name: 'Leases', href: '/longterm/leases', icon: ClipboardList}
        ]
    },
    {
        type: 'section', 
        title: 'Operations',
        items: [
            {name: 'Core Financials', href: '/operation/corefinance', icon: CircleDollarSign},
            {name: 'Managed Financials', href: '/operation/managefinance', icon: DollarSign},
            {name: 'Marketing', href: '/operation/marketing', icon: Presentation},
            {name: 'Analytics', href: '/operation/analytics', icon: ChartLine},
            {name: 'Alert', href: '/operation/alert', icon: TriangleAlert},
        ]
    }
];

const bottomButtons = [
    {name: 'Settings', href: '/settings', icon: Settings},
    {name: 'Log-out', href: '/log-in', icon: LogOut}
];

function NavSideBar() {
    const pathname = usePathname(); //Get the current path of the page.

    const NavLinkItem = ({link}) => {
        const Icon = link.icon; //Set a simplified nickname for each icons of the page.
        const isActive = pathname === link.href; //check if the user is in the current page.

        return(
            <Link 
                href={link.href}
                className={`
                flex items-center p-1 rounded-lg transition-colors
                ${isActive 
                    ? 'bg-secondary text-white font-bold' 
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
            <div className="flex h-full">
                <nav className="w-64 bg-primary text-white flex flex-col p-4 flex-shrink-0">
                    {/* Logo */}
                    <div className='text-5xl font-extrabold pb-6 text-secondary text-center' >
                        FGC
                    </div>

                    {/* Main Navigation */}
                    <div className='flex-grow overflow-y-auto space-y-6'>
                        {navLinks.map((item, index) => (
                            <div key={index}>
                                {item.type === 'link' && (
                                    //Place the Overview
                                    <NavLinkItem link={item} />
                                )}

                                {item.type === 'section' && (
                                    //Place the section and buttons
                                    <>
                                        <h3 className='text-sm font-bold uppercase mt-2 mb-1 px-2 text-light-grey'>
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
                    <div className="mt-auto pt-3 pt-20 space-y-1">
                        {bottomButtons.map((link, index) => (
                            <NavLinkItem key={index} link={link} />
                        ))}
                    </div>
                </nav>
            </div>

        );
}

export default NavSideBar;