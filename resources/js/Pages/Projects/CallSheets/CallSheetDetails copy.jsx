import { useAuth } from '@/Components/Contexts/AuthContext';


import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react'; 
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


import CardContainer from '@/Components/Containers/CardContainer';
import Snackbar from '@mui/joy/Snackbar';
import PortalLayout from '@/Layouts/Partials/PortalLayout';

import CallSheetPreview from '@/Pages/Projects/CallSheets/CallSheetPreview';

import Bulletin from './Components/Bulletin';
import ProductionDetails from './Components/ProductionDetails';
import GeneralCallTime from './Components/GeneralCallTime';
import ProductionCompany from './Components/ProductionCompany';
import Locations from './Components/Locations';

import CallSheetForm from '@/Pages/Projects/CallSheets/Forms/CallSheetForm';
import CallSheetLocationForm from '@/Pages/Projects/CallSheets/Forms/CallSheetLocationForm';
import CallSheetProductionSchedule from '@/Pages/Projects/CallSheets/CallSheetProductionSchedule';

import { faInfo, faPeopleGroup, faEye } from '@fortawesome/free-solid-svg-icons';
import WeatherContainer from './Components/WeatherContainer';
import ProductionSchedule from './Components/ProductionSchedule';
 


export default function CallSheetDetails() {
    const { user, fetchUserData } = useAuth();

    useEffect(() => {
        // Fetch user data on component mount
        fetchUserData();
    }, []);







    const { project, callSheet } = usePage().props;
    const [newData, setNewData] = useState('');
    const newCallSheetData = newData ? newData : callSheet;
    const [savedCallSheetSettings, setSavedCallSheetSettings] = useState(false);
    
    const hasData = callSheet;
    const toolbarTitle = callSheet.call_sheet_name; // Provide a title for the toolbar
    const toolbarCTAText = "Send Call Sheet"; // Provide the button text
    const buttonText = "Create a New Call Sheet"; // Provide the button text
    const customSvgPath = "../../images/svg_images/undraw_call_sheets_1.svg"; // Provide the SVG path
    const backButtonHref = route('projects.callSheets.index', { id: project.id }); 

    const [isProjectFormPanel, setProjectFormPanel] = useState(false);

    const [isEditLocationDrawerOpen, toggleEditLocationDrawer] = useState(false);
    const [isEditProductionDetailsOpen, toggleEditProductionDetailsDrawer] = useState(false);

    const [callSheetStatus, setCallSheetStatus] = useState(callSheet.status || 'Draft');
    const [bulletinText, setBulletinText] = useState('');

    const [isPreviewDrawerOpen, togglePreviewDrawer] = useState(false);
    const [isProductionScheduleDrawerOpen, toggleProductionScheduleDrawer] = useState(false);

 
    
    const handleOnSavedClick = () => {
    
        // Construct the URL for the request
        const url = route('projects.callSheets.update.bulletin', { id: project.id, callSheetId: callSheet.id });
    
        axios.put(url, { 
            bulletin: bulletinText
        })
        .then(response => {
             setSavedCallSheetSettings(true);
        
            // Reset the state after 3 seconds
            setTimeout(() => {
                setSavedCallSheetSettings(false);
            }, 3000);
        })
        .catch(error => {
            console.error('Error saving bulletin:', error);
        });
    };


    // Optional: If you want to reset the state when the component unmounts
    useEffect(() => {
        return () => {
            clearTimeout(); // Clear the timeout to avoid state updates on unmounted components
        };
    }, []);

    const bannerProps = {
        showTopBar: false, 
        showRightContent: false,
        size: 'page-banner',
    };

    const actionButtons = [
        {
            icon: faInfo, // Replace with your FontAwesome icon
            onClick: () => {
            // Define the action to be taken when this button is clicked
            },
            isActive: true, // Initially active
        },
        {
            icon: faPeopleGroup, // Replace with another FontAwesome icon
            onClick: () => {
            },
            isActive: false, // Initially active
        },
        {
            icon: faEye, // Replace with another FontAwesome icon
            onClick: () => {
                handlePreviewDrawer();
            },
            isActive: false, // Initially active
        },
    ];







    const handlePreviewDrawer = () => {
        togglePreviewDrawer(true);
    };

    const handleProductionScheduleDrawer = () => {
        toggleProductionScheduleDrawer(true);
    };
    
    const handleBulletinTextChange = (text) => {
        setBulletinText(text);
     };    

    const handleEditProductionDetails = () => {
        toggleEditProductionDetailsDrawer(true);
    };

    const handleEditLocation = () => {
        toggleEditLocationDrawer(true);
    };

 




  return (

 
        <AuthenticatedLayout project={project} bannerProps={bannerProps}>
        {{
                surface: 
                <div className="relative z-50 w-full h-full">

                    <Snackbar
                        color="success"
                        size="lg"
                        variant="solid"
                        open={savedCallSheetSettings}
                        className="w-full max-w-[30rem]"
                    >
                        Saved! Call Sheet Details Saved!
                    </Snackbar>

                    <CallSheetForm
                        isDrawerPanelOpen={isEditProductionDetailsOpen}
                        toggleDrawerPanel={toggleEditProductionDetailsDrawer}
                        data={callSheet}
                        newData={setNewData}
                        mode='edit'
                    />

                    <CallSheetLocationForm
                        isDrawerPanelOpen={isEditLocationDrawerOpen}
                        toggleDrawerPanel={toggleEditLocationDrawer}
                        data={callSheet}
                        newData={setNewData}
                    />

                    <CallSheetPreview 
                        data={callSheet} 
                        isDrawerPanelOpen={isPreviewDrawerOpen} 
                        toggleDrawerPanel={togglePreviewDrawer}
                    />

                    <CallSheetProductionSchedule 
                        data={callSheet} 
                        isDrawerPanelOpen={isProductionScheduleDrawerOpen} 
                        toggleDrawerPanel={toggleProductionScheduleDrawer}
                    />

                </div>,
                portalBody: (
                        <div className="w-full h-full">
                            <PortalLayout
                                callSheetData={newCallSheetData}
                                backButtonHref={backButtonHref}
                                hasData={hasData}
                                toolbarTitle={toolbarTitle}
                                toolbarCTAText={toolbarCTAText}
                                buttonText={buttonText}
                                customSvgPath={customSvgPath}
                                actionButtons={actionButtons}
                                handleSecondaryButtonClick={handleOnSavedClick}
                                secondary_cta_text="Save"
                                >
                                    {{
    
                                        content: (
                                            <div className='flex flex-row gap-4 w-full h-full'>
                                                <div className='col-1 w-full flex flex-col left-col-content gap-4'>
                                                    <ProductionDetails data={callSheet} newData={newData} onEditProductionDetails={handleEditProductionDetails}/>
                                                    <Locations data={callSheet} newData={newData} onEditLocation={handleEditLocation}/>
                                                </div>
                                                <div className='col-2 w-[155rem]  enter-col-content flex flex-col gap-4 h-full'>
                                                    <div className='flex flex-row gap-4'>
                                                        <ProductionCompany user={user} data={callSheet} />
                                                        <GeneralCallTime data={callSheet} newData={newData} onEditProductionDetails={handleEditProductionDetails}/>
                                                    </div>
                                                    <Bulletin data={callSheet} onBulletinTextChange={handleBulletinTextChange} />
                                                    <div className='flex flex-row gap-4'>
                                                        <CardContainer className="" header="Producer">
                                                            <p className='text-center h-full w-full flex items-start text-sm'>No Producer has been assigned to this Project</p>
                                                        </CardContainer>
                                                        <CardContainer header="Director">
                                                            <p className='text-center h-full w-full flex items-start text-sm'>No Director has been assigned to this Project</p>
                                                        </CardContainer>
                                                        <CardContainer header="Assistant Director">
                                                            <p className='text-center h-full w-full flex items-start text-sm'>No Asssistant Director has been assigned to this Project</p>
                                                        </CardContainer>
                                                    </div>
                                                    <CardContainer className="h-full flex flex-col" header="Recipients">
                                                        
                                                    </CardContainer>
                                                </div>
                                                <div className='col-3 w-full right-col-content flex flex-col gap-4 h-full'>
                                                    <div className='flex flex-col gap-4 h-full'>
                                                        <WeatherContainer data={callSheet} newData={newData} />
                                                        <ProductionSchedule data={callSheet} onClick={handleProductionScheduleDrawer}/>
                                                    </div>
            
                                                </div>
                                            </div>
                                        )
                                    }}

                                </PortalLayout>

                        </div>
                    ),
            }}
        </AuthenticatedLayout>

    );

}
 