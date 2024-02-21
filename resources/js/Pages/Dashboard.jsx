import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useState, useEffect } from 'react';

import ImageContainer from '@/Components/Containers/ImageContainer';




import { usePage } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import CardContainer from '@/Components/Containers/CardContainer';
import Modal from '@/Components/Modals/Modal';
import VerificationProcess from '@/Pages/Auth/Verification/VerificationProcess';
import Overview from '@/Components/Projects/Overview';
import Budget from '@/Components/Projects/Budget';




import PortalLayout from '@/Layouts/Partials/PortalLayout';




export default function Dashboard() {
  const { user } = useAuth();

    // Function to get the time of day greeting
  const getTimeOfDayGreeting = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 0 && currentHour < 12) {
      return 'Good Morning';
      } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good Afternoon';
      } else {
      return 'Good Evening';
      }
  };
 
   // Get the time of day greeting
  const timeOfDayGreeting = getTimeOfDayGreeting();
  const greeting = `${timeOfDayGreeting} ${user?.first_name} ${user?.last_name}!`;

  console.log(user);

   return (

      <PortalLayout 
          breadcrumbs={[
            { label: greeting, url: '', className: '!text-3xl' },
          ]}
      >

            {{
                body:(
                  <>
                    <ImageContainer
                      backgroundImage='/images/background_images/bg_image_6.jpg'
                      className='h-[15rem]'
                    >
                    </ImageContainer>
   
                  </>
                ),
            }}
                {/* <div className='flex flex-row h-full w-full justify-between gap-4'>
                    <CardContainer header="Project Overview" className='w-full'>
                      <Overview
                        projects={projects}
                        isPortrait={true}
                        onClick={openProjectFormPanel}
                        multiCircularProgressSize="w-[220px] h-[220px]"
                      />
                    </CardContainer>
                    <CardContainer header="Budget Overview" className='w-full h-full'>
                        <Budget
                          projects={projects}
                        />
                      </CardContainer> */}
                    {/* <div className='flex flex-col gap-4 h-full w-full'>

                      <div className='flex flex-row gap-4 h-1/2'>
                         <ImageContainer     
                          overlay={true}      
                          className="promo-ad w-full"     
                          overlayOpacity='50'                       
                          backgroundImage="./images/cartoon_images/female_professional_filmmaker.png"
                        >
                          <h2 className='text-white text-[2rem]'>Hollywood Filmmaker</h2>
                        </ImageContainer>
                      </div>
                    </div> */}
                {/* </div>  */}

                {/* <CardContainer header='Projects' className=''>
                      <Overview
                        projects={projects}
                        isPortrait={true}
                        onClick={openProjectFormPanel}
                        multiCircularProgressSize="w-[220px] h-[220px]"
                      />
                </CardContainer> */}

      </PortalLayout>
   
  );
}
