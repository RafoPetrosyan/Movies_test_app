import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import searchIcon from '@/app/assets/images/icons/ICON - Search.png';
import homeIcon from '@/app/assets/images/icons/Group 46.png';
import tvShowsIcon from '@/app/assets/images/icons/Group 56.png';
import moviesIcon from '@/app/assets/images/icons/Group 54.png';
import genresIcon from '@/app/assets/images/icons/Group 53.png';
import watchLaterIcon from '@/app/assets/images/icons/Group 47.png';
import userAvatar from '@/app/assets/images/userAvatar.png';

const menuItems = [
   { icon: <Image src={searchIcon} alt="Search" />, label: 'Search' },
   { icon: <Image src={homeIcon} alt="Home" />, label: 'Home' },
   { icon: <Image src={tvShowsIcon} alt="TV Shows" />, label: 'TV Shows' },
   { icon: <Image src={moviesIcon} alt="Movies" />, label: 'Movies' },
   { icon: <Image src={genresIcon} alt="Genres" />, label: 'Genres' },
   {
      icon: <Image src={watchLaterIcon} alt="Watch Later" />,
      label: 'Watch Later',
   },
];

const additionalItems = [{ label: 'Language' }, { label: 'Get Help' }, { label: 'Exit' }];

const Menu: React.FC = () => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <>
         <div
            className="fixed top-0 left-0 h-full p-4 z-20 menu-gradient-bg"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
         >
            <motion.div
               className="flex flex-col h-full"
               initial={{ width: '4rem', opacity: 0.8 }}
               animate={{
                  width: isOpen ? '16rem' : '4rem',
                  opacity: isOpen ? 1 : 0.8,
               }}
               transition={{ duration: 0.3 }}
            >
               <div className="mb-8">
                  <div className="flex items-center h-10 space-x-4">
                     {isOpen && (
                        <>
                           <Image
                              src={userAvatar}
                              alt="Profile"
                              className="w-10 h-10 rounded-full"
                           />
                           <span className="font-bold">Daniel</span>
                        </>
                     )}
                  </div>
               </div>
               <nav className="flex flex-col space-y-4">
                  {menuItems.map((item, index) => (
                     <MenuItem key={index} icon={item.icon} label={item.label} isOpen={isOpen} />
                  ))}
               </nav>
               <div className="mt-auto">
                  {additionalItems.map((item, index) => (
                     <MenuItem key={index} label={item.label} isOpen={isOpen} />
                  ))}
               </div>
            </motion.div>
         </div>
         {isOpen && <div className="gradient-bg top-0 left-32 bottom-0 right-0 absolute z-10" />}
      </>
   );
};

interface MenuItemProps {
   icon?: React.ReactNode;
   label: string;
   isOpen: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, isOpen }) => {
   return (
      <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-2 rounded-md transition-all">
         {icon && <span>{icon}</span>}
         {isOpen && <span>{label}</span>}
      </div>
   );
};

export default Menu;
