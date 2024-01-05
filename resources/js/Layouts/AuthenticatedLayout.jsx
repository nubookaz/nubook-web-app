import { useAuth } from '@/Components/Contexts/AuthContext';
import React, { useEffect, useState } from 'react';

import Sidebar from '@/Layouts/Partials/Sidebar';
import TransparentSearchBar from '@/Components/Modals/TransparentSearchBar';
import Banner from '@/Layouts/Partials/Banner';
import Loading from '@/Components/Layouts/Loading';

import Modal from '@/Components/Modals/Modal';
import VerificationProcess from '@/Pages/Auth/Verification/VerificationProcess';






export default function AuthenticatedLayout({ bannerProps, children, project }) {
  const { user, fetchUserData } = useAuth();
  useEffect(() => {
    // Fetch user data on component mount
    fetchUserData();
  }, []);








  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  const closeSearch = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (user && user.is_password_temporary) {
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
 
  const verification = user && (user.is_password_temporary || !user.email_verified || !user.personal_info_completed || !user.company_info_completed);










    return (

        <div className="min-h-screen tertiary-color relative">

            {user === null || verification ? (
              
              <>
              
                  {verification ? (

                    <div id="surface-layer" className="absolute z-50 w-full">
                          <Modal show={isModalOpen} dialogPanelClass="!max-w-[70rem]">
                            <VerificationProcess 
                              currentStep={currentStep}
                              setCurrentStep={setCurrentStep}
                              setIsModalOpen={setIsModalOpen}
                            />
                          </Modal>
                       <Loading />
                    </div>

                  ):(
                    <Loading />
                  )}

              </>
            

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
