import React, { useState, useForm } from 'react';
import { router } from '@inertiajs/react';

import RightPanel from '@/Components/Layouts/RightPanel';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import CircularButton from '@/Components/Buttons/CircularButton';
import { faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons

import ProjectDetailsForm from '@/Components/Projects/Forms/ProjectDetailsForm';
import ProjectClientForm from '@/Components/Projects/Forms/ProjectClientForm';







export default function NewProjectForm({ ...props }) {
    const { isRightPanelOpen, toggleRightPanel } = props;

    const [currentStep, setCurrentStep] = useState(1); // Initialize the current step to 1
    const [showSlideOutPanel, setShowSlideOutPanel] = useState(false);

    const [projectData, setProjectData] = useState({
      project_name: '',
      project_budget: '',
      project_type: '',
      category_type: '',
      project_stage: '',
      project_description: '',
    });

    const [requiredProjectData, setRequiredProjectData] = useState([]);

    const handleCloseButtonClick = () => {
      // Clear out the projectData state
      setProjectData({
        project_name: '',
        project_budget: '',
        project_type: '',
        category_type: '',
        project_stage: '',
        project_description: '',
      });
    
      // Close the panel when the form is not complete
      toggleRightPanel(false);
    };


    const handleNextButtonClick = () => {
      if (currentStep === 1) {
          // Check for missing required fields before moving to the next step
          // const requiredFields = [];
          // if (!projectData.project_name) {
          //     requiredFields.push('project_name');
          // }
          // if (!projectData.project_type) {
          //     requiredFields.push('project_type');
          // }
          // // Add more fields as needed
  
          // // If there are missing required fields, update the state and prevent moving to the next step
          // if (requiredFields.length > 0) {
          //     setRequiredProjectData(requiredFields);
          // } else {
          //     // No missing required fields, move to the next step
          //     setCurrentStep(2);
          // }

          // console.log(requiredFields);

      }

    };
  

    const handleBackButtonClick = () => {
      if (currentStep === 3) {
          setCurrentStep(2); // Move back to step 2 from step 3
      } else if (currentStep === 2) {
          setCurrentStep(1); // Move back to step 1 from step 2
      } 
    };


    const submit = async (e) => {
      e.preventDefault();

      // if (currentStep === 1) {
      //   console.log("submit 1");
      // } else {
      //   console.log("submit 2");

      // }




      const emptyFields = Object.keys(projectData).filter(
        (key) => projectData[key] === ''
      );
    
      // Update requiredProjectData state
      setRequiredProjectData(emptyFields);
    
      // Log or handle empty fields
      if (emptyFields.length > 0) {
        console.log('Empty fields:', emptyFields);
        // Or perform some action based on empty fields
      } else {
        // All fields are filled, proceed with submission
        console.log('Submitting:', projectData);
        // Or trigger your submit logic
      }

    };


    console.log(requiredProjectData);


    return (
      <RightPanel
        isRightPanelOpen={isRightPanelOpen}
        isForm={true}
        onSubmitForm={submit}


        panel_header={
          <div className='header'>
            {currentStep === 1 ? (
                  <div>
                    <h2 className='mb-2'>Launch Your Project</h2>
                    <p className="p-base">Embark on creativity! Fill in the details below to give life to your next masterpiece, be it a film, commercial, or TV project. Whether it's a thrilling adventure or a heartwarming tale, this is the first step to making your cinematic dreams a reality.</p>                
                  </div>
            ) : currentStep === 2 ? (
              <div>
                  <h2 className='mb-2'>Associate a Client</h2>
                  <p className="p-base">
                    Consider linking this project with a client for streamlined organization. Whether fostering a new collaboration or connecting with an existing client, enhance communication and tailor your services to their specific needs, ensuring a seamless creative partnership.
                  </p>
              </div>
            ) : null}
          </div>
        }
        


        panel_footer={
          <div className='flex flex-row gap-4'>

            {currentStep === 1 ? (
                  <div className='flex flex-row gap-4'>
                      <CircularButton icon={faXmark} size="small" onClick={handleCloseButtonClick} />
                      <SecondaryButton >Next Step</SecondaryButton>
                  </div>
              ) : currentStep === 2 ? (
                  <div>
                      <CircularButton icon={faArrowLeft} size="small" onClick={handleCloseButtonClick} />
                      <SecondaryButton>Create Project</SecondaryButton>
                  </div>
              ) : null} 

          </div>

        }
        >


        {/* Children */}
          {currentStep === 1 ? (
              <div className='step-1'>
                <ProjectDetailsForm
                    onUpdateProjectInfo={setProjectData} 
                    requiredProjectData={requiredProjectData}
                />
              </div>       
          ) : currentStep === 2 ? (
              <div>
                Client Form
              </div>
          ) : null} 

            
      </RightPanel>
    );
}
  

