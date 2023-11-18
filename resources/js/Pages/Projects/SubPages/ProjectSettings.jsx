import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
  
import CardContainer from '@/Components/Containers/CardContainer';

export default function ProjectSettings({ project }) {

  const bannerProps = {
    showGreeting: true,
    size: 'page-banner',
  };

 
  return (
    <AuthenticatedLayout  project={project} bannerProps={bannerProps}>
      {{
        portalBody: (
          <div className="w-full h-full">
           
          </div>
        ),
      }}
    </AuthenticatedLayout>
  );
}

