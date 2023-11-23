import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
  
 
export default function Settings({ project }) {

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

