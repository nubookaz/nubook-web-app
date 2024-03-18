import { useAuth } from '@/Components/Contexts/AuthContext';
import { useProject } from '@/Components/Contexts/ProjectContext'; 

import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faArrowLeft, faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons'; 
 
import ProjectSelector from './Partials/ProjectSelector';  
import ProjectStepper from './Partials/ProjectStepper'; 
import PageButton from '@/Components/Buttons/PageButton';

import VideoStepOne from './Partials/VideoProduction/VideoStepOne';
import VideoStepTwo from './Partials/VideoProduction/VideoStepTwo';
import VideoStepThree from './Partials/VideoProduction/VideoStepThree';

export default function CreateProject({ customClasses }) {
    const { userData } = useAuth();
    const { createProject } = useProject();




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
        setVideoStepTwoData(newData); 
    };
    
    const handleVideoStepThreeDataChange = (newData) => {
        setVideoStepThreeData(newData); 
    };
    
    const handleProjectType = (project) => {
        if (project.active) {
            setProjectData(prevData => ({
                ...prevData,
                project_type: project.name
            }));
            setCurrentStep(1); 
        }
    };
    
    const handleVideoType = (videoType) => {
        if (videoType.active) {
            setProjectData(prevData => ({
                ...prevData,
                video_type: videoType.name
            }));
            setCurrentStep(2); 
        }
    };
    
    const handleBackClick = () => {
        if (currentStep > 0) {
            setCurrentStep(prevStep => prevStep - 1);
            setEmptyFields({}); 
        }
    };
    
    const handleNextClick = () => {
        if (currentStep === 1 && projectData.project_type === 'Video Production' && !projectData.video_type) {
            setEmptyFields({ ...emptyFields, video_type: true });
            return;  
        }
        if (currentStep === 2 && !videoStepTwoData.project_name.trim()) {
            setEmptyFields({ ...emptyFields, project_name: true });
            return;  
        }
        if (currentStep === 3) {
            let newEmptyFields = { ...emptyFields };
            if (!projectData.project_stage) {
                newEmptyFields.project_stage = true;
            }
            if (!projectData.project_status) {
                newEmptyFields.project_status = true;
            }
            setEmptyFields(newEmptyFields);
            if (Object.values(newEmptyFields).some(value => value === true)) {
                return;  
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
 
        const projectData = {
            ...videoStepOneData, 
            ...videoStepTwoData, 
            ...videoStepThreeData, 
            ...videoStepFourData,
            project_type: projectData.project_type,
            video_type: projectData.video_type,
        };

        const projectAssets = {
            isImageAIGenerated,
            uploadedImage,
            posterWidth: posterSize.width,
            posterHeight: posterSize.height,
        };
        console.log(projectData, projectAssets);

        createProject(projectData, projectAssets);
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
  

