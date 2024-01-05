 import React, { useState, useEffect } from 'react';
import Tooltip from '@mui/joy/Tooltip';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import ServiceTypeSelector from '../ServiceTypeSelector';

 




export default function VideoStepThree({ data, onDataChange, emptyFields }) {
    const [localData, setLocalData] = useState(data);

    useEffect(() => {
        setLocalData(data);
    }, [data]);

    const handleChange = (field, value) => {
        const updatedData = { ...localData, [field]: value };
        setLocalData(updatedData);
        onDataChange(updatedData);  
    };


    return (
        <div className='flex flex-col gap-4 w-full  mx-auto'>
            <div className='flex flex-row gap-4 w-full mx-auto'>
                <div className='flex flex-col gap-2 w-full'>
 
                </div>

                
            </div>

            <div className='flex flex-row gap-4 w-full mx-auto'>
                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="project_stage" value="project_stage" className='text-gray-400 text-sm'> Project Stage * </label>
                    <Tooltip arrow title="Project Stage is Required" open={emptyFields['project_stage'] || false} color="danger" placement="top" variant="outlined" >
                        <Select
                            placeholder="Project Stage"
                            name="project_stage"
                            value={localData.project_stage || ''} 
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

                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="project_status" value="project_status" className='text-gray-400 text-sm'> Project Status * </label>
                    <Tooltip arrow title="Project Status is Required" open={emptyFields['project_status'] || false} color="danger" placement="top" variant="outlined" >
                        <Select
                            placeholder="Project Status"
                            name="project_status"
                            value={localData.project_status || ''} 
                            required
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

            <div className='flex flex-row gap-2 w-full'>
                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="filming_days" className='text-gray-400 text-sm'>Estimated Filming Days</label>
                    <div className="flex items-center border border-gray-300 rounded-md bg-white">
                        <input
                            type="number"
                            name="filming_days"
                            id="filming_days"
                            placeholder="14"
                            value={localData.filming_days || ''}
                            onChange={(e) => {
                                const newFilmingDays = parseInt(e.target.value, 10);
                                handleChange('filming_days', newFilmingDays);
                            }}
                            className="p-2 w-full rounded-md"
                        />
                        <span className="px-2 text-gray-500 ">Days</span>
                    </div>
                </div>

                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="project_budget" value="project_budget" className='text-gray-400 text-sm'> Project Budget </label>
                    <input
                        type="text"
                        name="project_budget"
                        placeholder="$389,900,000" 
                        value={localData.project_budget ? `${localData.project_budget.toLocaleString()}` : ''} // Format with dollar sign and commas
                        onChange={(e) => {
                            const newProjectBudget = parseFloat(e.target.value.replace(/[^0-9.-]+/g,"")); // Remove non-numeric characters
                            handleChange('project_budget', newProjectBudget);
                        }}
                    />
                </div>
            </div>
            
        </div>
    );
}

 