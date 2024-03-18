import React, { useState, useEffect } from 'react';
import { useProject } from '@/Components/Contexts/ProjectContext';
import ProjectStepper from './Partials/ProjectStepper';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import ProjectTypeSelector from './Partials/ProjectTypeSelector';
import CorporateProjectTypeSelector from './Partials/Corporate/CorporateProjectTypeSelector';
import FamilyEventsTypeSelector from './Partials/FamilyEvents/FamilyEventsTypeSelector';
import DigitalContentTypeSelector from './Partials/DigitalContent/DigitalContentTypeSelector';
import WeddingDetails from './Partials/FamilyEvents/Weddings/WeddingDetails';

import LiveBroadcastTypeSelector from './Partials/LiveBroadcast/LiveBroadcastTypeSelector';
import LiveEventDetails from './Partials/LiveBroadcast/LiveEventDetails/LiveEventDetails';

import CreativeEntertainmentTypeSelector from './Partials/CreativeEntertainment/CreativeEntertainmentTypeSelector';
import VideoProjectDetails from './Partials/CreativeEntertainment/VideoProjectDetails';
import VideoAdditionalDetails from './Partials/CreativeEntertainment/VideoAdditionalDetails';

const CreateProject = ({ onClose, resetSignal }) => {
    const { createProject } = useProject();
    const [fadeIn, setFadeIn] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [projectData, setProjectData] = useState({
        corporateType: '',
        selectedProjectType: '',
        selectedCorporateType: '',
        selectedFamilyEventType: '',
        selectedCreativeType: '',
        selectedLiveBroadcastType: '',
        selectedDigitalContentType: '',
        weddingDetails: {},
        liveEventDetails: {},
        videoProjectDetails: {}
      });
    
    const [projectAssets, setProjectAssets] = useState({ uploadedImage: null });
    const [selectionError, setSelectionError] = useState(false);

    const [selectedProjectType, setSelectedProjectType] = useState('');
    const [selectedCorporateType, setSelectedCorporateType] = useState('');
    const [selectedFamilyEventType, setSelectedFamilyEventType] = useState('');
    const [selectedCreativeType, setSelectedCreativeType] = useState('');
    const [selectedLiveBroadcastType, setSelectedLiveBroadcastType] = useState('');
    const [selectedDigitalContentType, setSelectedDigitalContentType] = useState('');
    const [weddingDetails, setWeddingDetails] = useState({});
    const [liveEventDetails, setLiveEventDetails] = useState({});
    const [videoProjectDetails, setVideoProjectDetails] = useState({});
    const [additionalVideoDetails, setAdditionalVideoDetails] = useState({});
    const [posterImagePreview, setPosterImagePreview] = useState(null);
    const [selectedClientIds, setSelectedClientIds] = useState([]);

    const handlePosterImageChange = (imageUrl) => {
      setPosterImagePreview(imageUrl);
    };
    
    const [selectedDetailTitle, setSelectedDetailTitle] = useState('');
    const [stepError, setStepError] = useState('');

    useEffect(() => {
        setFadeIn(true);

        if (resetSignal) {
          handleCancel();
        }
      }, [resetSignal]);
      
      useEffect(() => {
        console.log('Updated videoProjectDetails:', videoProjectDetails);
      }, [videoProjectDetails]);
      
      const handleSetSelectionError = (hasError) => {
        setSelectionError(hasError);
      };

      const updateProjectAssets = (mediaPath) => {
        setProjectAssets({ ...projectAssets, uploadedImage: mediaPath });
      };
      
      console.log('projectData', projectData);
      console.log('videoProjectDetails', videoProjectDetails);
      console.log('additionalVideoDetails', additionalVideoDetails);

      const handleProjectSelection = (type, value) => {
        let nextStep = currentStep;
    
        switch (type) {
            case 'selectedProjectType':
                setSelectedProjectType(value);
                setProjectData({ ...projectData, type: value });
                nextStep = 1;  
                break;
            case 'selectedCorporateType':
                setSelectedCorporateType(value);
                setProjectData(prev => ({ ...prev, corporateType: value }));
                nextStep = 2;  
                break;
            case 'selectedFamilyEventType':
                setSelectedFamilyEventType(value);
                setProjectData(prev => ({ ...prev, familyEventType: value }));
                nextStep = 2;  
                break;
            case 'selectedCreativeType':
                setSelectedCreativeType(value);
                setProjectData(prev => ({ ...prev, creativeType: value }));
                nextStep = 2;  
                break;
            case 'selectedLiveBroadcastType':
                setSelectedLiveBroadcastType(value);
                setProjectData(prev => ({ ...prev, liveBroadcastType: value }));
                nextStep = 2;  
                break;
            case 'selectedDigitalContentType':
                setSelectedDigitalContentType(value);
                setProjectData(prev => ({ ...prev, digitalContentType: value }));
                nextStep = 2;  
                break;
            default:
                break;
        }
    
        setSelectionError(false);
        setStepError(''); 
        setSelectedDetailTitle(value);
        setCurrentStep(nextStep);  
    };

    const handleCancel = () => {
        setSelectedProjectType('');
        setSelectedCorporateType('');
        setSelectedFamilyEventType('');
        setSelectedCreativeType('');
        setSelectedLiveBroadcastType('');
        setSelectedDigitalContentType('');
        setWeddingDetails({});
        setLiveEventDetails({});
        setVideoProjectDetails({});
        setAdditionalVideoDetails({});
        setProjectData({ name: '', description: '', type: '' });
        setProjectAssets({ uploadedImage: null });
        setSelectionError(false);
        setStepError('');
        setCurrentStep(0);
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const finalProjectData = {
            ...projectData,
            selectedProjectType,
            selectedCorporateType,
            selectedFamilyEventType,
            selectedCreativeType,
            selectedLiveBroadcastType,
            selectedDigitalContentType,
            weddingDetails,
            liveEventDetails,
            videoProjectDetails,
            additionalVideoDetails,
            projectAssets,
        };
        await createProject(finalProjectData);
    };
    
    const nextStep = () => {
        let error = '';
        const isLastStep = currentStep === stepContent.length - 1;

        if (isLastStep) {
            handleSubmit();
            return;
        }

        switch (currentStep) {
            case 0:
                if (!selectedProjectType) error = 'Please select a project type to continue.';
                break;
            case 1:
                if (!selectedCorporateType && !selectedFamilyEventType && !selectedCreativeType && !selectedLiveBroadcastType && !selectedDigitalContentType) {
                    error = 'Please make a selection to continue.';
                }
                break;
            case 2:
                if (currentStep === 2 && !videoProjectDetails.projectName) {
                    error = 'Please enter a project name to continue.';
                }
                break;
            case 2:
                if (currentStep === 3 && (!additionalVideoDetails.projectStage || !additionalVideoDetails.projectStatus)) {
                    error = 'Please choose the project stage and status to continue.';
                }
                break;
            default:
                break;
        }
    
        if (error) {
            setStepError(error);
        } else {
            setStepError('');
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep > 0 ? currentStep - 1 : 0);
    };

    const getTitleFromType = (type) => {
        if (typeof type !== 'string') return '';
        return type.split(' - ')[0];
    };
      
      
    const renderDetailsComponent = () => {
        const projectType = getTitleFromType(selectedProjectType);
        const typeSelectors = {
            'Corporate & Commercial': <CorporateProjectTypeSelector selectedType={selectedCorporateType} onSelectType={(type) => handleProjectSelection('selectedCorporateType', type)} />,
            'Family Events & Celebrations': <FamilyEventsTypeSelector selectedType={selectedFamilyEventType} onSelectType={(type) => handleProjectSelection('selectedFamilyEventType', type)} />,
            'Creative & Entertainment': <CreativeEntertainmentTypeSelector selectedType={selectedCreativeType} onSelectType={(type) => handleProjectSelection('selectedCreativeType', type)} />,
            'Live Broadcast': <LiveBroadcastTypeSelector selectedType={selectedLiveBroadcastType} onSelectType={(type) => handleProjectSelection('selectedLiveBroadcastType', type)} />,
            'Digital Content': <DigitalContentTypeSelector selectedType={selectedDigitalContentType} onSelectType={(type) => handleProjectSelection('selectedDigitalContentType', type)} />,
        };
        return typeSelectors[projectType] || <div>Please select a project type to see more details.</div>;
    };

    const renderAdditionalDetails = () => {
        const projectType = getTitleFromType(selectedProjectType);
    
        switch (projectType) {
            case 'Corporate & Commercial':
                return renderCorporateContent();
            case 'Family Events & Celebrations':
                return renderFamilyEventsCelebrationsContent()
            case 'Live Broadcast':
                return renderLiveBroadCastContent();
            case 'Creative & Entertainment':
                return renderCreativeEntertainmentContent();
            default:
                return <div>Additional details for the selected project type.</div>;
        }
    };
    
     const renderCorporateContent = () => {
        switch (selectedCorporateType) {
            case 'Corporate Events':
                return <div>Content for Corporate Events</div>;
            case 'Conferences/Seminars':
                return <div>Content for Conferences/Seminars</div>;
            default:
                return <div>Select a corporate project type to see more details</div>;
        }
    };

    const renderFamilyEventsCelebrationsContent = () => {
        switch (selectedFamilyEventType) {
            case 'Wedding':
                return <WeddingDetails weddingDetails={weddingDetails} setWeddingDetails={(details) => setWeddingDetails({ ...details, weddingDetails: details })} />;
            default:
                return <div>Select a family event type to see more details</div>;
        }
    };


    const renderLiveBroadCastContent = () => {
        switch (selectedLiveBroadcastType) {
            case 'Concerts':
            case 'Conferences':
            case 'Graduations':
                return <LiveEventDetails liveEventDetails={liveEventDetails} setLiveEventDetails={(details) => setLiveEventDetails({ ...details, liveEventDetails: details })} />;
            default:
                return <div>Select a live broadcast project type to see more details</div>;
        }
    };

    const renderCreativeEntertainmentContent = () => {
        switch (selectedCreativeType) {
            case 'Documentary Films':
            case 'Short Films':
            case 'Feature Films':
                return <VideoProjectDetails 
                            videoProjectDetails={videoProjectDetails} 
                            setVideoProjectDetails={setVideoProjectDetails} 
                            setSelectionError={handleSetSelectionError} 
                            updateProjectAssets={updateProjectAssets} 
                            posterImagePreview={posterImagePreview}  
                            handlePosterImageChange={handlePosterImageChange} 
                            
                        />;
            default:
                return <div>Select a creative project type to see more details</div>;
        }
    };

    const renderAdditionalDetailsVideoProduct = () => {
        if (selectedProjectType.includes('Creative & Entertainment')) {
            switch (selectedCreativeType) {
                // Passing selectedClientIds and setSelectedClientIds to VideoAdditionalDetails
                case 'Documentary Films':
                case 'Short Films':
                case 'Feature Films':
                    return <VideoAdditionalDetails 
                                additionalVideoDetails={additionalVideoDetails}
                                setAdditionalVideoDetails={setAdditionalVideoDetails}
                                selectedClientIds={selectedClientIds}
                                setSelectedClientIds={setSelectedClientIds}
                            />;
                default:
                    return <div>Select a detailed project type in Creative & Entertainment to see more details here</div>;
            }
        } else {
            return <div>Step 4 content based on other selections</div>;
        }
    };
    
    const renderProjectSummary = () => {

    };

    const stepContent = [
        {
            header: 'Select Project Type',
            description: 'Choose the type of project you want to create.',
            content: <ProjectTypeSelector selectedProjectType={selectedProjectType} onProjectTypeSelect={(type) => handleProjectSelection('selectedProjectType', type)} />,
        },
        {
            header: `Select ${currentStep === 1 ? getTitleFromType(selectedProjectType) : 'Details'}`,
            description: `Provide more details about your ${currentStep === 1 ? getTitleFromType(selectedProjectType).toLowerCase() : 'selection'}.`,
            content: renderDetailsComponent(),
        },
        {
            header: 'Additional Details',
            description: 'Provide additional details for the selected project type.',
            content: renderAdditionalDetails(),
        },
        {
            header: 'Step 4: Additional Form',
            description: 'Fill out additional information for your project.',
            content: renderAdditionalDetailsVideoProduct(),
        },
        {
            header: 'Step 5: Project Summary',
            description: 'Here is the summary of your project.',
            content: renderProjectSummary(),
        },
    ];

    const renderButtons = () => (
        <div className="flex justify-center justify-end space-x-4 w-[35rem] mx-auto">
            {currentStep > 0 && <SecondaryButton className={`w-full`} onClick={prevStep}>Back</SecondaryButton>}
            {currentStep === 0 && <SecondaryButton className={`w-full`} onClick={handleCancel}>Cancel</SecondaryButton>}
            {currentStep < stepContent.length - 1 ? 
                <PrimaryButton className={`w-full`} onClick={nextStep}>Next</PrimaryButton> : 
                <PrimaryButton className={`w-full`} onClick={handleSubmit}>Submit</PrimaryButton>}
        </div>
    );
    
    return (
        <div className={`fade-in w-[90rem] h-[60rem] flex flex-col gap-4 justify-between pt-[2rem] pb-[3rem] px-[6rem] ${fadeIn ? 'opacity-1' : 'opacity-0'}`}>
            <ProjectStepper currentStep={currentStep} activeProject={getTitleFromType(selectedProjectType)} selectedDetailTitle={selectedDetailTitle} />
            <div>
                <h2 className='text-[2rem] font-light text-slate-500 text-center mb-2'>{stepContent[currentStep].header}</h2>
                <p className='text-center'>{stepContent[currentStep].description}</p>
            </div>
            <div className="my-4 h-full">
                {stepContent[currentStep].content}
            </div>
            <div className='h-[2rem]'>
                {stepError && <div className="text-red-500 h-full text-center flex justify-center items-center my-auto text-lg font-bold py-2 ">{stepError}</div>}
            </div>
            {renderButtons()}
        </div>
    );
};



export default CreateProject;
