import React, { useEffect, useState } from 'react';
import { useAuth } from '@/Components/Contexts/AuthContext';
import { useDarkMode } from '@/Components/Contexts/DarkModeContext';
import Sidebar from '@/Layouts/Partials/Sidebar';
import Modal from '@/Components/Modals/Modal';
import VerificationProcess from '@/Pages/Auth/Verification/VerificationProcess';
import CircularProgress from '@mui/joy/CircularProgress';

export default function AuthenticatedLayout({ children, project }) {
  const { darkModeSetting } = useDarkMode();
  const { isModalOpen, currentStep, setIsModalOpen, setCurrentStep, isLoading } = useAuth();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    let timer;
    if (!isLoading) {
      // Set a delay before showing content
      timer = setTimeout(() => setShowContent(true), 600); // Adjust delay as needed
    }

    return () => clearTimeout(timer); // Cleanup timeout
  }, [isLoading]);

  const backgroundClasses = {
    light: 'bg-slate-100',
    dark: 'bg-slate-700',
    midnight: 'bg-slate-900',
  };

  const backgroundColor = backgroundClasses[darkModeSetting] || backgroundClasses.light;

  if (isLoading || !showContent) {
    return <div className='w-full min-h-screen bg-white text-rose-500 text-center flex justify-center items-center '><CircularProgress variant={'soft'} color="neutral" thickness={4} /></div>;
  }

  return (
    <div className="min-h-screen tertiary-color relative bg-slate-50">
      {isModalOpen && (
        <div className="absolute z-40 w-full">
          <Modal isOpen={isModalOpen} shouldCloseOnOverlayClick={false} className="!w-[70rem]">
            <VerificationProcess
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              setIsModalOpen={setIsModalOpen}
            />
          </Modal>
        </div>
      )}

      <div className={`duration-500 ${backgroundColor}`}>
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
