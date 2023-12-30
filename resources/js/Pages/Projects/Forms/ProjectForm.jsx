import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'; 

import ProjectSelector from './Partials/ProjectSelector'; // Import CategorySelector
import ProjectStepper from './Partials/ProjectStepper'; // Import ProjectStepper
import PageButton from '@/Components/Buttons/PageButton';

import VideoStepOne from './Partials/VideoProduction/VideoStepOne';
import VideoStepTwo from './Partials/VideoProduction/VideoStepTwo';
import VideoStepThree from './Partials/VideoProduction/VideoStepThree';

export default function ProjectForm({ customClasses }) {
    const { user, fetchUserData } = useAuth();

    useEffect(() => {
      fetchUserData();
    }, []);


    const [currentStep, setCurrentStep] = useState(0);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedVideoType, setSelectedVideoType] = useState(null);
    const [emptyFields, setEmptyFields] = useState({});



    const [videoStepTwoData, setVideoStepTwoData] = useState({});

    // Callback function to update state
    const handleVideoDataChange = (updatedData) => {
        setVideoStepTwoData(updatedData);
    };












    const handleProjectType = (project) => {
        if (project.active) {
            setSelectedProject(project.name);
            setCurrentStep(1); // Move to the next step
        }
    };

    const handleVideoType = (videoType) => {
        if (videoType.active) {
            setSelectedVideoType(videoType.name);
            setCurrentStep(2); // Move to the next step
        }
    };

    const handleBackClick = () => {
        if (currentStep > 0) {
            setCurrentStep(prevStep => prevStep - 1);
            setEmptyFields({}); // Clear the emptyFields state
        }
    };
    

    const handleNextClick = () => {
        const totalSteps = 5; // Example total steps
    
        // Check for Step 1 completion
        if (currentStep === 2 && !projectData.project_name.trim()) {
            setEmptyFields({ ...emptyFields, project_name: true });
            return; // Prevent moving to the next step
        }
    
        // Check for Step 2 completion
        if (currentStep === 3) {
            let errors = {};
    
            // Check if project_type, category_type, and project_stage are filled
            if (!projectData.project_type) errors.project_type = true;
            if (!projectData.category_type) errors.category_type = true;
            if (!projectData.project_stage) errors.project_stage = true;
            if (!projectData.project_status) errors.project_status = true;

            // Check for service_types only if project_type is 'Corporate' or 'Commercial'
            if ((projectData.project_type === 'Corporate' || projectData.project_type === 'Commercial') && (!projectData.service_types || projectData.service_types.length === 0)) {
                errors.service_types = true;
            }
        
            if (Object.keys(errors).length > 0) {
                setEmptyFields({ ...emptyFields, ...errors });
                return;
            }
        }
    
        if (currentStep < totalSteps - 1) {
            setCurrentStep(prevStep => prevStep + 1);
        }
    };
    

    const [projectData, setProjectData] = useState({
        project_name: '',
        category_type: '',
        project_type: '',
        project_status: '',
        service_types: [],
        project_stage: '',
        project_description: '',
        project_budget: '',
    });

    const handleUpdateFormData = (field, value) => {
        setProjectData(prevData => ({
        ...prevData,
        [field]: value
        }));
    };

    const handleChange = (field, value) => {
        console.log(field, value);
        if (Array.isArray(value)) {
            // Handle the array-type input update
            handleUpdateFormData(field, value);
        } else {
          handleUpdateFormData(field, value);
        }

        if (field === 'service_types') {
            setProjectData(prevData => ({
                ...prevData,
                [field]: Array.isArray(value) ? value : []
            }));
        } 
    
        // Existing logic to handle empty fields
        if (emptyFields[field]) {
            setEmptyFields(prevEmptyFields => ({
                ...prevEmptyFields,
                [field]: false
            }));
        }
    };

    const stepInfo = [
        { step: 1, header: 'Choose a Project Type', description: 'Choose a project type below' },
        { step: 2, header: selectedProject, description: 'What type of project are you working on?' },
        { step: 3, header: selectedVideoType, description: 'Provide some information about your project below. You must fill out all fields if you want to create an AI generated poster.' },
        { step: 4, header: selectedVideoType, description: 'Lets add additional details for your project' },
    ]

  
    return (

        <div className='w-full h-full py-[4rem] px-[8rem]'>

            <div className='w-full max-w-[56rem] mx-auto'>
                <ProjectStepper currentStep={currentStep} />
            </div>

            <div className='my-auto h-full w-full px-[16rem] py-[3rem]'>


                    <div className="mb- h-full">

                        <div className='flex flex-col gap-2 h-full'>
                
                            {currentStep >= 0 && currentStep < stepInfo.length && (
                                <div className='flex flex-col'>
                                    <h2 className="text-lg font-bold text-center">{stepInfo[currentStep].header}</h2>
                                    <p className='text-center text-sm'>{stepInfo[currentStep].description}</p>
                                </div>
                            )}

                            <div className='flex flex-row gap-4 justify-center mt-[4rem] mb-[6rem] h-full max-h-[32rem]'>

                                <div className='w-full '>

                                    {currentStep === 0 && (
                                        <div className='px-[10rem]'>
                                            <ProjectSelector onProjectClick={handleProjectType} activeProject={selectedProject} />
                                        </div>
                                     )}

                                    {currentStep === 1 && selectedProject === 'Video Production' && (
                                        <div className='px-[6rem]'>
                                            <VideoStepOne
                                                onVideoTypeClick={handleVideoType}
                                                activeVideoType={selectedVideoType}
                                            />
                                        </div>
                                    )}

                                    {currentStep === 2 && selectedProject === 'Video Production' && (
                                        <div className='px-[10rem]'>
                                            <VideoStepTwo 
                                                projectData={projectData} 
                                                onDataChange={handleVideoDataChange} 
                                                emptyFields={emptyFields} 
                                            />
                                        </div>
                                    )}

                                    {currentStep === 3 && selectedProject === 'Video Production' && (
                                        <div className='px-[10rem]'>
                                            <VideoStepThree
                                                projectData={projectData} 
                                                handleChange={handleChange} 
                                                emptyFields={emptyFields} 
                                            />
                                        </div>
                                    )}

                                </div>

                                
                            </div>

                            <div className='flex flex-row justify-evenly'>
                                    {currentStep > 0 && (
                                        <PageButton 
                                            className="!my-auto bg-transparent duration-500 ease-in-out	hover:bg-emerald-100" 
                                            size="small" 
                                            icon={faArrowLeft} 
                                            inText='Back'
                                            onClick={handleBackClick}
                                        >
                                         </PageButton>
                                    )}

                                    {currentStep > 0 && currentStep < 5 - 1 && (
                                        <PageButton 
                                            iconPosition='right' 
                                            className="!my-auto bg-transparent duration-500 ease-in-out	hover:bg-emerald-100" 
                                            size="small" 
                                            icon={faArrowRight} 
                                            inText='Next'
                                            onClick={handleNextClick}
                                        >                     
                                        </PageButton>
                                    )}
                            </div>



                            
                        </div>

                    </div>
 
            </div>

        </div>

    );
}
  

