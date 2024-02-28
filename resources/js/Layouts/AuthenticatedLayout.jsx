import { useAuth } from '@/Components/Contexts/AuthContext';
import React, { useEffect } from 'react';

import Sidebar from '@/Layouts/Partials/Sidebar';
import Modal from '@/Components/Modals/Modal';
import VerificationProcess from '@/Pages/Auth/Verification/VerificationProcess';

export default function AuthenticatedLayout({ children, project }) {
  const { isModalOpen, currentStep, setIsModalOpen, setCurrentStep } = useAuth();

 
  return (
    <div className="min-h-screen tertiary-color relative bg-slate-50">
      {isModalOpen && (
        <div className="absolute z-40 w-full">
          <Modal isOpen={isModalOpen} className="!w-[70rem]">
            <VerificationProcess
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              setIsModalOpen={setIsModalOpen}
            />
          </Modal>
        </div>
      )}

      <div className='bg-slate-100'>
        <div className="absolute z-30 w-full">
          <Sidebar project={project}/>
        </div>

        <main className="flex flex-col w-full h-screen overflow-hidden">
          {children.portal}
        </main>
      </div>
    </div>
  );
}
