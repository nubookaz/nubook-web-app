import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCalculator, faRocket } from '@fortawesome/free-solid-svg-icons'; 

import { formClass, formGroupClass, inputGroupClass, multiColInputClass } from '@/Components/Scripts/Form';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Textarea from '@mui/joy/Textarea';
import Tooltip from '@mui/joy/Tooltip';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';

import Input from '@/Components/Forms/Input';



export default function ProjectForm({ customClasses }) {
    const { user, fetchUserData } = useAuth();

    useEffect(() => {
      fetchUserData();
    }, []);

 

    const [processing, setProcessing] = useState(false);
    const [emptyFields, setEmptyFields] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [div, showDiv] = useState(false);

    const serviceTypes = [
      { title: 'The Shawshank Redemption', year: 1972},
      { title: 'The Godfather', year: 1972 },
      { title: 'The Godfather: Part II', year: 1974 },
      { title: 'The Dark Knight', year: 2008 },
      { title: '12 Angry Men', year: 1957 },
      { title: "Schindler's List", year: 1993 },
      { title: 'Pulp Fiction', year: 1994 },
      { title: 'Casablanca', year: 1942 },        
  ];
  
  const customClass = `${customClasses}`;

  const [projectData, setProjectData] = useState({
    project_name: '',
    category_type: '',
    project_type: '',
    project_status: '',
    service_types: [],
    project_stage: '',
    project_description: '',
    project_budget: '',
  });

  const clearFormData = () => {
    // Clear out the projectData state
    setProjectData({
      project_name: '',
      category_type: '',
      project_type: '',
      project_status: '',
      service_types: '',
      project_stage: '',
      project_description: '',
      project_budget: '',
    });
  
  };
 
  const handleBackButtonClick = () => {
 
    clearFormData();
    setEmptyFields(true);
    showDiv(false);
 
  };
  
 

  const submit = async (e) => {
      e.preventDefault();
      setProcessing(true);

        try {
          // Use the state directly from the callback
          await router.post(route('projects.create'), {
            projectData: projectData,
          });

          clearFormData();
          toggleDrawerPanel(false);

        } catch (error) {
            // Handle errors if needed
            console.log(error);
    
        } finally {
            setProcessing(false);
        }
  
  };


  const handleUpdateFormData = (field, value) => {
    setProjectData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
 
  const handleChange = (field, value) => {
    console.log(field, value);
    if (Array.isArray(value)) {
        // Handle the array-type input update
        handleUpdateFormData(field, value);
    } else {
      handleUpdateFormData(field, value);
    }

    // Existing logic to handle empty fields
    if (emptyFields[field]) {
        setEmptyFields(prevEmptyFields => ({
            ...prevEmptyFields,
            [field]: false
        }));
    }
};

 
    return (

        <div className='flex flex-col gap-10 max-w-[50rem] justify-center h-full w-full mx-auto'>
                   
        {div ? (
                 


            <form onSubmit={submit} className={[formClass, customClass]}>

                <div className={formGroupClass}>

                    <div className={multiColInputClass}>
                        <div className={inputGroupClass}>
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
                                    <Option value="Corporate">Corporate</Option>
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

                                    {(projectData.project_type === 'Independent' || projectData.project_type === 'Studio-Backed') && (
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

                    <div className={multiColInputClass}>
                        <div className={inputGroupClass}>
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

                        <div className={inputGroupClass}>
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

                    <Input
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
                        autoCompleteOptions={serviceTypes}
                        inputClass={`w-full ${!projectData.project_status ? 'disabled-dropdown' : ''}`}
                        getOptionLabel={(option) => option.title}
                        isOptionEqualToValue={(option, value) => option.title === value.title}
                        onChange={(event, newServiceType) => {
                            handleChange('service_types', newServiceType);
                        }}
                    ></Input>

                    <div className={`mt-6 ${formGroupClass}`}>
                        <div>
                            <h3 className='mb-2'>Project Details</h3>
                            <p>
                                Create your adventure: Choose a memorable name, describe your epic story, and share your budget to realize your cinematic vision.
                            </p>
                        </div>

                        <div className={inputGroupClass}>
                            <label htmlFor="project_name" value="project_name" className='text-gray-400 text-sm'> Project Name * </label>
                            <Tooltip arrow title="Project Name is Required" open={emptyFields['project_name'] || false} color="danger" placement="top" variant="outlined" >
                                <input
                                    type="text"
                                    name="project_name"
                                    placeholder="Indiana Jones and Raiders of the Lost Ark" 
                                    value={projectData.project_name} 
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
                                value={projectData.project_description}
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
                                value={projectData.project_budget ? `$${projectData.project_budget.toLocaleString()}` : ''} // Format with dollar sign and commas
                                onChange={(e) => {
                                    const newProjectBudget = parseFloat(e.target.value.replace(/[^0-9.-]+/g,"")); // Remove non-numeric characters
                                    handleChange('project_budget', newProjectBudget);
                                }}
                            />
                        </div>

                    </div>

                </div>

                <div className='flex flex-row gap-4 h-full'>
                <div className="circular-button circular-button-small cursor-pointer" onClick={handleBackButtonClick}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>

                <SecondaryButton buttonType="submit" onSubmit={submit} disabled={processing}>Create Project</SecondaryButton>
                </div>

            </form>


         ) : (
          <>

            <div className='text-center'>
              <h2>Choose an option below</h2>
              <p>To get started, we invite you to choose between creating an estimate or initiating a project. Whether you're looking to plan your next client project or embark on a passion project close to your heart, making this choice will set you on the right path towards your goal. Select the option that aligns with your current needs, and we'll guide you through the process step by step.</p>
            </div>
            <div className='flex flex-row gap-8 justify-center'>
                <div className='disable border-2 border-slate-50 duration-700 cursor-pointer hover:border-white hover:shadow-2xl rounded-md text-center w-[9rem] h-[9rem] justify-center flex flex-col gap-2 p-4'>
                <FontAwesomeIcon className='text-2xl primary-color' icon={faCalculator}></FontAwesomeIcon>
                <p className='text-sm'>Start with an Estimate</p>
                </div>
                <div onClick={showDiv} className='border-2 border-slate-50 duration-700 hover:border-white hover:shadow-2xl cursor-pointer rounded-md text-center w-[9rem] h-[9rem] justify-center flex flex-col gap-2 p-4'>
                    <FontAwesomeIcon className='text-2xl primary-color' icon={faRocket}></FontAwesomeIcon>
                    <p className='text-sm'>Create a Project</p>
                </div>
            </div>

          </>
          
        )}


    </div>

            

    );
}
  

