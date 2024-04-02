import { useAuth } from '@/Components/Contexts/AuthContext';
import { useProject } from '@/Components/Contexts/ProjectContext';

import React, { useState, useEffect } from 'react';

import ImageContainer from '@/Components/Containers/ImageContainer';
import CardContainer from '@/Components/Containers/CardContainer';

import PortalLayout from '@/Layouts/Partials/PortalLayout';




export default function Dashboard() {
  const { userData } = useAuth();
  const { projects } = useProject();

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
 
  const timeOfDayGreeting = getTimeOfDayGreeting();
  const userFirstName = userData?.first_name;
  const userLastName = userData?.last_name;
  const isValidName = (name) => name && name !== "Placeholder" && name !== "Name";
  
  const greeting = `${timeOfDayGreeting} ${
    isValidName(userFirstName) && isValidName(userLastName)
      ? `${userFirstName} ${userLastName}`
      : ""
  }!`;
  
 
  return (

      <PortalLayout 
          breadcrumbs={[
            { label: greeting, url: '', className: '!text-3xl' },
          ]}
      >

            {{
                body:(
 
                    <div className='flex flex-col gap-4 h-full'>
                      <ImageContainer
                        backgroundImage='/images/background_images/bg_image_6.jpg'
                        className='h-[20rem] shadow-lg'
                      >
                      </ImageContainer>

                      <div className='flex flex-row gap-4 h-full'>
                        
                        <CardContainer header="Project Overview" className='w-full'>
                            <div className="flex flex-col">
                              
                            </div>
                        </CardContainer>


                        <CardContainer header="Budget Overview" className='w-full h-full'>

                        </CardContainer>
                      </div>
                    </div>
                  
                 ),
            }}
  
      </PortalLayout>
   
  );
}
