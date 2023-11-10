import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProjectForm from '@/Pages/Projects/Projects/NewProjectForm';
import ProjectList from '@/Components/Projects/ProjectList';
import PortalLayout from '@/Components/Layouts/PortalLayout';
import CardContainer from '@/Components/Containers/CardContainer';

import EmptyContent from '@/Components/Layouts/EmptyContent';
import Overview from '@/Components/Projects/Overview';
import Budget from '@/Components/Projects/Budget';
import TertiaryButton from '@/Components/Buttons/TertiaryButton';



function ProjectsOverview({ auth }) {
    const { props } = usePage();
    const projects = props.projects || []; // Use an empty array as a fallback if 'projects' prop is undefined
    const [currentStep, setCurrentStep] = useState(1);
    const [isProjectFormPanel, setProjectFormPanel] = useState(false);

    const bannerProps = {
      showGreeting: true, // Customize these props based on your conditions
    };

    const openProjectFormPanel = () => {
      setProjectFormPanel(!isProjectFormPanel);
    };

    const hasClients = projects.some(projects => projects.clients && projects.clients.length > 0);

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
                <ProjectForm
                  auth={auth}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  isRightPanelOpen={isProjectFormPanel}
                  toggleRightPanel={openProjectFormPanel}
                />
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
                    toggleRightPanel={openProjectFormPanel}
                    >
                  {{


                      content: (
                        <div className='flex flex-col gap-6 h-full max-h-[1080px]'>
                          <div className='flex flex-row gap-6 h-[35%]'>
                          <CardContainer header="Summary" className='!w-1/2 text-center'>
                            <Overview
                                projects={projects}
                                isPortrait={false}
                            />
                          </CardContainer>

                            
                            <CardContainer header="Budget" className='!w-1/2'>
                              <Budget 
                                projects={projects}
                              />
                            </CardContainer>
                          </div>
                          <div className='flex flex-row gap-6 h-[65%] w-full'>
                            <CardContainer header="Clients" className='!w-[30%]'>
                            {hasClients ? (
                                <div>
                                  Clients!
                                </div>
                            ): (
                                <EmptyContent
                                  customSvgPath={emptyContentSvg}
                                  buttonText={buttonText}
                                  onButtonClick={openProjectFormPanel}
                                  svgWidth="!max-w-[12rem] !mt-2 !mb-10"
                                > 
                                  <h3 className='mb-4'>No Clients Attached</h3>
                                  <p className='-mb-8'>You currently don't have any projects attached to a client. Either start a new project or attach a client to an existing project.</p>
                                </EmptyContent>
                            )}
                            </CardContainer>
                            <div className='flex flex-col w-full h-full'>
                              <div className='flex flex-row justify-between mb-4'>
                                <h2>Projects</h2>
                                {limitedProjects.length >= 8 ? (
                                  <TertiaryButton href={route('projects.list')}>View All Projects</TertiaryButton>
                                ) : null}
                              </div>
                              <ProjectList projects={limitedProjects} view="View All"/>
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

export default ProjectsOverview;
