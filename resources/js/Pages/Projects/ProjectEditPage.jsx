import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
  
import CardContainer from '@/Components/Containers/CardContainer';

function ProjectEditPage({ auth, project }) {

  const bannerProps = {
    showGreeting: true,
    size: 'chapter-banner',
  };

 
  return (
    <AuthenticatedLayout user={auth.user} project={project} bannerProps={bannerProps}>
      {{
        surface: <div className="relative z-50 w-full h-full"></div>,
        portalBody: (
          <div className="w-full h-full">
            <div className='flex flex-row gap-4 h-full'>
              <CardContainer
                header="Progress"
              >

              </CardContainer>
              <CardContainer
                header="Budget Overview"
              >

              </CardContainer>
            </div>
          </div>
        ),
      }}
    </AuthenticatedLayout>
  );
}

export default ProjectEditPage;
