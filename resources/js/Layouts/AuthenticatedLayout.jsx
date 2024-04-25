import React, { useEffect, useState } from 'react';
import { useAuth } from '@/Components/Contexts/AuthContext';
import { useProfile } from '@/Components/Contexts/UserProfileContext';
import Sidebar from '@/Layouts/Partials/Sidebar';
import CircularProgress from '@mui/joy/CircularProgress';

export default function AuthenticatedLayout({ children, project }) {
  const { darkModeSetting } = useProfile();
  const { isModalOpen, isLoading } = useAuth();
  const [showContent, setShowContent] = useState(false);
  console.log(project);

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

  const sidebarComponent = <Sidebar project={project} />;

  if (!showContent || isModalOpen) {
    return (
      <div className={`w-full min-h-screen flex duration-500 justify-center tertiary-color items-center ${backgroundColor}`}>
        <div className={`flex-1 ${backgroundColor}`}>
          {sidebarComponent}
        </div>
        <div className='flex-1 duration-500'>
          <CircularProgress variant={'soft'} color="neutral" thickness={4} />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen tertiary-color relative ${backgroundColor}`}>
      {sidebarComponent}
      <main className="flex flex-col w-full h-screen overflow-hidden">
        {children.portal}
      </main>
    </div>
  );
}