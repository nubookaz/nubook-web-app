// StepOne.js
import React, { useState, useEffect } from 'react';
import Tooltip from '@mui/joy/Tooltip';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import ServiceTypeSelector from '../ServiceTypeSelector';

 




export default function VideoStepThree({ projectData, handleChange, emptyFields }) {

 

    return (
        <div className='flex flex-col gap-4 w-full  mx-auto'>
            <div className='flex flex-row gap-4 w-full mx-auto'>
                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="project_type" value="project_type" className='text-gray-400 text-sm'> Project Type * </label>
                    <Tooltip arrow title="Project Type is Required" open={emptyFields['project_type'] || false} color="danger" placement="top" variant="outlined" >
                        <Select
                            placeholder="Project Type"
                            value={projectData.project_type === '' ? undefined : projectData.project_type} 
                            className="w-full"
                            name="project_type"
                            required 
                            onChange={(e, newProjectType) => {
                                handleChange('project_type', newProjectType);
                            }}
                        >
                            <Option value="Corporate" disabled>Corporate -- Coming Soon!</Option>
                            <Option value="Commercial" disabled>Commercial -- Coming Soon!</Option>
                            <Option value="Independent">Independent</Option>
                            <Option value="Hollywood">Hollywood</Option>
                            <Option value="Network TV" disabled>Network TV -- Coming Soon!</Option>
                        </Select>
                    </Tooltip>
                </div>

                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="category_type" value="category_type" className='text-gray-400 text-sm'> Category Type * </label>
                    <Tooltip arrow title="Category Type is Required" open={emptyFields['category_type'] || false} color="danger" placement="top" variant="outlined" >
                        <Select 
                            placeholder="Category Type" 
                            name="category_type"
                            value={projectData.category_type === '' ? undefined : projectData.category_type} 
                            className={`w-full ${!projectData.project_type ? 'disabled-dropdown' : ''}`}
                            required
                            disabled={!projectData.project_type}
                            onChange={(e, newCategoryType) => {
                                handleChange('category_type', newCategoryType);
                            }}
                        >
                            {projectData.project_type === 'Commercial' && (
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

                            {projectData.project_type === 'Independent' && (
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
                                    <Option value="TV Series">TV Series</Option>
                                </>
                            )}

                            {projectData.project_type === 'Hollywood' && (
                                <>
                                    <Option value="Feature Film">Feature Film</Option>
                                    <Option value="Short Film">Short Film</Option>
                                    <Option value="Documentary">Documentary</Option>
                                    <Option value="Web Series">Web Series</Option>
                                    <Option value="Music Video">Music Video</Option>
                                    <Option value="Animation">Animation</Option>
                                    <Option value="Experimental Film">Experimental Film</Option>
                                    <Option value="Travel & Adventure">Travel & Adventure</Option>
                                    <Option value="TV Series">TV Series</Option>
                                </>
                            )}

                            {projectData.project_type === 'Corporate' && (
                                <>
                                    <Option value="Corporate Overview">Corporate Overview</Option>
                                    <Option value="Product Demonstrations and Explainers">Product Demonstrations and Explainers</Option>
                                    <Option value="Training and Instructional Videos">Training and Instructional Videos</Option>
                                    <Option value="Testimonial Videos">Testimonial Videos</Option>
                                    <Option value="Event Coverage">Event Coverage</Option>
                                    <Option value="Internal Communication Videos">Internal Communication Videos</Option>
                                    <Option value="Corporate Social Responsibility Videos">Corporate Social Responsibility Videos</Option>
                                    <Option value="Recruitment Videos">Recruitment Videos</Option>
                                    <Option value="Investor Relations and Financial Results">Investor Relations and Financial Results</Option>
                                    <Option value="Marketing and Promotional Videos">Marketing and Promotional Videos</Option>
                                    <Option value="Corporate Documentary">Corporate Documentary</Option>
                                    <Option value="Animated Videos">Animated Videos</Option>
                                </>
                            )}
                        </Select>
                    </Tooltip> 
                </div>
            </div>

            <div className='flex flex-row gap-4 w-full mx-auto'>
                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="project_stage" value="project_stage" className='text-gray-400 text-sm'> Project Stage * </label>
                    <Tooltip arrow title="Project Stage is Required" open={emptyFields['project_stage'] || false} color="danger" placement="top" variant="outlined" >
                        <Select
                            placeholder="Project Stage"
                            name="project_stage"
                            value={projectData.project_stage === '' ? undefined : projectData.project_stage} 
                            className={`w-full ${!projectData.category_type ? 'disabled-dropdown' : ''}`}
                            required
                            disabled={!projectData.category_type}
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

                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="project_status" value="project_status" className='text-gray-400 text-sm'> Project Status * </label>
                    <Tooltip arrow title="Project Status is Required" open={emptyFields['project_status'] || false} color="danger" placement="top" variant="outlined" >
                        <Select
                            placeholder="Project Status"
                            name="project_status"
                            value={projectData.project_status === '' ? undefined : projectData.project_status} 
                            className={`w-full ${!projectData.project_stage ? 'disabled-dropdown' : ''}`}
                            required
                            disabled={!projectData.category_type}
                            onChange={(e, newProjectStatus) => {
                                handleChange('project_status', newProjectStatus);
                            }}
                        >
                            <Option value="Not Started">Not Started</Option>
                            <Option value="In Progress">In Progress</Option>
                            <Option value="On Hold">On Hold</Option>
                            <Option value="Completed">Completed</Option>
                            <Option value="Cancelled">Cancelled</Option>
                            <Option value="Delayed">Delayed</Option>
                            <Option value="Under Review">Under Review</Option>
                            <Option value="Awaiting Approval">Awaiting Approval</Option>
                            <Option value="Testing">Testing</Option>
                            <Option value="Deployed">Deployed</Option>
                        </Select>
                    </Tooltip> 
                </div>
            </div>

            {(projectData.project_type === 'Corporate' || projectData.project_type === 'Commercial') && (
                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="service_types" value="service_types" className='text-gray-400 text-sm'> Service Type * </label>
                         {/* <Input
                            required
                            openToolTip={false}
                            inputType="autoComplete"
                            multiple={true}
                            limitTags={6}
                            label="Service Type"
                            type="text"
                            name="service_types"
                            placeholder="Service Type" 
                            value={projectData.service_types || []}
                            selectOnFocus
                            autoCompleteOptions={projectData.service_types}
                            inputClass={`w-full ${!projectData.project_status ? 'disabled-dropdown' : ''}`}
                            getOptionLabel={(option) => option.service + '  -  ' + option.cost}
                            isOptionEqualToValue={(option, value) => option.service === value.service}
                            onChange={(event, newServiceType) => {
                                handleChange('service_types', newServiceType);
                            }}
                        ></Input> */}
                    <ServiceTypeSelector
                        serviceTypes={projectData.service_types}
                        setServiceTypes={(newServiceTypes) => handleChange('service_types', newServiceTypes)}
                        projectData={projectData}
                        handleChange={handleChange}
                    />

                 </div>

            )}
        </div>
    );
}

 