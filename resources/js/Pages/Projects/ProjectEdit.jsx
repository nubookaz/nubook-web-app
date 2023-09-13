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

function ProjectEdit({ auth }) {
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

  useEffect(() => {
    // Fetch project data here and update projectData state
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };


  const submit = () => {
    // Use router.put for updating data
    router.put(route('projects.update', { id: project.id }), projectData, {
      onSuccess: () => {
        // Handle a successful response, e.g., show a success message
        console.log('Project updated successfully');
        
        // Redirect to the projects index page or perform any other actions
        router.replace(route('projects.index'));
      },
      onError: (error) => {
        // Handle errors, e.g., show an error message
        console.error('Error updating project:', error);
      },
    });
  };
  
  
  

  return (
    <AuthenticatedLayout user={auth.user} showBanner={true} showPortalBody={true}>
      {{
        surface: <div className="relative z-50 w-full h-full"></div>,
        banner: <Banner size="small" showLeftContent={true} showProfilePhoto={true} />,
        portalBody: (
          <div className="w-full h-full">
            <Toolbar
              href={route('projects.index')}
              title={projectData.projectName}
              cta_text="Create a New Project"
            >
                <div>
                  <Tooltip title="Project Name" placement="top">
                    <Input
                      type="text"
                      id="projectName"
                      name="projectName"
                      value={projectData.projectName}
                      onChange={handleInputChange}
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
                <Tooltip
                    title="Project Stage is required"
                    placement="top"
                    arrow
                    >
                    <Select
                        placeholder="Project Stage"
                        value={projectData.projectStage}
                        className="w-full"
                        required
                        onChange={(e, newProjectStage) => {
                            console.log("New Project Stage:", newProjectStage);
                            setProjectData({
                                ...projectData,
                                projectStage: newProjectStage,
                              });
                        }}
                        >
                        <Option value="Estimate">Estimate</Option>
                        <Option value="Creative Development">Creative Development</Option>
                        <Option value="Pre-production">Pre-production</Option>
                        <Option value="Production">Production</Option>
                        <Option value="Post-production">Post-production</Option>
                    </Select>
                </Tooltip>
                </div>
                <div>
                  <Tooltip title="Project Description" placement="top">
                    <Textarea
                      id="projectDescription"
                      name="projectDescription"
                      value={projectData.projectDescription}
                      onChange={handleInputChange}
                    />
                  </Tooltip>
                </div>
                {/* Add other project input fields here */}
                <button onClick={submit}>Update Project</button>
            </Toolbar>
          </div>
        ),
      }}
    </AuthenticatedLayout>
  );
}

export default ProjectEdit;
