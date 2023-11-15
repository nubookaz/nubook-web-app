import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react'; // Import the router object
import PortalLayout from '@/Layouts/Partials/PortalLayout';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Tooltip from '@mui/joy/Tooltip';

function ProjectEstimate({ auth }) {
    const { project } = usePage().props;

    const bannerProps = {
      showGreeting: true, // Customize these props based on your conditions
    };
        
    const [projectData, setProjectData] = useState({
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



    const hasData = project;
    const toolbarTitle = project.projectName; // Provide a title for the toolbar
    const toolbarCTAText = "Create a New Call Sheet"; // Provide the button text
    const buttonText = "Create a New Call Sheet"; // Provide the button text
    const customSvgPath = "../../images/svg_images/undraw_call_sheets_1.svg"; // Provide the SVG path
    const backButtonHref = route('projects.index'); 

  return (
    <AuthenticatedLayout user={auth.user} bannerProps={bannerProps}>
    {{
        surface: <div className="relative z-50 w-full h-full"></div>,
        portalBody: (
            <div className="w-full h-full">

                <PortalLayout
                    backButtonHref={backButtonHref}
                    hasData={hasData}
                    toolbarTitle={toolbarTitle}
                    toolbarCTAText={toolbarCTAText}
                    buttonText={buttonText}
                    customSvgPath={customSvgPath}
                    >
                      
                <div>
                  <Tooltip title="Project Name" placement="top">
                    <Input
                      type="text"
                      id="projectName"
                      name="projectName"
                      value={projectData.projectName}

                    />
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Project Type" placement="top">
                    <Select
                      placeholder="Project Type"
                      value={projectData.projectType}
                      className="w-full"
                      required
                      onChange={(e, newProjectType) => {
                        console.log("New Project Type:", newProjectType);
                        setProjectData({
                          ...projectData,
                          projectType: newProjectType,
                        });
                      }}
                    >
                      <Option value="Commercial">Commercial</Option>
                      <Option value="Independent">Independent</Option>
                      <Option value="Studio-Backed">Studio-Backed</Option>
                    </Select>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Project Description" placement="top">
                    <Textarea
                      id="projectDescription"
                      name="projectDescription"
                      value={projectData.projectDescription}

                    />
                  </Tooltip>
                </div>

                </PortalLayout>

            </div>
        ),  
    }}
    </AuthenticatedLayout>  
  );
}

export default ProjectEstimate;
