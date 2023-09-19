import React, { useState, useEffect } from 'react';

import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Tooltip from '@mui/joy/Tooltip';

function ProjectDetailsForm(props) {
    const {
        projectName,
        projectBudget,
        projectType,
        categoryType,
        projectStage,
        projectDescription,
        projectDays,
        projectMonths,
        projectYears,

        setProjectName,
        setProjectBudget,
        setProjectType,
        setCategoryType,
        setProjectStage,
        setProjectDescription,
        setProjectDays,
        setProjectMonths,
        setProjectYears,
        
        required,
        checkFormStatus, 
        nextButtonClicked } = props;




        
    const handleNextButtonClick = () => {
        // Set the state to indicate that the "Next" button has been clicked
        setNextButtonClicked(true);
        // Add your logic to handle the next step
    };






    return (

        <div className='new-project-form'>
            <div className="mb-6 form-group">
                <div className="flex flex-row gap-2 mb-2">
                    <div className='w-full input-group'>
                        <Tooltip
                            title="Project Type is required"
                            open={nextButtonClicked && !projectType}
                            placement="top"
                            arrow
                            >
                            <Select
                                placeholder="Project Type"
                                value={projectType}
                                className="w-full"
                                required
                                onChange={(e, newProjectType) => {
                                console.log("New Project Type:", newProjectType);
                                setProjectType(newProjectType); // Use the prop function to update the value
                                const isFormFilled = checkFormStatus();
                                }}
                            >
                                <Option value="Commercial">Commercial</Option>
                                <Option value="Independent">Independent</Option>
                                <Option value="Studio-Backed">Studio-Backed</Option>
                            </Select>
                        </Tooltip>

                    </div>
                    <div className='w-full input-group'>
                        <Tooltip
                            title="Category Type is required"
                            open={nextButtonClicked && !categoryType}
                            placement="top"
                            arrow
                            >
                            <Select 
                                placeholder="Category Type" 
                                value={categoryType}
                                className='w-full'
                                required
                                onChange={(e, newCategoryType) => {
                                    console.log("New Category Type:", newCategoryType);
                                    setCategoryType(newCategoryType); // Use the prop function to update the value
                                    const isFormFilled = checkFormStatus();
                                }}
                                >
                                        <Option value="disabled" disabled>Please choose a project type</Option>

                                {(projectType === 'Commercial') && (
                                    <>
                                        <Option value="Marketing & Promotion">Marketing & Promotion</Option>
                                        <Option value="Corporate Communication">Corporate Communication</Option>
                                        <Option value="Product & Service Showcase">Product & Service Showcase</Option>
                                        <Option value="Event Coverage & Highlights">Event Coverage & Highlights</Option>
                                        <Option value="Customer Stories & Engagement">Customer Stories & Engagement</Option>
                                        <Option value="Educational & Expert Content">Educational & Expert Content</Option>
                                        <Option value="Behind-the-Scenes & Documentary">Behind-the-Scenes & Documentary</Option>
                                        <Option value="Interactive & Animation">Interactive & Animation</Option>
                                    </>
                                )}

                                {(projectType === 'Independent' || projectType === 'Studio-Backed') && (
                                    <>
                                        <Option value="Short Films">Short Films</Option>
                                        <Option value="Documentaries">Documentaries</Option>
                                        <Option value="Web Series">Web Series</Option>
                                        <Option value="Music Videos">Music Videos</Option>
                                        <Option value="Animation">Animation</Option>
                                        <Option value="Experimental Films">Experimental Films</Option>
                                        <Option value="Student Films">Student Films</Option>
                                        <Option value="Travel & Adventure">Travel & Adventure</Option>
                                    </>
                                )}
                            </Select>  
                        </Tooltip>
                    </div>

                </div>
                <Tooltip
                    title="Project Stage is required"
                    open={nextButtonClicked && !projectStage}
                    placement="top"
                    arrow
                    >
                    <Select
                        placeholder="Project Stage"
                        value={projectStage}
                        className="w-full"
                        required
                        onChange={(e, newProjectStage) => {
                            console.log("New Project Stage:", newProjectStage);
                            setProjectStage(newProjectStage); // Use the prop function to update the value
                            const isFormFilled = checkFormStatus();
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
            <div className="mb-6 form-group">
                <div className='w-full mb-2 input-group'>
                    <Tooltip
                        title="Project Name is required"
                        open={nextButtonClicked && !props.projectName}
                        placement="top"
                        arrow
                        >
                        <Input 
                            placeholder="Project Name" 
                            value={props.projectName} 
                            onChange={(e) => {
                            const newProjectName = e.target.value;
                            props.setProjectName(newProjectName); // Update parent component's state
                            const isFormFilled = props.checkFormStatus();
                            }}
                        />
                    </Tooltip>
                </div>
                <div className='w-full input-group'>
                    <Textarea 
                        minRows={6} 
                        placeholder='Describe your project here....'
                        value={projectDescription} // Bind to the projectDescription prop from the parent
                        onChange={(e) => {
                            const newProjectDescription = e.target.value;
                            console.log("New Project Description:", newProjectDescription); // Log the new value

                            // No need to update local state in ProjectForm, as it's controlled by the parent
                            props.setProjectDescription(newProjectDescription); // Update parent component's state
                            const isFormFilled = props.checkFormStatus();
                        }}
                    />
                </div>

  
            </div>
            <div className="mb-6 form-group">
                <Input 
                    placeholder="Project Budget" 
                    value={props.projectBudget}
                    onChange={(e) => {
                        const newProjectBudget = e.target.value;
                        console.log("Project Budget:", newProjectBudget); // Log the new value
                        props.setProjectBudget(newProjectBudget); // Update parent component's state
                        const isFormFilled = props.checkFormStatus();
                    }}
                />
            </div>
            <div className="mt-8 form-group">
                <h3 className='font-semibold primary-color'>Initial filming estimate</h3>
                <p className='text-lg secondary-color'>How long will it take you to film it? Provide your initial filming estimate; this will assist in generating detailed reports and automating production.</p>
                <div className='flex flex-row w-full gap-2 mt-6'>
                    <Input 
                        placeholder="Project Days" 
                        value={props.projectDays}
                        onChange={(e) => {
                            const newProjectDays = e.target.value;
                            console.log("Project Days:", newProjectDays); // Log the new value
                            props.setProjectDays(newProjectDays); // Update parent component's state
                            const isFormFilled = props.checkFormStatus();
                        }}
                    />

                    <Input 
                        placeholder="Project Months" 
                        value={props.projectMonths}
                        onChange={(e) => {
                            const newProjectMonths = e.target.value;
                            console.log("Project Months:", newProjectMonths); // Log the new value
                            props.setProjectMonths(newProjectMonths); // Update parent component's state
                            const isFormFilled = props.checkFormStatus();
                        }}
                    />

                    <Input 
                        placeholder="Project Years" 
                        value={props.projectYears}
                        onChange={(e) => {
                            const newProjectYears = e.target.value;
                            console.log("Project Years:", newProjectYears); // Log the new value
                            props.setProjectYears(newProjectYears); // Update parent component's state
                            const isFormFilled = props.checkFormStatus();
                        }}
                    />

                </div>
            </div>

        </div>
        
    );

}

export default ProjectDetailsForm;
