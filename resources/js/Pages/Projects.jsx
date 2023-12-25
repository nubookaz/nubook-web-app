import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useState, useEffect } from 'react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProjectForm from '@/Pages/Projects/Forms/ProjectForm';
import ProjectList from '@/Pages/Projects/Components/ProjectList';
import PortalLayout from '@/Layouts/Partials/PortalLayout';
import CardContainer from '@/Components/Containers/CardContainer';

import Overview from '@/Components/Projects/Overview';
import Budget from '@/Components/Projects/Budget';
import TertiaryButton from '@/Components/Buttons/TertiaryButton';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'; 

import Modal from '@/Components/Modals/Modal';
   
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
    const [isDrawerPanelOpen, setDrawerPanelOpen] = useState(false);
    const [closeModal, setCloseModal] = useState(false);
 

    const openModal = () => {
      setCloseModal(true);
    };


    const bannerProps = {
      showGreeting: true, // Customize these props based on your conditions
    };



    

 
    const hasData = projects;
    const toolbarTitle = "Project Overview"; // Provide a title for the toolbar
    const pageType = "Projects"; // Provide a title for the toolbar
    const toolbarCTAText = "Start A New Project"; // Provide the button text
    const buttonText = "Start a New Project"; // Provide the button text
    const customSvgPath = "../../images/svg_images/undraw_projects_1.svg"; // Provide the SVG path

    const emptyContentSvg = "../../images/svg_images/undraw_clients.svg"; // Provide the SVG path

    const limitedProjects = projects.slice(0, 4);
 
 
 
 
 
 
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
                  showCloseButton='true'
                >
               
                    <ProjectForm
                      auth={auth}
                    />         
                     
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
                                  {limitedProjects.length >= 4 ? (
                                    <TertiaryButton icon={faCaretRight} href={route('projects.list')}>View All Projects</TertiaryButton>
                                  ) : null}
                                </div>
                                <ProjectList projects={limitedProjects} view="View All" cols="4" rows="1"/>
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
 
