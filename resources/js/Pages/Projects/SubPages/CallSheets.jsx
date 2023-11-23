import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CallSheetDrawer from '@/Pages/Projects/CallSheets/Forms/CallSheetDrawer';
import CallSheetList from '@/Pages/Projects/CallSheets/Partials/CallSheetList';
import PortalLayout from '@/Layouts/Partials/PortalLayout';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';





export default function CallSheets({ auth, showBanner }) {
    const { props } = usePage();
    const project = props.projects || []; // Use an empty array as a fallback if 'projects' prop is undefined
    const callSheet = props.callSheets || []; // Use an empty array as a fallback if 'projects' prop is undefined
    const [callSheetView, setCallSheetView] = useState("View All");

    const bannerProps = {
      showGreeting: true, // Customize these props based on your conditions
      size: 'page-banner',
    };

    const [isDrawerPanelOpen, setDrawerPanelOpen] = useState(false);


    const toggleDrawerPanel = () => {
      setDrawerPanelOpen(!isDrawerPanelOpen);
    };

    const hasData = callSheet;
    const toolbarTitle = "Call Sheets"; // Provide a title for the toolbar
    const toolbarCTAText = "Create a New Call Sheet"; // Provide the button text
    const buttonText = "Create a New Call Sheet"; // Provide the button text
    const customSvgPath = "../../images/svg_images/undraw_call_sheets_1.svg"; // Provide the SVG path
  
    return (
      <AuthenticatedLayout user={auth.user} project={project} bannerProps={bannerProps}>

        {{
        surface: (
          <div className="relative z-50 w-full h-full">


              <CallSheetDrawer
                isDrawerPanelOpen={isDrawerPanelOpen}
                toggleDrawerPanel={toggleDrawerPanel}
                data={project}
              />
 
          </div>
        ),
        
        portalBody: (       
            
            <div className="w-full h-full">
          
                <PortalLayout
                  hasData={hasData}
                  toolbarTitle={toolbarTitle}
                  toolbarCTAText={toolbarCTAText}
                  buttonText={buttonText}
                  customSvgPath={customSvgPath}
                  toggleDrawerPanel={toggleDrawerPanel} // You can optionally pass this function
                  pageType="Call Sheets"
                >
                  {{
                    middle: (

                      <Select
                          defaultValue="View All"
                          value={callSheetView}
                          className="w-[18rem]"
                          required
                          onChange={(e, newValue) => {
                            console.log('Select Value', newValue);
                            setCallSheetView(newValue); // Update the selected option
                          }}
                        >
                          <Option value="View All" default>View All</Option>
                          <Option value="Draft">Drafts</Option>
                          <Option value="Publish">Published</Option>
                          <Option value="Unpublish">Unpublished</Option>
                      </Select>                      
                  ),
                    content: (
                      <CallSheetList project={project} callSheets={callSheet} view={callSheetView} ></CallSheetList>
                    )
                  }}
                </PortalLayout>


              </div>

             ),
        }}

        </AuthenticatedLayout>
        );
    
}

 