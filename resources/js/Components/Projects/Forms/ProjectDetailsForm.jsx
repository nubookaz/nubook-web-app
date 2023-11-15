import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { formClass, formGroupClass, inputGroupClass, twoColInputGroupClass } from '@/Components/Scripts/Form';

import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Textarea from '@mui/joy/Textarea';
import Tooltip from '@mui/joy/Tooltip';











export default function ProjectDetailsForm({
     
    data,
    onUpdateProjectInfo,
    customClasses,
    emptyFields,
    setEmptyFields,

}) {

 




    
    const customClass = `${customClasses}`;
  
    const handleChange = (field, value) => {
        onUpdateProjectInfo(field, value);
        if (emptyFields[field]) {
             setEmptyFields((prevEmptyFields) => ({
                ...prevEmptyFields,
                [field]: false
            }));
        }
    };


     return (

        <div className={[formClass, customClass]}>

            <div className={formGroupClass}>

                <div className={twoColInputGroupClass}>
                    <div className={inputGroupClass}>
                        <label htmlFor="project_type" value="project_type" className='text-gray-400 text-sm'> Project Type * </label>
                        <Tooltip arrow title="Project Type is Required" open={emptyFields['project_type'] || false} color="danger" placement="top" variant="outlined" >
                            <Select
                                placeholder="Project Type"
                                value={data.project_type === '' ? undefined : data.project_type} 
                                className="w-full"
                                name="project_type"
                                required 
                                onChange={(e, newProjectType) => {
                                    handleChange('project_type', newProjectType);
                                }}
                            >
                                <Option value="Commercial">Commercial</Option>
                                <Option value="Independent">Independent</Option>
                                <Option value="Studio-Backed">Hollywood</Option>
                                <Option value="Network TV" disabled>Network TV -- Coming Soon!</Option>
                            </Select>
                        </Tooltip>
                    </div>
                    <div className={inputGroupClass}>
                        <label htmlFor="category_type" value="category_type" className='text-gray-400 text-sm'> Category Type * </label>
                        <Tooltip arrow title="Category Type is Required" open={emptyFields['category_type'] || false} color="danger" placement="top" variant="outlined" >
                            <Select 
                                placeholder="Category Type" 
                                name="category_type"
                                value={data.category_type === '' ? undefined : data.category_type} 
                                className='w-full'
                                required
                                onChange={(e, newCategoryType) => {
                                    handleChange('category_type', newCategoryType);
                                }}
                            >
                                {data.project_type === 'Commercial' && (
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

                                {(data.project_type === 'Independent' || data.project_type === 'Studio-Backed') && (
                                    <>
                                        <Option value="Feature Film">Feature Film</Option>
                                        <Option value="Short Film">Short Film</Option>
                                        <Option value="Documentary">Documentary</Option>
                                        <Option value="Web Series">Web Series</Option>
                                        <Option value="Music Video">Music Video</Option>
                                        <Option value="Animation">Animation</Option>
                                        <Option value="Experimental Film">Experimental Film</Option>
                                        <Option value="Student Film">Student Film</Option>
                                        <Option value="Travel & Adventure">Travel & Adventure</Option>
                                    </>
                                )}
                            </Select>
                        </Tooltip> 
                    </div>
                </div>

                <div className={inputGroupClass}>
                    <label htmlFor="project_stage" value="project_stage" className='text-gray-400 text-sm'> Project Stage * </label>
                    <Tooltip arrow title="Project Stage is Required" open={emptyFields['project_stage'] || false} color="danger" placement="top" variant="outlined" >
                        <Select
                            placeholder="Project Stage"
                            name="project_stage"
                            value={data.project_stage === '' ? undefined : data.project_stage} 
                            className="w-full"
                            required
                            onChange={(e, newProjectStage) => {
                                handleChange('project_stage', newProjectStage);
                            }}
                        >
                            <Option value="Estimate" disabled>Estimate -- Coming Soon!</Option>
                            <Option value="Creative Development">Creative Development</Option>
                            <Option value="Pre-Production">Pre-Production</Option>
                            <Option value="Production">Production</Option>
                            <Option value="Post-Production">Post-Production</Option>
                            <Option value="Distribution">Distribution</Option>
                            <Option value="Completed">Completed</Option>
                        </Select>
                    </Tooltip> 
                </div>
                
                <div className={`mt-6 ${formGroupClass}`}>
                    <div>
                        <h3 className='mb-2'>Project Details</h3>
                        <p>
                            Crafting an adventure? Pick a catchy project name, spin an epic tale in the description, and let us know your treasure (budget) to bring your cinematic vision to life. It's time to embark on a filmmaking journey!
                        </p>
                    </div>

                    <div className={inputGroupClass}>
                        <label htmlFor="project_name" value="project_name" className='text-gray-400 text-sm'> Project Name * </label>
                        <Tooltip arrow title="Project Name is Required" open={emptyFields['project_name'] || false} color="danger" placement="top" variant="outlined" >
                            <input
                                type="text"
                                name="project_name"
                                placeholder="Indiana Jones and Raiders of the Lost Ark" 
                                value={data.project_name} 
                                required
                                onChange={(e) => {
                                    const newProjectName = e.target.value;
                                    handleChange('project_name', newProjectName);
                                }}
                            />
                        </Tooltip> 
                    </div>

                    <div className={inputGroupClass}>
                        <label htmlFor="project_description" value="project_description" className='text-gray-400 text-sm'> Project Description </label>
                        <Textarea 
                            minRows={6} 
                            name="project_description"
                            placeholder="Epic tale in which an intrepid archaeologist tries to beat a band of Nazis to a unique religious relic which is central to their plans for world domination. Battling against a snake phobia and a vengeful ex-girlfriend, Indiana Jones is in constant peril, making hair's-breadth escapes at every turn in this celebration of the innocent adventure movies of an earlier era."
                            value={data.project_description}
                            onChange={(e) => {
                                const newProjectDescription = e.target.value;
                                handleChange('project_description', newProjectDescription);
                            }}
                        />
                    </div>

                    <div className={inputGroupClass}>
                        <label htmlFor="project_budget" value="project_budget" className='text-gray-400 text-sm'> Project Budget </label>
                        <input
                            type="text"
                            name="project_budget"
                            placeholder="$389,900,000" 
                            value={data.project_budget ? `$${data.project_budget.toLocaleString()}` : ''} // Format with dollar sign and commas
                            onChange={(e) => {
                                const newProjectBudget = parseFloat(e.target.value.replace(/[^0-9.-]+/g,"")); // Remove non-numeric characters
                                handleChange('project_budget', newProjectBudget);
                            }}
                        />
                    </div>

                </div>
            
            </div>



        </div>
        
    );

}

