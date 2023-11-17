import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

import RightPanel from '@/Components/Layouts/RightPanel';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import CircularButton from '@/Components/Buttons/CircularButton';
import { faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons

import ProjectDetailsForm from '@/Components/Projects/Forms/ProjectDetailsForm';
import ProjectClientForm from '@/Components/Projects/Forms/ProjectClientForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';







export default function NewProjectForm({ ...props }) {
    const { user, fetchUserData } = useAuth();

    useEffect(() => {
      fetchUserData();
    }, []);

 

    const [processing, setProcessing] = useState(false);
    const [emptyFields, setEmptyFields] = useState({});


    const { isRightPanelOpen, toggleRightPanel } = props;
    
    const [projectData, setProjectData] = useState({
      project_name: '',
      project_budget: '',
      project_type: '',
      category_type: '',
      project_stage: '',
      project_description: '',
    });


  const clearFormData = () => {
    // Clear out the projectData state
    setProjectData({
      project_name: '',
      project_budget: '',
      project_type: '',
      category_type: '',
      project_stage: '',
      project_description: '',
    });
  
  };
  
  const handleCloseButtonClick = () => {
    // Call the reusable function to clear form data
    clearFormData();
    setEmptyFields(false);

    // Close the panel when the form is not complete
    toggleRightPanel(false);
  };
  
 
  const handleNextButtonClick = () => {
    if (currentStep === 1) {
      const requiredFields = ['project_name', 'project_type', 'category_type', 'project_stage'];
  
      const newEmptyFields = requiredFields.reduce((fields, fieldName) => {
        fields[fieldName] = !projectData[fieldName];
        return fields;
      }, {});
  
      setEmptyFields(newEmptyFields);
  
      const areAllRequiredFieldsFilled = requiredFields.every(fieldName => !newEmptyFields[fieldName]);
  
      if (areAllRequiredFieldsFilled) {
        setCurrentStep(2);
      } else {
       }
    }
  };
  

  const submit = async (e) => {
      e.preventDefault();
      setProcessing(true);

        try {
          // Use the state directly from the callback
          await router.post(route('projects.create'), {
            projectData: projectData,
          });

          clearFormData();

        } catch (error) {
            // Handle errors if needed
            console.log(error);
    
        } finally {
            setProcessing(false);
        }
  
  };


  const handleUpdateFormData = (field, value) => {
    setProjectData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
 








    return (
      <RightPanel
        isRightPanelOpen={isRightPanelOpen}
        isForm={true}
        onSubmitForm={submit}

        panel_header={
          <div className='header'>

                  <div>
                    <h2 className='mb-2'>Launch Your Project</h2>
                    <p className="p-base">Embark on creativity! Fill in the details below to give life to your next masterpiece, be it a film, commercial, or TV project. Whether it's a thrilling adventure or a heartwarming tale, this is the first step to making your cinematic dreams a reality.</p>                
                  </div>

          </div>
        }
        


        panel_footer={
          <div className='flex flex-row gap-4'>

                  <div className='flex flex-row gap-4'>
                      <div className="circular-button circular-button-small cursor-pointer" onClick={handleCloseButtonClick}>
                          <FontAwesomeIcon icon={faXmark} />
                      </div>
                 
                      <SecondaryButton buttonType="submit" onSubmit={submit} disabled={processing}>Create Project</SecondaryButton>
                  </div>

          </div>

        }
        >


              <div className='step-1'>
                <ProjectDetailsForm
                    data={projectData}
                    onUpdateProjectInfo={handleUpdateFormData} 
                    emptyFields={emptyFields}
                    setEmptyFields={setEmptyFields}
                />
              </div>       

            
      </RightPanel>
    );
}
  
