import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShapes } from '@fortawesome/free-solid-svg-icons';
import { useDrawer } from '@/Components/Contexts/DrawerContext';

export default function ActionDrawer({
    
    children

}) {
    const [fadeIn, setFadeIn] = useState(false);
    const [fadeInDelay, setFadeInDelay] = useState(false);
    const { expandDrawer, drawerWidth } = useDrawer();


    const [isOpen, setIsOpen] = useState(false);
    const [showWarning, setShowWarning] = useState(true);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            expandDrawer('normal');
        }

    };

    const drawerStyles = {
        normal: 'w-[25%]', // Example Tailwind class for normal width
        wide: 'w-[96%]', // Example Tailwind class for wider drawer
    };

      
    return (
        <>
            <div className={`drawer-overlay ${isOpen ? 'drawer-overlay-open' : ''}`} onClick={toggleDrawer}></div>

            <div className={`fixed top-0 shadow-md right-0 h-full ${isOpen ? 'translate-x-0' : 'translate-x-full'} transform transition-all duration-[500ms] ease-in-out z-50 ${drawerStyles[drawerWidth]}`}>
                <div className={`fade-in-delay ${fadeInDelay ? 'opacity-1' : 'opacity-0'} ${isOpen ? 'bg-white text-red-500' : 'bg-red-500 text-white border-2 border-white'} duration-500 absolute shadow-[-2px_0px_3px_rgba(0,0,0,0.07)] left-[-40px] top-[50%] -translate-y-[50%] w-10 h-10 flex rounded-tl-lg rounded-bl-lg py-10 justify-center items-center cursor-pointer`} onClick={toggleDrawer}>
                    {/* {showWarning && (
                        <div className="absolute -left-3 -top-3 text-red-500">
                            <FontAwesomeIcon className='text-2xl' icon={faCircleExclamation} />
                        </div>
                    )} */}
                    <FontAwesomeIcon className='text-md' icon={faShapes} />
                </div>
                <div className={`bg-slate-100 p-8 h-full overflow-auto`}>
                    {children}
                </div>
            </div>

        </>
    );
}
