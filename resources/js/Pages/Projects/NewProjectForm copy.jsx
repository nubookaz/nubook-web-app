import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

import RightPanel from '@/Components/Layouts/DrawerPanel';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import CircularButton from '@/Components/Buttons/CircularButton';
import { faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons

import ProjectDetailsForm from '@/Pages/Projects/Forms/ProjectDetailsForm';
import ProjectClientForm from '@/Pages/Projects/Forms/ProjectClientForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';







export default function NewProjectForm({ ...props }) {
    const { user, fetchUserData } = useAuth();

    useEffect(() => {
      // Fetch user data on component mount
      fetchUserData();
    }, []);

 

    const [processing, setProcessing] = useState(false);
    const [emptyFields, setEmptyFields] = useState({});


    const { isRightPanelOpen, toggleRightPanel } = props;

    // const [currentStep, setCurrentStep] = useState(1);  
    
    const [projectData, setProjectData] = useState({
      project_name: '',
      project_budget: '',
      project_type: '',
      category_type: '',
      project_stage: '',
      project_description: '',
    });

    // const [clientData, setClientData] = useState({
    //   first_name: '',
    //   last_name: '',
    //   middle_initial: '',
    //   job_title: '',
    //   email_address: '',
    //   tel: '',
    //   company_name: '',
    // });

    // const [existingClient, setExistingClient] = useState({
    //   first_name: '',
    //   last_name: '',
    //   middle_initial: '',
    //   job_title: '',
    //   email_address: '',
    //   tel: '',
    //   company_name: '',
    // });


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
  
    // // Clear out the clientData state
    // setClientData({
    //   first_name: '',
    //   last_name: '',
    //   middle_initial: '',
    //   job_title: '',
    //   email_address: '',
    //   tel: '',
    //   company_name: '',
    // });
  
    // // Clear out the existingClient state
    // setExistingClient({
    //   first_name: '',
    //   last_name: '',
    //   middle_initial: '',
    //   job_title: '',
    //   email_address: '',
    //   tel: '',
    //   company_name: '',
    // });
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
  
      // Create an object mapping each required field to a boolean indicating if it's empty
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
  

  // const handleBackButtonClick = () => {
  //   if (currentStep === 3) {
  //       setCurrentStep(2); // Move back to step 2 from step 3
  //   } else if (currentStep === 2) {
  //       setCurrentStep(1); // Move back to step 1 from step 2
  //   } 
  // };

  const submit = async (e) => {
      e.preventDefault();
      setProcessing(true);

      if (currentStep === 2) {
        try {
          // Use the state directly from the callback
          await axios.post(route('projects.create'), {
            projectData: projectData,
            // clientData: clientData,
            // existingClient: existingClient,
          });

          clearFormData();

        } catch (error) {
            // Handle errors if needed
            console.log(error);
    
        } finally {
            // Set processing back to false regardless of success or failure
            setProcessing(false);
        }
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
            {/* {currentStep === 1 ? ( */}
                  <div>
                    <h2 className='mb-2'>Launch Your Project</h2>
                    <p className="p-base">Embark on creativity! Fill in the details below to give life to your next masterpiece, be it a film, commercial, or TV project. Whether it's a thrilling adventure or a heartwarming tale, this is the first step to making your cinematic dreams a reality.</p>                
                  </div>
            {/* ) : currentStep === 2 ? (
              <div>
                  <h2 className='mb-2'>Associate a Client</h2>
                  <p className="p-base">
                    Consider linking this project with a client for streamlined organization. Whether fostering a new collaboration or connecting with an existing client, enhance communication and tailor your services to their specific needs, ensuring a seamless creative partnership.
                  </p>
              </div>
            ) : null} */}
          </div>
        }
        


        panel_footer={
          <div className='flex flex-row gap-4'>

            {/* {currentStep === 1 ? ( */}
                  <div className='flex flex-row gap-4'>
                      <div className="circular-button circular-button-small cursor-pointer" onClick={handleCloseButtonClick}>
                          <FontAwesomeIcon icon={faXmark} />
                      </div>
                      {/* <div className='default-btn cursor-pointer !py-[9px] place-content-center secondary-button button-transition my-auto' onClick={handleNextButtonClick} >Next Step</div> */}
                  {/* </div> */}
              {/* ) : currentStep === 2 ? ( */}
                {/* <div className='flex flex-row gap-4'> */}
                      {/* <CircularButton icon={faArrowLeft} size="small" onClick={handleBackButtonClick} /> */}
                      <SecondaryButton buttonType="submit" onSubmit={submit} disabled={processing}>Create Project</SecondaryButton>
                  </div>
              {/* // ) : null}  */}

          </div>

        }
        >


        {/* Children */}
          {currentStep === 1 ? (
              <div className='step-1'>
                <ProjectDetailsForm
                    data={projectData}
                    onUpdateProjectInfo={handleUpdateFormData} 
                    emptyFields={emptyFields}
                    setEmptyFields={setEmptyFields}
                />
              </div>       
          ) : currentStep === 2 ? (
              <div>
                <ProjectClientForm
                    onUpdateCompanyInfo={setClientData}
                    setExistingClient={setExistingClient}
                    user={user}
                />              
              </div>
          ) : null} 

            
      </RightPanel>
    );
}
  

