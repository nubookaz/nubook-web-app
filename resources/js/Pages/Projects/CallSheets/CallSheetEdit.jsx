import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Banner from '@/Components/Layouts/Banner';
import Toolbar from '@/Components/Layouts/Toolbar';
import CardContainer from '@/Components/Containers/CardContainer';
import {  faInfo, faPeopleGroup, faEye } from '@fortawesome/free-solid-svg-icons';
import Textarea from '@mui/joy/Textarea';
import SlideUpModal from '@/Components/Modals/SlideUpModal'; 
import CallSheetPreview from '@/Components/CallSheets/CallSheetPreview';







function CallSheetEdit({ auth, callSheet }) {
    const { project } = usePage().props;
    const [isSlideUpModalOpen, setIsSlideUpModalOpen] = useState(false);


    const handleBackClick = () => {
        // Use the route function to generate the URL for the "Projects Overview" page
        const url = route('projects.callSheets.index'); // Replace with your actual route name
      };


    const actionButtons = [
    {
        icon: faInfo, // Replace with your FontAwesome icon
        onClick: () => {
        // Define the action to be taken when this button is clicked
        console.log('Action button 1 clicked');
        },
        isActive: true, // Initially active

    },
    {
        icon: faPeopleGroup, // Replace with another FontAwesome icon
        onClick: () => {
            console.log('Action button 2 clicked');
        },
        isActive: false, // Initially active

    },
    {
        icon: faEye, // Replace with another FontAwesome icon
        onClick: () => {
            handleSlideUpModalOpen();
            console.log('Action button 3 clicked');
        },
        isActive: false, // Initially active

    },
    ];
      

    const handleSlideUpModalClose = () => {
        setIsSlideUpModalOpen(false);
      };
    
      const handleSlideUpModalOpen = () => {
        setIsSlideUpModalOpen(true);
      };



  return (


    <AuthenticatedLayout user={auth.user} showBanner={true} showPortalBody={true}>
        {{
            surface: <div className="relative z-50 w-full h-full">

                        <SlideUpModal isOpen={isSlideUpModalOpen} onClose={handleSlideUpModalClose}>
                             <CallSheetPreview />
                        </SlideUpModal>

                     </div>,
            banner: <Banner size="small-banner-buttons" showLeftContent={false} showProfilePhoto={false}  project={project}  />,
            portalBody: (
                    <div className="w-full h-full pt-[6rem]">
                        <Toolbar
                            onBackClick={handleBackClick}
                            href={
                                route('projects.callSheets.index', { id: project.id })
                            }
                            actionButtons={actionButtons}
                            title={callSheet.callSheetTitle}
                            cta_text="Send"
                            >

                                <div className='flex flex-row gap-4 w-full h-full'>
                                    <div className='row-1 w-full left-col-content'>
                                        <CardContainer className="h-full" header="Production and Location Details"></CardContainer>
                                    </div>
                                    <div className='row-2 w-[155rem]  enter-col-content flex flex-col gap-4 h-full'>
                                        <CardContainer className="h-[16rem]" header="Bulletin">
                                            <Textarea name="Soft" size="sm" variant="soft" minRows={3} placeholder="Type anything…" />
                                        </CardContainer>
                                        <CardContainer className="h-full" header="Recipients"></CardContainer>
                                    </div>
                                    <div className='row-3 w-full right-col-content flex flex-col gap-4 h-full'>
                                        <div className='flex flex-row gap-4 h-[12rem]'>
                                            <CardContainer className="h-full" header="Production Company"></CardContainer>
                                            <CardContainer className="h-full" header="Weather Details"></CardContainer>
                                        </div>
                                        <div className='flex flex-col gap-4 h-full'>
                                            <CardContainer className="h-[33rem]" header="Production Schedule"></CardContainer>
                                            <CardContainer className="h-full" header="Atmosphere"></CardContainer>
                                        </div>

                                    </div>
                                </div>
                        </Toolbar>
                    </div>
                ),
        }}
    </AuthenticatedLayout>


  );
}

export default CallSheetEdit;
