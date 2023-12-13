import { usePage } from '@inertiajs/react';
import React, { useState } from 'react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PortalLayout from '@/Layouts/Partials/PortalLayout';

import ProjectForm from '@/Pages/Projects/Forms/ProjectForm';
import ProjectList from '@/Pages/Projects/Components/ProjectList';

import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Modal from '@/Components/Modals/Modal';



export default function ProjectListPage({ auth }) {
    const { props } = usePage();
    const projects = props.projects || []; // Use an empty array as a fallback if 'projects' prop is undefined
    const [currentStep, setCurrentStep] = useState(1);
    const [isProjectFormPanel, setProjectFormPanel] = useState(false);
    const [projectView, setProjectView] = useState("View All");
    const [closeModal, setCloseModal] = useState(false);


    const openModal = () => {
        setCloseModal(true);
      };



    const bannerProps = {
        showGreeting: true, // Customize these props based on your conditions
      };

    const openProjectFormPanel = () => {
        setProjectFormPanel(!isProjectFormPanel);
    };
  
    const hasData = projects;
    const toolbarTitle = "All Projects"; // Provide a title for the toolbar
    const pageType = "Projects"; // Provide a title for the toolbar
    const toolbarCTAText = "Start A New Project"; // Provide the button text
    const backButtonHref = route('projects.index'); 

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
                        backButtonHref={backButtonHref}
                        onPrimaryToolbarButtonClick={openModal}
                        >
                        {{

                            middle: (

                                <Select
                                    defaultValue="View All"
                                    value={projectView}
                                    required
                                    onChange={(e, newValue) => {
                                    console.log('Select Value', newValue);
                                    setProjectView(newValue); // Update the selected option
                                    }}
                                >
                                    <Option value="View All" default>View All</Option>
                                    <Option value="Completed">Completed</Option>
                                    <Option value="Production">Production</Option>
                                    <Option value="Post-Production">Post-Production</Option>
                                    <Option value="Pre-Production">Pre-Production</Option>
                                    <Option value="Creative Developement">Creative Developement</Option>
                                    <Option value="Estimate">Estimate</Option>
                                </Select>                      
                            ),


                            content: (
                                <ProjectList cardHeight='max-h-[15rem]' projects={projects} view={projectView} cols="4" rows="4"/>
                            )
                        }}
    
                    </PortalLayout>

                
                </div>
            ),
            }}
        </AuthenticatedLayout>

    );
}