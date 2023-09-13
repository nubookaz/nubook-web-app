import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Banner from '@/Components/Layouts/Banner';
import Toolbar from '@/Components/Layouts/Toolbar';
import { router } from '@inertiajs/react'; // Import the router object

// Import MUI components
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Tooltip from '@mui/joy/Tooltip';

function ProjectEstimate({ auth }) {
    const { project } = usePage().props;

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






  return (
    <AuthenticatedLayout user={auth.user} showBanner={true} showPortalBody={true}>
    {{
        surface: <div className="relative z-50 w-full h-full"></div>,
        banner: <Banner size="small" showLeftContent={true} showProfilePhoto={true} />,
        portalBody: (
            <div className="w-full h-full">
            <Toolbar
              href={route('projects.index')}
              title="Project Estimate"
              cta_text="Create a New Project"
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
            </Toolbar>
            </div>
        ),  
    }}
    </AuthenticatedLayout>  
  );
}

export default ProjectEstimate;
