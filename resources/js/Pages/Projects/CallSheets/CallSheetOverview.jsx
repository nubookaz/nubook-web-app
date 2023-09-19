import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Banner from '@/Components/Layouts/Banner';
import EmptyContent from '@/Components/Layouts/EmptyContent';
import NewCallSheetForm from '@/Pages/Projects/CallSheets/NewCallSheetForm';
import Toolbar from '@/Components/Layouts/Toolbar';

import CallSheetList from '@/Pages/Projects/CallSheets/CallSheetList';






function CallSheetOverview({ auth, showBanner }) {
    const { props } = usePage();
    const project = props.projects || []; // Use an empty array as a fallback if 'projects' prop is undefined
    const callSheet = props.callSheets || []; // Use an empty array as a fallback if 'projects' prop is undefined
  console.log("callsheet overview", callSheet);
    const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
 
    const handleBackClick = () => {
      // Use the route function to generate the URL for the "Projects Overview" page
      const url = route('projects.edit', { id: project.id }); // Replace with your actual route name
    };

    const toggleRightPanel = () => {
      setIsRightPanelOpen(!isRightPanelOpen);
    };
    
  

    const hasCallSheets = () => {
      return props.callSheets && props.callSheets.length > 0;
    };




  
    return (
        <AuthenticatedLayout user={auth.user} showBanner={true} showPortalBody={true}>

        {{
        surface: (
          <div className="relative z-50 w-full h-full">


              <NewCallSheetForm
                isRightPanelOpen={isRightPanelOpen}
                toggleRightPanel={toggleRightPanel}
                projectId={project.id}
              />


          </div>
        ),
        
        banner: <Banner size="small-banner-buttons" project={project} />,

        portalBody: (       
            
            <div className="w-full h-full">
          

                {hasCallSheets() ? ( // Corrected: Call the function with parentheses
                <Toolbar
                  onBackClick={handleBackClick}
                  title="Call Sheet Overview"
                  cta_text="Create a New Call Sheet"
                  onButtonClick={toggleRightPanel}
                  >
                      <CallSheetList project={project} callSheets={callSheet} />

                </Toolbar>
              ) : (

                <EmptyContent
                  customSvgPath="../../images/svg_images/undraw_call_sheets_1.svg"
                  buttonText="Create a Call Sheet Now"
                  onButtonClick={toggleRightPanel}
                >
                    <h2 className="mb-4">No call sheets have been created</h2>
                    <p className="mb-4 p-base">
                      Currently, there are no active call sheets. Please click the button below to create a call sheet now.
                    </p>
                </EmptyContent>

              )}


              </div>

             ),
        }}

        </AuthenticatedLayout>
        );
    
}






export default CallSheetOverview;