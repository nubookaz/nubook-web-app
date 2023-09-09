import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { faArrowLeft, faArrowRight, faXmark } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import CircularButton from '@/Components/Buttons/CircularButton';

import Banner from '@/Components/Layouts/Banner';
import EmptyContent from '@/Components/Layouts/EmptyContent';
import RightPanel from '@/Components/Layouts/RightPanel';

import ProjectForm from '@/Pages/Projects/Partials/ProjectForm';
import ProjectClientForm from '@/Pages/Projects/Partials/ProjectClientForm';

function ProjectsOverview({ auth, showBanner }) {
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [showSlideOutPanel, setShowSlideOutPanel] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Initialize the current step to 1

  const [projectName, setProjectName] = useState(''); // State to store the project name

  const toggleRightPanelAndSlideOut = () => {
    setIsRightPanelOpen(!isRightPanelOpen);
    setShowSlideOutPanel(true); // Make sure the slide-out panel is always visible
  };

  const toggleRightPanel = (isOpen) => {
    setIsRightPanelOpen(isOpen);
  };

  const toggleStep = () => {
    // Toggle between step 1 and step 2
    setCurrentStep(currentStep === 1 ? 2 : 1);
  };

  const handleFooterButtonClick = () => {
    // Handle the circular button click based on the current step
    if (currentStep === 1) {
      // Perform any necessary actions for step 1
    } else if (currentStep === 2) {
      // Perform any necessary actions for step 2
      if (currentStep === 2) {
        // Handle form submission here for step 2
        // You can submit the form data or perform any necessary actions
      }
      toggleStep(); // Switch back to step 1 when clicking "Back"
    }
    // Close the panel or perform other actions as needed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send an HTTP POST request to your Laravel API endpoint
      const response = await axios.post('/api/projects', {
        name: projectName, // Send the project name in the request body
      });

      // Handle the response (e.g., show a success message)
      console.log('Project created:', response.data);

      // Clear the input field after successful submission
      setProjectName('');

      // You can also update your UI or perform other actions here
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error creating project:', error);
    }
  };


  return (
    <AuthenticatedLayout user={auth.user} showBanner={true} showPortalBody={true}>
       {{
        surface: (
          <div className="relative z-50 w-full h-full">
            
            <form onSubmit={handleSubmit}>

            <RightPanel
              isRightPanelOpen={isRightPanelOpen}
              toggleRightPanel={toggleRightPanelAndSlideOut}
              showSlideOutPanel={false} // Set this to true to always show the slide-out panel
              panel_footer={
                <div className='flex flex-row gap-4'>
                  <CircularButton icon={currentStep === 1 ? faXmark : faArrowLeft} size="small" onClick={handleFooterButtonClick}>
                    {currentStep === 1 ? 'Close' : 'Back'}
                  </CircularButton>                  
                  <SecondaryButton onClick={currentStep === 1 ? toggleStep : handleFooterButtonClick}>
                    {currentStep === 1 ? 'Next Step' : 'Create Project'}
                  </SecondaryButton>
                </div>
              }
            >

              {currentStep === 1 ? <ProjectForm /> : <ProjectClientForm />}

            </RightPanel>

            </form>


          </div>
        ),
        banner: (
          <Banner size="small" showLeftContent={true} showProfilePhoto={true} />
        ),
        portalBody: (
          <div className="h-full w-full">
            <EmptyContent customSvgPath="./images/svg_images/undraw_projects_1.svg" buttonText="Create a Project Now" onButtonClick={toggleRightPanelAndSlideOut}>
              <h2 className="mb-4">No projects have been created</h2>
              <p className="p-base mb-4">Currently, there are no active projects. Please click the button 
                below to create a project now.</p>
            </EmptyContent>
          </div>
        ),
      }}
    </AuthenticatedLayout>
  );
}

export default ProjectsOverview;
