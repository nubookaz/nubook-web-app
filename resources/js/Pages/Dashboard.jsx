import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import CardContainer from '@/Components/Containers/CardContainer';
import ImageContainer from '@/Components/Containers/ImageContainer';
import Modal from '@/Components/Modals/Modal';
import VerificationProcess from '@/Pages/Auth/Verification/VerificationProcess';
import Overview from '@/Components/Projects/Overview';
import Budget from '@/Components/Projects/Budget';








export default function Dashboard() {
  const { user, fetchUserData } = useAuth();

  useEffect(() => {
    // Fetch user data on component mount
    fetchUserData();
  }, []);
 





  

  const projects = user && user.projects || []; // Use an empty array as a fallback if 'projects' prop is undefined
 
  const [isProjectFormPanel, setProjectFormPanel] = useState(false);

  const openProjectFormPanel = () => {
    setProjectFormPanel(!isProjectFormPanel);
  };
 

 
  const bannerProps = {
    showGreeting: true, // Customize these props based on your conditions
    showProfilePhoto: true,
    size: 'banner-photo',
    // Add any other props you need for this specific page's banner
  };


  return (

      <AuthenticatedLayout bannerProps={bannerProps} >
          {{
 

            portalBody: (
              <div className="h-full w-full">

                    <div className='flex flex-row h-full w-full justify-between gap-6'>
                        <CardContainer header="Project Overview" className='!w-[50rem]'>
                          <Overview
                            projects={projects}
                            isPortrait={true}
                            onClick={openProjectFormPanel}
                            multiCircularProgressSize="w-[220px] h-[220px]"
                          />
                        </CardContainer>
                        <CardContainer header="Social Activities" className='!w-[50rem] disabled-feature'></CardContainer>
                        <div className='flex flex-col gap-6 h-full w-full'>
                          <CardContainer header="Budget Overview" className='h-1/2'>
                            <Budget
                              projects={projects}
                            />
                          </CardContainer>
                          <div className='flex flex-row gap-6 h-1/2'>
                            <CardContainer header="Job Overview" className="disabled-feature w-full"></CardContainer>
                            <ImageContainer     
                              overlay={true}      
                              className="promo-ad w-full"     
                              overlayOpacity='50'                       
                              backgroundImage="./images/cartoon_images/female_professional_filmmaker.png"
                            >
                              <h2 className='text-white text-[2rem]'>Hollywood Filmmaker</h2>
                            </ImageContainer>
                          </div>
                        </div>
                    </div> 

    
              </div>
            ),
          }}
      </AuthenticatedLayout>
   
  );
}
