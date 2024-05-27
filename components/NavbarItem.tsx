import React from 'react';
import { useRouter } from 'next/router';

interface NavbarItemProps {
    label: string;
    path: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, path }) => {
    const router = useRouter();

    const navigate = () => {
        router.push(path);
    };

    return (
        <div onClick={navigate} className='text-white cursor-pointer hover:text-gray-300 transition text-xl'>
            {label}
        </div>
    );
}

export default NavbarItem;
