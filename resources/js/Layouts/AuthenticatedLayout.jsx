import { useAuth } from '@/Components/Contexts/AuthContext';
import React, { useEffect, useState } from 'react';

import Sidebar from '@/Layouts/Partials/Sidebar';
import TransparentSearchBar from '@/Components/Modals/TransparentSearchBar';
import Banner from '@/Layouts/Partials/Banner';
import Loading from '@/Components/Layouts/Loading';

export default function AuthenticatedLayout({ bannerProps, children, project, verification }) {
  const { user, fetchUserData } = useAuth();

  useEffect(() => {
    // Fetch user data on component mount
    fetchUserData();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  const closeSearch = () => {
    setIsOpen(false);
  };
 

    return (

        <div className="min-h-screen tertiary-color relative">

            {user === null || verification ? (
                <Loading />
            ):(

            <div>
                <div id="surface-layer" className="absolute z-50 w-full">
                        
                        <TransparentSearchBar isOpen={isOpen} onClose={closeSearch} />

                            {children.surface}

                        <Sidebar toggleSearch={toggleSearch} isOpen={isOpen} closeSearch={closeSearch} />
                </div>

                        <main className="flex flex-col w-full h-screen overflow-hidden">
                                
                            <Banner auth={user} project={project} {...bannerProps} />

                            <div className="portal-body w-full h-full pt-6 pb-8 pl-[12.5rem] pr-[7rem]">
                                {children.portalBody}
                            </div>

                        </main>
                </div>
                    
            )} 
           
        </div>

    );
}
