'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function SectionMenu({sectionName, navLinks}){
    const pathname = usePathname();

    const SectionItem = ({link}) => {
        const isActive = pathname === link.href;

        return(
            <Link 
                href={link.href}
                className={`flex items-center transition-colors 
                    ${isActive
                        ? 'text-secondary font-bold underline decoration-3'
                        : 'hover:text-light-gray font-medium text-light-grey'
                    }
                `}
            >
                <span className='ml-1 whitespace-nowrap text-base text-sm w-full'>
                    {link.name}
                </span>
            </Link>
        );
    };

    return(
            <div className='flex w-full border-b-1 border-light-grey mb-2'>
                <div className='text-black flex flex-col flex-shrink-0'>
                    <span className='text-xl font-bold text-primary pl-1 pb-4'>
                        {sectionName}
                    </span>

                    <div className='flex flex-wrap gap-5'>
                        {navLinks.map((item, index) => (
                            <div key={index}>
                                <SectionItem link={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
}

export default SectionMenu;