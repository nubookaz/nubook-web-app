import React, { useState, useEffect } from 'react';
import Sidebar from '@/Components/Layouts/Sidebar';
import TransparentSearchBar from '@/Components/Modals/TransparentSearchBar';

export default function Authenticated({ user, showBanner, showPortalBody, children }) {

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

            <main className="grow z-40 absolute w-full h-full">
                {showBanner && (
                    <div id="banner" className="z-30 absolute">{children.banner}</div>
                )}

                {showPortalBody && (
                    <div className="absolute w-full h-full z-20 pt-[8rem] pb-8 pl-[7rem] pr-[2.5rem]">
                        {children.portalBody}
                    </div>
                )}

            </main>
        </div>
    );
}
