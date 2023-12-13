import { useAuth } from '@/Components/Contexts/AuthContext';


import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react'; 
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


import CardContainer from '@/Components/Containers/CardContainer';
import Snackbar from '@mui/joy/Snackbar';
import PortalLayout from '@/Layouts/Partials/PortalLayout';

import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import CallSheetPreview from '@/Pages/Projects/CallSheets/CallSheetPreview';

import Bulletin from './Components/Bulletin';
import ProductionDetails from './Components/ProductionDetails';
import ProductionCompany from './Components/ProductionCompany';
import Locations from './Components/Locations';

import CallSheetForm from '@/Pages/Projects/CallSheets/Forms/CallSheetForm';
import LocationDrawer from '@/Pages/Projects/CallSheets/Forms/LocationDrawer';

import { faInfo, faPeopleGroup, faEye } from '@fortawesome/free-solid-svg-icons';
 


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





    

    const handleOnSavedClick = () => {
        setSavedCallSheetSettings(true);
    
        // Set a timeout to reset the state after 1000 milliseconds (1 second)
        setTimeout(() => {
            setSavedCallSheetSettings(false);

        }, 3000);
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

                    <LocationDrawer
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
                                                    <ProductionCompany user={user} data={callSheet} />
                                                    <Bulletin data={callSheet} onBulletinTextChange={handleBulletinTextChange} />
                                                    <div className='flex flex-row gap-4'>
                                                        <CardContainer className="" header="Producer">
                                                            {/* <h2>Levi Elizaga</h2>
                                                            <span className='text-red-400'>Unconfirmed</span> */}
                                                            <p className='text-center h-full w-full flex items-start text-sm'>No Producer has been assigned to this Project</p>
                                                        </CardContainer>
                                                        <CardContainer header="Director">
                                                            {/* <h2>Levi Elizaga</h2>
                                                            <span className='text-red-400'>Unconfirmed</span> */}
                                                            <p className='text-center h-full w-full flex items-start text-sm'>No Director has been assigned to this Project</p>
                                                        </CardContainer>
                                                    </div>
                                                    <CardContainer className="h-full flex flex-col" header="Recipients">
                                                        
                                                    </CardContainer>
                                                </div>
                                                <div className='col-3 w-full right-col-content flex flex-col gap-4 h-full'>
                                                    <div className='flex flex-col gap-4 h-full'>
                                                        <CardContainer className="h-full" header="Production Schedule">
                                                            <div className='text-center m-auto flex flex-col gap-4'>
                                                                <p className='secondary-color text-lg w-2/3 mx-auto'>You have not entered a production schedule yet. Click here to add a schedule for your production</p>
                                                                <SecondaryButton className="mx-auto">Add a production schedule</SecondaryButton>
                                                            </div>
                                                        </CardContainer>
                                                        <CardContainer className="h-full" header="Atmosphere">
                                                                <div className='flex flex-col text-center m-auto gap-4'>
                                                                    <p className='secondary-color text-lg w-2/3 mx-auto'>You have not entered a atmosphere yet. Click here to add a atmosphere for your production</p>
                                                                    <SecondaryButton className="mx-auto">Add an atmosphere</SecondaryButton>
                                                                </div>
                                                        </CardContainer>
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
 