import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faArrowLeft, faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons'; 
 
import ProjectSelector from './Partials/ProjectSelector'; // Import CategorySelector
import ProjectStepper from './Partials/ProjectStepper'; // Import ProjectStepper
import PageButton from '@/Components/Buttons/PageButton';

import VideoStepOne from './Partials/VideoProduction/VideoStepOne';
import VideoStepTwo from './Partials/VideoProduction/VideoStepTwo';
import VideoStepThree from './Partials/VideoProduction/VideoStepThree';

export default function ProjectForm({ customClasses }) {
    const { user } = useAuth();
    const [fadeIn, setFadeIn] = useState(false);
    const [fadeInDelay, setFadeInDelay] = useState(false);
 
    useEffect(() => {
        setFadeIn(true); 
        setFadeInDelay(true);  
 
    }, []);

    const [currentStep, setCurrentStep] = useState(0);
    const [emptyFields, setEmptyFields] = useState({});
    const totalSteps = 4; 
    const [isCustomImage, setIsCustomImage] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isImageAIGenerated, setImageIsAIGenerated] = useState(false);
    const [posterSize, setPosterSize] = useState({ width: 0, height: 0 });

    const handlePosterSizeChange = (size) => {
        setPosterSize(size);
    };
 
 
    const [videoStepOneData, setVideoStepOneData] = useState({});
    const [videoStepTwoData, setVideoStepTwoData] = useState({
        project_name: '',
        project_description: '',
        primary_genre: '',
        secondary_genre: '',
        viewer_rating: '',
        movie_poster: '',
    });

    const [videoStepThreeData, setVideoStepThreeData] = useState({
        project_stage: '',
        project_status: '',
        filming_days: '',
        project_budget: '',
    });

    const [videoStepFourData, setVideoStepFourData] = useState({});

    const [projectData, setProjectData] = useState({
        project_type: '',
        video_type: '',
    });

 
    const handleVideoStepTwoDataChange = (newData) => {
        setVideoStepTwoData(newData); // Updates the videoStepTwoData state
    };
    
    const handleVideoStepThreeDataChange = (newData) => {
        setVideoStepThreeData(newData); // Updates the videoStepThreeData state
    };
    
    const handleProjectType = (project) => {
        if (project.active) {
            // Update projectData with the selected project type
            setProjectData(prevData => ({
                ...prevData,
                project_type: project.name
            }));
            setCurrentStep(1); // Move to the next step
        }
    };
    
    const handleVideoType = (videoType) => {
        if (videoType.active) {
            // Update projectData with the selected video type
            setProjectData(prevData => ({
                ...prevData,
                video_type: videoType.name
            }));
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
    
        if (currentStep === 1 && projectData.project_type === 'Video Production' && !projectData.video_type) {
            // Check if video_type is selected for Video Production projects
            setEmptyFields({ ...emptyFields, video_type: true });
            return; // Prevent moving to the next step if video type is not selected
        }
        
        if (currentStep === 2 && !videoStepTwoData.project_name.trim()) {
            setEmptyFields({ ...emptyFields, project_name: true });
            return; // Prevent moving to the next step
        }
    
        // Check for Step 2 completion
        if (currentStep === 3) {
            let newEmptyFields = { ...emptyFields };
        
            // Existing check for project_stage
            if (!projectData.project_stage) {
                newEmptyFields.project_stage = true;
            }
        
            // Additional condition for another field, e.g., project_budget
            if (!projectData.project_status) {
                newEmptyFields.project_status = true;
            }
        
            setEmptyFields(newEmptyFields);
        
            // Check if there are any true values in newEmptyFields, indicating missing data
            if (Object.values(newEmptyFields).some(value => value === true)) {
                return; // Prevent moving to the next step if any required field is empty
            }
        }
        
        if (currentStep < totalSteps - 1) {
            setCurrentStep(prevStep => prevStep + 1);
        }
    };
    

 


    
    

    const stepInfo = [
        { step: 1, header: 'Choose a Project Type', description: 'Choose a project type below' },
        { step: 2, header: projectData.project_type, description: 'What type of project are you working on?' },
        { step: 3, header: projectData.video_type, description: 'Provide some information about your project below. You must fill out all fields if you want to create an AI generated poster.' },
        { step: 4, header: projectData.video_type, description: 'Lets add additional details for your project' },
    ]


    const handleSaveProject = async () => {

        const formData = new FormData();
        Object.entries({ 
            ...projectData, 
            ...videoStepOneData, 
            ...videoStepTwoData, 
            ...videoStepThreeData, 
            ...videoStepFourData 
        }).forEach(([key, value]) => {
            formData.append(key, value);
        });
    
         formData.append('isImageAIGenerated', isImageAIGenerated);
    
         if (uploadedImage) {
            formData.append('uploadedImage', uploadedImage);
        }
    
         if (posterSize) {
            formData.append('posterWidth', posterSize.width);
            formData.append('posterHeight', posterSize.height);
        }
        
        try {
            const response = await axios.post(route('projects.create'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data?.url) {
                 window.location.href = response.data.url;
            }
         } catch (error) {
            console.error('Error saving project:', error);
        }
    };
    
    

 
 
    return (

        <div className={`fade-in w-[80rem] py-[4rem] px-[8rem] ${fadeIn ? 'opacity-1' : 'opacity-0'}`}>

            <div className={`fade-in w-full max-w-[56rem] mx-auto ${fadeIn ? 'opacity-1' : 'opacity-0'}`}>
                <ProjectStepper 
                    currentStep={currentStep} 
                    activeProject={projectData.project_type} 
                 />
            </div>

            <div className='my-auto mx-auto h-full w-full max-w-[85rem] pt-[3rem]'>


                    <div className="h-full">

                        <div className={`fade-in-delay flex flex-col gap-8 h-full ${fadeInDelay ? 'opacity-1' : 'opacity-0'}`}>
                
                            {currentStep >= 0 && currentStep < stepInfo.length && (
                                <div className='flex flex-col justify-start'>
                                    <h2 className="text-lg font-bold text-center">{stepInfo[currentStep].header}</h2>
                                    <p className='text-center text-sm'>{stepInfo[currentStep].description}</p>
                                </div>
                            )}

                            <div className='flex flex-row gap-4 justify-center h-full py-6 '>

                                <div className={`fade-in-delay w-full h-full ${fadeInDelay ? 'opacity-1' : 'opacity-0'}`}>

                                    {currentStep === 0 && (
                                        <div className='w-full'>
                                            <ProjectSelector onProjectClick={handleProjectType} activeProject={projectData.project_type} />
                                        </div>
                                     )}

                                    {currentStep === 1 && projectData.project_type === 'Video Production' && (
                                        <div className='w-full'>
                                            <VideoStepOne
                                                onVideoTypeClick={handleVideoType}
                                                showError={emptyFields.video_type} 
                                                activeVideoType={projectData.video_type}
                                            />
                                        </div>
                                    )}

                                    {currentStep === 2 && projectData.project_type === 'Video Production' && (
                                        <div className='w-full'>
                                            <VideoStepTwo 
                                                data={videoStepTwoData} 
                                                projectData={projectData}
                                                onDataChange={handleVideoStepTwoDataChange}                                         
                                                emptyFields={emptyFields} 
                                                setEmptyFields={setEmptyFields}
                                                isCustomImage={isCustomImage}
                                                setIsCustomImage={setIsCustomImage}      
                                                setUploadedImage={setUploadedImage}
                                                setImageIsAIGenerated={setImageIsAIGenerated}
                                                onPosterSizeChange={handlePosterSizeChange}
                                            />
                                        </div>
                                    )}

                                    {currentStep === 3 && projectData.project_type === 'Video Production' && (
                                        <div className='w-full'>
                                            <VideoStepThree
                                                data={videoStepThreeData}
                                                onDataChange={handleVideoStepThreeDataChange}
                                                emptyFields={emptyFields}
                                            />
                                        </div>
                                    )}


                                </div>

                                
                            </div>

                            <div className='flex flex-row justify-end justify-evenly'>
                                    {currentStep > 0 && (
                                        <PageButton 
                                            className="!my-auto !bg-transparent duration-500 ease-in-out py-2 hover:bg-emerald-100" 
                                            size="small" 
                                            icon={faArrowLeft} 
                                            inText='Back'
                                            onClick={handleBackClick}
                                        >
                                         </PageButton>
                                    )}

                                    { (currentStep === 0 && projectData.project_type) || (currentStep > 0 && currentStep < totalSteps - 1) ? (
                                        <PageButton 
                                            iconPosition='right' 
                                            className="!my-auto !bg-transparent duration-500 ease-in-out py-2 hover:bg-emerald-100" 
                                            size="small" 
                                            icon={faArrowRight} 
                                            inText='Next'
                                            onClick={handleNextClick}
                                        >                     
                                        </PageButton>
                                    ) : null }

                                    {currentStep === totalSteps - 1 && (
                                        <PageButton 
                                            className="!my-auto duration-500 ease-in-out py-2 hover:bg-emerald-100" 
                                            size="small" 
                                            icon={faCheck} 
                                            inText='Submit'
                                            onClick={handleSaveProject}
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
  

