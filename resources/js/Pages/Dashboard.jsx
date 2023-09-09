import React, { useState, useEffect } from 'react';

import CircularProgress from '@mui/joy/CircularProgress';
import LinearProgress from '@mui/joy/LinearProgress';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import CardContainer from '@/Components/Containers/CardContainer';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import ToggleSwitch from '@/Components/Forms/ToggleSwitch';
import CircularButton from '@/Components/Buttons/CircularButton';
import ScheduleContainer from '@/Components/Schedule/ScheduleContainer';
import CallSheetCard from '@/Components/CallSheets/CallSheetCard';
import CallSheetPreview from '@/Components/CallSheets/CallSheetPreview';
import PricingPackages from '@/Components/PricingEstimate/PricingPackages';

import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionGroup from '@mui/joy/AccordionGroup';
import AccordionSummary from '@mui/joy/AccordionSummary';

import MultiCircularProgress from '@/Components/ProgressBars/MultiCircularProgress';

import Banner from '@/Components/Layouts/Banner';
import SlideUpModal from '@/Components/Modals/SlideUpModal'; 

import Modal from '@/Components/Modals/Modal';
import { faDesktop, faSearch, faEnvelope, faMobileScreen, faMessage, faCircleInfo, faMapLocation, faCalendarDays, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

import TextInput from '@/Components/Forms/TextInput';


export default function Dashboard({ auth, showBanner }) {

  // Right panel components
  const [showSlideOutPanel, setShowSlideOutPanel] = useState(false);

  const [data, setData] = useState([25, 30, 20, 25]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [isSlideUpModalOpen, setIsSlideUpModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  const handleToggle = (newValue) => {
    setIsToggled(newValue);
  };

  // Example function to update data dynamically
  const updateData = () => {
    const newData = [25, 50, 25, 25]; // Update data as needed
    setData(newData);
  };

  useEffect(() => {
    // Call updateData function to change the data dynamically
    // For example, you can call it in response to user actions
    updateData();
  }, []);

  const handleSlideUpModalClose = () => {
    setIsSlideUpModalOpen(false);
  };

  const handleSlideUpModalOpen = () => {
    setIsSlideUpModalOpen(true);
  };

  
  return (
    <AuthenticatedLayout user={auth.user} showBanner={true} showPortalBody={true}>
      {{
        surface: (
          <div className="relative w-full h-full">

            <SlideUpModal isOpen={isSlideUpModalOpen} onClose={handleSlideUpModalClose}>
              <CallSheetPreview />
            </SlideUpModal>

            <Modal show={isModalOpen} onClose={closeModal}> 
                asdfasdfdsfad
            </Modal>
            
          </div>
        ),
        banner: (
          <Banner size="medium" showLeftContent={true} showProfilePhoto={true} />
        ),
        portalBody: (
          <div className="portal-body pt-[12rem] h-full w-full">
            <CardContainer header="Hello!" showButtonIcon={true}>

              <SecondaryButton onClick={toggleModal}>I am a secondary button</SecondaryButton>
              <ToggleSwitch checked={isToggled} onChange={handleToggle} />

              
              <AccordionGroup disableDivider variant="plain">
                <Accordion>
                  <AccordionSummary>Title</AccordionSummary>
                  <AccordionDetails>
                    <div className='flex flex-row gap-6 mt-8 mb-10'>
                      <PricingPackages 
                      icon={faDesktop}
                      title="Package 1" 
                      description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero" 
                      cost="$8,000"
                      />

                      <PricingPackages 
                        icon={faDesktop}
                        title="Package 1" 
                        description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero" 
                        cost="$8,000"
                      />
                    </div>

                  </AccordionDetails>
                </Accordion>
              </AccordionGroup>

              <TextInput icon={faEnvelope} placeholder="Email Address"></TextInput>


              <PrimaryButton onClick={handleSlideUpModalOpen}>Open Slide Up Modal</PrimaryButton>
              <CallSheetCard icon={faSearch} >
                </CallSheetCard>
              <CircularButton size="small" icon={faSearch}/>
                        <LinearProgress determinate value={75} color="success" variant="soft"/>

                <MultiCircularProgress
                  radius={50}
                  strokeWidth={10}
                  data={data}
                  colors={['blue', 'green', 'red', 'purple']} // Specify your colors here
                />

              <ScheduleContainer
                type="scene" // Specify 'scene', 'break', 'move', or 'eod' here
                dataInColumn2="INT" // Data for the second column
                dataInColumn3="NIGHT" // Data for the third column
              />

            </CardContainer>
          </div>
        ),
      }}
    </AuthenticatedLayout>
  );
}
