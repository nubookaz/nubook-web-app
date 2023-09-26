import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Banner from '@/Components/Layouts/Banner';
import EmptyContent from '@/Components/Layouts/EmptyContent';
import NewCallSheetForm from '@/Pages/Projects/CallSheets/NewCallSheetForm';
import CallSheetList from '@/Pages/Projects/CallSheets/CallSheetList';
import PortalLayout from '@/Components/Layouts/PortalLayout';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';





function CallSheetOverview({ auth, showBanner }) {
    const { props } = usePage();
    const project = props.projects || []; // Use an empty array as a fallback if 'projects' prop is undefined
    const callSheet = props.callSheets || []; // Use an empty array as a fallback if 'projects' prop is undefined
    const [callSheetView, setCallSheetView] = useState("View All");

    const bannerProps = {
      showGreeting: true, // Customize these props based on your conditions
      size: 'page-banner',
    };

    const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
 
    const handleBackClick = () => {
      // Use the route function to generate the URL for the "Projects Overview" page
      const url = route('projects.edit', { id: project.id }); // Replace with your actual route name
    };

    const toggleRightPanel = () => {
      setIsRightPanelOpen(!isRightPanelOpen);
    };
    
    // const hasCallSheets = () => {
    //   return props.callSheets && props.callSheets.length > 0;
    // };

    const hasData = callSheet;
    const toolbarTitle = "Call Sheets"; // Provide a title for the toolbar
    const toolbarCTAText = "Create a New Call Sheet"; // Provide the button text
    const buttonText = "Create a New Call Sheet"; // Provide the button text
    const customSvgPath = "../../images/svg_images/undraw_call_sheets_1.svg"; // Provide the SVG path


    const handleStatusChange = (value) => {
      // Update the callSheetStatus state when the select dropdown value changes
      setCallSheetView(value);  
    };
  
  
    return (
      <AuthenticatedLayout user={auth.user} project={project} bannerProps={bannerProps}>

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
        
        portalBody: (       
            
            <div className="w-full h-full">
          
                <PortalLayout
                  hasData={hasData}
                  toolbarTitle={toolbarTitle}
                  toolbarCTAText={toolbarCTAText}
                  buttonText={buttonText}
                  customSvgPath={customSvgPath}
                  toggleRightPanel={toggleRightPanel} // You can optionally pass this function
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






export default CallSheetOverview;