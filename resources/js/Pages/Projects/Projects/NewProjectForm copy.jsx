import React, { useState, useForm } from 'react';
import { router } from '@inertiajs/react';

import RightPanel from '@/Components/Layouts/RightPanel';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import CircularButton from '@/Components/Buttons/CircularButton';
import { faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons

import ProjectDetailsForm from '@/Components/Projects/Forms/ProjectDetailsForm';
import ProjectClientForm from '@/Components/Projects/Forms/ProjectClientForm';







function NewProjectForm(props) {
  const { isRightPanelOpen, toggleRightPanel } = props;

    const [currentStep, setCurrentStep] = useState(1); // Initialize the current step to 1
    const [showSlideOutPanel, setShowSlideOutPanel] = useState(false);

    const [isStepOneValid, setIsStepOneValid] = useState(true); // Initialize to true
    const [isStepTwoValid, setIsStepTwoValid] = useState(true); // Initialize to true

    const [nextButtonClicked, setNextButtonClicked] = useState(false);

    const [isProjectNameRequired, setIsProjectNameRequired] = useState(true);

    const [projectName, setProjectName] = useState(''); // Local state within ProjectForm
    const [projectBudget, setProjectBudget] = useState(''); // Local state within ProjectForm
    const [projectType, setProjectType] = useState(''); // Local state within ProjectForm
    const [categoryType, setCategoryType] = useState(''); // Local state within ProjectForm
    const [projectStage, setProjectStage] = useState(''); // Local state within ProjectForm
    const [projectDescription, setProjectDescription] = useState(''); // Local state within ProjectForm
    const [projectDays, setProjectDays] = useState(''); // Local state within ProjectForm
    const [projectMonths, setProjectMonths] = useState(''); // Local state within ProjectForm
    const [projectYears, setProjectYears] = useState(''); // Local state within ProjectForm

    const [companyName, setCompanyName] = useState('');
    const [einNumber, setEinNumber] = useState('');

    const [clientFirstName, setClientFirstName] = useState('');
    const [clientMiddleInitial, setClientMiddleInitial] = useState('');
    const [clientLastName, setClientLastName] = useState('');
    const [clientJobTitle, setClientJobTitle] = useState('');
    const [clientEmailAddress, setClientEmailAddress] = useState('');
    const [clientPhoneNumber, setClientPhoneNumber] = useState('');
    const [companyTypeChecked, setCompanyTypeCheckedChange] = useState(false);
    const [companyOwnerChecked, setCompanyOwnerCheckedChange] = useState(false);

    const projectData = {
      projectName,
      projectBudget,
      projectType,
      categoryType,
      projectStage,
      projectDescription,
      projectDays,
      projectMonths,
      projectYears,
    };

    const companyData = {
      companyName,
      einNumber,
    };

    const clientData = {
      companyTypeChecked,
      clientFirstName,
      clientMiddleInitial,
      clientLastName,
      clientJobTitle,
      clientEmailAddress,
      clientPhoneNumber,
    };
    
    const toggleRightPanelAndSlideOut = () => {
        setIsRightPanelOpen(!isRightPanelOpen);
        setShowSlideOutPanel(true); // Make sure the slide-out panel is always visible
    };

    const validateForm = (event) => {
      if (currentStep === 1) {
        setNextButtonClicked(true); // Set nextButtonClicked to true when "Next" is clicked
        const isStepOneValid = validateStepOne();
    
        if (isStepOneValid) {
          console.log("Step one is valid!");
          setCurrentStep(2); // Move to step 2 from step 1
        } else {
          // Display an error message or take appropriate action for missing requirements on step one
          console.error('Please fill out all required fields on step one.');
        }
      } else if (currentStep === 2) {
        const isStepTwoValid = validateStepTwo(); // Validate step two here
    
        if (isStepTwoValid) {
          setCurrentStep(3); // Move to step 3 from step 2
        } else {
          // Display an error message or take appropriate action for missing requirements on step two
          console.error('Please fill out all required fields on step two.');
        }
      } else {

        submit();
        
      }
    };
    
    const createProject = (projectData) => {
      return new Promise((resolve, reject) => {
        router.post(route('projects.create'), projectData, {
          onSuccess: (projectResponse) => {
            console.log("response project", projectResponse);
            const projectId = projectResponse.props.project.id;
            resolve(projectId);
          },
          onError: (projectError) => {
            console.error('Error creating project:', projectError);
            reject(projectError);
          },

        });
      });
    };

    const createAssociation = (associationData) => {
      return new Promise((resolve, reject) => {
        router.post(route('associations.create'), associationData, {
          onSuccess: (associationResponse) => {
            console.log("Association Created", associationResponse);
            resolve();
          },
          onError: (associationError) => {
            console.error('Error creating association:', associationError);
            reject(associationError);
          },
        });
      });
    };
    
    const submit = async () => {
      if (clientData.companyTypeChecked === true || companyData.companyName) {
        // If clientType is true OR both clientType and companyName are true, create an association
        await createAssociation({ projectData, companyData });
      } else {
        // Otherwise, create just a project
        const projectId = await createProject(projectData);
      }
    };
    

      















    const validateStepOne = () => {
      // Check if projectName and projectStatus are both filled out
      const isNameValid = projectName.trim() !== '';
      const isTypeValid = projectType !== '';
      const isCategoryValid = categoryType !== '';
      const isStageValid = projectStage !== '';

      // Update the validation status for step one based on both fields
      setIsStepOneValid(
          isNameValid && 
          isTypeValid && 
          isCategoryValid && 
          isStageValid
          );
    
      // Return true if both fields are filled out
      return isNameValid && 
          isTypeValid && 
          isCategoryValid && 
          isStageValid;
    };

    const validateStepTwo = () => {
      // Check if companyName is filled out if companyTypeChecked is true
      const isCompanyRequired = companyTypeChecked;
      const isEinRequired = companyOwnerChecked;

      // Check if companyName is filled out if it's required
      const isCompanyValid = !isCompanyRequired || (isCompanyRequired && companyName.trim() !== '');
      const isEinValid = (isCompanyRequired && einNumber.trim() !== '');

      // Update the validation status for step two based on the field
      setIsStepTwoValid(isCompanyValid);
      console.log(companyTypeChecked, companyOwnerChecked, isCompanyValid);
      
      // Return true if the field is filled out or not required
      return isCompanyValid;
    };
      
      
      
      















    const handleCompanyTypeCheckedChange = (isChecked) => {
        // Update the state with the new checkbox status
        setCompanyTypeCheckedChange(isChecked);
    };
      

    const handleCompanyOwnerCheckedChange = (isChecked) => {
        // Update the state with the new checkbox status
        setCompanyOwnerCheckedChange(isChecked);
    };

    const handleBackButtonClick = () => {
        if (currentStep === 3) {
            setCurrentStep(2); // Move back to step 2 from step 3
        } else if (currentStep === 2) {
            setCurrentStep(1); // Move back to step 1 from step 2
        } 
        // No need to handle going back from step 1 to a previous step, as it's the first step.
    };

    const handleCloseButtonClick = () => {
        // Assuming isFormComplete is a boolean indicating form completeness
        const isFormComplete = checkFormStatus();

      
        if (isFormComplete) {
          const result = window.confirm("Are you sure you want to proceed?");

          if (result) {
            setNextButtonClicked(false);
            toggleRightPanel(!isRightPanelOpen);
            setProjectName('');
            setProjectBudget('');
            setProjectType('');
            setCategoryType('');
            setProjectStage('');
            setProjectDescription('');
            setProjectDays('');
            setProjectMonths('');
            setProjectYears('');

            setCompanyTypeCheckedChange('');
            setCompanyName('');
            setEinNumber('');
            setClientFirstName('');
            setClientMiddleInitial('');
            setClientLastName('');
            setClientJobTitle('');
            setClientEmailAddress('');
            setClientPhoneNumber('');
           
          }
        } else {          
          // Close the panel when the form is not complete
          toggleRightPanel(false);
        }
      };

      const checkFormStatus = () => {
        // Initialize isFormComplete as false
        let isFormComplete = false;
      
        if (currentStep === 1) {
          // Check if at least one of the required fields in step 1 is filled
          isFormComplete =
            projectName !== '' ||
            projectBudget !== '' ||
            (projectType !== '' && projectType !== 'Select an option') ||
            (categoryType !== '' && categoryType !== 'Select an option') ||
            (projectStage !== '' && projectStage !== 'Select an option') ||
            projectDescription !== '' ||
            projectDays !== '' ||
            projectMonths !== '' ||
            projectYears !== '';

        } else if (currentStep === 2) {
          // Check if at least one of the required fields in step 2 (ProjectClientForm) is filled
          const isCompanyRequired = companyTypeChecked;
          const isEinRequired = companyOwnerChecked;

          isFormComplete =
            companyTypeChecked !== '' ||
            (!isCompanyRequired || (isCompanyRequired && companyName.trim() !== '')) ||
            (isCompanyRequired && einNumber.trim() !== '') ||
            clientFirstName.trim() !== '' ||
            clientLastName.trim() !== '';
          // You can add more conditions for other fields if needed
        } else {
          // For other steps, consider the form as complete
          isFormComplete = true;
        }
        return isFormComplete;
      };
      
      
      
      

    







      




    const renderStepContent = () => {
        switch (currentStep) {
          case 1:
            return (
              <div className='step-1'>
                <ProjectDetailsForm
                    data={data}
                    setData={setData}
                    isProjectNameRequired={isProjectNameRequired}
                    checkFormStatus={checkFormStatus}
                    customClasses={customClasses}
                />
              </div>
            );
          case 2:
            return (
              <div className='step-2'>
                <ProjectClientForm
                    auth={auth}
                    companyName={companyName}
                    setCompanyName={setCompanyName}
                    setEinNumber={setEinNumber}
                    clientFirstName={clientFirstName}
                    setClientFirstName={setClientFirstName}
                    clientMiddleInitial={clientMiddleInitial}
                    setClientMiddleInitial={setClientMiddleInitial}
                    clientLastName={clientLastName}
                    setClientLastName={setClientLastName}
                    clientJobTitle={clientJobTitle}
                    setClientJobTitle={setClientJobTitle}
                    clientEmailAddress={clientEmailAddress}
                    setClientEmailAddress={setClientEmailAddress}
                    clientPhoneNumber={clientPhoneNumber}
                    setClientPhoneNumber={setClientPhoneNumber}
                    nextButtonClicked={nextButtonClicked}
                    checkFormStatus={checkFormStatus}
                    companyTypeChecked={companyTypeChecked} 
                    companyOwnerChecked={companyOwnerChecked} 
                    handleCompanyTypeCheckedChange={handleCompanyTypeCheckedChange} 
                    handleCompanyOwnerCheckedChange={handleCompanyOwnerCheckedChange} 
                />

              </div>
            );
          case 3:
            return (
              <div className='step-3'>
                This is step 3
              </div>
            );
          default:
            return null;
        }
      };
    





      const renderButton = () => {
        if (currentStep === 1 || currentStep === 2) {
          return <SecondaryButton onClick={validateForm}>Next Step</SecondaryButton>;
        } else {
          return <SecondaryButton onClick={validateForm}>Create Project</SecondaryButton>;
        }
      };
    
      const renderBackButton = () => {
        if (currentStep > 1) {
          return <CircularButton icon={faArrowLeft} size="small" onClick={handleBackButtonClick} />;
        } else {
          return <CircularButton icon={faXmark} size="small" onClick={handleCloseButtonClick} />;
        }
      };
    






      return (
        <RightPanel
          isRightPanelOpen={isRightPanelOpen}
          toggleRightPanel={toggleRightPanelAndSlideOut}
          showSlideOutPanel={false}



          panel_header={
            <div className='header'>
              {currentStep === 2 ? (
                    <div>
                      <h2 className='mb-2'>Launch Your Project</h2>
                      <p className="p-base">Embark on creativity! Fill in the details below to give life to your next masterpiece, be it a film, commercial, or TV project. Whether it's a thrilling adventure or a heartwarming tale, this is the first step to making your cinematic dreams a reality.</p>                
                    </div>
              ) : currentStep === 1 ? (
                <div>
                    <h2 className='mb-2'>Associate a Client</h2>
                    <p className="p-base">
                      Consider linking this project with a client for streamlined organization. Whether fostering a new collaboration or connecting with an existing client, enhance communication and tailor your services to their specific needs, ensuring a seamless creative partnership.
                    </p>
                </div>
              ) : (
                <div>
                    <h2>Additional Project Details</h2>
                    <p className="p-base">If you have details for the project add them here</p>
                </div>
              )}
            </div>
          }
          


          panel_footer={
            <div className='flex flex-row gap-4'>
              {renderBackButton()}
              {renderButton()}
            </div>
          }
        >


          {renderStepContent()}
        

        
        </RightPanel>
      );
    }
    

    
    export default NewProjectForm;