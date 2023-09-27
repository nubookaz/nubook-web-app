import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CardContainer from '@/Components/Containers/CardContainer';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { router } from '@inertiajs/react'; // Import the router object
import {  faInfo, faPeopleGroup, faEye, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import Textarea from '@mui/joy/Textarea';
import SlideUpModal from '@/Components/Modals/SlideUpModal'; 
import CallSheetPreview from '@/Components/CallSheets/CallSheetPreview';
import PortalLayout from '@/Components/Layouts/PortalLayout';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import LinearProgress from '@mui/joy/LinearProgress';
import PageButton from '@/Components/Buttons/PageButton'; 
import Typography from '@mui/joy/Typography';

import NewLocationForm from '@/Pages/Projects/CallSheets/Locations/NewLocationForm';






function CallSheetEdit({ auth }) {
    const { project } = usePage().props;
    const { callSheet } = usePage().props;
    const { locations } = usePage().props;

    const [callSheetStatus, setCallSheetStatus] = useState(callSheet.status || 'Draft');
    const [text, setText] = React.useState('');
    const maxLength = 400; // Set your desired maximum character length
    const remainingCharacters = maxLength - text.length;
    const [modalContent, setModalContent] = useState(null); // State for modal content

    const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
    const toggleRightPanel = () => {
      console.log("click");
      setIsRightPanelOpen(!isRightPanelOpen);
    };

    const [callSheetData, setCallSheetData] = useState({
        callSheetID: callSheet.id || '',
        callSheetTitle: callSheet.callSheetTitle || '',
        callSheetDate: callSheet.callSheetDate || '',
        bulletin: callSheet.bulletin || '',
      });

      
      console.log(locations);

    const bannerProps = {
        showGreeting: true, // Customize these props based on your conditions
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
            handleSlideUpModalOpen();
        },
        isActive: false, // Initially active

    },
    ];

    const [isSlideUpModalOpen, setIsSlideUpModalOpen] = useState(false);
    const handleSlideUpModalClose = () => {
        setIsSlideUpModalOpen(false);
      };
    
    const handleSlideUpModalOpen = () => {
        setIsSlideUpModalOpen(true);
    };


   function formatDateWithDay(dateString) {
        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    const hasData = callSheet;
    const toolbarTitle = callSheet.callSheetTitle; // Provide a title for the toolbar
    const toolbarCTAText = "Send Call Sheet"; // Provide the button text
    const buttonText = "Create a New Call Sheet"; // Provide the button text
    const customSvgPath = "../../images/svg_images/undraw_call_sheets_1.svg"; // Provide the SVG path
    const backButtonHref = route('projects.callSheets.index', { id: project.id }); 


   // Separate function for updating the status
const updateStatus = (newStatus) => {
    // Create a callSheetData object with the updated status
    const callSheetData = {
      ...callSheet,
      status: newStatus
    };
  
    // Send a PATCH request to update the call sheet status
    router.patch(
      route('projects.callSheets.update', {
        id: project.id,
        callSheetId: callSheet.id
      }),
      callSheetData,
      {
        onSuccess: () => {
          // Handle a successful response for status update
          console.log('Call sheet status updated successfully', newStatus);
  
          // Redirect to the projects index page or perform any other actions
          router.get(
            route('projects.callSheets.edit', {
              id: project.id,
              callSheetId: callSheet.id
            })
          );
        },
        onError: (error) => {
          // Handle errors for status update
          console.error('Error updating call sheet status:', error);
        }
      }
    );
  };
  
  // Separate function for saving bulletin
  const saveBulletin = () => {
    // Save the current textarea content to callSheet.bulletin
    const callSheetData = {
      ...callSheet,
      bulletin: text
    };
  
    // Send a PATCH request to update the bulletin
    router.patch(
      route('projects.callSheets.update', {
        id: project.id,
        callSheetId: callSheet.id
      }),
      callSheetData,
      {
        onSuccess: () => {
          // Handle a successful response for bulletin update
          console.log('Call sheet bulletin saved successfully', text);
  
          // Redirect to the projects index page or perform any other actions
          router.get(
            route('projects.callSheets.edit', {
              id: project.id,
              callSheetId: callSheet.id
            })
          );
        },
        onError: (error) => {
          // Handle errors for bulletin update
          console.error('Error saving call sheet bulletin:', error);
        }
      }
    );
  };
  
  // Your handleStatusChange function remains the same
  const handleStatusChange = (value) => {
    setCallSheetStatus(value);
    // Call the updateStatus function to update the status
    updateStatus(value);
  };
  
  // Your handleSaveButton function remains the same
  const handleSaveButton = () => {
    console.log("Save!!");
    // Call the saveBulletin function to save the bulletin
    saveBulletin();
  };
  
    
    








  const openLocationPanel = () => {
    // Set the content component for the "Add a location" button click
    toggleRightPanel(true);
  };









return (


    <AuthenticatedLayout user={auth.user} project={project} bannerProps={bannerProps}>
    {{
            surface: <div className="relative z-50 w-full h-full">

                        <SlideUpModal isOpen={isSlideUpModalOpen} onClose={handleSlideUpModalClose}>
                            <CallSheetPreview />
                        </SlideUpModal>

                        <NewLocationForm
                          isRightPanelOpen={isRightPanelOpen}
                          toggleRightPanel={toggleRightPanel}
                          callSheet={callSheet}
                          project={project}
                        />

                     </div>,
            portalBody: (
                    <div className="w-full h-full">
                        <PortalLayout
                            backButtonHref={backButtonHref}
                            hasData={hasData}
                            toolbarTitle={toolbarTitle}
                            toolbarCTAText={toolbarCTAText}
                            buttonText={buttonText}
                            customSvgPath={customSvgPath}
                            actionButtons={actionButtons}
                            handleSecondaryButtonClick={handleSaveButton}
                            secondary_cta_text="save"
                            >
                                {{
                                    middle: (

                                        <Select
                                            value={callSheetStatus}
                                            className="w-[18rem]"
                                            required
                                            onChange={(e, newValue) => {
                                            handleStatusChange(newValue);
                                            }}
                                        >
                                            <Option value="Draft">Set Status to: Draft</Option>
                                            <Option value="Publish">Set Status to: Publish</Option>
                                            <Option value="Unpublish">Set Status to: Unpublish</Option>
                                        </Select>

                                        
                                    ),
                                    content: (
                                        <div className='flex flex-row gap-4 w-full h-full'>
                                            <div className='row-1 w-full left-col-content'>
                                            <CardContainer className="h-full flex flex-col" header="Production and Location Details">
                                                <div className="production-date">
                                                  <div className="text-2xl primary-color font-semibold">
                                                    <FontAwesomeIcon icon={faCalendarDays} className="mr-4 primary-green-color" />
                                                    {formatDateWithDay(callSheet.callSheetDate)}
                                                  </div>
                                                </div>
                                                {location ? (
                                                  // Render this div when a location exists
                                                  <div className="location-exists-div">
                                                    {location.name}
                                                  </div>
                                                ) : (
                                                  // Render empty-location div only if no location exists
                                                  <div className="empty-location text-center m-auto">
                                                    <p className="secondary-color text-lg w-2/3 mx-auto mb-4">
                                                      You have not entered a location yet. Click here to add a location for your production
                                                    </p>
                                                    <SecondaryButton onClick={toggleRightPanel}>Add a location</SecondaryButton>
                                                  </div>
                                                )}
                                            </CardContainer>

                                            </div>
                                            <div className='row-2 w-[155rem]  enter-col-content flex flex-col gap-4 h-full'>
                                                <CardContainer className="h-[20rem]" header="Bulletin">
                                                <Textarea 
                                                    name="Soft" 
                                                    size="sm" 
                                                    variant="soft" 
                                                    minRows={5.6} 
                                                    maxRows={6}
                                                    defaultValue={callSheet.bulletin}
                                                    placeholder="Type anything…" 
                                                    maxLength={maxLength} // Set the maximum character length
                                                    onKeyDown={(event) => {
                                                        if (event.key === 'Enter') {
                                                            event.preventDefault(); // Prevent the default behavior of Enter key
                                                            // Optionally, you can perform some other action here
                                                        }
                                                    }}
                                                    onChange={(event) => {
                                                        if (event.target.value.length <= maxLength) {
                                                            setText(event.target.value);
                                                        }
                                                    }}                                                    
                                                    endDecorator={
                                                        <Typography level="body-xs" sx={{ ml: 'auto' }}>
                                                            {text.length} / {maxLength} character(s) ({remainingCharacters} remaining)
                                                        </Typography>
                                                    }
                                                />
                                                    {/* <span className='flex justify-end'>Remaining Characters: 450</span> */}
                                                </CardContainer>
                                                <CardContainer className="h-full flex flex-col" header="Recipients">
                                                        <div className='rsvp-overview'>
                                                                <LinearProgress determinate value={75} color="success" variant="soft"/>
                                                                <div className='recipient-overview flex flex-row gap-6 mt-8'>
                                                                    <PageButton icon={faPeopleGroup} size="small"></PageButton>Clients
                                                                    <PageButton icon={faPeopleGroup} size="small"></PageButton>Crew
                                                                    <PageButton icon={faPeopleGroup} size="small"></PageButton>Talent
                                                                </div>
                                                        </div>
                                                        <div className='empty-location text-center m-auto'>
                                                            <p className='secondary-color text-lg w-2/3 mx-auto mb-4'>You have not added a recipient yet. Click here to add a recipient for your production</p>
                                                            <SecondaryButton>Add a recipient</SecondaryButton>
                                                        </div>
                                                </CardContainer>
                                            </div>
                                            <div className='row-3 w-full right-col-content flex flex-col gap-4 h-full'>
                                                <div className='flex flex-row gap-4 h-[12rem]'>
                                                    <CardContainer className="h-full">
                                                        
                                                    </CardContainer>
                                                    <CardContainer className="h-full"></CardContainer>
                                                </div>
                                                <div className='flex flex-col gap-4 h-full'>
                                                    <CardContainer className="h-full flex flex-col" header="Production Schedule">
                                                        <div className='empty-location text-center m-auto'>
                                                            <p className='secondary-color text-lg w-2/3 mx-auto mb-4'>You have not entered a production schedule yet. Click here to add a schedule for your production</p>
                                                            <SecondaryButton>Add a production schedule</SecondaryButton>
                                                        </div>
                                                    </CardContainer>
                                                    <CardContainer className="h-full flex flex-col max-h-[14rem] " header="Atmosphere">
                                                            <div className='empty-location text-center m-auto'>
                                                                <p className='secondary-color text-lg w-2/3 mx-auto mb-4'>You have not entered a atmosphere yet. Click here to add a atmosphere for your production</p>
                                                                <SecondaryButton>Add an atmosphere</SecondaryButton>
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

export default CallSheetEdit;
