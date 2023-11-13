import { useAuth } from '@/Components/Contexts/AuthContext';
import React, { useEffect, useState } from 'react';

import Sidebar from '@/Components/Layouts/Sidebar';
import TransparentSearchBar from '@/Components/Modals/TransparentSearchBar';
import Banner from '@/Components/Layouts/Banner';
import Skeleton from '@mui/joy/Skeleton';
import Stack from '@mui/joy/Stack';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';

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

            {user === null ? (
                <div>
                    Loading
                </div>
            ):(


            <div>
                <div id="surface-layer" className="absolute z-50 w-full">
                        
                        <TransparentSearchBar isOpen={isOpen} onClose={closeSearch} />

                            {children.surface}
                        
                        {verification ? (
                            <Card variant="outlined" sx={{ height: '100vh', width: '4.5rem' , borderRadius: 0, '--Card-radius': 0  }}>
                                <div className='flex flex-col gap-4 justify-between h-full'>
                                    <Skeleton variant="rectangular" width={40} height={40} /> 
                                    <div className='flex flex-col gap-8'>
                                        <Skeleton variant="rectangular" width={40} height={40} /> 
                                        <Skeleton variant="rectangular" width={40} height={40} /> 
                                        <Skeleton variant="rectangular" width={40} height={40} /> 
                                    </div>
                                    <Skeleton variant="circular" width={40} height={40} /> 
                                </div>
                            </Card>
                        ):(
                            <Sidebar toggleSearch={toggleSearch} isOpen={isOpen} closeSearch={closeSearch} />
                        )}
                    </div>

                        <main className="flex flex-col w-full h-screen overflow-hidden">
                                
                        {verification ? (
                            <div className='w-full'>
                            <Card variant="outlined" sx={{ height: 220, borderRadius: 0, '--Card-radius': 0  }}>
                                <div className='absolute w-full'>
                                    <div className='flex flex-row gap-8 justify-between pl-20 pr-10'>
                                        <Stack spacing={4} useFlexGap>
                                            <AspectRatio ratio="50/4" sx={{ width: 500 }}>
                                                <Skeleton variant="overlay" />
                                            </AspectRatio>                    
                                            <div className='flex flex-row gap-8'>
                                                <Skeleton variant="circular" width={180} height={180} />
                                                <CardContent sx={{ gap: 0.5, mt: 3 }}>
                                                    <Skeleton level="body-xs" variant="text" width="92%" />
                                                    <Skeleton level="body-xs" variant="text" width="99%" />
                                                    <Skeleton level="body-xs" variant="text" width="96%" />
                                                </CardContent>
                                            </div>
                                        </Stack>
                                        <div className='flex flex-col gap-8'>
                                            <div className='flex flex-row gap-8 justify-end'>
                                                <Skeleton variant="rectangular" sx={{ my: 'auto', width:180, height: 20 }} />
                                                <Skeleton variant="rectangular" sx={{ width:200, height: 40, borderRadius: '100px'}} />
                                            </div>
                                            <div className='flex flex-row gap-20 mt-[5.5rem] mr-[10rem] justify-start'>
                                                <Skeleton variant="rectangular" width={60} height={60} />      
                                                <Skeleton variant="rectangular" width={60} height={60} />      
                                                <Skeleton variant="rectangular" width={60} height={60} />      
                                                <Skeleton variant="rectangular" width={60} height={60} />      
                                                <Skeleton variant="rectangular" width={60} height={60} />      
                                            </div>         
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            </div>
                        ):(
                            <Banner auth={user} project={project} {...bannerProps} />
                        )}
                        
                            <div className="portal-body w-full h-full pt-6 pb-8 pl-[14rem] pr-[8.5rem]">
                                {children.portalBody}
                            </div>

                        </main>
                </div>
                    
            )}

            

            
           
        </div>

    );
}
