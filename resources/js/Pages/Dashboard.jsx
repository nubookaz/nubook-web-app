import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import CardContainer from '@/Components/Containers/CardContainer';
import ImageContainer from '@/Components/Containers/ImageContainer';

import Banner from '@/Components/Layouts/Banner';

import CardLayout from '@/Components/Layouts/CardLayout';

export default function Dashboard({ auth }) {
  


  return (
    <AuthenticatedLayout user={auth.user} showBanner={true} showPortalBody={true}>
      {{
        surface: (
          <div className="relative w-full h-full">

          </div>
        ),
        banner: (
          <Banner size="medium" showLeftContent={true} showProfilePhoto={true} />
        ),
        portalBody: (
          <div className="portal-body pt-[12rem] h-full w-full">

            <CardLayout colSpans={[1, 1, 2, 0]} withRows={[false, false, true, false]}>
              {{
                column1: (
                  <div>
                    <CardContainer header="Project Overview"></CardContainer>
                    
                  </div>
                ),
                column2: (
                  <div>
                    <CardContainer header="Social Activities"></CardContainer>
                  </div>
                ),
                column3: (
                  <div>
                    <CardContainer header="Budget Overview"></CardContainer>
                    <div className='flex flex-row gap-4'>
                      <CardContainer header="Job Overview"></CardContainer>
                      <ImageContainer     
                        overlay={true}      
                        className="promo-ad"                            
                        backgroundImage="./images/cartoon_images/female_professional_filmmaker.png"
                      >
                        <h2 className='text-white text-[3rem]'>Hollywood Filmmaker</h2>
                      </ImageContainer>
                    </div>
                  </div>
                ),
                column4: (
                  <div>
                    <CardContainer header="Social Activities"></CardContainer>
                  </div>
                ),

              }}
            </CardLayout> 

 
    
          </div>
        ),
      }}
    </AuthenticatedLayout>
  );
}
