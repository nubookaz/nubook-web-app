import React, { useState, useEffect } from 'react';

import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Textarea from '@mui/joy/Textarea';

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
                            <Select
                                placeholder="Project Type"
                                value={projectType === '' ? undefined : projectType} 
                                className="w-full"
                                required
                                onChange={(e, newProjectType) => {
                                 setProjectType(newProjectType); // Use the prop function to update the value
                                const isFormFilled = checkFormStatus();
                                }}
                            >
                                <Option value="Commercial">Commercial</Option>
                                <Option value="Independent">Independent</Option>
                                <Option value="Studio-Backed">Hollywood</Option>
                                <Option value="Network TV" disabled>Network TV -- Coming Soon!</Option>
                            </Select>
                    </div>
                    <div className='w-full input-group'>
                            <Select 
                                placeholder="Category Type" 
                                value={categoryType === '' ? undefined : categoryType} 
                                className='w-full'
                                required
                                onChange={(e, newCategoryType) => {
                                     setCategoryType(newCategoryType); // Use the prop function to update the value
                                    const isFormFilled = checkFormStatus();
                                }}
                                >

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
                                        <Option value="Short Films">Short Film</Option>
                                        <Option value="Documentary">Documentary</Option>
                                        <Option value="Web Series">Web Series</Option>
                                        <Option value="Music Videos">Music Video</Option>
                                        <Option value="Animation">Animation</Option>
                                        <Option value="Experimental Films">Experimental Film</Option>
                                        <Option value="Student Films">Student Film</Option>
                                        <Option value="Travel & Adventure">Travel & Adventure</Option>
                                    </>
                                )}
                            </Select>  
                    </div>

                </div>

                    <Select
                        placeholder="Project Stage"
                        value={projectStage === '' ? undefined : projectStage} 
                        className="w-full"
                        required
                        onChange={(e, newProjectStage) => {
                             setProjectStage(newProjectStage); // Use the prop function to update the value
                            const isFormFilled = checkFormStatus();
                        }}
                        >
                        <Option value="Estimate" disabled>Estimate -- Coming Soon!</Option>
                        <Option value="Creative Development">Creative Development</Option>
                        <Option value="Pre-Production">Pre-Production</Option>
                        <Option value="Production">Production</Option>
                        <Option value="Post-Production">Post-Production</Option>
                    </Select>
            </div>
            <div className="mb-6 form-group">
                <div className='w-full mb-2 input-group'>
                        <input 
                            placeholder="Project Name" 
                            value={props.projectName} 
                            onChange={(e) => {
                            const newProjectName = e.target.value;
                            props.setProjectName(newProjectName); // Update parent component's state
                            const isFormFilled = props.checkFormStatus();
                            }}
                        />
                </div>
                <div className='w-full input-group'>
                    <Textarea 
                        minRows={6} 
                        placeholder='Describe your project here....'
                        value={projectDescription} // Bind to the projectDescription prop from the parent
                        onChange={(e) => {
                            const newProjectDescription = e.target.value;
                            // No need to update local state in ProjectForm, as it's controlled by the parent
                            props.setProjectDescription(newProjectDescription); // Update parent component's state
                            const isFormFilled = props.checkFormStatus();
                        }}
                    />
                </div>

  
            </div>
            <div className="mb-6 form-group">
            <input 
                placeholder="Project Budget" 
                value={props.projectBudget ? `$${props.projectBudget.toLocaleString()}` : ''} // Format with dollar sign and commas
                onChange={(e) => {
                    const newProjectBudget = parseFloat(e.target.value.replace(/[^0-9.-]+/g,"")); // Remove non-numeric characters
                    props.setProjectBudget(newProjectBudget); // Update parent component's state
                    const isFormFilled = props.checkFormStatus();
                }}
            />
            </div>
            <div className="mt-8 form-group">
                <h3 className='font-semibold primary-color'>Initial filming estimate</h3>
                <p className='text-lg secondary-color'>How long will it take you to film it? Provide your initial filming estimate; this will assist in generating detailed reports and automating production.</p>
                <div className='flex flex-row w-full gap-2 mt-6'>
                    <input 
                        placeholder="Project Days" 
                        value={props.projectDays}
                        onChange={(e) => {
                            const newProjectDays = e.target.value;
                             props.setProjectDays(newProjectDays); // Update parent component's state
                            const isFormFilled = props.checkFormStatus();
                        }}
                    />

                    <input 
                        placeholder="Project Months" 
                        value={props.projectMonths}
                        onChange={(e) => {
                            const newProjectMonths = e.target.value;
                             props.setProjectMonths(newProjectMonths); // Update parent component's state
                            const isFormFilled = props.checkFormStatus();
                        }}
                    />

                    <input 
                        placeholder="Project Years" 
                        value={props.projectYears}
                        onChange={(e) => {
                            const newProjectYears = e.target.value;
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
