import { useAuth } from '@/Components/Contexts/AuthContext';


import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react'; 
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CardContainer from '@/Components/Containers/CardContainer';
import Snackbar from '@mui/joy/Snackbar';
import PortalLayout from '@/Layouts/Partials/PortalLayout';




import SecondaryButton from '@/Components/Buttons/SecondaryButton';

import Bulletin from '../../../Components/CallSheets/Bulletin';
import ProductionDate from '../../../Components/CallSheets/ProductionDate';
import ProductionCompany from '../../../Components/CallSheets/ProductionCompany';










export default function CallSheetDetails() {
  const { user, fetchUserData } = useAuth();

  useEffect(() => {
    // Fetch user data on component mount
    fetchUserData();
  }, []);

 





  
    const { project, callSheet } = usePage().props;

    const bannerProps = {
      showGreeting: true, // Customize these props based on your conditions
      size: 'page-banner',
    };

    const hasData = callSheet;
    const toolbarTitle = callSheet.call_sheet_name; // Provide a title for the toolbar
    const toolbarCTAText = "Send Call Sheet"; // Provide the button text
    const buttonText = "Create a New Call Sheet"; // Provide the button text
    const customSvgPath = "../../images/svg_images/undraw_call_sheets_1.svg"; // Provide the SVG path
    const backButtonHref = route('projects.callSheets.index', { id: project.id }); 


    const [savedCallSheetSettings, setSavedCallSheetSettings] = useState(false);
    const [callSheetStatus, setCallSheetStatus] = useState(callSheet.status || 'Draft');
 
    const [bulletinText, setBulletinText] = useState('');

    const handleBulletinTextChange = (text) => {
        setBulletinText(text);
        // You can perform additional actions here if necessary
    };    
 
  
 







  return (


    <AuthenticatedLayout project={project} bannerProps={bannerProps}>
    {{
            surface: <div className="relative z-50 w-full h-full">

                        <Snackbar
                            color="success"
                            size="lg"
                            variant="solid"
                            open={savedCallSheetSettings}
                            className="w-full max-w-[30rem]"
                        >
                            Saved! Call Sheet Details Saved!
                        </Snackbar>
 

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
                            // actionButtons={actionButtons}
                            // handleSecondaryButtonClick={handleSaveButton}
                            secondary_cta_text="save"
                            >
                                {{
 
                                    content: (
                                        <div className='flex flex-row gap-4 w-full h-full'>
                                            <div className='col-1 w-full flex flex-col left-col-content gap-4'>
                                              <ProductionCompany user={user} data={callSheet} />
                                              <ProductionDate data={callSheet} />
                                              <div className="h-full flex flex-col" header="Location Details">
                                                {/* {locations?.length > 0 ? (
                                                  // Render this div when a location exists
                                                  <div className="location-exists-div">
                                                    {locations.map((location) => (
                                                      <div key={location.id} className="mb-4">
                                                        {location && <LocationDetails header="Location Details" location={location} showButtonIcon={true} menuItems={locationDetailsMenu(location.id)}/>}

                                                        {location.parking_location && <LocationDetails header="Parking Details" location={location.parking_location} showButtonIcon={true} menuItems={parkingLocationDetailsMenu(location.parking_location_id)} />}

                                                        {location.hospital_location && <LocationDetails header="Hospital Details" location={location.hospital_location} showButtonIcon={true} menuItems={hospitalLocationDetailsMenu(location.hospital_location_id)} />}
                                                      </div>
                                                    ))}
                                                  </div>
                                                ) : (
                                                  // Render empty-location div only if no location exists
                                                  <CardContainer className="h-full" header="Production Location">
                                                  <div className="empty-location text-center m-auto">
                                                    <p className="secondary-color text-lg w-2/3 mx-auto mb-4">
                                                      You have not entered a location yet. Click here to add a location for your production
                                                    </p>
                                                    <SecondaryButton className="mx-auto" onClick={toggleLocationPanel}>Add a location</SecondaryButton>
                                                  </div>
                                                  </CardContainer>
                                                )} */}
                                              </div>


                                            </div>
                                            <div className='col-2 w-[155rem]  enter-col-content flex flex-col gap-4 h-full'>
                                                <Bulletin data={callSheet} onBulletinTextChange={handleBulletinTextChange} />
                                                <CardContainer className="h-full flex flex-col" header="Recipients">
                                                        {/* <div className='rsvp-overview'>
                                                                <LinearProgress determinate value={75} color="success" variant="soft"/>
                                                                <div className='recipient-overview flex flex-row gap-6 mt-8'>
                                                                    <PageButton icon={faPeopleGroup} size="small"></PageButton>Clients
                                                                    <PageButton icon={faPeopleGroup} size="small"></PageButton>Crew
                                                                    <PageButton icon={faPeopleGroup} size="small"></PageButton>Talent
                                                                </div>
                                                        </div>
                                                        <div className='empty-location text-center m-auto'>
                                                            <p className='secondary-color text-lg w-2/3 mx-auto mb-4'>You have not added a recipient yet. Click here to add a recipient for your production</p>
                                                            <SecondaryButton className="mx-auto">Add a recipient</SecondaryButton>
                                                        </div> */}
                                                </CardContainer>
                                            </div>
                                            <div className='col-3 w-full right-col-content flex flex-col gap-4 h-full'>
                                                <div className='flex flex-col gap-4 h-full'>
                                                    <CardContainer className="h-full flex flex-col" header="Production Schedule">
                                                        <div className='empty-location text-center m-auto'>
                                                            <p className='secondary-color text-lg w-2/3 mx-auto mb-4'>You have not entered a production schedule yet. Click here to add a schedule for your production</p>
                                                            <SecondaryButton className="mx-auto">Add a production schedule</SecondaryButton>
                                                        </div>
                                                    </CardContainer>
                                                    <CardContainer className="h-full flex flex-col max-h-[14rem] " header="Atmosphere">
                                                            <div className='empty-location text-center m-auto'>
                                                                <p className='secondary-color text-lg w-2/3 mx-auto mb-4'>You have not entered a atmosphere yet. Click here to add a atmosphere for your production</p>
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
 
