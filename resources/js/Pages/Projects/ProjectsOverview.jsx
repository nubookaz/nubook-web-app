import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';


import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProjectForm from '@/Pages/Projects/NewProjectForm';
import ProjectList from '@/Pages/Projects/Partials/ProjectList';
import PortalLayout from '@/Components/Layouts/PortalLayout';


function ProjectsOverview({ auth, showBanner }) {
  const { props } = usePage();
  const project = props.projects || []; // Use an empty array as a fallback if 'projects' prop is undefined
  const companies = props.companies || []; // Use an empty array as a fallback if 'projects' prop is undefined
  const [currentStep, setCurrentStep] = useState(1);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const bannerProps = {
    showGreeting: true, // Customize these props based on your conditions
  };

  const toggleRightPanel = () => {
    setIsRightPanelOpen(!isRightPanelOpen);
  };



  const hasProjects = () => {
    return props.projects && props.projects.length > 0;
  };

  const hasCompanies = () => {
    return props.companies && props.companies.length > 0;
  };

  const handleBackClick = () => {
    // Use the route function to generate the URL for the "Projects Overview" page
    const url = route('projects.index'); // Replace with your actual route name
  };


    const hasData = project;
    const toolbarTitle = "Project Overview"; // Provide a title for the toolbar
    const pageType = "Projects"; // Provide a title for the toolbar
    const toolbarCTAText = "Create a New Project"; // Provide the button text
    const buttonText = "Create a New Project"; // Provide the button text
    const customSvgPath = "../../images/svg_images/undraw_projects_1.svg"; // Provide the SVG path


  return (

    <AuthenticatedLayout user={auth.user} bannerProps={bannerProps}>
      {{
        surface: (

          <div className="relative z-50 w-full h-full">
              <ProjectForm
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                isRightPanelOpen={isRightPanelOpen}
                toggleRightPanel={toggleRightPanel}
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
                  toggleRightPanel={toggleRightPanel}
                  >
                 {{
                    content: (
                      <ProjectList projects={project} />
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
