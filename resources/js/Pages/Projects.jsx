import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useState, useEffect } from 'react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProjectForm from '@/Pages/Projects/Forms/ProjectForm';
import ProjectList from '@/Components/Projects/ProjectList';
import PortalLayout from '@/Layouts/Partials/PortalLayout';
import CardContainer from '@/Components/Containers/CardContainer';

import Overview from '@/Components/Projects/Overview';
import Budget from '@/Components/Projects/Budget';
import TertiaryButton from '@/Components/Buttons/TertiaryButton';
import Modal from '@/Components/Modals/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faRocket } from '@fortawesome/free-solid-svg-icons';
 
export default function Projects({ auth }) {
    const { user, fetchUserData } = useAuth();

    useEffect(() => {
      // Fetch user data on component mount
      fetchUserData();
    }, []);

    useEffect(() => {
      // Continue with the rest of your component logic using 'user'
      if (user === null) {
        // User data is still being fetched, show a loading state or return null
        console.log('loading...');
      } else {

        // ... rest of your component code ...
      }
    }, [user]);












  

    const projects = user && user.projects || []; // Use an empty array as a fallback if 'projects' prop is undefined
    const [currentStep, setCurrentStep] = useState(1);
    const [isDrawerPanelOpen, setDrawerPanelOpen] = useState(false);
    const [closeModal, setCloseModal] = useState(false);
    const [div, showDiv] = useState(false);


    const openModal = () => {
      setCloseModal(true);
    };


    const bannerProps = {
      showGreeting: true, // Customize these props based on your conditions
    };

    const toggleDrawerPanel = () => {
      setDrawerPanelOpen(!isDrawerPanelOpen);
    };



    

 
    const hasData = projects;
    const toolbarTitle = "Project Overview"; // Provide a title for the toolbar
    const pageType = "Projects"; // Provide a title for the toolbar
    const toolbarCTAText = "Start A New Project"; // Provide the button text
    const buttonText = "Start a New Project"; // Provide the button text
    const customSvgPath = "../../images/svg_images/undraw_projects_1.svg"; // Provide the SVG path

    const emptyContentSvg = "../../images/svg_images/undraw_clients.svg"; // Provide the SVG path

    const limitedProjects = projects.slice(0, 8);
 
 
 
 
 
 
    return (

      <AuthenticatedLayout bannerProps={bannerProps}>
        {{
          surface: (

            <div className="relative z-50 w-full h-full">


                <Modal
                  show={closeModal}
                  maxWidth='100%'
                  dialogPanelClass='h-full'
                  onClose={setCloseModal}
                >
                  <div className='flex flex-col gap-10 max-w-[50rem] justify-center h-full w-full mx-auto'>
                   
                      {div ? (
                          <div>
                            <ProjectForm
                              auth={auth}
                              currentStep={currentStep}
                              setCurrentStep={setCurrentStep}
                              // isDrawerPanelOpen={isDrawerPanelOpen}
                              // toggleDrawerPanel={setDrawerPanelOpen}
                            />         
                          </div>
                      ) : (
                        <>
                          <div className='text-center'>
                            <h2>Choose an option below</h2>
                            <p>To get started, we invite you to choose between creating an estimate or initiating a project. Whether you're looking to plan your next client project or embark on a passion project close to your heart, making this choice will set you on the right path towards your goal. Select the option that aligns with your current needs, and we'll guide you through the process step by step.</p>
                          </div>
                        <div className='flex flex-row gap-8 justify-center'>
                          <div className='shadow-md border-slate-100 duration-300 cursor-pointer hover:bg-white hover:border-white hover:shadow-2xl rounded-md text-center w-[9rem] h-[9rem] justify-center flex flex-col gap-2 p-4'>
                            <FontAwesomeIcon className='text-2xl primary-color' icon={faCalculator}></FontAwesomeIcon>
                            <p className='text-sm'>Start with an Estimate</p>
                          </div>
                            <div onClick={showDiv} className='shadow-md border-slate-100 duration-300 cursor-pointer hover:bg-white hover:border-white hover:shadow-2xl rounded-md text-center w-[9rem] h-[9rem] justify-center flex flex-col gap-2 p-4'>
                              <FontAwesomeIcon className='text-2xl primary-color' icon={faRocket}></FontAwesomeIcon>
                              <p className='text-sm'>Create a Project</p>
                          </div>
                          </div>

                        </>
                        
                      )}


                  </div>
                </Modal>
            </div>

          ),

          portalBody: (
            <div className="w-full h-full">

                <PortalLayout
                    hasData={hasData}
                    toolbarTitle={toolbarTitle}
                    pageType={pageType}
                    toolbarCTAText={toolbarCTAText}
                    buttonText={buttonText}
                    customSvgPath={customSvgPath}
                    onEmptyButtonClick={openModal}
                    onPrimaryToolbarButtonClick={openModal}
                    >
                  {{


                      content: (
                        <div className='flex flex-col gap-6 h-full max-h-[1080px]'>
                          <div className='flex flex-row gap-6 h-[35%]'>
                            
                            <CardContainer absoluteHeader={true} header="Summary" className='!w-1/2 text-center'>
                              <Overview
                                  projects={projects}
                                  isPortrait={false}
                                  multiCircularProgressSize="w-[220px] h-[220px]"
                              />
                            </CardContainer>

                            <CardContainer header="Budget" className='!w-1/2'>
                              <Budget 
                                projects={projects}
                              />
                            </CardContainer>
                          </div>
                          <div className='flex flex-row gap-6 h-[65%] w-full'>
                            <div className='enclosure bg-[blanchedalmond] '>
                              <div className='flex flex-col h-full justify-between gap-6'>
                                <div className='flex flex-row justify-between'>
                                  <h2>Projects</h2>
                                  {limitedProjects.length >= 8 ? (
                                    <TertiaryButton href={route('projects.list')}>View All Projects</TertiaryButton>
                                  ) : null}
                                </div>
                                <ProjectList projects={limitedProjects} view="View All" cols="4" rows="2"/>
                              </div>
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
 
