import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import CardContainer from '@/Components/Containers/CardContainer';
import ImageContainer from '@/Components/Containers/ImageContainer';
import Modal from '@/Components/Modals/Modal';
import VerificationProcess from '@/Pages/Auth/Verification/VerificationProcess';

import CardLayout from '@/Components/Layouts/CardLayout';

export default function Dashboard({ auth }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState('');

  useEffect(() => {
    if (!auth.user.email_verified) {
      setCurrentStep('verification');
      setIsModalOpen(true);
    } else if (!auth.user.personal_info_completed ) {
      setCurrentStep('personalInfo');
      setIsModalOpen(true);
    } else if (!auth.user.company_info_completed){
      setCurrentStep('companyInfo');
      setIsModalOpen(true);
    } else if (auth.user.registration_complete){
      setIsModalOpen(false);
    }
  }, [auth]);

  const bannerProps = {
    showGreeting: true, // Customize these props based on your conditions
    showProfilePhoto: true,
    size: 'banner-photo',
    // Add any other props you need for this specific page's banner
  };

  return (
    <AuthenticatedLayout bannerProps={bannerProps}>
      {{
        surface: (
          <div className="relative w-full h-full">
            <Modal show={isModalOpen}>
              <VerificationProcess 
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                setIsModalOpen={setIsModalOpen}
                />
            </Modal>
          </div>
        ),

        portalBody: (
          <div className="h-full w-full">

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
