import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import CardContainer from '@/Components/Containers/CardContainer';
import ImageContainer from '@/Components/Containers/ImageContainer';
import Modal from '@/Components/Modals/Modal';
import VerificationProcess from '@/Pages/Auth/Verification/VerificationProcess';
import Overview from '@/Components/Projects/Overview';

import Skeleton from '@mui/joy/Skeleton';
import Budget from '@/Components/Projects/Budget';








export default function Dashboard({auth}) {
  const { user, fetchUserData } = useAuth();

  useEffect(() => {
    // Fetch user data on component mount
    fetchUserData();
  }, []);

 


  const { props } = usePage();
  const projects = props.projects || []; // Use an empty array as a fallback if 'projects' prop is undefined

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const [isProjectFormPanel, setProjectFormPanel] = useState(false);

  const openProjectFormPanel = () => {
    setProjectFormPanel(!isProjectFormPanel);
  };

  useEffect(() => {
    if (user && user.is_temporary) {
      setCurrentStep('changePassword');
      setIsModalOpen(true);
    } else if (user && !user.email_verified) {
      setCurrentStep('verification');
      setIsModalOpen(true);
    } else if (user && !user.personal_info_completed) {
      setCurrentStep('personalInfo');
      setIsModalOpen(true);
    } else if (user && !user.company_info_completed) {
      setCurrentStep('companyInfo');
      setIsModalOpen(true);
    } else if (user && !user.registration_complete) {
      setIsModalOpen(false);
    }
  }, [user]);


  const verification = user && (user.is_temporary || !user.email_verified || !user.personal_info_completed || !user.company_info_completed);

  const bannerProps = {
    showGreeting: true, // Customize these props based on your conditions
    showProfilePhoto: true,
    size: 'banner-photo',
    // Add any other props you need for this specific page's banner
  };


  return (
    <AuthenticatedLayout bannerProps={bannerProps} verification={verification}>
      {{
        surface: (
          <div className="relative z-50 w-full h-full">
            <Modal show={isModalOpen} dialogPanelClass="!max-w-[70rem]">
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

                <div className='flex flex-row h-full w-full justify-between gap-6'>
                    <CardContainer header="Project Overview" className='!w-1/2'>
                      <Overview
                         projects={projects}
                         isPortrait={true}
                         onClick={openProjectFormPanel}
                         multiCircularProgressSize="w-[250px] h-[250px]"
                      />
                    </CardContainer>
                    <CardContainer header="Social Activities" className='!w-1/2 disabled-feature'></CardContainer>
                    <div className='flex flex-col gap-6 h-full w-full'>
                      <CardContainer header="Budget Overview" className='h-1/2'>
                        <Budget
                          projects={projects}
                        />
                      </CardContainer>
                      <div className='flex flex-row gap-6 h-1/2'>
                        <CardContainer header="Job Overview" className="disabled-feature"></CardContainer>
                        <ImageContainer     
                          overlay={true}      
                          className="promo-ad"                            
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
