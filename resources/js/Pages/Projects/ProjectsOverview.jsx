import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';


import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Banner from '@/Components/Layouts/Banner';
import EmptyContent from '@/Components/Layouts/EmptyContent';
import ProjectForm from '@/Pages/Projects/NewProjectForm';
import ProjectList from '@/Pages/Projects/Partials/ProjectList';
import Toolbar from '@/Components/Layouts/Toolbar';


function ProjectsOverview({ auth, showBanner }) {
  const { props } = usePage();
  const project = props.projects || []; // Use an empty array as a fallback if 'projects' prop is undefined
  const companies = props.companies || []; // Use an empty array as a fallback if 'projects' prop is undefined

  const [currentStep, setCurrentStep] = useState(1);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [projectData, setProjectData] = useState({
    projectID: project.id || '',
    projectName: project.projectName || '',
    projectType: project.projectType || '',
    projectDescription: project.projectDescription || '',
    projectBudget: project.projectBudget || 0,
    categoryType: project.categoryType || '',
    projectStage: project.projectStage || '',
    projectDays: project.projectDays || 0,
    projectMonths: project.projectMonths || 0,
    projectYears: project.projectYears || 0,
    // Add other project-related fields here
  });

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
    console.log("Click!!");
  };

  console.log(props.projects);



  return (

    <AuthenticatedLayout user={auth.user} showBanner={true} showPortalBody={true}>
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

        banner: <Banner size="small" showLeftContent={true} showProfilePhoto={true} projectData={projectData} />,
      
        portalBody: (
          <div className="w-full h-full">

            <Toolbar
              onBackClick={handleBackClick}
              title="Projects Overview"
              cta_text="Create a New Project"
              onButtonClick={toggleRightPanel}
            >
              {hasProjects() ? ( // Corrected: Call the function with parentheses

                <ProjectList projects={project} />

              ) : (

                <EmptyContent
                  customSvgPath="../images/svg_images/undraw_projects_1.svg"
                  buttonText="Create a Project Now"
                  onButtonClick={toggleRightPanel}
                >
                    <h2 className="mb-4">No projects have been created</h2>
                    <p className="mb-4 p-base">
                      Currently, there are no active projects. Please click the button below to create a project now.
                    </p>
                </EmptyContent>

              )}
            </Toolbar>
           
          </div>
        ),
      }}
    </AuthenticatedLayout>

  );
}

export default ProjectsOverview;
