import React, { useState, useEffect } from 'react';
import Sidebar from '@/Components/Layouts/Sidebar';
import TransparentSearchBar from '@/Components/Modals/TransparentSearchBar';
import Banner from '@/Components/Layouts/Banner';

export default function Authenticated({ user, bannerProps, children, project }) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSearch = () => {
      setIsOpen(!isOpen);
    };

    const closeSearch = () => {
        setIsOpen(false);
    };

    return (
        <div className="min-h-screen tertiary-color relative">
            
            <div id="surface-layer" className="absolute z-50 w-full">
                
                <TransparentSearchBar isOpen={isOpen} onClose={closeSearch} />
                    {children.surface}
                <Sidebar toggleSearch={toggleSearch} isOpen={isOpen} closeSearch={closeSearch} />

            </div>

            <main className="flex flex-col w-full h-screen overflow-hidden">
                
                <Banner project={project} {...bannerProps}/>

                <div className="portal-body w-full h-full py-8 pl-[14rem] pr-[8.5rem]">
                        {children.portalBody}
                </div>

            </main>
        </div>
    );
}
