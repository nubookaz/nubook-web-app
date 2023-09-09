import React, { useState } from 'react';

import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';

function ProjectForm() {
    const [projectType, setProjectType] = useState('');

    const handleProjectTypeChange = (value) => {
      console.log(value);
      setProjectType(value);
    };

    return (

      <div className='new-project-form'>
        <div className="form-group mb-8">
            <div className="flex flex-row gap-2 mb-4">

            <Select
                placeholder="Project Type"
                className="w-full"
                onChange={(e, newValue) => {
                    setProjectType(newValue); // Store the selected value in projectType
                }}
            >
                <Option value="Commercial">Commercial</Option>
                <Option value="Independent">Independent</Option>
                <Option value="Studio-Backed">Studio-Backed</Option>
            </Select>

            <Select placeholder="Category Type" className='w-full'>
                <Option value="" disabled>Please choose a project type</Option>

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


            </div>
            <Select
                placeholder="Project Stage"
                className="w-full"
            >
                <Option value="Estimate">Estimate</Option>    
                <Option value="Creative Development">Creative Development</Option>
                <Option value="Pre-Production">Pre-Production</Option>
                <Option value="Production">Production</Option>
                <Option value="Post-Production">Post-Production</Option>
            </Select>
        </div>  

        <div className='form-group mb-8'>
            <Input className="mb-4" placeholder="Project Name" />
            <Textarea minRows={8} placeholder="Project Description" />
        </div>

        <div className='form-group mb-8'>
            <Input placeholder="Budget" />
        </div>

        <div className='form-group mb-8'>
         <h3 className='primary-color font-semibold'>Initial Project Completion Estimate</h3>
         <p className='secondary-color'>How long will it take you to film it? Provide your initial filming estimate; this will assist in generating detailed reports and automating production.</p>
         <div className='flex flex-row gap-2 mt-4'>
            <Select
                placeholder="Days"
                className="w-full"
            >
                <Option value="Commercial">Commercial</Option>
                <Option value="Independent">Independent</Option>
                <Option value="Studio-Backed">Studio-Backed</Option>
            </Select>
            <Select
                placeholder="Months"
                className="w-full"
                >
                <Option value="Commercial">Commercial</Option>
                <Option value="Independent">Independent</Option>
                <Option value="Studio-Backed">Studio-Backed</Option>
            </Select>
            <Select
                placeholder="Years"
                className="w-full"
                >
                <Option value="Commercial">Commercial</Option>
                <Option value="Independent">Independent</Option>
                <Option value="Studio-Backed">Studio-Backed</Option>
            </Select>
          </div>
        </div>

      </div>
      
   
  );
}

export default ProjectForm;
