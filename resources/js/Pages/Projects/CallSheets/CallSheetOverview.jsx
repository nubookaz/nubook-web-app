import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Banner from '@/Components/Layouts/Banner';
import EmptyContent from '@/Components/Layouts/EmptyContent';

function CallSheetOverview({ auth, showBanner }) {
  const { project } = usePage().props;


    const [projectData, setProjectData] = useState({
      projectID: project.id || '',
      projectName: project.projectName || '',
      projectType: project.projectType || '',
      projectDescription: project.projectDescription || '',
      projectBudget: project.projectBudget || 0,
      categoryType: project.categoryType || '',
      projectStage: project.projectStage || '',
      projectDays: project.projectDays || 0,
      projectMonths: project.projectMonths || 0,
      projectYears: project.projectYears || 0,
      // Add other project-related fields here
    });
  
    return (
        <AuthenticatedLayout user={auth.user} showBanner={true} showPortalBody={true}>

        {{
        surface: (
            <div></div>
        ),
        
        banner: <Banner size="small-banner-buttons" showLeftContent={true} showProfilePhoto={true} projectData={projectData} />,

        portalBody: (       
            
            <div className="w-full h-full">
                
                <EmptyContent
                  customSvgPath="../../images/svg_images/undraw_call_sheets_1.svg"
                  buttonText="Create a Call Sheet Now"
                >
                    <h2 className="mb-4">No call sheets have been created</h2>
                    <p className="mb-4 p-base">
                      Currently, there are no active call sheets. Please click the button below to create a call sheet now.
                    </p>
                </EmptyContent>
              </div>

             ),
        }}

        </AuthenticatedLayout>
        );
    
}

export default CallSheetOverview;