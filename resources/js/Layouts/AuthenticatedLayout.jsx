import { useAuth } from '@/Components/Contexts/AuthContext';
import React, { useEffect, useState } from 'react';

import Sidebar from '@/Layouts/Partials/Sidebar';
import Loading from '@/Layouts/Partials/Loading';

import Modal from '@/Components/Modals/Modal';
import ActionDrawer from '@/Components/Drawer/ActionDrawer';

import VerificationProcess from '@/Pages/Auth/Verification/VerificationProcess';






export default function AuthenticatedLayout({ 
  
  children, 
  project

}) {

  const { user, fetchUserData } = useAuth();
  useEffect(() => {
    // Fetch user data on component mount
    fetchUserData();
  }, []);








  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
 

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

  // const verification = true;
 


    return (

        <div className="min-h-screen tertiary-color relative bg-slate-50">

            {user === null || verification ? (
            
              <>
              
                  {verification ? (

                      <div className="absolute z-40 w-full">
                            <Modal isOpen={isModalOpen} className="!max-w-[70rem]">
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

                <div className='bg-slate-100'>

                    <div className="absolute z-50 w-full">
                        <Sidebar project={project}/>
                    </div>

                    <main className="flex flex-col w-full h-screen overflow-hidden">
                          {children.portal}
                    </main>

                </div>
                    
            )} 
           
        </div>

    );


}
